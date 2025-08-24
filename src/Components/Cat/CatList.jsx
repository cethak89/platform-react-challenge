import { memo } from "react";
import { CatListItem } from "./CatListItem"
import PropTypes from 'prop-types';

/*
    Renders a list of cats.
    Props:      
    - `cats` (array): An array of cat objects to display. Each object should contain `id`, `url`, and optionally `breeds`.
     - `updateSelectedCat` (function): A function to set the selected cat when a cat item is clicked.
     - `simpleView` (boolean): If true, breed names will not be displayed. Breed modal use this prop as it already shows breed name in modal header. So to avoid redundancy we don't show breed name in simpleView.
    Memoized to avoid unnecessary re-renders when the users discover cats by using RouterModal. 
    We already prevent unnecessary re-renders of CatListItem component by memoizing it. We add memo here for the future scalability mostly.
    It may look like a simple component but for the future scalability and to keep consistency I have created this component.
    Such as if we want to add pagination, search or infinite scroll in future we can easily do that using this component.
    TO_DO: Test cases will be added
*/

export const CatList = memo(({ cats, updateSelectedCat, simpleView = false }) => {
    return (<>
        {
            cats.map((cat) => {
                return cat ? <CatListItem key={cat.id} catUrl={cat?.url} catId={cat.id} setSelected={updateSelectedCat} breedName={simpleView ? '' : cat.breeds.length ? cat.breeds[0].name : ''} /> : ''
            })
        }
    </>
    )
})

CatList.propTypes = {
    cats: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            url: PropTypes.string.isRequired,
            breeds: PropTypes.array,
        })
    ).isRequired,
    updateSelectedCat: PropTypes.func.isRequired,
    simpleView: PropTypes.bool,
};