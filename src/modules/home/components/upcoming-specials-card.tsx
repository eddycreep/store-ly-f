"use client"

import { useState, useEffect } from 'react';
import axios from 'axios';
import { apiEndPoint } from '@/utils/colors'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PercentDiamond, Coins, Coffee, BadgeCheck, Clock, BadgeInfo, AlertTriangle, Users } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import SquareCircleLoader from "@/lib/square-circle-loader"
import { BlueLoader } from "@/lib/blueLoader"
import MultiColorLoader from "@/lib/loaders"
import ThreeDotsLoader from "@/lib/three-dots-loader"

interface SpecialProps {
    special_id: number, 
    special_name: string,
    special: string,
    special_type: string,
    store_id: string,
    start_date: string,
    expiry_date: string,
    special_value: string,
    isActive: number
}
type SpecialResponse = SpecialProps[]

// SpecialCard component to display individual special information
export const UpcomingSpecialCards = () => {
    const [upcomingSpecials, setUpcomingSpecials] = useState<SpecialResponse>([])

    const [upcomingSpecialsLoading, setUpcomingSpecialsLoading] = useState(false);
    const [upcomingSpecialsErrors, setUpcomingSpecialsErrors] = useState(false);


    const getUpcomingSpecials = async () => {
        setUpcomingSpecialsLoading(true);
    
        try {
            const url = `products/getupcomingspecials`
            const response = await axios.get<SpecialResponse>(`${apiEndPoint}/${url}`);
            setUpcomingSpecials(response?.data);
            console.log('Upcoming Specials: ', response.data);
    
        } catch (error) {
            console.log("An error occurred when fetching the upcoming specials");
            setUpcomingSpecialsErrors(true);
        }
    
            setUpcomingSpecialsLoading(false);
    }

    const getSpecialTypeIcon = (special_value: string) => {
        switch (special_value) {
            case 'Percentage':
                return <PercentDiamond className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />;
            case 'Amount':
                return <Coins className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />;
            case 'Free':
                return <Coffee className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />;
            default:
                return <BadgeInfo className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />;
        }
    };

    useEffect(() => {
        getUpcomingSpecials();

        // Set up an interval to fetch data every 5 minutes
        const interval = setInterval(() => {
            getUpcomingSpecials();
        }, 300000); // 300,000 ms = 5 minutes || 60000 = 1 minute

        // Clear interval on component unmount
        return () => clearInterval(interval);
    }, []);

    if (upcomingSpecialsLoading) {
        return (
            <div className="flex flex-col justify-center items-center gap-4">
                <SquareCircleLoader />
                <p className="text-gray-600 text-sm uppercase">loading active specials...</p>
            </div>
        )
    }


    if (upcomingSpecialsErrors) {
        return (
            <div className="flex flex-col justify-center items-center gap-4">
                <AlertTriangle size={38} color="red"/>
                <p className="text-gray-600 text-sm uppercase">Oops! Unfortunately an error was encountered when fetching Active Specials, kindly refresh the page.</p>
            </div>
        )
    }


    if (upcomingSpecials.length === 0) {
        return (
            <div className="flex flex-col justify-center items-center gap-4">
                <BadgeInfo size={38} className="text-emerald-500"/>
                <p className="text-gray-600 text-sm uppercase">No specials are currently available. To add new specials, please navigate to the Admin page.</p>
            </div>
        )
    }



    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {upcomingSpecials?.map(({ special_id, special_name, special, special_type, store_id, start_date, expiry_date, special_value, isActive }) => (
            <Card className="shadow-lg hover:shadow-xl w-[300px] sm:flex flex-col md:w-[350px] lg:w-[400px]">
                <CardHeader>
                    <div key={special_id} className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                            <CardTitle className="text-base sm:text-lg">{special_name}</CardTitle>
                            <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    {getSpecialTypeIcon(special_value)} { /* render different icons based on special value */ }
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>{special_value === 'Free' ? 'Free Item' : special_value}</p>
                                </TooltipContent>
                            </Tooltip>
                            </TooltipProvider>
                        </div>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <BadgeCheck className="h-4 w-4 sm:h-5 sm:w-5 text-green" />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Active</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                    <Badge variant="secondary" className="w-fit bg-gray-200 text-gray-800 hover:bg-gray-300 text-xs sm:text-sm mt-2">
                        {special_type}
                    </Badge>
                </CardHeader>
                <CardContent>
                    <p className="font-bold text-base sm:text-lg">{special}</p>
                    <div className="flex flex-col pt-2">
                        <p className="text-xs sm:text-sm text-muted-foreground">Valid From:</p>
                        <p className="text-xs sm:text-sm text-muted-foreground">{start_date} - {expiry_date}</p>
                    </div>
                    <div className="mt-2 flex items-center">
                        <Users className="h-3 w-3 sm:h-4 sm:w-4 mr-1 text-gray-400" />
                        <span className="text-xs sm:text-sm text-gray-400">Redemptions: </span>
                        <span className="text-xs sm:text-sm text-purple-600 font-semibold pl-2">19</span>
                    </div>
                </CardContent>
            </Card>
        ))}
        </div>
    )
}