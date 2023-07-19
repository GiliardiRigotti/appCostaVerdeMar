import { FieldValue } from "firebase/firestore"

export interface IOrder {
    id?: string,
    idClient: string
    title: string
    description: string
    solution?: string
    items?: IItems[]
    status?: 'aberto' | 'executando' | 'finalizado'
    laborPrice?: number
    close?: string
    create_at?: string
    close_at?: string
}

export interface IItems {
    name: string
    amount: number
    price: number
}