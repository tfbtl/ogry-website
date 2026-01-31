import { CabinServiceAdapter } from "../../data/supabaseAdapter/CabinServiceAdapter";
import { GetCabinsUseCase } from "../../features/cabins/usecases/GetCabinsUseCase";
import { GetCabinUseCase } from "../../features/cabins/usecases/GetCabinUseCase";

/**
 * Composition Root for Cabin UseCases
 * 
 * This module wires up UseCases with their concrete adapters.
 * UI layer should import UseCases from here, not directly.
 */
const cabinService = new CabinServiceAdapter();

export const getCabinsUseCase = new GetCabinsUseCase(cabinService);
export const getCabinUseCase = new GetCabinUseCase(cabinService);

