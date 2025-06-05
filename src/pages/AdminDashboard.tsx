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
  Crown,
  User,
  Eye,
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MainLayout } from "@/components/layout/MainLayout";
import { VisualColorPicker } from "@/components/admin/VisualColorPicker";
import { cn } from "@/lib/utils";

interface User {
  id: number;
  name: string;
  email: string;
  plan: "free" | "premium" | "premium-admin";
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
    plan: "premium-admin",
    status: "active",
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

  // Estados para modal de novo usuário
  const [showNewUserModal, setShowNewUserModal] = useState(false);
  const [isCreatingUser, setIsCreatingUser] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    plan: "free" as "free" | "premium" | "premium-admin",
    role: "user" as "user" | "admin",
    password: "",
    confirmPassword: "",
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
            case "premium-admin":
              return { ...user, plan: "premium-admin" as const };
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

  const handleDeleteUser = (userId: number) => {
    const confirm = window.confirm(
      "Tem certeza que deseja excluir este usuário?",
    );
    if (confirm) {
      setUsers((prev) => prev.filter((user) => user.id !== userId));
    }
  };

  const handlePromoteToPremium = (userId: number) => {
    const user = users.find((u) => u.id === userId);
    if (!user) return;

    const confirm = window.confirm(
      `Tem certeza que deseja promover ${user.name} para Premium gratuitamente?\n\nEsta ação não gerará cobrança.`,
    );

    if (confirm) {
      handleUserAction(userId, "premium");
      alert(`${user.name} foi promovido para Premium com sucesso!`);
    }
  };

  const handlePromoteToPremiumAdmin = (userId: number) => {
    const user = users.find((u) => u.id === userId);
    if (!user) return;

    const confirm = window.confirm(
      `Tem certeza que deseja conceder Premium Gratuito para ${user.name}?\n\nEste é um plano especial que só pode ser oferecido por administradores.\nO usuário terá acesso completo aos recursos premium sem custos.`,
    );

    if (confirm) {
      handleUserAction(userId, "premium-admin");
      alert(`${user.name} recebeu o plano Premium Gratuito com sucesso!`);
    }
  };

