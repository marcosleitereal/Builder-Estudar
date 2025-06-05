import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft, FileQuestion } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MainLayout } from "@/components/layout/MainLayout";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <MainLayout>
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center max-w-md mx-auto">
          <div className="w-20 h-20 bg-gradient-to-br from-burnt-500 to-terracotta-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <FileQuestion className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-6xl font-bold text-burnt-700 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-foreground mb-2">
            Página Não Encontrada
          </h2>
          <p className="text-muted-foreground mb-8">
            A página que você está procurando não existe ou foi movida.
          </p>
          <Button
            onClick={() => window.history.back()}
            className="mr-3 bg-gradient-to-r from-burnt-500 to-terracotta-600 hover:from-burnt-600 hover:to-terracotta-700"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          <Button
            variant="outline"
            onClick={() => (window.location.href = "/")}
            className="border-burnt-300 text-burnt-600 hover:bg-burnt-50"
          >
            Início
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default NotFound;
