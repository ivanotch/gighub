'use client'
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button";
import { BrushCleaning, Drill, TruckElectric, ShoppingBag, DiamondPlus } from 'lucide-react';
import { useState } from "react";
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function GigPost() {
    const [selected, setSelected] = useState<number | null>(null);
    const [selectedCat, setSelectedCat] = useState("")
    const [progress, setProgress] = useState(20);
    const [title, setTitle] = useState("");

    const categories = [
        { id: 1, name: "Cleaning", icon: <BrushCleaning />, disabled: false },
        { id: 3, name: "E-commerce", icon: <ShoppingBag />, disabled: false },
        { id: 2, name: "Construction", icon: <Drill />, disabled: true },
        { id: 4, name: "Delivery", icon: <TruckElectric />, disabled: true },
    ];

    const ecomSkills = ["Packaging", "Labeling", "Inventory Management", "Shipping/Dropping off", "Restocking", "Order Processing"]
    const cleaningSkills = ["Power Wash", "Deep Cleaning", "Dish Washer", "Laundry", "Cleaning Assistant"]
    const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

    return (
        <div className="flex flex-col">
            <div className="mt-[5rem]">

                {/* ----------------------- STEP 1 ----------------------- */}
                {progress === 20 && (
                    <div className="flex">
                        <div className="w-[50%] p-10 pl-[16rem] flex flex-col gap-5">
                            <div className="flex gap-5">
                                <span>1/5</span>
                                <span>Gig post</span>
                            </div>
                            <header className="text-[2.1rem] font-semibold mr-[1rem] leading-none">
                                Let's start with a strong title.
                            </header>
                            <p>This helps your gig post to be clear to the potential gig workers.</p>
                        </div>

                        <div className="w-[50%] pt-3 pl-8">
                            <div className="grid w-full max-w-sm items-center mt-[5rem] gap-3 mb-[2rem]">
                                <label htmlFor="title">Write a title to your gig post</label>
                                <Input className="border-black" id="title" type="text" />
                            </div>

                            <div className="flex flex-col gap-3">
                                <header className="font-semibold">Example titles</header>
                                <ul className="list-disc ml-6">
                                    <li>Clean a stained comfort room</li>
                                    <li>Pack and Label 40 orders of clothes</li>
                                    <li>Hand wash a 5 kilogram delicate clothes</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )}

                {/* ----------------------- STEP 2 ----------------------- */}
                {progress === 40 && (
                    <div className="flex">
                        <div className="w-[50%] p-10 pl-[16rem] flex flex-col gap-5">
                            <div className="flex gap-5">
                                <span>2/5</span>
                                <span>Gig post</span>
                            </div>
                            <header className="text-[2.1rem] font-semibold mr-[1rem] leading-none">
                                Choose the category of your gig.
                            </header>
                            <p>This helps your gig post to be clear to the potential gig workers.</p>
                        </div>

                        <div className="w-[50%] pt-[5rem] pl-8">
                            <div className="grid grid-cols-4 gap-4 pr-40">
                                {categories.map((cat) => (
                                    <div
                                        key={cat.id}
                                        onClick={() => {
                                            !cat.disabled && setSelected(cat.id)
                                            setSelectedCat(cat.name)
                                        }}
                                        className={`
                                            flex flex-col items-center justify-center rounded-lg border p-5 text-center
                                            ${cat.disabled
                                                ? "bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed"
                                                : selected === cat.id
                                                    ? "bg-blue-500 text-white border-blue-500 cursor-pointer"
                                                    : "bg-white text-black border-gray-300 hover:border-blue-400 cursor-pointer"
                                            }
                                        `}
                                    >
                                        <div className="mb-2">{cat.icon}</div>
                                        <p className="font-medium">{cat.name}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* ----------------------- STEP 3 ----------------------- */}
                {progress === 60 && (
                    <div className="flex">
                        <div className="w-[50%] p-10 pl-[16rem] flex flex-col gap-5">
                            <div className="flex gap-5">
                                <span>3/5</span>
                                <span>Gig post</span>
                            </div>
                            <header className="text-[2.1rem] font-semibold mr-[1rem] leading-none">
                                What are the main tasks required for your gig?
                            </header>
                        </div>

                        <div className="w-[50%] pt-[5rem] pl-8">

                            {/* Selected tasks */}
                            <div className="mb-6">
                                <header className="mb-[1rem] font-medium">Selected Tasks</header>
                                <div className="flex gap-2 flex-wrap">
                                    {selectedSkills.map((skill, index) => (
                                        <span
                                            key={index}
                                            onClick={() => {
                                                // Remove from selected
                                                setSelectedSkills(prev => prev.filter(s => s !== skill));
                                            }}
                                            className="px-3 py-1 bg-blue-500 text-white rounded-full text-sm cursor-pointer"
                                        >
                                            {skill} ✕
                                        </span>
                                    ))}

                                    {selectedSkills.length === 0 && (
                                        <p className="text-gray-400 text-sm">No Tasks selected</p>
                                    )}
                                </div>
                            </div>

                            {/* Skills for Category */}
                            <div>
                                <header className="mb-[1rem] font-medium">Tasks for {selectedCat}</header>

                                <div className="flex gap-2 flex-wrap pr-40">
                                    {selectedCat === "E-commerce" &&
                                        ecomSkills
                                            .filter(skill => !selectedSkills.includes(skill)) // hide selected
                                            .map((skill, index) => (
                                                <p
                                                    key={index}
                                                    onClick={() => {
                                                        setSelectedSkills(prev => [...prev, skill]);
                                                    }}
                                                    className="flex gap-2 px-3 py-1 bg-gray-200 rounded-full text-sm cursor-pointer hover:bg-gray-300"
                                                >
                                                    <span>{skill}</span> <DiamondPlus strokeWidth={0.5} size={20} />
                                                </p>
                                            ))
                                    }

                                    {selectedCat === "Cleaning" &&
                                        cleaningSkills
                                            .filter(skill => !selectedSkills.includes(skill))
                                            .map((skill, index) => (
                                                <p
                                                    key={index}
                                                    onClick={() => {
                                                        setSelectedSkills(prev => [...prev, skill]);
                                                    }}
                                                    className="flex items-center gap-2 px-3 py-1 bg-gray-200 rounded-full text-sm cursor-pointer hover:bg-gray-300"
                                                >
                                                    <span>{skill}</span> <DiamondPlus strokeWidth={0.5} size={20} />
                                                </p>
                                            ))
                                    }
                                </div>
                            </div>
                        </div>

                    </div>
                )}

                {/* ----------------------- STEP 4 ----------------------- */}
                {progress === 80 && (
                    <div className="flex">
                        <div className="w-[50%] p-10 pl-[16rem] flex flex-col gap-5">
                            <div className="flex gap-5">
                                <span>4/5</span>
                                <span>Gig post</span>
                            </div>
                            <header className="text-[2.1rem] font-semibold mr-[1rem] leading-none">
                                Estimate the scope of your work.
                            </header>
                        </div>

                        <div className="w-[50%] pt-[5rem] pl-8">
                            <div>
                                <RadioGroup defaultValue="comfortable">
                                    <div className="flex items-center gap-3">
                                        <RadioGroupItem value="Large" id="r1" />
                                        <Label htmlFor="r1">Large</Label>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <RadioGroupItem value="Medium" id="r2" />
                                        <Label htmlFor="r2">Medium</Label>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <RadioGroupItem value="Small" id="r3" />
                                        <Label htmlFor="r3">Small</Label>
                                    </div>
                                </RadioGroup>
                            </div>
                            <div>
                                <header>How long will your task take?</header>
                                <RadioGroup defaultValue="comfortable">
                                    <div className="flex flex-col">
                                        <div className="flex items-center gap-3">
                                            <RadioGroupItem value="default" id="r1" />
                                            <Label htmlFor="r1">1-3 hours</Label>
                                        </div>
                                        <p>try</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <RadioGroupItem value="comfortable" id="r2" />
                                        <Label htmlFor="r2">4-7 hours</Label>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <RadioGroupItem value="compact" id="r3" />
                                        <Label htmlFor="r3">1 day</Label>
                                    </div>
                                </RadioGroup>
                            </div>
                            <div>
                                <header>Is this gig likely to be a regular gig in the future?</header>
                                <RadioGroup defaultValue="comfortable">
                                    <div className="flex items-center gap-3">
                                        <RadioGroupItem value="default" id="r1" />
                                        <Label htmlFor="r1">Yes, I would like to hire a regular gigdaddy </Label>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <RadioGroupItem value="comfortable" id="r2" />
                                        <Label htmlFor="r2">No, not at this gig</Label>
                                    </div>
                                </RadioGroup>
                            </div>
                        </div>

                    </div>
                )}


            </div>

            {/* bottom status */}
            <div className="fixed bottom-0 left-0 w-full bg-white border-t pb-10">
                <div className="w-full flex flex-col gap-3">

                    <Progress value={progress} className="w-full" />

                    <div className="mx-[6rem] flex justify-between">
                        <Button
                            size="lg"
                            className="text-blue-600 hover:bg-blue-400 hover:text-black"
                            variant="outline"
                            disabled={progress === 20}
                            onClick={() => setProgress(progress - 20)}
                        >
                            Back
                        </Button>

                        <Button
                            onClick={() => setProgress(progress + 20)}
                            className="bg-blue-600 hover:bg-blue-300 hover:text-black"
                            size="lg"
                        >
                            Next
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
