import type { Recipe } from "../types/recipe"

type CardProps = {
    recipes: Recipe
    clickRecipe: (id: string) => void
    addToFavorites: (id: string) => void
    isFavorite: boolean
}

function Card({ recipes, clickRecipe, addToFavorites, isFavorite }: CardProps) {
    return (
        <div className="shadow-xl rounded-xl content-between transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-105 "
        key={recipes.id}>
        <p className="text-center ">{recipes.name}</p>
        <div className="p-5">
            <img onClick={() => clickRecipe(recipes.id)} className='rounded-xl ' src={recipes.image} alt={recipes.name} />
        </div>
        <button className='text-center'onClick={() => addToFavorites(recipes.id)}>{isFavorite ? '🤎' : '🤍'}</button> 
        </div>
    )
}

export default Card