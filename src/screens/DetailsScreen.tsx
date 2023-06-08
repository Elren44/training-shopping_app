import React, {useMemo, useState} from 'react'
import {Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {RootStackScreenProps} from "../navigator/RootNavigator";
import {SafeAreaView, useSafeAreaInsets} from "react-native-safe-area-context";
import useThemeColors from "../hooks/useThemeColors";
import Icons from "@expo/vector-icons/MaterialIcons";
import {StatusBar} from "expo-status-bar";
import BottomSheet from '@gorhom/bottom-sheet';
import {SIZES} from "../data/sizes";

const DetailsScreen = ({navigation, route: {params: {id}}}: RootStackScreenProps<"Details">) => {
	const {colors} = useThemeColors()
	const styles = getStyles(colors)
	const snapPoints = useMemo(() => ['10%', 500], []);
	const insets = useSafeAreaInsets()
	const [count, setCount] = useState(0)
	const [sizes, setSizes] = useState(1)

	const decreaseCount = () => {
		setCount(count => Math.max(1, count - 1))
	}

	const increaseCount = () => {
		setCount(count => Math.min(10, count + 1))
	}

	const sizeHandler = (id: number) => {
		setSizes(id)
	}

	return (
		<View style={{flex: 1}}>
			<Image source={require("../assets/images/image-3.jpg")} style={{flex: 1}}/>
			<SafeAreaView edges={["top"]} style={styles.body}>
				<StatusBar style={"light"}/>
				<View style={styles.header}>
					<TouchableOpacity
						onPress={() => navigation.goBack()}
						style={styles.headerButton}>
						<Icons name='arrow-back' size={24} color={colors.background}/>
					</TouchableOpacity>
					<View style={{flex: 1}}/>
					<TouchableOpacity
						style={styles.headerButton}>
						<Icons name={"favorite-border"} size={24} color={colors.background}/>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.headerButton}>
						<Icons name={"add-shopping-cart"} size={24} color={colors.background}/>
					</TouchableOpacity>
				</View>
			</SafeAreaView>


			<BottomSheet
				snapPoints={snapPoints}
				detached={true}
				bottomInset={insets.bottom + 20}
				style={{marginHorizontal: 20}}
				index={0}
				backgroundStyle={{
					borderRadius: 24,
					backgroundColor: colors.background
				}}
			>
				<View style={{padding: 16, gap: 16, flex: 1}}>
					<Text style={styles.modalTitle}>PUMA Everyday Hussle</Text>

					{/*Rating and Count*/}
					<View style={{flexDirection: "row", alignItems: "center", gap: 8}}>
						<View style={{flex: 1}}>
							<View style={styles.rating}>
								{new Array(5).fill("").map((_, i) => (
									<Icons key={i} name={i < 3 ? "star" : "star-border"}
									       color={i < 3 ? "#facc15" : colors.text} size={20}/>
								))}
							</View>
							<Text style={{fontSize: 12, color: colors.text, opacity: 0.5}}>3.1 (220k Reviews)</Text>
						</View>
						<View style={styles.modalCount}>
							<TouchableOpacity style={styles.modalCountBtn} onPress={decreaseCount}>
								<Icons name={"remove"} size={20} color={colors.text}/>
							</TouchableOpacity>
							<Text style={{fontSize: 16, fontWeight: "600", color: colors.background}}>{count}</Text>
							<TouchableOpacity style={styles.modalCountBtn} onPress={increaseCount}>
								<Icons name={"add"} size={20} color={colors.text}/>
							</TouchableOpacity>
						</View>
					</View>

					{/*	Sizes*/}
					<View style={{gap: 12}}>
						<View style={{flexDirection: "row", alignItems: "center"}}>
							<Text style={styles.sizeTitle}>Model is 6'1", Size M</Text>
							<Text style={styles.sizeGuide}>Size guide</Text>
						</View>

						{Platform.OS === "ios" ? (
							<ScrollView
								horizontal
								showsHorizontalScrollIndicator={false}
								// style={{flex: 1}}
								contentContainerStyle={{gap: 22, flex: 1}}
							>
								{SIZES.map((size, i) => {
									return (
										<TouchableOpacity key={size.id} onPress={() => sizeHandler(size.id)}
										                  style={[styles.sizeItem, {backgroundColor: size.id === sizes ? colors.text : colors.card}]}>
											<Text
												style={{
													fontSize: 16,
													fontWeight: "600",
													color: size.id === sizes ? colors.background : colors.text
												}}>{size.name}</Text>
										</TouchableOpacity>
									)
								})}
							</ScrollView>
						) : (
							<View
								style={{
									flexDirection: "row",
									flexWrap: "wrap",
									gap: 6,
									marginTop: 6,
								}}
							>
								{SIZES.map((size, i) => {
									return (
										<TouchableOpacity key={size.id} onPress={() => sizeHandler(size.id)}
										                  style={[styles.sizeItem, {backgroundColor: size.id === sizes ? colors.text : colors.card}]}>
											<Text
												style={{
													fontSize: 16,
													fontWeight: "600",
													color: size.id === sizes ? colors.background : colors.text
												}}>{size.name}</Text>
										</TouchableOpacity>
									)
								})}
							</View>
						)}


					</View>
					{/*	Desctiption*/}
					<View style={{marginBottom: 16}}>
						<Text style={styles.descriptionTitle}>Description</Text>
						<Text style={{color: colors.text, opacity: 0.75}} numberOfLines={3}>Lorem ipsum dolor sit
							amet, consectetur adipisicing elit. Aspernatur at blanditiis delectus dignissimos eaque
							fuga nesciunt perspiciatis quas recusandae voluptate.</Text>
					</View>

					<View style={{flex: 1}}/>

					{/*	footer*/}
					<View style={{flexDirection: "row", alignItems: "center", gap: 16}}>
						<View style={{flex: 1}}>
							<Text style={{color: colors.text, opacity: 0.75, marginBottom: 4}}>Total</Text>
							<Text style={{fontSize: 18, fontWeight: "600", color: colors.text}}>${(2500).toLocaleString()}</Text>
						</View>
						<TouchableOpacity
							style={styles.footerBtn}>
							<Text style={styles.footerBtnText}>Add to cart</Text>
							<View style={styles.footerBtnArrow}>
								<Icons name="arrow-forward" size={24} color={colors.text}/>
							</View>
						</TouchableOpacity>
					</View>
				</View>
			</BottomSheet>
		</View>
	);
}


