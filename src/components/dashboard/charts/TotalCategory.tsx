import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { fetchTotalCategories } from '@/actions/chart-data'
const TotalCategory = async () => {
    const totalCategory = await fetchTotalCategories()
    return (
        <Card className='w-full'>
            <CardHeader className="pb-2">
                <CardDescription>Total Category</CardDescription>
                <CardTitle className="text-4xl">{totalCategory}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-xs text-muted-foreground">
                    +1% from last month
                </div>
            </CardContent>
        </Card>
    )
}

export default TotalCategory
