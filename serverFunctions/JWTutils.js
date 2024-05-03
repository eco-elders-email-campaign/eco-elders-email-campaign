import {decryptData, encryptData} from "./crypto/encryption";
import jwt from "jsonwebtoken";
import {cookies} from "next/headers";

export async function setJwt(data){
    try{
        let encData = await encryptData(JSON.stringify(data))
        let token =  await jwt.sign({encData:encData},process.env.JWT_SECRET,{
            expiresIn: 25*60,
        })
        cookies().set('jwtoken',token,{
            httpOnly: true,
            sameSite: "strict",
            // secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60
        })
        return true
    }catch(error){
        console.error(error)
        return false
    }
}
export async function getJwtData(cookie){
    try{
        const tokenData = await jwt.decode(cookie.value)
        let tokenValues = await decryptData(tokenData.encData)
        return JSON.parse(tokenValues)
    }catch(error){
        await deleteJwt()
    }
}

export async function getJwt(cookie){
    try{
        const tokenData = await jwt.decode(cookie.value)
        let tokenValues = await decryptData(tokenData.encData)
        return {data:JSON.parse(tokenValues),iat:tokenData.iat,exp:tokenData.exp}
    }catch(error){
        return {}
    }
}
export async function deleteJwt(){
    try{
        cookies().delete('jwtoken')
        return true
    }catch(error){
        console.error(error)
        return false
    }
}
