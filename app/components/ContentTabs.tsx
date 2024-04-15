'use client'
import {AwaitedReactNode, Children, JSXElementConstructor, ReactElement, ReactNode, SetStateAction,
    useState
} from "react";

export default function ContentTabs(props: {
    children: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | Promise<AwaitedReactNode> | null | undefined;
}) {
    let [selected, setSelected] = useState(0)
    const changeTab = (e: { target: { id: SetStateAction<number>; }; stopPropagation: () => void; })=>{
        setSelected(e.target.id)
        e.stopPropagation()
    }
    return(
        <div className={'flex justify-between flex-wrap mt-4'}>
            <div className={'flex flex-wrap w-full items-end '}>
                {Object.values(Children.toArray(props.children)).map((child,index)=>{
                    // @ts-ignore
                    return <input key={child.props.id} type={"button"} value={child.props.id} id={index} onClick={changeTab} className={parseInt(selected) === index?' grow bg-lime-100 border-2 border-b-0 border-gray-500 rounded-t transition-all':'w-fit px-8 h-[1lh] mb-0 content-end border-2 border-b-0 border-gray-500 rounded-t transition-all'} />
                })}
            </div>
            <hr/>
            {Children.toArray(props.children)[selected]}
        </div>
    )
}