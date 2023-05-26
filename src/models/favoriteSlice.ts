export interface Favorite {
    count: number
    favoriteProducts: string[]
}

export const favoriteInitialState: Favorite = {
    count: 0,
    favoriteProducts: []
};