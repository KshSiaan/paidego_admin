
import type { AdminDashboardApiType, AdminDisputeType, AdminEventsApiType } from "@/types/admin";
import { howl } from "../utils";
import type { ApiResponse } from "@/types/base";
import type { BranchType, CashVerificationType, EventWinner, LeaderboardType, PaymentType, RefundType, TeamType, TransactionsApi, UserType } from "@/types/auth";

export async function AdminDashboardApi(token:string):Promise<ApiResponse<AdminDashboardApiType>>{
    return howl(`/admin/dashboard-info`,{token});
}
export async function getEventsApi(token:string):Promise<ApiResponse<AdminEventsApiType[]>>{
    return howl(`/admin/get-events`,{token});
}
export async function getUsersApi({search="",filter="",token}:{search?:string,filter?:string,token:string}):Promise<ApiResponse<UserType[]>>{
    return howl(`/admin/get-users?search=${search}&filter=${filter}`,{token});
}
export async function getTeamsApi(token:string):Promise<ApiResponse<TeamType[]>>{
    return howl(`/admin/get-teams`,{token});
}
export async function getBranchesApi(token:string):Promise<ApiResponse<BranchType[]>>{
    return howl(`/admin/get-branches`,{token});
}
export async function getCashRequestAPi(token:string):Promise<ApiResponse<CashVerificationType[]>>{
    return howl(`/admin/get-cash-requests`,{token});
}
export async function getTransactionAPi(filter:string,token:string):Promise<ApiResponse<TransactionsApi>>{
    return howl(`/get-transactions?filter=${filter}`,{token});
}
export async function getPaymentApi(token:string):Promise<ApiResponse<PaymentType>>{
    return howl(`/admin/payment-list`,{token});
}
export async function getLeaderboardApi(token:string):Promise<ApiResponse<LeaderboardType>>{
    return howl(`/admin/leader-board-info`,{token});
}
export async function getRefundListApi(token:string):Promise<ApiResponse<RefundType>>{
    return howl(`/admin/refund-list`,{token});
}
export async function getDisputesApi(token:string):Promise<ApiResponse<AdminDisputeType[]>>{
    return howl(`/admin/get-disputes`,{token});
}

//Actions:
export async function getEventWinners(id:string|number,token:string):Promise<ApiResponse<EventWinner[]>>{
    return howl(`/admin/get-winners/${id}`,{token});
}
export async function toggleBanUnbanApi(id:string,token:string):Promise<ApiResponse<UserType>>{
    return howl(`/admin/block-unblock-toggle/${id}`,{token,method:"PATCH"});
}
export async function acceptWinnerApi(id:string,token:string):Promise<ApiResponse<UserType>>{
    return howl(`/admin/accept-winner/${id}`,{token,method:"PATCH"});
}
export async function declineWinnerApi(id:string,token:string):Promise<ApiResponse<UserType>>{
    return howl(`/admin/decline-winner/${id}`,{token,method:"PATCH"});
}
export async function adminPrizeDistApi(id:string,token:string):Promise<ApiResponse<UserType>>{
    return howl(`/admin/prize-distribution/${id}`,{token,method:"POST"});
}
export async function addBranchApi(token:string,body:{
    name:string,
    location:string,
    latitude:string,
    longitude:string,
  country:string,
  working_hour:string
}):Promise<ApiResponse<BranchType>>{
    return howl(`/admin/create-branch`,{token,method:"POST",body});
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
    return howl(`/admin/edit-branch/${id}`,{token,method:"POST",body});
}

export async function branchDeleteApi(id:string,token:string):Promise<ApiResponse<UserType>>{
    return howl(`/admin/delete-branch/${id}`,{token,method:"DELETE"});
}

export async function verifCashApi(id:string,token:string):Promise<ApiResponse<UserType>>{
    return howl(`/admin/cash-verification/${id}`,{token,method:"PATCH"});
}
export async function singleJoinApi(id:string,player:string,token:string):Promise<ApiResponse<UserType>>{
    return howl(`/admin/cash-single-join/${id}?player_id=${player}`,{token,method:"POST"});
}
export async function teamJoinApi(id:string,team:string,token:string):Promise<ApiResponse<UserType>>{
    return howl(`/admin/cash-team-join/${id}?team_id=${team}`,{token,method:"POST"});
}
export async function deleteCashApi(id:string,token:string):Promise<ApiResponse<UserType>>{
    return howl(`/admin/delete-request/${id}`,{token,method:"DELETE"});
}

export async function AcceptTransApi(id:string,token:string):Promise<ApiResponse<TransactionsApi>>{
    return howl(`/admin/request-accept/${id}`,{token,method:"PATCH"});
}
export async function AcceptPaymentApi(id:string,token:string):Promise<ApiResponse<PaymentType>>{
    return howl(`/admin/confirm-payment/${id}`,{token,method:"PATCH"});
}
export async function ConfirmRefund(id:string,token:string):Promise<ApiResponse<PaymentType>>{
    return howl(`/admin/confirm-refund/${id}`,{token,method:"PATCH"});
}
export async function DenyRefund(id:string,token:string):Promise<ApiResponse<PaymentType>>{
    return howl(`/admin/cancel-refund/${id}`,{token,method:"DELETE"});
}
export async function SolveReport(id:string,token:string):Promise<ApiResponse<PaymentType>>{
    return howl(`/admin/report-solve/${id}`,{token,method:"PATCH"});
}


export async function AboutUsApi(token:string,body:{title:string,content:string}):Promise<ApiResponse<PaymentType>>{
    return howl(`/pages/about-us`,{token,method:"POST",body});
}
export async function getAboutUsApi(token:string):Promise<ApiResponse<PaymentType>>{
    return howl(`/pages/about-us`,{token});
}

