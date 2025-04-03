"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      router.push("/dashboard");
    }
    setLoading(false);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p>{loading ? "Se încarcă..." : "Redirecționare..."}</p>
    </div>
  );
}
