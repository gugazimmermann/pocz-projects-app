export interface IAttachments {
  id: string;
  date: string;
  name: string;
  link: string;
  ownerId?: string;
}

export interface IAttachmentFile extends File {
  preview: string;
  path: string;
}
