"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useUserRole } from "@/hooks/useUserRole";
import LoaderUI from "@/components/LoaderUI";

export default function RoleSelectionPage() {
  const [selectedRole, setSelectedRole] = useState<"candidate" | "interviewer">("candidate");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { user } = useUser();
  const { isLoading } = useUserRole();
  const updateUserRole = useMutation(api.users.updateUserRole);

  // If user role data is still loading, show loader
  if (isLoading) return <LoaderUI />;

  const handleSubmit = async () => {
    if (!user?.id) return;
    
    setIsSubmitting(true);
    
    try {
      await updateUserRole({
        clerkId: user.id,
        role: selectedRole
      });
      
      // Redirect to home page after selection
      router.push("/");
    } catch (error) {
      console.error("Error updating role:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Select Your Role</CardTitle>
          <CardDescription>
            Choose your role in the application to continue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={selectedRole}
            onValueChange={(value: string) => setSelectedRole(value as "candidate" | "interviewer")}
            className="space-y-4"
          >
            <div className="flex items-start space-x-3 border p-4 rounded-md">
              <RadioGroupItem value="candidate" id="candidate" />
              <div className="grid gap-1">
                <Label htmlFor="candidate" className="font-medium">Candidate</Label>
                <p className="text-sm text-muted-foreground">
                  You are looking for interview practice and feedback
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3 border p-4 rounded-md">
              <RadioGroupItem value="interviewer" id="interviewer" />
              <div className="grid gap-1">
                <Label htmlFor="interviewer" className="font-medium">Interviewer</Label>
                <p className="text-sm text-muted-foreground">
                  You want to conduct interviews and provide feedback
                </p>
              </div>
            </div>
          </RadioGroup>
        </CardContent>
        <CardFooter>
          <Button 
            onClick={handleSubmit} 
            className="w-full" 
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Continue"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
} 