import type { ApiResponse, Recipe } from "../types/recipe";

export function mapMeals(data: ApiResponse): Recipe[] {
   const result: Recipe[] = []
   data.meals.map((r) => {
      const x = {
         id: r.idMeal,
         name: r.strMeal,
         category: r.strCategory,
         instructions: r.strInstructions,
         image: r.strMealThumb,
         video: r.strYoutube,
         ingredients: [
            r.strIngredient1,
            r.strIngredient2,
            r.strIngredient3,
            r.strIngredient4,
            r.strIngredient5,
            r.strIngredient5,
            r.strIngredient6,
            r.strIngredient7,
            r.strIngredient8
         ],
         measures: [
            r.strMeasure1,
            r.strMeasure2,
            r.strMeasure3,
            r.strMeasure4,
            r.strMeasure5,
            r.strMeasure6,
            r.strMeasure7,
            r.strMeasure8,
         ]
      }
      result.push(x)
   })
   return result
}