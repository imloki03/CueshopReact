import React, { useState } from 'react';
import { Avatar, Button, TextField, Link, Grid, Box, Typography, Container, Snackbar, IconButton } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Close as CloseIcon } from '@mui/icons-material';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const theme = createTheme();

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [otpSent, setOtpSent] = useState(false);

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarColor, setSnackbarColor] = useState('success');

    const navigate = useNavigate();

    const handleRegister = (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            setOpenSnackbar(true);
            setSnackbarMessage("Mật khẩu không khớp!");
            setSnackbarColor('error');
            return;
        }
        if (!otpSent) {
            setOpenSnackbar(true);
            setSnackbarMessage("Vui lòng gửi mã OTP trước khi đăng ký.");
            setSnackbarColor('error');
            return;
        }
        axios.post('http://localhost:8080/email/validate?email='+email+'&otp='+otp)
            .then(response => {
                axios.post('http://localhost:8080/user/register', {
                    username,
                    password,
                    name,
                    phone,
                    email
                }).then(response => {
                    setOpenSnackbar(true);
                    setSnackbarMessage(response.data);
                    setSnackbarColor('success');
                    navigate("/login");
                }).catch(err => {
                    setOpenSnackbar(true);
                    setSnackbarMessage(err.response.data);
                    setSnackbarColor('error');
                });
            }).catch(err => {
            setOpenSnackbar(true);
            setSnackbarMessage("Xác thực OTP không thành công!");
            setSnackbarColor('error');
        });
    };

    const handleSendOtp = () => {
        axios.post('http://localhost:8080/email/send?email='+email)
            .then(response => {
                setOpenSnackbar(true);
                setSnackbarMessage(response.data);
                setSnackbarColor('success');
                setOtpSent(true);
            }).catch(err => {
            setOpenSnackbar(true);
            setSnackbarMessage(err.response.data.message || "Đã xảy ra lỗi không xác định!"); // Adjust the message as needed
            setSnackbarColor('error');
        });
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Đăng ký
                    </Typography>
                    <Box component="form" onSubmit={handleRegister} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Tên người dùng"
                            name="username"
                            autoFocus
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Mật khẩu"
                            type="password"
                            id="password"
                            autoComplete="new-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="confirmPassword"
                            label="Xác nhận mật khẩu"
                            type="password"
                            id="confirmPassword"
                            autoComplete="new-password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Họ và tên"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="phone"
                            label="Số điện thoại"
                            name="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Địa chỉ email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 2 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="otp"
                                label="Mã OTP"
                                name="otp"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                            />
                            <Button
                                variant="contained"
                                onClick={handleSendOtp}
                                sx={{ marginLeft: 2, height: '56px' }}
                            >
                                Gửi OTP
                            </Button>
                        </Box>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Đăng ký
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link href="/login" variant="body2">
                                    {"Đã có tài khoản? Đăng nhập"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={5000}
                onClose={() => setOpenSnackbar(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                sx={{
                    backgroundColor: snackbarColor === 'success' ? '#4caf50' : '#ff4d4f',
                    color: '#fff',
                    borderRadius: '8px',
                    width: '300px',
                    height: '50px',
                    '& .MuiSnackbarContent-action': {
                        paddingLeft: 0,
                    },
                }}
            >
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    px: 2,
                }}>
                    <Typography variant="body1">{snackbarMessage}</Typography>
                    <IconButton size="small" aria-label="close" color="inherit" onClick={() => setOpenSnackbar(false)}>
                        <CloseIcon />
                    </IconButton>
                </Box>
            </Snackbar>
        </ThemeProvider>
    );
};

export default Register;
