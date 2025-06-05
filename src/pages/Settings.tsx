import { useState } from "react";
import {
  ArrowLeft,
  Settings as SettingsIcon,
  User,
  Palette,
  Eye,
  Brain,
  Shield,
  Save,
  Moon,
  Sun,
  Monitor,
  Globe,
  Lock,
  Mail,
  Download,
  Trash2,
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
import { MainLayout } from "@/components/layout/MainLayout";
import { cn } from "@/lib/utils";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("profile");
  const [settings, setSettings] = useState({
    // Perfil
    name: "João Silva",
    email: "joao.silva@email.com",
    language: "pt-BR",

    // Aparência
    theme: "light",
    customColor: "burnt",

    // Acessibilidade
    fontSize: "medium",
    readingMode: false,
    highContrast: false,

    // IA
    preferredAI: "gpt-4",
    generationStyle: "balanced",

    // Privacidade
    dataCollection: true,
    analytics: true,
  });

  const handleBackToDashboard = () => {
    window.history.back();
  };

  const handleSaveSettings = () => {
    console.log("Salvando configurações:", settings);
    // Aqui implementaria a lógica de salvamento
  };

  const handleExportData = () => {
    console.log("Exportando dados do usuário");
  };

  const handleDeleteAccount = () => {
    console.log("Deletar conta - implementar confirmação");
  };

  const updateSetting = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const colorOptions = [
    { value: "burnt", label: "Burnt Orange", class: "bg-burnt-500" },
    { value: "blue", label: "Azul", class: "bg-blue-500" },
    { value: "green", label: "Verde", class: "bg-green-500" },
    { value: "purple", label: "Roxo", class: "bg-purple-500" },
    { value: "red", label: "Vermelho", class: "bg-red-500" },
  ];

  return (
    <MainLayout>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
          <div className="max-w-4xl mx-auto px-4 py-4">
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
                    <div className="w-10 h-10 bg-gradient-to-br from-burnt-500 to-terracotta-600 rounded-lg flex items-center justify-center">
                      <SettingsIcon className="h-5 w-5 text-white" />
                    </div>
                    Configurações
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    Personalize sua experiência no StudyAI
                  </p>
                </div>
              </div>

              <Button
                onClick={handleSaveSettings}
                className="bg-gradient-to-r from-burnt-500 to-terracotta-600 hover:from-burnt-600 hover:to-terracotta-700 text-white"
              >
                <Save className="h-4 w-4 mr-2" />
                Salvar Alterações
              </Button>
            </div>
          </div>
        </div>

        {/* Conteúdo principal */}
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-6"
          >
            <TabsList className="grid w-full grid-cols-5 bg-burnt-100">
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Perfil
              </TabsTrigger>
              <TabsTrigger
                value="appearance"
                className="flex items-center gap-2"
              >
                <Palette className="h-4 w-4" />
                Aparência
              </TabsTrigger>
              <TabsTrigger
                value="accessibility"
                className="flex items-center gap-2"
              >
                <Eye className="h-4 w-4" />
                Acessibilidade
              </TabsTrigger>
              <TabsTrigger value="ai" className="flex items-center gap-2">
                <Brain className="h-4 w-4" />
                IA
              </TabsTrigger>
              <TabsTrigger value="privacy" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Privacidade
              </TabsTrigger>
            </TabsList>

            {/* Aba Perfil */}
            <TabsContent value="profile">
              <Card className="border-burnt-200/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5 text-burnt-600" />
                    Informações do Perfil
                  </CardTitle>
                  <CardDescription>
                    Gerencie suas informações pessoais e preferências de conta
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome Completo</Label>
                      <Input
                        id="name"
                        value={settings.name}
                        onChange={(e) => updateSetting("name", e.target.value)}
                        placeholder="Seu nome completo"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">E-mail</Label>
                      <Input
                        id="email"
                        type="email"
                        value={settings.email}
                        onChange={(e) => updateSetting("email", e.target.value)}
                        placeholder="seu@email.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Alterar Senha</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Nova senha (deixe em branco para manter a atual)"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="language">Idioma Preferido</Label>
                    <Select
                      value={settings.language}
                      onValueChange={(value) =>
                        updateSetting("language", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pt-BR">
                          🇧🇷 Português (Brasil)
                        </SelectItem>
                        <SelectItem value="en-US">🇺🇸 English (US)</SelectItem>
                        <SelectItem value="es-ES">🇪🇸 Español</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Aba Aparência */}
            <TabsContent value="appearance">
              <Card className="border-burnt-200/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="h-5 w-5 text-burnt-600" />
                    Preferências de Aparência
                  </CardTitle>
                  <CardDescription>
                    Personalize a aparência da interface
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <Label>Tema</Label>
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { value: "light", label: "Claro", icon: Sun },
                        { value: "dark", label: "Escuro", icon: Moon },
                        { value: "system", label: "Sistema", icon: Monitor },
                      ].map((theme) => (
                        <div
                          key={theme.value}
                          className={cn(
                            "flex flex-col items-center gap-2 p-4 border rounded-lg cursor-pointer transition-all",
                            settings.theme === theme.value
                              ? "border-burnt-300 bg-burnt-50"
                              : "border-border hover:border-burnt-200",
                          )}
                          onClick={() => updateSetting("theme", theme.value)}
                        >
                          <theme.icon className="h-6 w-6" />
                          <span className="text-sm font-medium">
                            {theme.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label>Cor Principal</Label>
                    <div className="grid grid-cols-5 gap-3">
                      {colorOptions.map((color) => (
                        <div
                          key={color.value}
                          className={cn(
                            "flex flex-col items-center gap-2 p-3 border rounded-lg cursor-pointer transition-all",
                            settings.customColor === color.value
                              ? "border-burnt-300 bg-burnt-50"
                              : "border-border hover:border-burnt-200",
                          )}
                          onClick={() =>
                            updateSetting("customColor", color.value)
                          }
                        >
                          <div
                            className={cn("w-6 h-6 rounded-full", color.class)}
                          />
                          <span className="text-xs">{color.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Aba Acessibilidade */}
            <TabsContent value="accessibility">
              <Card className="border-burnt-200/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="h-5 w-5 text-burnt-600" />
                    Configurações de Acessibilidade
                  </CardTitle>
                  <CardDescription>
                    Ajuste a interface para melhor experiência de uso
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="fontSize">Tamanho da Fonte</Label>
                    <Select
                      value={settings.fontSize}
                      onValueChange={(value) =>
                        updateSetting("fontSize", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Pequeno</SelectItem>
                        <SelectItem value="medium">Médio</SelectItem>
                        <SelectItem value="large">Grande</SelectItem>
                        <SelectItem value="extra-large">
                          Muito Grande
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Modo Leitura</Label>
                      <p className="text-sm text-muted-foreground">
                        Ativa fonte mais legível e espaçamento otimizado
                      </p>
                    </div>
                    <Switch
                      checked={settings.readingMode}
                      onCheckedChange={(checked) =>
                        updateSetting("readingMode", checked)
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Alto Contraste</Label>
                      <p className="text-sm text-muted-foreground">
                        Aumenta o contraste para melhor visibilidade
                      </p>
                    </div>
                    <Switch
                      checked={settings.highContrast}
                      onCheckedChange={(checked) =>
                        updateSetting("highContrast", checked)
                      }
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Aba IA */}
            <TabsContent value="ai">
              <Card className="border-burnt-200/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-burnt-600" />
                    Preferências de IA
                  </CardTitle>
                  <CardDescription>
                    Configure como a IA deve gerar e processar seu conteúdo
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="preferredAI">IA Preferida</Label>
                    <Select
                      value={settings.preferredAI}
                      onValueChange={(value) =>
                        updateSetting("preferredAI", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gpt-4">
                          GPT-4 (Mais Avançado)
                        </SelectItem>
                        <SelectItem value="gpt-3.5">
                          GPT-3.5 (Mais Rápido)
                        </SelectItem>
                        <SelectItem value="claude">
                          Claude (Mais Criativo)
                        </SelectItem>
                        <SelectItem value="gemini">
                          Gemini (Mais Analítico)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="generationStyle">Estilo de Geração</Label>
                    <Select
                      value={settings.generationStyle}
                      onValueChange={(value) =>
                        updateSetting("generationStyle", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="concise">
                          Conciso (Mais direto)
                        </SelectItem>
                        <SelectItem value="balanced">
                          Equilibrado (Padrão)
                        </SelectItem>
                        <SelectItem value="detailed">
                          Detalhado (Mais completo)
                        </SelectItem>
                        <SelectItem value="creative">
                          Criativo (Mais dinâmico)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="p-4 bg-burnt-50 rounded-lg border border-burnt-200">
                    <h4 className="font-medium text-foreground mb-2">
                      💡 Dica
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      As configurações de IA podem ser alteradas a qualquer
                      momento e afetam apenas os novos conteúdos gerados.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Aba Privacidade */}
            <TabsContent value="privacy">
              <Card className="border-burnt-200/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-burnt-600" />
                    Privacidade e Dados
                  </CardTitle>
                  <CardDescription>
                    Controle seus dados e privacidade na plataforma
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Coleta de Dados para Melhorias</Label>
                      <p className="text-sm text-muted-foreground">
                        Permite que coletemos dados anônimos para melhorar o
                        serviço
                      </p>
                    </div>
                    <Switch
                      checked={settings.dataCollection}
                      onCheckedChange={(checked) =>
                        updateSetting("dataCollection", checked)
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Analytics e Estatísticas</Label>
                      <p className="text-sm text-muted-foreground">
                        Habilita coleta de estatísticas de uso para análises
                      </p>
                    </div>
                    <Switch
                      checked={settings.analytics}
                      onCheckedChange={(checked) =>
                        updateSetting("analytics", checked)
                      }
                    />
                  </div>

                  <div className="border-t pt-6 space-y-4">
                    <h4 className="font-medium text-foreground">
                      Gerenciar Dados
                    </h4>

                    <div className="space-y-3">
                      <Button
                        variant="outline"
                        onClick={handleExportData}
                        className="w-full justify-start border-burnt-300 text-burnt-600 hover:bg-burnt-50"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Exportar Meus Dados
                      </Button>

                      <Button
                        variant="outline"
                        onClick={handleDeleteAccount}
                        className="w-full justify-start border-red-300 text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Excluir Conta Permanentemente
                      </Button>
                    </div>

                    <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                      <h4 className="font-medium text-red-800 mb-2">
                        ⚠️ Atenção
                      </h4>
                      <p className="text-sm text-red-700">
                        A exclusão da conta é permanente e não pode ser
                        desfeita. Todos os seus dados serão removidos.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
}
