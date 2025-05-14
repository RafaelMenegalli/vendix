import { CategoriesType } from "./CategoriesType";

export type ProductType = {
    id: number;
    name: string;
    price: number;
    description: string;
    image: string;
    active: boolean;
    createdAt: string;
    categoryId: string;
    category: CategoriesType
}