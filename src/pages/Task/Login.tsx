

import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser } from "../../util/loginutils";

type LoginFormInputs = {
  email: string;
  password: string;
};

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const navigate = useNavigate();

  // const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
  //   console.log("Login Data:", data);
  //   // Perform login logic here (e.g., call backend API)
  //   navigate("/home");
  // };

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      const result = await loginUser(data);
      localStorage.setItem("token", result.token);
      toast.success("Logged in successfully!");
      console.log(localStorage.getItem("token"))
      navigate("/home");
    } catch (error) {
      console.error("Login error:", error);
      alert(
        error instanceof Error ? error.message : "Login failed, please try again later."
      );
    }
  };

  return (
    <div
    className="flex items-center justify-center min-h-screen bg-cover bg-center px-4"
    
  >
    <div className="w-full max-w-md bg-white bg-opacity-90 p-6 rounded-lg shadow-lg">
      <div className="font-bold text-2xl text-center mb-6">Login</div>
  
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            className="input input-bordered w-full"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <span className="text-red-500 text-sm mt-1">{errors.email.message}</span>
          )}
        </div>
  
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            className="input input-bordered w-full"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && (
            <span className="text-red-500 text-sm mt-1">{errors.password.message}</span>
          )}
        </div>
  
        <button type="submit" className="btn btn-primary w-full mt-2">
          Login
        </button>
      </form>
  
      <p className="text-center text-sm mt-6">
        New user?{" "}
        <Link to="/signup" className="text-blue-600 hover:underline">
          Signup
        </Link>
      </p>
    </div>
  </div>
  
  
  );
};

export default Login;
