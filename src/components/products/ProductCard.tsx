import { ProductCardProps } from "./ProductCardInterface";
import { useDispatch } from "react-redux";
import { Card, CardContent, CardMedia } from "@mui/material";

import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { addFavorite, removeFavorite } from "../../pages/redux/slices/favorite.slice";

export const ProductCard = (props: ProductCardProps) => {
    const { product, isFavorite } = props;

    const dispatch = useDispatch ();

    return (
        <Card>
            <CardMedia
                sx={{height: 140}}
                image={product.thumbnail}
                title={product.title}
            />
            <CardContent>
                <Typography variant="h5">{product.title}</Typography>
                <Typography variant="body1">{product.description}</Typography>
                <IconButton onClick={() => dispatch (isFavorite ? removeFavorite (product) : addFavorite (product))}>
                    <FavoriteIcon htmlColor={isFavorite ? "red" : "grey"} />
                </IconButton>
            </CardContent>
            
            
        </Card>
    )
}