
import * as fs from "fs";
import readline from 'readline'
interface TextContent{
    title?:string,
    paragraph?:string,
    list:[],
}
const orderArray = ['who.txt','why.txt','what.txt','how.txt','when.txt','letter-guide.txt','letter-format.txt']
export async function readContent(){
    let filePaths = fs.readdirSync('./text-content/')
    let content:Array<TextContent> = []
    filePaths.sort((a,b)=>{
        if(orderArray.indexOf(a) > orderArray.indexOf(b)){
            return 1
        }
        if(orderArray.indexOf(a) < orderArray.indexOf(b)){
            return -1
        }
        return 0
    })

    for await(let file of filePaths){
        const stream = fs.createReadStream(`./text-content/${file}`,'utf8')
        const rl = readline.createInterface({
            input: stream,
            crlfDelay: Infinity
        });
        let newContent:TextContent = {
            title:'',
            list:[],
            paragraph:'',
        };
        let list:Array<string>=[];
        let count = 0
        for await (let line of rl){
            if(count === 0){
                newContent.title = line
            }else{
                if(line.startsWith('-')){
                    // @ts-ignore
                    newContent.list.push(line.substring(1))
                }else{
                    newContent.paragraph+=`${line} `
                }
            }
            count++;
        }
        content.push(newContent)
    }
    return content
}