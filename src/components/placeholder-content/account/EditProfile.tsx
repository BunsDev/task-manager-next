'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { updateUserName } from '@/actions/edit-user';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import * as z from 'zod';
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from '@/components/ui/form';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useEffect } from 'react';

const FormSchema = z.object({
    name: z.string().min(1, "Name is required"),
});

type FormValues = z.infer<typeof FormSchema>;

export default function UserProfile() {
    const { data: session } = useSession();

    const form = useForm<FormValues>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: session?.user?.name || '',
        },
    });

    useEffect(() => {
        if (session?.user?.name) {
            form.setValue('name', session.user.name);
        }
    }, [session, form]);

    
    async function onSubmit(data: FormValues) {
        if (!session || !session.user || !session.user.email) {
            toast.error("Unauthorized");
            return;
        }
        try {
            await updateUserName(session.user.email, data.name);
            toast.success("Username updated successfully");
        } catch (error) {
            console.error("Unable to update username", error);
            toast.error("Unable to update username");
        }
    }

    const { isSubmitting } = form.formState

    return (
        <Card className="rounded-lg border-none mt-6">
            <CardContent className="p-6">
                <div className="flex flex-col gap-4 items-center">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold">User Profile</CardTitle>
                    </CardHeader>

                    {session?.user?.image && (
                        <Image
                            src={session.user.image}
                            alt="User Avatar"
                            width={100}
                            height={100}
                            className="rounded-full"
                        />
                    )}

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-md">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="mb-4">
                                <FormLabel>Email</FormLabel>
                                <p className="mt-1 p-2 bg-gray-100 rounded">
                                    {session?.user?.email}
                                </p>
                            </div>

                            <div className="flex justify-end">
                                <Button type="submit" disabled={isSubmitting}>
                                    {isSubmitting ? 'Updating...' : 'Update Name'}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </CardContent>
        </Card>
    );
}