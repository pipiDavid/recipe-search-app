import type { Recipe } from "../types/recipe"

type CardInfoProps = {
  recipes: Recipe
}

function CardInfo({ recipes }: CardInfoProps) {
  const { name, category, instructions, image, ingredients, measures, video } = recipes

  return (
    <div className="min-h-screen bg-[#faf8f4] px-6 py-10 md:px-12">
      <div className="max-w-4xl mx-auto">

        <div className="flex flex-col md:flex-row gap-8 mb-10">
          <div className="md:w-72 shrink-0 animate-slide-right" style={{ animationDelay: "0.05s" }}>
            <img
              className="w-full rounded-2xl object-cover aspect-square shadow-xl shadow-black/10"
              src={image}
              alt={name}
            />
          </div>

          <div className="flex-1 min-w-0 animate-slide-left" style={{ animationDelay: "0.12s" }}>
            <span
              className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-[#d97706] mb-3 animate-slide-up"
              style={{ animationDelay: "0.28s" }}
            >
              {category}
            </span>
            <h1
              className="text-3xl md:text-4xl font-bold text-[#1a1208] mb-6 leading-tight animate-slide-up"
              style={{ animationDelay: "0.36s" }}
            >
              {name}
            </h1>

            <div className="border-t border-[#e8e0d4] pt-6">
              <h2
                className="text-xs font-semibold tracking-[0.2em] uppercase text-[#b5a898] mb-4 animate-slide-up"
                style={{ animationDelay: "0.44s" }}
              >
                Ingredients
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {ingredients.map((ingredient, i) => (
                  <li
                    key={`${i}-${ingredient}`}
                    className="flex items-center gap-2 text-sm text-[#1a1208]"
                    style={{
                      opacity: 0,
                      animation: "ingredient-in 0.45s cubic-bezier(0.16,1,0.3,1) forwards",
                      animationDelay: `${0.5 + i * 0.045}s`,
                    }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#f97316] shrink-0" />
                    <span className="flex-1 truncate">{ingredient}</span>
                    <span className="text-[#b5a898] text-xs">{measures[i]}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div
          className="bg-white rounded-2xl p-6 border border-[#e8e0d4] shadow-sm mb-6 animate-slide-up"
          style={{ animationDelay: `${0.5 + ingredients.length * 0.045}s` }}
        >
          <h2 className="text-xs font-semibold tracking-[0.2em] uppercase text-[#b5a898] mb-4">
            Instructions
          </h2>
          <p className="text-[#1a1208]/70 leading-relaxed text-sm whitespace-pre-line">
            {instructions}
          </p>
        </div>

        {video && (
          <a
            href={video}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-[#d97706] hover:text-[#f97316] border border-[#e8e0d4] hover:border-[#f97316] bg-white px-5 py-2.5 rounded-full transition-all duration-200 shadow-sm hover:shadow-md hover:shadow-[#f97316]/10 animate-slide-up"
            style={{ animationDelay: `${0.56 + ingredients.length * 0.045}s` }}
          >
            ▶ Watch Video
          </a>
        )}

      </div>
    </div>
  )
}

export default CardInfo
