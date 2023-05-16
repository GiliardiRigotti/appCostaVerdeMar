import React, { useContext } from 'react';
import { NotifierWrapper } from 'react-native-notifier';
import { AppContext, AppProvider } from '../context';
import AuthRoutes from './auth.routes';
import AdminRoutes from './admin.routes';
import UserRoutes from './user.routes';

export default function Routes() {
    const { userSigned, userAuth } = React.useContext(AppContext)
    console.log(userSigned)
    if (userSigned) {
        if (userAuth?.administrator) {
            return (
                <AdminRoutes />
            )
        } else {
            return (
                <UserRoutes />
            )
        }
    } else {
        return (
            <AuthRoutes />
        );
    }

}