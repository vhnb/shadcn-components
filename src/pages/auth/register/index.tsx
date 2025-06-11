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
import { db, auth } from "@/services/firebaseConnection"
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { updateProfile } from "firebase/auth"

export default function Register() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    async function handleRegisterUser(e: FormEvent) {
        e.preventDefault()
        setIsLoading(true)

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            const user = userCredential.user

            await updateProfile(user, {
                displayName: username
            })

            const userDocRef = doc(db, 'users', user.uid)
            await setDoc(userDocRef, {
                uid: user.uid,
                username: username,
                email: user.email,
            })

            toast.success('Usuário registrado com sucesso!')
            router.push('/auth/login')
        } catch (err) {
            console.error(err)
            toast.error('Erro ao registrar. Verifique se o email já está em uso.')
        } finally {
            setIsLoading(false)
        }
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
                                        disabled={isLoading}
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
                                        disabled={isLoading}
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
                                <Button type="submit" className="w-full" disabled={isLoading}>
                                    {isLoading ? 'Cadastrando...' : 'Cadastre-se'}
                                </Button>
                                <Button onClick={() => window.location.href = '/auth/login'} variant='outline' type="button" className="w-full" disabled={isLoading}>
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