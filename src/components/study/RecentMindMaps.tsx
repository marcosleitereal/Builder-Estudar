import { BookOpen, Eye, Share, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface RecentMindMapsProps {
  language?: "pt-BR" | "en-US";
}

export function RecentMindMaps({ language = "pt-BR" }: RecentMindMapsProps) {
  const texts = {
    "pt-BR": {
      title: "Mapas Mentais Disponíveis",
      description: "Explore e interaja com seus mapas mentais",
      viewAll: "Ver Todos",
      view: "Visualizar",
      nodes: "nós",
      generatedOn: "Gerado em",
    },
    "en-US": {
      title: "Available Mind Maps",
      description: "Explore and interact with your mind maps",
      viewAll: "View All",
      view: "View",
      nodes: "nodes",
      generatedOn: "Generated on",
    },
  };

  const t = texts[language];

  const mindMaps = [
    {
      id: 1,
      title: "Inteligência Artificial",
      description: "Conceitos fundamentais e aplicações de IA",
      totalNodes: 12,
      levels: 3,
      generatedDate: "15 de dezembro de 2024",
      color: "from-burnt-500 to-terracotta-600",
      preview: "IA → ML, NLP, CV, Ética",
    },
    {
      id: 2,
      title: "Revolução Industrial 4.0",
      description: "Transformações tecnológicas da era digital",
      totalNodes: 18,
      levels: 4,
      generatedDate: "14 de dezembro de 2024",
      color: "from-terracotta-500 to-sandstone-600",
      preview: "Indústria 4.0 → IoT, Automação, Big Data",
    },
    {
      id: 3,
      title: "Sustentabilidade Ambiental",
      description: "Práticas e conceitos de sustentabilidade",
      totalNodes: 15,
      levels: 3,
      generatedDate: "13 de dezembro de 2024",
      color: "from-sandstone-500 to-burnt-600",
      preview: "Sustentabilidade → Energia, Recursos, Clima",
    },
  ];

  const handleViewMindMap = (id: number) => {
    window.location.href = `/mindmap/${id}`;
  };

  return (
    <Card className="border-burnt-200/50 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-burnt-50 to-terracotta-50/80 border-b border-burnt-100">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-bold text-burnt-800 flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-burnt-500 to-terracotta-600 rounded-lg flex items-center justify-center">
                <BookOpen className="h-4 w-4 text-white" />
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
          {mindMaps.map((mindMap) => (
            <div
              key={mindMap.id}
              className="flex items-start justify-between p-4 rounded-lg border border-burnt-100 hover:border-burnt-200 hover:bg-burnt-50/30 transition-all cursor-pointer group"
              onClick={() => handleViewMindMap(mindMap.id)}
            >
              <div className="flex-1">
                <div className="flex items-start gap-3">
                  <div
                    className={`w-10 h-10 bg-gradient-to-br ${mindMap.color} rounded-lg flex items-center justify-center flex-shrink-0`}
                  >
                    <BookOpen className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground group-hover:text-burnt-700 transition-colors">
                      {mindMap.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {mindMap.description}
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                      <span>
                        {mindMap.totalNodes} {t.nodes}
                      </span>
                      <span>{mindMap.levels} níveis</span>
                      <span>
                        {t.generatedOn} {mindMap.generatedDate}
                      </span>
                    </div>
                    <div className="mt-2 p-2 bg-burnt-50 rounded text-xs text-burnt-700 font-mono">
                      {mindMap.preview}
                    </div>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="opacity-0 group-hover:opacity-100 transition-opacity text-burnt-600 hover:text-burnt-700 hover:bg-burnt-100 ml-4"
              >
                <Eye className="h-4 w-4 mr-2" />
                {t.view}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
