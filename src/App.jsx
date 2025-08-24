import { lazy } from 'react';
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { Header } from './Components/Header'
import { FavoriteContext } from './Contexts/FavoritesContexts'

const LandingPage = lazy(() => import('./Pages/LandingPage'));
const Breeds = lazy(() => import('./Pages/Breeds'));
const Favorites = lazy(() => import('./Pages/Favorites'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

/*  
  Main Application Component
  Description: This is the root component of the application. It sets up routing, context providers, and query client for data fetching.
  It uses React Router for navigation between different pages (LandingPage, Breeds, Favorites).
  It also integrates React Query for efficient data fetching and caching.
  The FavoriteContext provider is used to manage the state of favorite cats across the application.
  Lazy loading is used for page components to optimize performance by loading them only when needed.
  TO_DO: Add error handling for routes that do not exist (404 page).
  TO_DO: Implement error boundaries to catch and display errors gracefully.
  TO_DO: Add a loading spinner or skeleton screen while lazy-loaded components are being fetched.
*/

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <FavoriteContext>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path='' element={<LandingPage />} />
            <Route path='/breeds' element={<Breeds />} />
            <Route path='/favorites' element={<Favorites />} />
          </Routes>
        </BrowserRouter>
      </FavoriteContext>
    </QueryClientProvider>
  )
}

export default App
