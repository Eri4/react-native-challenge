import React, {useEffect, useRef, useState} from 'react';
import {View, StyleSheet, Modal, TouchableOpacity, Animated, Dimensions} from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Category, SubCategoryScreenProps } from '../types';
import SubCategoryList from '../components/SubCategoryList';
import CuisinesHeader from "../components/CuisinesHeader";
import FilterButtonsContainer from "../components/FilterButtonsContainer";
import CollapseHandle from "../components/CollapseHandle";

const { height } = Dimensions.get('window');

const SubCategoryScreen: React.FC<SubCategoryScreenProps> = ({ route, navigation }) => {
    const { parentId, categoryName, imagePath } = route.params;
    const categories = useSelector((state: RootState) => state.categories.data);
    const [isContainerCollapsed, setIsContainerCollapsed] = useState(false);
    const [modalVisible, setModalVisible] = useState(true);
    const containerHeight = useRef(new Animated.Value(400)).current;

    const handleSubCategoryPress = (category: Category) => {
        if (category.parentId !== null) {
            navigation.navigate('SubCategory', { parentId: category.id, categoryName: category.name, imagePath: category.imagePath });
        }
    };

    const handleCollapse = () => {
        setIsContainerCollapsed(!isContainerCollapsed);
        Animated.timing(containerHeight, {
            toValue: isContainerCollapsed? 400 : 100,
            duration: 300,
            useNativeDriver: false,
        }).start();
    };

    const filteredCategories = categories.filter((category: Category) => category.parentId === parentId);

    const closeModal = () => {
        setModalVisible(false);
        navigation.popToTop()
    };

    const navigateToRootScreen = () => {
        setModalVisible(false);
        navigation.popToTop()
    };

    return (
        <Modal
            visible={modalVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={closeModal}
        >
            <TouchableOpacity style={styles.backdrop} onPress={closeModal} activeOpacity={1}>
                <Animated.View style={styles.container}>
                    <CuisinesHeader categoryName={categoryName} goBack={closeModal} navigateToRootScreen={navigateToRootScreen} imagePath={imagePath} />
                    <FilterButtonsContainer />
                    <SubCategoryList categories={filteredCategories} onSubCategoryPress={handleSubCategoryPress} />
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

export default SubCategoryScreen;