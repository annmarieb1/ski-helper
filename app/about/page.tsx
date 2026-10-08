"use client";

import NavBar from "@/components/layout/NavBar";

export default function Home() {
    return (
        <>
            <NavBar />
            <main className="min-h-screen p-8">
                <h1 className="mb-6 text-xl">
                    About
                </h1>
                <p>
                  Hi, my name is Ann Marie. I am an avid skier, so I created{" "}
                  this app to help my friends and I find the ideal ski mountain{" "}
                  to ski at depending on what we are looking for. This has been{" "}
                  an idea of mine for years now, and I am excited that it is{" "}
                  finally starting to come to fruition.
                </p>
            </main>
        </>
    );
}
