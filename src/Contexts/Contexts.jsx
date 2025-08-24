import { createContext } from "react";

/*
    Contexts for managing favorite cats in the application.
    - FavoriteListContext: Provides the list of favorite cats.  
    - UpdateFavorite: Provides a function to add or remove cats from the favorites list.
    I was exporting contexts from FavoritesContexts.jsx file but to React best practices I have created separate file for contexts.
    React recommends creating a separate file for contexts to keep them modular and maintainable.
*/

export const UpdateFavorite = createContext('')
export const FavoriteListContext = createContext('')