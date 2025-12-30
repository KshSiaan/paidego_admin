

export interface AdminDashboardApiType{
  users: number
  events: number
  branch: number
  earning: string
  recent_activities: {
    current_page: number
    data: Array<{
      id: number
      date: string
      user: string
      action: string
      details: string
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
    next_page_url: string
    path: string
    per_page: number
    prev_page_url: any
    to: number
    total: number
  }
}


export interface AdminEventsApiType{
  id: number
  organizer_id: number
  title: string
  description: string
  sport_type: string
  sport_name: string
  starting_date: string
  ending_date: string
  time: string
  location: string
  latitude: string
  longitude: string
  number_of_player_required: number
  number_of_team_required: number
  number_of_player_required_in_a_team: number
  entry_fee: string
  prize_amount: string
  prize_distribution: Array<{
    place: string
    percentage: number
    additional_prize: string
    percentage_amount: number
  }>
  rules_guidelines: string
  image: string
  status: string
  view: number
  share: number
  created_at: string
  updated_at: string
  image_url: string
  organizer: {
    id: number
    full_name: string
    user_name: string
    avatar_url: string
  }
}
export interface AdminDisputeType{
  id: number
  reported_by: number
  against: number
  reason: string
  status: string
  created_at: string
  updated_at: string
}