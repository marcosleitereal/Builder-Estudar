import { useState } from "react";
import {
  ArrowLeft,
  Trophy,
  Crown,
  Star,
  Target,
  Calendar,
  BookOpen,
  Brain,
  Lightbulb,
  Clock,
  TrendingUp,
  Flame,
  Zap,
  Award,
  Users,
  Medal,
  Sparkles,
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
import { MainLayout } from "@/components/layout/MainLayout";
import { cn } from "@/lib/utils";

// Dados das conquistas
const achievementsData = {
  estudo_diario: {
    title: "Estudo Diário",
    icon: Calendar,
    color: "from-green-500 to-emerald-600",
    achievements: [
      {
        id: 1,
        name: "Primeiro Passo",
        description: "Complete seu primeiro dia de estudos",
        icon: Calendar,
        progress: 1,
        total: 1,
        completed: true,
        rarity: "comum",
        points: 10,
      },
      {
        id: 2,
        name: "Sequência de 7 Dias",
        description: "Estude por 7 dias consecutivos",
        icon: Flame,
        progress: 5,
        total: 7,
        completed: false,
        rarity: "raro",
        points: 50,
      },
      {
        id: 3,
        name: "Maratonista",
        description: "Mantenha uma sequência de 30 dias",
        icon: Crown,
        progress: 5,
        total: 30,
        completed: false,
        rarity: "lendario",
        points: 200,
      },
      {
        id: 4,
        name: "Dedicação Total",
        description: "Complete 100 dias de estudo",
        icon: Trophy,
        progress: 45,
        total: 100,
        completed: false,
        rarity: "epico",
        points: 500,
      },
    ],
  },
  desempenho: {
    title: "Desempenho em Simulados",
    icon: Brain,
    color: "from-blue-500 to-cyan-600",
    achievements: [
      {
        id: 5,
        name: "Primeira Nota Alta",
        description: "Obtenha 80% ou mais em um simulado",
        icon: Star,
        progress: 1,
        total: 1,
        completed: true,
        rarity: "comum",
        points: 15,
      },
      {
        id: 6,
        name: "Perfeccionista",
        description: "Acerte 100% das questões em um simulado",
        icon: Target,
        progress: 0,
        total: 1,
        completed: false,
        rarity: "epico",
        points: 100,
      },
      {
        id: 7,
        name: "Consistência",
        description: "Mantenha 85% de aproveitamento em 5 simulados",
        icon: TrendingUp,
        progress: 3,
        total: 5,
        completed: false,
        rarity: "raro",
        points: 75,
      },
    ],
  },
  conteudo: {
    title: "Resumos Criados",
    icon: BookOpen,
    color: "from-purple-500 to-violet-600",
    achievements: [
      {
        id: 8,
        name: "Primeiro Resumo",
        description: "Crie seu primeiro resumo com IA",
        icon: BookOpen,
        progress: 1,
        total: 1,
        completed: true,
        rarity: "comum",
        points: 10,
      },
      {
        id: 9,
        name: "Biblioteca Pessoal",
        description: "Crie 10 resumos diferentes",
        icon: Sparkles,
        progress: 7,
        total: 10,
        completed: false,
        rarity: "raro",
        points: 60,
      },
      {
        id: 10,
        name: "Enciclopédia",
        description: "Acumule 50 resumos criados",
        icon: Crown,
        progress: 7,
        total: 50,
        completed: false,
        rarity: "lendario",
        points: 300,
      },
    ],
  },
  flashcards: {
    title: "Domínio dos Flashcards",
    icon: Lightbulb,
    color: "from-yellow-500 to-orange-600",
    achievements: [
      {
        id: 11,
        name: "Primeira Revisão",
        description: "Complete uma sessão de flashcards",
        icon: Lightbulb,
        progress: 1,
        total: 1,
        completed: true,
        rarity: "comum",
        points: 10,
      },
      {
        id: 12,
        name: "Memória Rápida",
        description: "Acerte 20 flashcards em sequência",
        icon: Zap,
        progress: 15,
        total: 20,
        completed: false,
        rarity: "raro",
        points: 40,
      },
      {
        id: 13,
        name: "Mestre da Memória",
        description: "Complete 100 sessões de flashcards",
        icon: Brain,
        progress: 23,
        total: 100,
        completed: false,
        rarity: "epico",
        points: 150,
      },
    ],
  },
  tempo: {
    title: "Tempo de Estudo",
    icon: Clock,
    color: "from-red-500 to-pink-600",
    achievements: [
      {
        id: 14,
        name: "Primeira Hora",
        description: "Estude por 1 hora contínua",
        icon: Clock,
        progress: 1,
        total: 1,
        completed: true,
        rarity: "comum",
        points: 15,
      },
      {
        id: 15,
        name: "Maratona de Estudo",
        description: "Acumule 50 horas de estudo",
        icon: Award,
        progress: 32,
        total: 50,
        completed: false,
        rarity: "epico",
        points: 200,
      },
    ],
  },
};

const categories = Object.keys(achievementsData);

const rarityConfig = {
  comum: { color: "bg-gray-100 text-gray-700", label: "Comum" },
  raro: { color: "bg-blue-100 text-blue-700", label: "Raro" },
  epico: { color: "bg-purple-100 text-purple-700", label: "Épico" },
  lendario: { color: "bg-yellow-100 text-yellow-700", label: "Lendário" },
};

export default function Achievements() {
  const [selectedCategory, setSelectedCategory] = useState("estudo_diario");

  const handleBackToDashboard = () => {
    window.history.back();
  };

  const handleViewRanking = () => {
    console.log("Ver ranking - funcionalidade a ser implementada");
  };

  const getTotalProgress = () => {
    const allAchievements = Object.values(achievementsData).flatMap(
      (cat) => cat.achievements,
    );
    const completed = allAchievements.filter((a) => a.completed).length;
    const total = allAchievements.length;
    const points = allAchievements
      .filter((a) => a.completed)
      .reduce((sum, a) => sum + a.points, 0);
    return { completed, total, points };
  };

  const progress = getTotalProgress();

  return (
    <MainLayout>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
          <div className="max-w-7xl mx-auto px-4 py-4">
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
                    <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-lg flex items-center justify-center">
                      <Trophy className="h-5 w-5 text-white" />
                    </div>
                    Conquistas
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    {progress.completed} de {progress.total} conquistas •{" "}
                    {progress.points} pontos
                  </p>
                </div>
              </div>
              <Button
                onClick={handleViewRanking}
                className="bg-gradient-to-r from-burnt-500 to-terracotta-600 hover:from-burnt-600 hover:to-terracotta-700 text-white"
              >
                <Users className="h-4 w-4 mr-2" />
                Ver Ranking
              </Button>
            </div>

            {/* Estatísticas rápidas */}
            <div className="grid grid-cols-3 gap-4">
              <Card className="border-burnt-200/50">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-burnt-600">
                    {progress.completed}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Conquistas
                  </div>
                </CardContent>
              </Card>
              <Card className="border-burnt-200/50">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-terracotta-600">
                    {progress.points}
                  </div>
                  <div className="text-sm text-muted-foreground">Pontos</div>
                </CardContent>
              </Card>
              <Card className="border-burnt-200/50">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-sandstone-700">
                    {Math.round((progress.completed / progress.total) * 100)}%
                  </div>
                  <div className="text-sm text-muted-foreground">Progresso</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Conteúdo principal */}
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar de categorias */}
            <div className="lg:col-span-1">
              <Card className="border-burnt-200/50 sticky top-32">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-semibold text-foreground">
                    Categorias
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-2">
                    {categories.map((categoryKey) => {
                      const category = achievementsData[categoryKey];
                      const categoryProgress = category.achievements.filter(
                        (a) => a.completed,
                      ).length;
                      const categoryTotal = category.achievements.length;
                      const IconComponent = category.icon;

                      return (
                        <button
                          key={categoryKey}
                          onClick={() => setSelectedCategory(categoryKey)}
                          className={cn(
                            "w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all",
                            selectedCategory === categoryKey
                              ? "bg-burnt-100 text-burnt-700 border border-burnt-200"
                              : "hover:bg-muted text-muted-foreground hover:text-foreground",
                          )}
                        >
                          <div
                            className={cn(
                              "w-8 h-8 rounded-lg flex items-center justify-center",
                              selectedCategory === categoryKey
                                ? `bg-gradient-to-br ${category.color}`
                                : "bg-muted",
                            )}
                          >
                            <IconComponent
                              className={cn(
                                "h-4 w-4",
                                selectedCategory === categoryKey
                                  ? "text-white"
                                  : "text-muted-foreground",
                              )}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-sm">
                              {category.title}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {categoryProgress}/{categoryTotal}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Grade de conquistas */}
            <div className="lg:col-span-3">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-foreground mb-2">
                  {achievementsData[selectedCategory].title}
                </h2>
                <p className="text-muted-foreground">
                  Desbloqueie conquistas completando desafios nesta categoria
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {achievementsData[selectedCategory].achievements.map(
                  (achievement) => {
                    const IconComponent = achievement.icon;
                    const rarity = rarityConfig[achievement.rarity];
                    const progressPercentage =
                      (achievement.progress / achievement.total) * 100;

                    return (
                      <Card
                        key={achievement.id}
                        className={cn(
                          "border-burnt-200/50 transition-all duration-200 hover:shadow-lg relative overflow-hidden",
                          achievement.completed &&
                            "ring-2 ring-yellow-400 ring-opacity-50",
                        )}
                      >
                        {achievement.completed && (
                          <div className="absolute top-0 right-0 w-0 h-0 border-l-[40px] border-l-transparent border-t-[40px] border-t-yellow-400">
                            <Medal className="absolute -top-8 -right-6 h-4 w-4 text-white transform rotate-45" />
                          </div>
                        )}

                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between">
                            <div
                              className={cn(
                                "w-12 h-12 rounded-xl flex items-center justify-center",
                                achievement.completed
                                  ? `bg-gradient-to-br ${achievementsData[selectedCategory].color}`
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
                            </div>
                            <Badge className={cn("text-xs", rarity.color)}>
                              {rarity.label}
                            </Badge>
                          </div>

                          <div>
                            <CardTitle
                              className={cn(
                                "text-base font-semibold leading-tight",
                                achievement.completed
                                  ? "text-foreground"
                                  : "text-muted-foreground",
                              )}
                            >
                              {achievement.name}
                            </CardTitle>
                            <CardDescription className="text-sm mt-1">
                              {achievement.description}
                            </CardDescription>
                          </div>
                        </CardHeader>

                        <CardContent className="pt-0">
                          {/* Barra de progresso */}
                          <div className="space-y-2 mb-4">
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">
                                Progresso
                              </span>
                              <span className="font-medium text-foreground">
                                {achievement.progress}/{achievement.total}
                              </span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2">
                              <div
                                className={cn(
                                  "h-2 rounded-full transition-all duration-500",
                                  achievement.completed
                                    ? `bg-gradient-to-r ${achievementsData[selectedCategory].color}`
                                    : "bg-muted-foreground/30",
                                )}
                                style={{
                                  width: `${Math.min(progressPercentage, 100)}%`,
                                }}
                              />
                            </div>
                          </div>

                          {/* Pontos */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 text-yellow-500" />
                              <span className="text-sm font-medium text-foreground">
                                {achievement.points} pontos
                              </span>
                            </div>
                            {achievement.completed && (
                              <Badge className="bg-green-100 text-green-700 text-xs">
                                Completa!
                              </Badge>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    );
                  },
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
