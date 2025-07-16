
"use client"

import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Doc, Id } from "../../../../convex/_generated/dataModel";
import toast from "react-hot-toast";
import LoaderUI from "@/components/LoaderUI";
import { getCandidateInfo, groupInterviews } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { INTERVIEW_CATEGORY } from "@/constants";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarIcon, CheckCircle2Icon, ClockIcon, XCircleIcon } from "lucide-react";
import { format } from "date-fns";
import CommentDialog from "@/components/CommentDialog";
import { useUserRole } from "@/hooks/useUserRole";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ButtonColorful } from "@/components/ButtonColorful";

type Interview = Doc<"interviews">;
function DashboardPage() {
  const users=useQuery(api.users.getUsers);
  const interviews=useQuery(api.interviews.getAllInterviews);
  const updateStatus=useMutation(api.interviews.updateInterviewStatus);
  const { isInterviewer, isCandidate, isLoading } = useUserRole();
  const { user } = useUser();
  const handleStatusUpdate = async (interviewId: Id<"interviews">, status: string) => {
    try {
      await updateStatus({ id: interviewId, status });
      toast.success(`Interview marked as ${status}`);
    } catch (error) {
      toast.error("Failed to update status");
    }
  };
  if (!interviews || !users || isLoading) return <LoaderUI />;

  // Filter interviews for candidates and interviewers
  let filteredInterviews = interviews;
  if (isCandidate && user?.id) {
    filteredInterviews = interviews.filter((interview: Interview) => interview.candidateId === user.id);
  } else if (isInterviewer && user?.id) {
    filteredInterviews = interviews.filter((interview: Interview) => interview.interviewerIds.includes(user.id));
  }

  const groupedInterviews = groupInterviews(filteredInterviews);

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center mb-8">
        {isInterviewer && (
          <Link href="/schedule">
            <Button>Schedule New Interview</Button>
          </Link>
        )}
      </div>

      <div className="space-y-8">
        {INTERVIEW_CATEGORY.map(
          (category) =>
            groupedInterviews[category.id]?.length > 0 && (
              <section key={category.id}>
                {/* CATEGORY TITLE */}
                <div className="flex items-center gap-2 mb-4">
                  <h2 className="text-xl font-semibold">{category.title}</h2>
                  <Badge variant={category.variant}>{groupedInterviews[category.id].length}</Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {groupedInterviews[category.id].map((interview: Interview, idx: number) => {
                    const candidateInfo = getCandidateInfo(users, interview.candidateId);
                    const startTime = new Date(interview.startTime);

                    return (
                      <motion.div
                        key={interview._id}
                        className="relative group p-2 h-full w-full"
                        whileHover={{ scale: 1.02 }}
                      >
                        <span className="absolute inset-[-8px] h-[calc(100%+16px)] w-[calc(100%+16px)] bg-neutral-200 dark:bg-slate-800/80 block rounded-[2rem] z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-150 shadow-lg" />
                        <div className="relative z-10">
                          {/* CANDIDATE INFO */}
                          <Card className="hover:shadow-md transition-all">
                            <CardHeader className="p-4">
                              <div className="flex items-center gap-3">
                                <Avatar className="h-10 w-10">
                                  <AvatarImage src={candidateInfo.image} />
                                  <AvatarFallback>{candidateInfo.initials}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <CardTitle className="text-base">{candidateInfo.name}</CardTitle>
                                  <p className="text-sm text-muted-foreground">{interview.title}</p>
                                </div>
                              </div>
                            </CardHeader>

                            {/* DATE &  TIME */}
                            <CardContent className="p-4">
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <CalendarIcon className="h-4 w-4" />
                                  {format(startTime, "MMM dd")}
                                </div>
                                <div className="flex items-center gap-1">
                                  <ClockIcon className="h-4 w-4" />
                                  {format(startTime, "hh:mm a")}
                                </div>
                              </div>
                            </CardContent>

                            {/* PASS & FAIL BUTTONS */}
                            <CardFooter className="p-4 pt-0 flex flex-col gap-3">
                              {isInterviewer && interview.status === "completed" && (
                                <div className="flex gap-2 w-full">
                                  <ButtonColorful
                                    className="flex-1"
                                    label="Pass"
                                    onClick={() => handleStatusUpdate(interview._id, "succeeded")}
                                    showArrow={false}
                                  >
                                    <CheckCircle2Icon className="h-4 w-4 mr-2" />
                                    Pass
                                  </ButtonColorful>
                                  <ButtonColorful
                                    className="flex-1 bg-gradient-to-r from-red-500 via-pink-500 to-yellow-500"
                                    label="Fail"
                                    onClick={() => handleStatusUpdate(interview._id, "failed")}
                                    showArrow={false}
                                  >
                                    <XCircleIcon className="h-4 w-4 mr-2" />
                                    Fail
                                  </ButtonColorful>
                                </div>
                              )}
                              {isCandidate && ["succeeded", "failed"].includes(interview.status) && (
                                <div className="flex gap-2 w-full">
                                  {interview.status === "succeeded" ? (
                                    <ButtonColorful
                                      className="flex-1 bg-gradient-to-r from-emerald-400 via-green-500 to-lime-400"
                                      label="Succeeded"
                                      disabled
                                      showArrow={false}
                                    />
                                  ) : (
                                    <ButtonColorful
                                      className="flex-1 bg-gradient-to-r from-red-500 via-pink-500 to-yellow-500"
                                      label="Failed"
                                      disabled
                                      showArrow={false}
                                    />
                                  )}
                                </div>
                              )}
                              {isInterviewer && <CommentDialog interviewId={interview._id} />}
                              {isCandidate && <CommentDialog interviewId={interview._id} readOnly />}
                            </CardFooter>
                          </Card>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </section>
            )
        )}
      </div>
    </div>
  )
}

export default DashboardPage
