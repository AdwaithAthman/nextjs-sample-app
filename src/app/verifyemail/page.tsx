"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState, useEffect } from "react";

export default function VerifyEmailPage() {
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    const verifyUserEmail = async () => {
        try{
            await axios.post(`/api/users/verifyemail`, {token});
            setVerified(true);
        }
        catch(error: any){
            setError(true);
            console.log("Verify email failed: ", error.response.data);
        }
    }

    useEffect(() => {
        const urlToken = window.location.search.split('=')[1];
        setToken(urlToken || "");
    }, [])

    useEffect(() => {
        if(token.length > 0){
            verifyUserEmail();
        }
    }, [token])

    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl">Verify Email</h1>
            <h2 className="text-red-500 py-2 mt-2">{token ? `${token}` : "no token"}</h2>
            {verified && (
            <div>
                <p className="text-green-500">Email verified</p>
                <Link href="/login" className="text-blue-500">Login</Link>
            </div>
        )}
        {error && (
            <div>
                <p className="text-red-500">Email not verified</p>
            </div>
        )}
        </div>
    )
}