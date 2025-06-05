import { useState } from "react";
import {
  Brain,
  Mail,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Send,
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
import { cn } from "@/lib/utils";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simular envio de email
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
    setEmailSent(true);
  };

  const handleBackToLogin = () => {
    window.location.href = "/login";
  };

  const handleResendEmail = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    alert("E-mail reenviado com sucesso!");
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
            <p className="text-muted-foreground mt-2">Recuperação de senha</p>
          </div>
        </div>

        {/* Card principal */}
        <Card className="border-burnt-200/50 shadow-xl">
          <CardHeader className="space-y-1 text-center">
            {!emailSent ? (
              <>
                <CardTitle className="text-2xl font-bold text-foreground">
                  Esqueceu sua senha?
                </CardTitle>
                <CardDescription>
                  Digite seu e-mail e enviaremos um link para redefinir sua
                  senha
                </CardDescription>
              </>
            ) : (
              <>
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                </div>
                <CardTitle className="text-2xl font-bold text-foreground">
                  E-mail enviado!
                </CardTitle>
                <CardDescription>
                  Enviamos um link de recuperação para
                  <br />
                  <strong>{email}</strong>
                </CardDescription>
              </>
            )}
          </CardHeader>

          <CardContent className="space-y-6">
            {!emailSent ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 border-burnt-200 focus:border-burnt-500"
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full h-11 bg-gradient-to-r from-burnt-500 to-terracotta-600 hover:from-burnt-600 hover:to-terracotta-700 text-white font-semibold"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Enviar link de recuperação
                    </>
                  )}
                </Button>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-medium text-blue-800 mb-2">
                    📧 Verifique sua caixa de entrada
                  </h4>
                  <p className="text-sm text-blue-700 mb-3">
                    O e-mail pode levar alguns minutos para chegar. Verifique
                    também a pasta de spam.
                  </p>
                  <div className="text-xs text-blue-600">
                    <strong>Dica:</strong> Adicione noreply@studyai.com aos seus
                    contatos para evitar que futuros e-mails caiam no spam.
                  </div>
                </div>

                <Button
                  onClick={handleResendEmail}
                  variant="outline"
                  className="w-full border-burnt-300 text-burnt-600 hover:bg-burnt-50"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-burnt-600 border-t-transparent mr-2"></div>
                      Reenviando...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Reenviar e-mail
                    </>
                  )}
                </Button>
              </div>
            )}

            <div className="text-center">
              <button
                onClick={handleBackToLogin}
                className="text-sm font-medium text-burnt-600 hover:text-burnt-700 hover:underline flex items-center justify-center gap-2 mx-auto"
              >
                <ArrowLeft className="h-4 w-4" />
                Voltar para o login
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Instruções adicionais */}
        {emailSent && (
          <Card className="border-burnt-200/50">
            <CardContent className="p-4">
              <h4 className="font-medium text-foreground mb-2">
                Próximos passos:
              </h4>
              <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                <li>Abra o e-mail que enviamos</li>
                <li>Clique no link "Redefinir senha"</li>
                <li>Crie uma nova senha segura</li>
                <li>Faça login com sua nova senha</li>
              </ol>
            </CardContent>
          </Card>
        )}

        {/* Footer */}
        <div className="text-center text-xs text-muted-foreground">
          <p>
            Precisa de ajuda?{" "}
            <a
              href="mailto:suporte@studyai.com"
              className="text-burnt-600 hover:underline"
            >
              Entre em contato conosco
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
