/**
 * Utilitários para manipulação de datas com fuso horário do Brasil
 */

/**
 * Cria uma data no fuso horário do Brasil
 * @param dateString - String da data no formato YYYY-MM-DD
 * @returns Date object no fuso horário do Brasil
 */
export function createBrazilianDate(dateString: string): Date {
  // Força o horário para meio-dia (12:00) para evitar problemas de fuso horário
  return new Date(dateString + 'T12:00:00');
}

/**
 * Formata uma data para o padrão brasileiro (DD/MM/YYYY)
 * @param dateString - String da data no formato YYYY-MM-DD
 * @returns String formatada no padrão brasileiro
 */
export function formatBrazilianDate(dateString: string): string {
  const date = createBrazilianDate(dateString);
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
}

/**
 * Formata uma data para o padrão brasileiro completo (dia da semana, dia de mês de ano)
 * @param dateString - String da data no formato YYYY-MM-DD
 * @returns String formatada no padrão brasileiro completo
 */
export function formatBrazilianDateFull(dateString: string): string {
  const date = createBrazilianDate(dateString);
  return date.toLocaleDateString('pt-BR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

/**
 * Formata uma data para o padrão brasileiro com dia da semana (DD/MM/YYYY - dia da semana)
 * @param dateString - String da data no formato YYYY-MM-DD
 * @returns String formatada no padrão brasileiro com dia da semana
 */
export function formatBrazilianDateWithWeekday(dateString: string): string {
  const date = createBrazilianDate(dateString);
  return date.toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
}

/**
 * Obtém a data atual no fuso horário do Brasil
 * @returns String da data atual no formato YYYY-MM-DD
 */
export function getCurrentBrazilianDate(): string {
  const now = new Date();
  const brazilianDate = new Date(now.getTime() - (now.getTimezoneOffset() * 60000));
  return brazilianDate.toISOString().split('T')[0];
}

/**
 * Compara duas datas no fuso horário do Brasil
 * @param dateString1 - Primeira data no formato YYYY-MM-DD
 * @param dateString2 - Segunda data no formato YYYY-MM-DD
 * @returns -1 se dateString1 < dateString2, 0 se iguais, 1 se dateString1 > dateString2
 */
export function compareBrazilianDates(dateString1: string, dateString2: string): number {
  const date1 = createBrazilianDate(dateString1);
  const date2 = createBrazilianDate(dateString2);
  return date1.getTime() - date2.getTime();
}
