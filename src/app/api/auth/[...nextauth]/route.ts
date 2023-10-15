
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "credentials",
            // Tùy chỉnh các trường nhập tài khoản và mật khẩu
            credentials: {
                username: { label: "Tài khoản", type: "username" },
                password: { label: "Mật khẩu", type: "password" },
            },
            async authorize(credentials) {
                try {
                    // Gọi API ở đây để xác thực tài khoản và mật khẩu
                    const res = await fetch("https://mea.monoinfinity.net/api/v1/auth/login", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            username: credentials?.username,
                            password: credentials?.password,
                        }),
                    });
                    if (!credentials?.username || !credentials.password) {
                        throw new Error('Please enter an email and password')
                    }
                    const user = await res.json();
                    if (res.status === 400 || res.status === 401) {
                        throw new Error('Please enter an email and password')
                    }
                    // console.log("data:", data)
                    if (user) {
                        console.log("data:", user)
                        return (user);
                    } else {
                        // Nếu xác thực thất bại, trả về null
                        return Promise.resolve(null);
                    }
                } catch (error) {
                    console.error("Lỗi xác thực:", error);
                    return Promise.resolve(null);
                }
            }
            ,

        }),
    ],

    callbacks: {
        async jwt({ token, user }) {
            // Persist the OAuth access_token to the token right after signin
            return { ...token, ...user }
        },
        async session({ session, token, user }) {
            // Send properties to the client, like an access_token from a provider.
            session.user = token as any;
            return session;
        }
    }

});

export { handler as GET, handler as POST };
