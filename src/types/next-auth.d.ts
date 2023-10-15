import NextAuth from "next-auth/next";

declare module "next-auth" {
    interface Session {
        user: {
            token: string;
            user: {
                id: number;
                name: string;
                role: {
                    id: string;
                    name: string;
                },
                department: string;
            }
        }

    }
}
