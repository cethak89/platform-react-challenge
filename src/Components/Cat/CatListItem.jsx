import { memo } from "react"
import { CardMedia, Card } from "@mui/material"
import PropTypes from 'prop-types';

/*
    This component is memoized to avoid unnecessary re-renders.
    By this optimization, the already rendered cat items won't be re-rendered when Load More button is clicked in Landing Page.
    It represents a single cat item in a list, displaying the cat's image and optionally its breed name.    
    It accepts a function to set the selected cat when clicked.
    TO_DO: Test cases will be added
    TO_DO: Inline CSS will be removed by using theme configuration of Material UI and by using Tailwind Classes
*/

export const CatListItem = memo(function CatListItem({ catId, catUrl, setSelected, breedName }) {
    return <Card className="cat-list-item-container mobile-full-width cursor-pointer" onClick={() => setSelected(catId)} sx={{ maxWidth: 345 }}>
        <CardMedia
            className="cat-list-item-landing-view"
            component="img"
            alt={catId}
            height="60"
            image={catUrl}
        />
        {
            breedName ?
                <p className="breed-name-cat-list-item">
                    {breedName}
                </p> :
                ''
        }
    </Card>
})

CatListItem.propTypes = {
    catId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    catUrl: PropTypes.string.isRequired,
    setSelected: PropTypes.func.isRequired,
    breedName: PropTypes.string,
};