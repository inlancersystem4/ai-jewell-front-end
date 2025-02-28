import { Link } from "react-router";

export default function SignUp() {
  return (
    <div className="form-card">
      <div className="space-y-2">
        <h1>Create a new account</h1>
      </div>
      <form className="space-y-6">
        <div className="space-y-1">
          <input type="text" placeholder="Name" />
        </div>
        <div className="space-y-1">
          <input type="email" placeholder="Email" />
        </div>
        <div className="space-y-1">
          <input type="Password" placeholder="Password" />
        </div>
        <button className="form-btn">Create account</button>
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
