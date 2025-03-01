import axios from 'axios';

export interface WorkbookEntities {
  entries: Entry[]
}

export interface Entry {
  entryId: string
  scope: string
  type: string
  key: string
  createdBy: string
  createdAt: string
  updatedBy: string
  updatedAt: string
  savedId: string
  publishedId: string
  meta: Meta
  hidden: boolean
  workbookId: string
  isFavorite: boolean
  isLocked: boolean
  mirrored: boolean
}

export interface Meta {
  is_release: boolean
}

export const client = axios.create({
  baseURL: 'https://xn----7sbbznd9a5a.xn--p1ai/',
})