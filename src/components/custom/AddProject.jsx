import {
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogBackdrop,
  Button,
  Input,
} from "@headlessui/react";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { post } from "@/utils/axiosWrapper";
import { toast } from "sonner";
import { z } from "zod";
import { useLocation, useNavigate } from "react-router";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  setAddProject,
  setProjectRefetch,
  setRenameProjectData,
} from "@/redux/actions";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
});

export default function AppProject() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const projectOpener = useSelector((state) => state.p.addProjectOpen);
  const renameData = useSelector((state) => state.p.reNameProjectData);

  let [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: zodResolver(schema) });

  const projectAddFn = async (data) => {
    const formData = new FormData();
    formData.append(
      "project_id",
      renameData.project_id ? renameData.project_id : ""
    );
    formData.append("project_name", data.name);

    try {
      const response = await post("p/project-add-edit", formData);
      if (response.success == 1) {
        if (location.pathname !== "/p") {
          navigate(`/p/${response.data.project_id}`);
        }
        if (renameData.project_id) {
          dispatch(setRenameProjectData(""));
        }
        dispatch(setProjectRefetch(true));
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    } catch (e) {
      console.error(e);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      onClose();
    }
  };

  const mutation = useMutation({
    mutationFn: (formData) => projectAddFn(formData),
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  const onClose = () => {
    dispatch(setAddProject(false));
    reset({
      name: "",
    });
  };

  useEffect(() => {
    if (projectOpener) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [projectOpener]);

  useEffect(() => {
    if (renameData.project_title) {
      reset({
        name: renameData.project_title,
      });
    }
  }, [renameData, reset]);

  return (
    <>
      <Dialog open={isOpen} onClose={onClose} className="relative z-50">
        <DialogBackdrop className="fixed inset-0 bg-[#A4A3A366]" />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="fixed inset-0 flex w-screen items-center justify-center p-4"
        >
          <DialogPanel className="max-w-lg  w-full bg-white py-4 px-5 rounded-lg">
            <div className="flex items-center justify-between w-full border-b border-[#F3F4F6] pb-4">
              <DialogTitle className="font-medium text-sm text-onyx-black">
                {renameData.project_title
                  ? `Rename ${renameData.project_title}`
                  : "Create a new project"}
              </DialogTitle>
              <Button type="button" onClick={onClose}>
                <X size={18} />
              </Button>
            </div>
            <div className="py-6">
              <div className="space-y-1.5">
                <label
                  htmlFor="projectName"
                  className="block w-full text-sm font-medium text-gunmetal-gray"
                >
                  Project name
                </label>
                <Input
                  id="projectName"
                  type="text"
                  placeholder="Enter your project name"
                  {...register("name")}
                  className={`border border-light-gray w-full py-2.5 px-4 rounded-lg text-base ${
                    errors.name ? "!border-bright-red" : ""
                  }`}
                />
                {errors.name && (
                  <p className="text-bright-red text-xs">
                    {errors.name.message}
                  </p>
                )}
              </div>
            </div>
            <div className="border-t border-[#F3F4F6] pt-4 flex items-center justify-end gap-4">
              <button
                type="button"
                className="px-3 py-2 rounded-md text-center bg-misty-gray font-medium text-xs text-[#808183] disabled:opacity-40"
                onClick={onClose}
                disabled={mutation.isPending}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-3 py-2 rounded-md text-center bg-warm-gray font-medium text-xs text-white disabled:opacity-40"
                disabled={mutation.isPending}
              >
                {mutation.isPending
                  ? "Creating..."
                  : renameData.project_title
                  ? "Save Project"
                  : "Crete Project"}
              </button>
            </div>
          </DialogPanel>
        </form>
      </Dialog>
    </>
  );
}
