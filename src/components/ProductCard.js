import React from 'react';
import {Button, Card, CardContent, CardMedia, Typography} from '@mui/material';
import {useNavigate} from "react-router-dom";

const ProductCard = ({ id, name, price, imageUrl }) => {
    const onAddToCart = (id) => {

    }

    const navigate = useNavigate();
    const handleProductCardClick = () => {
        navigate("/product/detail/"+id)
    }

    return (
        <Card onClick={handleProductCardClick} sx={{ width:"16rem", height:"22rem", cursor:"pointer"}}>
            <img src={imageUrl} style={{maxWidth:"90%", maxHeight:"70%", margin:"1rem"}}/>
            <CardContent sx={{padding:"0"}}>
                <Typography gutterBottom variant="h5" component="div">
                    {name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    ${price} VNĐ
                </Typography>
            </CardContent>
            {/*<Button*/}
            {/*    variant="contained"*/}
            {/*    color="primary"*/}
            {/*    onClick={() => onAddToCart(id)}*/}
            {/*    sx={{ margin: '1rem' }}*/}
            {/*>*/}
            {/*    Thêm vào giỏ hàng*/}
            {/*</Button>*/}
        </Card>
    );
};

export default ProductCard;
