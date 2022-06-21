import slugify from 'slugify';
import { Lang } from '@lang';

export function toURL(txt: string): string {
  const locale = Lang.CountryCode.split('-');
  return slugify(txt, { lower: true, locale: locale[0] });
}
