import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import users from "../../../../data/users.json";

// Lógica de autenticación
const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                // 1. Encuentra al usuario por su email
                const user = users.find(u => u.email === credentials?.email);

                // 2. Si el usuario existe, verifica la contraseña (simulada)
                if (user && user.password === credentials?.password) {
                    // Si las credenciales son correctas, devuelve el objeto de usuario
                    return { id: user.id, name: user.nombre, email: user.email };
                }
                
                // 3. Si no hay coincidencia, devuelve null
                return null;
            }
        })
    ],
    pages: {
        signIn: "/login",
    }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };