import React, {FC, useCallback, useRef, useState} from 'react';
import {FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View,} from 'react-native';
import Icons from '@expo/vector-icons/MaterialIcons';
import {SafeAreaView} from 'react-native-safe-area-context';
import MasonryList from 'reanimated-masonry-list';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import CustomBackdrop from '../components/CustomBackdrop';
import FilterView from "../components/FilterView";
import useThemeColors from "../hooks/useThemeColors";
import {ThemeColor} from "../providers/context";

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
	const {colors,mode, setMode} = useThemeColors()
	const [categoryIndex, setCategoryIndex] = useState(0);
	const bottomSheetModalRef = useRef<BottomSheetModal>(null);

	const openFilterModal = useCallback(() => {
		bottomSheetModalRef.current?.present();
	}, []);

	return (
		<ScrollView>
			<SafeAreaView style={{ paddingVertical: 24, gap: 24, backgroundColor: colors.background }}>
				{/* Header Section */}
				<View style={styles.header}>
					<Image
						source={{ uri: AVATAR_URL }}
						style={styles.headerAvatar}
						resizeMode='cover'
					/>
					<View style={{ flex: 1 }}>
						<Text
							style={{ ...styles.headerName, color: colors.text }}
							numberOfLines={1}
						>
							Hi, James 👋
						</Text>
						<Text
							style={{ color: colors.text, opacity: 0.5 }}
							numberOfLines={1}
						>
							Discover fashion that suit your style
						</Text>
					</View>
					<TouchableOpacity
						style={{ ...styles.headerButton, borderColor: colors.border }}
						onPress={() => {
							const newmode = mode === ThemeColor.light ? ThemeColor.dark : ThemeColor.light
							setMode(newmode)}
					}
					>
						<Icons name='notifications' size={24} color={colors.text} />
					</TouchableOpacity>
				</View>

				{/* Search Bar Section */}
				<View style={styles.search}>
					<TouchableOpacity
						style={{ ...styles.searchInput, borderColor: colors.border }}
					>
						<Icons
							name='search'
							size={24}
							color={colors.text}
							style={{ opacity: 0.5 }}
						/>
						<Text style={{ ...styles.searchText, color: colors.text }}>
							Search
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={openFilterModal}
						style={{ ...styles.headerButton, backgroundColor: colors.text }}
					>
						<Icons name='tune' size={24} color={colors.background} />
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
					<View style={{ flexDirection: 'row', gap: 12, height: 200 }}>
						{/* Card */}
						<Card />
						<View style={{ flex: 1, gap: 12 }}>
							<Card />
							<Card />
						</View>
					</View>
				</View>

				{/* Categories */}
				<FlatList
					data={CATEGORIES}
					horizontal
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={{ paddingHorizontal: 16, gap: 12 }}
					renderItem={({ item, index }) => {
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
					data={[1, 2, 3, 4, 5, 6]}
					keyExtractor={(item): string => item}
					numColumns={2}
					contentContainerStyle={{ paddingHorizontal: 12 }}
					showsVerticalScrollIndicator={false}
					renderItem={({ item, i }) => {
						return (
							<View style={{ padding: 6 }}>
								<View
									style={{
										...styles.masonryItem,
										aspectRatio: i === 0 ? 1 : 3 / 4,
										backgroundColor: colors.background,
									}}
								>
									<Image
										resizeMode='cover'
										style={StyleSheet.absoluteFill}
										source={{
											uri: 'https://plus.unsplash.com/premium_photo-1677507321948-d3f8b80fe6d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
										}}
									/>
									<View style={[StyleSheet.absoluteFill, { padding: 12 }]}>
										<View style={{ flexDirection: 'row', gap: 8, padding: 4 }}>
											<Text
												style={{
													...styles.masonryItemText,
													color: colors.text,
												}}
											>
												PUMA Everyday Hussle
											</Text>
											<View
												style={{
													...styles.masonryItemFavorite,
													backgroundColor: colors.background,
												}}
											>
												<Icons
													name='favorite-border'
													size={24}
													color={colors.text}
												/>
											</View>
										</View>
										<View style={{ flex: 1 }} />
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
						);
					}}
					onEndReachedThreshold={0.1}
				/>
			</SafeAreaView>

			<BottomSheetModal
				snapPoints={['75%']}
				index={0}
				animationConfigs={{ duration: 300 }}
				backdropComponent={(props) => <CustomBackdrop {...props} />}
				ref={bottomSheetModalRef}
			>
				<FilterView />
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

const Card =() => {
	return (
		<View
			style={{
				flex: 1,
				position: 'relative',
				overflow: 'hidden',
				borderRadius: 24,
			}}
		>
			<Image
				source={{
					uri: 'data:image/jpeg;base64,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',
				}}
				resizeMode='cover'
				style={{
					position: 'absolute',
					top: 0,
					bottom: 0,
					left: 0,
					right: 0,
				}}
			/>
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
				<Text style={{ fontSize: 14, fontWeight: '600', color: '#fff' }}>
					$130
				</Text>
			</View>
		</View>
	);
};

export default HomeScreen;
