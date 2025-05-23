"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface AuthGuardProps {
  children: React.ReactNode;
}

interface ValidateResponse {
  ok: boolean;
  mensaje: string;
  usuario?: any;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("myToken");

      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/usuario/validate`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data: ValidateResponse = await response.json();

        if (!data.ok) {
          throw new Error(data.mensaje);
        }

        setLoading(false);
      } catch (err) {
        localStorage.removeItem("myToken");
        router.push("/login");
      }
    };

    checkAuth();
  }, []);

  if (loading) return null;

  return <>{children}</>;
}
