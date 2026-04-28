export type Recipe = {
    id: string,
    name: string,
    category: string
    instructions: string,
    image: string,
    video?: string,
    ingredients: string[],
    measures: string[]
}

type Meal = {

    idMeal: string,
    strMeal: string,
    strCategory: string,
    strInstructions: string
    strMealThumb: string,
    strYoutube: string,
    strIngredient1: string,
    strIngredient2: string,
    strIngredient3: string,
    strIngredient4: string,
    strIngredient5: string,
    strIngredient6: string,
    strIngredient7: string,
    strIngredient8: string,
    strMeasure1: string,
    strMeasure2: string,
    strMeasure3: string,
    strMeasure4: string
    strMeasure5: string,
    strMeasure6: string
    strMeasure7: string
    strMeasure8: string

}

export type ApiResponse = {
    meals: Meal[]
}