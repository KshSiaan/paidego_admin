
import type { AdminDashboardApiType, AdminEventsApiType } from "@/types/admin";
import { howl } from "../utils";
import type { ApiResponse } from "@/types/base";
import type { BranchType, CashVerificationType, PaymentType, TeamType, TransactionsApi, UserType } from "@/types/auth";



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