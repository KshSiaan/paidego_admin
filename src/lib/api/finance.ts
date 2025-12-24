
import type { AdminDashboardApiType, } from "@/types/admin";
import { howl } from "../utils";
import type { ApiResponse } from "@/types/base";
import { PaymentType, RefundType, TransactionsApi, UserType } from "@/types/auth";
import { EarningType } from "@/types/finance";



export async function FinanceDashboardApi(token:string):Promise<ApiResponse<AdminDashboardApiType>>{
    return howl(`/finance/dashboard-info`,{token});
}

export async function getPaymentApi(token:string):Promise<ApiResponse<PaymentType>>{
    return howl(`/finance/payment-list`,{token});
}

export async function getRefundListApi(token:string):Promise<ApiResponse<RefundType>>{
    return howl(`/finance/refund-list`,{token});
}
export async function getPlatformEarnings(token:string):Promise<ApiResponse<EarningType>>{
    return howl(`/finance/earning-list`,{token});
}



//action:


export async function verifCashApi(id:string,token:string):Promise<ApiResponse<UserType>>{
    return howl(`/finance/cash-verification/${id}`,{token,method:"PATCH"});
}
export async function singleJoinApi(id:string,player:string,token:string):Promise<ApiResponse<UserType>>{
    return howl(`/finance/cash-single-join/${id}?player_id=${player}`,{token,method:"POST"});
}
export async function teamJoinApi(id:string,team:string,token:string):Promise<ApiResponse<UserType>>{
    return howl(`/finance/cash-team-join/${id}?team_id=${team}`,{token,method:"POST"});
}
export async function deleteCashApi(id:string,token:string):Promise<ApiResponse<UserType>>{
    return howl(`/finance/delete-request/${id}`,{token,method:"DELETE"});
}

export async function AcceptTransApi(id:string,token:string):Promise<ApiResponse<TransactionsApi>>{
    return howl(`/finance/request-accept/${id}`,{token,method:"PATCH"});
}
export async function AcceptPaymentApi(id:string,token:string):Promise<ApiResponse<PaymentType>>{
    return howl(`/finance/confirm-payment/${id}`,{token,method:"PATCH"});
}
export async function ConfirmRefund(id:string,token:string):Promise<ApiResponse<PaymentType>>{
    return howl(`/finance/confirm-refund/${id}`,{token,method:"PATCH"});
}
export async function DenyRefund(id:string,token:string):Promise<ApiResponse<PaymentType>>{
    return howl(`/finance/cancel-refund/${id}`,{token,method:"DELETE"});
}
export async function SolveReport(id:string,token:string):Promise<ApiResponse<PaymentType>>{
    return howl(`/finance/report-solve/${id}`,{token,method:"PATCH"});
}