import React from 'react'
import {BottomTabScreenProps, createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import Icons from "@expo/vector-icons/MaterialIcons"
import useThemeColors from "../hooks/useThemeColors";
import {CompositeScreenProps} from "@react-navigation/native";
import {RootStackScreenProps} from "./RootNavigator";
import {View} from "react-native";
import CustomBottomTabs from "../components/CustomBottomTabs";

export type TabsStackParamsList = {
    Home: undefined,
    Cart: undefined,
    Payment: undefined,
    Profile: undefined
}

const TabsStack = createBottomTabNavigator<TabsStackParamsList>()

export type TabsStackScreenProps<T extends keyof TabsStackParamsList> = CompositeScreenProps<
    BottomTabScreenProps<TabsStackParamsList, T>,
    RootStackScreenProps<"TabsStack">
>
const TabsNavigator = () => {
    const {colors} = useThemeColors()

    return (
        <TabsStack.Navigator
            screenOptions={{tabBarShowLabel: false, tabBarStyle: {backgroundColor: colors.background}, tabBarActiveTintColor: colors.text }}
            tabBar={(props) => <CustomBottomTabs {...props} />}
        >
            <TabsStack.Screen name={"Home"} component={HomeScreen}
                options={{
                    headerShown: false,
                    tabBarIcon(props) {
                        return <Icons  name="home" {...props}/>
                    },

                }}

            />
            <TabsStack.Screen name={"Cart"}   component={Example}
                options={{
                    headerShown: false,
                    tabBarIcon(props) {
                        return <Icons name="shopping-cart" {...props}/>
                    },
                }}
            />
            <TabsStack.Screen name={"Payment"} component={Example}
                options={{
                    headerShown: false,
                    tabBarIcon(props) {
                        return <Icons name="account-balance-wallet" {...props}/>
                    },
                }}
            />
            <TabsStack.Screen name={"Profile"} component={Example}
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

const Example = () => {
    return <View />;
};
