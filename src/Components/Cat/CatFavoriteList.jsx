import { CatFavoriteItem } from "./CatFavoriteItem"
import PropTypes from 'prop-types';

/*
    Renders a list of favorite cats. 
    Props:   
    - `favorites` (array): An array of favorite cat objects to display. Each object should contain `id`, `image` (with `url`), and `image_id`.
    - `removeFavoriteCat` (function): A function to remove a cat from favorites when the delete icon is clicked.
    It may look like a simple component but for the future scalability and to keep consistency I have created this component. 
    Such as if we want to add pagination, search or infinite scroll in future we can easily do that using this component.
    using favoriteId as key because it is unique and stable to help memoized CatFavoriteItem component to avoid unnecessary re-renders
    TO_DO: Test cases will be added  
 */

export const CatFavoriteListItem = ({ favorites, removeFavoriteCat }) => {
    return (<>
        {
            favorites.map((favorite) => {
                return favorite ? <CatFavoriteItem key={favorite.id} favoriteId={favorite.id} favoriteImageUrl={favorite.image.url} favoriteImageId={favorite.image_id} removeFavoriteCat={removeFavoriteCat} /> : ''
            })
        }
    </>
    )
}

CatFavoriteListItem.propTypes = {
    favorites: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            image: PropTypes.shape({
                url: PropTypes.string.isRequired,
            }).isRequired,
            image_id: PropTypes.string.isRequired,
        })
    ).isRequired,
    removeFavoriteCat: PropTypes.func.isRequired,
};