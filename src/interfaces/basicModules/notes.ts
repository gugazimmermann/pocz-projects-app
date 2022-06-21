export interface INotes {
  id?: string;
  date: string;
  title: string;
  content: string;
  tenantId?: string;
  ownerId?: string;
}

export interface INoteNew {
  id?: string;
  date?: string;
  title: string;
  content: string;
  tenantId?: string;
  ownerId?: string;
}
