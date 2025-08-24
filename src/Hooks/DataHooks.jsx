import { useQuery, useMutation } from "@tanstack/react-query"
import { apiRequest, CAT_API_KEY, CAT_API_BASE_URL, CAT_API_GET_CATS_PARAMETERS, CAT_API_KEY_PARAMETER_NAME, CAT_API_GET_BREEDS, RANDOM_IMAGE_NUMBER, BREED_MAX_IMAGE_NUMBER, CAT_API_GET_SELECTED_CAT_PARAMETERS, CAT_API_FAVORITE_PARAMETER } from "../Utils/Utils"

/*
    Custom hooks for fetching cat data from The Cat API.
    Each hook uses react-query for data fetching and caching.
    Error handling is included to log errors to the console.
    TO_DO: We can add retry logic for failed requests if needed.
    TO_DO: We can add pagination support for fetching large lists of cats or breeds if needed.
    TO_DO: We can add caching strategies to optimize performance and reduce unnecessary network requests.   
    TO_DO: We can add stale time and cache time configuration to the queries if needed.
    TO_DO: Test cases will be added
*/

export const useGetCats = () => {
    const { data, refetch, isFetching, error, isError } = useQuery({
        queryKey: ['catListFetch'],
        queryFn: () => apiRequest(`${CAT_API_BASE_URL}${CAT_API_GET_CATS_PARAMETERS}?limit=${RANDOM_IMAGE_NUMBER}&${CAT_API_KEY_PARAMETER_NAME}=${CAT_API_KEY}`)
    })

    if (isError) {
        console.error('Error fetching cats:', error);
    }

    return { data, refetch, isFetching }
}

export const useGetBreeds = () => {

    const { data, isPending, error, isError } = useQuery({
        queryKey: ['breedList'],
        queryFn: () => apiRequest(`${CAT_API_BASE_URL}${CAT_API_GET_BREEDS}?${CAT_API_KEY_PARAMETER_NAME}=${CAT_API_KEY}`)
    })

    if (isError) {
        console.error('Error fetching cats:', error);
    }

    return { data, isPending }
}

export const useGetBreedCats = ({ breedId }) => {
    const { data, isFetching, error, isError } = useQuery({
        queryKey: ['fetchBreedImages', breedId],
        queryFn: () => apiRequest(`${CAT_API_BASE_URL}${CAT_API_GET_CATS_PARAMETERS}?limit=${BREED_MAX_IMAGE_NUMBER}&breed_ids=${breedId}&${CAT_API_KEY_PARAMETER_NAME}=${CAT_API_KEY}`)
    })

    if (isError) {
        console.error('Error fetching cats:', error);
    }

    return { data, isFetching }
}

export const useGetSelectedCat = ({ selectedCat }) => {
    const { data, refetch, isFetching, error, isError } = useQuery({
        queryKey: ['detailCat', selectedCat],
        queryFn: () => apiRequest(`${CAT_API_BASE_URL}${CAT_API_GET_SELECTED_CAT_PARAMETERS}${selectedCat}?${CAT_API_KEY_PARAMETER_NAME}=${CAT_API_KEY}`),
        enabled: false,
    })

    if (isError) {
        console.error('Error fetching cats:', error);
    }

    return { data, isFetching, refetch }
}

export const useGetFavoriteCats = () => {
    const { data: favorites, error, isError } = useQuery({
        queryKey: ['favoritesFetch'],
        queryFn: () => apiRequest(`${CAT_API_BASE_URL}${CAT_API_FAVORITE_PARAMETER}?${CAT_API_KEY_PARAMETER_NAME}=${CAT_API_KEY}`)
    })

    if (isError) {
        console.error('Error fetching cats:', error);
    }

    return { favorites }
}

/*
    Custom hooks for adding and removing favorite cats using The Cat API.
    Each hook uses react-query's useMutation for performing mutations.
    Error handling is included to log errors to the console.
    TO_DO: We can add retry logic for failed requests if needed.
    TO_DO: Test cases will be added 
*/
export const useAddFavoriteCat = () => {
    const { mutate: addFavoriteMutate, isPending: isPendingAddFavorite } = useMutation({
        mutationFn: ({ catImageId }) => {
            return apiRequest(`${CAT_API_BASE_URL}${CAT_API_FAVORITE_PARAMETER}?${CAT_API_KEY_PARAMETER_NAME}=${CAT_API_KEY}`,
                {
                    method: "POST",
                    body: JSON.stringify({
                        "image_id": catImageId
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                }
            )
        },
        onError: (error) => {
            console.error('Failed to create add favorite Cat:', error);
        }
    });

    return { addFavoriteMutate, isPendingAddFavorite }
}

export const useRemoveFavoriteCat = () => {
    const { mutate: deleteFavoriteMutate, isPending: isPendingRemoveFavorite } = useMutation({
        mutationFn: ({ favoriteId }) => {
            return apiRequest(`${CAT_API_BASE_URL}${CAT_API_FAVORITE_PARAMETER}/${favoriteId}?${CAT_API_KEY_PARAMETER_NAME}=${CAT_API_KEY}`,
                {
                    method: "DELETE",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                }
            )
        },
        onError: (error) => {
            console.error('Failed to delete favorite cat:', error);
        }
    });

    return { deleteFavoriteMutate, isPendingRemoveFavorite }
}

