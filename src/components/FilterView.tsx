import React, {FC, ReactNode, useState} from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import useThemeColors from "../hooks/useThemeColors";
import {dataColors} from "../data/colors";
import {sleeves} from "../data/sleeeves";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {ScrollView} from 'react-native-gesture-handler';
import Icons from "@expo/vector-icons/MaterialIcons";

const MAX_PRICE = 500

const FilterView: FC = () => {
	const [minPrice, setMinPrice] = useState(50)
	const [maxPrice, setMaxPrice] = useState(250);
	const {colors} = useThemeColors()
	const insets = useSafeAreaInsets();
	const styles = getStyles(colors)
	return (
		<View style={{flex: 1, paddingHorizontal: 24}}>
			<ScrollView
				scrollEnabled={true}
				showsVerticalScrollIndicator={false}
				style={{flex: 1}}>
				<View style={{paddingVertical: 24, gap: 24}}>
					<View style={styles.filterHeader}>
						<Text style={styles.filterHeaderTitle}>Filters</Text>
						<TouchableOpacity><Text style={{textTransform: "uppercase"}}>Reset</Text></TouchableOpacity>
					</View>

					{/*	Price Selector*/}
					<View>
						<View style={{marginBottom: 24}}>
							<Text>Price Range</Text>
						</View>
						<View style={styles.priceSliderWrapper}>
							<View style={[styles.priceSlider, {
								left: `${(100 * minPrice) / MAX_PRICE}%`,
								width: `${(100 * (maxPrice - minPrice)) / MAX_PRICE}%`
							}]}/>
							<View style={{...styles.priceHandle, left: "10%",}}>
								<View style={styles.priceHandleDot}/>
							</View>
							<View style={{...styles.priceHandle, left: "50%",}}>
								<View style={styles.priceHandleDot}/>
							</View>
						</View>
						<View style={styles.priceMinMax}>
							<Text style={{color: colors.text, opacity: 0.5}}>$0</Text>
							<Text style={{color: colors.text, opacity: 0.5}}>${MAX_PRICE}</Text>
						</View>
					</View>

					{/*	Sports Category*/}
					<View style={styles.sports}>
						<Text style={styles.sportsTitle}>Sports</Text>
						<View style={styles.sportsCategories}>
							{new Array(10).fill("").map((item, i) => {
								return (
									<SportItem isSelected={i === 0} label="Item" itemCount={4} key={i} left={<></>}/>
								)
							})
							}
						</View>
					</View>

					{/*	Colors Category*/}
					<View style={styles.sports}>
						<Text style={styles.sportsTitle}>Color</Text>
						<View style={styles.sportsCategories}>
							{dataColors.map((item, i) => {
								return (
									<SportItem isSelected={i === 0} label={item.label} itemCount={item.itemsCount}
									           key={i}
									           left={<View style={{
										           backgroundColor: item.color,
										           width: 12,
										           height: 12,
										           borderRadius: 8
									           }}></View>}/>
								)
							})
							}
						</View>
					</View>

					{/*	Sleeves Category*/}
					<View style={{...styles.sports}}>
						<Text style={styles.sportsTitle}>Sleeves</Text>
						<View style={styles.sportsCategories}>
							{sleeves.map((item, i) => {
								return (
									<SportItem isSelected={i === 0} label={item.label} itemCount={item.itemsCount}
									           key={i}
									           left={<></>}/>
								)
							})
							}
						</View>
					</View>

				</View>

			</ScrollView>

			{/*	Button*/}
			<View style={{paddingVertical: 24, marginBottom: 24 + insets.bottom}}>
				<TouchableOpacity
					style={styles.sportsBtn}>
					<Text style={{color: colors.background, fontSize: 16, fontWeight: "600"}}>Apply Filters</Text>
					<View style={styles.sportsBtnArrow}>
						<Icons name="arrow-forward" size={24} color={colors.text}/>
					</View>
				</TouchableOpacity>
			</View>
		</View>
	);
}

const getStyles = (colors: any) => {
	return (
		StyleSheet.create({
			filter: {
				padding: 24, gap: 24, flex: 1,
				flexGrow: 1
			},
			filterHeader: {
				flexDirection: "row",
				alignItems: "center",
			},
			filterHeaderTitle: {
				flex: 1,
				fontSize: 20,
				fontWeight: "700"
			},
			price: {},
			priceSliderWrapper: {
				height: 1,
				width: "100%",
				position: "relative",
				backgroundColor: colors.border
			},
			priceMinMax: {
				flexDirection: "row",
				alignItems: "center",
				justifyContent: "space-between",
				marginTop: 12
			},
			priceSlider: {
				position: "absolute",
				height: "100%",
				backgroundColor: colors.primary
			},
			priceHandle: {
				position: "absolute",
				height: 24,
				aspectRatio: 1,
				alignItems: "center",
				justifyContent: "center",
				borderRadius: 100,
				borderWidth: 2,
				borderColor: colors.primary,
				backgroundColor: colors.background,
				transform: [
					{
						translateY: -12
					},
					{
						translateX: -12
					}
				]
			},
			priceHandleDot: {
				width: 3,
				height: 3,
				borderRadius: 10,
				backgroundColor: colors.primary
			},
			sports: {},
			sportsTitle: {
				fontSize: 16,
				fontWeight: "600",
				marginBottom: 12,
				color: colors.text
			},
			sportsCategories: {
				flexDirection: "row",
				flexWrap: "wrap",
				gap: 12
			},
			sportsItem: {
				paddingHorizontal: 16,
				paddingVertical: 8,
				borderRadius: 100,
				backgroundColor: colors.text,
				flexDirection: "row",
				alignItems: "center"
			},
			sportsText: {
				fontSize: 14,
				fontWeight: "600",
				color: colors.background
			},
			sportsBtn: {
				backgroundColor: colors.primary,
				height: 64,
				borderRadius: 64,
				alignItems: "center",
				justifyContent: "center",
				position: "relative"
			},
			sportsBtnArrow: {
				position: "absolute",
				right: 12,
				backgroundColor: colors.card,
				width: 40,
				aspectRatio: 1,
				justifyContent: "center",
				alignItems: "center",
				top: 12,
				borderRadius: 40
			}
		})
	)
}

const SportItem = ({isSelected, label, itemCount, left}: {
	isSelected: boolean,
	label: string,
	itemCount: number,
	left: ReactNode
}) => {
	const {colors} = useThemeColors()

	const styles = getStyles(colors)
	return (
		<View style={[
			styles.sportsItem,
			{backgroundColor: isSelected ? colors.text : colors.background}
		]}>
			{!!left && (
				<View style={{marginRight: 4}}>
					{left}
				</View>
			)}
			<Text
				style={[
					styles.sportsText, {color: isSelected ? colors.background : colors.text}
				]}
			>
				{label}[{itemCount}]
			</Text>
		</View>
	)
}

export default FilterView;
