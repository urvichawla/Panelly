"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserRole } from "@/hooks/useUserRole";
import LoaderUI from "./LoaderUI";

export default function RoleRedirect() {
  const { isLoading, isInterviewer, isCandidate } = useUserRole();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      // If the user doesn't have a role yet (both are false)
      if (!isInterviewer && !isCandidate) {
        router.push("/role-selection");
      }
    }
  }, [isLoading, isInterviewer, isCandidate, router]);

  if (isLoading) return <LoaderUI />;
  
  // If they have a role, return null (no UI needed)
  return null;
} 