"use client"
import { EllipsisVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "sonner"
import { deleteTeam } from "@/actions/delete-team"

const TeamActionDropDown = ({ teamMemberId }: { teamMemberId: string }) => {
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
                        onClick={async () => {
                            try {
                                await deleteTeam(teamMemberId)
                                toast.success("Team Member Deleted Successfully")
                            } catch (error) {
                                toast.error("Unable to Delete Team")
                            }
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

export default TeamActionDropDown
