import { useEffect } from 'react';
import { Chip, Stack, Grid, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Typography, Button, Alert } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useGetSelectedCat } from '../../Hooks/DataHooks';
import { PartialLoader } from '../PartialLoader';
import { FavoriteCat } from '../Cat/FavoriteCat';
import PropTypes from 'prop-types';

/*
    CatModal Component
    Description: Modal to display detailed information about a selected cat       
    Utilizes useGetSelectedCat hook to fetch detailed cat data
    Utilizes PartialLoader for loading state      
    Contains BreedSectionUI and SeeMoreFromBreedUI sub-components for modular UI sections
    PropTypes are defined for type checking and ensuring required props are passed    
    TO_DO: Inline CSS will be removed by using theme configuration of Material UI and by using Tailwind Classes
    TO_DO: Error handling will be added
    TO_DO: Test cases will be added
*/

export const CatModal = ({ selectedCat, onClose, catData = {}, setSelectedBreed }) => {
    const { data: fetchedCatData, refetch, isFetching } = useGetSelectedCat({ selectedCat: selectedCat })

    useEffect(() => {
        if (catData.id === undefined) {
            refetch();
        }
    }, [])

    const displayableCatData = catData.id !== undefined ? catData : fetchedCatData
    const breedInfo = (displayableCatData && displayableCatData.breeds && displayableCatData.breeds.length) ? displayableCatData.breeds[0] : null

    const BreedSectionUI = () => {
        return breedInfo ?
            <>
                <Typography gutterBottom variant="h5">
                    <br />
                    {breedInfo.name} - {breedInfo.origin}
                </Typography>
                <Typography gutterBottom>
                    {breedInfo.description}
                </Typography>
                <br />
                <Stack direction="row" spacing={1}>
                    {(breedInfo.temperament) ? breedInfo.temperament.split(',').slice(0, 6).map((tempter, index) =>
                        <Chip key={index} label={tempter} variant="outlined" />) : ''}
                </Stack>
                <Typography className='breed-information-typo' gutterBottom>
                    <br />
                    <span>Lifespan: </span> {breedInfo.life_span}
                </Typography>
            </> :
            <Alert className="mt-7" severity="info">No breed avaliable</Alert>
    }

    const SeeMoreFromBreedUI = () => {
        if (breedInfo)
            return <Grid>
                <Button className="modal-more-breed-button" variant="contained" onClick={() => setSelectedBreed(displayableCatData.breeds)}>
                    See more from this Breed
                </Button>
            </Grid>
        else
            return <></>
    }

    return (
        <Dialog
            onClose={onClose}
            open={true}
        >
            {
                (isFetching || displayableCatData === undefined) ?
                    <DialogContent className="min-width-modal" dividers>
                        <PartialLoader />
                    </DialogContent> :
                    <>
                        <DialogTitle sx={{ m: 0, p: 2 }}>
                            {displayableCatData.id}
                        </DialogTitle>
                        <IconButton sx={(theme) => ({ position: 'absolute', right: 8, top: 12, color: theme.palette.grey[500], })}>
                            <CloseIcon onClick={onClose} />
                        </IconButton>
                        <DialogContent dividers>
                            <img className="cat-image-shadow" src={displayableCatData.url} />
                            <BreedSectionUI />
                        </DialogContent>
                        <DialogActions>
                            <Grid container direction="row" className="w-full" sx={{ justifyContent: "space-between", alignItems: "flex-start" }}>
                                <Grid>
                                    <FavoriteCat catImageId={selectedCat} imageUrl={displayableCatData.url} />
                                </Grid>
                                <SeeMoreFromBreedUI />
                            </Grid>
                        </DialogActions>
                    </>
            }
        </Dialog>
    );
}

CatModal.propTypes = {
    setSelectedBreed: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    selectedCat: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    catData: PropTypes.object.isRequired,
};

