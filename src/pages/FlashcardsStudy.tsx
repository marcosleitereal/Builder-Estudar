import { useState, useEffect } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Shuffle,
  Star,
  StarOff,
  Volume2,
  StickyNote,
  X,
  Save,
  Check,
  AlertTriangle,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { MainLayout } from "@/components/layout/MainLayout";
import { cn } from "@/lib/utils";

// Dados de exemplo dos flashcards
const sampleFlashcards = [
  {
    id: 1,
    front: "O que é Inteligência Artificial?",
    back: "IA é um campo da ciência da computação focado na criação de sistemas capazes de realizar tarefas que normalmente requerem inteligência humana, como aprendizado, raciocínio e percepção.",
    category: "Conceitos Básicos",
    isMarkedForReview: false,
  },
  {
    id: 2,
    front: "Qual a diferença entre Machine Learning e Deep Learning?",
    back: "Machine Learning é um subconjunto da IA que permite aos computadores aprender sem programação explícita. Deep Learning é um subconjunto do ML que usa redes neurais com múltiplas camadas para modelar e compreender dados complexos.",
    category: "Aprendizado de Máquina",
    isMarkedForReview: true,
  },
  {
    id: 3,
    front: "O que são Redes Neurais Artificiais?",
    back: "São modelos computacionais inspirados no funcionamento do cérebro humano, compostos por neurônios artificiais conectados que processam informações através de camadas para reconhecer padrões e fazer previsões.",
    category: "Redes Neurais",
    isMarkedForReview: false,
  },
  {
    id: 4,
    front: "Explique o conceito de Overfitting",
    back: "Overfitting ocorre quando um modelo de ML aprende os dados de treinamento muito bem, incluindo ruído e peculiaridades, resultando em poor performance em dados novos. É como decorar ao invés de compreender.",
    category: "Problemas Comuns",
    isMarkedForReview: false,
  },
  {
    id: 5,
    front: "O que é Processamento de Linguagem Natural (NLP)?",
    back: "NLP é um ramo da IA que ajuda computadores a entender, interpretar e manipular linguagem humana. Inclui tarefas como tradução automática, análise de sentimentos e chatbots.",
    category: "NLP",
    isMarkedForReview: false,
  },
];

