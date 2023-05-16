import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Admin/Home';
import ManageUsers from '../screens/Admin/ManageUsers';
import CreateUser from '../screens/Admin/CreateUser';
import ManageNotifications from '../screens/Admin/ManageNotifications';
import CreateNotification from '../screens/Admin/CreateNotification';
import ManageTips from '../screens/Admin/ManageTips';
import CreateTip from '../screens/Admin/CreateTip';
import ManageOrderofService from '../screens/Admin/ManageOrderofService';
import OrderViewer from '../screens/Admin/OrderViewer';

const Stack = createStackNavigator();

export default function AdminRoutes() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="ManageUsers" component={ManageUsers} />
            <Stack.Screen name="CreateUser" component={CreateUser} />
            <Stack.Screen name="ManageNotifications" component={ManageNotifications} />
            <Stack.Screen name="ManageOrderofService" component={ManageOrderofService} />
            <Stack.Screen name="CreateNotification" component={CreateNotification} />
            <Stack.Screen name="ManageTips" component={ManageTips} />
            <Stack.Screen name="CreateTip" component={CreateTip} />
            <Stack.Screen name="OrderViewer" component={OrderViewer} />
        </Stack.Navigator>
    );
}