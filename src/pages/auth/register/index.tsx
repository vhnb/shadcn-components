import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { FormEvent, useState } from "react"
import { useRouter } from "next/router"
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from "@/services/firebaseConnection"
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"
import bcrypt from 'bcryptjs'

export default function Register() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()

    async function handleRegisterUser(e: FormEvent) {
        e.preventDefault()

        const userDocRef = doc(db, 'users', email)
        const userDocSnap = await getDoc(userDocRef)

        if (userDocSnap.exists()) {
            toast('Este e-mail já está em uso. Tente outro.')
            return
        }

        const salt = await bcrypt.genSalt(10)
        const hashpass = await bcrypt.hash(password, salt)

        await setDoc(userDocRef, {
            username: username,
            email: email,
            password: hashpass
        })

        toast('Usuário registrado com sucesso!')
        router.push('/auth/login')
    }

    return (
        <>
            <main className="flex items-center justify-center flex-col h-[calc(100vh-60px)]">
                <div className="flex items-center justify-center flex-col max-w-[1000px] w-[90%]">
                    <Card className="w-[400px]">
                        <CardHeader className="mb-1">
                            <CardTitle>Cadastre-se na plataforma</CardTitle>
                            <CardDescription>
                                Se organize e desfrute das ferramentas.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleRegisterUser} className="flex flex-col gap-3">
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Usuário</Label>
                                    <Input
                                        type="text"
                                        placeholder="José"
                                        required
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        type="email"
                                        placeholder="m@example.com"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Senha</Label>
                                    <Input
                                        type="password"
                                        placeholder="*******"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <Button type="submit" className="w-full">
                                    Cadastre-se
                                </Button>
                                <Button onClick={() => window.location.href = '/auth/login'} variant='outline' type="button" className="w-full">
                                    Entrar
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </main>
            <Toaster />
        </>
    )
}