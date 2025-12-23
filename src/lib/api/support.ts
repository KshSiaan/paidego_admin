
import type { AdminDashboardApiType, AdminDisputeType, AdminEventsApiType, } from "@/types/admin";
import { howl } from "../utils";
import type { ApiResponse } from "@/types/base";
import { TeamType, UserType } from "@/types/auth";




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
