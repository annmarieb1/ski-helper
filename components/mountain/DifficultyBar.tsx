/*
 * Generate trail difficulty distribution bar
 */

import type { Trails } from "@/types/MountainTypes";

const NORMALIZE_BY = 15;

export default function DifficultyBar({ trails }: { trails: Trails }) {
    // Normalize trail distribution to be out of 10
    // TODO: fix rounding errors
    function normalizeDistribution(trails: Trails) {
        let totalTrails: number = trails.bunny + trails.green + trails.blue + trails.black + trails.doubleBlack;
        totalTrails += trails.glades ? trails.glades : 0;

        if (totalTrails === 0) {
            return { bunny: 0, green: 0, blue: 0, black: 0, doubleBlack: 0, glades: 0 };
        }

        return {
            bunny: Math.round((trails.bunny / totalTrails) * NORMALIZE_BY),
            green: Math.round((trails.green / totalTrails) * NORMALIZE_BY),
            blue: Math.round((trails.blue / totalTrails) * NORMALIZE_BY),
            black: Math.round((trails.black / totalTrails) * NORMALIZE_BY),
            doubleBlack: Math.round((trails.doubleBlack / totalTrails) * NORMALIZE_BY),
            glades: trails.glades ? Math.round((trails.glades / totalTrails) * NORMALIZE_BY) : 0,
        }
    }

    function buildDistributionString(trailsDistribution: Trails) {
        let distributionStr = "";

        distributionStr += '🐰'.repeat(trailsDistribution.bunny);
        distributionStr += '🟩'.repeat(trailsDistribution.green);
        distributionStr += '🟦'.repeat(trailsDistribution.blue);
        distributionStr += '⬥'.repeat(trailsDistribution.black);
        distributionStr += '♦️'.repeat(trailsDistribution.doubleBlack);
        distributionStr += '🌲'.repeat(trailsDistribution.glades ?? 0);

        return distributionStr === "" ? "No trail distribution information" : distributionStr;
    }

    const trailsDistribution: Trails = normalizeDistribution(trails);
    const distributionStr: string = buildDistributionString(trailsDistribution);

    return (
        <div className="flex items-center">
            {distributionStr}
        </div>
    )
}