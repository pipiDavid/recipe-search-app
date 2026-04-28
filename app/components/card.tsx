import type { Recipe } from "../types/recipe"

type CardProps = {
    recipe: Recipe
    clickRecipe: (id: string) => void
    addToFavorites: (id: string) => void
    isFavorite: boolean
}

function Card({ recipe, clickRecipe, addToFavorites, isFavorite }: CardProps) {
    return (
        <div className="shadow-xl rounded-xl content-between transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-105 "
        key={recipe.id}>
        <p className="text-center ">{recipe.name}</p>
        <div className="p-5">
            <img onClick={() => clickRecipe(recipe.id)} className='rounded-xl ' src={recipe.image} alt={recipe.name} />
        </div>
        <button className='text-center'onClick={() => addToFavorites(recipe.id)}>{isFavorite ? '🤎' : '🤍'}</button> 
        </div>
    )
}

export default Card