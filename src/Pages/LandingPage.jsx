import { useCallback, useEffect, useState, lazy } from "react"
import { CatList } from "../Components/Cat/CatList"
import { useSearchParams } from "react-router"
import { Button } from "@mui/material"
import { useGetCats } from "../Hooks/DataHooks"
import { PartialLoader } from '../Components/PartialLoader'
import { CAT_QUERY } from "../Utils/Utils"

const RouterModal = lazy(() => import('../Components/Modals/RouterModal'));

/*
    LandingPage Component
    Description: This component fetches and displays a list of cat images.      
    It allows users to select a cat image, which opens a modal with more details about the cat.
    It uses the useGetCats custom hook to fetch cat images.
    It also integrates with the RouterModal component to handle displaying cat details based on URL search parameters and allow navigation to breed modal.
    Lazy loading is used for RouterModal to optimize performance by loading it only when needed.
    We use useCallback to memoize the updateSelectedCatImage function to prevent unnecessary re-renders when loading more cats.
    TO_DO: Error handling will be added with a corresponding UI element
    TO_DO: We will be adding pagination or infinite scroll for performance improvement  
    TO_DO: We may add search functionality to filter cats
    TO_DO: Test cases will be added
*/
export const LandingPage = () => {
    const [allCats, setAllCats] = useState([])
    const [searchParams, setSearchParams] = useSearchParams();
    const [breedModalOpen, setBreedModalOpen] = useState(false);

    const { data: catImages, refetch, isFetching } = useGetCats()

    useEffect(() => {
        if (catImages && catImages.length && !isFetching) {
            setAllCats((previous) => [...previous, ...catImages])
        }
    }, [catImages, isFetching])

    const updateSelectedCatImage = useCallback((selectedCatId) => {
        setSearchParams({
            cat: selectedCatId
        })
    }, [])

    return (
        <div className="main-body-component">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                <CatList cats={allCats} updateSelectedCat={updateSelectedCatImage} />
            </div>
            {
                (searchParams.get(CAT_QUERY) || breedModalOpen) ?
                    <RouterModal
                        breedModalOpen={breedModalOpen}
                        setBreedModalOpen={setBreedModalOpen}
                        initialCatData={
                            searchParams.get(CAT_QUERY) ?
                                allCats.find(cat => cat.id === searchParams.get(CAT_QUERY)) :
                                {}
                        }
                    /> : ''
            }
            {
                isFetching ?
                    <PartialLoader></PartialLoader> :
                    <Button className="load-more-button" variant="contained" onClick={() => refetch()}>
                        Load More
                    </Button>
            }
        </div>
    )
}

export default LandingPage;