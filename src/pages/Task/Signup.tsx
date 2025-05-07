



import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-toastify";
import { signupUser } from "../../util/signuputils";
import { Link, useNavigate } from "react-router-dom";

type SignUpFormInputs = {
  fullName: string;
  email: string;
  password: string;
  confirmpassword: string;
};

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    // watch,
  } = useForm<SignUpFormInputs>();

  const navigate = useNavigate();
  const [passwordMismatch, setPasswordMismatch] = useState(false);

  const onSubmit: SubmitHandler<SignUpFormInputs> = async (data) => {
    if (data.password !== data.confirmpassword) {
      setPasswordMismatch(true);
      return;
    }

    setPasswordMismatch(false);

    try {
      const response = await signupUser(data);
      console.log("Signup success:", response.message);
      toast.success("User signed up successfully!");
      navigate("/login");
    } catch (error) {
      console.error("Signup error:", error);
      toast.error(error instanceof Error ? error.message : "Signup failed. Try again.");
    }
  };

  return (
<>
  <div className="min-h-screen flex items-center justify-center px-4">
    <div className="w-full max-w-md bg-white p-6 rounded-lg shadow">
      <div className="font-bold text-2xl text-center mb-6">Sign-Up</div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Full Name</span>
          </label>
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="Enter your full name"
            {...register("fullName", { required: "Full name is required" })}
          />
          {errors.fullName && (
            <span className="text-red-500 text-sm">{errors.fullName.message}</span>
          )}
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            className="input input-bordered w-full"
            placeholder="Enter your email"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            className="input input-bordered w-full"
            placeholder="Enter your password"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && (
            <span className="text-red-500 text-sm">{errors.password.message}</span>
          )}
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Re-enter Password</span>
          </label>
          <input
            type="password"
            className="input input-bordered w-full"
            placeholder="Re-enter your password"
            {...register("confirmpassword", {
              required: "Please confirm your password",
            })}
          />
          {errors.confirmpassword && (
            <span className="text-red-500 text-sm">
              {errors.confirmpassword.message}
            </span>
          )}
          {passwordMismatch && (
            <span className="text-red-500 text-sm">Passwords do not match</span>
          )}
        </div>

        <button type="submit" className="btn btn-primary w-full">
          Submit
        </button>
      </form>

      <p className="text-center text-sm mt-4">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-600 hover:underline">
          Login
        </Link>
      </p>
    </div>
  </div>
</>

  );
};

export default Signup;
