import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const pages = [
  { name: "Dashboard", path: "/", color: "bg-blue-500" },
  { name: "Histórico", path: "/history", color: "bg-green-500" },
  { name: "Conquistas", path: "/achievements", color: "bg-yellow-500" },
  { name: "Notificações", path: "/notifications", color: "bg-purple-500" },
  { name: "Assinatura", path: "/subscription", color: "bg-orange-500" },
  { name: "Configurações", path: "/settings", color: "bg-gray-500" },
  { name: "Login", path: "/login", color: "bg-red-500" },
  { name: "Admin", path: "/admin", color: "bg-red-600" },
  { name: "Esqueci Senha", path: "/forgot-password", color: "bg-pink-500" },
];

export function QuickNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Botão flutuante */}
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          size="sm"
          className="rounded-full shadow-lg bg-burnt-500 hover:bg-burnt-600 text-white"
        >
          <Menu className="h-4 w-4" />
        </Button>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50"
          onClick={() => setIsOpen(false)}
        >
          <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow-xl p-4 min-w-[200px]">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-sm">Navegaç��o Rápida</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="h-6 w-6 p-0"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
            <div className="space-y-1">
              {pages.map((page) => (
                <button
                  key={page.path}
                  onClick={() => {
                    window.location.href = page.path;
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center gap-2 p-2 text-sm hover:bg-gray-100 rounded"
                >
                  <div className={cn("w-2 h-2 rounded-full", page.color)} />
                  {page.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
