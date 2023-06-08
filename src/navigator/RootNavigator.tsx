import React from 'react'
import {createNativeStackNavigator, NativeStackScreenProps} from "@react-navigation/native-stack";
import DetailsScreen from "../screens/DetailsScreen";
import {NavigatorScreenParams} from "@react-navigation/native";
import TabsNavigator, {TabsStackParamsList} from "./TabsNavigator";

export type RootStackParamList = {
    TabsStack: NavigatorScreenParams<TabsStackParamsList>
    Details: {
        id: string
    };
}
const RootStack = createNativeStackNavigator<RootStackParamList>()

export type RootStackScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<RootStackParamList, T>
const RootNavigator = () => {
    return (
        <RootStack.Navigator screenOptions={{animation: "slide_from_right"}}>
            <RootStack.Screen name={"TabsStack"} component={TabsNavigator} options={{
                headerShown: false
            }} />
            <RootStack.Screen name={"Details"} component={DetailsScreen} options={{
                headerShown: false
            }}/>
        </RootStack.Navigator>
    );
}

export default RootNavigator;
