'use server'
import { isRedirectError } from "next/dist/client/components/redirect";
import * as fs from 'fs';
import {setJwt} from "@/serverFunctions/JWTutils";

export default async function login(formData:FormData){
    try{
        let passwords = fs.readFileSync('./parserfiles/passwords.txt',{encoding:"utf8"})
        if(passwords.includes(formData.get('password') as string)){
            await setJwt({password:formData.get('password')})
            return true
        }else{
            return false
        }
    }catch(err){
        if(isRedirectError(err)){
            throw err
        }else{
            console.error(err)
        }
    }
}