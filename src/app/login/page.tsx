"use client"
import { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from 'next/navigation'
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { toast } from "react-hot-toast";
import logo from '@/image/logo.png';
import Image from 'next/image';
import axios from "axios";


// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter()

    const handleLogin = async (e: React.FormEvent) => {
        if (!username) {
            toast.error("Không để trống tài khoản!")
            return;
        }
        if (!password) {
            toast.error("Không để trống mật khẩu")
            return;
        }
        e.preventDefault();
        try {
            const loginResponse = await axios.post(
                'https://mea.monoinfinity.net/api/v1/auth/login',
                {
                    username: username,
                    password: password,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            // if (!loginResponse.data || !loginResponse.data.token) {
            //     console.error("Đăng nhập không thành công.");
            //     return;
            // }
            toast.success("Đăng nhập thành công")
            console.log(loginResponse.data.user);
            const token = loginResponse?.data?.token;
            localStorage.setItem("access_token", token);
            router.replace("/")
        } catch (error: any) {
            if (error.response && error.response.status === 401) {
                toast.error("Sai tên đăng nhập hoặc mật khẩu")
            } else {
                toast.error("Có lỗi xảy ra khi đăng nhập")
            }
        }
    };



    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Image
                        src={logo}
                        width={100}
                        height={100}
                        alt="logo"
                    />
                    <Typography component="h1" variant="h5">
                        Đăng nhập
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Tài khoản"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            focused
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Mật khẩu"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            focused
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Lưu mật khẩu"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={handleLogin}
                        >
                            Đăng nhập
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Quân mật khẩu?
                                </Link>
                            </Grid>

                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
export default LoginPage;