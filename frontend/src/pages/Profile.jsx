import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import API from "../api";

const Profile = () => {
  const { user, setUser } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setName(user?.name || "");
    setEmail(user?.email || "");
  }, [user]);

  const handleUpdate = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const { data } = await API.put("/auth/profile", {
        name,
        email,
        password,
      });
      setUser(data);
      setPassword("");
      setMessage("Profile updated successfully.");
    } catch (error) {
      setMessage(error.response?.data?.message || "Unable to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="space-y-8 pt-10">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-600">
            Profile
          </p>
          <h1 className="mt-2 text-4xl font-black text-slate-950">
            Your account
          </h1>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.5fr_0.9fr]">
        <form
          onSubmit={handleUpdate}
          className="rounded-[2rem] bg-white p-8 shadow-soft"
        >
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700">
                Full name
              </label>
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="mt-3 w-full rounded-[1.5rem] border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700">
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="mt-3 w-full rounded-[1.5rem] border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter new password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="mt-3 w-full rounded-[1.5rem] border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-8 w-full rounded-[1.75rem] bg-slate-950 px-6 py-4 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Updating..." : "Update profile"}
          </button>

          {message && <p className="mt-4 text-sm text-slate-500">{message}</p>}
        </form>

        <div className="rounded-[2rem] bg-white p-8 shadow-soft">
          <p className="text-sm uppercase tracking-[0.3em] text-orange-600">
            Account details
          </p>
          <div className="mt-6 space-y-3 text-sm text-slate-600">
            <p>
              <span className="font-semibold text-slate-950">Name:</span>{" "}
              {user?.name}
            </p>
            <p>
              <span className="font-semibold text-slate-950">Email:</span>{" "}
              {user?.email}
            </p>
            <p>
              <span className="font-semibold text-slate-950">Role:</span>{" "}
              {user?.isAdmin ? "Admin" : "Customer"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
