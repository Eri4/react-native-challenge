import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Animated, Modal, TouchableOpacity, View, Dimensions } from 'react-native';
import { useDispatch } from 'react-redux';
import { fetchCategories } from '../redux/actions/categoriesActions';
import { AppDispatch } from '../redux/store';
import CategoryList from '../components/CategoryList';
import FilterButtonsContainer from '../components/FilterButtonsContainer';
import CollapseHandle from '../components/CollapseHandle';
import { Category, CategoryScreenProps } from "../types";
import CuisinesHeader from "../components/CuisinesHeader";

const { height } = Dimensions.get('window');

const CategoryScreen: React.FC<CategoryScreenProps> = ({ navigation }) => {
    const dispatch: AppDispatch = useDispatch();
    const [isContainerCollapsed, setIsContainerCollapsed] = useState(false);
    const [modalVisible, setModalVisible] = useState(true);
    const containerHeight = useRef(new Animated.Value(400)).current;

    useEffect(() => {
        dispatch(fetchCategories());
        setModalVisible(true);
    }, [dispatch]);

    const handleCategoryPress = (category: Category) => {
        navigation.navigate('SubCategory', { parentId: category.id, categoryName: category.name, imagePath: category.imagePath });
    };

    const handleCollapse = () => {
        setIsContainerCollapsed(!isContainerCollapsed);
        Animated.timing(containerHeight, {
            toValue: isContainerCollapsed? 400 : 100,
            duration: 300,
            useNativeDriver: false,
        }).start();
    };

    const closeModal = () => {
        setModalVisible(false);
        navigation.goBack();
    };

    return (
        <Modal
            visible={modalVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={closeModal}
        >
            <TouchableOpacity style={styles.backdrop} onPress={closeModal} activeOpacity={1}>
                <Animated.View style={[styles.container, { height: containerHeight }]}>
                    <CuisinesHeader />
                    <FilterButtonsContainer />
                    {!isContainerCollapsed && (
                        <CategoryList onCategoryPress={handleCategoryPress} />
                    )}
                    <View style={styles.centeredCollapseHandle}>
                        <CollapseHandle onCollapse={handleCollapse} />
                    </View>
                </Animated.View>
            </TouchableOpacity>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        shadowColor: 'rgba(176, 176, 176, 0.4)',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 1,
        shadowRadius: 9,
        elevation: 5,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        maxHeight: height * 0.5,
    },
    centeredCollapseHandle: {
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    backdrop: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-start',
    },
});

export default CategoryScreen;