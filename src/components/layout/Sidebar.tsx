import { useState } from "react";
import {
  BookOpen,
  Crown,
  Bell,
  Award,
  Settings,
  LogOut,
  Languages,
  ChevronDown,
  ChevronRight,
  FileText,
  Brain,
  Lightbulb,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { QuickStats } from "./QuickStats";

interface SidebarProps {
  onClose?: () => void;
}

export function Sidebar({ onClose }: SidebarProps) {
  const [studyHistoryOpen, setStudyHistoryOpen] = useState(true);

  const navigationSections = [
    {
      title: "Study History",
      icon: BookOpen,
      isExpandable: true,
      isOpen: studyHistoryOpen,
      onToggle: () => setStudyHistoryOpen(!studyHistoryOpen),
      children: [
        { title: "Drafts", icon: FileText, count: 3 },
        { title: "Simulated Exams", icon: Brain, count: 5 },
        { title: "Flashcards", icon: Lightbulb, count: 12 },
        { title: "Mind Maps", icon: BookOpen, count: 2 },
      ],
    },
    {
      title: "Subscription",
      icon: Crown,
      badge: "Premium",
    },
    {
      title: "Notifications",
      icon: Bell,
      count: 4,
    },
    {
      title: "Achievements",
      icon: Award,
      count: 8,
    },
  ];

  const bottomSections = [
    {
      title: "Settings",
      icon: Settings,
    },
    {
      title: "Language",
      icon: Languages,
      subtitle: "English",
    },
    {
      title: "Logout",
      icon: LogOut,
      variant: "destructive" as const,
    },
  ];

  return (
    <div className="h-full bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-burnt-500 to-terracotta-600 rounded-lg flex items-center justify-center">
              <Brain className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-sidebar-foreground">
              StudyAI
            </h1>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="lg:hidden text-sidebar-foreground hover:bg-sidebar-accent"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-sm text-sidebar-foreground/70 mt-1">
          AI-Powered Learning Platform
        </p>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="px-4 space-y-2">
          {navigationSections.map((section) => (
            <div key={section.title}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  section.isExpandable && "pr-2",
                )}
                onClick={section.onToggle}
              >
                <section.icon className="mr-3 h-4 w-4" />
                <span className="flex-1 text-left">{section.title}</span>
                {section.badge && (
                  <span className="ml-auto bg-burnt-500 text-white text-xs px-2 py-0.5 rounded-full">
                    {section.badge}
                  </span>
                )}
                {section.count && (
                  <span className="ml-auto bg-muted text-muted-foreground text-xs px-2 py-0.5 rounded-full">
                    {section.count}
                  </span>
                )}
                {section.isExpandable && (
                  <div className="ml-2">
                    {section.isOpen ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </div>
                )}
              </Button>

              {/* Expandable children */}
              {section.children && section.isOpen && (
                <div className="ml-6 mt-2 space-y-1">
                  {section.children.map((child) => (
                    <Button
                      key={child.title}
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    >
                      <child.icon className="mr-3 h-3 w-3" />
                      <span className="flex-1 text-left">{child.title}</span>
                      {child.count && (
                        <span className="ml-auto text-xs text-muted-foreground">
                          {child.count}
                        </span>
                      )}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Quick Stats */}
      <QuickStats />

      {/* Bottom section */}
      <div className="border-t border-sidebar-border p-4 space-y-2">
        {bottomSections.map((section) => (
          <Button
            key={section.title}
            variant={
              section.variant === "destructive" ? "destructive" : "ghost"
            }
            className={cn(
              "w-full justify-start",
              section.variant !== "destructive" &&
                "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
            )}
          >
            <section.icon className="mr-3 h-4 w-4" />
            <div className="flex-1 text-left">
              <div>{section.title}</div>
              {section.subtitle && (
                <div className="text-xs text-sidebar-foreground/60">
                  {section.subtitle}
                </div>
              )}
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
}
