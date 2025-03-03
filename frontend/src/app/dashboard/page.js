"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) {
        router.push("/login");
      } else {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Error parsing user data:", error);
      router.push("/login");
    }
  }, []); 

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      {user ? (
        <div className="mt-4 text-center">
          <img src={user.profilePic} alt="Profile" className="w-20 h-20 rounded-full" />
          <p className="text-lg">Name: {user.name}</p>
          <p className="text-lg">Email: {user.email}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}

      <button
        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg"
        onClick={() => router.push("/call")}
      >
        Go to Call Page
      </button>
      
      
      <button
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg"
        onClick={() => {
          localStorage.removeItem("user");
          router.push("/login");
        }}
      >
        Logout
      </button>
    </div>
  );
}

