"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const Signup = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup success: ", response.data);
      router.push("/login");
    } catch (error: any) {
      console.log("Signup failed: ", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-center text-white text-2xl mb-5">
          {!loading ? "Signup" : "Processing"}
        </h1>
        <hr />
        <label htmlFor="username">username</label>
        <input
          id="username"
          type="text"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder="username"
          className="p-2 mb-5 border border-gray-300 rounded-md text-black"
        />
        <label htmlFor="email">email</label>
        <input
          type="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="email"
          className="p-2 mb-5 border border-gray-300 rounded-md text-black"
        />
        <label htmlFor="password">password</label>
        <input
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="password"
          className="p-2 mb-5 border border-gray-300 rounded-md text-black"
        />
        <button
          onClick={onSignup}
          disabled={buttonDisabled}
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        >
          Signup here
        </button>
        <Link href="/login">Visit Login page</Link>
      </div>
    </>
  );
};

export default Signup;
