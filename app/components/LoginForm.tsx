'use client'
import {FormEvent,useRef, useState} from "react";
import login from "@/app/lib/authService";
import {useRouter} from "next/navigation";


export default function LoginForm(){
    const formRef = useRef(null)
    const [message,setMessage] = useState('')
    const router = useRouter();
    const handleSubmit=async (e: FormEvent) => {
        e.preventDefault()
        let res = await login(new FormData(formRef.current||undefined))
        if(res){
            setMessage("Password Correct!")
            await router.push('letter');
        }else{
            setMessage("Password Incorrect!")
        }
    }
    return(
        <>
            <form onSubmit={handleSubmit} ref={formRef} className={'grid h-[20vh]'}>
                <label>
                    <span>Enter your password:</span>
                    <input type={'text'} required={true} name={'password'} className={'border-2 border-black rounded-lg'}/>
                </label>
                <p className={'text-center'}>
                    {message}
                </p>
                <input type={'submit'} className={'border-2 border-black rounded-lg hover:bg-amber-100 h-8'}/>
            </form>
        </>
    )
}