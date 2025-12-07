"use client";

import { useState, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil } from "lucide-react";

export default function MainContent() {
    const [isEditing, setIsEditing] = useState(false);

    // Profile image state
    const [profilePic, setProfilePic] = useState("/placeholder.jpg");

    // Hidden file input reference
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    // User info states
    const [firstName, setFirstName] = useState("Matthew");
    const [lastName, setLastName] = useState("Perez");
    const [email, setEmail] = useState("Matt.bscs@example.com");
    const [contact, setContact] = useState("09283948372");


    // Backup state for cancel
    const [backupData, setBackupData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        profilePic: "",
        contact: "",
    });

    // Open file picker when clicking avatar
    const handleAvatarClick = () => {
        if (isEditing && fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    // Handle image selection + preview
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setProfilePic(imageUrl); // Preview image
        }
    };

    // Enter edit mode
    const handleEdit = () => {
        setBackupData({ firstName, lastName, email, profilePic, contact });
        setIsEditing(true);
    };

    // Cancel edits
    const handleCancel = () => {
        setFirstName(backupData.firstName);
        setLastName(backupData.lastName);
        setEmail(backupData.email);
        setProfilePic(backupData.profilePic);
        setContact(backupData.contact)
        setIsEditing(false);
    };

    // Save edits
    const handleSave = () => {
        setIsEditing(false);
        // TODO: API upload for profilePic & user info
    };

    return (
        <main className="w-full lg:w-[75%] px-4 mr-10">
            <div className="flex flex-col mb-6">
                <header className="text-[1.6rem] font-semibold">My Profile</header>
                <span className="text-gray-600">This is a gigboss account</span>
            </div>

            <Card className="p-4 mb-9 shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-xl font-semibold">Account</CardTitle>

                    {!isEditing && (
                        <Button
                            variant="ghost"
                            size="sm"
                            className="flex items-center gap-1"
                            onClick={handleEdit}
                        >
                            <Pencil className="w-4 h-4" />
                            Edit
                        </Button>
                    )}
                </CardHeader>

                <CardContent className="flex items-start gap-8 mt-2">
                    {/* Avatar Upload Section */}
                    <div
                        className={`flex items-center cursor-pointer ${isEditing ? "hover:opacity-80" : ""}`}
                        onClick={handleAvatarClick}
                    >
                        <Avatar className="w-20 h-20 border">
                            <AvatarImage src={profilePic} alt="Profile" />
                            <AvatarFallback>GB</AvatarFallback>
                        </Avatar>

                        {/* Hidden File Input */}
                        {isEditing && (
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleImageChange}
                            />
                        )}
                    </div>

                    {/* Account Info */}
                    <div className="flex-1">
                        <div className="grid mb-10 grid-cols-2 gap-6">
                            <div className="flex flex-col">
                                <span className="text-sm text-gray-600">First Name</span>
                                {!isEditing ? (
                                    <span className="font-medium text-[1.05rem]">{firstName}</span>
                                ) : (
                                    <Input
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        className="mt-1"
                                    />
                                )}
                            </div>

                            <div className="flex flex-col">
                                <span className="text-sm text-gray-600">Last Name</span>
                                {!isEditing ? (
                                    <span className="font-medium text-[1.05rem]">{lastName}</span>
                                ) : (
                                    <Input
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        className="mt-1"
                                    />
                                )}
                            </div>
                        </div>

                        <div className="grid mb-10 grid-cols-2 gap-6">
                            <div className="flex flex-col my-4">
                                <span className="text-sm text-gray-600">Email</span>
                                {!isEditing ? (
                                    <span className="font-medium text-[1.05rem]">{email}</span>
                                ) : (
                                    <Input
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="mt-1"
                                    />
                                )}
                            </div>

                            <div className="flex flex-col my-4">
                                <span className="text-sm text-gray-600">Contact</span>
                                {!isEditing ? (
                                    <span className="font-medium text-[1.05rem]">{contact}</span>
                                ) : (
                                    <Input
                                        value={contact}
                                        onChange={(e) => setContact(e.target.value)}
                                        className="mt-1"
                                    />
                                )}
                            </div>
                        </div>


                        {isEditing && (
                            <div className="flex gap-3 mt-4">
                                <Button onClick={handleSave}>Save</Button>
                                <Button variant="outline" onClick={handleCancel}>
                                    Cancel
                                </Button>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>

            <Card className="p-4 mb-9 shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-xl font-semibold">Company Details</CardTitle>

                    {!isEditing && (
                        <Button
                            variant="ghost"
                            size="sm"
                            className="flex items-center gap-1"
                            onClick={handleEdit}
                        >
                            <Pencil className="w-4 h-4" />
                            Edit
                        </Button>
                    )}
                </CardHeader>

                <CardContent className="flex items-start gap-8 mt-2">
                    {/* Avatar Upload Section */}
                    <div
                        className={`flex items-center cursor-pointer ${isEditing ? "hover:opacity-80" : ""}`}
                        onClick={handleAvatarClick}
                    >
                        <Avatar className="w-20 h-20 border">
                            <AvatarImage src={profilePic} alt="Profile" />
                            <AvatarFallback><i className="ri-hotel-line"></i></AvatarFallback>
                        </Avatar>

                        {/* Hidden File Input */}
                        {isEditing && (
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleImageChange}
                            />
                        )}
                    </div>

                    {/* Account Info */}
                    <div className="flex-1">
                        
                        <div>
                            Company name
                        </div>

                        <div>
                            Website
                        </div>

                        <div>
                            Dropdown option 
                            {/* E-commerce/cleaning */}
                        </div>



                        {isEditing && (
                            <div className="flex gap-3 mt-4">
                                <Button onClick={handleSave}>Save</Button>
                                <Button variant="outline" onClick={handleCancel}>
                                    Cancel
                                </Button>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </main>
    );
}
