export interface User {
    email: string
    id: string
    accessToken: string
    firstName: string
    lastName: string
}

export const userInitialState = {
    email: "",
    id: "",
    accessToken: "",
    firstName: "",
    lastName: ""
};