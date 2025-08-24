import { useCallback, useEffect, useState } from "react";
import { Backdrop, CircularProgress } from "@mui/material";
import { useGetFavoriteCats, useAddFavoriteCat, useRemoveFavoriteCat } from "../Hooks/DataHooks";
import { UpdateFavorite, FavoriteListContext } from "./Contexts";
import { FAVORITE_DELETE_ACTION, FAVORITE_ADD_ACTION } from '../Utils/Utils';

/*
    FavoriteContext Component
    We get the favorite cats when we load the application. So we don't need to fetch favorite cats again and again for eact cat image.
    It gives better performance and better user experience for now. Also with this approach, we can use favorite cats feature from context in any component. Such as landing page, breed modal etc.
    But we can reconsider this approach if the favorite cats list becomes very large.
    Description: Provides context for managing favorite cats in the application.    
    It uses custom hooks to fetch, add, and remove favorite cats.
    It maintains the state of the favorite cats list and provides a function to update this list.   
    It also displays a loading backdrop when add or remove operations are pending.
    UpdateFavorite function is memoized using useCallback to prevent unnecessary re-renders of context consumers.
    Using favoriteListState to manage the list of favorite cats locally to avoid refetching from API after each add/remove operation.
    This approach improves performance and user experience.
    TO_DO: Test cases will be added
    TO_DO: Reconsider the approach of fetching favorite cats again if the list becomes very large   
*/

export const FavoriteContext = ({ children }) => {
    const [favoriteListState, setFavoriteListState] = useState([])
    const { favorites } = useGetFavoriteCats()
    const { addFavoriteMutate, isPendingAddFavorite } = useAddFavoriteCat()
    const { deleteFavoriteMutate, isPendingRemoveFavorite } = useRemoveFavoriteCat()

    useEffect(() => {
        if (favorites) {
            setFavoriteListState(favorites)
        }
    }, [favorites])

    const updateFavoriteCats = useCallback((catId, catImage, type) => {
        if (type === FAVORITE_DELETE_ACTION) {
            const favoriteId = favoriteListState.find(favorite => favorite.image_id === catId).id
            deleteFavoriteMutate({ favoriteId: favoriteListState.find(favorite => favorite.image_id === catId).id }, {
                onSuccess: () => {
                    setFavoriteListState((existingFavorites) => existingFavorites.filter(favorite => favorite.id !== favoriteId))
                }
            })
        }
        else if (type === FAVORITE_ADD_ACTION) {
            addFavoriteMutate({ catImageId: catId, catImage: catImage }, {
                onSuccess: (data) => {
                    setFavoriteListState((existingFavorites) => [...existingFavorites, { id: data.id, image_id: catId, image: { url: catImage, id: catId } }])
                }
            })
        }
    }, [favoriteListState])

    return (<FavoriteListContext value={favoriteListState}>
        <UpdateFavorite value={updateFavoriteCats}>
            {children}
            <Backdrop sx={(theme) => ({ color: '#fff', zIndex: 10000 })} open={isPendingRemoveFavorite || isPendingAddFavorite}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </UpdateFavorite>
    </FavoriteListContext>)
}