// ForgotPassword.js
import React, { useState } from 'react';
import { Avatar, Button, TextField, Link, Grid, Box, Typography, Container, Snackbar, IconButton } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Close as CloseIcon } from '@mui/icons-material';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const theme = createTheme();

const ForgotPassword = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [showOtpForm, setShowOtpForm] = useState(false);
    const [showNewPasswordForm, setShowNewPasswordForm] = useState(false);

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarColor, setSnackbarColor] = useState('success');

    const navigate = useNavigate();

    const handleForgotPassword = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8080/user/forgot_password?username=' + username)
            .then(response => {
                setOpenSnackbar(true);
                setSnackbarMessage(response.data);
                setSnackbarColor('success');
                sessionStorage.setItem('token',response.data.token);
                setOtpSent(true);
                setShowOtpForm(true);
                setEmail(response.data.email);
            }).catch(err => {
            setOpenSnackbar(true);
            setSnackbarMessage(err.response.data.message || "Đã xảy ra lỗi không xác định!");
            setSnackbarColor('error');
        });
    };

    const handleSendOtp = () => {
        axios.post('http://localhost:8080/email/send?username=' + username)
            .then(response => {
                console.log(response.data)
                setOpenSnackbar(true);
                setSnackbarMessage("Đã gửi mã OTP đến địa chỉ email của bạn!");
                setSnackbarColor('success');
                setShowOtpForm(true);

            }).catch(err => {
            setOpenSnackbar(true);
            setSnackbarMessage(err.response.data.message || "Đã xảy ra lỗi không xác định!");
            setSnackbarColor('error');
        });
    };

    const handleVerifyOtp = (e) => {
        e.preventDefault();
        console.log(email+" "+otp)
        axios.post('http://localhost:8080/email/validate?email='+email+'&otp='+otp)
            .then(response => {
                console.log("ok in");
                setOpenSnackbar(true);
                setSnackbarMessage(response.data);
                setSnackbarColor('success');
                setShowOtpForm(false);
                setShowNewPasswordForm(true);
            }).catch(err => {
                console.log("not ok")
            setOpenSnackbar(true);
            setSnackbarMessage(err.response.data.message || "Xác thực OTP không thành công!");
            setSnackbarColor('error');
        });
    };

    const handleResetPassword = (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setOpenSnackbar(true);
            setSnackbarMessage("Mật khẩu không khớp!");
            setSnackbarColor('error');
            return;
        }
        axios.post("http://localhost:8080/user/reset_password?username="+username+"&password="+newPassword)
            .then(response => {
                setOpenSnackbar(true);
                setSnackbarMessage(response.data);
                setSnackbarColor('success');
                navigate("/login");
            }).catch(err => {
            setOpenSnackbar(true);
            setSnackbarMessage(err.response.data.message || "Đã xảy ra lỗi không xác định!");
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
                        Quên mật khẩu
                    </Typography>
                    { !showOtpForm && !showNewPasswordForm &&
                        <Box component="form" onSubmit={handleForgotPassword} noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Tên người dùng"
                                name="username"
                                autoComplete="username"
                                autoFocus
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Gửi yêu cầu
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link href="/login" variant="body2">
                                        Quay lại đăng nhập
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    }
                    { showOtpForm &&
                        <Box component="form" onSubmit={handleVerifyOtp} noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="otp"
                                label="Mã OTP"
                                name="otp"
                                autoFocus
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Xác nhận OTP
                            </Button>
                        </Box>
                    }
                    { showNewPasswordForm &&
                        <Box component="form" onSubmit={handleResetPassword} noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="newPassword"
                                label="Mật khẩu mới"
                                type="password"
                                id="newPassword"
                                autoComplete="new-password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
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
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Đặt lại mật khẩu
                            </Button>
                        </Box>
                    }
                </Box>
            </Container>
            {/* Snackbar */}
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

export default ForgotPassword;
