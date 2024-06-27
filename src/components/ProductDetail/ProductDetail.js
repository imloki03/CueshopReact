import React, { useEffect, useState } from 'react';
import {
    Container,
    Grid,
    Card,
    CardMedia,
    CardContent,
    Typography,
    Button,
    Box,
    ListItem,
    List,
    ListItemText
} from '@mui/material';
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import Nav from "../Nav";

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [specsArray, setSpecsArray] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8080/product/get_cue/' + id)
            .then(response => {
                setProduct(response.data);
                setSpecsArray(response.data.specifications.split('|'));
            })
            .catch(err => {
            });
    }, [id]);

    const handleAddToCart = () => {
        let cart = JSON.parse(sessionStorage.getItem('cart')) || [];

        const productIndex = cart.findIndex(item => item.id === id);

        if (productIndex > -1) {
            cart[productIndex].quantity += 1;
        } else {
            cart.push({ id: id, quantity: 1 });
        }

        sessionStorage.setItem('cart', JSON.stringify(cart));

        window.dispatchEvent(new Event('storage'));
    };

    const handleBuyNow = () => {
        let cart = JSON.parse(sessionStorage.getItem('cart')) || [];

        const productIndex = cart.findIndex(item => item.id === id);

        if (productIndex > -1) {
            cart[productIndex].quantity += 1;
        } else {
            cart.push({ id: id, quantity: 1 });
        }
        sessionStorage.setItem('cart', JSON.stringify(cart));
        navigate("/checkout");

    }

    return (
        <div>
            <Nav />
            <Container style={{ marginTop: '3rem' }}>
                {product ? (
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={6}>
                            <Card>
                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', maxWidth: '100%', maxHeight: "50rem", overflow: 'hidden' }}>
                                    <CardMedia
                                        component="img"
                                        alt={product.name}
                                        image={product.image}
                                        sx={{ maxWidth: '90%', maxHeight: '90%' }}
                                    />
                                </Box>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h4" component="div" align="left">
                                        {product.name}
                                    </Typography>
                                    <Typography variant="h6" color="textSecondary" align="left">
                                        {product.brand}
                                    </Typography>
                                    <Typography variant="h6" component="div" align="left" style={{ marginTop: '20px' }}>
                                        Thông số kỹ thuật:
                                    </Typography>
                                    <List>
                                        {specsArray.map((spec, index) => {
                                            const [title, ...content] = spec.split(':');
                                            return (
                                                <ListItem key={index}>
                                                    <ListItemText
                                                        primary={
                                                            <>
                                                                <Typography component="span" variant="body1">
                                                                    •{' '}
                                                                </Typography>
                                                                <Typography component="span" variant="body1" fontWeight="bold">
                                                                    {title.trim()}:
                                                                </Typography>
                                                                <Typography component="span" variant="body1">
                                                                    {'  ' + content.join(':').trim()}
                                                                </Typography>
                                                            </>
                                                        }
                                                    />
                                                </ListItem>
                                            );
                                        })}
                                    </List>
                                    <Typography variant="h5" color="primary" style={{ marginTop: '20px' }} align="left">
                                        {product.price} VNĐ
                                    </Typography>
                                    <Grid container spacing={2} style={{ marginTop: '20px' }}>
                                        <Grid item>
                                            <Button onClick={handleAddToCart} variant="contained" color="primary">Thêm vào giỏ hàng</Button>
                                        </Grid>
                                        <Grid item>
                                            <Button onClick={handleBuyNow} variant="contained" color="secondary">Mua ngay</Button>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                ) : (
                    <Typography>Loading...</Typography>
                )}
            </Container>
        </div>
    );
};

export default ProductDetail;
