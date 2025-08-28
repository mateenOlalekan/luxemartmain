// "use client";

// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import InputComponent from "../../components/Input/input";
// import { Mail } from "lucide-react";

// const forgotSchema = z.object({
//   email: z.string().email("Invalid email"),
// });

// type ForgotForm = z.infer<typeof forgotSchema>;

// export default function ForgotPasswordPage() {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<ForgotForm>({
//     resolver: zodResolver(forgotSchema),
//   });

//   const onSubmit = (data: ForgotForm) => {
//     console.log("Forgot password data:", data);
//   };

//   return (
//     <div className="flex min-h-screen items-center justify-center p-8">
//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className="w-full max-w-md space-y-6 bg-white p-6 rounded-2xl shadow-md"
//       >
//         <h2 className="text-2xl font-bold text-center text-emerald-600">
//           Reset Your Password
//         </h2>
//         <InputComponent
//           label="Email"
//           type="email"
//           placeholder="you@example.com"
//           Icon={<Mail size={18} />}
//           register={register("email")}
//           error={errors.email}
//         />
//         <button
//           type="submit"
//           className="w-full py-3 rounded-2xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition"
//         >
//           Send Reset Link
//         </button>
//       </form>
//     </div>
//   );
// }
