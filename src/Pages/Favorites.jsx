import { useContext, useEffect, useState } from "react"
import { FavoriteListContext } from "../Contexts/Contexts";
import { CatFavoriteListItem } from "../Components/Cat/CatFavoriteList";
import { FAVORITE_DELETE_ACTION } from "../Utils/Utils";
import { UpdateFavorite } from "../Contexts/Contexts";

/*
    Favorites Page Component
    It uses the FavoriteListContext to get the list of favorite cats.   
    It also uses the UpdateFavorite context to get the function to remove a cat from favorites.
    When the deleted state changes, it calls the removeFavorite function from context to remove the cat from favorites.
    So with this approach we don't need to pass the remove useContext function to each CatFavoriteListItem component.
    By making this change we can use memoization in CatFavoriteListItem component to prevent unnecessary re-renders when the faveorite list is updated.
    This improves performance and user experience.
    TO_DO: We can add pagination or infinite scroll if the favorite cats list becomes very large.
    TO_DO: We can add search functionality to filter favorite cats.
    TO_DO: We can add Modal to show cat details when a favorite cat is clicked.
    TO_DO: Consider adding confirmation dialog before removing a cat from favorites.
    TO_DO: Test cases will be added
*/
export const Favorites = () => {
    const favorites = useContext(FavoriteListContext)
    const removeFavorite = useContext(UpdateFavorite)
    const [deleted, setDeletedNumber] = useState('')

    useEffect(() => {
        if (deleted) {
            removeFavorite(deleted, '', FAVORITE_DELETE_ACTION)
        }
    }, [deleted])

    return (<div className="main-body-component">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            <CatFavoriteListItem favorites={favorites} removeFavoriteCat={setDeletedNumber} />
        </div>
    </div>)
}

export default Favorites