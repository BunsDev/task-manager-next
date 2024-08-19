"use client"
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useCategory } from '@/providers/category-context'
import { Button } from '@/components/ui/button'
import { Trash } from 'lucide-react'
import { deleteCategory } from '@/actions/delete-category'
import { toast } from 'sonner'
import EditCategory from './EditCategory'
// todo add loading state

const AllCategory = () => {
    const { categories, setCategories } = useCategory()


    return (
        <Card className="rounded-lg border-none mt-6">
            <CardContent className="p-6">
                <div className="flex flex-col gap-4 min-h-[calc(100vh-56px-64px-20px-24px-56px-48px)]">
                    {categories && categories.length > 0 ? (
                        categories.map((cat) => (
                            <Card className="h-fit w-full relative" key={cat.id}>
                                {/* <ActionDropDown projectId={''} /> */}
                                <CardHeader>
                                    <CardTitle className="flex gap-2 items-center">
                                        {cat.name}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p>{cat.projects.length} Project{cat.projects.length !== 1 && 's'}</p>
                                </CardContent>
                                <div className="w-full flex justify-end p-2">
                                    <EditCategory categoryId={cat.id} />
                                    <Button
                                        onClick={async () => {
                                            try {
                                                await deleteCategory(cat.id);
                                                setCategories((prevCategories) =>
                                                    prevCategories.filter((category) => category.id !== cat.id)
                                                );
                                                toast.success("Category deleted");
                                            } catch (error) {
                                                toast.error("Unable to delete category");
                                            }
                                        }}
                                        variant={"ghost"}
                                    >
                                        <Trash className="text-red-500" />
                                    </Button>
                                </div>
                            </Card>
                        ))
                    ) : (
                        <div className="text-center text-gray-500">
                            No categories available
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );

}

export default AllCategory
