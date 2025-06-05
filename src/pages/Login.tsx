import { useState } from "react";
import {
  Brain,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Chrome,
  ArrowRight,
  UserPlus,
  KeyRound,
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
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    emailOrCpf: "",
    password: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simular login
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);

    // Redirecionar para dashboard
    window.location.href = "/";
  };

  const handleGoogleLogin = () => {
    console.log("Login com Google");
  };

  const handleForgotPassword = () => {
    window.location.href = "/forgot-password";
  };

  const handleCreateAccount = () => {
    console.log("Criar nova conta");
  };

  // Função para detectar se é CPF ou email
  const detectInputType = (value: string) => {
    const numbersOnly = value.replace(/\D/g, "");
    if (numbersOnly.length > 0 && numbersOnly.length <= 11) {
      return "cpf";
    }
    return "email";
  };

  const formatInput = (value: string) => {
    const inputType = detectInputType(value);

    if (inputType === "cpf") {
      const numbers = value.replace(/\D/g, "");
      return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    }

    return value;
  };

  const handleEmailOrCpfChange = (value: string) => {
    const formattedValue = formatInput(value);
    handleInputChange("emailOrCpf", formattedValue);
  };

  const getInputPlaceholder = () => {
    const inputType = detectInputType(formData.emailOrCpf);
    return inputType === "cpf" ? "000.000.000-00" : "seu@email.com";
  };

  const getInputIcon = () => {
    const inputType = detectInputType(formData.emailOrCpf);
    return inputType === "cpf" ? UserPlus : Mail;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-burnt-50 via-background to-terracotta-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo e header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-gradient-to-br from-burnt-500 to-terracotta-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Brain className="h-8 w-8 text-white" />
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">StudyAI</h1>
            <p className="text-muted-foreground mt-2">
              Estude com IA. Renda melhor.
            </p>
          </div>
        </div>

        {/* Card de login */}
        <Card className="border-burnt-200/50 shadow-xl">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold text-foreground">
              Entrar na sua conta
            </CardTitle>
            <CardDescription>
              Digite seu e-mail ou CPF para continuar
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="emailOrCpf">E-mail ou CPF</Label>
                <div className="relative">
                  {(() => {
                    const IconComponent = getInputIcon();
                    return (
                      <IconComponent className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    );
                  })()}
                  <Input
                    id="emailOrCpf"
                    type="text"
                    placeholder={getInputPlaceholder()}
                    value={formData.emailOrCpf}
                    onChange={(e) => handleEmailOrCpfChange(e.target.value)}
                    className="pl-10 border-burnt-200 focus:border-burnt-500"
                    required
                  />
                  <div className="absolute right-3 top-3 text-xs text-muted-foreground">
                    {detectInputType(formData.emailOrCpf) === "cpf"
                      ? "CPF"
                      : "Email"}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Sua senha"
                    value={formData.password}
                    onChange={(e) =>
                      handleInputChange("password", e.target.value)
                    }
                    className="pl-10 pr-10 border-burnt-200 focus:border-burnt-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-sm text-burnt-600 hover:text-burnt-700 hover:underline"
                >
                  Esqueci minha senha
                </button>
              </div>

              <Button
                type="submit"
                className="w-full h-11 bg-gradient-to-r from-burnt-500 to-terracotta-600 hover:from-burnt-600 hover:to-terracotta-700 text-white font-semibold"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                    Entrando...
                  </>
                ) : (
                  <>
                    Entrar
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </>
                )}
              </Button>
            </form>

            <div className="space-y-4">
              <div className="relative">
                <Separator className="my-4" />
                <span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-background px-3 text-sm text-muted-foreground">
                  ou
                </span>
              </div>

              <Button
                variant="outline"
                onClick={handleGoogleLogin}
                className="w-full h-11 border-burnt-200 hover:bg-burnt-50"
              >
                <Chrome className="h-4 w-4 mr-2" />
                Entrar com Google
              </Button>
            </div>

            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">
                Não tem uma conta?
              </p>
              <button
                onClick={handleCreateAccount}
                className="text-sm font-medium text-burnt-600 hover:text-burnt-700 hover:underline"
              >
                Criar nova conta
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-xs text-muted-foreground">
          <p>
            Ao continuar, você concorda com nossos{" "}
            <a href="#" className="text-burnt-600 hover:underline">
              Termos de Uso
            </a>{" "}
            e{" "}
            <a href="#" className="text-burnt-600 hover:underline">
              Política de Privacidade
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
