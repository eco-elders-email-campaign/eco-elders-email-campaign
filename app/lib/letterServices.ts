'use server'
import readl from "readline-specific";
import * as fs from "fs";
import LetterInfo from "@/app/components/LetterInfo";
import {redirect} from "next/navigation";
import {isRedirectError} from "next/dist/client/components/redirect";

interface LetterInfo {
    fname?:string,
    mname?:string,
    lname?:string,
    streetName?:string,
    streetSuffix?:string,
    houseNumber?:string,
    aptUnitNumber?:string,
    zip?:string,
    state?:string,
    city?:string,
    country?:string,
    // mailHouseNumber?:string,
    // mailStreetName?:string,
    // mailAptUnitNumber?:string,
    // mailCity?:string,
    // mailStreet?:string,
    // mailZipCode?:string,
    // mailAddress2?:string,
    // mailAddress3?:string,
    // mailCountry?:string
}
interface LetterPromise{
    success:boolean,
    info:LetterInfo,
    message?:string
}
export  async function deleteCount(){
    try{
        fs.rmSync('./parserfiles/currLine.txt')
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
        rowNum = parseInt(fs.readFileSync('./parserfiles/currLine.txt',{encoding:'utf8'}))
    }catch(e:any){
        if(e.errno === -4058){
            console.log('No file. defaulting to line 2 (first line past headers) and creating file.')
            fs.writeFileSync('./parserfiles/currLine.txt','')
        }else{
            console.error(e)
        }
    }
    try{
        // let info:LetterInfo = {
        //     fname: "",
        //     lname: "",
        //     // address: "",
        //     zip: "",
        //     state: "",
        //     city: "",
        // }
        let csvRow:any = await new Promise (resolve=>{
            readl.oneline('parserfiles/voterfile.csv',1,(err: string, res: string)=>{
                let keys = {}
                if (err) {
                    console.error(err);
                }
                Object.values(res.split(',')).map(key => {
                    // @ts-ignore
                    keys[key.substring(1,key.length-1).toLowerCase().replaceAll(' ','_')] = ''
                })
                resolve(keys)
            })
        })

        return await new Promise((resolve) => {
            readl.oneline('parserfiles/voterfile.csv', rowNum, (err: string, res: string) => {
                let info:LetterInfo = {}
                if (err) {
                    console.error(err);
                }
                let success = false;
                let message = '';
                if (res !== '') {
                    // console.log(res)
                    let resInf = res.split(',')
                    Object.keys(csvRow).map((key, index) => {
                        // @ts-ignore
                        csvRow[key] = resInf[index]
                    })
                    if(csvRow['mailing_zipcode']==='""'){
                        info = {
                            fname:csvRow['first_name'],
                            mname: csvRow['middle_name'] === '""'?null:csvRow['middle_name'],
                            lname:csvRow['last_name'],
                            houseNumber:csvRow['residence_street_number'].replaceAll('"',''),
                            aptUnitNumber:csvRow['residence_apt_unit_number'].replaceAll('"',''),
                            streetName:csvRow['residence_street_name'].replaceAll('"',''),
                            city:csvRow['residence_city'],
                            state:csvRow['mailing_state']==="GEORGIA"?'GA':'',
                            zip:csvRow['residence_zipcode'].replaceAll('"',''),
                            country: csvRow['mailing_country'] === '""'?"USA":csvRow['mailing_country'],
                        }
                    }else{
                        info = {
                            fname:csvRow['first_name'],
                            mname: csvRow['middle_name'] === '""'?null:csvRow['middle_name'],
                            lname:csvRow['last_name'],
                            houseNumber:csvRow['mailing_street_number'].replaceAll('"',''),
                            aptUnitNumber:csvRow['mailing_apt_unit_number'].replaceAll('"',''),
                            streetName:csvRow['mailing_street_name'].replaceAll('"',''),
                            city:csvRow['mailing_city'],
                            state:csvRow['mailing_state']==="GEORGIA"?'GA':'',
                            zip:csvRow['mailing_zipcode'].replaceAll('"',''),
                            country:'USA',
                        }
                    }
                    success = true
                } else {
                    message = 'No more addresses to read!'
                    success = false
                }
                fs.writeFile('./parserfiles/currLine.txt', (rowNum + 1).toString(), () => {
                })
                resolve({success,info,message})
            })
        })
    }catch(err:any){
        console.error(err)
        return({success:false,info:{},message:''})
    }
}