/*
 * Generate trail difficulty distribution bar
 */

import type { Trails } from "@/types/MountainTypes";

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
            bunny: Math.round((trails.bunny / totalTrails) * 10),
            green: Math.round((trails.green / totalTrails) * 10),
            blue: Math.round((trails.blue / totalTrails) * 10),
            black: Math.round((trails.black / totalTrails) * 10),
            doubleBlack: Math.round((trails.doubleBlack / totalTrails) * 10),
            glades: trails.glades ? Math.round((trails.glades / totalTrails) * 10) : 0,
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