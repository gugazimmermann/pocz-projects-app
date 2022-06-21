import { Lang } from '@lang';

export function showPlanPeriod(reason: string): string {
  const r = reason.toLowerCase();
  if (r.includes(Lang.Auth.Plans.Period.Monthly)) {
    return Lang.Auth.Plans.Period.Month;
  } if (r.includes(Lang.Auth.Plans.Period.Biannual)) {
    return Lang.Auth.Plans.Period.Halfyear;
  }
  return Lang.Auth.Plans.Period.Year;
}
