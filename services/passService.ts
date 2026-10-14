import type { Pass } from "@/types/PassesType";

import passes from "@/data/passes.json";

export async function getPasses(): Promise<Pass[]> {
    return passes;
}