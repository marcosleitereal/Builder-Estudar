import { MainLayout } from "@/components/layout/MainLayout";

export default function AdminTest() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-foreground mb-6">
            🛡️ Painel Administrativo - Teste
          </h1>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Teste de Acesso</h2>
            <p className="text-muted-foreground">
              Se você está vendo esta página, o acesso ao painel administrativo
              está funcionando corretamente.
            </p>

            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded">
              <p className="text-green-700 font-medium">
                ✅ Acesso ao painel admin funcionando!
              </p>
              <p className="text-green-600 text-sm mt-1">
                Este é um componente simplificado para testar a navegação.
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
