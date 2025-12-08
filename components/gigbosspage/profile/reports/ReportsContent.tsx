"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart3, Download, TrendingUp, Users, Clock, DollarSign, PieChart } from "lucide-react";

export default function ReportsContent() {
    const [timeRange, setTimeRange] = useState("last_30_days");
    const [reportType, setReportType] = useState("overview");

    const stats = [
        { label: "Total Gigs Posted", value: "24", change: "+12%", icon: <BarChart3 className="w-5 h-5" />, color: "bg-blue-500" },
        { label: "Active Hires", value: "8", change: "+2", icon: <Users className="w-5 h-5" />, color: "bg-green-500" },
        { label: "Total Hours Worked", value: "156", change: "+24h", icon: <Clock className="w-5 h-5" />, color: "bg-purple-500" },
        { label: "Total Spent", value: "₱15,230", change: "+₱2,450", icon: <DollarSign className="w-5 h-5" />, color: "bg-amber-500" },
    ];

    const popularServices = [
        { service: "Cleaning Services", count: 15, percentage: 25 },
        { service: "Construction Work", count: 12, percentage: 20 },
        { service: "Manual Labor", count: 10, percentage: 17 },
        { service: "Tech Support", count: 8, percentage: 13 },
        { service: "Writing Services", count: 6, percentage: 10 },
        { service: "Others", count: 9, percentage: 15 },
    ];

    const recentActivity = [
        { date: "2024-03-15", action: "Hired GigDaddy", details: "Ivanotch Babida for Cleaning", amount: "₱1,500" },
        { date: "2024-03-14", action: "Posted New Gig", details: "House Cleaning - Marikina", amount: "₱800-₱1,200" },
        { date: "2024-03-12", action: "Payment Released", details: "To Jay Untalan", amount: "₱2,300" },
        { date: "2024-03-10", action: "Gig Completed", details: "Construction Work - San Mateo", amount: "₱3,500" },
        { date: "2024-03-08", action: "New Applicant", details: "Matthew Perez applied", amount: "" },
    ];

    const handleGenerateReport = () => {
        // Generate report logic
        console.log("Generating report for:", { timeRange, reportType });
    };

    const handleExportReport = (format: string) => {
        // Export report logic
        console.log("Exporting report as:", format);
    };

    return (
        <main className="w-full lg:w-[75%] px-4 mr-10">
            <div className="pt-[4rem] md:pt-[6rem]"> {/* Added this wrapper because jhon ivan Babbida, don't know how*/}
            <div className="flex flex-col mb-6">
                <header className="text-[1.6rem] font-semibold">Reports & Updates</header>
                <span className="text-gray-600">Track your hiring performance and activities</span>
            </div>

            {/* Filters */}
            <Card className="p-6 mb-8 shadow-sm">
                <CardContent className="flex flex-col md:flex-row gap-4 items-center">
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Time Range</label>
                            <Select value={timeRange} onValueChange={setTimeRange}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select time range" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="last_7_days">Last 7 Days</SelectItem>
                                    <SelectItem value="last_30_days">Last 30 Days</SelectItem>
                                    <SelectItem value="last_quarter">Last Quarter</SelectItem>
                                    <SelectItem value="last_year">Last Year</SelectItem>
                                    <SelectItem value="custom">Custom Range</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Report Type</label>
                            <Select value={reportType} onValueChange={setReportType}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select report type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="overview">Overview</SelectItem>
                                    <SelectItem value="financial">Financial</SelectItem>
                                    <SelectItem value="hiring">Hiring Activity</SelectItem>
                                    <SelectItem value="performance">Performance</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button onClick={handleGenerateReport}>
                            Generate Report
                        </Button>
                        <Button variant="outline" onClick={() => handleExportReport("pdf")}>
                            <Download className="w-4 h-4 mr-2" />
                            Export
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => (
                    <Card key={index} className="shadow-sm">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`p-2 rounded-lg ${stat.color} text-white`}>
                                    {stat.icon}
                                </div>
                                <span className="text-sm font-medium text-green-600 flex items-center">
                                    <TrendingUp className="w-4 h-4 mr-1" />
                                    {stat.change}
                                </span>
                            </div>
                            <h3 className="text-2xl font-bold mb-1">{stat.value}</h3>
                            <p className="text-gray-600">{stat.label}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Popular Services */}
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <PieChart className="w-5 h-5" />
                            Popular Services
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {popularServices.map((service, index) => (
                                <div key={index} className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                                        <span className="font-medium">{service.service}</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                                            <div 
                                                className="h-full bg-blue-500 rounded-full"
                                                style={{ width: `${service.percentage}%` }}
                                            ></div>
                                        </div>
                                        <span className="font-semibold">{service.count} gigs</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card className="shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Recent Activity</CardTitle>
                        <Button variant="ghost" size="sm">
                            View All
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recentActivity.map((activity, index) => (
                                <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className="font-semibold">{activity.action}</span>
                                            <span className="text-sm text-gray-500">• {activity.date}</span>
                                        </div>
                                        <p className="text-sm text-gray-600 mt-1">{activity.details}</p>
                                    </div>
                                    {activity.amount && (
                                        <span className="font-semibold text-primary-600">
                                            {activity.amount}
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Monthly Summary */}
            <Card className="shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Monthly Summary</CardTitle>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleExportReport("pdf")}>
                            <Download className="w-4 h-4 mr-2" />
                            PDF
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleExportReport("excel")}>
                            <Download className="w-4 h-4 mr-2" />
                            Excel
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b">
                                    <th className="text-left py-3 px-4 font-semibold">Month</th>
                                    <th className="text-left py-3 px-4 font-semibold">Gigs Posted</th>
                                    <th className="text-left py-3 px-4 font-semibold">Hires Made</th>
                                    <th className="text-left py-3 px-4 font-semibold">Total Spent</th>
                                    <th className="text-left py-3 px-4 font-semibold">Avg. Rating</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b hover:bg-gray-50">
                                    <td className="py-3 px-4 font-medium">March 2024</td>
                                    <td className="py-3 px-4">8</td>
                                    <td className="py-3 px-4">3</td>
                                    <td className="py-3 px-4 font-semibold">₱7,300</td>
                                    <td className="py-3 px-4">4.8 ★</td>
                                </tr>
                                <tr className="border-b hover:bg-gray-50">
                                    <td className="py-3 px-4 font-medium">February 2024</td>
                                    <td className="py-3 px-4">6</td>
                                    <td className="py-3 px-4">2</td>
                                    <td className="py-3 px-4 font-semibold">₱4,500</td>
                                    <td className="py-3 px-4">4.5 ★</td>
                                </tr>
                                <tr className="border-b hover:bg-gray-50">
                                    <td className="py-3 px-4 font-medium">January 2024</td>
                                    <td className="py-3 px-4">5</td>
                                    <td className="py-3 px-4">2</td>
                                    <td className="py-3 px-4 font-semibold">₱3,430</td>
                                    <td className="py-3 px-4">4.7 ★</td>
                                </tr>
                                <tr className="hover:bg-gray-50">
                                    <td className="py-3 px-4 font-medium">December 2023</td>
                                    <td className="py-3 px-4">5</td>
                                    <td className="py-3 px-4">1</td>
                                    <td className="py-3 px-4 font-semibold">₱2,800</td>
                                    <td className="py-3 px-4">4.6 ★</td>
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