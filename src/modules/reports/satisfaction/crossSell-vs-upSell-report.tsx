"use client"

import { apiEndPoint, colors } from '@/utils/colors';
import * as React from "react";
import { useState, useEffect } from "react";
import toast from 'react-hot-toast';
import { Check, X, BadgeAlert, AlertTriangle, Filter } from "lucide-react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import SquareCircleLoader from "@/lib/square-circle-loader"
import { Label } from "@/components/ui/label";

interface CrossSellUpsellData {
    store_id: string;
    store_name: string;
    date: string;
    total_transactions_with_cross_sell: number;
    total_transactions: number;
    cross_sell_upsell_rate: number;
}


const crossSellUpsellData: CrossSellUpsellData[] = [
    {
        store_id: 'SOO1',
        store_name: 'PLUS DC Stellenbosch',
        date: '2024-10-01',
        total_transactions_with_cross_sell: 200,
        total_transactions: 1500,
        cross_sell_upsell_rate: 13.33,
    },
    {
        store_id: 'SOO2',
        store_name: 'PLUS DC Albertin',
        date: '2024-10-01',
        total_transactions_with_cross_sell: 150,
        total_transactions: 1200,
        cross_sell_upsell_rate: 12.50,
    },
    {
        store_id: 'SOO3',
        store_name: 'PLUS DC Bellville',
        date: '2024-10-01',
        total_transactions_with_cross_sell: 300,
        total_transactions: 1800,
        cross_sell_upsell_rate: 16.67,
    },
    {
        store_id: 'SOO4',
        store_name: 'PLUS DC Nelspruit',
        date: '2024-10-05',
        total_transactions_with_cross_sell: 180,
        total_transactions: 1400,
        cross_sell_upsell_rate: 12.86,
    },
    {
        store_id: 'SOO5',
        store_name: 'PLUS DC Durbanville',
        date: '2024-10-07',
        total_transactions_with_cross_sell: 250,
        total_transactions: 1600,
        cross_sell_upsell_rate: 15.63,
    },
    {
        store_id: 'SOO6',
        store_name: 'PLUS DC Bloemfontein',
        date: '2024-10-10',
        total_transactions_with_cross_sell: 350,
        total_transactions: 2250,
        cross_sell_upsell_rate: 15.56,
    },
    {
        store_id: 'SOO7',
        store_name: 'PLUS DC Cape Town',
        date: '2024-10-12',
        total_transactions_with_cross_sell: 400,
        total_transactions: 3000,
        cross_sell_upsell_rate: 13.33,
    },
    {
        store_id: 'SOO8',
        store_name: 'PLUS DC Pietermaritzburg',
        date: '2024-10-14',
        total_transactions_with_cross_sell: 170,
        total_transactions: 1350,
        cross_sell_upsell_rate: 12.59,
    },
    {
        store_id: 'SOO9',
        store_name: 'PLUS DC East London',
        date: '2024-10-15',
        total_transactions_with_cross_sell: 220,
        total_transactions: 1800,
        cross_sell_upsell_rate: 12.22,
    },
    {
        store_id: 'SOO10',
        store_name: 'PLUS DC Pretoria',
        date: '2024-10-18',
        total_transactions_with_cross_sell: 280,
        total_transactions: 2450,
        cross_sell_upsell_rate: 11.43,
    },
    {
        store_id: 'SOO11',
        store_name: 'PLUS DC Germiston',
        date: '2024-10-20',
        total_transactions_with_cross_sell: 200,
        total_transactions: 1550,
        cross_sell_upsell_rate: 12.90,
    },
    {
        store_id: 'SOO12',
        store_name: 'PLUS DC Polokwane',
        date: '2024-10-22',
        total_transactions_with_cross_sell: 230,
        total_transactions: 2050,
        cross_sell_upsell_rate: 11.22,
    },
];


const stores = [
    { id: 1, store_id: 'SOO1', store: 'PLUS DC Stellenbosch' },
    { id: 2, store_id: 'SOO2', store: 'PLUS DC Albertin' },
    { id: 3, store_id: 'SOO3', store: 'PLUS DC Bellville' },
    { id: 4, store_id: 'SOO4', store: 'PLUS DC Nelspruit' }, 
    { id: 5, store_id: 'SOO5', store: 'PLUS DC Durbanville' },
    { id: 6, store_id: 'SOO6', store: 'PLUS DC Bloemfontein' }, 
    { id: 7, store_id: 'SOO7', store: 'PLUS DC Cape Town' },
    { id: 8, store_id: 'SOO8', store: 'PLUS DC Pietermaritzburg' }, 
    { id: 9, store_id: 'SOO9', store: 'PLUS DC East London' }, 
    { id: 10, store_id: 'SOO10', store: 'PLUS DC Pretoria' },
    { id: 11, store_id: 'SOO11', store: 'PLUS DC Germiston' },
    { id: 12, store_id: 'SOO12', store: 'PLUS DC Polokwane' },
];


