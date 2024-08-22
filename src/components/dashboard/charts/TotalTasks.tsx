import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { fetchTotalTasks } from '@/actions/chart-data'

const TotalTasks = async () => {

    const totalTask = await fetchTotalTasks()

    return (
        <Card className='w-full'>
            <CardHeader className="pb-2">
                <CardDescription>Total Tasks</CardDescription>
                <CardTitle className="text-4xl">{totalTask}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-xs text-muted-foreground">
                    -1% from last month
                </div>
            </CardContent>

        </Card>
    )
}

export default TotalTasks
