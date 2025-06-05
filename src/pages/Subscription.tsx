import { useState } from "react";
import {
  ArrowLeft,
  Crown,
  Check,
  X,
  Zap,
  Shield,
  Users,
  Palette,
  Calendar,
  CreditCard,
  Settings,
  Download,
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

// Dados da assinatura atual
const currentSubscription = {
  plan: "premium", // "free", "premium", "expired"
  planName: "Premium",
  status: "ativo",
  nextBilling: "2025-01-15",
  price: "R$ 29,90",
  period: "mensal",
};

const planFeatures = {
  free: [
    { feature: "3 resumos por mês", included: true },
    { feature: "10 flashcards por mês", included: true },
    { feature: "1 mapa mental por mês", included: true },
    { feature: "Simulados básicos", included: true },
    { feature: "Suporte por email", included: true },
    { feature: "Geração ilimitada", included: false },
    { feature: "Prioridade na fila", included: false },
    { feature: "IA avançada", included: false },
    { feature: "Personalização extra", included: false },
    { feature: "Análises detalhadas", included: false },
    { feature: "Exportação avançada", included: false },
    { feature: "Suporte prioritário", included: false },
  ],
  premium: [
    { feature: "Geração ilimitada", included: true },
    { feature: "Prioridade na fila", included: true },
    { feature: "IA avançada", included: true },
    { feature: "Personalização extra", included: true },
    { feature: "Análises detalhadas", included: true },
    { feature: "Exportação avançada", included: true },
    { feature: "Suporte prioritário", included: true },
    { feature: "Todos os recursos gratuitos", included: true },
    { feature: "Acesso antecipado", included: true },
    { feature: "Templates exclusivos", included: true },
    { feature: "Relatórios personalizados", included: true },
    { feature: "API personalizada", included: true },
  ],
};

const premiumBenefits = [
  {
    icon: Zap,
    title: "Geração Ilimitada",
    description:
      "Crie quantos resumos, flashcards e mapas mentais quiser sem limitações",
    color: "text-yellow-600",
    bgColor: "bg-yellow-100",
  },
  {
    icon: Shield,
    title: "Prioridade na Fila",
    description: "Seus conteúdos são processados com prioridade máxima",
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    icon: Sparkles,
    title: "IA Avançada",
    description:
      "Acesso aos modelos de IA mais avançados para melhor qualidade",
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
  {
    icon: Palette,
    title: "Personalização Extra",
    description:
      "Templates exclusivos, cores personalizadas e layouts avançados",
    color: "text-pink-600",
    bgColor: "bg-pink-100",
  },
  {
    icon: Users,
    title: "Suporte Prioritário",
    description: "Atendimento especializado em até 2 horas durante dias úteis",
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    icon: Download,
    title: "Exportação Avançada",
    description:
      "Exporte em múltiplos formatos: PDF, Word, PowerPoint, Notion e mais",
    color: "text-indigo-600",
    bgColor: "bg-indigo-100",
  },
];

export default function Subscription() {
  const [selectedPlan, setSelectedPlan] = useState<"monthly" | "yearly">(
    "monthly",
  );

  const handleBackToDashboard = () => {
    window.history.back();
  };

  const handleManagePlan = () => {
    console.log("Gerenciar plano");
  };

  const handleUpgradeToPremium = () => {
    console.log("Atualizar para Premium");
  };

  const handleViewBenefits = () => {
    console.log("Ver benefícios");
  };

  const getStatusBadge = () => {
    switch (currentSubscription.status) {
      case "ativo":
        return { color: "bg-green-100 text-green-700", label: "Ativo" };
      case "expirado":
        return { color: "bg-red-100 text-red-700", label: "Expirado" };
      case "cancelado":
        return { color: "bg-gray-100 text-gray-700", label: "Cancelado" };
      default:
        return { color: "bg-gray-100 text-gray-700", label: "Gratuito" };
    }
  };

  const statusBadge = getStatusBadge();

  return (
    <MainLayout>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
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
                      <Crown className="h-5 w-5 text-white" />
                    </div>
                    Gerenciar Assinatura
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    Gerencie seu plano e veja os benefícios disponíveis
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Conteúdo principal */}
        <div className="max-w-6xl mx-auto px-4 py-6 space-y-8">
          {/* Status atual da assinatura */}
          <Card className="border-burnt-200/50 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-burnt-50 to-terracotta-50 border-b border-burnt-100">
              <CardTitle className="text-xl font-bold text-burnt-800 flex items-center gap-3">
                <Crown className="h-6 w-6 text-burnt-600" />
                Status da Assinatura
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div>
                      <h3 className="text-2xl font-bold text-foreground">
                        Plano {currentSubscription.planName}
                      </h3>
                      <p className="text-muted-foreground">
                        {currentSubscription.price} por{" "}
                        {currentSubscription.period}
                      </p>
                    </div>
                    <Badge className={cn("text-sm", statusBadge.color)}>
                      {statusBadge.label}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>
                        Próxima cobrança:{" "}
                        {new Date(
                          currentSubscription.nextBilling,
                        ).toLocaleDateString("pt-BR")}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4" />
                      <span>Cartão terminado em ****1234</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={handleManagePlan}
                    className="border-burnt-300 text-burnt-600 hover:bg-burnt-50"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Gerenciar Plano
                  </Button>
                  {currentSubscription.plan === "free" && (
                    <Button
                      onClick={handleUpgradeToPremium}
                      className="bg-gradient-to-r from-burnt-500 to-terracotta-600 hover:from-burnt-600 hover:to-terracotta-700 text-white"
                    >
                      <Crown className="h-4 w-4 mr-2" />
                      Atualizar para Premium
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Vantagens do Premium */}
          <Card className="border-burnt-200/50 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-foreground flex items-center gap-3">
                <Sparkles className="h-6 w-6 text-burnt-600" />
                Vantagens do Plano Premium
              </CardTitle>
              <CardDescription>
                Desbloqueie todo o potencial da plataforma StudyAI
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {premiumBenefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 rounded-lg border border-burnt-100 hover:bg-burnt-50/30 transition-colors"
                  >
                    <div
                      className={cn(
                        "w-10 h-10 rounded-lg flex items-center justify-center",
                        benefit.bgColor,
                      )}
                    >
                      <benefit.icon className={cn("h-5 w-5", benefit.color)} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">
                        {benefit.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Tabela comparativa */}
          <Card className="border-burnt-200/50 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-foreground">
                Comparação de Planos
              </CardTitle>
              <CardDescription>
                Veja as diferenças entre nossos planos
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Plano Gratuito */}
                <div className="border border-border rounded-lg p-6">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      Gratuito
                    </h3>
                    <div className="text-3xl font-bold text-foreground mb-1">
                      R$ 0
                    </div>
                    <div className="text-sm text-muted-foreground">por mês</div>
                  </div>

                  <div className="space-y-3">
                    {planFeatures.free.map((feature, index) => (
                      <div key={index} className="flex items-center gap-3">
                        {feature.included ? (
                          <Check className="h-4 w-4 text-green-600" />
                        ) : (
                          <X className="h-4 w-4 text-red-400" />
                        )}
                        <span
                          className={cn(
                            "text-sm",
                            feature.included
                              ? "text-foreground"
                              : "text-muted-foreground",
                          )}
                        >
                          {feature.feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  {currentSubscription.plan === "free" ? (
                    <Button className="w-full mt-6" variant="outline" disabled>
                      Plano Atual
                    </Button>
                  ) : (
                    <Button className="w-full mt-6" variant="outline">
                      Voltar ao Gratuito
                    </Button>
                  )}
                </div>

                {/* Plano Premium */}
                <div className="border-2 border-burnt-300 rounded-lg p-6 relative bg-gradient-to-br from-burnt-50 to-terracotta-50/50">
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-burnt-500 text-white px-4 py-1">
                      Mais Popular
                    </Badge>
                  </div>

                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-foreground mb-2 flex items-center justify-center gap-2">
                      <Crown className="h-5 w-5 text-burnt-600" />
                      Premium
                    </h3>
                    <div className="text-3xl font-bold text-foreground mb-1">
                      R$ 29,90
                    </div>
                    <div className="text-sm text-muted-foreground">por mês</div>
                  </div>

                  <div className="space-y-3">
                    {planFeatures.premium.map((feature, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <Check className="h-4 w-4 text-green-600" />
                        <span className="text-sm text-foreground">
                          {feature.feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  {currentSubscription.plan === "premium" ? (
                    <Button className="w-full mt-6" disabled>
                      <Crown className="h-4 w-4 mr-2" />
                      Plano Atual
                    </Button>
                  ) : (
                    <Button
                      className="w-full mt-6 bg-gradient-to-r from-burnt-500 to-terracotta-600 hover:from-burnt-600 hover:to-terracotta-700 text-white"
                      onClick={handleUpgradeToPremium}
                    >
                      <Crown className="h-4 w-4 mr-2" />
                      Fazer Upgrade
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
