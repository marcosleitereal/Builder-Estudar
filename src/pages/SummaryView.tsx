import { useState } from "react";
import { ArrowLeft, Edit3, Download, X, Save, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { MainLayout } from "@/components/layout/MainLayout";
import { cn } from "@/lib/utils";

// Dados de exemplo do resumo
const sampleSummary = {
  title: "Fundamentos da Inteligência Artificial",
  generatedDate: "15 de dezembro de 2024",
  content: `
# Introdução à Inteligência Artificial

A **Inteligência Artificial (IA)** representa uma das mais significativas inovações tecnológicas da era moderna, transformando diversos setores da sociedade.

## Conceitos Fundamentais

### Definição de IA
A IA é um campo da ciência da computação que busca criar sistemas capazes de realizar tarefas que normalmente requerem inteligência humana.

### Principais Características
- **Aprendizado de máquina**: Capacidade de melhorar performance através da experiência
- **Processamento de linguagem natural**: Compreensão e geração de linguagem humana
- **Visão computacional**: Interpretação de dados visuais
- **Raciocínio**: Tomada de decisões baseada em lógica

## Tipos de Inteligência Artificial

### 1. IA Estreita (ANI)
Sistemas especializados em tarefas específicas:
- Reconhecimento de voz
- Sistemas de recomendação
- Jogos estratégicos
- Assistentes virtuais

### 2. IA Geral (AGI)
Hipotética forma de IA com capacidades cognitivas humanas em todas as áreas.

### 3. Super IA (ASI)
Forma teórica que superaria a inteligência humana em todos os aspectos.

## Aplicações Práticas

A IA está presente em diversos setores:

- **Saúde**: Diagnósticos médicos, análise de imagens
- **Educação**: Sistemas de tutoria personalizada
- **Transporte**: Veículos autônomos
- **Finanças**: Detecção de fraudes, trading algorítmico
- **Entretenimento**: Sistemas de recomendação de conteúdo

## Desafios e Considerações Éticas

### Principais Desafios
1. **Viés algorítmico**: Preconceitos nos dados de treinamento
2. **Transparência**: "Caixa preta" dos algoritmos
3. **Privacidade**: Proteção de dados pessoais
4. **Impacto no emprego**: Automação de tarefas humanas

### Considerações Éticas
- Responsabilidade no desenvolvimento
- Equidade e justiça
- Transparência e explicabilidade
- Controle humano adequado

## Futuro da IA

O desenvolvimento da IA continuará expandindo suas capacidades, com foco em:
- **Maior eficiência energética**
- **Melhor interpretabilidade**
- **Integração mais natural com humanos**
- **Aplicações sustentáveis**

A IA representa tanto oportunidades extraordinárias quanto desafios significativos, exigindo uma abordagem equilibrada e responsável para seu desenvolvimento e implementação.
  `,
  notes: "",
};

export default function SummaryView() {
  const [summary] = useState(sampleSummary);
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [notes, setNotes] = useState(summary.notes);
  const [isExporting, setIsExporting] = useState(false);

  const handleExportPDF = async () => {
    setIsExporting(true);
    // Simular exportação
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsExporting(false);
    // Aqui implementaria a exportação real para PDF
    console.log("Exportando para PDF...");
  };

  const handleSaveNotes = () => {
    // Aqui salvaria as anotações
    console.log("Anotações salvas:", notes);
    setIsNotesOpen(false);
  };

  const handleBackToDashboard = () => {
    window.history.back();
  };

  // Função para renderizar markdown simplificado
  const renderContent = (content: string) => {
    const lines = content.trim().split("\n");
    const elements: JSX.Element[] = [];
    let listItems: string[] = [];
    let currentListIndex = 0;

    const flushList = () => {
      if (listItems.length > 0) {
        elements.push(
          <ul
            key={`list-${currentListIndex++}`}
            className="list-disc list-inside mb-4 pl-4 space-y-1"
          >
            {listItems.map((item, idx) => (
              <li key={idx} className="text-foreground">
                {item.substring(2)}
              </li>
            ))}
          </ul>,
        );
        listItems = [];
      }
    };

    lines.forEach((line, index) => {
      line = line.trim();

      if (line === "") {
        flushList();
        return;
      }

      if (line.startsWith("# ")) {
        flushList();
        elements.push(
          <h1
            key={index}
            className="text-3xl font-bold text-burnt-800 mb-6 mt-8 first:mt-0"
          >
            {line.substring(2)}
          </h1>,
        );
      } else if (line.startsWith("## ")) {
        flushList();
        elements.push(
          <h2
            key={index}
            className="text-2xl font-semibold text-burnt-700 mb-4 mt-6"
          >
            {line.substring(3)}
          </h2>,
        );
      } else if (line.startsWith("### ")) {
        flushList();
        elements.push(
          <h3
            key={index}
            className="text-xl font-semibold text-burnt-600 mb-3 mt-4"
          >
            {line.substring(4)}
          </h3>,
        );
      } else if (line.match(/^\d+\./)) {
        flushList();
        if (
          elements.length === 0 ||
          !elements[elements.length - 1]?.type.toString().includes("ol")
        ) {
          elements.push(
            <ol
              key={`ol-${index}`}
              className="list-decimal list-inside mb-4 pl-4 space-y-1"
            >
              <li className="text-foreground">
                {line.substring(line.indexOf(".") + 2)}
              </li>
            </ol>,
          );
        }
      } else if (line.startsWith("- ")) {
        listItems.push(line);
      } else {
        flushList();
        // Processar texto com formatação bold
        const processedLine = line.replace(
          /\*\*(.*?)\*\*/g,
          '<strong class="font-semibold text-burnt-700">$1</strong>',
        );
        elements.push(
          <p
            key={index}
            className="text-foreground leading-relaxed mb-4"
            dangerouslySetInnerHTML={{ __html: processedLine }}
          />,
        );
      }
    });

    flushList();
    return elements;
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-background">
        {/* Header com título e botões */}
        <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
          <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
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
                <h1 className="text-xl font-semibold text-foreground">
                  {summary.title}
                </h1>
                <p className="text-sm text-muted-foreground">
                  Gerado em {summary.generatedDate}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsNotesOpen(true)}
                className="border-burnt-300 text-burnt-600 hover:bg-burnt-50"
              >
                <Edit3 className="h-4 w-4 mr-2" />
                Editar Anotações
              </Button>
              <Button
                size="sm"
                onClick={handleExportPDF}
                disabled={isExporting}
                className="bg-gradient-to-r from-burnt-500 to-terracotta-600 hover:from-burnt-600 hover:to-terracotta-700 text-white"
              >
                {isExporting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                    Exportando...
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4 mr-2" />
                    Exportar PDF
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Conteúdo principal */}
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Card className="border-burnt-200/50 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-burnt-50 to-terracotta-50/80 border-b border-burnt-100">
              <CardTitle className="flex items-center gap-3 text-burnt-800">
                <div className="w-10 h-10 bg-gradient-to-br from-burnt-500 to-terracotta-600 rounded-lg flex items-center justify-center">
                  <FileText className="h-5 w-5 text-white" />
                </div>
                Resumo Gerado
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="prose prose-lg max-w-none">
                {renderContent(summary.content)}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Painel lateral de anotações */}
        <div
          className={cn(
            "fixed inset-y-0 right-0 z-50 w-96 bg-background border-l border-border shadow-xl transform transition-transform duration-300 ease-in-out",
            isNotesOpen ? "translate-x-0" : "translate-x-full",
          )}
        >
          <div className="h-full flex flex-col">
            <div className="p-4 border-b border-border">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-foreground">
                  Minhas Anotações
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsNotesOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Adicione suas observações e insights sobre este resumo
              </p>
            </div>

            <div className="flex-1 p-4">
              <Textarea
                placeholder="Digite suas anotações aqui..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full h-full resize-none border-burnt-200 focus:border-burnt-500"
              />
            </div>

            <div className="p-4 border-t border-border">
              <div className="flex gap-2">
                <Button
                  onClick={handleSaveNotes}
                  className="flex-1 bg-gradient-to-r from-burnt-500 to-terracotta-600 hover:from-burnt-600 hover:to-terracotta-700 text-white"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Salvar Anotações
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsNotesOpen(false)}
                  className="border-burnt-300 text-burnt-600 hover:bg-burnt-50"
                >
                  Cancelar
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Overlay para o painel de anotações */}
        {isNotesOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsNotesOpen(false)}
          />
        )}
      </div>
    </MainLayout>
  );
}
