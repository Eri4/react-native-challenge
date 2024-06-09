import React from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Category } from '../types';
import CategoryItem from "./CategoryItem";
import ScrollView = Animated.ScrollView;

interface CategoryListProps {
    onCategoryPress: (category: Category) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({ onCategoryPress }) => {
    const categories = useSelector((state: RootState) => state.categories.data);

    const renderCategory = ({ item }: { item: Category }) => (
        <TouchableOpacity onPress={() => onCategoryPress(item)} style={styles.categoryItemContainer}>
            <CategoryItem category={item} />
        </TouchableOpacity>
    );

    return (
        <View style={styles.categoriesContainer}>
            <ScrollView
                horizontal
                showsVerticalScrollIndicator={false}
            >
                <FlatList
                    data={categories.filter((category: Category) => category.parentId === null)}
                    renderItem={renderCategory}
                    keyExtractor={(item: Category) => item.id.toString()}
                    numColumns={3}
                    columnWrapperStyle={styles.columnWrapper}
                    contentContainerStyle={styles.contentContainer}
                    contentInset={{ bottom: 60 }}
                    scrollEnabled={false}
                />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    categoriesContainer: {
        flex: 1,
    },
    contentContainer: {
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 20,
    },
    categoryItemContainer: {
        marginHorizontal: 30,
        marginVertical: 18,
    },
    columnWrapper: {
        justifyContent: 'space-around',
        flexDirection: 'row',
    },
});

export default CategoryList;