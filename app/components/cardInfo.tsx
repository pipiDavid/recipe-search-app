import type { Recipe } from "../types/recipe"


type CardInfoProps = {
  recipes: Recipe
}


function CardInfo({ recipes }: CardInfoProps) {
  const { name, category, instructions, image, ingredients, measures } = recipes

  return (
    <div className="box-shadow p-50 bg-yellow-200">
      <div className="bg-black p-10 rounded-xl">

        <div className="flex justify-center">
          <h1 className="font-bold pb-10 text-blue-50">{name}</h1>
        </div>

        <div className="flex justify-center pb-10">

          <img className="w-50 rounded-xl text-blue-50" src={image} alt={name} />

        </div>

        <div className="flex justify-center pb-10">
          <p className="font-bold text-blue-50">{category}</p>
        </div>

        <div className="flex-col 1 pb-5">
          <p className="font-bold text-blue-50">Instructions: </p>
          <p className="text-blue-50">{instructions}</p>
        </div>

        <div className="flex-col 1 pb-5">
          <p className="font-bold text-blue-50">Ingredients:</p>
          <ul>
            {ingredients.map((ingredient, i) => (
              <li key={`${i}-${ingredient}`} className="text-blue-50"
              >{ingredient}</li>
            ))}
          </ul>
        </div>

        <div className="flex-col 1 ">
          <p className="font-bold text-blue-50">Measures:</p>
          <ul>
            {measures.map((measure, i) => (
              <li key={`${i}-${measure}`} className="text-blue-50">{measure}</li>
            ))}
          </ul>
        </div>
      </div>

    </div>
  )
}

export default CardInfo