"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormControl,
} from "@/components/ui/form";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Role } from "@prisma/client";
import { createTeamMember } from "@/actions/add-team";

interface FormValues {
    userId: string;
    projectId: string;
    role: Role;
}

interface AddTeamProps {
    users: { id: string | null; name: string | null }[];
    projects: { id: string; name: string }[];
}

export function AddTeam({ users, projects }: AddTeamProps) {
    const [open, setOpen] = useState(false);

    const form = useForm<FormValues>({
        defaultValues: {
            userId: "",
            projectId: "",
            role: Role.VIEWER,
        },
    });

    const onSubmit = async (data: FormValues) => {
        try {
            const result = await createTeamMember({
                userId: data.userId,
                projectId: data.projectId,
                role: data.role
            });

            console.log("Created team member:", result);
            toast.success(`Team member added successfully!`);
            form.reset();
            setOpen(false);
        } catch (error) {
            console.error("Error adding team member:", error);
            toast.error("Failed to add team member. Please try again.");
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="flex gap-2 items-center">
                    <Plus />
                    Add Member
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add New Team Member</DialogTitle>
                    <DialogDescription>
                        Select user, project, and role for the new team member.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="userId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>User</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a user" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {users.map((user) => (
                                                <SelectItem key={user.id} value={user.id || ""}>
                                                    {user.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="projectId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Project</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a project" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {projects.map((project) => (
                                                <SelectItem key={project.id} value={project.id}>
                                                    {project.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="role"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Role</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a role" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value={Role.VIEWER}>Viewer</SelectItem>
                                            <SelectItem value={Role.EDITOR}>Editor</SelectItem>
                                            <SelectItem value={Role.ADMIN}>Admin</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <Button type="submit">Submit</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}