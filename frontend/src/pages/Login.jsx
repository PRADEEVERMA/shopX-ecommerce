import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // LOGIN FUNCTION
  const handleLogin = async (e) => {
    e.preventDefault();

    console.log("Login submit:", { email, password: Boolean(password) });

    try {
      const response = await API.post("/auth/login", {
        email,
        password,
      });

      console.log("Login response:", response.data);

      if (response.data?.token) {
        localStorage.setItem("token", response.data.token);
        alert("Login successful");
        navigate("/");
      } else {
        alert("Login failed: No token returned from server");
      }
    } catch (error) {
      console.error("Login error:", error);
      const serverMessage =
        error.response?.data?.message || error.message || "Login failed";
      alert(serverMessage);
    }
  };

  return (
    <section className="mx-auto max-w-2xl rounded-[2.5rem] bg-white p-8 shadow-soft sm:p-10">
      {/* HEADING */}
      <div className="space-y-3 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-orange-600">
          Welcome back
        </p>

        <h1 className="text-4xl font-black text-slate-950">
          Login to your account
        </h1>

        <p className="mx-auto max-w-xl text-sm text-slate-500">
          Access your orders, wishlist, and saved carts with a secure login.
        </p>
      </div>

      {/* FORM */}
      <form onSubmit={handleLogin} className="mt-10 space-y-6">
        {/* EMAIL */}
        <label className="block text-sm font-semibold text-slate-700">
          Email address
          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-3 w-full rounded-[1.5rem] border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
            required
          />
        </label>

        {/* PASSWORD */}
        <label className="block text-sm font-semibold text-slate-700">
          Password
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-3 w-full rounded-[1.5rem] border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
            required
          />
        </label>

        {/* BUTTON */}
        <button
          type="submit"
          className="w-full rounded-[1.75rem] bg-slate-950 px-6 py-4 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Sign In
        </button>
      </form>

      {/* REGISTER LINK */}
      <p className="mt-6 text-center text-sm text-slate-500">
        Don’t have an account?{" "}
        <Link
          to="/register"
          className="font-semibold text-orange-600 hover:text-orange-500"
        >
          Create one
        </Link>
      </p>
    </section>
  );
};

export default Login;
