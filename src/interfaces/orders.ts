interface IOrder {
    id?: string,
    idClient: string
    title: string
    description: string
    solution?: string
    items?: IItems[]
    status?: 'open' | 'working' | 'close'
    laborPrice?: number
}

interface IItems {
    name: string
    amount: number
    price: number
}