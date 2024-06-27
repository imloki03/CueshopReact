import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Grid, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Nav from "../Nav";

const Checkout = () => {
    const [formData, setFormData] = useState({ name: '', address: '' });
    const [userData, setUserData] = useState({ name: '', phone: '' });
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [orderSuccess, setOrderSuccess] = useState(false);

    useEffect(() => {
        if (sessionStorage.getItem("loginState")==="no"){
            navigate("/login");}
        const fetchUserInfo = async () => {
            try {
                const response = await axios.post('http://localhost:8080/user/get_user_info', {
                    username: sessionStorage.getItem('username')
                });
                setUserData(response.data);
            } catch (error) {
                console.error('Error fetching user info:', error);
            }
        };

        fetchUserInfo();

        const storedCart = JSON.parse(sessionStorage.getItem('cart')) || [];
        setCart(storedCart);
    }, []);

    useEffect(() => {
        setFormData({
            name: userData.name,
            address: ''
        });
    }, [userData]);

    useEffect(() => {
        const fetchProductDetails = async () => {
            const promises = cart.map(item =>
                axios.get(`http://localhost:8080/product/get_cue/${item.id}`)
            );
            const results = await Promise.all(promises);
            const productsData = results.map(result => result.data);
            setProducts(productsData);
        };

        if (cart.length > 0) {
            fetchProductDetails();
        }
    }, [cart])
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/order/add_new', {
                username: sessionStorage.getItem("username"),
                address: formData.address,
                orderList: cart.map(item => ({
                    product: products.find(product => item.id === product.id.toString()),
                    quantity: item.quantity
                })),
                payment_state : false
            });
            sessionStorage.removeItem("cart");
            setOrderSuccess(true);
        } catch (error) {
            console.error('Error submitting order:', error);
        }
    };

    const calculateTotalPrice = () => {
        return products.reduce((total, product) => {
            const quantity = cart.find(item => item.id === product.id.toString())?.quantity || 0;
            return total + (product.price * quantity);
        }, 0);
    };


    return (
        <div>
            <Nav></Nav>
            <Container maxWidth="md" style={{ marginTop: '3rem' }}>
                {orderSuccess ? (
                    <div>
                        <Typography variant="h4" gutterBottom>
                            Đặt hàng thành công!
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => navigate('/')}
                        >
                            Quay về trang chủ
                        </Button>
                    </div>
                ) : (
                    <div>
                        <Typography variant="h4" gutterBottom>
                            Thông tin thanh toán
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        label="Họ và tên"
                                        name="name"
                                        value={formData.name}
                                        disabled
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        label="Số điện thoại"
                                        name="phone"
                                        value={userData.phone}
                                        disabled
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        label="Địa chỉ"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                    />
                                </Grid>
                            </Grid>
                            <Typography variant="h6" style={{ marginTop: '2rem' }}>
                                Danh sách món hàng đã đặt
                            </Typography>
                            <TableContainer component={Paper} style={{ marginTop: '1rem' }}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Tên</TableCell>
                                            <TableCell>Số lượng</TableCell>
                                            <TableCell align="right">Đơn giá (VNĐ)</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {cart.map(item => {
                                            const product = products.find(prod => prod.id + "" === item.id + "");
                                            return (
                                                <TableRow key={item.id}>
                                                    <TableCell>{product ? product.name : 'N/A'}</TableCell>
                                                    <TableCell>{item.quantity}</TableCell>
                                                    <TableCell align="right">{product ? product.price : 'N/A'}</TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <Typography variant="h6" style={{ marginTop: '1rem' }}>
                                Tổng thành tiền: <strong>{calculateTotalPrice()} VNĐ</strong>
                            </Typography>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                style={{ marginTop: '1rem' }}
                            >
                                Xác nhận đặt hàng
                            </Button>
                        </form>
                    </div>
                )}
            </Container>
        </div>
    );
};

export default Checkout;
