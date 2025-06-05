import { useState, useMemo } from "react";
import {
  ArrowLeft,
  Search,
  Filter,
  Calendar,
  TrendingUp,
  FileText,
  Brain,
  Lightbulb,
  BookOpen,
  Edit3,
  Eye,
  Trash2,
  MoreHorizontal,
  Clock,
  Target,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { MainLayout } from "@/components/layout/MainLayout";
import { cn } from "@/lib/utils";

// Dados de exemplo do histórico
const studyData = [
  {
    id: 1,
    title: "Fundamentos da Inteligência Artificial",
    type: "resumo",
    subject: "Tecnologia",
    date: "2024-12-15",
    duration: "45 min",
    performance: 85,
    status: "concluido",
    description:
      "Conceitos básicos de IA, Machine Learning e aplicações práticas",
    icon: FileText,
    color: "from-burnt-500 to-terracotta-600",
  },
  {
    id: 2,
    title: "Direito Penal - Crimes Contra a Pessoa",
    type: "simulado",
    subject: "Direito",
    date: "2024-12-14",
    duration: "120 min",
    performance: 92,
    status: "concluido",
    description:
      "Simulado sobre crimes contra a vida, lesões corporais e periclitação",
    icon: Brain,
    color: "from-terracotta-500 to-sandstone-600",
  },
  {
    id: 3,
    title: "Biologia Celular",
    type: "flashcard",
    subject: "Biologia",
    date: "2024-12-14",
    duration: "30 min",
    performance: 78,
    status: "revisao",
    description: "Estruturas celulares, organelas e processos metabólicos",
    icon: Lightbulb,
    color: "from-sandstone-500 to-burnt-600",
  },
  {
    id: 4,
    title: "Revolução Industrial 4.0",
    type: "mapa_mental",
    subject: "História",
    date: "2024-12-13",
    duration: "60 min",
    performance: 90,
    status: "concluido",
    description:
      "Transformações tecnológicas e impactos sociais da quarta revolução",
    icon: BookOpen,
    color: "from-burnt-400 to-terracotta-500",
  },
  {
    id: 5,
    title: "Matemática Financeira",
    type: "resumo",
    subject: "Matemática",
    date: "2024-12-12",
    duration: "40 min",
    performance: 73,
    status: "pendente",
    description: "Juros simples, compostos e sistemas de amortização",
    icon: FileText,
    color: "from-terracotta-400 to-sandstone-500",
  },
  {
    id: 6,
    title: "Química Orgânica - Hidrocarbonetos",
    type: "flashcard",
    subject: "Química",
    date: "2024-12-11",
    duration: "35 min",
    performance: 88,
    status: "concluido",
    description: "Classificação e nomenclatura de compostos orgânicos",
    icon: Lightbulb,
    color: "from-sandstone-400 to-burnt-500",
  },
  {
    id: 7,
    title: "Processo Civil - Petição Inicial",
    type: "simulado",
    subject: "Direito",
    date: "2024-12-10",
    duration: "90 min",
    performance: 95,
    status: "concluido",
    description: "Requisitos, vícios e elementos da petição inicial",
    icon: Brain,
    color: "from-burnt-500 to-terracotta-600",
  },
  {
    id: 8,
    title: "Ecossistemas Brasileiros",
    type: "mapa_mental",
    subject: "Geografia",
    date: "2024-12-09",
    duration: "50 min",
    performance: 82,
    status: "revisao",
    description: "Biomas, características climáticas e biodiversidade",
    icon: BookOpen,
    color: "from-terracotta-500 to-sandstone-600",
  },
];

const typeOptions = [
  { value: "todos", label: "Todos os Tipos", icon: Filter },
  { value: "resumo", label: "Resumos", icon: FileText },
  { value: "flashcard", label: "Flashcards", icon: Lightbulb },
  { value: "simulado", label: "Simulados", icon: Brain },
  { value: "mapa_mental", label: "Mapas Mentais", icon: BookOpen },
];

const performanceOptions = [
  { value: "todos", label: "Todos os Desempenhos" },
  { value: "excelente", label: "Excelente (90-100%)" },
  { value: "bom", label: "Bom (80-89%)" },
  { value: "regular", label: "Regular (70-79%)" },
  { value: "baixo", label: "Baixo (0-69%)" },
];

const dateOptions = [
  { value: "todos", label: "Todas as Datas" },
  { value: "hoje", label: "Hoje" },
  { value: "semana", label: "Esta Semana" },
  { value: "mes", label: "Este Mês" },
  { value: "trimestre", label: "Último Trimestre" },
];

export default function StudyHistory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("todos");
  const [performanceFilter, setPerformanceFilter] = useState("todos");
  const [dateFilter, setDateFilter] = useState("todos");

  const filteredData = useMemo(() => {
    return studyData.filter((item) => {
      // Filtro de busca
      const matchesSearch =
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.date.includes(searchTerm);

      // Filtro de tipo
      const matchesType = typeFilter === "todos" || item.type === typeFilter;

      // Filtro de desempenho
      let matchesPerformance = true;
      if (performanceFilter !== "todos") {
        switch (performanceFilter) {
          case "excelente":
            matchesPerformance = item.performance >= 90;
            break;
          case "bom":
            matchesPerformance =
              item.performance >= 80 && item.performance < 90;
            break;
          case "regular":
            matchesPerformance =
              item.performance >= 70 && item.performance < 80;
            break;
          case "baixo":
            matchesPerformance = item.performance < 70;
            break;
        }
      }

      // Filtro de data (simplificado para exemplo)
      let matchesDate = true;
      if (dateFilter !== "todos") {
        const itemDate = new Date(item.date);
        const today = new Date();
        const daysDiff = Math.floor(
          (today.getTime() - itemDate.getTime()) / (1000 * 60 * 60 * 24),
        );

        switch (dateFilter) {
          case "hoje":
            matchesDate = daysDiff === 0;
            break;
          case "semana":
            matchesDate = daysDiff <= 7;
            break;
          case "mes":
            matchesDate = daysDiff <= 30;
            break;
          case "trimestre":
            matchesDate = daysDiff <= 90;
            break;
        }
      }

      return matchesSearch && matchesType && matchesPerformance && matchesDate;
    });
  }, [searchTerm, typeFilter, performanceFilter, dateFilter]);

  const getPerformanceBadge = (performance: number) => {
    if (performance >= 90)
      return { color: "bg-green-100 text-green-700", label: "Excelente" };
    if (performance >= 80)
      return { color: "bg-blue-100 text-blue-700", label: "Bom" };
    if (performance >= 70)
      return { color: "bg-yellow-100 text-yellow-700", label: "Regular" };
    return { color: "bg-red-100 text-red-700", label: "Baixo" };
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "concluido":
        return { color: "bg-green-100 text-green-700", label: "Concluído" };
      case "revisao":
        return { color: "bg-amber-100 text-amber-700", label: "Para Revisão" };
      case "pendente":
        return { color: "bg-gray-100 text-gray-700", label: "Pendente" };
      default:
        return { color: "bg-gray-100 text-gray-700", label: "Desconhecido" };
    }
  };

  const handleAction = (action: string, itemId: number) => {
    console.log(`Ação: ${action} para item ${itemId}`);
    // Aqui implementaria as ações específicas
  };

  const handleBackToDashboard = () => {
    window.history.back();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

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
                  <h1 className="text-2xl font-bold text-foreground">
                    Histórico de Estudos
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    {filteredData.length} de {studyData.length} itens
                    encontrados
                  </p>
                </div>
              </div>
            </div>

            {/* Barra de busca e filtros */}
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Busca */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por título, conteúdo ou data..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-burnt-200 focus:border-burnt-500"
                />
              </div>

              {/* Filtros */}
              <div className="flex gap-3">
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-40 border-burnt-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {typeOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        <div className="flex items-center gap-2">
                          <option.icon className="h-4 w-4" />
                          {option.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  value={performanceFilter}
                  onValueChange={setPerformanceFilter}
                >
                  <SelectTrigger className="w-48 border-burnt-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {performanceOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={dateFilter} onValueChange={setDateFilter}>
                  <SelectTrigger className="w-40 border-burnt-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {dateOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        {/* Conteúdo principal */}
        <div className="max-w-7xl mx-auto px-4 py-6">
          {filteredData.length === 0 ? (
            <Card className="border-burnt-200/50">
              <CardContent className="p-12 text-center">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Nenhum resultado encontrado
                </h3>
                <p className="text-muted-foreground mb-4">
                  Tente ajustar os filtros ou termos de busca
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("");
                    setTypeFilter("todos");
                    setPerformanceFilter("todos");
                    setDateFilter("todos");
                  }}
                  className="border-burnt-300 text-burnt-600 hover:bg-burnt-50"
                >
                  Limpar Filtros
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredData.map((item) => {
                const performanceBadge = getPerformanceBadge(item.performance);
                const statusBadge = getStatusBadge(item.status);
                const IconComponent = item.icon;

                return (
                  <Card
                    key={item.id}
                    className="border-burnt-200/50 hover:shadow-lg transition-all duration-200 group"
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div
                          className={`w-10 h-10 bg-gradient-to-br ${item.color} rounded-lg flex items-center justify-center`}
                        >
                          <IconComponent className="h-5 w-5 text-white" />
                        </div>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 p-0"
                            onClick={() => handleAction("menu", item.id)}
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div>
                        <CardTitle className="text-base font-semibold text-foreground leading-tight mb-1">
                          {item.title}
                        </CardTitle>
                        <CardDescription className="text-sm text-muted-foreground">
                          {item.subject}
                        </CardDescription>
                      </div>
                    </CardHeader>

                    <CardContent className="pt-0">
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {item.description}
                      </p>

                      {/* Informações do estudo */}
                      <div className="space-y-3 mb-4">
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {formatDate(item.date)}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {item.duration}
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <Target className="h-3 w-3 text-muted-foreground" />
                            <span className="text-sm font-medium text-foreground">
                              {item.performance}%
                            </span>
                          </div>
                          <Badge
                            className={cn("text-xs", performanceBadge.color)}
                          >
                            {performanceBadge.label}
                          </Badge>
                        </div>

                        <div className="flex justify-between items-center">
                          <Badge
                            variant="outline"
                            className={cn(
                              "text-xs border-0",
                              statusBadge.color,
                            )}
                          >
                            {statusBadge.label}
                          </Badge>
                        </div>
                      </div>

                      {/* Botões de ação */}
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 text-xs border-burnt-300 text-burnt-600 hover:bg-burnt-50"
                          onClick={() => handleAction("view", item.id)}
                        >
                          <Eye className="h-3 w-3 mr-1" />
                          Ver
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 text-xs border-burnt-300 text-burnt-600 hover:bg-burnt-50"
                          onClick={() => handleAction("edit", item.id)}
                        >
                          <Edit3 className="h-3 w-3 mr-1" />
                          Editar
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs border-red-300 text-red-600 hover:bg-red-50"
                          onClick={() => handleAction("delete", item.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
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
