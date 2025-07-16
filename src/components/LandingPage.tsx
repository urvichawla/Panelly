'use client';
import React from "react";
import { Button } from "./ui/button";
import { CalendarIcon, UsersIcon, StarIcon, MessageSquareIcon, ClockIcon, CheckCircle2Icon } from "lucide-react";
import { ModeToggle } from "./ModeToggle";

// Add Tailwind keyframes and animation classes in your global CSS if not already present
// .animate-fadeIn { animation: fadeIn 1s ease-out both; }
// .animate-slideUp { animation: slideUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) both; }
// @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
// @keyframes slideUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-black px-4 py-10 relative">
      {/* Mode Toggle in top-right */}
      <div className="absolute top-6 right-6 z-10">
        <ModeToggle />
      </div>
      <div className="max-w-2xl w-full text-center mb-12">
        <h1 className="text-5xl font-bold mb-6 text-black dark:text-white drop-shadow-lg animate-fadeIn" style={{ animationDelay: '0.1s' }}>
          Welcome to Panelly
        </h1>
        <p className="text-lg text-gray-800 dark:text-gray-300 mb-10 animate-fadeIn" style={{ animationDelay: '0.3s' }}>
          Practice interviews, get feedback, and grow your career. Whether you're a candidate or an interviewer, start your journey with us!
        </p>
        <div className="flex flex-col gap-6 items-center justify-center animate-fadeIn" style={{ animationDelay: '0.5s' }}>
          <Button
            asChild
            size="lg"
            className="w-full max-w-xs bg-white text-black border border-neutral-300 hover:bg-neutral-100 hover:text-black focus:ring-2 focus:ring-emerald-500 text-lg px-8 py-4 shadow"
          >
            <a
              href="https://epic-labrador-9.accounts.dev/sign-in?redirect_url=https%3A%2F%2Fpanelly.vercel.app%2Frole-selection"
              rel="noopener noreferrer"
            >
              Start Your Journey
            </a>
          </Button>
        </div>
      </div>

      {/* Feature Cards Section */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Interviewer Features */}
        <div className="bg-neutral-50 dark:bg-neutral-900 rounded-2xl shadow-lg p-8 flex flex-col items-center border border-neutral-200 dark:border-neutral-800 animate-slideUp" style={{ animationDelay: '0.7s' }}>
          <h2 className="text-2xl font-bold text-black dark:text-white mb-4 flex items-center gap-2 animate-fadeIn" style={{ animationDelay: '0.8s' }}>
            <UsersIcon className="h-6 w-6 text-emerald-400" /> For Interviewers
          </h2>
          <div className="grid gap-4 w-full">
            <FeatureCard
              icon={<CalendarIcon className="h-6 w-6 text-emerald-400" />}
              title="Schedule Meetings"
              description="Easily schedule interviews with candidates at your convenience."
              delay={0.9}
            />
            <FeatureCard
              icon={<ClockIcon className="h-6 w-6 text-emerald-400" />}
              title="Create Instant Meetings"
              description="Start meetings instantly and manage your interview sessions."
              delay={1.0}
            />
            <FeatureCard
              icon={<StarIcon className="h-6 w-6 text-emerald-400" />}
              title="Add Reviews & Feedback"
              description="Provide valuable feedback and rate candidates after each interview."
              delay={1.1}
            />
            <FeatureCard
              icon={<CheckCircle2Icon className="h-6 w-6 text-emerald-400" />}
              title="Mark Results"
              description="Mark candidates as passed or failed and track interview outcomes."
              delay={1.2}
            />
          </div>
        </div>
        {/* Candidate Features */}
        <div className="bg-neutral-50 dark:bg-neutral-900 rounded-2xl shadow-lg p-8 flex flex-col items-center border border-neutral-200 dark:border-neutral-800 animate-slideUp" style={{ animationDelay: '1.0s' }}>
          <h2 className="text-2xl font-bold text-black dark:text-white mb-4 flex items-center gap-2 animate-fadeIn" style={{ animationDelay: '1.1s' }}>
            <UsersIcon className="h-6 w-6 text-emerald-400" /> For Candidates
          </h2>
          <div className="grid gap-4 w-full">
            <FeatureCard
              icon={<CalendarIcon className="h-6 w-6 text-emerald-400" />}
              title="Book Interviews"
              description="Book mock interviews with experienced interviewers."
              delay={1.2}
            />
            <FeatureCard
              icon={<MessageSquareIcon className="h-6 w-6 text-emerald-400" />}
              title="Receive Feedback"
              description="Get detailed feedback and ratings to help you improve."
              delay={1.3}
            />
            <FeatureCard
              icon={<StarIcon className="h-6 w-6 text-emerald-400" />}
              title="Track Progress"
              description="See your interview history and monitor your growth."
              delay={1.4}
            />
            <FeatureCard
              icon={<CheckCircle2Icon className="h-6 w-6 text-emerald-400" />}
              title="Achieve Success"
              description="Prepare, practice, and succeed in your real interviews."
              delay={1.5}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description, delay = 0 }: { icon: React.ReactNode; title: string; description: string; delay?: number }) {
  return (
    <div
      className="flex items-start gap-4 bg-white dark:bg-neutral-800 rounded-xl p-4 border border-neutral-100 dark:border-neutral-700 shadow-sm animate-slideUp"
      style={{ animationDelay: `${delay}s` }}
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