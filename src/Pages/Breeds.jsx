import { useCallback, useState, lazy } from "react"
import { BreedList } from "../Components/Breed/BreedList"
import { useGetBreeds } from "../Hooks/DataHooks"
import { PartialLoader } from "../Components/PartialLoader"
import { useSearchParams } from "react-router"
import { CAT_QUERY } from "../Utils/Utils"

const RouterModal = lazy(() => import('../Components/Modals/RouterModal'));

/*
    Breeds Page Component   
    Description: This component fetches and displays a list of cat breeds.
    It allows users to select a breed, which opens a modal with more details about the breed.
    It also integrates with the RouterModal component to handle displaying cat details based on URL search parameters.
    Uses useGetBreeds custom hook to fetch breed data.
    We use useCallback to memoize the selectBreed function to prevent unnecessary re-renders.
    Used lazy loading for RouterModal to optimize performance by loading it only when needed.
    TO_DO: Error handling will be added with a corresponding UI element
    TO_DO: We will be adding pagination or infinite scroll for performance improvement
    TO_DO: We may add search functionality to filter breeds
    TO_DO: Test cases will be added
*/
export const Breeds = () => {
    const [selectedBreed, setSelectedBreed] = useState('');
    const [breedModalOpen, setBreedModalOpen] = useState(false);
    const [searchParams, _setSearchParams] = useSearchParams();

    const { isPending, data: breeds = [] } = useGetBreeds()

    const selectBreed = useCallback((breedId) => {
        setSelectedBreed(breedId)
        setBreedModalOpen(true)
    }, [])

    const initiBreedData = selectedBreed ? breeds.find(breed => breed.id === selectedBreed) : {}

    return (
        <div className="main-body-component">
            {
                isPending ?
                    <PartialLoader /> :
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                        <BreedList breeds={breeds} setSelectedBreed={selectBreed} />
                    </div>
            }
            {
                (searchParams.get(CAT_QUERY) || breedModalOpen) ?
                    <RouterModal
                        initialBreedId={initiBreedData.id}
                        initialBreedName={initiBreedData.name}
                        breedModalOpen={breedModalOpen}
                        setBreedModalOpen={setBreedModalOpen}
                    /> :
                    ""
            }
        </div>
    )
}

export default Breeds