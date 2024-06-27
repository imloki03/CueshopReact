import React, { useEffect, useState } from 'react';
import {
    Container,
    Grid,
    Card,
    CardMedia,
    CardContent,
    Typography,
    Button,
    IconButton,
    Box
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Nav from '../Nav';
import axios from 'axios';

const Cart = () => {
    const [cart, setCart] = useState([]);
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (sessionStorage.getItem("loginState")==="no"){
            navigate("/login");
        }
        const storedCart = JSON.parse(sessionStorage.getItem('cart')) || [];
        setCart(storedCart);
    }, []);

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
    }, [cart]);

    const handleRemoveFromCart = (id) => {
        const updatedCart = cart.filter(item => item.id !== id+"");
        const updatedProducts = products.filter(product => product.id !== id);
        setCart(updatedCart);
        setProducts(updatedProducts);
        sessionStorage.setItem('cart', JSON.stringify(updatedCart));
        window.dispatchEvent(new Event('storage'));
    };

    const handleIncreaseQuantity = (id) => {
        const updatedCart = cart.map(item =>
            item.id === id+"" ? { ...item, quantity: item.quantity + 1 } : item
        );
        setCart(updatedCart);
        sessionStorage.setItem('cart', JSON.stringify(updatedCart));
        window.dispatchEvent(new Event('storage'));
    };

    const handleDecreaseQuantity = (id) => {
        const updatedCart = cart.map(item =>
            item.id === id+"" && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
        );
        setCart(updatedCart);
        sessionStorage.setItem('cart', JSON.stringify(updatedCart));
        window.dispatchEvent(new Event('storage'));
        console.log(updatedCart)
    };

    const handleProceedToCheckout = () => {
        navigate('/checkout');
    };

    const calculateTotalPrice = () => {
        return products.reduce((total, product) => {
            const quantity = cart.find(item => item.id === product.id.toString())?.quantity || 0;
            return total + (product.price * quantity);
        }, 0);
    };

    return (
        <div>
            <Nav />
            <Container style={{ marginTop: '3rem' }}>
                {products.length > 0 ? (
                    <Grid container spacing={2} direction="column">
                        {products.map(product => {
                            const quantity = cart.find(item => item.id === product.id.toString()).quantity;
                            const totalPrice = product.price * quantity;
                            return (
                                <Grid item xs={12} key={product.id}>
                                    <Card>
                                        <Grid container spacing={2} alignItems="center">
                                            <Grid item xs={3}>
                                                <CardMedia
                                                    component="img"
                                                    alt={product.name}
                                                    image={product.image}
                                                    sx={{ width: '7rem', height: '7rem', objectFit: 'cover', margin:"1rem" }}
                                                />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <CardContent>
                                                    <Typography variant="h6" component="div" align="left">
                                                        {product.name}
                                                    </Typography>
                                                    <Typography variant="body2" color="textSecondary" align="left">
                                                        {product.brand}
                                                    </Typography>
                                                    <Typography variant="h6" color="primary" align="left">
                                                        Thành tiền: {totalPrice} VNĐ
                                                    </Typography>
                                                </CardContent>
                                            </Grid>
                                            <Grid item xs={3}>
                                                <Box display="flex" alignItems="center" justifyContent="space-between">
                                                    <IconButton onClick={() => handleDecreaseQuantity(product.id)}>
                                                        <RemoveIcon />
                                                    </IconButton>
                                                    <Typography variant="body1" fontWeight="bold" mx={2}>
                                                        {quantity}
                                                    </Typography>
                                                    <IconButton onClick={() => handleIncreaseQuantity(product.id)}>
                                                        <AddIcon />
                                                    </IconButton>
                                                </Box>
                                                <Button
                                                    variant="contained"
                                                    color="secondary"
                                                    style={{ marginTop: '10px' }}
                                                    onClick={() => handleRemoveFromCart(product.id)}
                                                >
                                                    <DeleteIcon /> Xóa
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Card>
                                </Grid>
                            );
                        })}
                    </Grid>
                ) : (
                    <Typography>Giỏ hàng của bạn trống</Typography>
                )}
                {products.length > 0 && (
                    <>
                        <Box mt={4} display="flex" justifyContent="flex-end">
                            <Typography variant="h6" component="div" align="right">
                                Tổng giá trị giỏ hàng: {calculateTotalPrice()} VNĐ
                            </Typography>
                        </Box>
                        <Box mt={2} display="flex" justifyContent="flex-end">
                            <Button variant="contained" color="primary" onClick={handleProceedToCheckout}>
                                Đặt hàng
                            </Button>
                        </Box>
                    </>
                )}
            </Container>
        </div>
    );
};

export default Cart;
