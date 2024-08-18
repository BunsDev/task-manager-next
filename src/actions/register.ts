// "use server";

// import { z } from "zod";
// import { TRPCError } from "@trpc/server";
// import { api } from "~/trpc/server";
// import { registerSchema } from "~/utils/formSchema/register";
// type FormData = z.infer<typeof registerSchema>;

// export async function registerUser(user: FormData) {
//   try {
//     const res = await api.register.registerUser({
//       email: user.email,
//       name: user.name,
//       password: user.password,
//     });
//     return res;
//   } catch (error) {
//     if (error instanceof TRPCError) {
//       // Check for the specific conflict error
//       if (error.code === "CONFLICT") {
//         throw new Error(error.message);
//       }
//     }

//     // Log and throw a generic error if it's not a TRPCError
//     throw new Error("Unable to create user");
//   }
// }
