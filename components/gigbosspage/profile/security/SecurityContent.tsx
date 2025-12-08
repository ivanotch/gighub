"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Lock, Shield, Smartphone, Bell, LogOut, CheckCircle } from "lucide-react";

export default function SecurityContent() {
    const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [smsNotifications, setSmsNotifications] = useState(true);

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [sessions, setSessions] = useState([
        { id: 1, device: "Chrome on Windows", location: "Manila, PH", lastActive: "2 hours ago", current: true },
        { id: 2, device: "Safari on iPhone", location: "Quezon City, PH", lastActive: "1 day ago", current: false },
        { id: 3, device: "Firefox on Mac", location: "San Mateo, PH", lastActive: "1 week ago", current: false },
    ]);

    const handlePasswordChange = () => {
        // Password change logic
        console.log("Changing password");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
    };

    const handleLogoutAll = () => {
        // Logout from all sessions logic
        console.log("Logging out from all sessions");
    };

    const handleEndSession = (id: number) => {
        setSessions(prev => prev.filter(session => session.id !== id));
    };

    return (
        <main className="w-full lg:w-[75%] px-4 mr-10">
            <div className="pt-[4rem] md:pt-[6rem]"> {/* Added this wrapper because jhon ivan Babbida, don't know how*/}
            <div className="flex flex-col mb-6">
                <header className="text-[1.6rem] font-semibold">Password & Security</header>
                <span className="text-gray-600">Manage your account security and privacy settings</span>
            </div>

            {/* Change Password */}
            <Card className="p-6 mb-8 shadow-sm">
                <CardHeader>
                    <CardTitle className="text-xl font-semibold flex items-center gap-2">
                        <Lock className="w-5 h-5" />
                        Change Password
                    </CardTitle>
                    <CardDescription>
                        Update your password to keep your account secure
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Current Password</label>
                        <Input 
                            type="password" 
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            placeholder="Enter current password"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">New Password</label>
                        <Input 
                            type="password" 
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="Enter new password"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Confirm New Password</label>
                        <Input 
                            type="password" 
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm new password"
                        />
                    </div>
                    <Button onClick={handlePasswordChange} className="mt-4">
                        Update Password
                    </Button>
                </CardContent>
            </Card>

            {/* Two-Factor Authentication */}
            <Card className="p-6 mb-8 shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle className="text-xl font-semibold flex items-center gap-2">
                            <Shield className="w-5 h-5" />
                            Two-Factor Authentication
                        </CardTitle>
                        <CardDescription>
                            Add an extra layer of security to your account
                        </CardDescription>
                    </div>
                    <Switch 
                        checked={twoFactorEnabled}
                        onCheckedChange={setTwoFactorEnabled}
                    />
                </CardHeader>

                {twoFactorEnabled && (
                    <CardContent>
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <div className="flex items-center gap-3 mb-3">
                                <Smartphone className="w-5 h-5 text-blue-600" />
                                <span className="font-semibold">Setup via Mobile App</span>
                            </div>
                            <ol className="space-y-2 text-sm text-gray-700 ml-8">
                                <li>1. Install Google Authenticator or similar app</li>
                                <li>2. Scan the QR code with your app</li>
                                <li>3. Enter the 6-digit code to verify</li>
                            </ol>
                            <div className="mt-4">
                                <Button variant="outline" size="sm">
                                    Setup Now
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                )}
            </Card>

            {/* Notification Settings */}
            <Card className="p-6 mb-8 shadow-sm">
                <CardHeader>
                    <CardTitle className="text-xl font-semibold flex items-center gap-2">
                        <Bell className="w-5 h-5" />
                        Notification Settings
                    </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium">Email Notifications</p>
                            <p className="text-sm text-gray-500">Receive updates via email</p>
                        </div>
                        <Switch 
                            checked={emailNotifications}
                            onCheckedChange={setEmailNotifications}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium">SMS Notifications</p>
                            <p className="text-sm text-gray-500">Receive SMS alerts for important updates</p>
                        </div>
                        <Switch 
                            checked={smsNotifications}
                            onCheckedChange={setSmsNotifications}
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Active Sessions */}
            <Card className="p-6 shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle className="text-xl font-semibold">Active Sessions</CardTitle>
                        <CardDescription>
                            Devices where you're currently logged in
                        </CardDescription>
                    </div>
                    <Button variant="outline" size="sm" onClick={handleLogoutAll}>
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout All Devices
                    </Button>
                </CardHeader>

                <CardContent>
                    <div className="space-y-4">
                        {sessions.map((session) => (
                            <div key={session.id} className="flex items-center justify-between p-4 border rounded-lg">
                                <div className="flex items-center gap-4">
                                    <div className="p-2 bg-gray-100 rounded-lg">
                                        {session.current ? (
                                            <CheckCircle className="w-6 h-6 text-green-600" />
                                        ) : (
                                            <Smartphone className="w-6 h-6 text-gray-600" />
                                        )}
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">{session.device}</h4>
                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <span>{session.location}</span>
                                            <span>•</span>
                                            <span>Last active: {session.lastActive}</span>
                                            {session.current && (
                                                <>
                                                    <span>•</span>
                                                    <span className="text-green-600 font-medium">Current</span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                {!session.current && (
                                    <Button 
                                        variant="ghost" 
                                        size="sm"
                                        onClick={() => handleEndSession(session.id)}
                                    >
                                        End Session
                                    </Button>
                                )}
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
            </div>
        </main>
    );
}