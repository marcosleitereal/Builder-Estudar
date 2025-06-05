import { useState, useEffect } from "react";
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
  User,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { QuickStats } from "./QuickStats";
import { BrazilFlag, USAFlag, SpainFlag } from "@/components/ui/flags";

interface LoggedUser {
  name: string;
  email: string;
  plan: "free" | "premium" | "premium-admin";
  role: "user" | "admin";
  avatar?: string;
}

interface SidebarSection {
  title: string;
  icon: any;
  onClick: () => void;
  variant?: "destructive" | "admin";
  isLanguageSelector?: boolean;
}

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
  const [currentLanguage, setCurrentLanguage] = useState<
    "pt-BR" | "en-US" | "es-ES"
  >("pt-BR");

  // Estado para dados do usuário logado
  const [loggedUser, setLoggedUser] = useState<LoggedUser>({
    name: "João Silva",
    email: "joao@email.com",
    plan: "premium",
    role: "admin",
    avatar: undefined,
  });

  // Carregar dados do usuário do localStorage
  useEffect(() => {
    const loadUserData = () => {
      try {
        const savedSettings = localStorage.getItem("studyai-settings");
        if (savedSettings) {
          const settings = JSON.parse(savedSettings);
          setLoggedUser((prev) => ({
            ...prev,
            name: settings.name || prev.name,
            email: settings.email || prev.email,
            avatar: settings.avatar || undefined,
          }));
        }
      } catch (error) {
        console.error("Erro ao carregar dados do usuário:", error);
      }
    };

    loadUserData();

    // Escutar mudanças no localStorage (quando atualizar nas configurações)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "studyai-settings") {
        loadUserData();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    // Criar um evento customizado para mudanças internas
    const handleCustomUpdate = () => loadUserData();
    window.addEventListener("userDataUpdated", handleCustomUpdate);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("userDataUpdated", handleCustomUpdate);
    };
  }, []);

  const toggleLanguage = () => {
    try {
      setCurrentLanguage((prev) => {
        const nextLanguage =
          prev === "pt-BR" ? "en-US" : prev === "en-US" ? "es-ES" : "pt-BR";
        return nextLanguage;
      });
    } catch (error) {
      console.error("Erro ao alternar idioma:", error);
    }
  };

  const getLanguageDisplay = () => {
    if (currentLanguage === "pt-BR") return "Português (BR)";
    if (currentLanguage === "en-US") return "English (US)";
    return "Español (ES)";
  };

  const getLanguageFlag = () => {
    try {
      if (currentLanguage === "pt-BR") return <BrazilFlag size={16} />;
      if (currentLanguage === "en-US") return <USAFlag size={16} />;
      if (currentLanguage === "es-ES") return <SpainFlag size={16} />;
      return <BrazilFlag size={16} />; // fallback
    } catch (error) {
      console.error("Erro ao renderizar bandeira:", error);
      return <BrazilFlag size={16} />;
    }
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
      planFree: "Gratuito",
      planPremium: "Premium",
      planPremiumAdmin: "Premium Grátis",
      userProfile: "Perfil do Usuário",
      adminPanel: "Painel Admin",
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
      planFree: "Free",
      planPremium: "Premium",
      planPremiumAdmin: "Premium Free",
      userProfile: "User Profile",
      adminPanel: "Admin Panel",
    },
    "es-ES": {
      studyHistory: "Historial de Estudios",
      drafts: "Borradores",
      simulatedExams: "Exámenes Simulados",
      flashcards: "Tarjetas de Estudio",
      mindMaps: "Mapas Mentales",
      subscription: "Suscripción",
      notifications: "Notificaciones",
      unread: "No Leídas",
      alerts: "Alertas",
      information: "Información",
      confirmations: "Confirmaciones",
      achievements: "Logros",
      trophies: "Trofeos",
      medals: "Medallas",
      stars: "Estrellas",
      objectives: "Objetivos",
      settings: "Configuraciones",
      language: "Idioma",
      logout: "Cerrar Sesión",
      progress: "Tu Progreso",
      platform: "Plataforma de Aprendizaje con IA",
      planFree: "Gratuito",
      planPremium: "Premium",
      planPremiumAdmin: "Premium Gratis",
      userProfile: "Perfil de Usuario",
      adminPanel: "Panel Admin",
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

  // Criar seções base
  const baseSections: SidebarSection[] = [
    {
      title: t.settings,
      icon: Settings,
      onClick: () => {
        try {
          window.location.href = "/settings";
        } catch (error) {
          console.error("Erro ao navegar para settings:", error);
        }
      },
    },
  ];

  // Adicionar botão admin se for administrador
  if (loggedUser.role === "admin") {
    baseSections.push({
      title: t.adminPanel,
      icon: Shield,
      onClick: () => {
        window.location.href = "/admin";
      },
      variant: "admin",
    });
  }

  // Adicionar seções finais
  baseSections.push(
    {
      title: t.language,
      icon: Languages,
      onClick: toggleLanguage,
      isLanguageSelector: true,
    },
    {
      title: t.logout,
      icon: LogOut,
      variant: "destructive",
      onClick: () => {
        try {
          const confirm = window.confirm(
            currentLanguage === "pt-BR"
              ? "Tem certeza que deseja sair?"
              : currentLanguage === "en-US"
                ? "Are you sure you want to logout?"
                : "¿Estás seguro de que quieres cerrar sesión?",
          );
          if (confirm) {
            localStorage.clear();
            window.location.href = "/login";
          }
        } catch (error) {
          console.error("Erro ao fazer logout:", error);
          // Forçar logout mesmo com erro
          localStorage.clear();
          window.location.reload();
        }
      },
    },
  );

  const bottomSections = baseSections;

  return (
    <div
      className={cn(
        "h-full bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-500 ease-out",
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
              <h1 className="text-xl font-bold text-sidebar-foreground transition-opacity duration-300">
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
          <p className="text-sm text-sidebar-foreground/70 mt-1 transition-opacity duration-300">
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

      {/* User Info Section */}
      <div className="border-t border-sidebar-border p-4">
        <div
          className={cn(
            "flex items-center gap-3 mb-4",
            isCollapsed ? "justify-center" : "justify-start",
          )}
        >
          {/* Avatar */}
          <div className="flex-shrink-0 relative group">
            <div
              className="w-10 h-10 bg-gradient-to-br from-burnt-500 to-terracotta-600 rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition-transform"
              title={
                isCollapsed
                  ? `${loggedUser.name} (${loggedUser.plan === "premium" ? t.planPremium : t.planFree})`
                  : undefined
              }
              onClick={() => (window.location.href = "/settings")}
            >
              {loggedUser.avatar ? (
                <img
                  src={loggedUser.avatar}
                  alt={loggedUser.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <User className="h-5 w-5 text-white" />
              )}
            </div>

            {/* Badge do plano - aparece no canto quando colapsada */}
            {isCollapsed && (
              <div
                className={cn(
                  "absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-xs font-bold",
                  loggedUser.plan === "premium"
                    ? "bg-yellow-400 text-yellow-900"
                    : "bg-gray-400 text-gray-900",
                )}
              >
                {loggedUser.plan === "premium" ? "P" : "F"}
              </div>
            )}
          </div>

          {/* User Info - só mostra quando expandida */}
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <p className="text-sm font-medium text-sidebar-foreground truncate">
                  {loggedUser.name}
                </p>
                <Badge
                  className={cn(
                    "text-xs px-2 py-0.5",
                    loggedUser.plan === "premium"
                      ? "bg-yellow-100 text-yellow-700 border-yellow-200"
                      : "bg-gray-100 text-gray-700 border-gray-200",
                  )}
                >
                  {loggedUser.plan === "premium" ? t.planPremium : t.planFree}
                </Badge>
              </div>
              <p className="text-xs text-sidebar-foreground/60 truncate">
                {loggedUser.email}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Bottom section */}
      <div className="border-t border-sidebar-border p-4 space-y-2">
        {bottomSections.map((section) => (
          <Button
            key={section.title}
            variant={
              section.variant === "destructive"
                ? "destructive"
                : section.variant === "admin"
                  ? "ghost"
                  : "ghost"
            }
            className={cn(
              "w-full justify-start",
              section.variant === "destructive" &&
                "text-red-600 bg-red-50 hover:bg-red-100 hover:text-red-700 border border-red-200",
              section.variant === "admin" &&
                "text-yellow-700 hover:bg-yellow-100 border border-yellow-200",
              section.variant !== "destructive" &&
                section.variant !== "admin" &&
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
                        {currentLanguage === "pt-BR"
                          ? "PT"
                          : currentLanguage === "en-US"
                            ? "EN"
                            : "ES"}
                      </span>
                    </div>
                  )}
                </div>
                {section.isLanguageSelector && (
                  <div className="text-xs text-sidebar-foreground/60 mt-1">
                    {currentLanguage === "pt-BR"
                      ? "Clique para alterar idioma"
                      : currentLanguage === "en-US"
                        ? "Click to change language"
                        : "Haz clic para cambiar idioma"}
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
