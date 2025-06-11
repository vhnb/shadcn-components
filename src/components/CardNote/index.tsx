import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
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
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

interface CardsProps {
    title: string,
    desc: string,
    tag: string,
}

export default function CardNote({ title, desc, tag }: CardsProps) {
    return (
        <Card className="w-ful">
            <CardHeader className="mb-1">
                <CardTitle>{title}</CardTitle>
                <CardDescription>{tag}</CardDescription>
            </CardHeader>
            <CardContent>
                <p>{desc}</p>
            </CardContent>
            <CardFooter className="flex flex-col">
                <AlertDialog>
                    <AlertDialogTrigger className="w-full">
                        <Button className="w-full mb-2">Deletar</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Tem certeza que deseja deletar esta nota?</AlertDialogTitle>
                            <AlertDialogDescription>
                                Esta ação irá fazer com que você perca a sua nota.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction>Deletar</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
                <Drawer>
                    <DrawerTrigger className="w-full">
                        <Button className="w-full" variant='outline'>Editar</Button>
                    </DrawerTrigger>
                    <DrawerContent>
                        <DrawerHeader>
                            <DrawerTitle>Edição de nota</DrawerTitle>
                            <DrawerDescription>Altere os dados da nota</DrawerDescription>
                        </DrawerHeader>
                        <form className="flex flex-col gap-3 p-4">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Alterar título</Label>
                                <Input
                                    type="email"
                                    placeholder="Minha nota"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Alterar descrição</Label>
                                <Textarea
                                    placeholder="Hoje eu..."
                                    required
                                    className="resize-none"
                                />
                            </div>
                            <Select>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Alterar a categoria" />
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
                        </form>
                        <DrawerFooter>
                            <Button>Alterar</Button>
                            <DrawerClose className="w-full">
                                <Button variant="outline" className="w-full">Cancelar</Button>
                            </DrawerClose>
                        </DrawerFooter>
                    </DrawerContent>
                </Drawer>
            </CardFooter>
        </Card>
    )
}