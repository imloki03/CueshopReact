import {useEffect, useState} from "react";
import axios from "axios";
import ProductCard from "../ProductCard";
import Nav from "../Nav";
import {useNavigate, useParams} from "react-router-dom";

const Search = () =>{
    const {query} = useParams();
    const [productList, setProductList] = useState();
    console.log("search page")
    useEffect(()=>{
        axios.get('http://localhost:8080/product/search/'+query)
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
export default Search;