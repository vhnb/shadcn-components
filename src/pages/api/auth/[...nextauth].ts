import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/services/firebaseConnection";

export default NextAuth({
    debug: true,
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials || !credentials.email || !credentials.password) {
                    throw new Error("Faltando email ou senha.")
                }

                try {
                    const userCredential = await signInWithEmailAndPassword(
                        auth,
                        credentials.email,
                        credentials.password
                    )

                    const user = userCredential.user

                    if (user) {
                        return {
                            id: user.uid,
                            email: user.email,
                            name: user.displayName || user.email,
                        }
                    } else {
                        return null
                    }
                } catch (error) {
                    throw new Error("Email ou senha inválidos.")
                }
            }
        })
    ],
    pages: {
        signIn: "/auth/login",
        newUser: "/auth/register"
    },
    secret: process.env.JWT_SECRET as string
})