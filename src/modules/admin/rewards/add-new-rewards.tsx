'use client'

import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { apiEndPoint, colors } from '@/utils/colors';
import { X, Search, Check, PlusCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSession } from '@/context';
import { format } from "date-fns";

interface Rewards {
  reward_title: string,
  description: string,
  reward: string,
  reward_type: string,
  reward_price: number,
  store_id: string,
  region: string,
  start_date: string,
  expiry_date: string,
  isActive: boolean; 
  loyaltyTier: string,
  ageGroup: string,
}


interface RewardInfo {
    reward_id: number,
    reward_title: string,
    reward_type: string,
}

//new product data
interface ProductsData {
    id: number,
    item_code: string
    selling_incl_1: number,
    special_price_incl: number,
    description_1: string
}
type ProductsDataRes = ProductsData[]


// user activity
interface UserActivity {
    emp_id: number,
    emp_name: string,
    activity_id: number,
    activity: string,
    activity_type: string,
    time_logged: string,
    log_message: string,
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

const regions = [
    { id: 1, region_id: 'ROO1', region: 'Western Cape' },
    { id: 2, region_id: 'ROO2', region: 'Gauteng' },
    { id: 3, region_id: 'ROO3', region: 'KwaZulu-Natal' },
    { id: 4, region_id: 'ROO4', region: 'Eastern Cape' },
    { id: 5, region_id: 'ROO5', region: 'Limpopo' },
    { id: 6, region_id: 'ROO6', region: 'Free State' },
    { id: 7, region_id: 'ROO7', region: 'Mpumalanga' },
    { id: 8, region_id: 'ROO8', region: 'Northern Cape' },
    { id: 9, region_id: 'ROO9', region: 'North West' },
    { id: 10, region_id: 'ROO10', region: 'Western Cape Coastal' }, // Additional examples for variety
    { id: 11, region_id: 'ROO11', region: 'Cape Flats' },
    { id: 12, region_id: 'ROO12', region: 'Garden Route' },
];

const loyaltyTiers = [
  { id: 1, tier: 'Gold' },
  { id: 2, tier: 'Diamond' },
  { id: 3, tier: 'Platinum' },
];

const ageGroup = [
  { id: 1, age_range: '18-24', name: 'Young Adults' },
  { id: 2, age_range: '25-34', name: 'Adults' },
  { id: 3, age_range: '35-44', name: 'Middle-Aged Adults' },
  { id: 4, age_range: '45-50', name: 'Older Middle-Aged Adults' },
  { id: 5, age_range: '50+', name: 'Seniors' },
];

export function AddNewRewards({ onClose }: any) {
  const { user } = useSession();

  const [products, setProducts] = useState<ProductsDataRes>([])
  const [loyaltyAgeGroups, setLoyaltyAgeGroups] = useState<AgeGroupsRes>([])
  const [stores, setStores] = useState<StoresRes>([])

  const [currentReward, setCurrentReward] = useState<Rewards>({
    reward_title: '',
    description: '',
    reward: '',
    reward_type: '',
    reward_price: 0,
    store_id: '',
    region: '',
    start_date: '',
    expiry_date: '',
    isActive: false,
    loyaltyTier: '',
    ageGroup: '',
  })


  const getStores = async () => {
    try {

        const url = `admin/savereward`
        const response = await axios.post<Rewards>(`${apiEndPoint}/${url}`, payload)
        console.log('The Special has been saved successfully:', response.data)

        if (response.status === 200) {
            toast.success('The Reward has been saved successfully', {
                icon: <Check color={colors.green} size={24} />,
                duration: 3000,
            })
        }
    } catch (error) {
        console.error('Error saving Reward:', error)
        
        toast.success('There was an error when saving the Reward', {
            icon: <X color={colors.red} size={24} />,
            duration: 3000,
        })
    }
  }


  // const getLoyaltyTiers = async () => {
  //   try {

  //       const url = `admin/savereward`
  //       const response = await axios.post<Rewards>(`${apiEndPoint}/${url}`, payload)
  //       console.log('The Special has been saved successfully:', response.data)

  //       if (response.status === 200) {
  //           toast.success('The Reward has been saved successfully', {
  //               icon: <Check color={colors.green} size={24} />,
  //               duration: 3000,
  //           })
  //       }
  //   } catch (error) {
  //       console.error('Error saving Reward:', error)
        
  //       toast.success('There was an error when saving the Reward', {
  //           icon: <X color={colors.red} size={24} />,
  //           duration: 3000,
  //       })
  //   }
  // }


  // const getAgeGroups = async () => {
  //   try {

  //       const url = `admin/savereward`
  //       const response = await axios.post<Rewards>(`${apiEndPoint}/${url}`, payload)
  //       console.log('The Special has been saved successfully:', response.data)

  //       if (response.status === 200) {
  //           toast.success('The Reward has been saved successfully', {
  //               icon: <Check color={colors.green} size={24} />,
  //               duration: 3000,
  //           })
  //       }
  //   } catch (error) {
  //       console.error('Error saving Reward:', error)
        
  //       toast.success('There was an error when saving the Reward', {
  //           icon: <X color={colors.red} size={24} />,
  //           duration: 3000,
  //       })
  //   }
  // }


  const saveReward = async () => {
    try {
        const payload = {
          reward_title: currentReward.reward_title,
          description: currentReward.description,
          reward: currentReward.reward,
          reward_type: currentReward.reward_type,
          reward_price: currentReward.reward_price,
          store_id: currentReward.store_id,
          region: currentReward.region,
          start_date: currentReward.start_date,
          expiry_date: currentReward.expiry_date,
          isActive: currentReward.isActive,
          loyaltyTier: currentReward.loyaltyTier,
          ageGroup: currentReward.ageGroup,
        }

        const url = `admin/savereward`
        const response = await axios.post<Rewards>(`${apiEndPoint}/${url}`, payload)
        console.log('The Special has been saved successfully:', response.data)

        if (response.status === 200) {
            toast.success('The Reward has been saved successfully', {
                icon: <Check color={colors.green} size={24} />,
                duration: 3000,
            })
        }
    } catch (error) {
        console.error('Error saving Reward:', error)
        
        toast.success('There was an error when saving the Reward', {
            icon: <X color={colors.red} size={24} />,
            duration: 3000,
        })
    }
  }


  const logUserActivity = async (bonus: RewardInfo) => {
    const timeLogged = format(new Date(), "EEE MMM dd yyyy HH:mm:ss 'GMT'XXX");
    const message = "User created a new reward";

    try {
        const payload = {
            emp_id: user.emp_id,
            emp_name: user.emp_id,
            activity_id: bonus.reward_id,
            activity: bonus.reward_title,
            activity_type: bonus.reward_type,
            time_logged: timeLogged,
            log_message: message,
        };

        const url = `users/log-user-activity`;
        const response = await axios.post<UserActivity>(`${apiEndPoint}/${url}`, payload);
        console.log('The Users activity has been logged!', response.data);

        if (response.status === 200) {
            toast.success('Activity logged!', {
                icon: <Check color={colors.green} size={24} />,
                duration: 3000,
            });
        }
    } catch (error) {
        console.error('Error logging reward activity:', error);

        toast.error('Error logging reward activity!', {
            icon: <X color={colors.red} size={24} />,
            duration: 3000,
        });
    }
  };

  return (
    <div className="container mx-auto p-4 relative">
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <Card className="mb-6 w-[600px]">
              <div className="flex justify-end pr-4 pt-4">
                <button onClick={ onClose }>
                  <X className="h-4 w-4" color="red" />
                </button>
              </div>
            <div className="pl-6 pb-4">
                <p className="text-xl font-bold">Add Reward</p>
                <p className="text-gray-600">Add alternative ways customers can redeem rewards</p>
            </div>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-full">
                    <Label htmlFor="special-name">Reward Title</Label>
                    <Input
                      id="reward-title"
                      value={currentReward.reward_title} // Changed `currentSpecial.name` to `currentReward.reward_title`
                      onChange={(e) => setCurrentReward(prev => ({ ...prev, reward_title: e.target.value }))} // Updated `setCurrentSpecial` to `setCurrentReward` and `name` to `reward_title`
                      placeholder="Enter reward title"
                    />
                </div>
                <div className="w-full">
                    <Label htmlFor="special-name">Description</Label>
                    <Input
                      id="special-name"
                      value={currentReward.reward} // Changed `currentSpecial.special` to `currentReward.description`
                      onChange={(e) => setCurrentReward(prev => ({ ...prev, reward: e.target.value }))} // Updated `setCurrentSpecial` to `setCurrentReward` and `special` to `description`
                      placeholder="Enter reward"
                    />
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-full">
                  <Label htmlFor="special-type">Reward Type</Label>
                  <Select
                    value={currentReward.reward_type} // Changed `currentSpecial.specialValue` to `currentReward.reward_type`
                    onValueChange={(value) => setCurrentReward(prev => ({ ...prev, reward_type: value as 'Percentage' | 'Amount' }))} // Updated `setCurrentSpecial` to `setCurrentReward` and `specialValue` to `reward_type`
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select reward type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Percentage">Percentage</SelectItem>
                      <SelectItem value="Amount">Amount</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="w-full">
                    <Label htmlFor="special-price">Reward Price</Label>
                    <Input
                        id="special-price"
                        value={currentReward.reward_price || ''} // Changed `currentSpecial.specialPrice` to `currentReward.reward_price`
                        onChange={(e) => setCurrentReward(prev => ({ ...prev, reward_price: parseFloat(e.target.value) }))} // Updated `setCurrentSpecial` to `setCurrentReward` and `specialPrice` to `reward_price`
                        placeholder="Enter reward price"
                      />
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-full">
                  <Label htmlFor="start-date">Start Date</Label>
                  <Input
                    id="start-date"
                    type="date"
                    value={currentReward.start_date} // Changed `currentSpecial.startDate` to `currentReward.start_date`
                    onChange={(e) => setCurrentReward(prev => ({ ...prev, start_date: e.target.value }))} // Updated `setCurrentSpecial` to `setCurrentReward` and `startDate` to `start_date`
                  />
                </div>
                <div className="w-full">
                  <Label htmlFor="end-date">End Date</Label>
                  <Input
                    id="end-date"
                    type="date"
                    value={currentReward.expiry_date} // Changed `currentSpecial.endDate` to `currentReward.expiry_date`
                    onChange={(e) => setCurrentReward(prev => ({ ...prev, expiry_date: e.target.value }))} // Updated `setCurrentSpecial` to `setCurrentReward` and `endDate` to `expiry_date`
                  />
                </div>
              </div>
              <div className="flex gap-4">
                  <div className="w-full">
                    <Label htmlFor="store-id">Store ID</Label>
                    {/* Changed the input field to a select dropdown to display store IDs */}
                      <Select
                        value={currentReward.store_id}
                        onValueChange={(value) => setCurrentReward(prev => ({ ...prev, store_id: value }))}
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
                  <div className="w-full">
                    <Label htmlFor="store-id">Region</Label>
                    {/* Changed the input field to a select dropdown to display store IDs */}
                      <Select
                        value={currentReward.region}
                        onValueChange={(value) => setCurrentReward(prev => ({ ...prev, region: value }))}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select region" />
                        </SelectTrigger>
                        <SelectContent>
                          {/* Mapping through the stores array to create options for the dropdown */}
                          <SelectItem value="All">All</SelectItem> {/* Added "All" option */}
                          {regions.map((location) => (
                            <SelectItem key={location.id} value={location.region}>
                              {location.region}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                  </div>
              </div>
              <div className="flex gap-4">
                  <div className="w-full">
                    <Label htmlFor="store-id">Age Group</Label>
                    <Select
                      value={currentReward.ageGroup} // Changed `currentSpecial.storeId` to `currentReward.store_id`
                      onValueChange={(value) => setCurrentReward(prev => ({ ...prev, ageGroup: value }))} // Updated `setCurrentSpecial` to `setCurrentReward` and `storeId` to `store_id`
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Age Group" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All">All</SelectItem>
                        {ageGroup.map((store) => (
                          <SelectItem key={store.id} value={store.name}>
                            {store.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="w-full">
                    <Label htmlFor="store-id">Loyalty Tier</Label>
                    {/* Changed the input field to a select dropdown to display store IDs */}
                      <Select
                        value={currentReward.loyaltyTier}
                        onValueChange={(value) => setCurrentReward(prev => ({ ...prev, loyaltyTier: value }))}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select tier" />
                        </SelectTrigger>
                        <SelectContent>
                          {/* Mapping through the stores array to create options for the dropdown */}
                          <SelectItem value="All">All</SelectItem> {/* Added "All" option */}
                          {loyaltyTiers.map((loyalty) => (
                            <SelectItem key={loyalty.id} value={loyalty.tier}>
                              {loyalty.tier}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                  </div>
              </div>
              <div className="flex gap-4">
                <div className="w-full">
                    <Label htmlFor="reward">Reward Description</Label>
                    <Input
                      id="reward"
                      value={currentReward.description} 
                      onChange={(e) => setCurrentReward(prev => ({ ...prev, description: e.target.value }))} // Updated `setCurrentSpecial` to `setCurrentReward` and `name` to `reward_title`
                      placeholder="Enter description for reward"
                    />
                </div>
                <div className="flex flex-col space-x-2 pt-2">
                      <Label htmlFor="active-toggle">
                        Active
                      </Label>
                      <div className="pt-2">
                        <Switch
                          id="active-toggle"
                          checked={currentReward.isActive}
                          onCheckedChange={(checked) =>
                            setCurrentReward(prev => ({ ...prev, isActive: checked }))
                          }
                        />
                      </div>
                  </div>
              </div>

              <Button 
                onClick={ saveReward }>
                  Save Reward
              </Button>
            </div>
          </CardContent>
        </Card>
        </div>
    </div>
  )
}