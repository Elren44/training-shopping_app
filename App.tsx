import {StatusBar} from 'expo-status-bar';
import {StyleSheet} from 'react-native';
import {NavigationContainer,} from '@react-navigation/native';
import RootNavigator from './src/navigator/RootNavigator';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {ThemeColor, ThemeContext} from "./src/providers/context";

const THEME = ThemeColor.light
export default function App() {

	return (
		<GestureHandlerRootView style={styles.container}>
			<ThemeContext.Provider value={THEME}>
				<NavigationContainer>
				<BottomSheetModalProvider>
					<RootNavigator/>
				</BottomSheetModalProvider>
				<StatusBar style={'dark'}/>
			</NavigationContainer>
			</ThemeContext.Provider>
		</GestureHandlerRootView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
