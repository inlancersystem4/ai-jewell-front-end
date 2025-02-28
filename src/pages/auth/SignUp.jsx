import { Link } from "react-router";
import { Button, Input } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function SignUp() {
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
        <h1>Create a new account</h1>
      </div>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-1">
          <Input
            type="text"
            placeholder="Name"
            {...register("name")}
            className={`${errors.name ? "!border-bright-red" : ""}`}
          />
          {errors.name && (
            <p className="text-bright-red text-xs">{errors.name.message}</p>
          )}
        </div>
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
        <div className="space-y-1">
          <Input
            type="password"
            placeholder="Password"
            {...register("password")}
            className={`${errors.password ? "!border-bright-red" : ""}`}
          />
          {errors.password && (
            <p className="text-bright-red text-xs">{errors.password.message}</p>
          )}
        </div>
        <Button type="submit" className="form-btn">
          Create account
        </Button>
      </form>
      <p className="text-center text-base font-medium text-onyx-black block">
        Already have an account?
        <Link
          to="/auth"
          className="text-dark-gray font-semibold px-0.5 hover:text-black hover:underline focus:underline"
        >
          Login
        </Link>
      </p>
    </div>
  );
}
