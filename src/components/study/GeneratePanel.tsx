import { useState } from "react";
import {
  Upload,
  FileText,
  Sparkles,
  Brain,
  Lightbulb,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { ProgressBar } from "./ProgressBar";
import { cn } from "@/lib/utils";

export function GeneratePanel() {
  const [textInput, setTextInput] = useState("");
  const [title, setTitle] = useState("");
  const [selectedOutputs, setSelectedOutputs] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [dragOver, setDragOver] = useState(false);

  const outputTypes = [
    {
      id: "questions",
      label: "Questões",
      description: "Gerar questões práticas e questionários",
      icon: Brain,
      color: "text-burnt-600",
    },
    {
      id: "summary",
      label: "Resumo",
      description: "Criar resumos concisos e pontos-chave",
      icon: FileText,
      color: "text-terracotta-600",
    },
    {
      id: "flashcards",
      label: "Flashcards",
      description: "Flashcards interativos para memorização",
      icon: Lightbulb,
      color: "text-sandstone-700",
    },
    {
      id: "mindmap",
      label: "Mapa Mental",
      description: "Mapas mentais visuais e diagramas conceituais",
      icon: BookOpen,
      color: "text-burnt-700",
    },
  ];

  const handleOutputToggle = (outputId: string) => {
    setSelectedOutputs((prev) =>
      prev.includes(outputId)
        ? prev.filter((id) => id !== outputId)
        : [...prev, outputId],
    );
  };

  const handleGenerate = async () => {
    if (!textInput.trim() && selectedOutputs.length === 0) return;

    setIsGenerating(true);
    setProgress(0);

    const progressSteps = [10, 25, 45, 65, 80, 95, 100];
    for (let i = 0; i < progressSteps.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 800));
      setProgress(progressSteps[i]);
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsGenerating(false);
    setProgress(0);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    const validFiles = files.filter(
      (file) =>
        file.type === "application/pdf" ||
        file.type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
        file.type === "text/plain",
    );

    if (validFiles.length > 0) {
      console.log("Files uploaded:", validFiles);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="border-burnt-200/50 shadow-lg hover:shadow-xl transition-shadow duration-200">
        <CardHeader className="bg-gradient-to-r from-burnt-50 to-terracotta-50 border-b border-burnt-100">
          <CardTitle className="text-2xl font-bold text-burnt-800 flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-burnt-500 to-terracotta-600 rounded-lg flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            Gerar Material de Estudo Personalizado
          </CardTitle>
          <CardDescription className="text-burnt-700/80">
            Transforme seu conteúdo em materiais de estudo interativos com IA
          </CardDescription>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          {isGenerating && (
            <div className="mb-6">
              <ProgressBar progress={progress} isAnimating={true} />
            </div>
          )}

          <div className="space-y-4">
            <div>
              <Label
                htmlFor="title"
                className="text-sm font-medium text-foreground"
              >
                Title (Optional)
              </Label>
              <Input
                id="title"
                placeholder="Enter a title for your study material"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1"
                disabled={isGenerating}
              />
            </div>

            <div>
              <Label
                htmlFor="content"
                className="text-sm font-medium text-foreground"
              >
                Content
              </Label>
              <Textarea
                id="content"
                placeholder="Paste your study content here, or upload files below..."
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                className="mt-1 min-h-[200px] resize-none"
                disabled={isGenerating}
              />
            </div>

            <div
              className={cn(
                "border-2 border-dashed rounded-lg p-6 md:p-8 text-center transition-all duration-200",
                dragOver
                  ? "border-burnt-400 bg-burnt-50 scale-[1.02]"
                  : "border-muted-foreground/25 hover:border-burnt-300 hover:bg-burnt-50/50",
                isGenerating && "opacity-50 pointer-events-none",
              )}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
              <p className="text-sm text-muted-foreground mb-2">
                <strong>Drop files here</strong> or{" "}
                <Button
                  variant="link"
                  className="h-auto p-0 text-burnt-600 hover:text-burnt-700"
                  disabled={isGenerating}
                >
                  browse to upload
                </Button>
              </p>
              <p className="text-xs text-muted-foreground">
                Supports PDF, DOCX, and TXT files
              </p>
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium text-foreground mb-4 block">
              Select Output Types
            </Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {outputTypes.map((type) => (
                <div
                  key={type.id}
                  className={cn(
                    "flex items-start space-x-3 p-4 rounded-lg border transition-all cursor-pointer",
                    selectedOutputs.includes(type.id)
                      ? "border-burnt-300 bg-burnt-50/50"
                      : "border-border hover:border-burnt-200 hover:bg-burnt-50/30",
                    isGenerating && "opacity-50 pointer-events-none",
                  )}
                  onClick={() => !isGenerating && handleOutputToggle(type.id)}
                >
                  <Checkbox
                    id={type.id}
                    checked={selectedOutputs.includes(type.id)}
                    onChange={() => handleOutputToggle(type.id)}
                    disabled={isGenerating}
                    className="mt-0.5"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <type.icon className={cn("h-4 w-4", type.color)} />
                      <Label
                        htmlFor={type.id}
                        className="font-medium cursor-pointer"
                      >
                        {type.label}
                      </Label>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {type.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Button
            onClick={handleGenerate}
            disabled={
              isGenerating ||
              (!textInput.trim() && selectedOutputs.length === 0)
            }
            className="w-full h-12 text-base font-semibold bg-gradient-to-r from-burnt-500 to-terracotta-600 hover:from-burnt-600 hover:to-terracotta-700 text-white shadow-lg"
          >
            {isGenerating ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 mr-2" />
                Generate Study Material
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
