import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: number;
  subtext: string;
  icon: LucideIcon;
  variant: "emerald" | "amber" | "red" | "blue";
}

const variants = {
  emerald: {
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    text: "text-emerald-700 dark:text-emerald-400",
    icon: "text-emerald-600 dark:text-emerald-400",
    subtext: "text-emerald-600/70 dark:text-emerald-400/70",
  },
  amber: {
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    text: "text-amber-700 dark:text-amber-400",
    icon: "text-amber-600 dark:text-amber-400",
    subtext: "text-amber-600/70 dark:text-amber-400/70",
  },
  red: {
    bg: "bg-red-500/10",
    border: "border-red-500/20",
    text: "text-red-700 dark:text-red-400",
    icon: "text-red-600 dark:text-red-400",
    subtext: "text-red-600/70 dark:text-red-400/70",
  },
  blue: {
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    text: "text-blue-700 dark:text-blue-400",
    icon: "text-blue-600 dark:text-blue-400",
    subtext: "text-blue-600/70 dark:text-blue-400/70",
  },
};

export function StatCard({ title, value, subtext, icon: Icon, variant }: StatCardProps) {
  const style = variants[variant];
  
  return (
    <div className={cn("p-6 rounded-xl border", style.bg, style.border)}>
      <div className={cn("flex items-center space-x-2 mb-4", style.icon)}>
        <Icon className="w-5 h-5" />
        <span className="text-sm font-semibold">{title}</span>
      </div>
      <div className={cn("text-3xl font-bold", style.text)}>{value}</div>
      <p className={cn("text-sm mt-1", style.subtext)}>{subtext}</p>
    </div>
  );
}
