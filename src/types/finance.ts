


export interface EarningType{
  current_page: number
  data: Array<{
    id: number
    event_name: string
    event_type: string
    total_entries: string
    commission: string
    created_at: string
    updated_at: string
  }>
  first_page_url: string
  from: number
  last_page: number
  last_page_url: string
  links: Array<{
    url?: string
    label: string
    page?: number
    active: boolean
  }>
  next_page_url: any
  path: string
  per_page: number
  prev_page_url: any
  to: number
  total: number
}
