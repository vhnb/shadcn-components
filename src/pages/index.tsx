import { Button } from "@/components/ui/button";



export default function Home() {
  return (
    <main className="flex items-center justify-center flex-row h-[calc(100vh-60px)]">
      <div className="flex items-center justify-between flex-row max-w-[1000px] w-[90%]">
        <div className="flex items-start justify-center flex-col">
          <h1 className="text-[30px] font-bold mb-3">Conheça o YourNotes</h1>
          <p className="mb-3 text-zinc-500 text-[15px]">"Lorem ipsum dolor sit sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
          <Button>Começar agora</Button>
        </div>
        <img src='/image3.png' className="mask-radial-[100%_100%] mask-radial-from-75% mask-radial-at-right h-[400px] w-[600px]" />
      </div>
    </main>
  );
}
