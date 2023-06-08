import {Image, StyleSheet} from "react-native";

export const masonryItems = [
	{
		id: "1",
		url: require("../assets/images/image-1.jpg"),
		Image: () => <Image
			resizeMode='cover'
			style={[StyleSheet.absoluteFill, {height: undefined, width: undefined, flex: 1}]}

			source={require("../assets/images/image-1.jpg")}
		/>,
		price: 80,
	},
	{
		id: "2",
		url: require("../assets/images/image-2.jpg"),
		Image: () => <Image
			resizeMode='cover'
			style={[StyleSheet.absoluteFill, {height: undefined, width: undefined, flex: 1}]}

			source={require("../assets/images/image-2.jpg")}
		/>,
		price: 180,
	},
	{
		id: "3",
		url: require("../assets/images/image-3.jpg"),
		Image: () => <Image
			resizeMode='cover'
			style={[StyleSheet.absoluteFill, {height: undefined, width: undefined, flex: 1}]}

			source={require("../assets/images/image-3.jpg")}
		/>,
		price: 430,
	},
	{
		id: "4",
		url: require("../assets/images/image-4.jpg"),
		Image: () => <Image
			resizeMode='cover'
			style={[StyleSheet.absoluteFill, {height: undefined, width: undefined, flex: 1}]}

			source={require("../assets/images/image-4.jpg")}
		/>,
		price: 110,
	},
	{
		id: "5",
		url: require("../assets/images/image-5.jpg"),
		Image: () => <Image
			resizeMode='cover'
			style={[StyleSheet.absoluteFill, {height: undefined, width: undefined, flex: 1}]}

			source={require("../assets/images/image-5.jpg")}
		/>,
		price: 280,
	},
	{
		id: "6",
		url: require("../assets/images/image-6.jpg"),
		Image: () => <Image
			resizeMode='cover'
			style={[StyleSheet.absoluteFill, {height: undefined, width: undefined, flex: 1}]}

			source={require("../assets/images/image-6.jpg")}
		/>,
		price: 310,
	},
	{
		id: "7",
		url: require("../assets/images/image-7.jpg"),
		Image: () => <Image
			resizeMode='cover'
			style={[StyleSheet.absoluteFill, {height: undefined, width: undefined, flex: 1}]}

			source={require("../assets/images/image-7.jpg")}
		/>,
		price: 220,
	},
]
