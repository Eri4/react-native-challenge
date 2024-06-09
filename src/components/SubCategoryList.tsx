import React from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Category } from '../types';
import CategoryItem from "./CategoryItem";

interface SubCategoryListProps {
    categories: Category[];
    onSubCategoryPress: (category: Category) => void;
}

const SubCategoryList: React.FC<SubCategoryListProps> = ({ categories, onSubCategoryPress }) => {
    const renderSubCategory = ({ item }: { item: Category }) => (
        <TouchableOpacity style={styles.subCategoryItem} onPress={() => onSubCategoryPress(item)}>
            <CategoryItem category={item} />
        </TouchableOpacity>
    );

    const getNumColumns = () => {
        if (categories.length > 3) {
            return Math.floor((categories.length - 1) / 2) + 1;
        } else {
            return 3;
        }
    };

    return (
        <View style={styles.subCategoriesContainer}>
            {categories.length > 0 && (
                <ScrollView
                    horizontal
                    showsVerticalScrollIndicator={false}
                >
                    <FlatList
                        data={categories}
                        renderItem={renderSubCategory}
                        keyExtractor={(item: Category) => item.id.toString()}
                        numColumns={getNumColumns()}
                        columnWrapperStyle={styles.columnWrapper}
                        contentContainerStyle={styles.subCategoriesList}
                        scrollEnabled={false}
                        contentInset={{ bottom: 60 }}
                    />
                </ScrollView>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    subCategoriesContainer: {
        flex: 1,
    },
    subCategoriesList: {
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingBottom: 20,
    },
    subCategoryItem: {
        marginHorizontal: 30,
        marginVertical: 18,
    },
    columnWrapper: {
        justifyContent: 'flex-start',
        flexDirection: 'row',
    },
});

export default SubCategoryList;