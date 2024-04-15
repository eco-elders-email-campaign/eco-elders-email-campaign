import {readContent} from "../lib/contentService"
import ContentTabs from "./ContentTabs"
interface TextContent{
    title?:string,
    paragraph?:string,
    list:[],
}
export default async function TextContent() {
    const textContent:Array<TextContent> = await readContent()
    return (
        <ContentTabs>
            {textContent.map(textContent=>{
                return(
                    <div key={textContent.title} className={"w-full border-black border-2 px-16 md:px-48 py-4"} id={textContent.title}>
                        <h2 className={'text-2xl text-center font-bold'}>{textContent.title}</h2>
                        <p className={''}>
                            {textContent.paragraph}
                        </p>
                        <ul className={'list-disc'}>
                            {
                                textContent.list.map((li,index)=>{
                                    return (<li key={`${index}`} className={'py-1'}>{li}</li>)
                                })
                            }
                        </ul>

                    </div>
                )
            })}
        </ContentTabs>
    )
}