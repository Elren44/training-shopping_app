
import {useContext, useState} from "react";
import {ThemeColor, ThemeContext} from "../providers/context";

export type Color = {
		background: string,
		text: string,
		primary: string,
		border: string,
		card: string
}

const Colors = {
	light: {
		background: '#f5f5f5',
		text: '#191919',
		primary: '#191919',
		border: '#D9D9D9',
		card: "#f5f5f5",
		bgOp: '#00000059'
	},
	dark: {
		background: "#191919",
		text: "#f5f5f5",
		primary: '#f5f5f5',
		border: '#D9D9D9',
		card: "#242424",
		bgOp: '#00000059'
	},
}


const useThemeColors = () => {
	const defaultMode = useContext(ThemeContext)
	const [mode, setModes] = useState(defaultMode);
	const [colors, setColors] = useState(Colors[mode])

	const setMode = (mode:ThemeColor) => {
		setModes(mode)
		setColors(Colors[mode])
	}


	return {colors, mode, setMode}
}

export default useThemeColors
