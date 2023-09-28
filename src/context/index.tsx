import React, { createContext, useCallback, useEffect, useState } from 'react'
import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, query, updateDoc, where } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { ISignIn, IUser } from '../interfaces/user';
import { INotification } from '../interfaces/notification';
import { ITip } from '../interfaces/tip';
import { showNotification } from '../utils/notification';
import { database, storage } from '../config/firebase';
import { IOrder } from '../interfaces/orders';
import { enigma } from '../utils/enigma';

interface AppContextData {
    userAuth: IUser | null
    userSigned: boolean
    login: ({ email, password }: ISignIn) => Promise<boolean>
    logout: () => void
    forgotPassword: ({ email }: ISignIn) => Promise<boolean>
    createUser: (newUser: IUser) => Promise<boolean>
    updateUser: (id: string, updateUser: IUser) => Promise<boolean>
    deleteUser: (id: string) => Promise<boolean>
    createOrder: (newOrder: IOrder) => Promise<boolean>
    updateOrder: (id: string, updateOrder: IOrder) => Promise<boolean>
    deleteOrder: (id: string) => Promise<boolean>
    createTip: (newTip: ITip) => Promise<boolean>
    updateTip: (id: string, updateTip: ITip) => Promise<boolean>
    deleteTip: (id: string) => Promise<boolean>
    createNotification: (newNotification: INotification) => Promise<boolean>
    listUsers: IUser[]
    listNotifications: INotification[]
    listTips: ITip[]
    listOrders: IOrder[]
}

const firebaseDocs = {
    users: "users",
    tips: "tips",
    notifications: "notifications",
    order: "orders"
}

const storageKey = {
    user: "@CostaVerde: user",
}

const AppContext = createContext({} as AppContextData)

