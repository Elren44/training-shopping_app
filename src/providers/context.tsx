import {createContext} from "react";

export enum ThemeColor {
	"dark" = "dark",
	"light" = "light"
}

const THEME = ThemeColor.dark
export const ThemeContext = createContext(THEME)
