import React from "react";

const userProfile = ({ params }: any) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <p className="text-4xl">
        Profile page
        <span className=" ml-3 p-5 rounded-full text-black bg-orange-500">
          {params.id}
        </span>
      </p>
    </div>
  );
};

export default userProfile;