function AppProvider({ children }: any) {
    const [userSigned, setUserSigned] = useState(false)
    const [userAuth, setUserAuth] = useState<IUser | null>(null)
    const [listUsers, setListUsers] = useState<IUser[]>([])
    const [listNotifications, setListNotifications] = useState<INotification[]>([])
    const [listTips, setListTips] = useState<ITip[]>([])
    const [listOrders, setListOrders] = useState<IOrder[]>([])

    const storeData = async (value, key) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem(key, jsonValue)
        } catch (e) {
            console.log(e)
        }
    }

    const clearStoreData = async () => {
        try {
            await AsyncStorage.clear()
        } catch (e) {
            console.log(e)
        }
    }

    const getData = async (key) => {
        try {
            const jsonValue = await AsyncStorage.getItem(key)
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            console.log(e)
        }
    }

    const createUser = useCallback(async (newUser: IUser) => {
        const usersRef = collection(database, firebaseDocs.users);
        addDoc(usersRef, newUser)
            .then((docRef) => {
                showNotification({
                    title: "Sucesso",
                    description: "Efetuado o cadastro de usuario " + docRef.id,
                    duration: 2500,
                    type: "success"
                })
                return true
            })
            .catch((error) => {
                showNotification({
                    title: "Erro",
                    description: error,
                    duration: 2500,
                    type: "error"
                })
                return false
            });
    }, [])

    const updateUser = useCallback(async (id: string, updatedUser: IUser) => {
        try {
            const usersRef = doc(database, firebaseDocs.users, id)
            await updateDoc(usersRef, { ...updatedUser });
            showNotification({
                title: "Sucesso",
                description: "Atualizado o cadastro de usuario ",
                duration: 2500,
                type: "success"
            })
            return true
        } catch (error) {
            console.error('Erro Update User: ', error)
            showNotification({
                title: "Erro",
                description: error,
                duration: 2500,
                type: "error"
            })
            return false
        }
    }, [])

    const deleteUser = useCallback(async (id: string) => {
        try {
            await deleteDoc(doc(database, firebaseDocs.users, id));
            showNotification({
                title: "Sucesso",
                description: "Efetuada a remoção do usuario",
                duration: 2500,
                type: "success"
            })
            return true
        } catch (error) {
            showNotification({
                title: "Erro",
                description: error,
                duration: 2500,
                type: "error"
            })
            return false
        }
    }, [])

    const createTip = useCallback(async (newTip: ITip) => {
        const usersRef = collection(database, firebaseDocs.tips);
        addDoc(usersRef, newTip)
            .then((docRef) => {
                showNotification({
                    title: "Sucesso",
                    description: "Efetuado o cadastro",
                    duration: 2500,
                    type: "success"
                })
                return true
            })
            .catch((error) => {
                showNotification({
                    title: "Erro",
                    description: error,
                    duration: 2500,
                    type: "error"
                })
                return false
            });
    }, [])

    const updateTip = useCallback(async (id: string, updatedTip: ITip) => {
        try {
            const tipsRef = doc(database, firebaseDocs.tips, id)
            await updateDoc(tipsRef, { ...updatedTip });
            showNotification({
                title: "Sucesso",
                description: "Atualizado a recomendação ",
                duration: 2500,
                type: "success"
            })
            return true
        } catch (error) {
            showNotification({
                title: "Erro",
                description: error,
                duration: 2500,
                type: "error"
            })
            return false
        }
    }, [])

    const deleteTip = useCallback(async (id: string) => {
        try {
            await deleteDoc(doc(database, firebaseDocs.tips, id));
            showNotification({
                title: "Sucesso",
                description: "Efetuada a remoção da recomendação",
                duration: 2500,
                type: "success"
            })
            return true
        } catch (error) {
            showNotification({
                title: "Erro",
                description: error,
                duration: 2500,
                type: "error"
            })
            return false
        }
    }, [])

    const createOrder = useCallback(async (newOrder: IOrder) => {
        const usersRef = collection(database, firebaseDocs.order);
        addDoc(usersRef, newOrder)
            .then((docRef) => {
                showNotification({
                    title: "Sucesso",
                    description: "Efetuado o cadastro",
                    duration: 2500,
                    type: "success"
                })
                return true
            })
            .catch((error) => {
                showNotification({
                    title: "Erro",
                    description: error,
                    duration: 2500,
                    type: "error"
                })
                return false
            });
    }, [])

    const updateOrder = useCallback(async (id: string, updatedOrder: IOrder) => {
        try {
            const ordersRef = doc(database, firebaseDocs.order, id)
            await updateDoc(ordersRef, { ...updatedOrder });
            showNotification({
                title: "Sucesso",
                description: "Atualizado a OS ",
                duration: 2500,
                type: "success"
            })
            return true
        } catch (error) {
            showNotification({
                title: "Erro",
                description: error,
                duration: 2500,
                type: "error"
            })
            return false
        }
    }, [])

    const deleteOrder = useCallback(async (id: string) => {
        try {
            await deleteDoc(doc(database, firebaseDocs.order, id));
            showNotification({
                title: "Sucesso",
                description: "Efetuada a remoção da OS",
                duration: 2500,
                type: "success"
            })
            return true
        } catch (error) {
            showNotification({
                title: "Erro",
                description: error,
                duration: 2500,
                type: "error"
            })
            return false
        }
    }, [])

    const createNotification = useCallback(async (newNotification: INotification) => {
        const notificationRef = collection(database, firebaseDocs.notifications);
        addDoc(notificationRef, newNotification)
            .then((docRef) => {
                showNotification({
                    title: "Sucesso",
                    description: "Efetuado o cadastro",
                    duration: 2500,
                    type: "success"
                })
                return true
            })
            .catch((error) => {
                showNotification({
                    title: "Erro",
                    description: error,
                    duration: 2500,
                    type: "error"
                })
                return false
            });
    }, [])



    const getListNotifications = useCallback(async () => {
        const notificationRef = collection(database, firebaseDocs.notifications)
        onSnapshot(notificationRef, (querySnapshot) => {
            const data = querySnapshot.docs.map(docs => {
                return {
                    id: docs.id,
                    ...docs.data()
                }
            }) as INotification[]
            console.log(data)
            setListNotifications(data)
        })
    }, [])

    const getListTips = useCallback(async () => {
        const tipRef = await collection(database, firebaseDocs.tips)
        onSnapshot(tipRef, (querySnapshot) => {
            const data = querySnapshot.docs.map(docs => {
                return {
                    id: docs.id,
                    ...docs.data()
                }
            }) as INotification[]
            setListTips(data)
        })
    }, [])

    const getListUsers = useCallback(async () => {
        const userRef = collection(database, firebaseDocs.users)
        onSnapshot(userRef, (querySnapshot) => {
            const data = querySnapshot.docs.map(docs => {
                return {
                    id: docs.id,
                    ...docs.data()
                }
            }) as IUser[]
            setListUsers(data)
        })
    }, [])

    const getListOrderOfService = useCallback(async () => {
        const orderRef = collection(database, firebaseDocs.order)
        onSnapshot(orderRef, (querySnapshot) => {
            const data = querySnapshot.docs.map(docs => {
                return {
                    id: docs.id,
                    ...docs.data()
                }
            }) as IOrder[]
            console.log(data)
            setListOrders(data)
        })
    }, [])

    const login = useCallback(async ({ email, password }: ISignIn) => {
        try {
            const crypto = await enigma(password);
            const q = query(collection(database, firebaseDocs.users), where("email", "==", email), where("password", "==", crypto));
            const querySnapshot = await getDocs(q);
            if (querySnapshot.empty) {
                showNotification({
                    title: 'Erro no login',
                    description: 'Verifique seu email e/ou senha',
                    type: 'error',
                    duration: 4000
                })
                return false
            }
            querySnapshot.forEach(async (doc) => {
                setUserAuth({
                    id: doc.id,
                    ...doc.data()
                })
                setUserSigned(true)
                if (doc.data().administrator) {
                    await getListUsers()
                }
                await storeData({
                    email,
                    password
                }, storageKey.user)
                await getListNotifications()
                await getListOrderOfService()
                await getListTips()
            });
            return true
        } catch (error) {
            showNotification({
                title: 'Erro no login',
                description: error || 'Verifique sua conexão',
                type: 'error',
                duration: 4000
            })
            return false
        }
    }, [])

    const logout = useCallback(async () => {
        clearStoreData()
        setUserSigned(false)
        setUserAuth(null)
    }, [])

    const forgotPassword = useCallback(async ({ email }: ISignIn) => {

    }, [])

    useEffect(() => {
        async function getUserStorage() {
            try {
                const userStorage = await getData(storageKey.user)
                if (!!userStorage) {
                    await login(userStorage)
                }
            } catch (error) {
                console.log(error)
            }
        }
        getUserStorage()
    }, [])

    return (
        <AppContext.Provider value={{ logout, userSigned, userAuth, login, listUsers, listNotifications, listTips, forgotPassword, createUser, createTip, createNotification, updateUser, deleteUser, updateTip, deleteTip, createOrder, deleteOrder, updateOrder, listOrders }}>
            {children}
        </AppContext.Provider>
    )
}

export { AppProvider, AppContext }