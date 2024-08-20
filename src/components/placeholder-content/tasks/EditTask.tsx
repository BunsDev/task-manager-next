'use client'

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useState, useEffect } from "react"
import { toast } from "sonner"
import { fetchSingleTask } from "@/actions/fetch-tasks"
import { editTask } from "@/actions/edit-task"
// import { updateTask } from "@/actions/update-task"
// import { fetchTask } from "@/actions/fetch-task"

const formSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().nullable(),
    priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
    deadline: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: "Invalid date format",
    }),
    status: z.enum(["COMPLETED", "IN_PROGRESS", "CANCELLED"]),
})

type TaskData = z.infer<typeof formSchema> & { id: string; projectId: string }

export function EditTask({ taskId, open, onOpenChange }: { taskId: string, open: boolean, onOpenChange: (open: boolean) => void }) {
    // const [open, setOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
            priority: "MEDIUM",
            deadline: "",
            status: "IN_PROGRESS",
        },
    })

    const { isSubmitting } = form.formState

    useEffect(() => {
        async function loadTaskData() {
            setIsLoading(true)
            try {
                const taskData = await fetchSingleTask(taskId)
                taskData && form.reset({
                    title: taskData.title,
                    description: taskData.description || "",
                    priority: taskData.priority,
                    deadline: new Date(taskData.deadline).toISOString().slice(0, 16),
                    status: taskData.status,
                })
            } catch (error) {
                toast.error("Failed to load task data")
            } finally {
                setIsLoading(false)
            }
        }

        if (open) {
            loadTaskData()
        }
    }, [open, taskId, form])

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const formData = new FormData()
        Object.entries(values).forEach(([key, value]) => {
            formData.append(key, value !== null ? value : '')
        })
        formData.append('id', taskId)

        try {
              await editTask(formData)
            toast.success("Task updated successfully")
        } catch (error) {
            toast.error("Failed to update task")
        } finally {
            onOpenChange(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogTrigger asChild>
                <Button variant="outline">Edit Task</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Task</DialogTitle>
                    <DialogDescription>
                        Update the details of this task.
                    </DialogDescription>
                </DialogHeader>
                {isLoading ? (
                    <div>Loading...</div>
                ) : (
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Task title" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Task description"
                                                {...field}
                                                value={field.value ?? ''} // Use empty string if value is null
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="priority"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Priority</FormLabel>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select priority" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="LOW">Low</SelectItem>
                                                <SelectItem value="MEDIUM">Medium</SelectItem>
                                                <SelectItem value="HIGH">High</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="deadline"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Deadline</FormLabel>
                                        <FormControl>
                                            <Input type="datetime-local" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="status"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Status</FormLabel>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select status" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="COMPLETED">Completed</SelectItem>
                                                <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                                                <SelectItem value="CANCELLED">Cancelled</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <DialogFooter>
                                <Button type="submit" disabled={isSubmitting}>Update Task</Button>
                            </DialogFooter>
                        </form>
                    </Form>
                )}
            </DialogContent>
        </Dialog>
    )
}