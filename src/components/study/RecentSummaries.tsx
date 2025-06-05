import { FileText, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface RecentSummariesProps {
  language?: "pt-BR" | "en-US";
}

export function RecentSummaries({ language = "pt-BR" }: RecentSummariesProps) {
  const texts = {
    "pt-BR": {
      title: "Resumos Recentes",
      description: "Acesse seus resumos gerados recentemente",
      viewAll: "Ver Todos",
      readMore: "Ler Mais",
      generatedOn: "Gerado em",
    },
    "en-US": {
      title: "Recent Summaries",
      description: "Access your recently generated summaries",
      viewAll: "View All",
      readMore: "Read More",
      generatedOn: "Generated on",
    },
  };

  const t = texts[language];

  const recentSummaries = [
    {
      id: 1,
      title: "Fundamentos da Inteligência Artificial",
      excerpt:
        "Conceitos fundamentais da IA, tipos de inteligência artificial e suas aplicações práticas...",
      generatedDate: "15 de dezembro de 2024",
      readTime: "8 min",
    },
    {
      id: 2,
      title: "Revolução Industrial 4.0",
      excerpt:
        "Análise das transformações tecnológicas da Quarta Revolução Industrial...",
      generatedDate: "14 de dezembro de 2024",
      readTime: "6 min",
    },
    {
      id: 3,
      title: "Sustentabilidade e Energia Renovável",
      excerpt:
        "Estudo sobre fontes de energia limpa e práticas sustentáveis...",
      generatedDate: "13 de dezembro de 2024",
      readTime: "10 min",
    },
  ];

  const handleViewSummary = (id: number) => {
    window.location.href = `/summary/${id}`;
  };

  return (
    <Card className="border-burnt-200/50 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-burnt-50 to-terracotta-50/80 border-b border-burnt-100">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-bold text-burnt-800 flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-burnt-500 to-terracotta-600 rounded-lg flex items-center justify-center">
                <FileText className="h-4 w-4 text-white" />
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
        <div className="space-y-4">
          {recentSummaries.map((summary) => (
            <div
              key={summary.id}
              className="flex items-start justify-between p-4 rounded-lg border border-burnt-100 hover:border-burnt-200 hover:bg-burnt-50/30 transition-all cursor-pointer group"
              onClick={() => handleViewSummary(summary.id)}
            >
              <div className="flex-1">
                <h3 className="font-semibold text-foreground group-hover:text-burnt-700 transition-colors">
                  {summary.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                  {summary.excerpt}
                </p>
                <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {summary.readTime}
                  </span>
                  <span>
                    {t.generatedOn} {summary.generatedDate}
                  </span>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="opacity-0 group-hover:opacity-100 transition-opacity text-burnt-600 hover:text-burnt-700 hover:bg-burnt-100"
              >
                <span className="sr-only">{t.readMore}</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
