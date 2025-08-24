# My Cat Gallery App

A modern React application for browsing cat breeds, viewing images, and managing favorites.  
Built with Vite, React Query, MUI, TailwindCSS, and TheCatAPI.

---

## **Setup**

1. **Install dependencies:**
   ```sh
   npm install
   ```

2. **Start the development server:**
   ```sh
   npm run dev
   ```

## **Usage**

- **Browse Breeds:**  
  View a list of cat breeds and their details.
- **View Cat Images:**  
  Click on a breed to see images of cats from that breed.
- **Favorites:**  
  Add or remove cats from your favorites list.
- **Modals:**  
  Cat and breed details are shown in modals for a smooth user experience.

---

## **Architecture Overview**

- **src/Components/**  
  UI components (lists, items, modals, loaders, etc.)
- **src/Hooks/**  
  Custom React Query hooks for API data fetching and mutations.
- **src/Contexts/**  
  Contexts for managing global state (favorites).
- **src/Utils/**  
  Utility functions and API configuration.
- **src/Pages/**  
  Page components to server for the specific links
- **src/App.jsx**  
  Main app component, sets up routing and context providers.
- **src/style.css, App.css**  
  TailwindCSS and custom styles.

**Key Libraries:**
- [React Query](https://tanstack.com/query/latest) – Data fetching and caching
- [MUI](https://mui.com/) – UI components
- [TailwindCSS](https://tailwindcss.com/) – Utility-first CSS
- [React Router](https://reactrouter.com/) – Routing

---

## **Config File**

- TO_DO Remove api key from the utils file and record it in the config file. It is intentionally added to help test the project

## **Error Handling**

- TO_DO Error handling will be optimized by adding a corresponding UI element and a centralized error management system

## **UI/UX**

- Basic UI/UX element are used just to focus on React development

## **Testing**

- TO_DO: Test cases will be adding

## **Styles**

- TO_DO inline css and custom CSS will be removed/reduced by using theme configration of Material UI and by using Tailwind Classes

## **Favicon**

- TO_DO favicon will be added

## **Favorite API**

- TO_DO Reconsider the approach of fetching all favorite cats when we load the application if the list becomes very large