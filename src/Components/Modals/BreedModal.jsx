import { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogTitle, DialogContent, IconButton } from "@mui/material"
import { useGetBreedCats } from '../../Hooks/DataHooks';
import { PartialLoader } from '../PartialLoader';
import { CatList } from '../Cat/CatList';
import CloseIcon from '@mui/icons-material/Close';

/*
    BreedModal Component
    Description: Modal to display cats of a selected breed    
    Calling CatList component to show list of cats of the selected breed
    Uses useGetBreedCats hook to fetch cats by breed
    Utilizes PartialLoader for loading state
    Memoized setSelectedCat function to optimize performance using useCallback because it is passed to child component( using memo ) which prevents unnecessary re-renders
    PropTypes are defined for type checking and ensuring required props are passed
    TO_DO: Inline CSS will be removed by using theme configuration of Material UI and by using Tailwind Classes
    TO_DO: Error handling will be added
    TO_DO: Test cases will be added
*/

export const BreedModal = ({ onClose, setSelectedCat, breedModalOpen, selectedBreedId, selectedBreedName }) => {
    const { data: catImageList, isFetching } = useGetBreedCats({ breedId: selectedBreedId })

    const setSelectedCatModify = useCallback((catId) => {
        setSelectedCat(catImageList.find(breedImage => breedImage.id === catId))
    }, [catImageList])

    return (
        <Dialog
            maxWidth="xl"
            onClose={() => onClose()}
            open={breedModalOpen}
        >
            <DialogTitle sx={{ m: 0, p: 2 }}>
                {selectedBreedName}
            </DialogTitle>
            <IconButton
                sx={(theme) => ({ position: 'absolute', right: 8, top: 12, color: theme.palette.grey[500], })}>
                <CloseIcon onClick={() => onClose()} />
            </IconButton>
            <DialogContent
                className="min-width-modal" dividers>
                {
                    isFetching ?
                        <PartialLoader /> :
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6 mb-8">
                            <CatList cats={catImageList} updateSelectedCat={setSelectedCatModify} simpleView={true} />
                        </div>
                }
            </DialogContent>
        </Dialog>
    );
}

BreedModal.propTypes = {
    setSelectedCat: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    breedModalOpen: PropTypes.bool.isRequired,
    selectedBreedId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    selectedBreedName: PropTypes.string,
};