export default function FlashcardsStudy() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [flashcards, setFlashcards] = useState(sampleFlashcards);
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [notes, setNotes] = useState("");
  const [cardNotes, setCardNotes] = useState<Record<number, string>>({});
  const [studyStats, setStudyStats] = useState({
    correct: 0,
    incorrect: 0,
    almost: 0,
  });

  const currentCard = flashcards[currentCardIndex];
  const totalCards = flashcards.length;

  // Auto-flip back quando muda de card
  useEffect(() => {
    setIsFlipped(false);
  }, [currentCardIndex]);

  const handleCardFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleAnswer = (type: "correct" | "incorrect" | "almost") => {
    setStudyStats((prev) => ({
      ...prev,
      [type]: prev[type] + 1,
    }));

    // Auto-avançar para próximo card após resposta
    setTimeout(() => {
      handleNext();
    }, 500);
  };

  const handleNext = () => {
    if (currentCardIndex < totalCards - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    } else {
      setCurrentCardIndex(0); // Volta para o primeiro
    }
  };

  const handlePrevious = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
    } else {
      setCurrentCardIndex(totalCards - 1); // Vai para o último
    }
  };

  const handleShuffle = () => {
    const shuffled = [...flashcards].sort(() => Math.random() - 0.5);
    setFlashcards(shuffled);
    setCurrentCardIndex(0);
  };

  const handleToggleReview = () => {
    setFlashcards((prev) =>
      prev.map((card, index) =>
        index === currentCardIndex
          ? { ...card, isMarkedForReview: !card.isMarkedForReview }
          : card,
      ),
    );
  };

  const handleTextToSpeech = (text: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "pt-BR";
      utterance.rate = 0.9;
      speechSynthesis.speak(utterance);
    }
  };

  const handleSaveNotes = () => {
    setCardNotes((prev) => ({
      ...prev,
      [currentCard.id]: notes,
    }));
    setIsNotesOpen(false);
  };

  const handleBackToDashboard = () => {
    window.history.back();
  };

  // Carregar anotações do card atual
  useEffect(() => {
    setNotes(cardNotes[currentCard?.id] || "");
  }, [currentCard?.id, cardNotes]);

  return (
    <MainLayout>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
          <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
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
                  Estudo com Flashcards
                </h1>
                <p className="text-sm text-muted-foreground">
                  {currentCard?.category} • Cartão {currentCardIndex + 1} de{" "}
                  {totalCards}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="text-sm text-muted-foreground">
                ✅ {studyStats.correct} | ⚠️ {studyStats.almost} | ❌{" "}
                {studyStats.incorrect}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsNotesOpen(true)}
                className="border-burnt-300 text-burnt-600 hover:bg-burnt-50"
              >
                <StickyNote className="h-4 w-4 mr-2" />
                Anotações
              </Button>
            </div>
          </div>
        </div>

        {/* Conteúdo principal */}
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Área do flashcard (3 colunas) */}
            <div className="lg:col-span-3 space-y-6">
              {/* Controles superiores */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleShuffle}
                    className="border-burnt-300 text-burnt-600 hover:bg-burnt-50"
                  >
                    <Shuffle className="h-4 w-4 mr-2" />
                    Embaralhar
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleToggleReview}
                    className={cn(
                      "border-burnt-300 hover:bg-burnt-50",
                      currentCard?.isMarkedForReview
                        ? "bg-burnt-100 text-burnt-700"
                        : "text-burnt-600",
                    )}
                  >
                    {currentCard?.isMarkedForReview ? (
                      <Star className="h-4 w-4 mr-2 fill-current" />
                    ) : (
                      <StarOff className="h-4 w-4 mr-2" />
                    )}
                    {currentCard?.isMarkedForReview
                      ? "Marcado para Revisão"
                      : "Marcar para Revisão"}
                  </Button>
                </div>

                <div className="text-sm font-medium text-muted-foreground">
                  Cartão {currentCardIndex + 1} de {totalCards}
                </div>
              </div>

              {/* Flashcard */}
              <div className="flex justify-center">
                <div
                  className="relative w-full max-w-2xl h-80 cursor-pointer perspective-1000"
                  onClick={handleCardFlip}
                >
                  <div
                    className={cn(
                      "absolute inset-0 w-full h-full transition-transform duration-600 transform-style-preserve-3d",
                      isFlipped && "rotate-y-180",
                    )}
                  >
                    {/* Frente do card */}
                    <Card className="absolute inset-0 backface-hidden border-burnt-200 shadow-xl hover:shadow-2xl transition-shadow">
                      <CardContent className="p-8 h-full flex flex-col justify-center items-center text-center relative">
                        {/* Ícone de áudio */}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleTextToSpeech(currentCard?.front || "");
                          }}
                          className="absolute top-4 right-4 text-burnt-600 hover:bg-burnt-100"
                        >
                          <Volume2 className="h-4 w-4" />
                        </Button>

                        <div className="w-12 h-12 bg-gradient-to-br from-burnt-500 to-terracotta-600 rounded-full flex items-center justify-center mb-6">
                          <span className="text-white font-bold text-lg">
                            ?
                          </span>
                        </div>

                        <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-4 leading-relaxed">
                          {currentCard?.front}
                        </h2>

                        <p className="text-sm text-muted-foreground">
                          Clique para ver a resposta
                        </p>
                      </CardContent>
                    </Card>

                    {/* Verso do card */}
                    <Card className="absolute inset-0 backface-hidden rotate-y-180 border-terracotta-200 shadow-xl bg-gradient-to-br from-burnt-50 to-terracotta-50">
                      <CardContent className="p-8 h-full flex flex-col justify-center items-center text-center relative">
                        {/* Ícone de áudio */}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleTextToSpeech(currentCard?.back || "");
                          }}
                          className="absolute top-4 right-4 text-terracotta-600 hover:bg-terracotta-100"
                        >
                          <Volume2 className="h-4 w-4" />
                        </Button>

                        <div className="w-12 h-12 bg-gradient-to-br from-terracotta-500 to-burnt-600 rounded-full flex items-center justify-center mb-6">
                          <Check className="h-6 w-6 text-white" />
                        </div>

                        <p className="text-base md:text-lg text-foreground leading-relaxed">
                          {currentCard?.back}
                        </p>

                        <p className="text-sm text-muted-foreground mt-4">
                          Clique novamente para voltar à pergunta
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>

              {/* Botões de avaliação - só aparecem quando o card está virado */}
              {isFlipped && (
                <div className="flex justify-center gap-4 animate-fade-in">
                  <Button
                    onClick={() => handleAnswer("incorrect")}
                    variant="outline"
                    className="border-red-300 text-red-600 hover:bg-red-50 px-6 py-3"
                  >
                    <X className="h-5 w-5 mr-2" />
                    Errei
                  </Button>
                  <Button
                    onClick={() => handleAnswer("almost")}
                    variant="outline"
                    className="border-yellow-300 text-yellow-600 hover:bg-yellow-50 px-6 py-3"
                  >
                    <AlertTriangle className="h-5 w-5 mr-2" />
                    Quase
                  </Button>
                  <Button
                    onClick={() => handleAnswer("correct")}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3"
                  >
                    <Check className="h-5 w-5 mr-2" />
                    Acertei
                  </Button>
                </div>
              )}

              {/* Navegação */}
              <div className="flex justify-between items-center">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  className="border-burnt-300 text-burnt-600 hover:bg-burnt-50"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Anterior
                </Button>

                <div className="flex items-center gap-2">
                  {Array.from({ length: totalCards }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentCardIndex(index)}
                      className={cn(
                        "w-2 h-2 rounded-full transition-colors",
                        index === currentCardIndex
                          ? "bg-burnt-500"
                          : "bg-burnt-200 hover:bg-burnt-300",
                      )}
                    />
                  ))}
                </div>

                <Button
                  variant="outline"
                  onClick={handleNext}
                  className="border-burnt-300 text-burnt-600 hover:bg-burnt-50"
                >
                  Próximo
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>

            {/* Área de estatísticas (1 coluna) */}
            <div className="space-y-6">
              {/* Estatísticas de estudo */}
              <Card className="border-burnt-200/50">
                <CardContent className="p-4">
                  <h3 className="font-semibold text-foreground mb-4">
                    Progresso
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        Acertos
                      </span>
                      <span className="font-medium text-green-600">
                        ✅ {studyStats.correct}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        Quase
                      </span>
                      <span className="font-medium text-yellow-600">
                        ⚠️ {studyStats.almost}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        Erros
                      </span>
                      <span className="font-medium text-red-600">
                        ❌ {studyStats.incorrect}
                      </span>
                    </div>
                    <div className="border-t pt-2 mt-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-foreground">
                          Total
                        </span>
                        <span className="font-bold text-foreground">
                          {studyStats.correct +
                            studyStats.almost +
                            studyStats.incorrect}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Reset rápido */}
              <Button
                variant="outline"
                onClick={() =>
                  setStudyStats({ correct: 0, incorrect: 0, almost: 0 })
                }
                className="w-full border-burnt-300 text-burnt-600 hover:bg-burnt-50"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reiniciar Estatísticas
              </Button>
            </div>
          </div>
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
                  Anotações - Cartão {currentCardIndex + 1}
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
                {currentCard?.front.substring(0, 50)}...
              </p>
            </div>

            <div className="flex-1 p-4">
              <Textarea
                placeholder="Adicione suas anotações sobre este flashcard..."
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
                  Salvar
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
