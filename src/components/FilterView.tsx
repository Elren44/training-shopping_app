import React, {FC, useState} from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import useThemeColors from "../hooks/useThemeColors";

const MAX_PRICE = 500

const FilterView: FC = () => {
	const [minPrice, setMinPrice] = useState(50)
	const [maxPrice, setMaxPrice] = useState(250);
	const {colors} = useThemeColors()

	return (
		<View style={styles.filter}>
			<View style={styles.filterHeader}>
				<Text style={styles.filterHeaderTitle}>Filters</Text>
				<TouchableOpacity><Text style={{textTransform: "uppercase"}}>Reset</Text></TouchableOpacity>
			</View>

			{/*	Price Selector*/}
			<View>
				<View style={{marginBottom: 16}}>
					<Text>Price Range</Text>
				</View>
				<View style={[styles.priceSliderWrapper, {backgroundColor: colors.border}]}>
					<View style={[styles.priceSlider, {
						left: `${(100 * minPrice) / MAX_PRICE}%`,
						width: `${(100 * (maxPrice-minPrice )) / MAX_PRICE}%`,
						backgroundColor: colors.primary
					}]}/>
					<View>
						<View style={{}}/>
					</View>
				</View>
				<View style={styles.priceMinMax}>
					<Text style={{color: colors.text, opacity: 0.5}}>$0</Text>
					<Text style={{color: colors.text, opacity: 0.5}}>${MAX_PRICE}</Text>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	filter: {
		padding: 24, gap: 24
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
		position: "relative"
	},
	priceMinMax: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginTop: 12
	},
	priceSlider: {
		position: "absolute",
		height: "100%"
	}
})

export default FilterView;
