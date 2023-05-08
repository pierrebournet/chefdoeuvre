import { Category } from "src/category/entities/category.entity";

const categoriesData = [
    {
        id: 1,
        name: 'Café'
    },
    {
        id: 2,
        name: 'Thé'
    },
    {
        id: 3,
        name: 'BubbleTea'
    },
    {
        id: 4,
        name: 'Shaker'
    },
]
export async function createCategorie() {
    console.log('create categories first time')
    const categories = []
    for (const cat of categoriesData) {
        const category = await Category.create(cat as Category);
        categories.push(category.save());
    }
    return categories;
}