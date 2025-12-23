
import type { AdminDashboardApiType, } from "@/types/admin";
import { howl } from "../utils";
import type { ApiResponse } from "@/types/base";
import { PaymentType, RefundType } from "@/types/auth";
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