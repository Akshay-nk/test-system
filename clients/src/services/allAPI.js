import { BaseURL } from "./BaseURL"
import {  commonAPI } from "./commonAPI"




export const registerAPI = async(user)=>{
    return await commonAPI("POST",`${BaseURL}/user/register`,user,"")
}

//login

export const loginAPI = async(user)=>{
    return await commonAPI("POST",`${BaseURL}/user/login`,user,"")
}

export const getAllQuestionsAPI = async(reqHeader)=>{
    return await commonAPI("GET",`${BaseURL}/questions/all`,"",reqHeader)
}

export const addFeedbackAPI = async(reqBody,reqHeader)=>{
    return await commonAPI("POST",`${BaseURL}/feedback/add`,reqBody,reqHeader)
}
