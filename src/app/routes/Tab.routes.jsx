import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../View/Home/Index';
import Dashboard from '../View/Dashboard_month/Index';
import { MaterialIcons } from '@expo/vector-icons';
import { styles } from './Styles';
import { theme } from '../theme/Index';

const Tab = createBottomTabNavigator();

export default function TabRoutes() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: theme.Colors.green_600,
                tabBarInactiveTintColor: theme.Colors.gray_200,
                tabBarLabelStyle: styles.labelStyle,
                tabBarStyle: styles.barStyle,
                tabBarIconStyle: styles.iconStyle,
            }}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="attach-money" size={size} color={color} />
                    ),
                    tabBarLabel: 'Home',
                }}
            />
            <Tab.Screen
                name="Financeiro"
                component={Dashboard}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="calendar-month" size={size} color={color} />
                    ),
                    tabBarLabel: 'Financeiro',
                }}
            />
        </Tab.Navigator>
    );
}
