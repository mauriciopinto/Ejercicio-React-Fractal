import { Product } from "../../models/productSlice";

export interface ProductCardProps {
    product: Product
    isFavorite: boolean
}