"use client";

import type { Mountain } from "@/types/MountainTypes";
import type { Pass } from "@/types/PassesType";

import NavBar from "@/components/layout/NavBar";
import FilterBar from "@/components/filters/FilterBar";
import MountainTable from "@/components/mountain/MountainTable";

import { getMountains } from "@/services/mountainService";
import { getPasses } from "@/services/passService";

const mountains: Mountain[] = await getMountains();
const passes: Pass[] = await getPasses();

export default function Home() {
    return (
        <>
            <NavBar />
            <main className="min-h-screen p-8">
                <h1 className="mb-6 text-xl">
                    Find Your Next Ski+Snowboard Trip
                </h1>

                <FilterBar passes={passes}/>
                <MountainTable mountains={mountains} />
            </main>
        </>
    );
}
