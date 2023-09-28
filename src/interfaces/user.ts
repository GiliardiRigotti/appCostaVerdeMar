export interface IUser {
    id?: string
    name: string
    phone: string
    email: string
    city: string
    create_at?: any
    district: string
    address: string
    number: string
    password: string
    administrator: boolean
    contractUrl?: string
}

export interface IUserAuth {
    name: string
    jwt: string
}

export interface ISignIn {
    email: string
    password: string
}