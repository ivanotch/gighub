"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Download, Upload, Calendar } from "lucide-react";

export default function TaxContent() {
    const [taxInfo, setTaxInfo] = useState({
        tin: "123-456-789-000",
        businessName: "Ivanotch Enterprises",
        businessType: "sole_proprietorship",
        address: "123 Main St, Manila, Philippines",
        contactNumber: "09123456789",
    });

    const [taxDocuments, setTaxDocuments] = useState([
        { id: 1, name: "2307 Form - Q1 2024", date: "2024-03-31", status: "Submitted" },
        { id: 2, name: "Quarterly VAT Return - Q4 2023", date: "2024-01-25", status: "Processed" },
        { id: 3, name: "Annual Income Tax - 2023", date: "2024-04-15", status: "Pending" },
    ]);

    const [formData, setFormData] = useState({
        quarter: "q1_2024",
        grossIncome: "",
        taxWithheld: "",
        expenses: "",
    });

    const handleInputChange = (field: string, value: string) => {
        setTaxInfo(prev => ({ ...prev, [field]: value }));
    };

    const handleFormSubmit = () => {
        // Submit tax form logic
        console.log("Submitting tax form:", formData);
    };

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            console.log("Uploading file:", file.name);
            // Handle file upload logic
        }
    };

    return (
        <main className="w-full lg:w-[75%] px-4 mr-10">
            <div className="pt-[4rem] md:pt-[6rem]"> {/* Added this wrapper because jhon ivan Babbida, don't know how*/}
                <div className="flex flex-col mb-6">
                    <header className="text-[1.6rem] font-semibold">Tax Information</header>
                    <span className="text-gray-600">Manage your tax documents and filings</span>
                </div>

            {/* Tax Information */}
            <Card className="p-6 mb-8 shadow-sm">
                <CardHeader>
                    <CardTitle className="text-xl font-semibold flex items-center gap-2">
                        <FileText className="w-5 h-5" />
                        Tax Profile
                    </CardTitle>
                    <CardDescription>
                        Your registered tax information for billing purposes
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium mb-1">Tax Identification Number (TIN)</label>
                            <Input 
                                value={taxInfo.tin}
                                onChange={(e) => handleInputChange('tin', e.target.value)}
                                placeholder="Enter TIN"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Business Name</label>
                            <Input 
                                value={taxInfo.businessName}
                                onChange={(e) => handleInputChange('businessName', e.target.value)}
                                placeholder="Enter business name"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium mb-1">Business Type</label>
                            <Select 
                                value={taxInfo.businessType}
                                onValueChange={(value) => handleInputChange('businessType', value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select business type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="sole_proprietorship">Sole Proprietorship</SelectItem>
                                    <SelectItem value="partnership">Partnership</SelectItem>
                                    <SelectItem value="corporation">Corporation</SelectItem>
                                    <SelectItem value="llc">LLC</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Contact Number</label>
                            <Input 
                                value={taxInfo.contactNumber}
                                onChange={(e) => handleInputChange('contactNumber', e.target.value)}
                                placeholder="Enter contact number"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Business Address</label>
                        <Input 
                            value={taxInfo.address}
                            onChange={(e) => handleInputChange('address', e.target.value)}
                            placeholder="Enter business address"
                        />
                    </div>

                    <div className="flex justify-end">
                        <Button>Update Tax Information</Button>
                    </div>
                </CardContent>
            </Card>

            {/* Tax Filing Form */}
            <Card className="p-6 mb-8 shadow-sm">
                <CardHeader>
                    <CardTitle className="text-xl font-semibold flex items-center gap-2">
                        <Calendar className="w-5 h-5" />
                        File Tax Return
                    </CardTitle>
                    <CardDescription>
                        Submit your quarterly tax information
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium mb-1">Tax Quarter</label>
                            <Select 
                                value={formData.quarter}
                                onValueChange={(value) => setFormData(prev => ({ ...prev, quarter: value }))}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select quarter" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="q1_2024">Q1 2024 (Jan - Mar)</SelectItem>
                                    <SelectItem value="q2_2024">Q2 2024 (Apr - Jun)</SelectItem>
                                    <SelectItem value="q3_2024">Q3 2024 (Jul - Sep)</SelectItem>
                                    <SelectItem value="q4_2024">Q4 2024 (Oct - Dec)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-sm font-medium mb-1">Gross Income (₱)</label>
                            <Input 
                                value={formData.grossIncome}
                                onChange={(e) => setFormData(prev => ({ ...prev, grossIncome: e.target.value }))}
                                placeholder="0.00"
                                type="number"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Tax Withheld (₱)</label>
                            <Input 
                                value={formData.taxWithheld}
                                onChange={(e) => setFormData(prev => ({ ...prev, taxWithheld: e.target.value }))}
                                placeholder="0.00"
                                type="number"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Business Expenses (₱)</label>
                            <Input 
                                value={formData.expenses}
                                onChange={(e) => setFormData(prev => ({ ...prev, expenses: e.target.value }))}
                                placeholder="0.00"
                                type="number"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <Button variant="outline" className="flex items-center gap-2">
                            <Upload className="w-4 h-4" />
                            Upload Supporting Documents
                            <input 
                                type="file" 
                                className="hidden" 
                                id="tax-docs"
                                onChange={handleFileUpload}
                                accept=".pdf,.jpg,.png"
                            />
                        </Button>
                        <Button onClick={handleFormSubmit}>
                            Submit Tax Return
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Tax Documents */}
            <Card className="p-6 shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle className="text-xl font-semibold">Tax Documents</CardTitle>
                        <CardDescription>
                            View and download your tax filings
                        </CardDescription>
                    </div>
                    <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Download All
                    </Button>
                </CardHeader>

                <CardContent>
                    <div className="space-y-4">
                        {taxDocuments.map((doc) => (
                            <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                                <div className="flex items-center gap-4">
                                    <div className="p-2 bg-gray-100 rounded-lg">
                                        <FileText className="w-6 h-6 text-gray-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">{doc.name}</h4>
                                        <p className="text-sm text-gray-500">Filed on {doc.date}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                        doc.status === 'Submitted' 
                                            ? 'bg-blue-100 text-blue-800'
                                            : doc.status === 'Processed'
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-yellow-100 text-yellow-800'
                                    }`}>
                                        {doc.status}
                                    </span>
                                    <Button variant="ghost" size="sm">
                                        <Download className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
            </div>
        </main>
    );
}