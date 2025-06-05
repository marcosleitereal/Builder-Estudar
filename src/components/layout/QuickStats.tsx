import { Brain, Target, Clock, Trophy } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface QuickStatsProps {
  language?: "pt-BR" | "en-US" | "es-ES";
}

export function QuickStats({ language = "pt-BR" }: QuickStatsProps) {
  const texts = {
    "pt-BR": {
      progress: "Seu Progresso",
      studySessions: "Sessões de Estudo",
      accuracyRate: "Taxa de Acerto",
      studyTime: "Tempo de Estudo",
      achievements: "Conquistas",
    },
    "en-US": {
      progress: "Your Progress",
      studySessions: "Study Sessions",
      accuracyRate: "Accuracy Rate",
      studyTime: "Study Time",
      achievements: "Achievements",
    },
    "es-ES": {
      progress: "Tu Progreso",
      studySessions: "Sesiones de Estudio",
      accuracyRate: "Tasa de Acierto",
      studyTime: "Tiempo de Estudio",
      achievements: "Logros",
    },
  };

  const t = texts[language] || texts["pt-BR"];

  const stats = [
    {
      icon: Brain,
      value: "24",
      label: t.studySessions,
      color: "text-burnt-600",
      bgColor: "bg-burnt-100",
    },
    {
      icon: Target,
      value: "89%",
      label: t.accuracyRate,
      color: "text-terracotta-600",
      bgColor: "bg-terracotta-100",
    },
    {
      icon: Clock,
      value: "12h",
      label: t.studyTime,
      color: "text-sandstone-700",
      bgColor: "bg-sandstone-100",
    },
    {
      icon: Trophy,
      value: "8",
      label: t.achievements,
      color: "text-burnt-700",
      bgColor: "bg-burnt-100",
    },
  ];

  return (
    <div className="p-4 border-t border-sidebar-border">
      <h3 className="text-sm font-medium text-sidebar-foreground mb-3">
        {t.progress}
      </h3>
      <div className="grid grid-cols-2 gap-2">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className="border-sidebar-border bg-sidebar-accent/30"
          >
            <CardContent className="p-3">
              <div className="flex items-center space-x-2">
                <div className={`p-1.5 rounded-md ${stat.bgColor}`}>
                  <stat.icon className={`h-3 w-3 ${stat.color}`} />
                </div>
                <div>
                  <div className={`text-sm font-semibold ${stat.color}`}>
                    {stat.value}
                  </div>
                  <div className="text-xs text-sidebar-foreground/60">
                    {stat.label}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
