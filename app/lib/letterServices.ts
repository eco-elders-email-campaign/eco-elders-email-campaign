'use server'
import readl from "readline-specific";
import * as fs from "fs";
import LetterInfo from "@/app/components/LetterInfo";
import {redirect} from "next/navigation";
import {isRedirectError} from "next/dist/client/components/redirect";

interface LetterInfo {
    fname?:string,
    lname?:string,
    address?:string,
    zip?:string,
    state?:string,
    city?:string,
}
interface LetterPromise{
    success:boolean,
    info:LetterInfo,
    message?:string
}
export  async function deleteCount(){
    try{
        fs.rmSync('currLine.txt')
    }catch(err){
        if(isRedirectError(err)){
            throw err
        }
        console.error(err)
    }
}

export  async function getNextLetter():Promise<LetterPromise>{
    let rowNum = 2
    try{
        rowNum = parseInt(fs.readFileSync('currLine.txt',{encoding:'utf8'}))
    }catch(e:any){
        if(e.errno === -4058){
            console.log('No file. defaulting to line 2 (first line past headers) and creating file.')
            fs.writeFileSync('currLine.txt','')
        }else{
            console.error(e)
        }
    }
    try{
        let info:LetterInfo = {
            fname: "",
            lname: "",
            address: "",
            zip: "",
            state: "",
            city: "",
        }
        return await new Promise((resolve) => {
            readl.oneline('exampledata.csv', rowNum, (err: string, res: string) => {
                if (err) {
                    console.error(err);
                }
                let success = false;
                let message = '';
                if (res !== '') {
                    let resInf = res.split(',')
                    Object.keys(info).map((key, index) => {
                        // @ts-ignore
                        info[key] = resInf[index]
                    })
                    success = true
                } else {
                    message = 'No more addresses to read!'
                    success = false
                }
                fs.writeFile('currLine.txt', (rowNum + 1).toString(), () => {
                })
                resolve({success,info,message})
            })
        })
    }catch(err:any){
        console.error(err)
        return({success:false,info:{},message:''})
    }
}