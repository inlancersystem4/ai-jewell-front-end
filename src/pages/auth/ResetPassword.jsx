import { Button, Input } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Confirm Password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function ResetPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  return (
    <div className="form-card">
      <div className="space-y-2">
        <h1>Reset Password</h1>
        <h6>Your identity has been verified!! Set your new password</h6>
      </div>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-1">
          <Input
            type="password"
            placeholder="New Password"
            {...register("password")}
            className={`${errors.password ? "!border-bright-red" : ""}`}
          />
          {errors.password && (
            <p className="text-bright-red text-xs">{errors.password.message}</p>
          )}
        </div>
        <div className="space-y-1">
          <Input
            type="password"
            placeholder="Confirm Password"
            {...register("confirmPassword")}
            className={`${errors.confirmPassword ? "!border-bright-red" : ""}`}
          />
          {errors.confirmPassword && (
            <p className="text-bright-red text-xs">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
        <Button type="submit" className="form-btn">
          Reset Password
        </Button>
      </form>
    </div>
  );
}
