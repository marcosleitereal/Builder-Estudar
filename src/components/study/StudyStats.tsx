import {
  Clock,
  Target,
  TrendingUp,
  Calendar,
  FileText,
  Brain,
  Lightbulb,
  BookOpen,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface StudyStatsProps {
  language?: "pt-BR" | "en-US";
}

export function StudyStats({ language = "pt-BR" }: StudyStatsProps) {
  const texts = {
    "pt-BR": {
      title: "Suas Estatísticas de Estudo",
      description: "Acompanhe seu progresso e desempenho",
      viewHistory: "Ver Histórico Completo",
      thisWeek: "Esta Semana",
      average: "Média",
      total: "Total",
      hours: "horas",
      sessions: "sessões",
      performance: "desempenho",
      materials: "materiais criados",
    },
    "en-US": {
      title: "Your Study Statistics",
      description: "Track your progress and performance",
      viewHistory: "View Full History",
      thisWeek: "This Week",
      average: "Average",
      total: "Total",
      hours: "hours",
      sessions: "sessions",
      performance: "performance",
      materials: "materials created",
    },
  };

  const t = texts[language];

  const stats = [
    {
      icon: Clock,
      label: t.thisWeek,
      value: "12",
      unit: t.hours,
      change: "+2h",
      color: "text-burnt-600",
      bgColor: "bg-burnt-100",
    },
    {
      icon: Target,
      label: `${t.average} ${t.performance}`,
      value: "87",
      unit: "%",
      change: "+5%",
      color: "text-terracotta-600",
      bgColor: "bg-terracotta-100",
    },
    {
      icon: TrendingUp,
      label: `${t.total} ${t.sessions}`,
      value: "24",
      unit: "",
      change: "+3",
      color: "text-sandstone-700",
      bgColor: "bg-sandstone-100",
    },
    {
      icon: Calendar,
      label: t.materials,
      value: "18",
      unit: "",
      change: "+4",
      color: "text-burnt-700",
      bgColor: "bg-burnt-100",
    },
  ];

  const recentActivity = [
    {
      icon: FileText,
      type: "Resumo",
      title: "Inteligência Artificial",
      time: "2h atrás",
      color: "text-burnt-600",
    },
    {
      icon: Brain,
      type: "Simulado",
      title: "Direito Penal",
      time: "1 dia atrás",
      color: "text-terracotta-600",
    },
    {
      icon: Lightbulb,
      type: "Flashcard",
      title: "Biologia Celular",
      time: "2 dias atrás",
      color: "text-sandstone-700",
    },
  ];

  const handleViewHistory = () => {
    window.location.href = "/history";
  };

  return (
    <Card className="border-burnt-200/50 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-burnt-50 to-terracotta-50/80 border-b border-burnt-100">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-bold text-burnt-800 flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-burnt-500 to-terracotta-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-4 w-4 text-white" />
              </div>
              {t.title}
            </CardTitle>
            <CardDescription className="text-burnt-700/80 mt-1">
              {t.description}
            </CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleViewHistory}
            className="border-burnt-300 text-burnt-600 hover:bg-burnt-50"
          >
            {t.viewHistory}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          {/* Estatísticas principais */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div
                  className={`w-12 h-12 ${stat.bgColor} rounded-full flex items-center justify-center mx-auto mb-2`}
                >
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <div className="text-lg font-bold text-foreground">
                  {stat.value}
                  {stat.unit}
                </div>
                <div className="text-xs text-muted-foreground mb-1">
                  {stat.label}
                </div>
                <div className="text-xs text-green-600 font-medium">
                  {stat.change}
                </div>
              </div>
            ))}
          </div>

          {/* Atividade recente */}
          <div>
            <h3 className="font-semibold text-foreground mb-3">
              Atividade Recente
            </h3>
            <div className="space-y-2">
              {recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-burnt-50/50 transition-colors"
                >
                  <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center">
                    <activity.icon className={`h-4 w-4 ${activity.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-foreground">
                        {activity.title}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        ({activity.type})
                      </span>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {activity.time}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
