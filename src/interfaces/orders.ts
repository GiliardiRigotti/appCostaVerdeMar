interface IOrder {
    id?: string,
    idClient: string
    title: string
    description: string
    solution?: string
    items?: IItems[]
    status?: 'open' | 'working' | 'close'
    laborPrice?: number
    close?: string
    create_at?: string
}

interface IItems {
    name: string
    amount: number
    price: number
}