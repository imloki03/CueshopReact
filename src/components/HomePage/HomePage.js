import {useEffect, useState} from "react";
import axios from "axios";
import ProductCard from "../ProductCard";
import Nav from "../Nav";

const HomePage = () =>{
    const [productList, setProductList] = useState();
    useEffect(()=>{
        axios.get('http://localhost:8080/product/get_all_cue')
            .then(response => {
                setProductList(response.data)
            })
            .catch(err => {
            });
    },[])

    return (
        <div>
            <Nav/>
            <div style={{display:"flex", flexWrap:"wrap", gap:"1rem", justifyContent:"center", margin:"3rem"}}>
                {productList && productList.map((product, index) => (
                    <ProductCard
                        key={index}
                        id={product.id}
                        name={product.name}
                        price={product.price}
                        imageUrl={product.image}
                    />
                ))}
            </div>
        </div>
    )
}
export default HomePage;