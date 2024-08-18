"use client"
import { EllipsisVertical } from "lucide-react"
import { deleteProject } from "@/actions/delete-project"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useProject } from "@/providers/project-context"
import { EditProject } from "./EditProject"

const ActionDropDown = ({ projectId }: { projectId: string }) => {
    const { setProjects } = useProject()
    return (
        <div className=" absolute right-1 top-[7.5px]">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size={"sm"} className="px-2 opacity-70">
                        <EllipsisVertical />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    
                    <DropdownMenuCheckboxItem
                        // checked={showActivityBar}
                        // onCheckedChange={setShowActivityBar}
                        onClick={async () => {
                            await deleteProject(projectId)
                            setProjects((prevProjects) => prevProjects.filter(project => project.id !== projectId));
                        }}
                        className="text-red-500"
                    >
                        Delete
                    </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default ActionDropDown
