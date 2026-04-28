export type Category = {
    name: string
}

type MealCategory = {
    strCategory: string
} 

export type ApiResCategory = {
    meals: MealCategory[]
}