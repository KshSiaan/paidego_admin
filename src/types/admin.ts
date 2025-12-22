

export interface AdminDashboardApiType{
  users: number
  events: number
  branch: number
  earning: string
  recent_activities: Array<{
    id: number
    date: string
    user: string
    action: string
    details: string
    created_at: string
    updated_at: string
  }>
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
