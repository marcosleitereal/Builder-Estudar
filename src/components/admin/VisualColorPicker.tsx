import { useState } from "react";
import { Palette, Eye, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface VisualColorPickerProps {
  primaryColor: string;
  secondaryColor: string;
  onPrimaryColorChange: (color: string) => void;
  onSecondaryColorChange: (color: string) => void;
}

export function VisualColorPicker({
  primaryColor,
  secondaryColor,
  onPrimaryColorChange,
  onSecondaryColorChange,
}: VisualColorPickerProps) {
  const primaryColors = [
    { name: "Azul", color: "#3B82F6" },
    { name: "Verde", color: "#10B981" },
    { name: "Roxo", color: "#8B5CF6" },
    { name: "Rosa", color: "#EC4899" },
    { name: "Vermelho", color: "#EF4444" },
    { name: "Laranja", color: "#F59E0B" },
    { name: "Índigo", color: "#6366F1" },
    { name: "Teal", color: "#14B8A6" },
    { name: "Ciano", color: "#06B6D4" },
    { name: "Amarelo", color: "#EAB308" },
    { name: "Esmeralda", color: "#059669" },
    { name: "Violeta", color: "#7C3AED" },
    { name: "Padrão", color: "#D4831A" },
    { name: "Cinza", color: "#6B7280" },
    { name: "Slate", color: "#475569" },
    { name: "Stone", color: "#78716C" },
  ];

  const secondaryColors = [
    { name: "Azul Claro", color: "#60A5FA" },
    { name: "Verde Claro", color: "#34D399" },
    { name: "Roxo Claro", color: "#A78BFA" },
    { name: "Rosa Claro", color: "#F472B6" },
    { name: "Vermelho Claro", color: "#F87171" },
    { name: "Laranja Claro", color: "#FBBF24" },
    { name: "Índigo Claro", color: "#818CF8" },
    { name: "Teal Claro", color: "#2DD4BF" },
    { name: "Ciano Claro", color: "#22D3EE" },
    { name: "Amarelo Claro", color: "#FDE047" },
    { name: "Esmeralda Claro", color: "#10B981" },
    { name: "Violeta Claro", color: "#8B5CF6" },
    { name: "Padrão", color: "#D97556" },
    { name: "Cinza Claro", color: "#9CA3AF" },
    { name: "Slate Claro", color: "#64748B" },
    { name: "Stone Claro", color: "#A8A29E" },
  ];

  return (
    <div className="space-y-6">
      {/* Cor Primária */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5 text-blue-600" />
            Cor Primária do Sistema
          </CardTitle>
          <CardDescription>
            Escolha a cor principal que será usada em botões, links e elementos
            de destaque
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label className="text-sm font-medium mb-3 block">
              Cores Populares
            </Label>
            <div className="grid grid-cols-8 gap-3">
              {primaryColors.map((colorOption) => (
                <button
                  key={colorOption.name}
                  className={cn(
                    "w-12 h-12 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 relative border-2",
                    primaryColor === colorOption.color
                      ? "border-gray-800 ring-2 ring-gray-400"
                      : "border-gray-200 hover:border-gray-300",
                  )}
                  style={{ backgroundColor: colorOption.color }}
                  onClick={() => onPrimaryColorChange(colorOption.color)}
                  title={`${colorOption.name} - ${colorOption.color}`}
                >
                  {primaryColor === colorOption.color && (
                    <CheckCircle className="h-4 w-4 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium mb-3 block">
              Cor Personalizada
            </Label>
            <div className="flex items-center gap-4">
              <Input
                type="color"
                value={primaryColor}
                onChange={(e) => onPrimaryColorChange(e.target.value)}
                className="w-16 h-12 p-1 rounded-lg cursor-pointer"
              />
              <Input
                value={primaryColor}
                onChange={(e) => onPrimaryColorChange(e.target.value)}
                placeholder="#000000"
                className="flex-1 font-mono"
              />
              <Button
                variant="outline"
                onClick={() => onPrimaryColorChange("#D4831A")}
                className="text-sm"
              >
                Resetar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cor Secundária */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5 text-purple-600" />
            Cor Secundária do Sistema
          </CardTitle>
          <CardDescription>
            Escolha a cor secundária usada em elementos de apoio e acentos
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label className="text-sm font-medium mb-3 block">
              Cores Populares
            </Label>
            <div className="grid grid-cols-8 gap-3">
              {secondaryColors.map((colorOption) => (
                <button
                  key={colorOption.name}
                  className={cn(
                    "w-12 h-12 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 relative border-2",
                    secondaryColor === colorOption.color
                      ? "border-gray-800 ring-2 ring-gray-400"
                      : "border-gray-200 hover:border-gray-300",
                  )}
                  style={{ backgroundColor: colorOption.color }}
                  onClick={() => onSecondaryColorChange(colorOption.color)}
                  title={`${colorOption.name} - ${colorOption.color}`}
                >
                  {secondaryColor === colorOption.color && (
                    <CheckCircle className="h-4 w-4 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium mb-3 block">
              Cor Personalizada
            </Label>
            <div className="flex items-center gap-4">
              <Input
                type="color"
                value={secondaryColor}
                onChange={(e) => onSecondaryColorChange(e.target.value)}
                className="w-16 h-12 p-1 rounded-lg cursor-pointer"
              />
              <Input
                value={secondaryColor}
                onChange={(e) => onSecondaryColorChange(e.target.value)}
                placeholder="#000000"
                className="flex-1 font-mono"
              />
              <Button
                variant="outline"
                onClick={() => onSecondaryColorChange("#D97556")}
                className="text-sm"
              >
                Resetar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5 text-green-600" />
            Preview das Cores Selecionadas
          </CardTitle>
          <CardDescription>
            Veja como as cores escolhidas aparecerão na interface do sistema
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label className="text-sm font-medium">Elementos Primários</Label>
              <div className="space-y-3 p-4 border rounded-lg bg-gray-50">
                <Button
                  className="w-full text-white font-medium"
                  style={{ backgroundColor: primaryColor }}
                >
                  Botão Principal
                </Button>
                <div
                  className="h-3 rounded-full w-3/4"
                  style={{ backgroundColor: primaryColor }}
                ></div>
                <div className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded"
                    style={{ backgroundColor: primaryColor }}
                  ></div>
                  <span style={{ color: primaryColor }} className="font-medium">
                    Link/Texto em Destaque
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-medium">
                Elementos Secundários
              </Label>
              <div className="space-y-3 p-4 border rounded-lg bg-gray-50">
                <Button
                  variant="outline"
                  className="w-full border-2 font-medium"
                  style={{
                    borderColor: secondaryColor,
                    color: secondaryColor,
                  }}
                >
                  Botão Secundário
                </Button>
                <div
                  className="h-2 rounded-full w-3/4 opacity-60"
                  style={{ backgroundColor: secondaryColor }}
                ></div>
                <div className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded opacity-60"
                    style={{ backgroundColor: secondaryColor }}
                  ></div>
                  <span
                    style={{ color: secondaryColor }}
                    className="opacity-80"
                  >
                    Elementos de Apoio
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div
            className="p-6 rounded-lg border-2"
            style={{
              background: `linear-gradient(135deg, ${primaryColor}15, ${secondaryColor}15)`,
              borderColor: primaryColor + "40",
            }}
          >
            <h4
              className="font-semibold text-lg mb-2"
              style={{ color: primaryColor }}
            >
              Preview da Combinação
            </h4>
            <p className="text-gray-600 mb-4">
              Esta é uma demonstração de como as cores escolhidas funcionam
              juntas na interface.
            </p>
            <div className="flex gap-3">
              <Button
                size="sm"
                className="text-white"
                style={{ backgroundColor: primaryColor }}
              >
                Ação Principal
              </Button>
              <Button
                size="sm"
                variant="outline"
                style={{
                  borderColor: secondaryColor,
                  color: secondaryColor,
                }}
              >
                Ação Secundária
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-md border"
                style={{ backgroundColor: primaryColor }}
              ></div>
              <div>
                <p className="text-sm font-medium">Cor Primária</p>
                <p className="text-xs font-mono text-gray-600">
                  {primaryColor}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-md border"
                style={{ backgroundColor: secondaryColor }}
              ></div>
              <div>
                <p className="text-sm font-medium">Cor Secundária</p>
                <p className="text-xs font-mono text-gray-600">
                  {secondaryColor}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4 justify-end">
        <Button
          variant="outline"
          onClick={() => {
            onPrimaryColorChange("#D4831A");
            onSecondaryColorChange("#D97556");
          }}
        >
          Restaurar Padrão
        </Button>
        <Button
          className="text-white px-6"
          style={{
            background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
          }}
        >
          <Palette className="h-4 w-4 mr-2" />
          Aplicar Configurações
        </Button>
      </div>
    </div>
  );
}
