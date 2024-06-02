import React from 'react';
import {Button, Card, CardContent, CardMedia, Typography} from '@mui/material';

const ProductCard = ({ id, name, price, imageUrl }) => {
    const onAddToCart = (id) => {

    }
    return (
        <Card sx={{ width:"16rem", height:"25rem"}}>
            <img src={imageUrl} style={{maxWidth:"90%", maxHeight:"70%", margin:"1rem"}}/>
            <CardContent sx={{padding:"0"}}>
                <Typography gutterBottom variant="h5" component="div">
                    {name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    ${price} VNĐ
                </Typography>
            </CardContent>
            <Button
                variant="contained"
                color="primary"
                onClick={() => onAddToCart(id)}
                sx={{ margin: '1rem' }}
            >
                Thêm vào giỏ hàng
            </Button>
        </Card>
    );
};

export default ProductCard;
