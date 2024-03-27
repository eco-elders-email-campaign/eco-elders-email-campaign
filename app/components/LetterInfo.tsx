'use client'

import {useState} from "react";
import {getNextLetter} from "@/app/lib/letterServices";

interface Letter {
    fname?:string,
    lname?:string,
    address?:string,
    zip?:string,
    state?:string,
    city?:string,
}

export default function LetterInfo(){
    const [letter,setLetter]= useState<Letter>({})
    const [message,setMessage]= useState<string|undefined>("Please click the stamp to get an address")

    const getNext=async () => {
        let res = await getNextLetter()
        console.log(res)
        if(res.success){
            setLetter(res.info)
            setMessage('')
        }else{
            setMessage(res.message)
        }
    }

    return(
        <div className={'border-2 border-black w-3/5 h-[40vh] py-[10vh] bg-yellow-100 relative'}>
            <div className={'border-2 border-red-600 bg-red-400 w-[8vw] h-[6vh] text-center float-right right-0 top-0 m-4 absolute '}><button className={'w-fill h-fill'} onClick={getNext}>Next Address</button></div>
            {message?
                <div className={'border-2 border-black w-2/5 h-full mx-auto'}>
                    <p className={'text-2xl text-red-600 text-center'}>
                        {message}
                    </p>
                </div>
                :
                <div className={'border-2 border-black w-2/5 h-full mx-auto'}>

                    <p>{letter.fname}</p>
                    <p>{letter.address}</p>
                </div>
            }

        </div>
    )
}