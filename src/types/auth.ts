
export interface loginResponse{
  token: string
  token_type: string
  expires_in: string
  user: UserType
}

export interface UserType {
  id: number
  full_name?: string
  user_name?: string
  connected_account_id?: string
  role: string
  email: string
  email_verified_at?: string
  status: string
  otp_verified_at?: string
  otp?: string
  otp_expires_at?: string
  phone_number?: string
  address?: string
  avatar?: string
  instagram_link?: string
  country?: string
  google_id?: string
  created_at: string
  updated_at: string
  avatar_url?: string
}

export interface TeamType{
  id: number
  player_id: number
  name: string
  created_at: string
  updated_at: string
  player: {
    id: number
    full_name: string
    user_name: string
    role: string
    avatar_url: string
  }
  members: Array<{
    id: number
    team_id: number
    player_id: number
    created_at: string
    updated_at: string
    player: {
      id: number
      full_name: string
      user_name: string
      role: string
      avatar_url: string
    }
  }>
}

export interface BranchType{
  id: number
  name: string
  location: string
  latitude?: string
  longitude?: string
  country: string
  working_hour: string
  created_at: string
  updated_at: string
}

export interface CashVerificationType{
    id: number
    event_id: number
    player_id?: number
    team_id?: number
    amount: string
    branch_id: number
    status: string
    created_at: string
    updated_at: string
    player?: {
      id: number
      full_name: string
      avatar_url: string
    }
    team?: {
      id: number
      player_id: number
      name: string
      created_at: string
      updated_at: string
      player: {
        id: number
        full_name: string
        avatar_url: string
      }
    }
    event: {
      id: number
      title: string
      sport_type: string
      image_url: string
    }
    branch: {
      id: number
      name: string
      location: string
      latitude: any
      longitude: any
      country: string
      working_hour: string
      created_at: string
      updated_at: string
    }
  }


  export interface TransactionsApi{
  withdraw_histories: {
    current_page: number
    data: Array<{
      id: number
      user_id: number
      amount: string
      date: string
      status: string
      created_at: string
      updated_at: string
      user: {
        id: number
        full_name: string,
        user_name: string,
        avatar_url: string                    
      }
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
  transactions_histories: {
    current_page: number
    data: Array<{
      id: number
      payment_intent_id?: string
      user_id: number
      event_id?: number
      type: string
      message?: string
      amount: string
      date: string
      status: string
      created_at: string
      updated_at: string
      user: {
        id: number
        full_name: string,
        user_name: string,
        avatar_url: string                    
      }
      event_name?:string
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
}


export interface PaymentType{

  payment_players: {
    current_page: number
    data: Array<{
      id: number
      user_id: any
      role: string
      event_id: number
      event_name: string
      event_type: string
      winners: Array<{
        id: number
        event_id: number
        place: string
        player_id: number
        team_id: any
        amount: string
        additional_prize: string
        admin_approval: number
        status: string
        created_at: string
        updated_at: string
        player: {
          id: number
          full_name: string
          role: string
          avatar_url: string
        }
      }>
      organizer: any
      amount: string
      date: string
      status: string
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
  payment_organizer: {
    current_page: number
    data: Array<{
      id: number
      user_id: number
      role: string
      event_id: number
      event_name: string
      event_type: string
      winners: any
      organizer: string
      amount: string
      date: string
      status: string
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
}


export interface LeaderboardType {
  top_player_by_earnings: Array<{
    id: number
    full_name: string
    total_earning: string
    avatar_url: string
  }>
  top_player_by_events_joined: Array<{
    id: number
    full_name: string
    total_event_joined: number
    avatar_url: string
  }>
}

export interface RefundType{
  current_page: number
  data: Array<{
    id: number
    event_id: number
    event_name: string
    event_type: string
    participants: number
    total_refund_amount: string
    status: string
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

export interface EventWinner{
  id: number
  event_id: number
  place: string
  player_id: number
  team_id: string
  amount: string
  additional_prize: string
  admin_approval: number
  status: string
  created_at: string
  updated_at: string
}
