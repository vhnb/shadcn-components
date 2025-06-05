import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Toaster } from "@/components/ui/sonner"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { FaUser } from "react-icons/fa";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function Header() {

    function handleEvent() {
        window.location.href = '/login'
    }

    function handleEventToHome() {
        window.location.href = '/'
    }

    return (
        <>
            <header className="flex items-center justify-center h-[60px] bg-stone border-b border-neutral-300 sticky top-0 bg-white z-[1]">
                <div className="flex items-center justify-between max-w-[1000px] w-[90%]">
                    <h1 onClick={handleEventToHome} className="cursor-pointer font-bold text-[20px]">Your<span className="ml-1 bg-zinc-800 text-[15px] py-1 px-2 rounded-[6px] text-white">Notes</span></h1>
                    <div className="flex">
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <Button className="mr-1" variant='outline'><FaUser color="#2e2e2e" /> Minha conta</Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel>Opções</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => window.location.href = 'dashboard'}>Dashboard</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Sair</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <Button onClick={handleEvent} variant="outline">Entrar</Button>
                    </div>
                </div>
            </header>
            <Toaster />
        </>
    )
}