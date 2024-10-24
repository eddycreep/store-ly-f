"use client"

import { apiEndPoint, colors } from '@/utils/colors';
import * as React from "react";
import { useState, useEffect } from "react";
import toast from 'react-hot-toast';
import { Check, X, BadgeAlert, AlertTriangle, Filter } from "lucide-react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import SquareCircleLoader from "@/lib/square-circle-loader"
import { Label } from "@/components/ui/label";

const activeMembers = [
    {
        store_id: 'SOO1',
        store_name: 'PLUS DC Stellenbosch',
        date: '2024-10-01',
        total_active_members: 1500,
        percentage_active_members: 75,
        loyalty_tier: 'Platinum'
    },
    {
        store_id: 'SOO2',
        store_name: 'PLUS DC Albertin',
        date: '2024-10-01',
        total_active_members: 1200,
        percentage_active_members: 60,
        loyalty_tier: 'Platinum'
    },
    {
        store_id: 'SOO3',
        store_name: 'PLUS DC Bellville',
        date: '2024-10-01',
        total_active_members: 1800,
        percentage_active_members: 90,
        loyalty_tier: 'Diamond'
    },
    {
        store_id: 'SOO4',
        store_name: 'PLUS DC Nelspruit',
        date: '2024-10-01',
        total_active_members: 800,
        percentage_active_members: 40,
        loyalty_tier: 'Gold'
    },
    {
        store_id: 'SOO5',
        store_name: 'PLUS DC Durbanville',
        date: '2024-10-01',
        total_active_members: 1300,
        percentage_active_members: 65,
        loyalty_tier: 'Platinum'
    },
    {
        store_id: 'SOO6',
        store_name: 'PLUS DC Bloemfontein',
        date: '2024-10-01',
        total_active_members: 900,
        percentage_active_members: 45,
        loyalty_tier: 'Gold'
    },
    {
        store_id: 'SOO7',
        store_name: 'PLUS DC Cape Town',
        date: '2024-10-01',
        total_active_members: 2000,
        percentage_active_members: 100,
        loyalty_tier: 'Diamond'
    },
    {
        store_id: 'SOO8',
        store_name: 'PLUS DC Pietermaritzburg',
        date: '2024-10-01',
        total_active_members: 1100,
        percentage_active_members: 55,
        loyalty_tier: 'Platinum'
    },
    {
        store_id: 'SOO9',
        store_name: 'PLUS DC East London',
        date: '2024-10-01',
        total_active_members: 750,
        percentage_active_members: 37.5,
        loyalty_tier: 'Gold'
    },
    {
        store_id: 'SOO10',
        store_name: 'PLUS DC Pretoria',
        date: '2024-10-01',
        total_active_members: 1600,
        percentage_active_members: 80,
        loyalty_tier: 'Diamond'
    },
    {
        store_id: 'SOO11',
        store_name: 'PLUS DC Germiston',
        date: '2024-10-01',
        total_active_members: 950,
        percentage_active_members: 47.5,
        loyalty_tier: 'Gold'
    },
    {
        store_id: 'SOO12',
        store_name: 'PLUS DC Polokwane',
        date: '2024-10-01',
        total_active_members: 500,
        percentage_active_members: 25,
        loyalty_tier: 'Gold'
    },
];


const stores = [
    { id: 1, store_id: 'SOO1', store: 'PLUS DC Stellenbosch' },
    { id: 2, store_id: 'SOO2', store: 'PLUS DC Albertin' },
    { id: 3, store_id: 'SOO3', store: 'PLUS DC Bellville' },
    { id: 4, store_id: 'SOO4', store: 'PLUS DC Nelspruit' },  // Random place added
    { id: 5, store_id: 'SOO5', store: 'PLUS DC Durbanville' },
    { id: 6, store_id: 'SOO6', store: 'PLUS DC Bloemfontein' },  // Random place added
    { id: 7, store_id: 'SOO7', store: 'PLUS DC Cape Town' },
    { id: 8, store_id: 'SOO8', store: 'PLUS DC Pietermaritzburg' },  // Random place added
    { id: 9, store_id: 'SOO9', store: 'PLUS DC East London' },  // Random place added
    { id: 10, store_id: 'SOO10', store: 'PLUS DC Pretoria' },
    { id: 11, store_id: 'SOO11', store: 'PLUS DC Germiston' },
    { id: 12, store_id: 'SOO12', store: 'PLUS DC Polokwane' },
];

