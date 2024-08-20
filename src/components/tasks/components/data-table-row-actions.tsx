"use client"

import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { Row } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Task } from "../data/schema"
import { deleteTask } from "@/actions/delete-task"
import { toast } from "sonner"
import { EditTask } from "@/components/placeholder-content/tasks/EditTask"
import { useState } from "react"

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData>({
  row
}: DataTableRowActionsProps<TData>) {
  const task = row.original as Task
  const [isEditOpen, setIsEditOpen] = useState(false)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem onSelect={(e) => {
          e.preventDefault()
          setIsEditOpen(true)
        }}>
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem>Make a copy</DropdownMenuItem>
        <DropdownMenuItem>Favorite</DropdownMenuItem>
        <DropdownMenuItem onClick={async () => {
          try {
            await deleteTask(task.id, task.projectId)
            toast.success("Task Removed")
          } catch (error) {
            toast.error("Unable to remove Task")
          }
        }}
        >
          Delete
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
      {isEditOpen && (
        <EditTask
          taskId={task.id}
          open={isEditOpen}
          onOpenChange={(open) => setIsEditOpen(open)}
        />
      )}
    </DropdownMenu>
  )
}