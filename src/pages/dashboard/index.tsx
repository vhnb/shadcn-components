import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetClose
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
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent
} from "@/components/ui/chart"
import { Textarea } from "@/components/ui/textarea"
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import CardNote from "@/components/CardNote"
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getSession, useSession } from 'next-auth/react'
import { GetServerSideProps } from "next"
import { FormEvent, useState, useEffect } from "react"
import { addDoc, collection, where, query, onSnapshot } from 'firebase/firestore';
import { db } from "@/services/firebaseConnection"
import { Skeleton } from "@/components/ui/skeleton"

interface HomeProps {
    
}
interface NotesProps {
    note: string,
    desc: string,
    tag: string,
}

const chartData = [
    { month: "January", desktop: 18, mobile: 50 },
    { month: "February", desktop: 131, mobile: 20 },
    { month: "March", desktop: 651, mobile: 70 },
    { month: "April", desktop: 212, mobile: 20 },
    { month: "May", desktop: 54, mobile: 76 },
    { month: "June", desktop: 21, mobile: 34 },
]

const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "#2563eb"
    },
    mobile: {
        label: "Mobile",
        color: "#60a5fa"
    }
} satisfies ChartConfig

export default function Dashboard() {
    const { data: session } = useSession()
    const [noteInput, setNoteInput] = useState("")
    const [descInput, setDescInput] = useState("")
    const [tagSelect, setTagSelect] = useState("")
    const [notes, setNotes] = useState<NotesProps[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        function LoadNotes() {
            const q = query(collection(db, 'notes'), where("userEmail", "==", session?.user?.email))

            onSnapshot(q, (snap) => {
                let list = [] as NotesProps[]

                snap.forEach((doc) => {
                    list.push({
                        note: doc.data().note,
                        desc: doc.data().desc,
                        tag: doc.data().tag,
                    })
                })

                setNotes(list)
                setLoading(false)
            })
        }
        LoadNotes()
    }, [session?.user?.email])

    async function handleNewNote(e: FormEvent) {
        e.preventDefault()

        try {
            await addDoc(collection(db, 'notes'), {
                note: noteInput,
                desc: descInput,
                tag: tagSelect,
                userEmail: session?.user?.email
            })

            setNoteInput("")
            setDescInput("")
            setTagSelect("")
            toast.success('Nota cadastrada', {
                position: "bottom-left"
            })
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <>
            <main className="flex items-start justify-center flex-row h-[calc(100vh-60px)]">
                <div className="flex items-start justify-center flex-col max-w-[1000px] w-[90%]">
                    <div className="w-full flex items-center justify-between flex-row mt-5 mb-5">
                        <Tooltip>
                            <TooltipTrigger>
                                <div className="flex items-center justify-center flex-row">
                                    <div className="mr-2 bg-zinc-700 border border-zinc-500 p-3 rounded-full h-[38px] w-[38px] flex items-center justify-center">
                                        <p className="text-[15px]">{session?.user?.email ? session.user.email.charAt(0).toUpperCase() : ""}</p>
                                    </div>
                                    <h1 className="text-[15px] font-light">{session?.user?.name}</h1>
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
                                <form onSubmit={handleNewNote} className="flex flex-col gap-3 p-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="email">Título</Label>
                                        <Input
                                            type="text"
                                            placeholder="Minha nota"
                                            required
                                            value={noteInput}
                                            onChange={(e) => setNoteInput(e.target.value)}
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="email">Descrição</Label>
                                        <Textarea
                                            placeholder="Hoje eu..."
                                            required
                                            className="resize-none"
                                            value={descInput}
                                            onChange={(e) => setDescInput(e.target.value)}
                                        />
                                    </div>
                                    <Select value={tagSelect} onValueChange={(value) => setTagSelect(value)}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Alterar a categoria" />
                                        </SelectTrigger>
                                        <SelectContent className="z-[999]">
                                            <SelectGroup>
                                                <SelectLabel>Categorias</SelectLabel>
                                                <SelectItem value="todo">A fazer</SelectItem>
                                                <SelectItem value="school">Estudo</SelectItem>
                                                <SelectItem value="goals">Metas</SelectItem>
                                                <SelectItem value="remember">Lembrar</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    <Button type="submit" className="w-full">
                                        Cadastrar nota
                                    </Button>
                                    <SheetClose>
                                        <Button variant="outline" className="w-full">
                                            Fechar
                                        </Button>
                                    </SheetClose>
                                </form>
                            </SheetContent>
                        </Sheet>
                    </div>
                    <div className="flex w-full mb-5 h-[50vh]">
                        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                            <BarChart accessibilityLayer data={chartData}>
                                <CartesianGrid vertical={false} />
                                <XAxis
                                    dataKey="month"
                                    tickLine={false}
                                    tickMargin={10}
                                    axisLine={false}
                                    tickFormatter={(value) => value.slice(0, 3)}
                                />
                                <ChartTooltip content={<ChartTooltipContent />} />
                                <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
                                <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
                            </BarChart>
                        </ChartContainer>
                    </div>
                    <h1 className="mb-2">Minhas notas</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full mb-2">
                        {notes.map((i) => (
                            <CardNote
                                title={i.note}
                                desc={i.desc}
                                tag={i.tag}
                            />
                        ))}
                        {notes.length === 0 && loading === false && (
                            <>
                                <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                                <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                            </>
                        )}
                    </div>
                </div>
            </main>
            <Toaster />
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const session = await getSession({ req })

    if (!session?.user) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    return {
        props: {
            user: {
                email: session?.user?.email
            }
        }
    }
}