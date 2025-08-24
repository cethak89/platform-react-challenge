import { useContext, memo } from 'react';
import { FavoriteListContext, UpdateFavorite } from '../../Contexts/Contexts';
import { IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { FAVORITE_DELETE_ACTION, FAVORITE_ADD_ACTION } from '../../Utils/Utils';
import PropTypes from 'prop-types';

/*
    This component represents a favorite/unfavorite button for a cat image.
    It checks if the cat image is already in the favorite list using context.
    Memoized to prevent unnecessary re-renders when parent components update. 
    For now parent components don't update frequently but in future if they do this optimization will help.
    Depending on whether the cat is a favorite, it displays either a filled heart icon (indicating it's a favorite) or an outlined heart icon (indicating it's not a favorite).
    Clicking the icon will add or remove the cat from the favorites list by calling the appropriate function from context.  
    TO_DO: Test cases will be added
*/

export const FavoriteCat = memo(({ catImageId, imageUrl }) => {
    const updateFavoriteFunction = useContext(UpdateFavorite)
    const favoriteCatList = useContext(FavoriteListContext)

    return (<>
        {favoriteCatList && favoriteCatList.filter(favorite => favorite.image_id === catImageId).length ?
            <IconButton onClick={() => updateFavoriteFunction(catImageId, imageUrl, FAVORITE_DELETE_ACTION)} aria-label="Remove from favorites">
                <FavoriteIcon />
            </IconButton>
            :
            <IconButton onClick={() => updateFavoriteFunction(catImageId, imageUrl, FAVORITE_ADD_ACTION)} aria-label="add to favorites">
                <FavoriteBorderOutlinedIcon />
            </IconButton>
        }
    </>)
})

FavoriteCat.propTypes = {
    catImageId: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
};