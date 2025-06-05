import { useState } from "react";
import {
  ArrowLeft,
  Bell,
  Trophy,
  FileText,
  CreditCard,
  Lightbulb,
  CheckCheck,
  Trash2,
  Filter,
  Crown,
  BookOpen,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MainLayout } from "@/components/layout/MainLayout";
import { cn } from "@/lib/utils";

// Dados das notificações
const notificationsData = [
  {
    id: 1,
    type: "conquista",
    title: "Nova conquista desbloqueada!",
    message:
      "Você completou 'Primeira Nota Alta' - obtenha 80% ou mais em um simulado",
    time: "2 horas atrás",
    icon: Trophy,
    color: "from-yellow-500 to-orange-600",
    isRead: false,
  },
  {
    id: 2,
    type: "sistema",
    title: "Resumo atualizado",
    message: "Seu resumo 'Fundamentos da IA' foi atualizado com novo conteúdo",
    time: "4 horas atrás",
    icon: FileText,
    color: "from-blue-500 to-cyan-600",
    isRead: false,
  },
  {
    id: 3,
    type: "financeiro",
    title: "Fatura disponível",
    message:
      "Sua fatura do plano Premium de dezembro está disponível para download",
    time: "1 dia atrás",
    icon: CreditCard,
    color: "from-green-500 to-emerald-600",
    isRead: true,
  },
  {
    id: 4,
    type: "ia",
    title: "Dica de estudo personalizada",
    message:
      "Com base no seu histórico, recomendamos revisar 'Direito Penal' esta semana",
    time: "1 dia atrás",
    icon: Lightbulb,
    color: "from-purple-500 to-violet-600",
    isRead: false,
  },
  {
    id: 5,
    type: "conquista",
    title: "Sequência de estudos!",
    message:
      "Você está há 5 dias consecutivos estudando. Continue assim para desbloquear 'Sequência de 7 Dias'",
    time: "2 dias atrás",
    icon: Crown,
    color: "from-yellow-500 to-orange-600",
    isRead: true,
  },
  {
    id: 6,
    type: "sistema",
    title: "Novo conteúdo disponível",
    message: "Adicionamos novos templates de flashcards para Química Orgânica",
    time: "3 dias atrás",
    icon: BookOpen,
    color: "from-blue-500 to-cyan-600",
    isRead: true,
  },
  {
    id: 7,
    type: "ia",
    title: "Análise de desempenho",
    message: "Seu desempenho em simulados melhorou 15% este mês. Parabéns!",
    time: "3 dias atrás",
    icon: Star,
    color: "from-purple-500 to-violet-600",
    isRead: true,
  },
];

const filterOptions = [
  { value: "todos", label: "Todas as Notificações", icon: Bell },
  { value: "conquista", label: "Conquistas", icon: Trophy },
  { value: "sistema", label: "Sistema", icon: FileText },
  { value: "financeiro", label: "Financeiro", icon: CreditCard },
  { value: "ia", label: "IA", icon: Lightbulb },
];

export default function Notifications() {
  const [notifications, setNotifications] = useState(notificationsData);
  const [typeFilter, setTypeFilter] = useState("todos");

  const filteredNotifications = notifications.filter(
    (notification) =>
      typeFilter === "todos" || notification.type === typeFilter,
  );

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleMarkAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? { ...notification, isRead: true }
          : notification,
      ),
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, isRead: true })),
    );
  };

  const handleDeleteAll = () => {
    setNotifications([]);
  };

  const handleBackToDashboard = () => {
    window.history.back();
  };

  const formatTime = (timeString: string) => {
    return timeString;
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleBackToDashboard}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Voltar ao Dashboard
                </Button>
                <div className="h-6 w-px bg-border" />
                <div>
                  <h1 className="text-2xl font-bold text-foreground flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-burnt-500 to-terracotta-600 rounded-lg flex items-center justify-center">
                      <Bell className="h-5 w-5 text-white" />
                    </div>
                    Notificações
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    {unreadCount} não lidas • {filteredNotifications.length}{" "}
                    total
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleMarkAllAsRead}
                  disabled={unreadCount === 0}
                  className="border-burnt-300 text-burnt-600 hover:bg-burnt-50"
                >
                  <CheckCheck className="h-4 w-4 mr-2" />
                  Marcar como Lido
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDeleteAll}
                  disabled={notifications.length === 0}
                  className="border-red-300 text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Apagar Tudo
                </Button>
              </div>
            </div>

            {/* Filtros */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">
                  Filtrar por:
                </span>
              </div>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-48 border-burnt-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {filterOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      <div className="flex items-center gap-2">
                        <option.icon className="h-4 w-4" />
                        {option.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Lista de notificações */}
        <div className="max-w-4xl mx-auto px-4 py-6">
          {filteredNotifications.length === 0 ? (
            <Card className="border-burnt-200/50">
              <CardContent className="p-12 text-center">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Bell className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Nenhuma notificação encontrada
                </h3>
                <p className="text-muted-foreground">
                  {typeFilter === "todos"
                    ? "Você não tem notificações no momento"
                    : "Não há notificações deste tipo"}
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {filteredNotifications.map((notification) => {
                const IconComponent = notification.icon;

                return (
                  <Card
                    key={notification.id}
                    className={cn(
                      "border-burnt-200/50 transition-all duration-200 hover:shadow-md cursor-pointer",
                      !notification.isRead &&
                        "ring-2 ring-burnt-200 ring-opacity-50 bg-burnt-50/30",
                    )}
                    onClick={() => handleMarkAsRead(notification.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        {/* Ícone da notificação */}
                        <div
                          className={cn(
                            "w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0",
                            `bg-gradient-to-br ${notification.color}`,
                          )}
                        >
                          <IconComponent className="h-6 w-6 text-white" />
                        </div>

                        {/* Conteúdo */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-1">
                            <h3
                              className={cn(
                                "font-semibold text-base leading-tight",
                                notification.isRead
                                  ? "text-muted-foreground"
                                  : "text-foreground",
                              )}
                            >
                              {notification.title}
                            </h3>
                            <div className="flex items-center gap-2 ml-4">
                              {!notification.isRead && (
                                <div className="w-2 h-2 bg-burnt-500 rounded-full"></div>
                              )}
                              <span className="text-xs text-muted-foreground whitespace-nowrap">
                                {formatTime(notification.time)}
                              </span>
                            </div>
                          </div>

                          <p
                            className={cn(
                              "text-sm leading-relaxed",
                              notification.isRead
                                ? "text-muted-foreground"
                                : "text-foreground/80",
                            )}
                          >
                            {notification.message}
                          </p>

                          {/* Badge do tipo */}
                          <div className="mt-3">
                            <Badge
                              variant="outline"
                              className={cn(
                                "text-xs capitalize",
                                notification.type === "conquista" &&
                                  "border-yellow-300 text-yellow-700 bg-yellow-50",
                                notification.type === "sistema" &&
                                  "border-blue-300 text-blue-700 bg-blue-50",
                                notification.type === "financeiro" &&
                                  "border-green-300 text-green-700 bg-green-50",
                                notification.type === "ia" &&
                                  "border-purple-300 text-purple-700 bg-purple-50",
                              )}
                            >
                              {notification.type}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
