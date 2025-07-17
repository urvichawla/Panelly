"use client"
import { SignedIn, SignedOut } from "@clerk/nextjs";
import LandingPage from "@/components/LandingPage";
import RoleRedirect from "@/components/RoleRedirect";
import ActionCard from "@/components/ActionCard";
import { QUICK_ACTIONS } from "@/constants";
import { useUserRole } from "@/hooks/useUserRole";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useState } from "react";
import { useRouter } from "next/navigation";
import MeetingModal from "@/components/MeetingModal";
import { Loader, Loader2Icon } from "lucide-react";
import MeetingCard from "@/components/MeetingCard";
import { HoverEffect, Card, CardTitle, CardDescription } from "@/components/HoverEffect";
import { AnimatePresence, motion } from "framer-motion";
import { SignInButton } from "@clerk/clerk-react";

export default function Home() {
  // Authenticated user experience
  const router = useRouter();
  const {isInterviewer,isCandidate,isLoading}= useUserRole();
  const interviews = useQuery(api.interviews.getMyinterview);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<"start" | "join">();

  const handleQuickAction=(title: string)=>{
    switch (title) {
      case "New Call":
        setModalType("start");
        setShowModal(true);
        break;
      case "Join Interview":
        setModalType("join");
        setShowModal(true);
        break;
      default:
        router.push(`/${title.toLowerCase()}`);
    }
  };

  return (
    <>
      <SignedOut>
        <LandingPage />
      </SignedOut>
      <SignedIn>
      <RoleRedirect />
      <div className="container max-w-7xl mx-auto p-6" >
         <div className="rounded-lg bg-card p-6 border shadow-sm mb-10">
          <h1 className="text-4xl font-bold">
            Welcome back!
          </h1>
          <p className="text-muted-foreground mt-2">
            {isInterviewer
              ? "Manage your interviews and review candidates effectively"
              : "Access your upcoming interviews and preparations"}
          </p>
        </div>
        {isInterviewer ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {QUICK_ACTIONS.map((action, idx) => (
                <motion.div
                  key={action.title}
                  className="relative group p-2 h-full w-full"
                  whileHover={{ scale: 1.02 }}
                >
                  <span className="absolute inset-[-8px] h-[calc(100%+16px)] w-[calc(100%+16px)] bg-neutral-200 dark:bg-slate-800/80 block rounded-[2rem] z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-150 shadow-lg" />
                  <div className="relative z-10">
                    <ActionCard
                      action={action}
                      onClick={() => handleQuickAction(action.title)}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          <MeetingModal
              isOpen={showModal}
              onClose={() => setShowModal(false)}
              title={modalType === "join" ? "Join Meeting" : "Start Meeting"}
              isJoinMeeting={modalType === "join"}
            />
          </>
        ) : (
          <>
            <div>
              <h1 className="text-3xl font-bold">Your Interviews</h1>
              <p className="text-muted-foreground mt-1">Manage your scheduled interviews with ease</p>
             
            </div>
            <div className="mt-8">
              {interviews === undefined ? (
                <div className="flex justify-center py-12">
                  <Loader2Icon className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              ) : interviews.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {interviews.map((interview, idx) => (
                    <motion.div
                      key={interview._id}
                      className="relative group p-2 h-full w-full"
                      whileHover={{ scale: 1.02 }}
                    >
                      <span className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/80 block rounded-3xl z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-150" />
                      <div className="relative z-10">
                        <MeetingCard interview={interview} />
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  You have no scheduled interviews at the moment
                </div>
              )}
            </div>
          </>
        )}
      </div>
      </SignedIn>
    </>
  );
}
