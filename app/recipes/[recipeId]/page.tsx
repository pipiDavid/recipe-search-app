'use client'
import { useRouter } from "next/navigation"
import { useRecipeContext } from "../../context/RecipeContext"
import CardInfo from "../../components/cardInfo"

function RecipeId() {
    const router = useRouter()
    const pageContext = useRecipeContext()
    console.log('pageContext:' + pageContext) // 
    return (<></>)
 
    if(!selectedRecipe) {
        return <p>Error</p>
    }
    return (
        <div>
            <CardInfo
            recipes={selectedRecipe}/>
        </div>
        
    )
    
}

export default RecipeId