export enum SORT_TYPES {
  ASC = 'ASC',
  DESC = 'DESC',
}

export function Sort(
  data: any[],
  { sort, field }: { sort: SORT_TYPES; field: string },
) {
  if (data?.length) {
    if (sort === SORT_TYPES.ASC) {
      data.sort((a, b) => {
        if (typeof a[field] === 'boolean') return a[field] - b[field];
        return (a[field] as string).localeCompare(b[field] as string);
      });
    }
    if (sort === SORT_TYPES.DESC) {
      data.sort((a, b) => {
        if (typeof a[field] === 'boolean') return b[field] - a[field];
        return (b[field] as string).localeCompare(a[field] as string);
      });
    }
    return data;
  }
  return [];
}
