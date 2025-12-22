import { ApiResponse } from "@/types/base";
import { howl } from "../utils";
import { loginResponse } from "@/types/auth";



export async function loginApi({email,password,role}:{email:string,password:string,role:string}):Promise<ApiResponse<loginResponse>>{
    return howl(`/login`,{method:"POST",body:{email,password,role}});
}
export async function forgotApi({email}:{email:string}):Promise<ApiResponse<{otp?:string}>>{
    return howl(`/forgot-password`,{method:"POST",body:{email}});
}
export async function verifyOtpApi({otp}:{otp:string}):Promise<ApiResponse<loginResponse>>{
    return howl(`/verify-otp`,{method:"POST",body:{otp}});
}
export async function changePasswordApi({password,password_confirmation,token}:{token:string,password:string,password_confirmation:string}):Promise<ApiResponse<any>>{
    return howl(`/change-password`,{method:"POST",body:{password,password_confirmation},token});
}