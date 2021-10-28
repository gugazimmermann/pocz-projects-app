export function showPlanPeriod(reason: string): string {
  const r = reason.toLowerCase();
  if (r.includes('mensal')) {
    return 'mês';
  } if (r.includes('semestral')) {
    return 'semestre';
  }
  return 'ano';
}
