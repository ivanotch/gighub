"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CreditCard, Wallet, History, Plus, Trash2, Edit } from "lucide-react";

export default function BillingContent() {
    const [paymentMethods, setPaymentMethods] = useState([
        { id: 1, type: "Credit Card", last4: "4242", expiry: "12/25", isDefault: true },
        { id: 2, type: "GCash", last4: "1234", expiry: "", isDefault: false },
        { id: 3, type: "PayPal", last4: "ppal", expiry: "", isDefault: false },
    ]);

    const [transactions, setTransactions] = useState([
        { id: 1, date: "2024-03-15", description: "GigDaddy Payment - Ivanotch", amount: "₱1,500.00", status: "Completed" },
        { id: 2, date: "2024-03-10", description: "Platform Fee", amount: "₱150.00", status: "Completed" },
        { id: 3, date: "2024-03-05", description: "GigDaddy Payment - Jay Untalan", amount: "₱2,300.00", status: "Pending" },
        { id: 4, date: "2024-02-28", description: "Membership Fee", amount: "₱499.00", status: "Completed" },
    ]);

    const [balance, setBalance] = useState("₱15,230.00");

    const handleAddPaymentMethod = () => {
        // Implementation for adding new payment method
        console.log("Add payment method");
    };

    const handleSetDefault = (id: number) => {
        setPaymentMethods(prev => prev.map(method => ({
            ...method,
            isDefault: method.id === id
        })));
    };

    const handleRemoveMethod = (id: number) => {
        setPaymentMethods(prev => prev.filter(method => method.id !== id));
    };

    return (
        <main className="w-full lg:w-[75%] px-4 mr-10">
            <div className="pt-[4rem] md:pt-[6rem]"> {/* Added this wrapper because jhon ivan Babbida, don't know how*/}
            <div className="flex flex-col mb-6">
                <header className="text-[1.6rem] font-semibold">Billing & Payment</header>
                <span className="text-gray-600">Manage your payment methods and transaction history</span>
            </div>

            {/* Current Balance */}
            <Card className="p-6 mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
                <div className="flex justify-between items-center">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-700">Current Balance</h3>
                        <p className="text-3xl font-bold text-primary-600">{balance}</p>
                        <p className="text-sm text-gray-500 mt-1">Available for withdrawal</p>
                    </div>
                    <Button className="bg-primary-600 hover:bg-primary-700">
                        <Wallet className="w-4 h-4 mr-2" />
                        Withdraw Funds
                    </Button>
                </div>
            </Card>

            {/* Payment Methods */}
            <Card className="p-6 mb-8 shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-xl font-semibold flex items-center gap-2">
                        <CreditCard className="w-5 h-5" />
                        Payment Methods
                    </CardTitle>
                    <Button size="sm" onClick={handleAddPaymentMethod}>
                        <Plus className="w-4 h-4 mr-1" />
                        Add New
                    </Button>
                </CardHeader>

                <CardContent>
                    <div className="space-y-4">
                        {paymentMethods.map((method) => (
                            <div key={method.id} className="flex items-center justify-between p-4 border rounded-lg">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-gray-100 rounded-lg">
                                        <CreditCard className="w-6 h-6 text-gray-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">{method.type} •••• {method.last4}</h4>
                                        <p className="text-sm text-gray-500">
                                            {method.expiry && `Expires ${method.expiry}`}
                                            {method.isDefault && <span className="ml-2 text-primary-600">• Default</span>}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    {!method.isDefault && (
                                        <Button 
                                            variant="outline" 
                                            size="sm"
                                            onClick={() => handleSetDefault(method.id)}
                                        >
                                            Set as Default
                                        </Button>
                                    )}
                                    <Button 
                                        variant="ghost" 
                                        size="sm"
                                        onClick={() => handleRemoveMethod(method.id)}
                                    >
                                        <Trash2 className="w-4 h-4 text-red-500" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Transaction History */}
            <Card className="p-6 shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-xl font-semibold flex items-center gap-2">
                        <History className="w-5 h-5" />
                        Transaction History
                    </CardTitle>
                    <Button variant="outline" size="sm">
                        Export CSV
                    </Button>
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
                                {transactions.map((transaction) => (
                                    <tr key={transaction.id} className="border-b hover:bg-gray-50">
                                        <td className="py-3 px-4">{transaction.date}</td>
                                        <td className="py-3 px-4">{transaction.description}</td>
                                        <td className="py-3 px-4 font-semibold">{transaction.amount}</td>
                                        <td className="py-3 px-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                transaction.status === 'Completed' 
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-yellow-100 text-yellow-800'
                                            }`}>
                                                {transaction.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
            </div>
        </main>
    );
}