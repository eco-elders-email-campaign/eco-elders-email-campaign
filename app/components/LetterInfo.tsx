'use client'

import {useState} from "react";
import {getNextLetter} from "@/app/lib/letterServices";

interface Letter {
    fname?:string,
    mname?:string,
    lname?:string,
    houseNumber?:string,
    aptUnitNumber?:string,
    streetName?:string,
    zip?:string,
    city?:string,
    state?:string,
    country?:string,
}

export default function LetterInfo(){
    const [letter,setLetter]= useState<Letter>({})
    const [message,setMessage]= useState<string|undefined>('Click the stamp to get an address!')

    const getNext=async () => {
        let res = await getNextLetter()
        if(res.success){
            setLetter(res.info)
            setMessage('')
        }else{
            setMessage(res.message)
        }
    }

    return(
        <div className={'w-3/5 h-[40vh] py-[10vh] bg-yellow-100 border-[1px] border-black relative '}>
            <div onClick={getNext} className={'outline-offset-0 hover:cursor-pointer outline-dotted outline-black border-4 border-red-600 border-double bg-red-400 p-8 w-[8vw] h-[6vh] flex justify-center items-center text-center float-right right-0 top-0 m-4 absolute bg-contain  bg-duck'} >Next Address</div>
            {message?
                <div className={'w-2/5 h-full m-auto grid content-center'}>
                    <p className={'text-2xl text-red-600 text-center'}>
                        {message}
                    </p>
                </div>
                :
                <div className={'text-left pr-16 w-fit h-full mx-auto '}>
                    <p>{letter.fname} {letter.lname}</p>
                    <p>{letter.houseNumber} {letter.streetName} {letter.aptUnitNumber!==''?`${letter.aptUnitNumber}`:null}</p>
                    <p>{letter.city} {letter.state} {letter.zip}</p>
                    <p>{letter.country}</p>
                </div>
            }

        </div>
    )
}