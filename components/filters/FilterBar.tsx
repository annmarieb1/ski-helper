/*
 * Component for users to select filters/preferences
 */

"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxChip,
  ComboboxChips,
  ComboboxValue,
  ComboboxChipsInput
} from "@/components/ui/combobox";
import { Slider } from "@/components/ui/slider";

import type { Pass } from "@/types/PassesType";

export default function FilterBar({ passes }: { passes: Pass[] }) {
    const [liftTicketPrice, setLiftTicketPrice] = useState([0, 200]);
    const [selectedPassOptions, setSelectedPassOptions] = useState<string[]>([]);
    const [selectedDifficultyOptions, setSelectedDifficultyOptions] = useState<string[]>([]);

    // Handle slider change for lift ticket price
    const handleLiftTicketPriceChange = (value: number | readonly number[]) => {
        if (Array.isArray(value)) {
            setLiftTicketPrice(value as number[]);
        }
    }

    return (
        <div className="space-y-4 rounded-lg border bg-card p-4">
            {/* Starting Location */}
            <div className="flex gap-2">
                <Input
                placeholder="Enter starting location..."
                className="flex-1"
                />

                <Button>
                Search
                </Button>
            </div>

            {/* Filters */}
            <div className="grid gap-4 md:grid-cols-3">

                {/* Pass */}
                <div className="space-y-2">
                    <label className="text-sm font-medium">
                        Pass Access
                    </label>

                    <Combobox
                        items={passes}
                        multiple
                        value={selectedPassOptions}
                        onValueChange={setSelectedPassOptions}
                    >
                        <ComboboxChips>
                            <ComboboxValue>
                                {selectedPassOptions.map((item) => (
                                    <ComboboxChip key={item}>{item}</ComboboxChip>
                                ))}
                                </ComboboxValue>
                            <ComboboxChipsInput placeholder="Select passes" />
                        </ComboboxChips>
                        <ComboboxContent>
                            <ComboboxEmpty>No items found.</ComboboxEmpty>
                                <ComboboxList>
                                    {(pass: string) => (
                                        <ComboboxItem key={pass} value={pass}>
                                            {pass}
                                        </ComboboxItem>
                                    )}
                                </ComboboxList>
                            </ComboboxContent>
                    </Combobox>
                </div>

                {/* Difficulty */}
                <div className="space-y-2">
                    <label className="text-sm font-medium">
                        Trail difficulty
                    </label>

                    <Combobox
                        items={["Bunny Hill", "Green", "Blue", "Black", "Double Black"]}
                        multiple
                        value={selectedDifficultyOptions}
                        onValueChange={setSelectedDifficultyOptions}
                    >
                        <ComboboxChips>
                            <ComboboxValue>
                                {selectedDifficultyOptions.map((item) => (
                                    <ComboboxChip key={item}>{item}</ComboboxChip>
                                ))}
                                </ComboboxValue>
                            <ComboboxChipsInput placeholder="Select preferred difficulties" />
                        </ComboboxChips>
                        <ComboboxContent>
                            <ComboboxEmpty>No items found.</ComboboxEmpty>
                                <ComboboxList>
                                    {(item: string) => (
                                        <ComboboxItem key={item} value={item}>
                                            {item}
                                        </ComboboxItem>
                                    )}
                                </ComboboxList>
                            </ComboboxContent>
                    </Combobox>
                </div>

                {/* Lift Ticket Price */}
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-medium">
                            Lift Ticket Price Range
                        </label>

                        <span className="text-sm text-muted-foreground">
                            ${liftTicketPrice[0]} – ${liftTicketPrice[1]}
                        </span>
                    </div>

                    <Slider
                        value={liftTicketPrice}
                        onValueChange={handleLiftTicketPriceChange}
                        min={0}
                        max={400}
                        step={5}
                    />
                </div>
            </div>
        </div>
    );
}