export const ActiveMembersReport = () => {
    const headers = ['Store ID', 'Store Name', 'Date', 'Total Active Members', 'Active Members(%)', 'Loyalty Tier'];

    const [startdate, setStartDate] = useState('');
    const [enddate, setEndDate ] = useState('');

    const [selectedMonth, setSelectedMonth] = useState(''); // Initialize without filtering on mount
    const [selectedStore, setSelectedStore] = useState('');
    const [filteredData, setFilteredData] = useState(activeMembers); // Start with all data
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);


    // Function to handle filtering based on selected dates and store
    const handleFilter = () => {
        setIsLoading(true);

        let filtered = activeMembers;

        // Parse the selected dates
        const start = new Date(startdate);
        const end = new Date(enddate);

        // Validate dates: Ensure start date is not after end date
        if (startdate && enddate && start > end) {
        toast.error('Start date cannot be after end date!', {
            icon: <X color={colors.red} size={24} />,
            duration: 3000,
        });
        setIsLoading(false);
        return;
        }

        // Filter by start date and end date if both are selected
        if (startdate && enddate) {
        filtered = filtered.filter((item) => {
            const itemDate = new Date(item.date);
            return itemDate >= start && itemDate <= end;
        });
        }

        // Filter by store if selected
        if (selectedStore && selectedStore !== 'All') {
        filtered = filtered.filter((item) => item.store_id === selectedStore);
        }

        setFilteredData(filtered);

        if (filtered.length === 0) {
        setIsError(true);
        toast.error('No data found for the selected filters!', {
            icon: <X color={colors.red} size={24} />,
            duration: 3000,
        });
        } else {
        setIsError(false);
        }

        setIsLoading(false);
    };

    // Display loading screen if data is being fetched
    if (isLoading) {
        return (
            <div className="h-screen overflow-y-auto pl-2 pt-4">
                {/* <div className="">
                    <h4 className="text-xl font-bold">Active Members</h4>
                    <p className="text-sm text-gray-500">Number of active members over time</p>
                </div> */}
                <div className='flex gap-4'>
                <div className="pt-6">
                    <div className="flex gap-4">
                        <div className="w-[270px]">
                            <Label htmlFor="username" className="text-left pt-4">
                                Start Date:
                            </Label>
                            <input type="date" onChange={(e) => setStartDate(e.target.value)} className='w-full p-2 rounded-lg border border-gray-300'/>
                        </div>
                        <div className="w-[270px]">
                            <Label htmlFor="username" className="text-left pt-4">
                                Expiry Date:
                            </Label>
                            <input type="date" onChange={(e) => setEndDate(e.target.value)} className='w-full p-2 rounded-lg border border-gray-300'/>
                        </div>
                    </div>
                </div>
                <div className="pt-12">
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
                    <button className="bg-red hover:bg-black text-white w-20 h-11 rounded shadow-lg flex items-center justify-center">
                        <Filter />
                    </button>
                </div>
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
                    <h4 className="text-xl font-bold">Active Members</h4>
                    <p className="text-sm text-gray-500">Number of active members over time</p>
                </div> */}
                <div className='flex gap-4'>
                <div className="pt-6">
                    <div className="flex gap-4">
                        <div className="w-[270px]">
                            <Label htmlFor="username" className="text-left pt-4">
                                Start Date:
                            </Label>
                            <input type="date" value={startdate} onChange={(e) => setStartDate(e.target.value)} className='w-full p-2 rounded-lg border border-gray-300'/>
                        </div>
                        <div className="w-[270px]">
                            <Label htmlFor="username" className="text-left pt-4">
                                Expiry Date:
                            </Label>
                            <input type="date" value={enddate} onChange={(e) => setEndDate(e.target.value)} className='w-full p-2 rounded-lg border border-gray-300'/>
                        </div>
                    </div>
                </div>
                <div className="pt-12">
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
                    <button className="bg-red hover:bg-black text-white w-20 h-11 rounded shadow-lg flex items-center justify-center">
                        <Filter />
                    </button>
                </div>
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
                <h4 className="text-xl font-bold">Active Members</h4>
                <p className="text-sm text-gray-500">Number of active members over time</p>
            </div> */}
            <div className='flex gap-4'>
                <div className="pt-6">
                    <div className="flex gap-4">
                        <div className="w-[270px]">
                            <Label htmlFor="username" className="text-left pt-4">
                                Start Date:
                            </Label>
                            <input type="date" value={startdate} onChange={(e) => setStartDate(e.target.value)} className='w-full p-2 rounded-lg border border-gray-300'/>
                        </div>
                        <div className="w-[270px]">
                            <Label htmlFor="username" className="text-left pt-4">
                                Expiry Date:
                            </Label>
                            <input type="date" value={enddate} onChange={(e) => setEndDate(e.target.value)} className='w-full p-2 rounded-lg border border-gray-300'/>
                        </div>
                    </div>
                </div>
                <div className="pt-12">
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
            {filteredData.map(({ store_id, store_name, date, total_active_members, percentage_active_members, loyalty_tier }) => (
                    <div key={store_id} className="bg-white flex flex-col p-3 rounded shadow-lg">
                        <div className="flex items-center justify-between divide-x divide-gray-300">
                            <p className="text-sm flex-1 text-center text-purple">{store_id}</p>
                            <p className="text-sm flex-1 text-center text">{store_name}</p>
                            <p className="text-sm flex-1 text-center">{date}</p>
                            <p className="text-sm flex-1 text-center uppercase">{total_active_members}</p>
                            <p className={`text-sm flex-1 text-center ${percentage_active_members > 50 ? 'text-green' : 'text-red'}`}>
                                {percentage_active_members}%
                            </p>
                            <p className={`text-sm flex-1 text-center ${
                                loyalty_tier === 'Gold' ? 'text-amber-400' :
                                loyalty_tier === 'Diamond' ? 'text-blue' :
                                loyalty_tier === 'Platinum' ? 'text-gray-500' : ''
                            }`}>
                                {loyalty_tier}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};