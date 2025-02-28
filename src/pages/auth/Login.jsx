import { Link } from "react-router";
import { Button, Input } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function Login() {
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
        <h1>Login your account</h1>
      </div>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-1">
          <Input
            type="text"
            placeholder="Username"
            {...register("username")}
            className={`${errors.username ? "!border-bright-red" : ""}`}
          />
          {errors.username && (
            <p className="text-bright-red text-xs">{errors.username.message}</p>
          )}
        </div>
        <div className="space-y-1.5">
          <div className="space-y-1">
            <Input
              type="password"
              placeholder="Password"
              {...register("password")}
              className={`${errors.password ? "!border-bright-red" : ""}`}
            />
            {errors.password && (
              <p className="text-bright-red text-xs">
                {errors.password.message}
              </p>
            )}
          </div>
          <Link
            to="/auth/forgot-password"
            className="text-end block font-normal text-base text-dark-gray hover:text-black hover:underline focus:underline"
          >
            Forgot Password?
          </Link>
        </div>
        <Button type="submit" className="form-btn">
          Login
        </Button>
      </form>
      <p className="text-center text-base font-medium text-onyx-black block">
        Don’t have an account?
        <Link
          to="/auth/sign-up"
          className="text-dark-gray font-semibold px-0.5 hover:text-black hover:underline focus:underline"
        >
          Sign Up
        </Link>
      </p>
      <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-cool-gray">
        <span className="relative z-10 bg-white px-4 text-lg text-slate-gray">
          OR
        </span>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <Button className="form-social-btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <g clipPath="url(#clip0_115_2011)">
              <path
                d="M20 10.2391C20 9.56517 19.9333 8.86952 19.8222 8.21735H10.2V12.0652H15.7111C15.4888 13.3043 14.7555 14.3913 13.6666 15.0869L16.9555 17.5869C18.8888 15.826 20 13.2608 20 10.2391Z"
                fill="#4280EF"
              />
              <path
                d="M10.2 19.9782C12.9555 19.9782 15.2666 19.0869 16.9555 17.5652L13.6666 15.0869C12.7555 15.6956 11.5778 16.0434 10.2 16.0434C7.53331 16.0434 5.28887 14.2826 4.46664 11.9348L1.08887 14.4782C2.8222 17.8478 6.33331 19.9782 10.2 19.9782Z"
                fill="#34A353"
              />
              <path
                d="M4.46667 11.913C4.04444 10.6739 4.04444 9.32606 4.46667 8.08693L1.08889 5.52171C-0.355557 8.3478 -0.355557 11.6739 1.08889 14.4782L4.46667 11.913Z"
                fill="#F6B704"
              />
              <path
                d="M10.2 3.97824C11.6444 3.9565 13.0666 4.49997 14.1111 5.47824L17.0222 2.60867C15.1778 0.913016 12.7333 -2.79285e-05 10.2 0.0217112C6.33331 0.0217112 2.8222 2.15215 1.08887 5.52171L4.46665 8.08693C5.28887 5.71737 7.53331 3.97824 10.2 3.97824Z"
                fill="#E54335"
              />
            </g>
            <defs>
              <clipPath id="clip0_115_2011">
                <rect width="20" height="20" fill="white" />
              </clipPath>
            </defs>
          </svg>
          Google
        </Button>
        <Button className="form-social-btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 21 20"
            fill="none"
          >
            <rect x="0.0454102" width="20" height="20" rx="10" fill="#337FFF" />
            <path
              d="M12.3398 10.6246L12.6248 8.81565H10.8694V7.63985C10.8694 7.14522 11.1145 6.66189 11.8981 6.66189H12.7074V5.12148C12.2361 5.04639 11.7599 5.00577 11.2826 4.99994C9.83785 4.99994 8.89463 5.86766 8.89463 7.43634V8.81565H7.29315V10.6246H8.89463V14.9999H10.8694V10.6246H12.3398Z"
              fill="white"
            />
          </svg>
          Facebook
        </Button>
      </div>
    </div>
  );
}
