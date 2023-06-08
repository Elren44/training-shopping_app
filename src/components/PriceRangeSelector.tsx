import {StyleSheet, Text, View} from "react-native";
import React, {useEffect, useMemo, useState} from "react";
import Animated, {runOnJS, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue,} from "react-native-reanimated";
import {PanGestureHandler, PanGestureHandlerGestureEvent,} from "react-native-gesture-handler";
import useThemeColors from "../hooks/useThemeColors";

const PriceRangeSelector = ({
	                            minPrice,
	                            maxPrice,
	                            startPrice,
	                            endPrice,
	                            onStartPriceChange,
	                            onEndPriceChange
                            }: {
	minPrice: number,
	maxPrice: number,
	startPrice: number,
	endPrice: number,
	onStartPriceChange: (value: number) => void,
	onEndPriceChange: (value: number) => void
}) => {
	const {colors} = useThemeColors()
	const styles = getStyles(colors)
	const [barWidth, setBarWidth] = useState(0);

	const leftHandlePos = useSharedValue(0)
	const rightHandlePos = useSharedValue(0)

	const leftHandleGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, {
		prevPos: number
	}>({
		onStart(event, context) {
			context.prevPos = leftHandlePos.value
		},
		onActive(event, context) {
			leftHandlePos.value = Math.min(
				rightHandlePos.value,
				Math.max(0, context.prevPos + event.translationX)
			);
			runOnJS(onStartPriceChange)(Math.round((maxPrice / barWidth) * leftHandlePos.value))
		}

	})
	const rightHandleGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, {
		prevPos: number
	}>({
		onStart(event, context) {
			context.prevPos = rightHandlePos.value
		},
		onActive(event, context) {
			rightHandlePos.value = Math.min(
				barWidth,
				Math.max(leftHandlePos.value, context.prevPos + event.translationX)
			);
			runOnJS(onEndPriceChange)(Math.round((maxPrice / barWidth) * rightHandlePos.value))
		}
	})

	const leftHandleStyle = useAnimatedStyle(() => ({
		transform: [
			{
				translateX: leftHandlePos.value
			}
		]
	}))
	const rightHandleStyle = useAnimatedStyle(() => ({
		transform: [
			{
				translateX: rightHandlePos.value
			}
		]
	}))

	const barHighlightStyle = useAnimatedStyle(() => ({
		left: leftHandlePos.value,
		right: barWidth - rightHandlePos.value,
	}))

	const bars = useMemo(() => (
		<View style={{flexDirection: "row", alignItems: "flex-end"}}>
			{new Array(Math.round(maxPrice / 40)).fill("").map((_, i) => {
				const randomValue = Math.random()
				return (
				<View key={i} style={{
					flex: 1,
					height: Math.round(Math.random() * 40) + 8,
					backgroundColor: "#3b82f6",
					opacity: Math.max(0.2, Math.min(0.5, randomValue)),
				}}>

				</View>
				)
			})}
		</View>
	), []);

	useEffect(() => {
		if (barWidth === 0) return;
		leftHandlePos.value = (startPrice * barWidth) / maxPrice;
		rightHandlePos.value = (endPrice * barWidth) / maxPrice;
	}, [barWidth]);

	return (
		<View style={{paddingHorizontal: 24}}>
			<View style={{marginBottom: 24}}>
				<Text>Price Range</Text>
			</View>

			{bars}

			<View style={styles.priceSliderWrapper}
			      onLayout={(event) => {
				      setBarWidth(event.nativeEvent.layout.width)
			      }}
			>
				<Animated.View style={[barHighlightStyle, styles.priceSlider]}/>
				<PanGestureHandler onGestureEvent={leftHandleGesture}>
					<Animated.View style={[leftHandleStyle, {position: "absolute", zIndex: 10}]}>
						<View
							style={{
								backgroundColor: colors.card,
								width: 1000,
								position: "absolute",
								right: 24,
								height: 48,
								bottom: 24,
							}}
						/>
						<SlideHandle label={`$${startPrice}`}/>
					</Animated.View>
				</PanGestureHandler>
				<PanGestureHandler onGestureEvent={rightHandleGesture}>
					<Animated.View style={[rightHandleStyle, {position: "absolute", zIndex: 10}]}>
						<View
							style={{
								backgroundColor: colors.card,
								width: 1000,
								position: "absolute",
								left: -0,
								height: 48,
								bottom: 24,
							}}
						/>
						<SlideHandle label={`${endPrice}`}/>
					</Animated.View>
				</PanGestureHandler>
				{/*<Text style={{color: colors.text, opacity: 0.5, position: "absolute", bottom: -31, left: 0}}>${minPrice}</Text>*/}
				{/*<Text style={{color: colors.text, opacity: 0.5, position: "absolute", bottom: -31, right: 0}}>${maxPrice}</Text>*/}
			</View>
		</View>
	);
}

const getStyles = (colors: any) => {
	return (
		StyleSheet.create({
			price: {},
			priceSliderWrapper: {
				height: 1,
				width: "100%",
				position: "relative",
				backgroundColor: colors.border,
				marginBottom: 16
			},
			priceMinMax: {
				flexDirection: "row",
				alignItems: "center",
				justifyContent: "space-between",
				marginTop: 12
			},
			priceSlider: {
				position: "absolute",
				overflow: "visible",
				height: "100%",
				backgroundColor: colors.accent
			},
			priceHandle: {
				height: 24,
				aspectRatio: 1,
				alignItems: "center",
				justifyContent: "center",
				borderRadius: 100,
				borderColor: colors.accent,
				backgroundColor: colors.background,
				borderWidth: 2,
				position: "relative",
				transform: [
					{
						translateX: -12,
					},
					{
						translateY: -12,
					},
				],
			},
			priceHandleDot: {
				width: 3,
				height: 3,
				borderRadius: 10,
				backgroundColor: colors.primary
			},
			priceLabel: {
				position: "absolute",
				bottom: -22,
				width: 50,
				alignItems: "center",
				zIndex: 10,
				backgroundColor: colors.card
			}
		})


	)
}

const SlideHandle = ({label}: { label: string }) => {
	const {colors} = useThemeColors()
	const styles = getStyles(colors)
	return (
		<View
			style={styles.priceHandle}
		>
			<View
				style={styles.priceHandleDot}
			/>
			<View style={styles.priceLabel}>
				<Text style={{color: colors.text}} numberOfLines={1}>{label}</Text>
			</View>
		</View>
	)
}

export default PriceRangeSelector;
