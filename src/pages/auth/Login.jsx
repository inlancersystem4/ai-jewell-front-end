// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { useNavigate } from "react-router";
// import { toast } from "sonner";
// import { useMutation } from "@tanstack/react-query";
// import { setJwtToken, setJwtExpired, setUserID } from "@/redux/actions";
// import { useDispatch } from "react-redux";
// import { post } from "@/utils/axiosWrapper";

// const formSchema = z.object({
//   email: z
//     .string()
//     .email({ message: "Invalid email address." })
//     .nonempty({ message: "Email is required." }),
//   password: z.string().min(1, { message: "Password is required." }),
// });

export default function Login() {
  // const navigate = useNavigate();
  // const dispatch = useDispatch();

  // const form = useForm<FormSchemaType>({
  //   resolver: zodResolver(formSchema),
  // });

  // const signInFn = async (data: FormSchemaType): Promise<void> => {
  //   const formData = new FormData();
  //   formData.append("user_email", data.email);
  //   formData.append("user_password", data.password);

  //   try {
  //     const response = await post<Response>("sign-in", formData);
  //     if (response.success == 1) {
  //       dispatch(setJwtToken(response.data.session_token));
  //       dispatch(setJwtExpired(response.data.expire_time));
  //       dispatch(setUserID(response.data.user_id));
  //       toast.success(response.message);
  //       navigate("/");
  //     } else {
  //       toast.error(response.message);
  //     }
  //   } catch (e) {
  //     console.error(e);
  //     toast.error("An unexpected error occurred. Please try again.");
  //   }
  // };

  // const mutation = useMutation({
  //   mutationFn: (formData: FormSchemaType) => signInFn(formData),
  // });

  // function onSubmit(values: FormSchemaType) {
  //   mutation.mutate(values);
  // }

  return <div></div>;
}
