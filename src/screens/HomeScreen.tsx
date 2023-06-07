import React, {FC, ReactNode, useCallback, useRef, useState} from 'react';
import {FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View,} from 'react-native';
import Icons from '@expo/vector-icons/MaterialIcons';
import {SafeAreaView} from 'react-native-safe-area-context';
import MasonryList from 'reanimated-masonry-list';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import CustomBackdrop from '../components/CustomBackdrop';
import FilterView from "../components/FilterView";
import useThemeColors from "../hooks/useThemeColors";
import {ThemeColor} from "../providers/context";
import {masonryItems} from "../data/masonryList";

const CATEGORIES = [
	'Clothing',
	'Shoes',
	'Accessories',
	'Sport',
	'Jewelry',
	'Games',
	'Inventory',
];

const AVATAR_URL =
	'https://images.unsplash.com/photo-1583692331507-fc0bd348695d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1hbiUyMGZhY2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80';

const HomeScreen: FC = () => {
	// const { colors } = useTheme();
	const {colors, mode, setMode} = useThemeColors()
	const [categoryIndex, setCategoryIndex] = useState(0);
	const bottomSheetModalRef = useRef<BottomSheetModal>(null);

	const openFilterModal = useCallback(() => {
		bottomSheetModalRef.current?.present();
	}, []);

	return (
		<ScrollView>
			<SafeAreaView style={{paddingVertical: 24, gap: 24, backgroundColor: colors.background}}>
				{/* Header Section */}
				<View style={styles.header}>
					<Image
						source={{uri: AVATAR_URL}}
						style={styles.headerAvatar}
						resizeMode='cover'
					/>
					<View style={{flex: 1}}>
						<Text
							style={{...styles.headerName, color: colors.text}}
							numberOfLines={1}
						>
							Hi, James 👋
						</Text>
						<Text
							style={{color: colors.text, opacity: 0.5}}
							numberOfLines={1}
						>
							Discover fashion that suit your style
						</Text>
					</View>
					<TouchableOpacity
						style={{...styles.headerButton, borderColor: colors.border}}
						onPress={() => {
							const newmode = mode === ThemeColor.light ? ThemeColor.dark : ThemeColor.light
							setMode(newmode)
						}
						}
					>
						<Icons name='notifications' size={24} color={colors.text}/>
					</TouchableOpacity>
				</View>

				{/* Search Bar Section */}
				<View style={styles.search}>
					<TouchableOpacity
						style={{...styles.searchInput, borderColor: colors.border}}
					>
						<Icons
							name='search'
							size={24}
							color={colors.text}
							style={{opacity: 0.5}}
						/>
						<Text style={{...styles.searchText, color: colors.text}}>
							Search
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={openFilterModal}
						style={{...styles.headerButton, backgroundColor: colors.text}}
					>
						<Icons name='tune' size={24} color={colors.background}/>
					</TouchableOpacity>
				</View>

				{/* Grid Collection View */}
				<View style={styles.collection}>
					{/* Title bar */}
					<View style={styles.collectionTitleBody}>
						<Text style={[styles.collectionTitle, {color: colors.text}]}>New Collection</Text>
						<TouchableOpacity>
							<Text style={{color: colors.text}}>See all</Text>
						</TouchableOpacity>
					</View>
					<View style={{flexDirection: 'row', gap: 12, height: 200}}>
						{/* Card */}
						<Card image={() =>
							<Image
								source={require("../assets/images/image-1.jpg")}
								resizeMode='cover'
								style={{
									height: undefined, width: undefined, flex: 1
								}}
							/>
						}/>
						<View style={{flex: 1, gap: 12}}>
							<Card image={() => <Image
								source={require("../assets/images/image-2.jpg")}
								resizeMode='cover'
								style={{
									height: undefined, width: undefined, flex: 1
								}}
							/>
							}/>
							<Card image={() => <Image
								source={require("../assets/images/image-3.jpg")}
								resizeMode='cover'
								style={{
									height: undefined, width: undefined, flex: 1
								}}
							/>

							}/>
						</View>
					</View>
				</View>

				{/* Categories */}
				<FlatList
					data={CATEGORIES}
					horizontal
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={{paddingHorizontal: 16, gap: 12}}
					renderItem={({item, index}) => {
						const isSelected = categoryIndex === index;
						return (
							<TouchableOpacity
								onPress={() => setCategoryIndex(index)}
								style={{
									...styles.categoriesItem,
									backgroundColor: isSelected ? colors.text : colors.card,
									borderWidth: isSelected ? 0 : 1,
									borderColor: colors.border,
								}}
							>
								<Text
									style={{
										...styles.categoriesTitle,
										color: isSelected ? colors.background : colors.text,
										opacity: isSelected ? 1 : 0.5,
									}}
								>
									{item}
								</Text>
							</TouchableOpacity>
						);
					}}
				/>

				{/* Mesonary */}
				<MasonryList
					data={masonryItems}
					keyExtractor={(item): string => item.id}
					numColumns={2}
					contentContainerStyle={{paddingHorizontal: 12}}
					showsVerticalScrollIndicator={false}
					renderItem={({item, i}: any) => (
						<View style={{padding: 6}}>
							<View
								style={{
									...styles.masonryItem,
									aspectRatio: i === 0 ? 1 : 3 / 4,
									backgroundColor: colors.background,
								}}
							>
								{item.Image()}
								<View style={[StyleSheet.absoluteFill, {padding: 12}]}>
									<View style={{flexDirection: 'row', gap: 8, padding: 4}}>
										<Text
											style={{
												...styles.masonryItemText,
												color: colors.text,
											}}
										>
											PUMA Everyday Hussle
										</Text>
										<View
											style={[
												styles.masonryItemFavorite,
												{backgroundColor: colors.background,}
											]}
										>
											<Icons
												name='favorite-border'
												size={24}
												color={colors.text}
											/>
										</View>
									</View>
									<View style={{flex: 1}}/>
									<View style={styles.masonryItemFooter}>
										<Text
											style={styles.masonryItemFooterPrice}
											numberOfLines={1}
										>
											$160
										</Text>
										<TouchableOpacity style={styles.masonryItemFooterBtn}>
											<Icons
												name='add-shopping-cart'
												size={20}
												color='#000'
											/>
										</TouchableOpacity>
									</View>
								</View>
							</View>
						</View>
					)}
					onEndReachedThreshold={0.1}
				/>
			</SafeAreaView>

			<BottomSheetModal
				snapPoints={['75%']}
				index={0}
				animationConfigs={{duration: 300}}
				backdropComponent={(props) => <CustomBackdrop {...props} />}
				ref={bottomSheetModalRef}
			>
				<FilterView/>
			</BottomSheetModal>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	absolute: {
		position: 'absolute',
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
	},
	header: {
		paddingHorizontal: 24,
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
	},
	headerAvatar: {
		width: 52,
		aspectRatio: 1,
		borderRadius: 26,
	},
	headerName: {
		fontSize: 18,
		fontWeight: '600',
		marginBottom: 8,
	},
	headerButton: {
		width: 52,
		aspectRatio: 1,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 52,
		borderWidth: 1,
	},
	search: {
		flexDirection: 'row',
		paddingHorizontal: 24,
		gap: 12,
	},
	searchInput: {
		flex: 1,
		height: 52,
		borderRadius: 52,
		borderWidth: 1,
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 24,
		gap: 12,
	},
	searchText: {
		flex: 1,
		fontSize: 16,
		opacity: 0.5,
	},
	collection: {
		paddingHorizontal: 24,
	},
	collectionTitleBody: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	collectionTitle: {
		fontSize: 20,
		fontWeight: '700',
	},
	categoriesItem: {
		paddingHorizontal: 24,
		paddingVertical: 16,
		borderRadius: 52,
	},
	categoriesTitle: {
		fontWeight: '600',
		fontSize: 16,
	},
	masonryItem: {
		position: 'relative',
		overflow: 'hidden',
		borderRadius: 24,
	},
	masonryItemText: {
		flex: 1,
		fontSize: 16,
		fontWeight: '600',
	},
	masonryItemFavorite: {
		borderRadius: 100,
		height: 32,
		aspectRatio: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	masonryItemFooter: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		backgroundColor: 'rgba(0,0,0,0.35)',
		alignItems: 'center',
		padding: 8,
		overflow: 'hidden',
		borderRadius: 100,
	},
	masonryItemFooterPrice: {
		fontSize: 16,
		flex: 1,
		fontWeight: '600',
		color: '#fff',
		marginLeft: 4,
	},
	masonryItemFooterBtn: {
		paddingHorizontal: 16,
		paddingVertical: 8,
		borderRadius: 100,
		backgroundColor: '#fff',
	},
});

const Card = ({image}: { image: () => ReactNode }) => {
	return (
		<TouchableOpacity
			style={{
				flex: 1,
				position: 'relative',
				overflow: 'hidden',
				borderRadius: 24,
			}}
		>
			{image()}
			<View
				style={{
					position: 'absolute',
					top: 16,
					left: 16,
					paddingHorizontal: 16,
					paddingVertical: 10,
					backgroundColor: 'rgba(0,0,0,0.25)',
					borderRadius: 32,
				}}
			>
				<Text style={{fontSize: 14, fontWeight: '600', color: '#fff'}}>
					$130
				</Text>
			</View>
		</TouchableOpacity>
	);
};

export default HomeScreen;
