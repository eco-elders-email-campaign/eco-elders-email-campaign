import LetterInfo from "@/app/components/LetterInfo";
import {deleteCount} from "@/app/lib/letterServices";

export default function Home() {
  return (
    <main className={'flex justify-around flex-wrap m-8 my-[10vh]'}>
      <LetterInfo/>
      <div className={'border-2 border-black w-4/5 h-[20vh] my-[10vh] '}>
          this is an example website
          <br/>
          <form action={deleteCount}>
          to reset the addresses,  <button className={'text-blue-500'}>click here</button>
          </form>
          note, this will not refresh the page, so your latest address will still be there.
      </div>
    </main>
  );
}
