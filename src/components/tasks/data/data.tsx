import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CircleIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons"

export const labels = [
  {
    value: "bug",
    label: "Bug",
  },
  {
    value: "feature",
    label: "Feature",
  },
  {
    value: "documentation",
    label: "Documentation",
  },
]

export const statuses = {
  COMPLETED: {
    value: "COMPLETED",
    label: "Completed",
    icon: CircleIcon,
  },
  IN_PROGRESS: {
    value: "IN_PROGRESS",
    label: "In Progress",
    icon: StopwatchIcon,
  },
  CANCELLED: {
    value: "CANCELLED",
    label: "Cancelled",
    icon: CheckCircledIcon,
  },
}

export const priorities = {
  LOW: {
    label: "Low",
    value: "LOW",
    icon: ArrowDownIcon,
  },
  MEDIUM: {
    label: "Medium",
    value: "MEDIUM",
    icon: ArrowRightIcon,
  },
  HIGH: {
    label: "High",
    value: "HIGH",
    icon: ArrowUpIcon,
  },
}

export const getStatusesArray = () => 
  Object.values(statuses).map(({ value, label, icon }) => ({ value, label, icon }))

export const getPrioritiesArray = () => 
  Object.values(priorities).map(({ value, label, icon }) => ({ value, label, icon }))