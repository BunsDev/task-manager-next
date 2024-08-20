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
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Category, useCategory } from "@/providers/category-context";
import { addCategory } from "@/actions/add-category";



export function AddCategory({ categoreis }: { categoreis: Category[] }) {

    const formSchema = z.object({
        name: z.string().min(1, "Name is required"),
    });

    type FormValues = z.infer<typeof formSchema>;

    const [open, setOpen] = useState(false);
    const { setCategories } = useCategory()
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    });

    useEffect(() => {
        setCategories(categoreis)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const { isSubmitting } = form.formState;


    const onSubmit = async (data: FormValues) => {
        try {
            const newCategory = await addCategory(data.name);
            if (newCategory) {
                setCategories((prevCategories = []) => [...prevCategories, newCategory]);
            }
            toast.success("Category Added");
            form.reset();
        } catch (error: any) {
            if (error.message === "Unable to create Category") {
                toast.error("Unable to create Category");
            }
        }
        setOpen(false);
    };
    

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="flex gap-2 items-center">
                    <Plus />
                    Add Category
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add New Category</DialogTitle>
                    <DialogDescription>
                        Enter the name of the new category.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <Input {...field} />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <DialogFooter>
                            <Button type="submit" disabled={isSubmitting} >
                                Add
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
