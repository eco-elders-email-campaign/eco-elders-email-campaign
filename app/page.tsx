import LetterInfo from "@/app/components/LetterInfo";
import TextContent from "@/app/components/TextContent"
import {deleteCount} from "@/app/lib/letterServices";

export default function Home() {
    return (
    <main className={'flex justify-around flex-wrap overflow-y-hidden m-8'}>
        <h1 className={'text-4xl w-full text-center my-[5vh]'}>
            Eco-Elders Email Campaign
        </h1>
      <LetterInfo/>
      {/*  @ts-ignore*/}
      <TextContent/>
      {/*<div className={'border-2 border-black w-4/5 h-[20vh] my-[10vh] '}>*/}
      {/*    this is an example website*/}
      {/*    <br/>*/}
      {/*    <form action={deleteCount}>*/}
      {/*    to reset the addresses,  <button className={'text-blue-500'}>click here</button>*/}
      {/*    </form>*/}
      {/*    note, this will not refresh the page, so your latest address will still be there.*/}
      {/*</div>*/}
    </main>
  );
}
