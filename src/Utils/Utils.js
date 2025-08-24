/*
    Utility functions and constants for The Cat API integration.
    This file includes API endpoint URLs, API key, and helper functions for making API requests.
    TO_DO: Move the API key to a secure config file or environment variable for better security management.
    TO_DO: Remove BREED_MAX_IMAGE_NUMBER after adding pagination or infinite scroll to breed modal.
*/
export const CAT_API_BASE_URL = "https://api.thecatapi.com/v1/"
export const CAT_API_GET_CATS_PARAMETERS = "images/search"
export const CAT_API_KEY = "live_8qy0Kt64qdQLtaKf20NwCBwE1p9aJn9TKb5mxG8qRfznLpEqvsm3Y4ZDGvbjR1UJ" // TO_DO: Move to config file or environment variable
export const CAT_API_KEY_PARAMETER_NAME = "api_key"
export const RANDOM_IMAGE_NUMBER = "10"
export const BREED_MAX_IMAGE_NUMBER = "8"   // TO_DO: Remove after adding pagination or infinite scroll to breed modal.
export const CAT_API_GET_SELECTED_CAT_PARAMETERS = "images/"
export const CAT_API_FAVORITE_PARAMETER = "favourites"
export const CAT_API_GET_BREEDS = "breeds"

export async function apiRequest(url, options = { method: "GET" }) {
    try {
        const res = await fetch(url, options);
        if (!res.ok) throw new Error(`API error: ${res.status}`);
        return await res.json();
    } catch (error) {
        console.error('API Request Failed:', error);
        throw error;
    }
}

/*
    Query parameter keys used in URL search parameters.
    These constants help maintain consistency when accessing query parameters throughout the application.   
    TO_DO: We can add more query parameters in future if needed.
*/
export const CAT_QUERY = "cat"

/*
    Menu items for the application navigation.
    Each menu item includes a URL and a display name.
    TO_DO: We can add more menu items in future if needed.
*/
export const MENU_ITEMS = [
    {
        url: '/',
        linkName: 'CATS'
    },
    {
        url: '/breeds',
        linkName: 'BREEDS'
    },
    {
        url: '/favorites',
        linkName: 'FAVORITES'
    }
]

/*
    Favorite action types for adding and removing favorite cats.
    These constants are used to specify the action type when making requests to The Cat API for managing favorite cats.
*/
export const FAVORITE_DELETE_ACTION = 'delete'
export const FAVORITE_ADD_ACTION = 'add'