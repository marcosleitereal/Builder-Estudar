import { useState } from "react";
import {
  Settings,
  Users,
  BarChart3,
  Palette,
  Brain,
  Database,
  Shield,
  Bell,
  DollarSign,
  Activity,
  TrendingUp,
  UserPlus,
  Edit3,
  Trash2,
  Download,
  Upload,
  RefreshCw,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Cloud,
  HardDrive,
  Plus,
  Wifi,
  WifiOff,
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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { MainLayout } from "@/components/layout/MainLayout";
import { cn } from "@/lib/utils";

interface User {
  id: number;
  name: string;
  email: string;
  plan: "free" | "premium";
  status: "active" | "inactive" | "banned";
  joinDate: string;
  lastActive: string;
}

interface StorageProvider {
  id: number;
  name: string;
  type: "aws-s3" | "google-cloud" | "azure-blob" | "local" | "minio";
  status: "connected" | "disconnected" | "error";
  isPrimary: boolean;
  isBackup: boolean;
  config: {
    accessKey?: string;
    secretKey?: string;
    bucket?: string;
    region?: string;
    endpoint?: string;
    path?: string;
  };
  createdAt: string;
  lastTested: string;
}

const mockUsers: User[] = [
  {
    id: 1,
    name: "João Silva",
    email: "joao@email.com",
    plan: "premium",
    status: "active",
    joinDate: "2024-01-15",
    lastActive: "2024-12-15",
  },
  {
    id: 2,
    name: "Maria Santos",
    email: "maria@email.com",
    plan: "free",
    status: "active",
    joinDate: "2024-02-20",
    lastActive: "2024-12-14",
  },
  {
    id: 3,
    name: "Pedro Costa",
    email: "pedro@email.com",
    plan: "premium",
    status: "inactive",
    joinDate: "2024-03-10",
    lastActive: "2024-12-01",
  },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [users, setUsers] = useState(mockUsers);
  const [systemSettings, setSystemSettings] = useState({
    siteName: "StudyAI",
    maintenanceMode: false,
    registrationsEnabled: true,
    aiProvider: "gpt-4",
    maxFreeGenerations: 3,
    premiumPrice: 29.9,
    supportEmail: "suporte@studyai.com",
    primaryColor: "#D4831A",
    secondaryColor: "#D97556",
  });

  const [aiSettings, setAiSettings] = useState({
    defaultModel: "gpt-4",
    maxTokens: 4000,
    temperature: 0.7,
    enableVision: true,
    rateLimitPremium: 100,
    rateLimitFree: 3,
  });

  const [storageProviders, setStorageProviders] = useState<StorageProvider[]>([
    {
      id: 1,
      name: "AWS S3 Principal",
      type: "aws-s3",
      status: "connected",
      isPrimary: true,
      isBackup: false,
      config: {
        bucket: "studyai-files",
        region: "us-east-1",
        accessKey: "AKIA...",
        secretKey: "***",
      },
      createdAt: "2024-01-15",
      lastTested: "2024-12-15",
    },
    {
      id: 2,
      name: "Google Cloud Backup",
      type: "google-cloud",
      status: "connected",
      isPrimary: false,
      isBackup: true,
      config: {
        bucket: "studyai-backup",
        region: "us-central1",
      },
      createdAt: "2024-02-01",
      lastTested: "2024-12-14",
    },
  ]);

  const [newProvider, setNewProvider] = useState<Partial<StorageProvider>>({
    name: "",
    type: "aws-s3",
    config: {},
  });

  const handleSystemUpdate = (key: string, value: any) => {
    setSystemSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleAiUpdate = (key: string, value: any) => {
    setAiSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleStorageUpdate = (
    providerId: number,
    updates: Partial<StorageProvider>,
  ) => {
    setStorageProviders((prev) =>
      prev.map((provider) =>
        provider.id === providerId ? { ...provider, ...updates } : provider,
      ),
    );
  };

  const handleAddStorageProvider = () => {
    if (!newProvider.name || !newProvider.type) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    const provider: StorageProvider = {
      id: Date.now(),
      name: newProvider.name,
      type: newProvider.type as StorageProvider["type"],
      status: "disconnected",
      isPrimary: storageProviders.length === 0,
      isBackup: false,
      config: newProvider.config || {},
      createdAt: new Date().toISOString().split("T")[0],
      lastTested: "Nunca",
    };

    setStorageProviders((prev) => [...prev, provider]);
    setNewProvider({ name: "", type: "aws-s3", config: {} });
  };

  const handleDeleteStorageProvider = (providerId: number) => {
    const provider = storageProviders.find((p) => p.id === providerId);
    if (provider?.isPrimary) {
      alert(
        "Não é possível excluir o storage primário. Defina outro como primário primeiro.",
      );
      return;
    }

    const confirm = window.confirm(
      "Tem certeza que deseja excluir este provedor de storage?",
    );
    if (confirm) {
      setStorageProviders((prev) => prev.filter((p) => p.id !== providerId));
    }
  };

  const handleSetPrimaryStorage = (providerId: number) => {
    setStorageProviders((prev) =>
      prev.map((provider) => ({
        ...provider,
        isPrimary: provider.id === providerId,
      })),
    );
  };

  const handleTestStorageConnection = async (providerId: number) => {
    setStorageProviders((prev) =>
      prev.map((provider) =>
        provider.id === providerId
          ? { ...provider, status: "connecting" as const }
          : provider,
      ),
    );

    // Simular teste de conexão
    setTimeout(() => {
      const isSuccess = Math.random() > 0.3; // 70% chance de sucesso
      setStorageProviders((prev) =>
        prev.map((provider) =>
          provider.id === providerId
            ? {
                ...provider,
                status: isSuccess ? "connected" : "error",
                lastTested: new Date().toLocaleString("pt-BR"),
              }
            : provider,
        ),
      );
    }, 2000);
  };

  const handleUserAction = (userId: number, action: string) => {
    setUsers((prev) =>
      prev.map((user) => {
        if (user.id === userId) {
          switch (action) {
            case "ban":
              return { ...user, status: "banned" as const };
            case "activate":
              return { ...user, status: "active" as const };
            case "premium":
              return { ...user, plan: "premium" as const };
            case "free":
              return { ...user, plan: "free" as const };
            default:
              return user;
          }
        }
        return user;
      }),
    );
  };

  const handlePromoteToPremium = (userId: number) => {
    const user = users.find((u) => u.id === userId);
    if (!user) return;

    const confirm = window.confirm(
      `Tem certeza que deseja promover ${user.name} para Premium gratuitamente?\n\nEsta ação não gerará cobrança.`,
    );

    if (confirm) {
      handleUserAction(userId, "premium");
      // Toast ou notificação de sucesso poderia ser adicionada aqui
      alert(`${user.name} foi promovido para Premium com sucesso!`);
    }
  };

  const handleDeleteUser = (userId: number) => {
    const confirm = window.confirm(
      "Tem certeza que deseja excluir este usuário?",
    );
    if (confirm) {
      setUsers((prev) => prev.filter((user) => user.id !== userId));
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-700">Ativo</Badge>;
      case "inactive":
        return <Badge className="bg-yellow-100 text-yellow-700">Inativo</Badge>;
      case "banned":
        return <Badge className="bg-red-100 text-red-700">Banido</Badge>;
      default:
        return <Badge variant="outline">Desconhecido</Badge>;
    }
  };

  const getPlanBadge = (plan: string) => {
    return plan === "premium" ? (
      <Badge className="bg-yellow-100 text-yellow-700">Premium</Badge>
    ) : (
      <Badge variant="outline">Gratuito</Badge>
    );
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-foreground flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-600 rounded-lg flex items-center justify-center">
                    <Shield className="h-5 w-5 text-white" />
                  </div>
                  Painel de Administração
                </h1>
                <p className="text-sm text-muted-foreground">
                  Controle total do sistema StudyAI
                </p>
              </div>

              <Button className="bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 text-white">
                <RefreshCw className="h-4 w-4 mr-2" />
                Sincronizar Dados
              </Button>
            </div>
          </div>
        </div>

        {/* Conteúdo principal */}
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-6"
          >
            <TabsList className="grid w-full grid-cols-7 bg-red-100">
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Visão Geral
              </TabsTrigger>
              <TabsTrigger value="users" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Usuários
              </TabsTrigger>
              <TabsTrigger value="system" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Sistema
              </TabsTrigger>
              <TabsTrigger value="ai" className="flex items-center gap-2">
                <Brain className="h-4 w-4" />
                IA
              </TabsTrigger>
              <TabsTrigger value="storage" className="flex items-center gap-2">
                <Cloud className="h-4 w-4" />
                Storage
              </TabsTrigger>
              <TabsTrigger value="visual" className="flex items-center gap-2">
                <Palette className="h-4 w-4" />
                Visual
              </TabsTrigger>
              <TabsTrigger value="database" className="flex items-center gap-2">
                <Database className="h-4 w-4" />
                Banco
              </TabsTrigger>
            </TabsList>

            {/* Visão Geral */}
            <TabsContent value="overview">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          Total de Usuários
                        </p>
                        <p className="text-2xl font-bold text-foreground">
                          1,234
                        </p>
                      </div>
                      <Users className="h-8 w-8 text-blue-600" />
                    </div>
                    <div className="mt-2 flex items-center text-sm text-green-600">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      +12.5% este mês
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          Usuários Premium
                        </p>
                        <p className="text-2xl font-bold text-foreground">
                          423
                        </p>
                      </div>
                      <DollarSign className="h-8 w-8 text-yellow-600" />
                    </div>
                    <div className="mt-2 flex items-center text-sm text-green-600">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      +8.3% este mês
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          Gerações IA
                        </p>
                        <p className="text-2xl font-bold text-foreground">
                          15.6K
                        </p>
                      </div>
                      <Brain className="h-8 w-8 text-purple-600" />
                    </div>
                    <div className="mt-2 flex items-center text-sm text-green-600">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      +23.1% este mês
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          Status Sistema
                        </p>
                        <p className="text-2xl font-bold text-green-600">
                          Saudável
                        </p>
                      </div>
                      <Activity className="h-8 w-8 text-green-600" />
                    </div>
                    <div className="mt-2 flex items-center text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Todos os serviços OK
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Atividade Recente</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        {
                          action: "Novo usuário registrado",
                          user: "maria@email.com",
                          time: "2 min atrás",
                        },
                        {
                          action: "Upgrade para Premium",
                          user: "joao@email.com",
                          time: "15 min atrás",
                        },
                        {
                          action: "Geração de resumo",
                          user: "pedro@email.com",
                          time: "1h atrás",
                        },
                        {
                          action: "Login realizado",
                          user: "ana@email.com",
                          time: "2h atrás",
                        },
                      ].map((activity, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between py-2 border-b last:border-0"
                        >
                          <div>
                            <p className="text-sm font-medium">
                              {activity.action}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {activity.user}
                            </p>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {activity.time}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Alertas do Sistema</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                        <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-yellow-800">
                            Alto uso de API
                          </p>
                          <p className="text-xs text-yellow-700">
                            95% do limite mensal atingido
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-green-800">
                            Backup concluído
                          </p>
                          <p className="text-xs text-green-700">
                            Último backup: hoje ��s 03:00
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Gerenciamento de Usuários */}
            <TabsContent value="users">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Gerenciamento de Usuários</CardTitle>
                      <CardDescription>
                        Visualize e gerencie todos os usuários do sistema
                      </CardDescription>
                    </div>
                    <Button className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white">
                      <UserPlus className="h-4 w-4 mr-2" />
                      Novo Usuário
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">Usuário</th>
                          <th className="text-left p-2">Plano</th>
                          <th className="text-left p-2">Status</th>
                          <th className="text-left p-2">Última Atividade</th>
                          <th className="text-left p-2">Ações</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((user) => (
                          <tr
                            key={user.id}
                            className="border-b hover:bg-muted/50"
                          >
                            <td className="p-2">
                              <div>
                                <p className="font-medium">{user.name}</p>
                                <p className="text-sm text-muted-foreground">
                                  {user.email}
                                </p>
                              </div>
                            </td>
                            <td className="p-2">{getPlanBadge(user.plan)}</td>
                            <td className="p-2">
                              {getStatusBadge(user.status)}
                            </td>
                            <td className="p-2 text-sm text-muted-foreground">
                              {new Date(user.lastActive).toLocaleDateString(
                                "pt-BR",
                              )}
                            </td>
                            <td className="p-2">
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() =>
                                    handleUserAction(
                                      user.id,
                                      user.status === "active"
                                        ? "ban"
                                        : "activate",
                                    )
                                  }
                                >
                                  {user.status === "active"
                                    ? "Banir"
                                    : "Ativar"}
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() =>
                                    handleUserAction(
                                      user.id,
                                      user.plan === "free" ? "premium" : "free",
                                    )
                                  }
                                >
                                  {user.plan === "free"
                                    ? "Premium"
                                    : "Gratuito"}
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => handleDeleteUser(user.id)}
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Configurações do Sistema */}
            <TabsContent value="system">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Configurações Gerais</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Nome do Site</Label>
                      <Input
                        value={systemSettings.siteName}
                        onChange={(e) =>
                          handleSystemUpdate("siteName", e.target.value)
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>E-mail de Suporte</Label>
                      <Input
                        value={systemSettings.supportEmail}
                        onChange={(e) =>
                          handleSystemUpdate("supportEmail", e.target.value)
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Modo Manutenção</Label>
                        <p className="text-sm text-muted-foreground">
                          Desabilita acesso ao site
                        </p>
                      </div>
                      <Switch
                        checked={systemSettings.maintenanceMode}
                        onCheckedChange={(checked) =>
                          handleSystemUpdate("maintenanceMode", checked)
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Registros Habilitados</Label>
                        <p className="text-sm text-muted-foreground">
                          Permite novos cadastros
                        </p>
                      </div>
                      <Switch
                        checked={systemSettings.registrationsEnabled}
                        onCheckedChange={(checked) =>
                          handleSystemUpdate("registrationsEnabled", checked)
                        }
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Configurações de Planos</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Limite Gerações Gratuitas</Label>
                      <Input
                        type="number"
                        value={systemSettings.maxFreeGenerations}
                        onChange={(e) =>
                          handleSystemUpdate(
                            "maxFreeGenerations",
                            parseInt(e.target.value),
                          )
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Preço Premium (R$)</Label>
                      <Input
                        type="number"
                        step="0.01"
                        value={systemSettings.premiumPrice}
                        onChange={(e) =>
                          handleSystemUpdate(
                            "premiumPrice",
                            parseFloat(e.target.value),
                          )
                        }
                      />
                    </div>

                    <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white">
                      Salvar Configurações
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Configurações de IA */}
            <TabsContent value="ai">
              <Card>
                <CardHeader>
                  <CardTitle>Configurações de IA</CardTitle>
                  <CardDescription>
                    Configure os modelos e parâmetros de IA
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Modelo Padrão</Label>
                      <Select
                        value={aiSettings.defaultModel}
                        onValueChange={(value) =>
                          handleAiUpdate("defaultModel", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="gpt-4">GPT-4</SelectItem>
                          <SelectItem value="gpt-3.5">GPT-3.5 Turbo</SelectItem>
                          <SelectItem value="claude">Claude 3</SelectItem>
                          <SelectItem value="gemini">Gemini Pro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Máximo de Tokens</Label>
                      <Input
                        type="number"
                        value={aiSettings.maxTokens}
                        onChange={(e) =>
                          handleAiUpdate("maxTokens", parseInt(e.target.value))
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Temperatura (0-1)</Label>
                      <Input
                        type="number"
                        step="0.1"
                        min="0"
                        max="1"
                        value={aiSettings.temperature}
                        onChange={(e) =>
                          handleAiUpdate(
                            "temperature",
                            parseFloat(e.target.value),
                          )
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Limite Premium/Dia</Label>
                      <Input
                        type="number"
                        value={aiSettings.rateLimitPremium}
                        onChange={(e) =>
                          handleAiUpdate(
                            "rateLimitPremium",
                            parseInt(e.target.value),
                          )
                        }
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Habilitar Visão IA</Label>
                      <p className="text-sm text-muted-foreground">
                        Permite análise de imagens
                      </p>
                    </div>
                    <Switch
                      checked={aiSettings.enableVision}
                      onCheckedChange={(checked) =>
                        handleAiUpdate("enableVision", checked)
                      }
                    />
                  </div>

                  <Button className="w-full bg-gradient-to-r from-purple-500 to-violet-600 text-white">
                    <Brain className="h-4 w-4 mr-2" />
                    Atualizar Configurações IA
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Configurações de Storage */}
            <TabsContent value="storage">
              <div className="space-y-6">
                {/* Resumo dos Storage Providers */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">
                            Provedores Ativos
                          </p>
                          <p className="text-2xl font-bold text-foreground">
                            {
                              storageProviders.filter(
                                (p) => p.status === "connected",
                              ).length
                            }
                          </p>
                        </div>
                        <Cloud className="h-8 w-8 text-blue-600" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">
                            Storage Primário
                          </p>
                          <p className="text-lg font-semibold text-foreground">
                            {storageProviders.find((p) => p.isPrimary)?.name ||
                              "Nenhum"}
                          </p>
                        </div>
                        <HardDrive className="h-8 w-8 text-green-600" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">
                            Backups Configurados
                          </p>
                          <p className="text-2xl font-bold text-foreground">
                            {storageProviders.filter((p) => p.isBackup).length}
                          </p>
                        </div>
                        <Shield className="h-8 w-8 text-yellow-600" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Lista de Storage Providers */}
                <Card>
                  <CardHeader>
                    <CardTitle>Provedores de Storage</CardTitle>
                    <CardDescription>
                      Gerencie os serviços de armazenamento para arquivos dos
                      usuários
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {storageProviders.map((provider) => (
                      <div
                        key={provider.id}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            {provider.type === "aws-s3" && (
                              <Cloud className="h-5 w-5 text-orange-600" />
                            )}
                            {provider.type === "google-cloud" && (
                              <Cloud className="h-5 w-5 text-blue-600" />
                            )}
                            {provider.type === "azure-blob" && (
                              <Cloud className="h-5 w-5 text-blue-800" />
                            )}
                            {provider.type === "local" && (
                              <HardDrive className="h-5 w-5 text-gray-600" />
                            )}
                            {provider.type === "minio" && (
                              <Database className="h-5 w-5 text-red-600" />
                            )}
                            <div>
                              <div className="flex items-center gap-2">
                                <p className="font-medium">{provider.name}</p>
                                {provider.isPrimary && (
                                  <Badge className="bg-green-100 text-green-700">
                                    Primário
                                  </Badge>
                                )}
                                {provider.isBackup && (
                                  <Badge className="bg-blue-100 text-blue-700">
                                    Backup
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {provider.type.toUpperCase()} • Último teste:{" "}
                                {provider.lastTested}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            {provider.status === "connected" && (
                              <>
                                <Wifi className="h-4 w-4 text-green-600" />
                                <span className="text-sm text-green-600">
                                  Conectado
                                </span>
                              </>
                            )}
                            {provider.status === "disconnected" && (
                              <>
                                <WifiOff className="h-4 w-4 text-gray-600" />
                                <span className="text-sm text-gray-600">
                                  Desconectado
                                </span>
                              </>
                            )}
                            {provider.status === "error" && (
                              <>
                                <XCircle className="h-4 w-4 text-red-600" />
                                <span className="text-sm text-red-600">
                                  Erro
                                </span>
                              </>
                            )}
                          </div>

                          <div className="flex gap-1">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() =>
                                handleTestStorageConnection(provider.id)
                              }
                            >
                              <RefreshCw className="h-4 w-4" />
                            </Button>

                            {!provider.isPrimary && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() =>
                                  handleSetPrimaryStorage(provider.id)
                                }
                              >
                                Definir Primário
                              </Button>
                            )}

                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                const updates = {
                                  isBackup: !provider.isBackup,
                                };
                                handleStorageUpdate(provider.id, updates);
                              }}
                            >
                              {provider.isBackup
                                ? "Remover Backup"
                                : "Definir Backup"}
                            </Button>

                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() =>
                                handleDeleteStorageProvider(provider.id)
                              }
                              disabled={provider.isPrimary}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Adicionar Novo Provider */}
                <Card>
                  <CardHeader>
                    <CardTitle>Adicionar Novo Provedor</CardTitle>
                    <CardDescription>
                      Configure um novo serviço de storage
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Nome do Provedor</Label>
                        <Input
                          placeholder="Ex: AWS S3 Principal"
                          value={newProvider.name}
                          onChange={(e) =>
                            setNewProvider((prev) => ({
                              ...prev,
                              name: e.target.value,
                            }))
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Tipo de Storage</Label>
                        <Select
                          value={newProvider.type}
                          onValueChange={(value) =>
                            setNewProvider((prev) => ({
                              ...prev,
                              type: value as StorageProvider["type"],
                            }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="aws-s3">AWS S3</SelectItem>
                            <SelectItem value="google-cloud">
                              Google Cloud Storage
                            </SelectItem>
                            <SelectItem value="azure-blob">
                              Azure Blob Storage
                            </SelectItem>
                            <SelectItem value="minio">MinIO</SelectItem>
                            <SelectItem value="local">Local Storage</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Configurações específicas por tipo */}
                    {newProvider.type !== "local" && (
                      <div className="space-y-4 p-4 bg-muted/50 rounded-lg">
                        <h4 className="font-medium">
                          Configurações de Conexão
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Access Key / ID</Label>
                            <Input
                              placeholder="Access Key"
                              value={newProvider.config?.accessKey || ""}
                              onChange={(e) =>
                                setNewProvider((prev) => ({
                                  ...prev,
                                  config: {
                                    ...prev.config,
                                    accessKey: e.target.value,
                                  },
                                }))
                              }
                            />
                          </div>

                          <div className="space-y-2">
                            <Label>Secret Key</Label>
                            <Input
                              type="password"
                              placeholder="Secret Key"
                              value={newProvider.config?.secretKey || ""}
                              onChange={(e) =>
                                setNewProvider((prev) => ({
                                  ...prev,
                                  config: {
                                    ...prev.config,
                                    secretKey: e.target.value,
                                  },
                                }))
                              }
                            />
                          </div>

                          <div className="space-y-2">
                            <Label>Bucket / Container</Label>
                            <Input
                              placeholder="Nome do bucket"
                              value={newProvider.config?.bucket || ""}
                              onChange={(e) =>
                                setNewProvider((prev) => ({
                                  ...prev,
                                  config: {
                                    ...prev.config,
                                    bucket: e.target.value,
                                  },
                                }))
                              }
                            />
                          </div>

                          <div className="space-y-2">
                            <Label>Região</Label>
                            <Input
                              placeholder="us-east-1"
                              value={newProvider.config?.region || ""}
                              onChange={(e) =>
                                setNewProvider((prev) => ({
                                  ...prev,
                                  config: {
                                    ...prev.config,
                                    region: e.target.value,
                                  },
                                }))
                              }
                            />
                          </div>

                          {newProvider.type === "minio" && (
                            <div className="space-y-2 md:col-span-2">
                              <Label>Endpoint</Label>
                              <Input
                                placeholder="https://minio.exemplo.com"
                                value={newProvider.config?.endpoint || ""}
                                onChange={(e) =>
                                  setNewProvider((prev) => ({
                                    ...prev,
                                    config: {
                                      ...prev.config,
                                      endpoint: e.target.value,
                                    },
                                  }))
                                }
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {newProvider.type === "local" && (
                      <div className="space-y-4 p-4 bg-muted/50 rounded-lg">
                        <h4 className="font-medium">Configurações Local</h4>
                        <div className="space-y-2">
                          <Label>Caminho no Servidor</Label>
                          <Input
                            placeholder="/var/www/uploads"
                            value={newProvider.config?.path || ""}
                            onChange={(e) =>
                              setNewProvider((prev) => ({
                                ...prev,
                                config: {
                                  ...prev.config,
                                  path: e.target.value,
                                },
                              }))
                            }
                          />
                        </div>
                      </div>
                    )}

                    <Button
                      onClick={handleAddStorageProvider}
                      className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 text-white"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Adicionar Provedor de Storage
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Configurações Visuais */}
            <TabsContent value="visual">
              <Card>
                <CardHeader>
                  <CardTitle>Personalização Visual</CardTitle>
                  <CardDescription>
                    Customize a aparência do sistema
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Cor Primária</Label>
                      <div className="flex gap-2">
                        <Input
                          type="color"
                          value={systemSettings.primaryColor}
                          onChange={(e) =>
                            handleSystemUpdate("primaryColor", e.target.value)
                          }
                          className="w-20"
                        />
                        <Input
                          value={systemSettings.primaryColor}
                          onChange={(e) =>
                            handleSystemUpdate("primaryColor", e.target.value)
                          }
                          className="flex-1"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Cor Secundária</Label>
                      <div className="flex gap-2">
                        <Input
                          type="color"
                          value={systemSettings.secondaryColor}
                          onChange={(e) =>
                            handleSystemUpdate("secondaryColor", e.target.value)
                          }
                          className="w-20"
                        />
                        <Input
                          value={systemSettings.secondaryColor}
                          onChange={(e) =>
                            handleSystemUpdate("secondaryColor", e.target.value)
                          }
                          className="flex-1"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg bg-muted/30">
                    <h4 className="font-medium mb-2">Preview das Cores</h4>
                    <div className="flex gap-4">
                      <div
                        className="w-16 h-16 rounded-lg shadow-lg flex items-center justify-center text-white font-medium"
                        style={{ backgroundColor: systemSettings.primaryColor }}
                      >
                        Primary
                      </div>
                      <div
                        className="w-16 h-16 rounded-lg shadow-lg flex items-center justify-center text-white font-medium"
                        style={{
                          backgroundColor: systemSettings.secondaryColor,
                        }}
                      >
                        Secondary
                      </div>
                    </div>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-pink-500 to-rose-600 text-white">
                    <Palette className="h-4 w-4 mr-2" />
                    Aplicar Mudanças Visuais
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Banco de Dados */}
            <TabsContent value="database">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Backup e Restauração</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <Button className="w-full" variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Fazer Backup Completo
                      </Button>
                      <Button className="w-full" variant="outline">
                        <Upload className="h-4 w-4 mr-2" />
                        Restaurar Backup
                      </Button>
                    </div>

                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <p className="text-sm text-blue-800">
                        <strong>Último backup:</strong> 15/12/2024 às 03:00
                      </p>
                      <p className="text-xs text-blue-700 mt-1">
                        Backup automático: Diário às 03:00
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Estatísticas do Banco</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm">Total de Usuários:</span>
                        <span className="font-medium">1,234</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Resumos Gerados:</span>
                        <span className="font-medium">5,678</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Flashcards Criados:</span>
                        <span className="font-medium">12,456</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Tamanho do Banco:</span>
                        <span className="font-medium">2.3 GB</span>
                      </div>
                    </div>

                    <Button className="w-full bg-gradient-to-r from-indigo-500 to-blue-600 text-white">
                      <Database className="h-4 w-4 mr-2" />
                      Otimizar Banco de Dados
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
}
