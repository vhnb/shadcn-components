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
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"
import { signIn } from "next-auth/react"

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    async function handleLoginUser(e: FormEvent) {
        e.preventDefault()
        setIsLoading(true)

        try {
            const result = await signIn('credentials', {
                redirect: false,
                email,
                password
            })

            if (result?.error) {
                toast.error(result.error)
                return
            }

            if (!result?.ok) {
                toast.error('Erro ao fazer login. Tente novamente.')
                return
            }

            toast.success('Login realizado com sucesso!')
            router.push('/dashboard')
        } catch (error) {
            console.error('Erro no login:', error)
            toast.error('Erro ao fazer login. Tente novamente.')
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
                            <CardTitle>Entre na plataforma</CardTitle>
                            <CardDescription>
                                Se organize e desfrute das ferramentas.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleLoginUser} className="flex flex-col gap-3">
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
                                    <Label htmlFor="password">Senha</Label>
                                    <Input
                                        type="password"
                                        placeholder="*******"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        disabled={isLoading}
                                    />
                                </div>
                                <Button type="submit" className="w-full" disabled={isLoading}>
                                    {isLoading ? 'Entrando...' : 'Entrar'}
                                </Button>
                                <Button 
                                    onClick={() => router.push('/auth/register')} 
                                    type="button" 
                                    variant='outline' 
                                    className="w-full"
                                    disabled={isLoading}
                                >
                                    Cadastrar
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