"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Check, Crown, Star, Zap, Users, Shield, X } from "lucide-react";

export default function MembershipContent() {
    const [selectedPlan, setSelectedPlan] = useState<string>("pro");
    
    const plans = [
        {
            id: "free",
            name: "Free",
            price: "₱0",
            period: "/month",
            description: "Basic features for occasional use",
            features: [
                { text: "Up to 3 active gig posts", included: true },
                { text: "Basic search filters", included: true },
                { text: "Standard customer support", included: true },
                { text: "Platform fee: 15%", included: true },
                { text: "Priority gig listing", included: false },
                { text: "Advanced analytics", included: false },
                { text: "Dedicated account manager", included: false },
            ],
            buttonText: "Current Plan",
            buttonVariant: "outline" as const,
        },
        {
            id: "pro",
            name: "Pro",
            price: "₱499",
            period: "/month",
            description: "For serious gigbosses",
            features: [
                { text: "Unlimited gig posts", included: true },
                { text: "Advanced search filters", included: true },
                { text: "Priority customer support", included: true },
                { text: "Platform fee: 12%", included: true },
                { text: "Priority gig listing", included: true },
                { text: "Advanced analytics", included: true },
                { text: "Dedicated account manager", included: false },
            ],
            buttonText: "Upgrade to Pro",
            buttonVariant: "default" as const,
            popular: true,
        },
        {
            id: "enterprise",
            name: "Enterprise",
            price: "₱1,499",
            period: "/month",
            description: "For businesses and agencies",
            features: [
                { text: "Unlimited gig posts", included: true },
                { text: "Advanced search filters", included: true },
                { text: "24/7 Priority support", included: true },
                { text: "Platform fee: 10%", included: true },
                { text: "Top priority gig listing", included: true },
                { text: "Advanced analytics + reports", included: true },
                { text: "Dedicated account manager", included: true },
            ],
            buttonText: "Contact Sales",
            buttonVariant: "outline" as const,
        },
    ];

    const currentUsage = {
        activeGigs: 2,
        maxGigs: 3,
        gigViews: "1,245",
        applications: 15,
        hiredGigDaddies: 8,
    };

    const benefits = [
        { icon: <Zap className="w-5 h-5" />, title: "Faster Hiring", description: "Get matched with qualified GigDaddies faster" },
        { icon: <Users className="w-5 h-5" />, title: "More Applicants", description: "Attract top talent with priority listing" },
        { icon: <Shield className="w-5 h-5" />, title: "Lower Fees", description: "Save on platform fees with membership" },
        { icon: <Star className="w-5 h-5" />, title: "Premium Support", description: "Get help when you need it most" },
    ];

    const handlePlanSelect = (planId: string) => {
        setSelectedPlan(planId);
        // Handle plan selection logic
        console.log("Selected plan:", planId);
    };

    return (
        <main className="w-full lg:w-[75%] px-4 mr-10">
            <div className="pt-[4rem] md:pt-[6rem]"> {/* Added this wrapper because jhon ivan Babbida, don't know how*/}
            <div className="flex flex-col mb-6">
                <header className="text-[1.6rem] font-semibold">Membership Plans</header>
                <span className="text-gray-600">Choose the plan that fits your hiring needs</span>
            </div>

            {/* Current Usage */}
            <Card className="p-6 mb-8 bg-gradient-to-r from-primary-50 to-blue-50 border-primary-200">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Crown className="w-5 h-5 text-primary-600" />
                        Your Current Usage (Free Plan)
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-primary-600">{currentUsage.activeGigs}/{currentUsage.maxGigs}</div>
                            <div className="text-sm text-gray-600">Active Gigs</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-primary-600">{currentUsage.gigViews}</div>
                            <div className="text-sm text-gray-600">Gig Views</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-primary-600">{currentUsage.applications}</div>
                            <div className="text-sm text-gray-600">Applications</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-primary-600">{currentUsage.hiredGigDaddies}</div>
                            <div className="text-sm text-gray-600">Hired GigDaddies</div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Membership Benefits */}
            <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Membership Benefits</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {benefits.map((benefit, index) => (
                        <div key={index} className="p-4 border rounded-lg hover:border-primary-300 transition-colors">
                            <div className="p-2 bg-primary-100 text-primary-600 rounded-lg w-fit mb-3">
                                {benefit.icon}
                            </div>
                            <h4 className="font-semibold mb-1">{benefit.title}</h4>
                            <p className="text-sm text-gray-600">{benefit.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Plan Selection */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {plans.map((plan) => (
                    <Card 
                        key={plan.id} 
                        className={`relative ${plan.popular ? 'border-primary-400 ring-1 ring-primary-200' : ''}`}
                    >
                        {plan.popular && (
                            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                                <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                                    Most Popular
                                </span>
                            </div>
                        )}
                        <CardHeader>
                            <CardTitle className="text-xl">{plan.name}</CardTitle>
                            <div className="flex items-baseline">
                                <span className="text-3xl font-bold">{plan.price}</span>
                                <span className="text-gray-500 ml-1">{plan.period}</span>
                            </div>
                            <CardDescription>{plan.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-3">
                                {plan.features.map((feature, index) => (
                                    <li key={index} className="flex items-center gap-2">
                                        {feature.included ? (
                                            <Check className="w-4 h-4 text-green-500" />
                                        ) : (
                                            <X className="w-4 h-4 text-gray-300" />
                                        )}
                                        <span className={feature.included ? "text-gray-700" : "text-gray-400"}>
                                            {feature.text}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                        <CardFooter>
                            <Button 
                                className="w-full"
                                variant={plan.buttonVariant}
                                onClick={() => handlePlanSelect(plan.id)}
                            >
                                {plan.buttonText}
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            {/* Billing History */}
            <Card className="shadow-sm">
                <CardHeader>
                    <CardTitle>Billing History</CardTitle>
                    <CardDescription>
                        View your past membership payments
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b">
                                    <th className="text-left py-3 px-4 font-semibold">Date</th>
                                    <th className="text-left py-3 px-4 font-semibold">Description</th>
                                    <th className="text-left py-3 px-4 font-semibold">Amount</th>
                                    <th className="text-left py-3 px-4 font-semibold">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b hover:bg-gray-50">
                                    <td className="py-3 px-4">2024-03-01</td>
                                    <td className="py-3 px-4">Monthly Subscription - Free Plan</td>
                                    <td className="py-3 px-4 font-semibold">₱0.00</td>
                                    <td className="py-3 px-4">
                                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                            Active
                                        </span>
                                    </td>
                                </tr>
                                <tr className="border-b hover:bg-gray-50">
                                    <td className="py-3 px-4">2024-02-01</td>
                                    <td className="py-3 px-4">Monthly Subscription - Free Plan</td>
                                    <td className="py-3 px-4 font-semibold">₱0.00</td>
                                    <td className="py-3 px-4">
                                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                            Expired
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
            </div>
        </main>
    );
}