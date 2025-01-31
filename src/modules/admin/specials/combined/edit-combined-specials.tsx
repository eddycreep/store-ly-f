'use client'

import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { apiEndPoint, colors } from '@/utils/colors';
import { Check, X, Search, PlusCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CombinedProps } from "./combined-specials"

interface Props {
    onClose: () => void;  
    selectedSpecial: CombinedProps | null; 
}

//specials
export interface Specials {
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


//special items - individual x combined
export interface SpecialItems {
    special_id: number,
    special_group_id: string,
    product_description: string,
    special_price: string
}

export interface CombinedSpecialsProps {
    special_id: number,
    special_name: string,
    special: string,
    special_type:string,
    store_id: string,
    start_date: string,
    expiry_date: string,
    special_value: string,
    isActive: boolean,
    special_group_id: number,
    product_description: string,
    special_price: number
}

type Product = {
    id: string
    name: string
    price: number
    item_code: string
}

type SpecialProduct = Product & {
    groupId: string
}

type CombinedSpecial = {
    id: string
    name: string
    special: string
    products: SpecialProduct[]
    specialPrice: number
    specialValue: 'Percentage' | 'Amount'
    storeId: string
    startDate: string
    endDate: string
    isActive: boolean
}

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

export function EditCombinedSpecials ({ onClose }: Props) {
    const [specials, setSpecials] = useState<CombinedSpecial[]>([])
    const [currentSpecial, setCurrentSpecial] = useState<CombinedSpecial>({
        id: '',
        name: '',
        special: '',
        products: [],
        specialPrice: 0,
        specialValue: 'Amount',
        storeId: '',
        startDate: '',
        endDate: '',
        isActive: true
    })
    const [searchTerm, setSearchTerm] = useState('')
    const [specialID, setSpecialID] = useState(0)

    // Mock product data (replace with actual API call in production)
    const allProducts: Product[] = [
        { id: '1', name: 'Apple', price: 0.5, item_code: 'P001' },
        { id: '2', name: 'Banana', price: 0.3, item_code: 'P002' },
        { id: '3', name: 'Orange', price: 0.6, item_code: 'P003' },
        { id: '4', name: 'Milk', price: 2.5, item_code: 'P004' },
        { id: '5', name: 'Bread', price: 1.5, item_code: 'P005' },
        { id: '6', name: 'Eggs', price: 3.0, item_code: 'P006' },
        { id: '7', name: 'Cheese', price: 4.5, item_code: 'P007' },
        { id: '8', name: 'Yogurt', price: 1.2, item_code: 'P008' },
        { id: '9', name: 'Tomato', price: 0.8, item_code: 'P009' },
        { id: '10', name: 'Potato', price: 0.4, item_code: 'P010' },
        { id: '11', name: 'Onion', price: 0.3, item_code: 'P011' },
        { id: '12', name: 'Carrot', price: 0.4, item_code: 'P012' },
    ]

    const filteredProducts = allProducts.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const displayedProducts = filteredProducts.slice(0, 3); // Modified to limit products to 3

    const addProductToSpecial = (product: Product) => {
        if (currentSpecial.products.length < 5) {
        setCurrentSpecial(prev => ({
            ...prev,
            products: [...prev.products, { ...product, groupId: '' }]
        }))
        }
    }

    const removeProductFromSpecial = (productId: string) => {
        setCurrentSpecial(prev => ({
        ...prev,
        products: prev.products.filter(p => p.id !== productId)
        }))
    }

    const updateProductGroupId = (productId: string, groupId: string) => {
        setCurrentSpecial(prev => ({
        ...prev,
        products: prev.products.map(p =>
            p.id === productId ? { ...p, groupId } : p
        )
        }))
    }

    const updateSpecial = async (specialId: number) => {
        try {
            const specialType = 'Combined Special'
            
            const payload = {
                specialName: currentSpecial.name,
                special: currentSpecial.special,
                specialType: specialType,
                storeId: currentSpecial.storeId,
                startDate: currentSpecial.startDate,
                expiryDate: currentSpecial.endDate,
                specialValue: currentSpecial.specialValue,
                isActive: currentSpecial.isActive,
            }

            const url = `admin/updatespecial/${specialId}`
            const response = await axios.post<Specials>(`${apiEndPoint}/${url}`, payload)
            console.log('The Special has been saved successfully:', response.data)

            if (response.status === 200) {
                toast.success('The special has been saved successfully', {
                    icon: <Check color={colors.green} size={24} />,
                    duration: 3000,
                })
            }

            //updateCombinedSpecialItems() // fetch special id
        } catch (error) {
            console.error('Error saving special:', error)
            
            toast.success('There was an error when saving the special', {
                icon: <X color={colors.red} size={24} />,
                duration: 3000,
            })
        }
    }

    // const updateCombinedSpecialItems = async (specialId: number) => {
    //     try {
    //         // const payload = {
    //         //     special_group_id
    //         //     product_description
    //         //     special_price
    //         // }

    //         const url = `admin/updatecombinedspecialitems/${specialId}`
    //         const response = await axios.post<SpecialItems>(`${apiEndPoint}/${url}`, payload)
    //         console.log('The Special item has been saved with its ID:', response.data)

    //         if (response.status === 200) {
    //             toast.success('combined items updated', {
    //                 icon: <Check color={colors.green} size={24} />,
    //                 duration: 3000,
    //             })
    //         }

    //     } catch (error) {
    //         console.error('Error saving special with its product:', error)
            
    //         toast.success('error updating combined items', {
    //             icon: <X color={colors.red} size={24} />,
    //             duration: 3000,
    //         })
    //     }
    // }

    return (
        <div className="container mx-auto p-4 relative">
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                <Card className="mb-6 w-[600px]">
                    <div className="flex justify-end pr-4 pt-4">
                        <button onClick={ onClose }>
                        <X className="h-4 w-4" color="red" />
                        </button>
                    </div>
                    <CardHeader>
                        <CardTitle>Create New Combined Special</CardTitle>
                        <CardDescription>
                        Set the special with the required fields and assign all the products linked to the special. Click Save Special once completed.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                        <div className="flex gap-4">
                            <div className="w-full">
                                <Label htmlFor="special-name">Special Name</Label>
                                <Input
                                id="special-name"
                                value={currentSpecial.name}
                                onChange={(e) => setCurrentSpecial(prev => ({ ...prev, name: e.target.value }))}
                                placeholder="Enter special name"
                                />
                            </div>
                            <div className="w-full">
                                <Label htmlFor="special-name">Special</Label>
                                <Input
                                id="special-name"
                                value={currentSpecial.special}
                                onChange={(e) => setCurrentSpecial(prev => ({ ...prev, special: e.target.value }))}
                                placeholder="Enter special"
                                />
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="w-full">
                            <Label htmlFor="special-type">Special Type</Label>
                            <Select
                                value={currentSpecial.specialValue}
                                onValueChange={(value) => setCurrentSpecial(prev => ({ ...prev, specialType: value as 'Percentage' | 'Amount' }))}
                            >
                                <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select special type" />
                                </SelectTrigger>
                                <SelectContent>
                                <SelectItem value="Percentage">Percentage</SelectItem>
                                <SelectItem value="Amount">Amount</SelectItem>
                                </SelectContent>
                            </Select>
                            </div>
                            <div className="w-full">
                                <Label htmlFor="special-price">Special Price</Label>
                                <Input
                                id="special-price"
                                // type="number"
                                value={currentSpecial.specialPrice || ''}
                                onChange={(e) => setCurrentSpecial(prev => ({ ...prev, specialPrice: parseFloat(e.target.value) }))}
                                placeholder="Enter special price"
                                />
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="w-full">
                            <Label htmlFor="start-date">Start Date</Label>
                            <Input
                                id="start-date"
                                type="date"
                                value={currentSpecial.startDate}
                                onChange={(e) => setCurrentSpecial(prev => ({ ...prev, startDate: e.target.value }))}
                            />
                            </div>
                            <div className="w-full">
                            <Label htmlFor="end-date">End Date</Label>
                            <Input
                                id="end-date"
                                type="date"
                                value={currentSpecial.endDate}
                                onChange={(e) => setCurrentSpecial(prev => ({ ...prev, endDate: e.target.value }))}
                            />
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="w-[500px]">
                                <Label htmlFor="store-id">Store ID</Label>
                                {/* Changed the input field to a select dropdown to display store IDs */}
                                <Select
                                    value={currentSpecial.storeId}
                                    onValueChange={(value) => setCurrentSpecial(prev => ({ ...prev, storeId: value }))}
                                >
                                    <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select store ID" />
                                    </SelectTrigger>
                                    <SelectContent>
                                    {/* Mapping through the stores array to create options for the dropdown */}
                                    <SelectItem value="All">All</SelectItem> {/* Added "All" option */}
                                    {stores.map((store) => (
                                        <SelectItem key={store.id} value={store.store_id}>
                                        {store.store_id}
                                        </SelectItem>
                                    ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex flex-col items-center space-x-2 pt-2">
                                {/* Dynamic label based on isActive state */}

                                <Label htmlFor="active-toggle">
                                    {/* {currentSpecial.isActive ? 'Active' : 'In-Active'} */}
                                    Active
                                </Label>
                                <div className="pt-2">
                                    <Switch
                                    id="active-toggle"
                                    checked={currentSpecial.isActive}
                                    onCheckedChange={(checked) =>
                                        setCurrentSpecial(prev => ({ ...prev, isActive: checked }))
                                    }
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="product-search">Search Products</Label>
                            <div className="flex space-x-2">
                            <Input
                                id="product-search"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search for products"
                            />
                            <Button variant="outline" size="icon">
                                <Search className="h-4 w-4" />
                            </Button>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                            {displayedProducts.map((product) => (
                            <Button
                                key={product.id}
                                variant="outline"
                                onClick={() => addProductToSpecial(product)}
                                disabled={currentSpecial.products.length >= 5 || currentSpecial.products.some(p => p.id === product.id)}
                                className="justify-start"
                            >
                                <PlusCircle className="h-4 w-4 mr-2" />
                                {product.name}
                            </Button>
                            ))}
                        </div>

                        <div className="mt-4">
                            <Label>Products (Max 5)</Label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {currentSpecial.products.map((product) => (
                                <Card key={product.id} className="p-2 flex justify-between items-center">
                                <span>{product.name}</span>
                                <div className="flex items-center space-x-2">
                                    <Input
                                    value={product.groupId}
                                    onChange={(e) => updateProductGroupId(product.id, e.target.value)}
                                    placeholder="Group ID"
                                    className="w-32"
                                    />
                                    <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => removeProductFromSpecial(product.id)}
                                    >
                                    <X className="h-4 w-4" />
                                    </Button>
                                </div>
                                </Card>
                            ))}
                            </div>
                        </div>

                        <Button 
                            // onClick={ updateSpecial } 
                            className="bg-green hover:bg-emerald-300"
                            // disabled={currentSpecial.products.length === 0 || !currentSpecial.name || currentSpecial.specialPrice <= 0 || !currentSpecial.storeId || !currentSpecial.startDate || !currentSpecial.endDate}
                        >
                            Save Special
                        </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}