export const CrossvsUpsellReport = () => {
    const headers = ['Store ID', 'Store Name', 'Date', 'Average Time to First Redemption (Days)', 'Total New Members', 'Count of First Redemptions'];

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [selectedStore, setSelectedStore] = useState('');
    const [filteredData, setFilteredData] = useState<CrossSellUpsellData[]>([]); // Explicitly typed state
    const [isLoading, setIsLoading] = useState(false); // Loading state to control the loader
    const [isError, setIsError] = useState(false); // Error state to handle no data

    // Filter function to handle filtering by date range and store
    const handleFilter = () => {
        setIsLoading(true);
        let filtered = crossSellUpsellData;  // Start with full data set
        
        // Filter by selected date range (startDate and endDate)
        if (startDate && endDate) {
            filtered = filtered.filter(item => item.date >= startDate && item.date <= endDate);
        }

        // Filter by selected store if not "All"
        if (selectedStore !== 'All') {
            filtered = filtered.filter(item => item.store_id === selectedStore);
        }

        setFilteredData(filtered);  // Set filtered data to state

        // Handle case when no data matches the filters
        if (filtered.length === 0) {
            setIsError(true);
            toast.error('No data found for the selected filters!', {
                icon: <X color={colors.red} size={24} />,
                duration: 3000,
            });
        } else {
            setIsError(false);
        }

        setIsLoading(false);  // Disable loader after filtering
    };

    // Display loading screen if data is being fetched
    if (isLoading) {
        return (
            <div className="h-screen overflow-y-auto pl-2 pt-4">
            {/* <div className="">
                <h4 className="text-xl font-bold">Redemption Rate</h4>
                <p className="text-sm text-gray-500">Percentage of redeemed vs unredeemed discounts</p>
            </div> */}
            <div className='flex gap-4'>
                <div className="pt-6">
                    <div className="flex gap-4">
                        <div className="w-[270px]">
                            <Label htmlFor="username" className="text-left pt-4">
                                Start Date:
                            </Label>
                            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className='w-full p-2 rounded-lg border border-gray-300'/>
                        </div>
                        <div className="w-[270px]">
                            <Label htmlFor="username" className="text-left pt-4">
                                End Date:
                            </Label>
                            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className='w-full p-2 rounded-lg border border-gray-300'/>
                        </div>
                    </div>
                </div>
                <div className="pt-6">
                    <Label htmlFor="username" className="text-left">
                        Store:
                    </Label>
                    <Select onValueChange={(value) => setSelectedStore(value)}>
                        <SelectTrigger className="w-[200px] bg-white">
                            <SelectValue placeholder="Select a store" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Store</SelectLabel>
                                <SelectItem value="All">All</SelectItem>
                                {stores.map(({ id, store_id, store }) => (
                                    <SelectItem key={id} value={store_id}>{store_id}</SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex justify-end w-full pt-12">
                    <button className="bg-red hover:bg-black text-white w-20 h-11 rounded shadow-lg flex items-center justify-center" onClick={handleFilter}>
                        <Filter />
                    </button>
                </div>
            </div>

            <div className="bg-white text-gray-500 flex items-center justify-between divide-x divide-gray-500 p-3 mt-4 rounded shadow-lg">
                {headers.map((header, index) => (
                    <p key={index} className={`text-xs uppercase font-medium flex-1 text-center ${index === 1 ? 'hidden lg:block' : ''}`}>
                        {header}
                    </p>
                ))}
            </div>

                <div className="pt-20 flex flex-col items-center justify-center">
                    <SquareCircleLoader />
                    <p className="text-gray-500 uppercase pt-4">Loading data, please be patient.</p>
                </div>
            </div>
        );
    }

    // Show error message if there is no data for the selected month
    if (isError) {
        return (
            <div className="h-screen overflow-y-auto pl-2 pt-4">
            {/* <div className="">
                <h4 className="text-xl font-bold">Redemption Rate</h4>
                <p className="text-sm text-gray-500">Percentage of redeemed vs unredeemed discounts</p>
            </div> */}
            <div className='flex gap-4'>
                <div className="pt-6">
                    <div className="flex gap-4">
                        <div className="w-[270px]">
                            <Label htmlFor="username" className="text-left pt-4">
                                Start Date:
                            </Label>
                            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className='w-full p-2 rounded-lg border border-gray-300'/>
                        </div>
                        <div className="w-[270px]">
                            <Label htmlFor="username" className="text-left pt-4">
                                End Date:
                            </Label>
                            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className='w-full p-2 rounded-lg border border-gray-300'/>
                        </div>
                    </div>
                </div>
                <div className="pt-6">
                    <Label htmlFor="username" className="text-left">
                        Store:
                    </Label>
                    <Select onValueChange={(value) => setSelectedStore(value)}>
                        <SelectTrigger className="w-[200px] bg-white">
                            <SelectValue placeholder="Select a store" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Store</SelectLabel>
                                <SelectItem value="All">All</SelectItem>
                                {stores.map(({ id, store_id, store }) => (
                                    <SelectItem key={id} value={store_id}>{store_id}</SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex justify-end w-full pt-12">
                    <button className="bg-red hover:bg-black text-white w-20 h-11 rounded shadow-lg flex items-center justify-center" onClick={handleFilter}>
                        <Filter />
                    </button>
                </div>
            </div>

            <div className="bg-white text-gray-500 flex items-center justify-between divide-x divide-gray-500 p-3 mt-4 rounded shadow-lg">
                {headers.map((header, index) => (
                    <p key={index} className={`text-xs uppercase font-medium flex-1 text-center ${index === 1 ? 'hidden lg:block' : ''}`}>
                        {header}
                    </p>
                ))}
            </div>

                <div className="flex flex-col items-center justify-center pt-20">
                    <AlertTriangle size={44} />
                    <p className="ml-2 uppercase pt-2 text-red">There is no data available for the selected month!</p>
                </div>
            </div>
        );
    }

    return (
        <div className="h-screen overflow-y-auto pl-2 pt-4">
            {/* <div className="">
                <h4 className="text-xl font-bold">Redemption Rate</h4>
                <p className="text-sm text-gray-500">Percentage of redeemed vs unredeemed discounts</p>
            </div> */}
            <div className='flex gap-4'>
                <div className="pt-6">
                    <div className="flex gap-4">
                        <div className="w-[270px]">
                            <Label htmlFor="username" className="text-left pt-4">
                                Start Date:
                            </Label>
                            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className='w-full p-2 rounded-lg border border-gray-300'/>
                        </div>
                        <div className="w-[270px]">
                            <Label htmlFor="username" className="text-left pt-4">
                                End Date:
                            </Label>
                            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className='w-full p-2 rounded-lg border border-gray-300'/>
                        </div>
                    </div>
                </div>
                <div className="pt-6">
                    <Label htmlFor="username" className="text-left">
                        Store:
                    </Label>
                    <Select onValueChange={(value) => setSelectedStore(value)}>
                        <SelectTrigger className="w-[200px] bg-white">
                            <SelectValue placeholder="Select a store" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Store</SelectLabel>
                                <SelectItem value="All">All</SelectItem>
                                {stores.map(({ id, store_id, store }) => (
                                    <SelectItem key={id} value={store_id}>{store_id}</SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex justify-end w-full pt-12">
                    <button className="bg-red hover:bg-black text-white w-20 h-11 rounded shadow-lg flex items-center justify-center" onClick={handleFilter}>
                        <Filter />
                    </button>
                </div>
            </div>

            <div className="bg-white text-gray-500 flex items-center justify-between divide-x divide-gray-500 p-3 mt-4 rounded shadow-lg">
                {headers.map((header, index) => (
                    <p key={index} className={`text-xs uppercase font-medium flex-1 text-center ${index === 1 ? 'hidden lg:block' : ''}`}>
                        {header}
                    </p>
                ))}
            </div>
            <div className="pt-2 max-h-screen pb-2 space-y-2">
                {filteredData.map(({ store_id, store_name, date, total_transactions_with_cross_sell, total_transactions, cross_sell_upsell_rate }) => (
                    <div key={store_id} className="bg-white flex flex-col p-3 rounded shadow-lg">
                        <div className="flex items-center justify-between divide-x divide-gray-300">
                            <p className="text-sm flex-1 text-center text-purple">{store_id}</p>
                            <p className="text-sm flex-1 text-center text">{store_name}</p>
                            <p className="text-sm flex-1 text-center">{date}</p>
                            <p className="text-sm flex-1 text-center uppercase">{total_transactions_with_cross_sell}</p>
                            <p className="text-sm flex-1 text-center uppercase">{total_transactions}</p>
                            <p className="text-sm flex-1 text-center uppercase">{cross_sell_upsell_rate}%</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};