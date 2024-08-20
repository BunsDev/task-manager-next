"use client"

import { getProjectProgress } from "@/actions/fetch-projects"
import { Progress } from "./ui/progress"
import { useQuery } from "@tanstack/react-query"

const ProjectProgress = ({ projectId }: { projectId: string }) => {
    const { data, isLoading, error } = useQuery({
        queryKey: ["projectStatus", projectId],  // Include projectId in the query key
        queryFn: async () => {
            return await getProjectProgress(projectId)
        },
        staleTime: 0
    })

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error fetching project progress</div>

    const progress = data?.progress
    const totalTask = data?.total
    const completedTask = data?.completed

    return (
        <div>
            <div className=" w-full flex justify-between mb-2 items-center">
                <p>Progress</p>
                <div className="flex text-gray-500">
                    <p>{completedTask}</p>/
                    <p>{totalTask}</p>
                </div>
            </div>
            <Progress value={progress} className="h-2" />

        </div>
    )
}

export default ProjectProgress