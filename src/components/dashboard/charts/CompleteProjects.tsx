import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { fetchCompletedTasks } from '@/actions/chart-data'

const CompleteTasks =async  () => {
    const totalCompletedTasks = await fetchCompletedTasks()
    return (
        <Card className='w-full'>
            <CardHeader className="pb-2">
                <CardDescription>Completed Tasks</CardDescription>
                <CardTitle className="text-4xl">{totalCompletedTasks}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-xs text-muted-foreground">
                +10% from last month
                </div>
            </CardContent>
            
        </Card>
    )
}

export default CompleteTasks
