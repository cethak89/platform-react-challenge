import { memo } from "react"
import { CardMedia, Card } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import PropTypes from 'prop-types';

/* 
    This component is memoized to avoid unnecessary re-renders. 
    By this optimization, the existing CatFavoriteItem won't be re-rendered when another favorite is removed.
    It represents a single favorite cat item with an option to remove it from favorites.
    TO_DO: Test cases will be added
    TO_DO: Inline CSS will be removed by using theme configuration of Material UI and by using Tailwind Classes
*/

export const CatFavoriteItem = memo(function CatFavoriteItem({ favoriteId, favoriteImageUrl, favoriteImageId, removeFavoriteCat }) {
    return <Card className="mobile-full-width" style={{ position: 'relative' }} sx={{ maxWidth: 345 }}>
        {<div onClick={() => removeFavoriteCat(favoriteImageId)} className="removeIconContainer">
            <DeleteIcon />
        </div>}
        <CardMedia
            className="cat-list-item-landing-view"
            component="img"
            alt={favoriteId}
            height="60"
            image={favoriteImageUrl}
        />
    </Card>
})

CatFavoriteItem.propTypes = {
    favoriteId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    favoriteImageUrl: PropTypes.string.isRequired,
    favoriteImageId: PropTypes.string.isRequired,
    removeFavoriteCat: PropTypes.func.isRequired,
};