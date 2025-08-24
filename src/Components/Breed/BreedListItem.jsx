import { CardContent, Typography, Card } from "@mui/material"
import PropTypes from 'prop-types';

/*
    Renders a breed list item with its details.  
    Props:   
    - `breedId` (string|number): The unique identifier for the breed.                    
    - `name` (string): The name of the breed.                    
    - `description` (string): A brief description of the breed.  
    - `setSelectedBreed` (function): A function to set the selected breed when the item is clicked.
    TO_DO: Test cases will be added
    TO_DO: Inline CSS will be removed by using theme configuration of Material UI and by using Tailwind Classes
 */
export const BreedListItem = function BreedListItem({ breedId, name, description, setSelectedBreed }) {
    return <Card className="cursor-pointer" onClick={() => setSelectedBreed(breedId)} sx={{ minWidth: 275, maxHeight: 205 }}>
        <CardContent>
            <Typography gutterBottom sx={{ color: 'black', fontSize: 18, fontWeight: 700, textAlign: 'left', borderBottom: '1px solid #bbbbbb5e', marginBottom: '15px', paddingBottom: '13px' }} component="div">
                {name} - {breedId}
            </Typography>
            <Typography className="breed-list-item-description" variant="body2">
                {description}
            </Typography>
            <Typography sx={{ textAlign: 'left', marginTop: '20px', fontSize: "14px", fontWeight: 600 }} className="breed-list-item-action-text" variant="body1">
                Discover the images {'>>'}
            </Typography>
        </CardContent>
    </Card >
}

BreedListItem.propTypes = {
    breedId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    setSelectedBreed: PropTypes.func.isRequired,
};  