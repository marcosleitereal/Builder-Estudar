import { Trophy, Star, Medal, Crown, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface AchievementsPreviewProps {
  language?: "pt-BR" | "en-US";
}

export function AchievementsPreview({
  language = "pt-BR",
}: AchievementsPreviewProps) {
  const texts = {
    "pt-BR": {
      title: "Suas Conquistas",
      description: "Continue estudando para desbloquear mais medalhas",
      viewAll: "Ver Todas",
      points: "pontos",
      completed: "concluídas",
      recent: "Recentes",
      progress: "Em Progresso",
    },
    "en-US": {
      title: "Your Achievements",
      description: "Continue studying to unlock more medals",
      viewAll: "View All",
      points: "points",
      completed: "completed",
      recent: "Recent",
      progress: "In Progress",
    },
  };

  const t = texts[language];

  const recentAchievements = [
    {
      id: 1,
      name: "Primeiro Resumo",
      description: "Crie seu primeiro resumo com IA",
      icon: Sparkles,
      completed: true,
      rarity: "comum",
      color: "from-green-500 to-emerald-600",
      points: 10,
    },
    {
      id: 2,
      name: "Primeira Nota Alta",
      description: "Obtenha 80% ou mais em um simulado",
      icon: Star,
      completed: true,
      rarity: "comum",
      color: "from-blue-500 to-cyan-600",
      points: 15,
    },
    {
      id: 3,
      name: "Sequência de 7 Dias",
      description: "Estude por 7 dias consecutivos",
      icon: Crown,
      completed: false,
      rarity: "raro",
      color: "from-yellow-500 to-orange-600",
      points: 50,
      progress: 5,
      total: 7,
    },
  ];

  const rarityConfig = {
    comum: { color: "bg-gray-100 text-gray-700", label: "Comum" },
    raro: { color: "bg-blue-100 text-blue-700", label: "Raro" },
    epico: { color: "bg-purple-100 text-purple-700", label: "Épico" },
    lendario: { color: "bg-yellow-100 text-yellow-700", label: "Lendário" },
  };

  const totalPoints = recentAchievements
    .filter((a) => a.completed)
    .reduce((sum, a) => sum + a.points, 0);
  const completedCount = recentAchievements.filter((a) => a.completed).length;

  const handleViewAchievements = () => {
    window.location.href = "/achievements";
  };

  return (
    <Card className="border-burnt-200/50 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-burnt-50 to-terracotta-50/80 border-b border-burnt-100">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-bold text-burnt-800 flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-lg flex items-center justify-center">
                <Trophy className="h-4 w-4 text-white" />
              </div>
              {t.title}
            </CardTitle>
            <CardDescription className="text-burnt-700/80 mt-1">
              {completedCount} {t.completed} • {totalPoints} {t.points}
            </CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleViewAchievements}
            className="border-burnt-300 text-burnt-600 hover:bg-burnt-50"
          >
            {t.viewAll}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          {recentAchievements.map((achievement) => {
            const IconComponent = achievement.icon;
            const rarity = rarityConfig[achievement.rarity];

            return (
              <div
                key={achievement.id}
                className={cn(
                  "flex items-center gap-4 p-4 rounded-lg border transition-all cursor-pointer group",
                  achievement.completed
                    ? "border-burnt-200 bg-burnt-50/50 hover:bg-burnt-50"
                    : "border-muted hover:border-burnt-200 hover:bg-burnt-50/30",
                )}
                onClick={handleViewAchievements}
              >
                {/* Ícone da conquista */}
                <div
                  className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center relative",
                    achievement.completed
                      ? `bg-gradient-to-br ${achievement.color}`
                      : "bg-muted",
                  )}
                >
                  <IconComponent
                    className={cn(
                      "h-6 w-6",
                      achievement.completed
                        ? "text-white"
                        : "text-muted-foreground",
                    )}
                  />
                  {achievement.completed && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
                      <Medal className="h-2 w-2 text-white" />
                    </div>
                  )}
                </div>

                {/* Informações da conquista */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3
                      className={cn(
                        "font-semibold text-sm",
                        achievement.completed
                          ? "text-foreground"
                          : "text-muted-foreground",
                      )}
                    >
                      {achievement.name}
                    </h3>
                    <Badge className={cn("text-xs", rarity.color)}>
                      {rarity.label}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {achievement.description}
                  </p>

                  {/* Progresso ou status */}
                  {achievement.completed ? (
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-yellow-500" />
                      <span className="text-xs font-medium text-foreground">
                        +{achievement.points} {t.points}
                      </span>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">
                          {t.progress}
                        </span>
                        <span className="font-medium text-foreground">
                          {achievement.progress}/{achievement.total}
                        </span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-1.5">
                        <div
                          className="h-1.5 bg-gradient-to-r from-burnt-400 to-terracotta-500 rounded-full transition-all"
                          style={{
                            width: `${(achievement.progress! / achievement.total!) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Seta de navegação */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 transition-opacity text-burnt-600 hover:text-burnt-700 hover:bg-burnt-100"
                >
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
