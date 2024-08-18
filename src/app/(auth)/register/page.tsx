"use client"
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { ModeToggle } from "~/components/mode-toggle";
import Link from "next/link";
import { PanelsTopLeft } from "lucide-react";
import { registerSchema } from "~/utils/formSchema/register";
import { registerUser } from "~/actions/register";
import { useRouter } from "next/navigation";
import {  toast } from 'sonner'




type FormData = z.infer<typeof registerSchema>;

export default function Component() {

    const router = useRouter()

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<FormData>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = async (data: FormData) => {
        try {
            await registerUser(data)
            reset()
            toast.success("Registeration Successfull")
            router.push("/login")
        } catch (error: any) {
            if (error.message === "User with this email already exists") {
                toast.error("Email Already Exists")
            } else {
                toast.error("Unable to create user")
            }
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <header className="z-[50] sticky top-0 w-full bg-background/95 border-b backdrop-blur-sm dark:bg-black/[0.6] border-border/40">
                <div className="container h-14 flex items-center">
                    <Link
                        href="/"
                        className="flex justify-start items-center hover:opacity-85 transition-opacity duration-300"
                    >
                        <PanelsTopLeft className="w-6 h-6 mr-3" />
                        <span className="font-bold">PMA</span>
                        <span className="sr-only">PMA</span>
                    </Link>
                    <nav className="ml-auto flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="icon"
                            className="rounded-full w-8 h-8 bg-background"
                            asChild
                        >
                            <Link href="https://github.com/kartikmalik0">
                                <GitHubLogoIcon className="h-[1.2rem] w-[1.2rem]" />
                            </Link>
                        </Button>
                        <ModeToggle />
                    </nav>
                </div>
            </header>
            <Card className="mx-auto max-w-md my-auto">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold">Sign Up</CardTitle>
                    <CardDescription>Enter your email and password to Register to your account</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                {...register("email")}
                                className={`border ${errors.email ? "border-red-500" : ""}`}
                            />
                            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="John Doe"
                                {...register("name")}
                                className={`border ${errors.name ? "border-red-500" : ""}`}
                            />
                            {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                {...register("password")}
                                className={`border ${errors.password ? "border-red-500" : ""}`}
                            />
                            {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                        </div>
                        <Button type="submit" className="w-full" disabled={isSubmitting}>
                            {isSubmitting ? "Registering..." : "Register"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
