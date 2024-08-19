import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Button } from "../../ui/button";
import { Progress } from "../../ui/progress";
import { Badge } from "../../ui/badge";
import { Trash } from "lucide-react";
import { deleteProject } from "@/actions/delete-project";



const AllTasks = () => {
    return (
        <Card className="rounded-lg border-none mt-6">
            <CardContent className="p-6">
                <div className="grid gap-8 min-h-[calc(100vh-56px-64px-20px-24px-56px-48px)] grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    <Card >
                    
                    </Card>
                </div>
            </CardContent>
        </Card>
    )
}

export default AllTasks
