// Configurações de localização para StudyAI
export const localization = {
  // Idioma principal: Português do Brasil
  primary: {
    code: "pt-BR",
    name: "Português (Brasil)",
    flag: "🇧🇷",
  },

  // Idioma secundário: Inglês
  secondary: {
    code: "en-US",
    name: "English (US)",
    flag: "🇺🇸",
  },

  // Strings comuns da aplicação
  common: {
    loading: "Carregando...",
    error: "Erro",
    success: "Sucesso",
    cancel: "Cancelar",
    save: "Salvar",
    delete: "Excluir",
    edit: "Editar",
    close: "Fechar",
    yes: "Sim",
    no: "Não",
  },

  // Mensagens de estado
  messages: {
    fileUploadSuccess: "Arquivo enviado com sucesso!",
    fileUploadError: "Erro ao enviar arquivo",
    generationComplete: "Material de estudo gerado com sucesso!",
    generationError: "Erro ao gerar material de estudo",
    noContentProvided:
      "Por favor, forneça algum conteúdo para gerar o material",
    selectOutputType: "Selecione pelo menos um tipo de saída",
  },

  // Formatação de data/hora para pt-BR
  dateFormat: {
    locale: "pt-BR",
    options: {
      year: "numeric" as const,
      month: "long" as const,
      day: "numeric" as const,
      hour: "2-digit" as const,
      minute: "2-digit" as const,
    },
  },
};

// Função para formatar datas em português brasileiro
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat(
    localization.dateFormat.locale,
    localization.dateFormat.options,
  ).format(date);
}

// Função para formatação de números em português brasileiro
export function formatNumber(num: number): string {
  return new Intl.NumberFormat("pt-BR").format(num);
}
