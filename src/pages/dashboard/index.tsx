import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import CardNote from "@/components/CardNote"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


export default function Dashboard() {
    function handleEvent() {
        toast('Nota cadastrada', {
            description: 'Sua nota foi cadastrada com sucesso.'
        })
    }

    return (
        <>
            <main className="flex items-start justify-center flex-row h-[calc(100vh-60px)]">
                <div className="flex items-start justify-center flex-col max-w-[1000px] w-[90%]">
                    <div className="w-full flex items-center justify-between flex-row mt-2 mb-5">
                        <Tooltip>
                            <TooltipTrigger>
                                <div className="flex items-center justify-center flex-row">
                                    <Avatar className="mr-2">
                                        <AvatarImage src="https://github.com/vhnb.png" />
                                        <AvatarFallback>VH</AvatarFallback>
                                    </Avatar>
                                    <h1 className="text-[15px] font-light">Victor Henrique</h1>
                                </div>
                            </TooltipTrigger>
                            <TooltipContent side="bottom">
                                <p>Sua conta</p>
                            </TooltipContent>
                        </Tooltip>
                        <Sheet>
                            <SheetTrigger>
                                <Button variant='default'>Criar nota</Button>
                            </SheetTrigger>
                            <SheetContent className="z-[999]">
                                <SheetHeader>
                                    <SheetTitle>Novo item</SheetTitle>
                                    <SheetDescription>
                                        Crie um novo item para sua lista.
                                    </SheetDescription>
                                </SheetHeader>
                                <form className="flex flex-col gap-3 p-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="email">Título</Label>
                                        <Input
                                            type="email"
                                            placeholder="Minha nota"
                                            required
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="email">Descrição</Label>
                                        <Textarea
                                            placeholder="Hoje eu..."
                                            required
                                            className="resize-none"
                                        />
                                    </div>
                                    <Select>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Selecione uma categoria" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Categorias</SelectLabel>
                                                <SelectItem value="todo">A fazer</SelectItem>
                                                <SelectItem value="school">Estudo</SelectItem>
                                                <SelectItem value="goals">Metas</SelectItem>
                                                <SelectItem value="remember">Lembrar</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    <Button onClick={handleEvent} type="submit" className="w-full">
                                        Cadastrar nota
                                    </Button>
                                </form>
                            </SheetContent>
                        </Sheet>
                    </div>
                    <h1 className="mb-2">Minhas notas</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full mb-2">
                        <CardNote
                            title="Lembrar"
                            desc="hoje eu sla, cozinhei nao sei"
                            tag="school"
                            createdAt="10/10/2020"
                        />
                        <CardNote
                            title="Lembrar"
                            desc="hoje eu sla, cozinhei nao sei"
                            tag="school"
                            createdAt="10/10/2020"
                        />
                        <CardNote
                            title="Lembrar"
                            desc="hoje eu sla, cozinhei nao sei"
                            tag="school"
                            createdAt="10/10/2020"
                        />
                    </div>
                </div>
            </main>
            <Toaster />
        </>
    )
}