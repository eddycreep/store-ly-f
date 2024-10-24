'use client'

import { useState } from 'react'
import { Plus, X, Search, PlusCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

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
  specialType: 'Percentage' | 'Amount'
  storeId: string
  startDate: string
  endDate: string
  isActive: boolean
}

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

export function CombinedSpecialsManagerComponent() {
  const [specials, setSpecials] = useState<CombinedSpecial[]>([])
  const [currentSpecial, setCurrentSpecial] = useState<CombinedSpecial>({
    id: '',
    name: '',
    special: '',
    products: [],
    specialPrice: 0,
    specialType: 'Amount',
    storeId: '',
    startDate: '',
    endDate: '',
    isActive: true
  })
  const [searchTerm, setSearchTerm] = useState('')
  const [isOverlayVisible, setIsOverlayVisible] = useState(false)
  
  // Step 1: Added state to manage component visibility
  const [isComponentVisible, setIsComponentVisible] = useState(true);

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

  const saveSpecial = () => {
    if (currentSpecial.name && currentSpecial.products.length > 0 && currentSpecial.specialPrice > 0 && currentSpecial.storeId && currentSpecial.startDate && currentSpecial.endDate) {
      setSpecials(prev => [...prev, { ...currentSpecial, id: Date.now().toString() }])
      setCurrentSpecial({ id: '', name: '', special: '', products: [], specialPrice: 0, specialType: 'Amount', storeId: '', startDate: '', endDate: '', isActive: true })
      setIsOverlayVisible(true)
      setTimeout(() => setIsOverlayVisible(false), 2000) // Hide overlay after 2 seconds
    }
  }

  return (
    <div className="container mx-auto p-4 relative">
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      {/* <h1 className="text-2xl font-bold mb-6">Combined Specials Manager</h1> */}

        <Card className="mb-6">
              <div className="flex justify-end pr-4 pt-4">
                <button onClick={() => setIsComponentVisible(false)}>
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
                    value={currentSpecial.specialType}
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
                  <div className="w-[400px]">
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
                        {currentSpecial.isActive ? 'Active' : 'In-Active'}
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

              <Button onClick={saveSpecial} 
                // disabled={currentSpecial.products.length === 0 || !currentSpecial.name || currentSpecial.specialPrice <= 0 || !currentSpecial.storeId || !currentSpecial.startDate || !currentSpecial.endDate}
              >
                  Save Special
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* <Card>
          <CardHeader>
            <CardTitle>Existing Combined Specials</CardTitle>
          </CardHeader>
          <CardContent>
            {specials.length === 0 ? (
              <p>No specials created yet.</p>
            ) : (
              <div className="space-y-4">
                {specials.map((special) => (
                  <Card key={special.id} className="p-4">
                    <h3 className="font-semibold">{special.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      Special {special.specialType}: {special.specialType === 'Percentage' ? `${special.specialPrice}%` : `${special.specialPrice.toFixed(2)}`}
                    </p>
                    <p className="text-sm text-muted-foreground">Store ID: {special.storeId}</p>
                    <p className="text-sm text-muted-foreground">
                      Date: {special.startDate} to {special.endDate}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Status: {special.isActive ? 'Active' : 'Inactive'}
                    </p>
                    <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2">
                      {special.products.map((product) => (
                        <div key={product.id} className="text-sm">
                          {product.name} (Group: {product.groupId})
                        </div>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card> */}
        </div>
      </div>
  )
}