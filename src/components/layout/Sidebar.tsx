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
  ChevronLeft,
  FileText,
  Brain,
  Lightbulb,
  X,
  MessageSquare,
  AlertCircle,
  Info,
  CheckCircle,
  Trophy,
  Medal,
  Star,
  Target,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { QuickStats } from "./QuickStats";
import { BrazilFlag, USAFlag } from "@/components/ui/flags";

interface SidebarProps {
  onClose?: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export function Sidebar({
  onClose,
  isCollapsed = false,
  onToggleCollapse,
}: SidebarProps) {
  const [studyHistoryOpen, setStudyHistoryOpen] = useState(true);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [achievementsOpen, setAchievementsOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<"pt-BR" | "en-US">(
    "pt-BR",
  );

  const toggleLanguage = () => {
    setCurrentLanguage((prev) => (prev === "pt-BR" ? "en-US" : "pt-BR"));
  };

  const getLanguageDisplay = () => {
    return currentLanguage === "pt-BR" ? "Português (BR)" : "English (US)";
  };

  const getLanguageFlag = () => {
    return currentLanguage === "pt-BR" ? (
      <BrazilFlag size={16} />
    ) : (
      <USAFlag size={16} />
    );
  };

  const getLanguageInfo = () => {
    return {
      display: getLanguageDisplay(),
      flag: getLanguageFlag(),
      code: currentLanguage,
    };
  };

  // Textos dinâmicos baseados no idioma selecionado
  const texts = {
    "pt-BR": {
      studyHistory: "Histórico de Estudos",
      drafts: "Rascunhos",
      simulatedExams: "Simulados",
      flashcards: "Flashcards",
      mindMaps: "Mapas Mentais",
      subscription: "Assinatura",
      notifications: "Notificações",
      unread: "Não Lidas",
      alerts: "Alertas",
      information: "Informações",
      confirmations: "Confirmações",
      achievements: "Conquistas",
      trophies: "Troféus",
      medals: "Medalhas",
      stars: "Estrelas",
      objectives: "Objetivos",
      settings: "Configurações",
      language: "Idioma",
      logout: "Sair",
      progress: "Seu Progresso",
      platform: "Plataforma de Aprendizado com IA",
    },
    "en-US": {
      studyHistory: "Study History",
      drafts: "Drafts",
      simulatedExams: "Simulated Exams",
      flashcards: "Flashcards",
      mindMaps: "Mind Maps",
      subscription: "Subscription",
      notifications: "Notifications",
      unread: "Unread",
      alerts: "Alerts",
      information: "Information",
      confirmations: "Confirmations",
      achievements: "Achievements",
      trophies: "Trophies",
      medals: "Medals",
      stars: "Stars",
      objectives: "Objectives",
      settings: "Settings",
      language: "Language",
      logout: "Logout",
      progress: "Your Progress",
      platform: "AI-Powered Learning Platform",
    },
  };

  const t = texts[currentLanguage];

  const navigationSections = [
    {
      title: t.studyHistory,
      icon: BookOpen,
      isExpandable: true,
      isOpen: studyHistoryOpen,
      onToggle: () => setStudyHistoryOpen(!studyHistoryOpen),
      onClick: () => (window.location.href = "/history"),
      children: [
        { title: t.drafts, icon: FileText, count: 3 },
        { title: t.simulatedExams, icon: Brain, count: 5 },
        { title: t.flashcards, icon: Lightbulb, count: 12 },
        { title: t.mindMaps, icon: BookOpen, count: 2 },
      ],
    },
    {
      title: t.subscription,
      icon: Crown,
      badge: "Premium",
      onClick: () => (window.location.href = "/subscription"),
    },
    {
      title: t.notifications,
      icon: Bell,
      count: 4,
      isExpandable: true,
      isOpen: notificationsOpen,
      onToggle: () => setNotificationsOpen(!notificationsOpen),
      onClick: () => (window.location.href = "/notifications"),
      children: [
        { title: t.unread, icon: MessageSquare, count: 2 },
        { title: t.alerts, icon: AlertCircle, count: 1 },
        { title: t.information, icon: Info, count: 1 },
        { title: t.confirmations, icon: CheckCircle, count: 0 },
      ],
    },
    {
      title: t.achievements,
      icon: Award,
      count: 8,
      isExpandable: true,
      isOpen: achievementsOpen,
      onToggle: () => setAchievementsOpen(!achievementsOpen),
      onClick: () => (window.location.href = "/achievements"),
      children: [
        { title: t.trophies, icon: Trophy, count: 3 },
        { title: t.medals, icon: Medal, count: 4 },
        { title: t.stars, icon: Star, count: 1 },
        { title: t.objectives, icon: Target, count: 0 },
      ],
    },
  ];

  const bottomSections = [
    {
      title: t.settings,
      icon: Settings,
      onClick: () => (window.location.href = "/settings"),
    },
    {
      title: t.language,
      icon: Languages,
      onClick: toggleLanguage,
      isLanguageSelector: true,
    },
    {
      title: t.logout,
      icon: LogOut,
      variant: "destructive" as const,
    },
  ];

  return (
    <div
      className={cn(
        "h-full bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-300",
        isCollapsed ? "w-16" : "w-64",
      )}
    >
      {/* Header */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-burnt-500 to-terracotta-600 rounded-lg flex items-center justify-center">
              <Brain className="h-5 w-5 text-white" />
            </div>
            {!isCollapsed && (
              <h1 className="text-xl font-bold text-sidebar-foreground">
                StudyAI
              </h1>
            )}
          </div>
          <div className="flex items-center gap-2">
            {onToggleCollapse && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onToggleCollapse}
                className="hidden lg:flex text-sidebar-foreground hover:bg-sidebar-accent"
              >
                {isCollapsed ? (
                  <ChevronRight className="h-4 w-4" />
                ) : (
                  <ChevronLeft className="h-4 w-4" />
                )}
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="lg:hidden text-sidebar-foreground hover:bg-sidebar-accent"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
        {!isCollapsed && (
          <p className="text-sm text-sidebar-foreground/70 mt-1">
            {t.platform}
          </p>
        )}
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
                onClick={(e) => {
                  if (section.isExpandable) {
                    e.stopPropagation();
                    section.onToggle();
                  } else if (section.onClick) {
                    section.onClick();
                  }
                }}
              >
                <section.icon
                  className={cn("h-4 w-4", !isCollapsed && "mr-3")}
                />
                {!isCollapsed && (
                  <span
                    className="flex-1 text-left cursor-pointer"
                    onClick={(e) => {
                      if (section.isExpandable && section.onClick) {
                        e.stopPropagation();
                        section.onClick();
                      }
                    }}
                  >
                    {section.title}
                  </span>
                )}
                {!isCollapsed && section.badge && (
                  <span className="ml-auto bg-burnt-500 text-white text-xs px-2 py-0.5 rounded-full">
                    {section.badge}
                  </span>
                )}
                {!isCollapsed && section.count && (
                  <span className="ml-auto bg-muted text-muted-foreground text-xs px-2 py-0.5 rounded-full">
                    {section.count}
                  </span>
                )}
                {!isCollapsed && section.isExpandable && (
                  <div
                    className="ml-2 cursor-pointer hover:bg-sidebar-accent rounded p-1 -m-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      section.onToggle();
                    }}
                  >
                    {section.isOpen ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </div>
                )}
              </Button>

              {/* Expandable children */}
              {!isCollapsed && section.children && section.isOpen && (
                <div className="ml-6 mt-2 space-y-1">
                  {section.children.map((child) => (
                    <Button
                      key={child.title}
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      onClick={() => {
                        if (child.onClick) {
                          child.onClick();
                        } else if (section.onClick) {
                          // Navegar para a página principal da seção
                          section.onClick();
                        }
                      }}
                    >
                      <child.icon className="mr-3 h-3 w-3" />
                      <span className="flex-1 text-left">{child.title}</span>
                      {child.count !== undefined && (
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
      {!isCollapsed && <QuickStats language={currentLanguage} />}

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
            onClick={section.onClick}
          >
            <section.icon className={cn("h-4 w-4", !isCollapsed && "mr-3")} />
            {!isCollapsed && (
              <div className="flex-1 text-left">
                <div className="flex items-center justify-between">
                  <span>{section.title}</span>
                  {section.isLanguageSelector && (
                    <div className="flex items-center gap-2 px-2 py-1 bg-burnt-100 rounded-md">
                      {getLanguageFlag()}
                      <span className="text-xs font-medium text-burnt-700">
                        {currentLanguage === "pt-BR" ? "PT" : "EN"}
                      </span>
                    </div>
                  )}
                </div>
                {section.isLanguageSelector && (
                  <div className="text-xs text-sidebar-foreground/60 mt-1">
                    {currentLanguage === "pt-BR"
                      ? "Clique para alterar para English"
                      : "Click to change to Português"}
                  </div>
                )}
              </div>
            )}
          </Button>
        ))}
      </div>
    </div>
  );
}
