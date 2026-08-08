/*
 * All services for mountain data from APIs
 */

import type { Mountain } from "@/types/MountainTypes";

import mountains from "@/data/mountains.json";

// Get all mountains
export async function getMountains(): Promise<Mountain[]> {
    return mountains;
}

// For when the backend is separate from frontend
// export async function getMountains(): Promise<Mountain[]> {
//   const response = await fetch("/api/mountain");

//   if (!response.ok) {
//     throw new Error("Failed to fetch mountains.");
//   }

//   return response.json();
// }