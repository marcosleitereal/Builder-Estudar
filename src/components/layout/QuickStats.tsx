import { Brain, Target, Clock, Trophy } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function QuickStats() {
  const stats = [
    {
      icon: Brain,
      value: "24",
      label: "Sessões de Estudo",
      color: "text-burnt-600",
      bgColor: "bg-burnt-100",
    },
    {
      icon: Target,
      value: "89%",
      label: "Taxa de Acerto",
      color: "text-terracotta-600",
      bgColor: "bg-terracotta-100",
    },
    {
      icon: Clock,
      value: "12h",
      label: "Tempo de Estudo",
      color: "text-sandstone-700",
      bgColor: "bg-sandstone-100",
    },
    {
      icon: Trophy,
      value: "8",
      label: "Conquistas",
      color: "text-burnt-700",
      bgColor: "bg-burnt-100",
    },
  ];

  return (
    <div className="p-4 border-t border-sidebar-border">
      <h3 className="text-sm font-medium text-sidebar-foreground mb-3">
        Seu Progresso
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
