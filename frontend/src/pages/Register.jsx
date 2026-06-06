import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    console.log("Register submit:", {
      name,
      email,
      password: Boolean(password),
    });

    try {
      const response = await API.post("/auth/register", {
        name,
        email,
        password,
      });

      console.log("Register response:", response.data);

      if (response.data?.token) {
        localStorage.setItem("token", response.data.token);
        alert("Account created successfully");
        navigate("/");
      } else {
        alert("Registration failed: No token returned from server");
      }
    } catch (error) {
      console.error("Register error:", error);
      const serverMessage =
        error.response?.data?.message || error.message || "Registration failed";
      alert(serverMessage);
    }
  };

  return (
    <section className="mx-auto max-w-2xl rounded-[2.5rem] bg-white p-8 shadow-soft sm:p-10">
      <div className="space-y-3 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-orange-600">
          Create account
        </p>
        <h1 className="text-4xl font-black text-slate-950">
          Register at ShopX
        </h1>
        <p className="max-w-xl mx-auto text-sm text-slate-500">
          Join now to save favorites, manage your cart, and checkout faster than
          ever.
        </p>
      </div>

      <form onSubmit={handleRegister} className="mt-10 grid gap-6">
        <label className="block text-sm font-semibold text-slate-700">
          Full name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your full name"
            className="mt-3 w-full rounded-[1.5rem] border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
            required
          />
        </label>
        <label className="block text-sm font-semibold text-slate-700">
          Email address
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="mt-3 w-full rounded-[1.5rem] border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
            required
          />
        </label>
        <label className="block text-sm font-semibold text-slate-700">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create a password"
            className="mt-3 w-full rounded-[1.5rem] border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
            required
          />
        </label>

        <button className="w-full rounded-[1.75rem] bg-slate-950 px-6 py-4 text-sm font-semibold text-white transition hover:bg-slate-800">
          Create account
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-500">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-semibold text-orange-600 hover:text-orange-500"
        >
          Sign in
        </Link>
      </p>
    </section>
  );
};

export default Register;
