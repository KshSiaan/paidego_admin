
import type { AdminDashboardApiType, AdminDisputeType, AdminEventsApiType, } from "@/types/admin";
import { howl } from "../utils";
import type { ApiResponse } from "@/types/base";
import { BranchType, EventWinner, PaymentType, TeamType, TransactionsApi, UserType } from "@/types/auth";




export async function supportDashboardApi(token:string):Promise<ApiResponse<AdminDashboardApiType>>{
    return howl(`/support/dashboard-info`,{token});
}

export async function getEventsApi(token:string):Promise<ApiResponse<AdminEventsApiType[]>>{
    return howl(`/support/get-events`,{token});
}

export async function getUsersApi({search="",filter="",token}:{search?:string,filter?:string,token:string}):Promise<ApiResponse<UserType[]>>{
    return howl(`/support/get-users?search=${search}&filter=${filter}`,{token});
}
export async function getTeamsApi(token:string):Promise<ApiResponse<TeamType[]>>{
    return howl(`/support/get-teams`,{token});
}
export async function getDisputesApi(token:string):Promise<ApiResponse<AdminDisputeType[]>>{
    return howl(`/support/get-disputes`,{token});
}


//actions"


export async function toggleBanUnbanApi(id:string,token:string):Promise<ApiResponse<UserType>>{
    return howl(`/support/block-unblock-toggle/${id}`,{token,method:"PATCH"});
}




//FROM ADMIN:

export async function getEventWinners(id:string|number,token:string):Promise<ApiResponse<EventWinner[]>>{
    return howl(`/support/get-winners/${id}`,{token});
}

export async function acceptWinnerApi(id:string,token:string):Promise<ApiResponse<UserType>>{
    return howl(`/support/accept-winner/${id}`,{token,method:"PATCH"});
}
export async function declineWinnerApi(id:string,token:string):Promise<ApiResponse<UserType>>{
    return howl(`/support/decline-winner/${id}`,{token,method:"PATCH"});
}
export async function adminPrizeDistApi(id:string,token:string):Promise<ApiResponse<UserType>>{
    return howl(`/support/prize-distribution/${id}`,{token,method:"POST"});
}
export async function addBranchApi(token:string,body:{
    name:string,
    location:string,
    latitude:string,
    longitude:string,
  country:string,
  working_hour:string
}):Promise<ApiResponse<BranchType>>{
    return howl(`/support/create-branch`,{token,method:"POST",body});
}
export async function editBranchApi(token:string,id:string,body:{
    name:string,
    location:string,
    latitude:string,
    longitude:string,
    country:string,
  working_hour:string,
  _method:string,
}):Promise<ApiResponse<BranchType>>{
    return howl(`/support/edit-branch/${id}`,{token,method:"POST",body});
}

export async function branchDeleteApi(id:string,token:string):Promise<ApiResponse<UserType>>{
    return howl(`/support/delete-branch/${id}`,{token,method:"DELETE"});
}

export async function verifCashApi(id:string,token:string):Promise<ApiResponse<UserType>>{
    return howl(`/support/cash-verification/${id}`,{token,method:"PATCH"});
}
export async function singleJoinApi(id:string,player:string,token:string):Promise<ApiResponse<UserType>>{
    return howl(`/support/cash-single-join/${id}?player_id=${player}`,{token,method:"POST"});
}
export async function teamJoinApi(id:string,team:string,token:string):Promise<ApiResponse<UserType>>{
    return howl(`/support/cash-team-join/${id}?team_id=${team}`,{token,method:"POST"});
}
export async function deleteCashApi(id:string,token:string):Promise<ApiResponse<UserType>>{
    return howl(`/support/delete-request/${id}`,{token,method:"DELETE"});
}

export async function AcceptTransApi(id:string,token:string):Promise<ApiResponse<TransactionsApi>>{
    return howl(`/support/request-accept/${id}`,{token,method:"PATCH"});
}
export async function AcceptPaymentApi(id:string,token:string):Promise<ApiResponse<PaymentType>>{
    return howl(`/support/confirm-payment/${id}`,{token,method:"PATCH"});
}
export async function ConfirmRefund(id:string,token:string):Promise<ApiResponse<PaymentType>>{
    return howl(`/support/confirm-refund/${id}`,{token,method:"PATCH"});
}
export async function DenyRefund(id:string,token:string):Promise<ApiResponse<PaymentType>>{
    return howl(`/support/cancel-refund/${id}`,{token,method:"DELETE"});
}
export async function SolveReport(id:string,token:string):Promise<ApiResponse<PaymentType>>{
    return howl(`/support/report-solve/${id}`,{token,method:"PATCH"});
}