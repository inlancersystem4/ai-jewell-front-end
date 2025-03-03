import { Button, Input } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useNavigate, useSearchParams } from "react-router";
import { post } from "@/utils/axiosWrapper";
import { useMutation } from "@tanstack/react-query";
import { setJwtToken } from "@/redux/actions";
import { useDispatch } from "react-redux";
import { z } from "zod";
import { useEffect } from "react";

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
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let [searchParams] = useSearchParams();

  const token = searchParams.get("id");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const forgotPasswordFn = async (data) => {
    const formData = new FormData();
    formData.append("new_password", data.password);
    formData.append("confirm_password", data.confirmPassword);
    formData.append("token", token);

    try {
      const response = await post("reset-password", formData);
      if (response.success == 1) {
        dispatch(setJwtToken(response.data.session_token));
        toast.success(response.message);
        navigate("/");
      } else {
        toast.error(response.message);
      }
    } catch (e) {
      console.error(e);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  const mutation = useMutation({
    mutationFn: (formData) => forgotPasswordFn(formData),
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  useEffect(() => {
    if (!token) {
      navigate("/auth");
    }
  }, [navigate, searchParams, token]);

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
        <Button
          type="submit"
          className="form-btn"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Password Reseting..." : "Reset Password"}
        </Button>
      </form>
    </div>
  );
}
