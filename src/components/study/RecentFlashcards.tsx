import { Lightbulb, Play, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface RecentFlashcardsProps {
  language?: "pt-BR" | "en-US";
}

export function RecentFlashcards({
  language = "pt-BR",
}: RecentFlashcardsProps) {
  const texts = {
    "pt-BR": {
      title: "Flashcards Disponíveis",
      description: "Continue seus estudos com flashcards interativos",
      viewAll: "Ver Todos",
      study: "Estudar",
      cards: "cartões",
      marked: "marcados para revisão",
    },
    "en-US": {
      title: "Available Flashcards",
      description: "Continue your studies with interactive flashcards",
      viewAll: "View All",
      study: "Study",
      cards: "cards",
      marked: "marked for review",
    },
  };

  const t = texts[language];

  const flashcardSets = [
    {
      id: 1,
      title: "Fundamentos de IA",
      description: "Conceitos básicos de Inteligência Artificial",
      totalCards: 15,
      reviewCards: 3,
      progress: 60,
      color: "from-burnt-500 to-terracotta-600",
    },
    {
      id: 2,
      title: "Machine Learning",
      description: "Algoritmos e técnicas de aprendizado de máquina",
      totalCards: 24,
      reviewCards: 5,
      progress: 45,
      color: "from-terracotta-500 to-sandstone-600",
    },
    {
      id: 3,
      title: "Redes Neurais",
      description: "Estrutura e funcionamento de redes neurais",
      totalCards: 18,
      reviewCards: 2,
      progress: 80,
      color: "from-sandstone-500 to-burnt-600",
    },
  ];

  const handleStudyFlashcards = (id: number) => {
    window.location.href = `/flashcards/${id}`;
  };

  return (
    <Card className="border-burnt-200/50 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-burnt-50 to-terracotta-50/80 border-b border-burnt-100">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-bold text-burnt-800 flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-burnt-500 to-terracotta-600 rounded-lg flex items-center justify-center">
                <Lightbulb className="h-4 w-4 text-white" />
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
            className="border-burnt-300 text-burnt-600 hover:bg-burnt-50"
          >
            {t.viewAll}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {flashcardSets.map((set) => (
            <div
              key={set.id}
              className="p-4 rounded-lg border border-burnt-100 hover:border-burnt-200 hover:bg-burnt-50/30 transition-all group"
            >
              <div className="flex items-start justify-between mb-3">
                <div
                  className={`w-10 h-10 bg-gradient-to-br ${set.color} rounded-lg flex items-center justify-center`}
                >
                  <Lightbulb className="h-5 w-5 text-white" />
                </div>
                {set.reviewCards > 0 && (
                  <div className="flex items-center gap-1 text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded-full">
                    <Star className="h-3 w-3 fill-current" />
                    {set.reviewCards}
                  </div>
                )}
              </div>

              <h3 className="font-semibold text-foreground group-hover:text-burnt-700 transition-colors mb-1">
                {set.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                {set.description}
              </p>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>
                    {set.totalCards} {t.cards}
                  </span>
                  <span>{set.progress}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-1.5">
                  <div
                    className={`h-1.5 bg-gradient-to-r ${set.color} rounded-full transition-all`}
                    style={{ width: `${set.progress}%` }}
                  />
                </div>
                {set.reviewCards > 0 && (
                  <p className="text-xs text-amber-600">
                    {set.reviewCards} {t.marked}
                  </p>
                )}
              </div>

              <Button
                onClick={() => handleStudyFlashcards(set.id)}
                size="sm"
                className="w-full bg-gradient-to-r from-burnt-500 to-terracotta-600 hover:from-burnt-600 hover:to-terracotta-700 text-white"
              >
                <Play className="h-4 w-4 mr-2" />
                {t.study}
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