const getStyles = (colors: any) => {
	return (
		StyleSheet.create({
			body: {
				position: "absolute",
				top: 0,
				left: 0,
				right: 0,
			},
			header: {
				flexDirection: "row",
				alignItems: "center",
				padding: 20,
				gap: 8
			},
			headerButton: {
				width: 52,
				aspectRatio: 1,
				borderColor: colors.border,
				alignItems: 'center',
				justifyContent: 'center',
				borderRadius: 52,
				borderWidth: 1,
			},
			modalTitle: {
				fontSize: 20,
				fontWeight: "600",
				color: colors.text
			},
			modalCount: {
				flexDirection: "row",
				alignItems: "center",
				gap: 6,
				backgroundColor: colors.primary,
				padding: 6,
				borderRadius: 100
			},
			modalCountBtn: {
				width: 34,
				aspectRatio: 1,
				alignItems: "center",
				justifyContent: "center",
				borderRadius: 34,
				backgroundColor: colors.card
			},
			rating: {
				flexDirection: "row",
				gap: 2,
				marginBottom: 4
			},
			sizeTitle: {
				flex: 1,
				fontSize: 16,
				fontWeight: "600",
				color: colors.text,
				textTransform: "uppercase"
			},
			sizeGuide: {
				fontSize: 14,
				color: colors.text,
				opacity: 0.5
			},
			sizeItem: {
				width: 44,
				height: 44,
				alignItems: "center",
				justifyContent: "center",
				borderRadius: 44,
				// flex: 1,
			},
			descriptionTitle: {
				fontSize: 16,
				fontWeight: "600",
				marginBottom: 6,
				color: colors.text
			},
			footerBtn: {
				backgroundColor: colors.primary,
				height: 64,
				borderRadius: 64,
				alignItems: "center",
				justifyContent: "center",
				flexDirection: "row",
				padding: 12
			},
			footerBtnText: {
				color: colors.background,
				fontSize: 16,
				fontWeight: "600",
				paddingHorizontal: 16
			},
			footerBtnArrow: {
				backgroundColor: colors.card,
				width: 40,
				aspectRatio: 1,
				justifyContent: "center",
				alignItems: "center",
				borderRadius: 40
			}

		})
	)
}

export default DetailsScreen;
