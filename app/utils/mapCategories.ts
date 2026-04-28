import type { ApiResCategory, Category } from "../types/categories" 

function mapCategories(data: ApiResCategory): Category[] {
    return data.meals.map((c) => ({
        name: c.strCategory
    }))
}
export default mapCategories