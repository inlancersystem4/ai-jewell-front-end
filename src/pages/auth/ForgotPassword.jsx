import { Button, Input } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { post } from "@/utils/axiosWrapper";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

const schema = z.object({
  email: z.string().email("Invalid email address"),
});

export default function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const forgotPasswordFn = async (data) => {
    const formData = new FormData();
    formData.append("user_email", data.email);
    formData.append("user_password", data.password);
    formData.append("user_password", data.password);

    try {
      const response = await post("sign-in", formData);
      if (response.success == 1) {
        toast.success(response.message);
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

  return (
    <div className="form-card">
      <div className="space-y-2">
        <h1>Forgot Password</h1>
        <h6>
          Enter your email and we’ll send you a link to reset your Password
        </h6>
      </div>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-1">
          <Input
            type="email"
            placeholder="Email"
            {...register("email")}
            className={`${errors.email ? "!border-bright-red" : ""}`}
          />
          {errors.email && (
            <p className="text-bright-red text-xs">{errors.email.message}</p>
          )}
        </div>
        <Button
          type="submit"
          className="form-btn"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Mail sending..." : "Send"}
        </Button>
      </form>
    </div>
  );
}
