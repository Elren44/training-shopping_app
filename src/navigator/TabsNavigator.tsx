import React, {useState} from 'react'
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import Icons from "@expo/vector-icons/MaterialIcons"
import useThemeColors from "../hooks/useThemeColors";

export type TabsStackParamsList = {
    Home: undefined,
    Cart: undefined,
    Payment: undefined,
    Profile: undefined
}

const TabsStack = createBottomTabNavigator<TabsStackParamsList>()
const TabsNavigator = () => {
    const {colors} = useThemeColors()
    return (
        <TabsStack.Navigator  screenOptions={{tabBarShowLabel: false, tabBarStyle: {backgroundColor: colors.background}, tabBarActiveTintColor: colors.text }}>
            <TabsStack.Screen name={"Home"} component={HomeScreen}
                options={{
                    headerShown: false,
                    tabBarIcon(props) {
                        return <Icons  name="home" {...props}/>
                    },

                }}
            />
            <TabsStack.Screen name={"Cart"} component={HomeScreen}
                options={{
                    headerShown: false,
                    tabBarIcon(props) {
                        return <Icons name="shopping-cart" {...props}/>
                    },
                }}
            />
            <TabsStack.Screen name={"Payment"} component={HomeScreen}
                options={{
                    headerShown: false,
                    tabBarIcon(props) {
                        return <Icons name="account-balance-wallet" {...props}/>
                    },
                }}
            />
            <TabsStack.Screen name={"Profile"} component={HomeScreen}
                options={{
                    headerShown: false,
                    tabBarIcon(props) {
                        return <Icons name="person" {...props}/>
                    },
                }}
            />
        </TabsStack.Navigator>
    );
}

export default TabsNavigator;
