"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Edit } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useCategory } from "@/providers/category-context";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { editCategory } from "@/actions/edit-category";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
});

type FormValues = z.infer<typeof formSchema>;

const EditCategory = ({ categoryId }: { categoryId: string }) => {
  const [open, setOpen] = useState(false);
  const { categories, setCategories } = useCategory();
  const category = categories.find(c => c.id === categoryId);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: category?.name || "",
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (data: FormValues) => {
    try {
      const result = await editCategory(categoryId, data.name);
      if (result.success) {
        toast.success("Category updated successfully");
        setCategories((prevCategories) =>
          prevCategories.map((cat) =>
            cat.id === categoryId ? { ...cat, name: data.name } : cat
          )
        );
        setOpen(false); 
      } else {
        toast.error(result.error || "Unable to update category");
      }
    } catch (error: any) {
      toast.error("Unable to update category");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button" variant={"ghost"} onClick={() => setOpen(true)}>
          <Edit />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Category</DialogTitle>
          <DialogDescription>
            Modify the details of the category.
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
              <Button type="submit" disabled={isSubmitting}>
                Save Changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditCategory;
