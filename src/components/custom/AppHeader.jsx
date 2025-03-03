import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Dialog,
  DialogPanel,
  DialogTitle,
  Button,
  DialogBackdrop,
  Input,
} from "@headlessui/react";
import Avatar from "react-avatar";
import { post } from "@/utils/axiosWrapper";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setJwtToken } from "@/redux/actions";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useState } from "react";
import { X } from "lucide-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { z } from "zod";

const schema = z
  .object({
    currentPassword: z.string().min(1, "current Password is Reqired"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Confirm Password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function AppHeader() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let [logoutIsOpen, setLogoutIsOpen] = useState(false);
  let [passwordIsOpen, setPasswordIsOpen] = useState(false);

  async function logout() {
    try {
      const response = await post("logout");
      if (response.success == 1) {
        setLogoutIsOpen(false);
        dispatch(setJwtToken(""));
        navigate("/auth");
      } else {
        toast.error(response.message);
      }
    } catch (e) {
      console.error(e);
      toast.error("An unexpected error occurred. Please try again.");
      throw e;
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const changePasswordFn = async (data) => {
    const formData = new FormData();
    formData.append("current_pass", data.currentPassword);
    formData.append("new_pass", data.password);
    formData.append("confirm_pass", data.confirmPassword);

    try {
      const response = await post("change-password", formData);
      if (response.success == 1) {
        toast.success(response.message);
        setPasswordIsOpen(false);
      } else {
        toast.error(response.message);
      }
    } catch (e) {
      console.error(e);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  const mutation = useMutation({
    mutationFn: (formData) => changePasswordFn(formData),
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  async function profileFN() {
    try {
      const response = await post("user-profile");
      if (response.success == 1) {
        return response.data;
      } else {
        toast.error(response.message);
        return null;
      }
    } catch (e) {
      console.error(e);
      toast.error("An unexpected error occurred. Please try again.");
      throw e;
    }
  }

  const { data: profileData } = useQuery({
    queryKey: ["profile"],
    queryFn: profileFN,
  });

  return (
    <header className="app-header">
      <div className=""></div>
      <div>
        <Menu>
          <MenuButton>
            <div className="header-avatar">
              <Avatar
                name={profileData ? profileData.user_name : "AI"}
                size="32"
                className="rounded-full"
              />
            </div>
          </MenuButton>
          <MenuItems
            className="bg-white rounded-lg w-56 divide-y divide-cool-gray flex flex-col border border-cool-gray shadow-xl mt-1"
            anchor="bottom"
          >
            <MenuItem className="py-1.5 px-3 text-left text-sm text-onyx-black hover:bg-snow-white">
              <Button onClick={() => setPasswordIsOpen(true)}>
                Change password
              </Button>
            </MenuItem>
            <MenuItem className="py-1.5 px-3 text-left text-sm text-crimson-red hover:bg-snow-white">
              <Button onClick={() => setLogoutIsOpen(true)}> Log Out</Button>
            </MenuItem>
          </MenuItems>
        </Menu>
      </div>
      <Dialog
        open={logoutIsOpen}
        onClose={() => setLogoutIsOpen(false)}
        className="relative z-50"
      >
        <DialogBackdrop className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-md w-full space-y-6  bg-white p-6">
            <div className="space-y-2">
              <DialogTitle className="font-bold text-bright-red">
                Log Out
              </DialogTitle>
              <p className="text-sm text-muted-gray">
                Are you sure you want to Log Out your account?
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <button
                className="w-full text-xs font-medium text-onyx-black rounded-md border border-cool-gray py-2.5"
                onClick={() => setLogoutIsOpen(false)}
              >
                Cancel
              </button>
              <button
                className="w-full text-xs font-medium text-white bg-warm-gray rounded-md border border-cool-gray py-2.5"
                onClick={logout}
              >
                Yes, Log out
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
      <Dialog
        open={passwordIsOpen}
        onClose={() => setPasswordIsOpen(false)}
        className="relative z-50"
      >
        <DialogBackdrop className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-md w-full space-y-6  bg-white p-6">
            <div className="flex items-center justify-between">
              <DialogTitle className="font-bold text-xl">
                Change Password
              </DialogTitle>
              <Button onClick={() => setPasswordIsOpen(false)}>
                <X />
              </Button>
            </div>
            <form
              className="space-y-6 chnage-password-card"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="space-y-1">
                <Input
                  type="password"
                  placeholder="Current Password"
                  {...register("currentPassword")}
                  className={`${
                    errors.currentPassword ? "!border-bright-red" : ""
                  }`}
                />
                {errors.currentPassword && (
                  <p className="text-bright-red text-xs">
                    {errors.currentPassword.message}
                  </p>
                )}
              </div>
              <div className="space-y-1">
                <Input
                  type="password"
                  placeholder="New Password"
                  {...register("password")}
                  className={`${errors.password ? "!border-bright-red" : ""}`}
                />
                {errors.password && (
                  <p className="text-bright-red text-xs">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div className="space-y-1">
                <Input
                  type="password"
                  placeholder="Confirm Password"
                  {...register("confirmPassword")}
                  className={`${
                    errors.confirmPassword ? "!border-bright-red" : ""
                  }`}
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
                {mutation.isPending
                  ? "Password Reseting..."
                  : "Change Password"}
              </Button>
            </form>
          </DialogPanel>
        </div>
      </Dialog>
    </header>
  );
}
