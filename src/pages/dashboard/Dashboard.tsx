import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppStore } from "../../models/store";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase.config";
import { resetUser } from "../redux/slices/user.slice";
import { useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { Product } from "../../models/productSlice";
import { ProductCard } from "../../components/products/ProductCard";

import { Grid } from "@mui/material";
import { Badge } from "@mui/material";

import FavoriteIcon from '@mui/icons-material/Favorite';
import { IconButton } from "@mui/material";
import { getProductsAPI } from "../../api/product";

export const Dashboard = () => {
    const [products, setProducts] = useState ([]);

    const { firstName, lastName } = useSelector((state: AppStore) => state.user);
    const { count, favoriteProducts } = useSelector ((state: AppStore) => state.favorite);
    const dispatch = useDispatch();
    const navigate = useNavigate ();

    const logOut = async () => {
        try {
            await signOut (auth);
            dispatch (resetUser());
            navigate ("/");
        } catch (error) {
            if (error instanceof FirebaseError) {
                alert (error.message);
            } else {
                alert (`Unknown error: ${error}`);
            }
        }
    }

    const getProducts = useCallback(async () => {
        try {
            const response = await getProductsAPI ();
            if (response) {
                setProducts (response.products);
            } else {
                console.error ("Empty response");
            }
        } catch (error) {
            console.error (error);
        }
    }, []);

    useEffect (() => {
        getProducts ();
    }, [])

    return (
        <div>
            <Grid container>
                <Grid item xs={10}>
                    <h1>Dashboard</h1>
                </Grid>
                <Grid item xs={2} sx={{pt: 2}}>
                    <Badge
                        badgeContent={count}
                        sx={{
                            '& .MuiBadge-badge': {
                                color: "white",
                                backgroundColor: "red"
                            }
                        }}
                    >
                        <IconButton onClick={() => navigate ("/favorites")} disabled={count === 0}>
                            <FavoriteIcon />
                        </IconButton>
                    </Badge>
                </Grid>
            </Grid>
            {
                firstName && lastName && <h2>Hello {`${firstName} ${lastName}`}</h2>
            }
            <Grid
                container
                spacing={2}
            >
                {
                    products.length > 0 && products.map ((product: Product) => {
                        return (
                            <Grid item xs={3} key={product.id}>
                                <ProductCard product={product} isFavorite={favoriteProducts.includes (JSON.stringify (product))} />
                            </Grid>
                        )
                    })
                }
            </Grid>
            <button onClick={logOut}>Log out</button>
        </div>
    )
}