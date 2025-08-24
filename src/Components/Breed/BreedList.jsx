import { memo } from "react"
import PropTypes from 'prop-types';
import { BreedListItem } from "./BreedListItem"

/**
    Renders a list of breeds.    
    Props:   
    - `breeds` (array): An array of breed objects to display. Each object should contain `id`, `name`, and `description`.
    - `setSelectedBreed` (function): A function to set the selected breed when a breed item is clicked.
    we get setSelectedBreed function with useCallback from parent component, so that it will not re-render unnecessarily
    It may look like a simple component but for the future scalability and to keep consistency I have created this component. 
    Such as if we want to add pagination or infinite scroll in future we can easily do that using this component.
    TO_DO: Test cases will be added
 */
export const BreedList = memo(function ({ breeds, setSelectedBreed }) {
    return (<>
        {
            breeds.map((breed) => {
                return breed ? <BreedListItem key={breed.id} breedId={breed.id} name={breed.name} description={breed.description} setSelectedBreed={setSelectedBreed} /> : ''
            })
        }
    </>
    )
})

BreedList.propTypes = {
    breeds: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            name: PropTypes.string.isRequired,
            description: PropTypes.string,
        })
    ).isRequired,
    setSelectedBreed: PropTypes.func.isRequired,
};