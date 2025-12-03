'use client'
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button";
import { BrushCleaning, Drill, TruckElectric, ShoppingBag, DiamondPlus } from 'lucide-react';
import { useState } from "react";
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "next/navigation";

export default function GigPost() {
    const router = useRouter();
    const [selected, setSelected] = useState<number | null>(null);
    const [selectedCat, setSelectedCat] = useState("")
    const [progress, setProgress] = useState(20);
    const [title, setTitle] = useState("");
    const [pricing, setPricing] = useState("per_item");
    const [totalPrice, setTotalPrice] = useState(0)

    const [value, setValue] = useState<string>("");
    const [collapsed, setCollapsed] = useState(false);

    const [lengthValue, setLengthValue] = useState<string>("");
    const [lengthCollapsed, setLengthCollapsed] = useState(false);

    const [responseValue, setResponseValue] = useState<string>("");
    const [responseCollapsed, setResponseCollapsed] = useState(false);

    const sizeOptions = [
        {
            id: "r1",
            value: "Large",
            description:
                "Longer and complex task (ex. packing, labeling, and inventory of 50+ large sized orders)",
        },
        {
            id: "r2",
            value: "Medium",
            description:
                "Well-defined projects (ex. process and pack 30 order of clothes)",
        },
        {
            id: "r3",
            value: "Small",
            description:
                "Quick and straightforward tasks (ex. bubble wrap 20 items)",
        },
    ];

    const lengthOptions = [
        {
            id: "l1",
            value: "1-3 hours",
        },
        {
            id: "l2",
            value: "4-8 hours",
        },
        {
            id: "l3",
            value: "12 hours",
        },
    ];

    const responseOptions = [
        {
            id: "1",
            value: "Yes, I would like to hire a regular gigdaddy",
        },
        {
            id: "2",
            value: "No, not at this gig",
        }
    ];

    const selectedOption = sizeOptions.find((opt) => opt.value === value);
    const selectedLengthOption = lengthOptions.find((opt) => opt.value === lengthValue);
    const selectedResponseOption = responseOptions.find((opt) => opt.value === responseValue);


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
                    <div className="flex ">
                        <div className="w-[50%] p-10 pl-[16rem] flex flex-col gap-5">
                            <div className="flex gap-5">
                                <span>4/5</span>
                                <span>Gig post</span>
                            </div>
                            <header className="text-[2.1rem] font-semibold mr-[1rem] leading-none">
                                State the scope and price of your work.
                            </header>
                        </div>

                        <div className="w-[50%] pt-[5rem] pl-8 overflow-hidden">
                            <RadioGroup
                                onValueChange={(value) => setPricing(value)}
                                defaultValue="per_item"
                                className="flex pr-40 gap-4"
                            >

                                {/* Per Item */}
                                <Label
                                    htmlFor="per_item"
                                    className="flex flex-col items-start gap-4 border border-black rounded-sm p-5 cursor-pointer w-full"
                                >
                                    <div className="flex justify-between w-full items-center">
                                        <i className="text-[1.5rem] ri-list-check"></i>

                                        <RadioGroupItem
                                            value="per_item"
                                            id="per_item"
                                            className="h-6 w-6"
                                        />
                                    </div>

                                    <p className="text-[1.1rem] font-[500]">Per item price</p>
                                </Label>


                                {/* Hourly */}
                                <Label
                                    htmlFor="hourly"
                                    className="flex flex-col items-start  gap-4 border border-black rounded-sm p-5 cursor-pointer w-full"
                                >
                                    <div className="flex justify-between w-full items-center">
                                        <i className="text-[1.5rem] ri-time-line"></i>

                                        <RadioGroupItem
                                            value="hourly"
                                            id="hourly"
                                            className="h-6 w-6"
                                        />
                                    </div>
                                    <p className="text-[1.1rem] font-[500]">Hourly rate</p>
                                </Label>


                            </RadioGroup>

                            <div className="mt-3 mb-4">
                                {pricing === "per_item" ? (
                                    <p className="text-gray-600">This pricing is for specified task (ex. pack 15 items)</p>
                                ) : (
                                    <p className="text-gray-600">This pricing is for undefined task (ex. order processing, inventory management, etc.)</p>
                                )}
                            </div>

                            {pricing === "per_item" ? (
                                <div className="mb-3 pr-40">
                                    <div className="flex items-center">
                                        <div className="flex items-center gap-3 mr-2">
                                            <Label htmlFor="price" className="whitespace-nowrap">
                                                No. of items:
                                            </Label>

                                            <Input
                                                id="price"
                                                type="number"
                                                placeholder="Enter number"
                                                onChange={(e) => {
                                                    const items = Number(e.target.value);
                                                    setTotalPrice(items * 5);
                                                }}
                                                className="border-black"
                                            />
                                        </div>
                                        <p className="whitespace-nowrap"><i className="ri-close-line"></i> ₱5 per item</p>
                                    </div>
                                    <div className="mt-3">
                                        <div className="flex items-center gap-3 mr-2">
                                            <Label htmlFor="price" className="whitespace-nowrap">
                                                Total price:
                                            </Label>

                                            <Input
                                                id="price"
                                                value={`₱${totalPrice}`}
                                                disabled
                                                className="w-46 ml-3 text-black border-black opacity-100 disabled:opacity-100"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="mb-3 pr-40">
                                    <div className="flex items-center">
                                        <div className="flex items-center gap-3 mr-2">
                                            <Label htmlFor="price" className="whitespace-nowrap">
                                                No. of hours needed:
                                            </Label>

                                            <Input
                                                id="price"
                                                type="number"
                                                placeholder="Enter number"
                                                onChange={(e) => {
                                                    const items = Number(e.target.value);
                                                    setTotalPrice(items * 65);
                                                }}
                                                className="border-black"
                                            />
                                        </div>
                                        <p className="whitespace-nowrap"><i className="ri-close-line"></i> ₱65 per hour</p>
                                    </div>
                                    <div className="mt-3">
                                        <div className="flex items-center gap-3 mr-2">
                                            <Label htmlFor="price" className="whitespace-nowrap">
                                                Total price:
                                            </Label>

                                            <Input
                                                id="price"
                                                value={`₱${totalPrice}`}
                                                disabled
                                                className="w-46 ml-16 text-black border-black opacity-100 disabled:opacity-100"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="pr-40">
                                <header className="text-[1rem] font-[500] mt-2 mb-1">Select the size of your task.</header>

                                <div className="flex justify-between">
                                    <RadioGroup
                                    value={value}
                                    onValueChange={(val) => {
                                        setValue(val);
                                        setCollapsed(true); // collapse when selecting
                                    }}
                                    className=""
                                >
                                    {collapsed ? (
                                        selectedOption && (
                                            <div className="p-3">
                                                <div className="flex items-center mb-1 gap-3">
                                                    <RadioGroupItem className="border-blue-500" value={selectedOption.value} id={selectedOption.id} />
                                                    <Label htmlFor={selectedOption.id} className="text-[1rem] font-[500]">
                                                        {selectedOption.value}
                                                    </Label>
                                                </div>
                                                <p className="pl-7 text-gray-600">{selectedOption.description}</p>
                                            </div>
                                        )
                                    ) : (
                                        sizeOptions.map((opt) => (
                                            <div key={opt.id} className="flex gap-1 flex-col p-1">
                                                <div className="flex items-center gap-3">
                                                    <RadioGroupItem className="border-blue-500 " value={opt.value} id={opt.id} />
                                                    <Label className="text-[1rem] font-[500]" htmlFor={opt.id}>
                                                        {opt.value}
                                                    </Label>
                                                </div>
                                                <p className="pl-7 text-gray-600">{opt.description}</p>
                                            </div>
                                        ))
                                    )}
                                </RadioGroup>

                                {collapsed && (
                                    <Button
                                        variant="outline"
                                        className="rounded-full"
                                        onClick={() => setCollapsed(false)}
                                    >
                                        <i className="ri-quill-pen-ai-fill"></i>
                                    </Button>
                                )}
                                </div>
                            </div>

                            {/* <div className="pr-40">
                                <header className="text-[1rem] font-[500] mt-2 mb-1">How long will your task take?</header>
                                <div className="flex justify-between">
                                    <RadioGroup
                                        value={lengthValue}
                                        onValueChange={(val) => {
                                            setLengthValue(val);
                                            setLengthCollapsed(true); 
                                        }}
                                    >
                                        {lengthCollapsed ? (
                                            selectedLengthOption && (
                                                <div className="p-3">
                                                    <div className="flex items-center mb-1 gap-3">
                                                        <RadioGroupItem className="border-blue-500" value={selectedLengthOption.value} id={selectedLengthOption.id} />
                                                        <Label htmlFor={selectedLengthOption.id} className="text-[1rem] font-[500]">
                                                            {selectedLengthOption.value}
                                                        </Label>
                                                    </div>
                                                </div>
                                            )
                                        ) : (
                                            lengthOptions.map((opt) => (
                                                <div key={opt.id} className="flex gap-1 flex-col p-1">
                                                    <div className="flex items-center gap-3">
                                                        <RadioGroupItem className="border-blue-500 " value={opt.value} id={opt.id} />
                                                        <Label className="text-[1rem] font-[500]" htmlFor={opt.id}>
                                                            {opt.value}
                                                        </Label>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </RadioGroup>

                                    {lengthCollapsed && (
                                        <Button
                                            variant="outline"
                                            className="rounded-full"
                                            onClick={() => setLengthCollapsed(false)}
                                        >
                                            <i className="ri-quill-pen-ai-fill"></i>
                                        </Button>
                                    )}
                                </div>
                            </div> */}

                            <div className="pr-40 mb-40">
                                <header className="text-[1rem] font-[500] mt-2 mb-1">Is this gig likely to be a regular gig in the future?</header>
                                <div>
                                    <div className="flex justify-between">
                                        <RadioGroup
                                            value={responseValue}
                                            onValueChange={(val) => {
                                                setResponseValue(val);
                                                setResponseCollapsed(true); // collapse when selecting
                                            }}
                                        >
                                            {responseCollapsed ? (
                                                /* Show ONLY the selected option */
                                                selectedResponseOption && (
                                                    <div className="p-3">
                                                        <div className="flex items-center mb-1 gap-3">
                                                            <RadioGroupItem className="border-blue-500" value={selectedResponseOption.value} id={selectedResponseOption.id} />
                                                            <Label htmlFor={selectedResponseOption.id} className="text-[1rem] font-[500]">
                                                                {selectedResponseOption.value}
                                                            </Label>
                                                        </div>
                                                    </div>
                                                )
                                            ) : (
                                                /* Show ALL sizeOptions */
                                                responseOptions.map((opt) => (
                                                    <div key={opt.id} className="flex gap-1 flex-col p-1">
                                                        <div className="flex items-center gap-3">
                                                            <RadioGroupItem className="border-blue-500 " value={opt.value} id={opt.id} />
                                                            <Label className="text-[1rem] font-[500]" htmlFor={opt.id}>
                                                                {opt.value}
                                                            </Label>
                                                        </div>
                                                    </div>
                                                ))
                                            )}
                                        </RadioGroup>

                                        {/* Change / Expand Button */}
                                        {responseCollapsed && (
                                            <Button
                                                variant="outline"
                                                className="rounded-full"
                                                onClick={() => setResponseCollapsed(false)}
                                            >
                                                <i className="ri-quill-pen-ai-fill"></i>
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                )}

                {/* ----------------------- STEP 5 ----------------------- */}
                {progress === 100 && (
                    <div className="flex">
                        <div className="w-[50%] p-10 pl-[16rem] flex flex-col gap-5">
                            <div className="flex gap-5">
                                <span>5/5</span>
                                <span>Gig post</span>
                            </div>
                            <header className="text-[2.1rem] font-semibold mr-[1rem] leading-none">
                                Provide a description
                            </header>
                            <div className="flex flex-col gap-2">
                                <header>Gigdaddy would like to know:</header>
                                <ul className="list-disc ml-6">
                                    <li>What and what not to do</li>
                                    <li>Additional information regarding the task</li>
                                    <li>Expectations about the gig</li>
                                </ul>
                            </div>
                        </div>

                        <div className="w-[50%] pt-[5rem] pl-8 pr-40">
                            <header className="text-[1rem] font-[500] mb-2">Describe what you need</header>
                            <Textarea className="h-30" placeholder="Type your description here." />
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

                        {progress === 100 ? (
                            <Button
                                onClick={() => router.push('/gigbosses/')}
                                className="bg-blue-600 hover:bg-blue-300 hover:text-black"
                                size="lg"
                            >
                                Submit
                            </Button>
                        ) : (
                            <Button
                                onClick={() => setProgress(progress + 20)}
                                className="bg-blue-600 hover:bg-blue-300 hover:text-black"
                                size="lg"
                                disabled={progress === 100}
                            >
                                Next
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
