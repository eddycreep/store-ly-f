"use client"

import React from 'react';
import { apiEndPoint, colors } from '@/utils/colors';
import axios from 'axios';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Edit, Expand, Trash2, Shrink, X, Check, XOctagon, ShieldAlert } from "lucide-react";

import { AddCombinedSpecials } from "@/modules/admin/specials/combined/add-combined-specials";
import { EditCombinedSpecials } from "@/modules/admin/specials/combined/edit-combined-specials";
import { CombinedDeleteConfirmation } from "@/modules/admin/specials/combined/delete-combined-confirmation";
import { Specials, SpecialItems, CombinedSpecialsProps } from "@/modules/admin/specials/combined/edit-combined-specials";
import SquareCircleLoader from "@/lib/square-circle-loader";

//get-active-group-specials
export interface CombinedProps {
    special_id: number,
    special_name: string,
    special: string,
    special_type:string,
    store_id: string,
    start_date: string,
    expiry_date: string,
    special_value: string,
    isActive: number,
    special_group_id: number,
    product_description: string,
    special_price: number
}
type CombinedSpecialsResponse = CombinedProps[]

export const CombinedSpecials = () => {
    const [combinedSpecials, setCombinedSpecials] = useState<CombinedSpecialsResponse>([]);

    //expandRows state variables
    const [selectedCombinedSpecial, setSelectedCombinedSpecial] = useState<CombinedProps | null>(null);
    const [expandedCombinedRow, setExpandedCombinedRow] = useState<number | null>(null);
    
    const [combinedSpecialsComponent, setCombinedSpecialsComponent] = useState(false);
    const [editCombinedSpecialsPopup, setEditCombinedSpecialsPopup] = useState(false);
    const [combinedDeletePopUp, setCombinedDeletePopUp] = useState(false);

    const [loadingData, setLoadingData] = useState(false);
    const [isError, setIsError] = useState(false);
    const [selectedCombinedSpecialID, setSelectedCombinedSpecialID] = useState(0);

    const headers = ['Special ID', 'Special Group ID', 'Products', 'Special Name', 'Special',  'Special Price', 'Special Value', 'Action']

    const getCombinedSpecials = async () => {
        setLoadingData(true);

        try{
            const url = `products/getallcombinedspecials`
            const response = await axios.get<CombinedSpecialsResponse>(`${apiEndPoint}/${url}`)
            setCombinedSpecials(response?.data)
            console.log("RETRIEVED ALL ACTIVE GROUP SPECIALS:", response)
            setLoadingData(false);

        } catch (error) {
            console.log("AN ERROR OCCURED WHEN FETCHING PRODUCT SPECIALS:", error)
            setIsError(true);
        }
    }

    const toggleEditGroupProductPage = () => {
        setEditCombinedSpecialsPopup(!editCombinedSpecialsPopup);
    };

    const closeEditSpecialsPopup = () => {
        setEditCombinedSpecialsPopup(false);
    }

    const handleEditCombinedSpecial = (special_id: any) => {
        const selected = combinedSpecials.find((item) => item.special_id === special_id) || null;
        
        if (selected) {
            setSelectedCombinedSpecial(selected);
            setEditCombinedSpecialsPopup(true);
        } else {
            toast.error('Error passing the product specials!', {
                icon: <X color={colors.red} size={24} />,
                duration: 3000,
            });
        }
    };


    //expand combined special
    const handleExpandCombinedClick = (id: number) => {
        setExpandedCombinedRow(expandedCombinedRow === id ? null : id);
    };

    const toggleCombinedDeletePage = (specialId: number) => {
        setCombinedDeletePopUp(!combinedDeletePopUp);
        setSelectedCombinedSpecialID(specialId)
    };

    //combined specials
    const toggleCombinedSpecials = () => {
        setCombinedSpecialsComponent(!combinedSpecialsComponent);
    }

    // Group specials by 'special_id' to only show the first row initially, with an expandable section for additional items
    const groupedCombinedSpecials = Object.values(
        combinedSpecials.reduce((acc, item) => {
        if (!acc[item.special_id]) {
            acc[item.special_id] = { ...item, items: [] }; // Initialize group with first item
        }
        acc[item.special_id].items.push(item); // Add item to its group
        return acc;
        }, {} as { [key: number]: CombinedProps & { items: CombinedProps[] } })
    );

    useEffect(() => {
        getCombinedSpecials();
    
        const specialInterval = setInterval(() => {
            getCombinedSpecials();
        }, 120000); // 1 minutes
    
        return () => clearInterval(specialInterval); // Clean up interval on unmount
    },[]);


    if (loadingData) {
        return (
            <div className="pb-16 pt-20">
                <div className="flex justify-between">
                    <div className="flex flex-col pl-2 pt-6">
                        <h4 className="text-2xl font-semibold text-red">Combined Specials</h4>
                        <p className="text-gray-500">Assign exclusive combined specials that customers can purchase</p>
                    </div>
                    <div className='flex gap-2 pt-8 pr-2'>
                        <button onClick={ toggleCombinedSpecials } className="bg-black text-white p-2 w-40 h-10 rounded-lg hover:bg-red">
                            Add Special
                        </button>
                    </div>
                </div>
                <div className="bg-white text-gray-500 flex items-center justify-between divide-x divide-gray-500 p-3 mt-4 mx-2 rounded shadow-lg">
                    {headers?.map((header, index) => (
                        <p key={index} className={`text-xs uppercase font-medium flex-1 text-center ${index === 1 ? 'hidden lg:block' : ''}`}>
                            {header}
                        </p>
                    ))}
                </div>
                <div className="pt-10 flex flex-col items-center justify-center">
                    <SquareCircleLoader />
                    <p className="text-gray-500 uppercase pt-4">Loading data, please be patient.</p>
                </div>
            </div>
        )
    }


    if (isError) {
        return (
            <div className="pb-16 pt-20">
                <div className="flex justify-between">
                    <div className="flex flex-col pl-2 pt-6">
                        <h4 className="text-2xl font-semibold text-red">Combined Specials</h4>
                        <p className="text-gray-500">Assign exclusive combined specials that customers can purchase</p>
                    </div>
                    <div className='flex gap-2 pt-8 pr-2'>
                        <button onClick={ toggleCombinedSpecials } className="bg-black text-white p-2 w-40 h-10 rounded-lg hover:bg-red">
                            Add Special
                        </button>
                    </div>
                </div>
                <div className="bg-white text-gray-500 flex items-center justify-between divide-x divide-gray-500 p-3 mt-4 mx-2 rounded shadow-lg">
                    {headers?.map((header, index) => (
                        <p key={index} className={`text-xs uppercase font-medium flex-1 text-center ${index === 1 ? 'hidden lg:block' : ''}`}>
                            {header}
                        </p>
                    ))}
                </div>
                <div className="flex flex-col items-center justify-center pt-10">
                    <XOctagon size={34} />
                    <p className="ml-2 uppercase pt-2 text-red">An error occured when fetching combined specials</p>
                </div>
            </div>
        )
    }


    if (combinedSpecials.length === 0) {
        return (
            <div className="pb-16 pt-20">
            <div className="flex justify-between">
                <div className="flex flex-col pl-2 pt-6">
                    <h4 className="text-2xl font-semibold text-red">Combined Specials</h4>
                    <p className="text-gray-500">Assign exclusive combined specials that customers can purchase</p>
                </div>
                <div className='flex gap-2 pt-8 pr-2'>
                    <button onClick={ toggleCombinedSpecials } className="bg-black text-white p-2 w-40 h-10 rounded-lg hover:bg-red">
                        Add Special
                    </button>
                </div>
            </div>
            <div className="bg-white text-gray-500 flex items-center justify-between divide-x divide-gray-500 p-3 mt-4 mx-2 rounded shadow-lg">
                {headers?.map((header, index) => (
                    <p key={index} className={`text-xs uppercase font-medium flex-1 text-center ${index === 1 ? 'hidden lg:block' : ''}`}>
                        {header}
                    </p>
                ))}
            </div>
            <div className="flex flex-col items-center justify-center pt-10">
                <ShieldAlert size={34} />
                <p className="ml-2 uppercase pt-2 text-green">No combined specials have been set for customers. Add new specials to enhance their experience!</p>
            </div>
        </div>
        )
    }


    return (
        <div className="pb-14 pt-20">
            <div className="flex justify-between">
                <div className="flex flex-col pl-2 pt-6">
                    <h4 className="text-2xl font-semibold text-red">Combined Specials</h4>
                    <p className="text-gray-500">Assign exclusive combined specials that customers can purchase</p>
                </div>
                <div className='flex gap-2 pt-8 pr-2'>
                    <button onClick={ toggleCombinedSpecials } className="bg-black text-white p-2 w-40 h-10 rounded-lg hover:bg-red">
                        Add Special
                    </button>
                </div>
            </div>
            <div className="bg-white text-gray-500 flex items-center justify-between divide-x divide-gray-500 p-3 mt-4 mx-2 rounded shadow-lg">
                {headers?.map((header, index) => (
                    <p key={index} className={`text-xs uppercase font-medium flex-1 text-center ${index === 1 ? 'hidden lg:block' : ''}`}>
                        {header}
                    </p>
                ))}
            </div>
            {/* Render each grouped special as a row */}
            {groupedCombinedSpecials.map(({ special_id, special_name, special, special_type, store_id, start_date, expiry_date, special_value, isActive, items }) => (
                <div key={special_id} className="pt-2 max-h-[350px] pb-1 space-y-2 overflow-y-auto">
                    <div className="bg-white flex flex-col p-3 mx-2 rounded shadow-md">
                        <div className="grid grid-cols-8 gap-2 items-center">
                            <p className="text-sm text-center text-red">{special_id || '--:--'}</p>
                            <p className="text-sm text-center">{items[0].special_group_id || '--:--'}</p>
                            <p className="text-sm text-center">{items[0].product_description || '--:--'}</p>
                            <p className="text-sm text-center">{special_name || '--:--'}</p>
                            <p className="text-sm text-center">{special || '--:--'}</p>
                            <p className="text-sm text-center">{items[0].special_price || '--:--'}</p>
                            <p className="text-sm text-center">{special_value || '--:--'}</p>
                            <div className="flex items-center justify-center gap-4">
                            <button className="flex items-center cursor-pointer" onClick={() => handleExpandCombinedClick(special_id)}>
                                {expandedCombinedRow === special_id ? (
                                <Shrink color="gray" />
                                ) : (
                                <Expand color="gray" />
                                )}
                            </button>
                            <button className="flex items-center cursor-pointer" onClick={() => handleEditCombinedSpecial(special_id)}>
                                <Edit color="gray" /> 
                            </button>
                            <button className="flex items-center cursor-pointer" onClick={() => toggleCombinedDeletePage(special_id)}>
                                <Trash2 color="red" /> 
                            </button>
                            </div>
                        </div>
                        {expandedCombinedRow === special_id && (
                            <div className="pt-4">
                                <div className="grid grid-cols-8 gap-2 pt-2 bg-gray-100 rounded shadow-inner p-4 text-center text-sm">
                                    <p></p>
                                    <p className="font-semibold text-gray-600">Special Group ID</p>
                                    <p className="font-semibold text-gray-600">Product Description</p>
                                    <p className="font-semibold text-gray-600">Store ID</p>
                                    <p className="font-semibold text-gray-600">Start Date</p>
                                    <p className="font-semibold text-gray-600">Expiry Date</p>
                                    <p className="font-semibold text-gray-600">Status</p>
                                    <p></p>
                                    {/* Data row displaying each item in the expanded view */}
                                    {items.slice(1).map((item) => (
                                    <React.Fragment key={item.special_group_id}>
                                        <p></p>
                                        <p className="text-sm">{item.special_group_id || '--:--'}</p>
                                        <p className="text-sm">{item.product_description || '--:--'}</p>
                                        <p className="text-sm">{item.store_id || '--:--'}</p>
                                        <p className="text-sm">{item.start_date || '--:--'}</p>
                                        <p className="text-sm">{item.expiry_date || '--:--'}</p>
                                        <p className={`text-sm ${item.isActive === 1 ? 'text-green' : 'text-red'}`}>{item.isActive === 1 ? 'Active' : 'Inactive'  || '--:--'}</p>
                                        <p></p>
                                    </React.Fragment>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            ))}
            {combinedSpecialsComponent && (<AddCombinedSpecials onClose={ toggleCombinedSpecials } />)}
            {/* {editCombinedSpecialsPopup && <EditCombinedSpecials onClose={ closeEditSpecialsPopup } selectedCombinedSpecial={selectedCombinedSpecial} />} */}
            {combinedDeletePopUp && (<CombinedDeleteConfirmation specialID={selectedCombinedSpecialID} isOpen={combinedDeletePopUp} onClose={toggleCombinedDeletePage}/> )}
    </div>
    )
}