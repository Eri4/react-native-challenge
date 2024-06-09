export interface Category {
    id: number;
    name: string;
    parentId: number | null;
    imagePath: string;
}

export interface CategoriesState {
    data: Category[];
    error: string | null;
}

export interface SubCategoryScreenProps {
    route: {
        params: {
            parentId: number;
            categoryName: string;
            imagePath: string;
        };
    };
    navigation: any;
}

export interface CategoryScreenProps {
    navigation: any;
}