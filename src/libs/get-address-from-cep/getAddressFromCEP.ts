import { Lang } from '@lang';

export async function getAddressFromCEP(zip: string) {
  let cleanCep = '';
  if (zip.length > 1) cleanCep = zip.replace(/\D/g, '');
  if (cleanCep.length === 8) {
    const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
    const data = await response.json();
    if (!data?.erro) {
      return {
        state: data.uf,
        address: data.logradouro,
        neighborhood: data.bairro,
        city: data.localidade,
      };
    }
    throw new Error(`${Lang.Profile.ZipCode} ${Lang.Errors.NotFound}`);
  }
  return null;
}
