import {StatusBar} from 'expo-status-bar';
import {StyleSheet, useColorScheme} from 'react-native';
import {NavigationContainer,} from '@react-navigation/native';
import RootNavigator from './src/navigator/RootNavigator';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {ThemeColor, ThemeContext} from "./src/providers/context";
import {SafeAreaProvider} from "react-native-safe-area-context";
import useThemeColors from "./src/hooks/useThemeColors";
import {useEffect} from "react";
import { EventRegister } from 'react-native-event-listeners'

// const THEME = ThemeColor.light
export default function App() {
	const {colors, mode, setMode} = useThemeColors()
	const colorSheme = useColorScheme() as ThemeColor;
	// useEffect(() => {
	// 	const listener = EventRegister.addEventListener('changeTheme', (data) => {
	// 		setDarkMode(data)
	// 		console.log(data)
	// 	})
	// 	return () => {
	// 		EventRegister.removeEventListener(listener)
	// 	}
	//
	// }, [darkMode])

	return (
		<SafeAreaProvider style={{flex: 1}}>
			<GestureHandlerRootView style={styles.container}>
			<ThemeContext.Provider value={colorSheme}>
				<NavigationContainer>
					<BottomSheetModalProvider>
						<RootNavigator/>
					</BottomSheetModalProvider>
					<StatusBar style={colorSheme === "dark" ? "light" : "dark"}/>
				</NavigationContainer>
			</ThemeContext.Provider>
		</GestureHandlerRootView>
		</SafeAreaProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
