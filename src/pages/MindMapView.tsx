import { useState, useRef, useCallback, useEffect } from "react";
import {
  ArrowLeft,
  Save,
  Download,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Plus,
  Minus,
  Move,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { MainLayout } from "@/components/layout/MainLayout";
import { cn } from "@/lib/utils";

// Dados de exemplo do mapa mental
const sampleMindMap = {
  id: 1,
  title: "Inteligência Artificial",
  centerNode: {
    id: "center",
    text: "Inteligência Artificial",
    x: 400,
    y: 300,
    level: 0,
    expanded: true,
  },
  nodes: [
    // Nível 1 - Tópicos principais
    {
      id: "ml",
      text: "Machine Learning",
      x: 600,
      y: 200,
      level: 1,
      parentId: "center",
      expanded: true,
    },
    {
      id: "nlp",
      text: "Processamento de Linguagem Natural",
      x: 600,
      y: 400,
      level: 1,
      parentId: "center",
      expanded: true,
    },
    {
      id: "cv",
      text: "Visão Computacional",
      x: 200,
      y: 200,
      level: 1,
      parentId: "center",
      expanded: true,
    },
    {
      id: "ethics",
      text: "Ética em IA",
      x: 200,
      y: 400,
      level: 1,
      parentId: "center",
      expanded: false,
    },
    // Nível 2 - Subtópicos de Machine Learning
    {
      id: "supervised",
      text: "Aprendizado Supervisionado",
      x: 750,
      y: 150,
      level: 2,
      parentId: "ml",
      expanded: false,
    },
    {
      id: "unsupervised",
      text: "Aprendizado Não Supervisionado",
      x: 750,
      y: 200,
      level: 2,
      parentId: "ml",
      expanded: false,
    },
    {
      id: "reinforcement",
      text: "Aprendizado por Reforço",
      x: 750,
      y: 250,
      level: 2,
      parentId: "ml",
      expanded: false,
    },
    // Nível 2 - Subtópicos de NLP
    {
      id: "tokenization",
      text: "Tokenização",
      x: 750,
      y: 350,
      level: 2,
      parentId: "nlp",
      expanded: false,
    },
    {
      id: "sentiment",
      text: "Análise de Sentimentos",
      x: 750,
      y: 400,
      level: 2,
      parentId: "nlp",
      expanded: false,
    },
    {
      id: "translation",
      text: "Tradução Automática",
      x: 750,
      y: 450,
      level: 2,
      parentId: "nlp",
      expanded: false,
    },
    // Nível 2 - Subtópicos de Visão Computacional
    {
      id: "image-recognition",
      text: "Reconhecimento de Imagens",
      x: 50,
      y: 150,
      level: 2,
      parentId: "cv",
      expanded: false,
    },
    {
      id: "object-detection",
      text: "Detecção de Objetos",
      x: 50,
      y: 200,
      level: 2,
      parentId: "cv",
      expanded: false,
    },
    {
      id: "face-recognition",
      text: "Reconhecimento Facial",
      x: 50,
      y: 250,
      level: 2,
      parentId: "cv",
      expanded: false,
    },
  ],
};

export default function MindMapView() {
  const [mindMap, setMindMap] = useState(sampleMindMap);
  const [zoom, setZoom] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isExporting, setIsExporting] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.2, 3));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.2, 0.5));
  };

  const handleResetView = () => {
    setZoom(1);
    setPanOffset({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target === svgRef.current) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
    }
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isDragging) {
        setPanOffset({
          x: e.clientX - dragStart.x,
          y: e.clientY - dragStart.y,
        });
      }
    },
    [isDragging, dragStart],
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const handleToggleNode = (nodeId: string) => {
    setMindMap((prev) => ({
      ...prev,
      nodes: prev.nodes.map((node) =>
        node.id === nodeId ? { ...node, expanded: !node.expanded } : node,
      ),
    }));
  };

  const handleSaveMindMap = async () => {
    // Simular salvamento
    console.log("Salvando mapa mental...", mindMap);
    // Aqui implementaria a lógica de salvamento
  };

  const handleExportImage = async () => {
    setIsExporting(true);
    try {
      if (svgRef.current) {
        // Criar uma versão limpa do SVG para exportação
        const svgElement = svgRef.current.cloneNode(true) as SVGElement;
        const svgData = new XMLSerializer().serializeToString(svgElement);
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const img = new Image();

        canvas.width = 800;
        canvas.height = 600;

        img.onload = () => {
          if (ctx) {
            ctx.fillStyle = "white";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);

            const link = document.createElement("a");
            link.download = `mapa-mental-${mindMap.title.toLowerCase().replace(/\s+/g, "-")}.png`;
            link.href = canvas.toDataURL();
            link.click();
          }
          setIsExporting(false);
        };

        img.src =
          "data:image/svg+xml;base64," +
          btoa(unescape(encodeURIComponent(svgData)));
      }
    } catch (error) {
      console.error("Erro ao exportar imagem:", error);
      setIsExporting(false);
    }
  };

  const getVisibleNodes = () => {
    const allNodes = [mindMap.centerNode, ...mindMap.nodes];
    return allNodes.filter((node) => {
      if (node.level === 0 || node.level === 1) return true;
      const parent = allNodes.find((n) => n.id === node.parentId);
      return parent?.expanded || false;
    });
  };

  const getConnections = () => {
    const visibleNodes = getVisibleNodes();
    const connections: Array<{ from: any; to: any }> = [];

    visibleNodes.forEach((node) => {
      if (node.parentId) {
        const parent = visibleNodes.find((n) => n.id === node.parentId);
        if (parent) {
          connections.push({ from: parent, to: node });
        }
      }
    });

    return connections;
  };

  const getNodeColor = (level: number) => {
    const colors = [
      "from-burnt-500 to-terracotta-600", // Centro
      "from-burnt-400 to-terracotta-500", // Nível 1
      "from-burnt-300 to-terracotta-400", // Nível 2
    ];
    return colors[level] || colors[2];
  };

  const handleBackToDashboard = () => {
    window.history.back();
  };

  return (
    <MainLayout>
      <div className="h-screen bg-background overflow-hidden">
        {/* Header */}
        <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
          <div className="flex items-center justify-between px-4 py-3">
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
                  {mindMap.title}
                </h1>
                <p className="text-sm text-muted-foreground">
                  Mapa Mental Interativo
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleSaveMindMap}
                className="border-burnt-300 text-burnt-600 hover:bg-burnt-50"
              >
                <Save className="h-4 w-4 mr-2" />
                Salvar Mapa
              </Button>
              <Button
                size="sm"
                onClick={handleExportImage}
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
                    Exportar Imagem
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Controles de navegação */}
        <div className="absolute top-20 right-4 z-30 flex flex-col gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleZoomIn}
            className="w-10 h-10 p-0 border-burnt-300 text-burnt-600 hover:bg-burnt-50"
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleZoomOut}
            className="w-10 h-10 p-0 border-burnt-300 text-burnt-600 hover:bg-burnt-50"
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleResetView}
            className="w-10 h-10 p-0 border-burnt-300 text-burnt-600 hover:bg-burnt-50"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>

        {/* Instruções */}
        <div className="absolute bottom-4 left-4 z-30 bg-background/90 backdrop-blur-sm border border-border rounded-lg p-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Move className="h-4 w-4" />
            <span>
              Arraste para mover • Clique nos ícones +/- para expandir
            </span>
          </div>
        </div>

        {/* Área do mapa mental */}
        <div className="h-full w-full relative overflow-hidden">
          <svg
            ref={svgRef}
            className="w-full h-full cursor-grab active:cursor-grabbing"
            style={{
              transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoom})`,
            }}
            onMouseDown={handleMouseDown}
          >
            <defs>
              <marker
                id="arrowhead"
                markerWidth="10"
                markerHeight="7"
                refX="9"
                refY="3.5"
                orient="auto"
              >
                <polygon
                  points="0 0, 10 3.5, 0 7"
                  fill="#D97556"
                  stroke="#D97556"
                />
              </marker>
            </defs>

            {/* Renderizar conexões */}
            {getConnections().map((connection, index) => {
              const { from, to } = connection;
              const midX = (from.x + to.x) / 2;
              const midY = (from.y + to.y) / 2;

              return (
                <g key={index}>
                  <path
                    d={`M ${from.x} ${from.y} Q ${midX} ${midY} ${to.x} ${to.y}`}
                    fill="none"
                    stroke="#D97556"
                    strokeWidth="2"
                    markerEnd="url(#arrowhead)"
                    className="opacity-70"
                  />
                </g>
              );
            })}

            {/* Renderizar nós */}
            {getVisibleNodes().map((node) => {
              const hasChildren = mindMap.nodes.some(
                (n) => n.parentId === node.id,
              );
              const nodeWidth = Math.max(120, node.text.length * 8);
              const nodeHeight = 40;

              return (
                <g key={node.id}>
                  {/* Sombra do nó */}
                  <rect
                    x={node.x - nodeWidth / 2 + 2}
                    y={node.y - nodeHeight / 2 + 2}
                    width={nodeWidth}
                    height={nodeHeight}
                    rx="8"
                    fill="rgba(0, 0, 0, 0.1)"
                  />

                  {/* Nó principal */}
                  <rect
                    x={node.x - nodeWidth / 2}
                    y={node.y - nodeHeight / 2}
                    width={nodeWidth}
                    height={nodeHeight}
                    rx="8"
                    fill="url(#gradient-node)"
                    stroke={node.level === 0 ? "#B05A1A" : "#D97556"}
                    strokeWidth={node.level === 0 ? "3" : "2"}
                    className="hover:stroke-burnt-600 transition-colors cursor-pointer"
                  />

                  {/* Gradiente para o nó */}
                  <defs>
                    <linearGradient
                      id="gradient-node"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop
                        offset="0%"
                        stopColor={
                          node.level === 0
                            ? "#EA8E3B"
                            : node.level === 1
                              ? "#F0AA5B"
                              : "#F6CA96"
                        }
                      />
                      <stop
                        offset="100%"
                        stopColor={
                          node.level === 0
                            ? "#D97556"
                            : node.level === 1
                              ? "#E6927A"
                              : "#D97556"
                        }
                      />
                    </linearGradient>
                  </defs>

                  {/* Texto do nó */}
                  <text
                    x={node.x}
                    y={node.y + 5}
                    textAnchor="middle"
                    className="fill-white font-medium text-sm pointer-events-none"
                    style={{ fontSize: node.level === 0 ? "14px" : "12px" }}
                  >
                    {node.text.length > 20
                      ? `${node.text.substring(0, 17)}...`
                      : node.text}
                  </text>

                  {/* Botão de expansão/colapso */}
                  {hasChildren && (
                    <g>
                      <circle
                        cx={node.x + nodeWidth / 2 - 12}
                        cy={node.y - nodeHeight / 2 + 12}
                        r="8"
                        fill="white"
                        stroke="#D97556"
                        strokeWidth="2"
                        className="hover:fill-burnt-50 cursor-pointer transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleNode(node.id);
                        }}
                      />
                      {node.expanded ? (
                        <Minus
                          x={node.x + nodeWidth / 2 - 16}
                          y={node.y - nodeHeight / 2 + 8}
                          className="h-3 w-3 text-burnt-600 pointer-events-none"
                        />
                      ) : (
                        <Plus
                          x={node.x + nodeWidth / 2 - 16}
                          y={node.y - nodeHeight / 2 + 8}
                          className="h-3 w-3 text-burnt-600 pointer-events-none"
                        />
                      )}
                      <text
                        x={node.x + nodeWidth / 2 - 12}
                        y={node.y - nodeHeight / 2 + 16}
                        textAnchor="middle"
                        className="fill-burnt-600 text-xs font-bold pointer-events-none"
                      >
                        {node.expanded ? "−" : "+"}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    </MainLayout>
  );
}
