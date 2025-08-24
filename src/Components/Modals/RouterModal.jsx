import { useSearchParams } from "react-router"
import PropTypes from 'prop-types';
import { useState } from "react";
import { CatModal } from "./CatModal";
import { BreedModal } from "./BreedModal";

/*
    RouterModal component manages the display of CatModal and BreedModal based on URL search parameters and state.
    It allows users to navigate between viewing cat details and breed information seamlessly.    
    Props:
    - initialCatData: Initial data for the cat to display in CatModal. Whem we have selected cat from landing page we pass that data to avoid extra api call   
    - breedModalOpen: Boolean state to control the visibility of BreedModal. Controlled from parent component because it can be opened from multiple places
    - setBreedModalOpen: Function to update the breedModalOpen state. 
    - initialBreedId: Initial breed ID to display in BreedModal. When we have selected cat we use this to show breed modal with breed of that cat
    - initialBreedName: Initial breed name to display in BreedModal. When we have selected cat we use this to show breed modal with breed of that cat
    Utilizes useSearchParams from react-router to read and manipulate URL search parameters for navigation.
    TO_DO: Test cases will be added
    TO_DO: useSearchParams set function callback version does not support the queueing logic that React's setState implements. 
    We may think to use location property to set search parameter and add state value to manage it for react for the future
 */

export const RouterModal = ({ initialCatData = {}, breedModalOpen, setBreedModalOpen, initialBreedId, initialBreedName }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [selectedBreed, setSelectedBreed] = useState([]);
    const [selectedCat, setSelectedCat] = useState({})

    const handleSelectBreed = (breed) => {
        setSelectedBreed(breed)
        setSearchParams({})
        setBreedModalOpen(true)
    }

    const handleSelectCat = (catImageDataFromBreed) => {
        /*  
            I have used setSearchParam hook by hoping it supports quening logic but I was wrong. Here is the note from setSearchParams documentation. 
            We may think to use location property to set search parameter and add state value to manage it for react for the future. 
            So unfortonetly there is one more extra render for this component when passing between the modals. We don't rerender image list inside breed modal so it won't create any performance issue for now
            `The function callback version of setSearchParams does not support the queueing logic that React's setState implements. 
            Multiple calls to setSearchParams in the same tick will not build on the prior value. If you need this behavior, you can use setState manually.`
        */
        setSearchParams({
            cat: catImageDataFromBreed.id
        })
        setSelectedCat(catImageDataFromBreed)
    }

    const closeBreedModal = () => {
        setSelectedBreed([])
        setBreedModalOpen(false)
    }

    const closeCatModal = () => {
        setSearchParams({})
        setSelectedCat([])
    }

    const { id: selectedBreedId = initialBreedId, name: selectedBreedName = initialBreedName } = selectedBreed.length ? selectedBreed[0] : {}

    const catInformation = Object.hasOwn(selectedCat, 'id') ? selectedCat : initialCatData

    return (<>
        {
            searchParams.get("cat") ?
                <CatModal
                    setSelectedBreed={handleSelectBreed}
                    onClose={() => closeCatModal()}
                    selectedCat={searchParams.get("cat")}
                    catData={catInformation}
                /> :
                ''
        }
        {
            breedModalOpen && <BreedModal
                setSelectedCat={handleSelectCat}
                onClose={() => closeBreedModal()}
                breedModalOpen={breedModalOpen}
                selectedBreedId={selectedBreedId}
                selectedBreedName={selectedBreedName}
            />
        }
    </>)
}

RouterModal.propTypes = {
    initialCatData: PropTypes.object,
    breedModalOpen: PropTypes.bool.isRequired,
    setBreedModalOpen: PropTypes.func.isRequired,
    initialBreedId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    initialBreedName: PropTypes.string,
};

export default RouterModal
