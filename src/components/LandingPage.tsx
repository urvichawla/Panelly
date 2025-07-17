'use client';
import React from "react";
import { Button } from "./ui/button";
import { CalendarIcon, UsersIcon, StarIcon, MessageSquareIcon, ClockIcon, CheckCircle2Icon } from "lucide-react";
import { ModeToggle } from "./ModeToggle";
import { HeroGeometric } from "./HeroGeometric";
import { BackgroundGradient } from "./BackgroundGradient";
import { ButtonColorful } from "./ButtonColorful";
import { SignInButton } from "@clerk/clerk-react";

// Add Tailwind keyframes and animation classes in your global CSS if not already present
// .animate-fadeIn { animation: fadeIn 1s ease-out both; }
// .animate-slideUp { animation: slideUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) both; }
// @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
// @keyframes slideUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }

export default function LandingPage() {
  return (
    <HeroGeometric
   
      title1=" Welcome to Panelly"
      
    >
      <div className="flex flex-col gap-6 items-center justify-center">
        <SignInButton mode="modal" forceRedirectUrl="/role-selection">
          <ButtonColorful
            label="Get Started"
            className="text-lg px-8 py-4"
          />
        </SignInButton>
      </div>
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-16 mt-12 items-stretch">
        {/* Interviewer Features */}
        <BackgroundGradient className="rounded-2xl shadow-lg animate-slideUp h-full">
          <div className="bg-neutral-50 dark:bg-neutral-900 rounded-2xl p-8 flex flex-col items-center border border-neutral-200 dark:border-neutral-800 h-full">
            <h2 className="text-2xl font-bold text-black dark:text-white mb-4 flex items-center gap-2 animate-fadeIn">
              <UsersIcon className="h-6 w-6 text-emerald-400" /> For Interviewers
            </h2>
            <div className="grid gap-4 w-full">
              <FeatureCard
                icon={<CalendarIcon className="h-6 w-6 text-emerald-400" />}
                title="Schedule Meetings"
                description="Easily schedule interviews with candidates at your convenience. Manage all your sessions in one place."
              />
              <FeatureCard
                icon={<ClockIcon className="h-6 w-6 text-emerald-400" />}
                title="Create Instant Meetings"
                description="Start meetings instantly and manage your interview sessions with ease."
              />
              <FeatureCard
                icon={<StarIcon className="h-6 w-6 text-emerald-400" />}
                title="Add Reviews & Feedback"
                description="Provide valuable feedback and rate candidates after each interview session."
              />
              <FeatureCard
                icon={<CheckCircle2Icon className="h-6 w-6 text-emerald-400" />}
                title="Mark Results"
                description="Mark candidates as passed or failed and track interview outcomes."
              />
            </div>
          </div>
        </BackgroundGradient>
        {/* Candidate Features */}
        <BackgroundGradient className="rounded-2xl shadow-lg animate-slideUp h-full">
          <div className="bg-neutral-50 dark:bg-neutral-900 rounded-2xl p-8 flex flex-col items-center border border-neutral-200 dark:border-neutral-800 h-full">
            <h2 className="text-2xl font-bold text-black dark:text-white mb-4 flex items-center gap-2 animate-fadeIn">
              <UsersIcon className="h-6 w-6 text-emerald-400" /> For Candidates
            </h2>
            <div className="grid gap-4 w-full">
              <FeatureCard
                icon={<CalendarIcon className="h-6 w-6 text-emerald-400" />}
                title="Code in Real-Time"
                description="Practice coding live in our built-in code editor during your remote interviews. Collaborate and solve problems together."
              />
              <FeatureCard
                icon={<MessageSquareIcon className="h-6 w-6 text-emerald-400" />}
                title="Receive Feedback"
                description="Get detailed feedback and ratings to help you improve after every session."
              />
              <FeatureCard
                icon={<StarIcon className="h-6 w-6 text-emerald-400" />}
                title="Track Progress"
                description="See your interview history and monitor your growth over time with detailed analytics."
              />
              <FeatureCard
                icon={<CheckCircle2Icon className="h-6 w-6 text-emerald-400" />}
                title="Achieve Success"
                description="Prepare, practice, and succeed in your real interviews with confidence."
              />
            </div>
          </div>
        </BackgroundGradient>
      </div>
    </HeroGeometric>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div
      className="flex items-start gap-4 bg-white dark:bg-neutral-800 rounded-xl p-4 border border-neutral-100 dark:border-neutral-700 shadow-sm animate-slideUp"
    >
      <div className="flex-shrink-0">
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-semibold text-black dark:text-white mb-1">{title}</h3>
        <p className="text-gray-800 dark:text-gray-300 text-sm">{description}</p>
      </div>
    </div>
  );
} 