import type { Recipe } from "../types/recipe"


type CardInfoProps = {
    recipes: Recipe
}


function CardInfo({ recipes }: CardInfoProps) {
    const { name, category, instructions, image, ingredients, measures } = recipes

    return (
        <div className="bg-white max-w-xl w-full rounded-2xl shadow-lg p-6">
            <div className="bg-white max-w-xl w-full rounded-2xl shadow-lg p-6">

                <div className="">
                    <h1 className="">{name}</h1>
                </div>

                <div className="">

                    <img className="w-50 rounded-xl" src={image} alt={name} />

                </div>

                <div className="">
                    <p>{category}</p>
                </div>

                <div className="flex justify-start">
                    <p className="">{instructions}</p>
                </div>

                <div className="flex: col-end-1">
                    <ul>
                        {ingredients.map((ingredient, i) => (
                            <li key={`${i}-${ingredient}`}
                            >{ingredient}</li>
                        ))}
                    </ul>
                </div>

                <div className="">
                    <ul>
                        {measures.map((measure, i) => (
                            <li key={`${i}-${measure}`}>{measure}</li>
                        ))}
                    </ul>
                </div>
            </div>

            </div>
    )
}

export default CardInfo