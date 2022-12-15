type Note = {
  id: number,
  title: string,
  body: string,
  createdAt: string,
  updatedAt: string,
  formattedCreatedAt: string,
  formattedUpdatedAt: string,
}

export enum ActionNote {
  ShowNote = 0,
  CreateNote = 1,
  EditNote = 2
}

export type {
  Note
}