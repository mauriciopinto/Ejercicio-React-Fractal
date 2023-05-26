import { useDispatch, useSelector } from "react-redux";
import { AppStore } from "../../models/store";
import { useNavigate } from "react-router-dom";
import { ProductCard } from "../../components/products/ProductCard";

import { Grid } from '@mui/material';
import { resetFavorite } from "../redux/slices/favorite.slice";

export const Favorites = () => {

    const { firstName, lastName } = useSelector((state: AppStore) => state.user);
    const { count, favoriteProducts } = useSelector ((state: AppStore) => state.favorite);
    const dispatch = useDispatch();
    const navigate = useNavigate ();

    return (
        <div>
            <h1>Favorites</h1>
            {
                firstName && lastName && <h2>Hello {`${firstName} ${lastName}`}</h2>
            }
            <button onClick={() => navigate ("/dashboard")}>Back to dashboard</button>
            <button onClick={() => dispatch (resetFavorite (null))}>Clear</button>
            <hr></hr>
            <Grid
                container
                spacing={2}
            >
                {
                    favoriteProducts.length > 0 && favoriteProducts.map ((productString: string) => {
                        const product = JSON.parse (productString);

                        return (
                            <Grid item xs={3} key={product.id}>
                                <ProductCard product={product} isFavorite={favoriteProducts.includes (JSON.stringify (product))} />
                            </Grid>
                        )
                    })
                }
            </Grid>
        </div>
    )
}