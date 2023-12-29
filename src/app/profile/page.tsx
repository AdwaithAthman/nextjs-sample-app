"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const ProfilePage = () => {
  const router = useRouter();
  const [data, setData] = useState("nothing");
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout success");
      router.push("/login");
    } catch (error: any) {
      console.log("Logout failed: ", error.message);
      toast.error(error.message);
    }
  };

  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/users/me");
      setData(res.data.data._id);
    } catch (error: any) {
      console.log("User details failed: ", error.message);
      toast.error(error.message);
    }
  };
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div>ProfilePage</div>
      <h2 className="font-bold bg-orange-500 p-2 rounded-full border border-orange-700">
        {data === "nothing" ? (
          "Nothing"
        ) : (
          <Link href={`/profile/${data}`}>Go to profile</Link>
        )}
      </h2>
      <hr />
      <button
        className="mt-4 mx-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={logout}
      >
        Logout
      </button>
      <button
        className="mt-4 mx-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        onClick={getUserDetails}
      >
        Get User Details
      </button>
    </>
  );
};

export default ProfilePage;
