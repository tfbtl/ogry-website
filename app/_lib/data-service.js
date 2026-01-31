import { eachDayOfInterval } from "date-fns";
import { notFound } from "next/navigation";
import {
  fetchCabin,
  fetchCabinPrice,
  fetchCabins,
  fetchGuest,
  fetchBooking,
  fetchBookings,
  fetchBookedDates,
  fetchSettings,
  insertGuest,
  insertBooking,
  updateGuest as updateGuestAdapter,
  updateBooking as updateBookingAdapter,
  deleteBooking as deleteBookingAdapter,
  ensureArrayData,
} from "./data/su\u0070abaseAdapter";
/////////////
// GET

export async function getCabin(id) {
  const { data, error } = await fetchCabin(id);

  // For testing
  // await new Promise((res) => setTimeout(res, 1000));

  if (error) {
    notFound();
  }

  return data;
}

export async function getCabinPrice(id) {
  const { data, error } = await fetchCabinPrice(id);

  if (error) {
    return null;
  }

  return data;
}

export const getCabins = async function () {
  const { data, error } = await fetchCabins();

  if (error) {
    throw new Error("Cabins could not be loaded");
  }

  return ensureArrayData(data, "Cabins could not be loaded");
};

// Guests are uniquely identified by their email address
export async function getGuest(email) {
  const { data } = await fetchGuest(email);

  // No error here! We handle the possibility of no guest in the sign in callback
  return data;
}

export async function getBooking(id) {
  const { data, error } = await fetchBooking(id);

  if (error) {
    throw new Error("Booking could not get loaded");
  }

  return data;
}

export async function getBookings(guestId) {
  const { data, error } = await fetchBookings(guestId);

  if (error) {
    throw new Error("Bookings could not get loaded");
  }

  return ensureArrayData(data, "Bookings could not get loaded");
}

export async function getBookedDatesByCabinId(cabinId) {
  let today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  today = today.toISOString();

  // Getting all bookings
  const { data, error } = await fetchBookedDates(cabinId, today);

  if (error) {
    throw new Error("Bookings could not get loaded");
  }

  // Converting to actual dates to be displayed in the date picker
  const bookedDates = ensureArrayData(data, "Bookings could not get loaded")
    .map((booking) => {
      return eachDayOfInterval({
        start: new Date(booking.startDate),
        end: new Date(booking.endDate),
      });
    })
    .flat();

  return bookedDates;
}

export async function getSettings() {
  const { data, error } = await fetchSettings();

  if (error) {
    throw new Error("Settings could not be loaded");
  }

  return data;
}

export async function getCountries() {
  try {
    const res = await fetch(
      "https://restcountries.com/v2/all?fields=name,flag",
    );
    const countries = await res.json();
    return countries;
  } catch {
    throw new Error("Could not fetch countries");
  }
}

/////////////
// CREATE

export async function createGuest(newGuest) {
  const { data, error } = await insertGuest(newGuest);

  if (error) {
    throw new Error("Guest could not be created");
  }

  return data;
}

export async function createBooking(newBooking) {
  const { data, error } = await insertBooking(newBooking);

  if (error) {
    throw new Error("Booking could not be created");
  }

  return data;
}

/////////////
// UPDATE

// The updatedFields is an object which should ONLY contain the updated data
export async function updateGuest(id, updatedFields) {
  const { data, error } = await updateGuestAdapter(id, updatedFields);

  if (error) {
    throw new Error("Guest could not be updated");
  }
  return data;
}

export async function updateBooking(id, updatedFields) {
  const { data, error } = await updateBookingAdapter(id, updatedFields);

  if (error) {
    throw new Error("Booking could not be updated");
  }
  return data;
}

/////////////
// DELETE

export async function deleteBooking(id) {
  const { data, error } = await deleteBookingAdapter(id);

  if (error) {
    throw new Error("Booking could not be deleted");
  }
  return data;
}
