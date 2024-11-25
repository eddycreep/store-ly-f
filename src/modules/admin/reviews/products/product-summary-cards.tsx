"use client"

import { useState, useEffect } from "react"
import { apiEndPoint } from "@/utils/colors";
import axios from "axios"
import { ShoppingCart, User, Star, Award } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"


const productsData = [
    { id: 1, title: "Top Rated Products", icon: <ShoppingCart className="w-6 h-6 text-green" />, content: "1. Organic Apples\n2. Whole Grain Bread\n3. Fresh Milk" },
    { id: 2, title: "Top Reviewers", icon: <User className="w-6 h-6 text-blue" />, content: "1. Alice Johnson\n2. Bob Smith\n3. Carol Davis" },
    { id: 3, title: "Common Reviews", icon: <Star className="w-6 h-6 text-yellow" />, content: "1. Organic Apples\n2. Low-Fat Yogurt\n3. Whole Grain Bread" },
    { id: 4, title: "Loyalty Tiers", icon: <Award className="w-6 h-6 text-purple" />, content: "Gold: 45%\nDiamond: 30%\nPlatinum: 25%" },
    { id: 5, title: "Top Redeemers", icon: <ShoppingCart className="w-6 h-6 text-red" />, content: "1. David Brown\n2. Emma Wilson\n3. Frank Miller" },
]


export const ProductSummaryCards = () => {
    const [loadingData, setLoadingData] = useState(false);
    const [isError, setIsError] = useState(false);

    //const [topRatedProducts, setTopRatedProducts] = useState<TopProductsResponse>([]);

    // const getTopRatedProducts = async () => {
    //     setLoadingData(true);

    //     try {
    //         const url `admin/get-top-rated-product-reviews`
    //         const response = await axios.get<TopProductsResponse>(`${apiEndPoint}/${url}`)
    //         setTopRatedProducts(response?.data);
    //         setLoadingData(false);

    //     } catch (error) {
    //         console.log("An error occurred when fetching product reviews:", error)
    //         setIsError(true);
    //     }
    // }

    // useEffect(() => {
    //     getTopRatedProducts();
    // }, [])


    // if (loadingData) {
    //     return (
    //         <div className="pt-10 flex flex-col items-center justify-center">
    //             <SquareCircleLoader />
    //             <p className="text-gray-500 uppercase pt-4">Loading data, please be patient.</p>
    //         </div>
    //     )
    // }


    // if (isError) {
    //     return (
    //         <div className="flex flex-col items-center justify-center pt-10">
    //             <XOctagon size={34} />
    //             <p className="ml-2 uppercase pt-2 text-red">An error occured when fetching product reviews</p>
    //         </div>
    //     )
    // }


    // if (topRatedProducts.length === 0) {
    //     return (
    //         <div className="flex flex-col items-center justify-center pt-10">
    //             <ShieldAlert size={34} />
    //             <p className="ml-2 uppercase pt-2 text-green">There are currently no product reviews completed by customers. Encourage feedback to gain valuable insights and improve their experience!</p>
    //         </div>
    //     )
    // }



    return (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
            {productsData.map(({ id, title, icon, content }) => (
                <Card key={id} className="col-span-1 bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                        <CardTitle className="text-sm font-semibold text-gray-700 dark:text-gray-200">{title}</CardTitle>
                        {icon}
                    </CardHeader>
                    <CardContent className="pt-4">
                        <div className="text-xs font-medium text-gray-600 dark:text-gray-300 whitespace-pre-line">{content}</div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}