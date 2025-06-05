import { useState, useEffect, useRef } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Sidebar } from "./Sidebar";
import { QuickNav } from "@/components/ui/QuickNav";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarExpanded, setSidebarExpanded] = useState(false); // Controla se está expandida permanentemente
  const [isHovering, setIsHovering] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Auto-collapse sidebar when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        // Ao clicar fora, colapsa permanentemente
        setSidebarExpanded(false);
        setIsHovering(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Determina se a sidebar deve estar expandida
  const shouldExpand = sidebarExpanded || isHovering;

  return (
    <div className="flex h-screen bg-background">
      {/* Mobile sidebar overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/50 transition-opacity lg:hidden",
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={cn(
          "fixed inset-y-0 left-0 z-50 transform transition-all duration-500 ease-out lg:relative lg:translate-x-0 group",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
          shouldExpand ? "w-64" : "w-16",
        )}
        onMouseEnter={() => {
          setIsHovering(true);
          // Quando passa o mouse e está colapsa, expande permanentemente
          if (!sidebarExpanded) {
            setSidebarExpanded(true);
          }
        }}
        onMouseLeave={() => {
          setIsHovering(false);
          // NÃO colapsa quando o mouse sai - mantém expandida
        }}
      >
        <Sidebar
          onClose={() => setSidebarOpen(false)}
          isCollapsed={!shouldExpand}
          onToggleCollapse={() => {
            setSidebarExpanded(!sidebarExpanded);
            setIsHovering(false);
          }}
        />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile header */}
        <div className="lg:hidden bg-white border-b border-border px-4 py-3 flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(true)}
            className="text-muted-foreground"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold text-foreground">StudyAI</h1>
          <div className="w-10"></div>
        </div>

        {/* Main content area */}
        <main className="flex-1 overflow-auto p-4 lg:p-6">{children}</main>
      </div>

      {/* Navegação rápida para desenvolvimento */}
      <QuickNav />
    </div>
  );
}
