import { useState } from "react";
import { X, Sparkles, BookOpen, Brain, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function WelcomeBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const features = [
    {
      icon: Brain,
      title: "Análise com IA",
      description:
        "IA avançada analisa seu conteúdo para criar materiais de estudo otimizados",
    },
    {
      icon: BookOpen,
      title: "Múltiplos Formatos",
      description: "Gere questões, resumos, flashcards e mapas mentais",
    },
    {
      icon: Target,
      title: "Aprendizado Personalizado",
      description:
        "Conteúdo adaptado ao seu estilo de aprendizagem e objetivos",
    },
  ];
  return (
    <Card className="border-burnt-200/50 bg-gradient-to-r from-burnt-50 to-terracotta-50/80 shadow-sm mb-6">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="h-5 w-5 text-burnt-600" />
              <h3 className="font-semibold text-burnt-800">
                Bem-vindo ao StudyAI!
              </h3>
            </div>
            <p className="text-burnt-700/80 mb-4 text-sm">
              Transforme qualquer material de aprendizagem em conteúdo de estudo
              personalizado. Comece colando texto ou enviando arquivos abaixo.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-2">
                  <feature.icon className="h-4 w-4 text-burnt-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-burnt-800 text-sm">
                      {feature.title}
                    </h4>
                    <p className="text-xs text-burnt-600/80">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsVisible(false)}
            className="ml-4 text-burnt-600 hover:bg-burnt-100 flex-shrink-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
