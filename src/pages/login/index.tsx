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

export default function Login() {
    return (
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
                        <form className="flex flex-col gap-3">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Senha</Label>
                                <Input
                                    type="password"
                                    placeholder="*******"
                                    required
                                />
                            </div>
                            <Button type="submit" className="w-full">
                                Entrar
                            </Button>
                            <Button onClick={() => window.location.href = '/register'} type="submit" variant='outline' className="w-full">
                                Cadastrar
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </main>
    )
}