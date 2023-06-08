import React, {FC, ReactNode, useState} from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import useThemeColors from "../hooks/useThemeColors";
import {dataColors} from "../data/colors";
import {sleeves} from "../data/sleeeves";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {ScrollView} from 'react-native-gesture-handler';
import Icons from "@expo/vector-icons/MaterialIcons";
import PriceRangeSelector from "./PriceRangeSelector";

const MAX_PRICE = 500

const FilterView: FC = () => {
	const [startPrice, setStartPrice] = useState(50)
	const [endPrice, setEndPrice] = useState(250);
	const {colors} = useThemeColors()
	const insets = useSafeAreaInsets();
	const styles = getStyles(colors)
	return (
		<View style={{flex: 1}}>
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
					<PriceRangeSelector
						minPrice={0}
						maxPrice={MAX_PRICE}
						startPrice={startPrice}
						endPrice={endPrice}
						onStartPriceChange={setStartPrice}
						onEndPriceChange={setEndPrice}
					/>

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
				flexGrow: 1,
			},
			filterHeader: {
				flexDirection: "row",
				alignItems: "center",
				paddingHorizontal: 24
			},
			filterHeaderTitle: {
				flex: 1,
				fontSize: 20,
				fontWeight: "700"
			},

			sports: {
				paddingHorizontal: 24
			},
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