  const handleCreateUser = async () => {
    // Validações
    if (!newUser.name || !newUser.email || !newUser.password) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    if (newUser.password !== newUser.confirmPassword) {
      alert("As senhas não coincidem.");
      return;
    }

    if (newUser.password.length < 6) {
      alert("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    // Verificar se email já existe
    if (users.some((user) => user.email === newUser.email)) {
      alert("Este email já está em uso.");
      return;
    }

    setIsCreatingUser(true);

    try {
      // Simular criação de usuário
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const newUserData: User = {
        id: Date.now(),
        name: newUser.name,
        email: newUser.email,
        plan: newUser.plan,
        status: "active",
        joinDate: new Date().toISOString().split("T")[0],
        lastActive: new Date().toISOString().split("T")[0],
      };

      setUsers((prev) => [...prev, newUserData]);

      // Resetar formulário
      setNewUser({
        name: "",
        email: "",
        plan: "free",
        role: "user",
        password: "",
        confirmPassword: "",
      });

      setShowNewUserModal(false);

      const roleText = newUser.role === "admin" ? "Administrador" : "Usuário";
      const planText =
        newUser.plan === "premium"
          ? "Premium"
          : newUser.plan === "premium-admin"
            ? "Premium Gratuito"
            : "Gratuito";

      alert(
        `Usuário ${newUser.name} (${roleText} - ${planText}) criado com sucesso!`,
      );
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      alert("Erro ao criar usuário. Tente novamente.");
    } finally {
      setIsCreatingUser(false);
    }
  };

  const handleCancelNewUser = () => {
    if (newUser.name || newUser.email || newUser.password) {
      const confirm = window.confirm(
        "Tem certeza que deseja cancelar? Os dados serão perdidos.",
      );
      if (!confirm) return;
    }

    setNewUser({
      name: "",
      email: "",
      plan: "free",
      role: "user",
      password: "",
      confirmPassword: "",
    });
    setShowNewUserModal(false);
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
    switch (plan) {
      case "premium":
        return <Badge className="bg-yellow-100 text-yellow-700">Premium</Badge>;
      case "premium-admin":
        return (
          <Badge className="bg-green-100 text-green-700 border-green-200">
            Premium Gratuito
          </Badge>
        );
      case "free":
        return <Badge variant="outline">Gratuito</Badge>;
      default:
        return <Badge variant="outline">Desconhecido</Badge>;
    }
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  Painel Administrativo
                </h1>
                <p className="text-muted-foreground">
                  Gerencie usuários, configurações e sistema
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
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
                          {users.length}
                        </p>
                      </div>
                      <Users className="h-8 w-8 text-blue-600" />
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
                          {
                            users.filter(
                              (u) =>
                                u.plan === "premium" ||
                                u.plan === "premium-admin",
                            ).length
                          }
                        </p>
                      </div>
                      <Crown className="h-8 w-8 text-yellow-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          Storage Ativo
                        </p>
                        <p className="text-2xl font-bold text-foreground">
                          {
                            storageProviders.filter(
                              (p) => p.status === "connected",
                            ).length
                          }
                        </p>
                      </div>
                      <Cloud className="h-8 w-8 text-green-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          Sistema
                        </p>
                        <p className="text-2xl font-bold text-foreground">
                          Online
                        </p>
                      </div>
                      <Activity className="h-8 w-8 text-green-600" />
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
                        Gerencie contas de usuário, planos e permissões
                      </CardDescription>
                    </div>
                    <Button
                      onClick={() => setShowNewUserModal(true)}
                      className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white"
                    >
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
                          <th className="text-left p-2">Último Acesso</th>
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
                              <div className="flex gap-2 flex-wrap">
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
                                {user.plan === "free" ? (
                                  <>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      className="bg-yellow-50 border-yellow-200 text-yellow-700 hover:bg-yellow-100"
                                      onClick={() =>
                                        handlePromoteToPremium(user.id)
                                      }
                                    >
                                      <Crown className="h-3 w-3 mr-1" />
                                      Premium Pago
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      className="bg-green-50 border-green-200 text-green-700 hover:bg-green-100"
                                      onClick={() =>
                                        handlePromoteToPremiumAdmin(user.id)
                                      }
                                    >
                                      <Crown className="h-3 w-3 mr-1" />
                                      Premium Grátis
                                    </Button>
                                  </>
                                ) : user.plan === "premium" ? (
                                  <>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() =>
                                        handleUserAction(user.id, "free")
                                      }
                                    >
                                      Rebaixar para Gratuito
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      className="bg-green-50 border-green-200 text-green-700 hover:bg-green-100"
                                      onClick={() =>
                                        handlePromoteToPremiumAdmin(user.id)
                                      }
                                    >
                                      Converter p/ Premium Grátis
                                    </Button>
                                  </>
                                ) : user.plan === "premium-admin" ? (
                                  <>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() =>
                                        handleUserAction(user.id, "free")
                                      }
                                    >
                                      Rebaixar para Gratuito
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      className="bg-yellow-50 border-yellow-200 text-yellow-700 hover:bg-yellow-100"
                                      onClick={() =>
                                        handleUserAction(user.id, "premium")
                                      }
                                    >
                                      Converter p/ Premium Pago
                                    </Button>
                                  </>
                                ) : null}
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
              <Card>
                <CardHeader>
                  <CardTitle>Configurações do Sistema</CardTitle>
                  <CardDescription>
                    Configure parâmetros gerais do sistema
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      <Label>Email de Suporte</Label>
                      <Input
                        value={systemSettings.supportEmail}
                        onChange={(e) =>
                          handleSystemUpdate("supportEmail", e.target.value)
                        }
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Modo de Manutenção</Label>
                      <p className="text-sm text-muted-foreground">
                        Desativa temporariamente o acesso ao sistema
                      </p>
                    </div>
                    <Switch
                      checked={systemSettings.maintenanceMode}
                      onCheckedChange={(checked) =>
                        handleSystemUpdate("maintenanceMode", checked)
                      }
                    />
                  </div>

                  <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white">
                    Salvar Configurações
                  </Button>
                </CardContent>
              </Card>
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
              <Card>
                <CardHeader>
                  <CardTitle>Configuração de Storage</CardTitle>
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
                        <Cloud className="h-5 w-5 text-blue-600" />
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium">{provider.name}</p>
                            {provider.isPrimary && (
                              <Badge className="bg-green-100 text-green-700">
                                Primário
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {provider.type.toUpperCase()}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            handleTestStorageConnection(provider.id)
                          }
                        >
                          <RefreshCw className="h-4 w-4" />
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
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Configurações Visuais */}
            <TabsContent value="visual">
              <VisualColorPicker
                primaryColor={systemSettings.primaryColor}
                secondaryColor={systemSettings.secondaryColor}
                onPrimaryColorChange={(color) =>
                  handleSystemUpdate("primaryColor", color)
                }
                onSecondaryColorChange={(color) =>
                  handleSystemUpdate("secondaryColor", color)
                }
              />
            </TabsContent>

            {/* Configurações de Banco */}
            <TabsContent value="database">
              <Card>
                <CardHeader>
                  <CardTitle>Gerenciamento de Banco de Dados</CardTitle>
                  <CardDescription>
                    Ferramentas para backup, otimização e manutenção
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full bg-gradient-to-r from-indigo-500 to-blue-600 text-white">
                    <Database className="h-4 w-4 mr-2" />
                    Fazer Backup do Banco
                  </Button>
                  <Button className="w-full bg-gradient-to-r from-indigo-500 to-blue-600 text-white">
                    <Database className="h-4 w-4 mr-2" />
                    Otimizar Banco de Dados
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Modal de Novo Usuário */}
      {showNewUserModal && (
        <Dialog open={showNewUserModal} onOpenChange={setShowNewUserModal}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <UserPlus className="h-5 w-5 text-blue-600" />
                Criar Novo Usuário
              </DialogTitle>
              <DialogDescription>
                Adicione um novo usuário ao sistema com as permissões adequadas.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 py-4">
              <div className="space-y-4">
                <h3 className="font-medium text-lg">Informações Básicas</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="user-name">Nome Completo *</Label>
                    <Input
                      id="user-name"
                      placeholder="Ex: João Silva"
                      value={newUser.name}
                      onChange={(e) =>
                        setNewUser((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="user-email">E-mail *</Label>
                    <Input
                      id="user-email"
                      type="email"
                      placeholder="joao@email.com"
                      value={newUser.email}
                      onChange={(e) =>
                        setNewUser((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="user-password">Senha *</Label>
                    <Input
                      id="user-password"
                      type="password"
                      placeholder="Mínimo 6 caracteres"
                      value={newUser.password}
                      onChange={(e) =>
                        setNewUser((prev) => ({
                          ...prev,
                          password: e.target.value,
                        }))
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="user-confirm-password">
                      Confirmar Senha *
                    </Label>
                    <Input
                      id="user-confirm-password"
                      type="password"
                      placeholder="Digite a senha novamente"
                      value={newUser.confirmPassword}
                      onChange={(e) =>
                        setNewUser((prev) => ({
                          ...prev,
                          confirmPassword: e.target.value,
                        }))
                      }
                    />
                    {newUser.confirmPassword &&
                      newUser.password !== newUser.confirmPassword && (
                        <p className="text-xs text-red-600">
                          As senhas não coincidem
                        </p>
                      )}
                    {newUser.confirmPassword &&
                      newUser.password === newUser.confirmPassword &&
                      newUser.password && (
                        <p className="text-xs text-green-600">
                          ✓ Senhas coincidem
                        </p>
                      )}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium text-lg">Permissões e Plano</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="user-role">Tipo de Usuário</Label>
                    <Select
                      value={newUser.role}
                      onValueChange={(value: "user" | "admin") =>
                        setNewUser((prev) => ({ ...prev, role: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="user">👤 Usuário Padrão</SelectItem>
                        <SelectItem value="admin">🛡️ Administrador</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="user-plan">Plano de Assinatura</Label>
                    <Select
                      value={newUser.plan}
                      onValueChange={(
                        value: "free" | "premium" | "premium-admin",
                      ) => setNewUser((prev) => ({ ...prev, plan: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="free">🆓 Gratuito</SelectItem>
                        <SelectItem value="premium">👑 Premium</SelectItem>
                        <SelectItem value="premium-admin">
                          🎁 Premium Gratuito
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={handleCancelNewUser}
                  disabled={isCreatingUser}
                >
                  Cancelar
                </Button>
                <Button
                  onClick={handleCreateUser}
                  disabled={isCreatingUser}
                  className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white"
                >
                  {isCreatingUser ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Criando...
                    </>
                  ) : (
                    <>
                      <UserPlus className="h-4 w-4 mr-2" />
                      Criar Usuário
                    </>
                  )}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </MainLayout>
  );
}
