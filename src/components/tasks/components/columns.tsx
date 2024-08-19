"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { Task } from "../data/schema"
import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"
import { priorities, statuses } from "../data/data"
import { formatDate } from "@/utils/formatDate"

// Define types for statuses and priorities
type StatusType = keyof typeof statuses
type PriorityType = keyof typeof priorities

export const columns: ColumnDef<Task>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => {
      const task = row.original as Task; // Cast the row's original data to your Task type
      const isCompleted = task.status === "COMPLETED"; // Adjust this condition based on your task status representation
  
      return (
        <Checkbox
          checked={row.getIsSelected() || isCompleted}
          onCheckedChange={(value) => {
            if (!isCompleted) {
              row.toggleSelected(!!value)
            }
          }}
          aria-label="Select row"
          className="translate-y-[2px]"
          disabled={isCompleted}
        />
      )
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => (
      <div className="max-w-[500px] truncate font-medium">
        {row.getValue("title")}
      </div>
    ),
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => (
      <div className="max-w-[500px] truncate">
        {row.getValue("description") || "No description"}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.getValue("status") as StatusType
      const StatusIcon = statuses[status]?.icon
      return (
        <div className="flex w-[100px] items-center">
          {StatusIcon && (
            <StatusIcon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{statuses[status]?.label || status}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "priority",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Priority" />
    ),
    cell: ({ row }) => {
      const priority = row.getValue("priority") as PriorityType
      const PriorityIcon = priorities[priority]?.icon
      return (
        <div className="flex items-center">
          {PriorityIcon && (
            <PriorityIcon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{priorities[priority]?.label || priority}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "deadline",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Deadline" />
    ),
    cell: ({ row }) => {
      const deadline = row.getValue("deadline");
      return <div>{formatDate(deadline as string)}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]