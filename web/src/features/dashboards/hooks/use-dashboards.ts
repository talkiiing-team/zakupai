import { useQuery } from '@tanstack/react-query'

import { client } from '@/shared/lib/axios'

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

export const DASHBOARDS_KEY = 'dashboards'

export const useDashboards = () => {
  return (
    useQuery({
      queryKey: [DASHBOARDS_KEY],
      queryFn: () => client.post<WorkbookEntities>(
        '/datalens/gateway/root/us/getWorkbookEntries',
        {
          "workbookId": "rr241df4ft1ad",
          "pageSize": 10,
          "page": 0,
          "orderBy": {
            "field": "name",
            "direction": "asc"
          },
          "scope": "dash"
        }
      ).then(res => res.data)
    })
  )
}
