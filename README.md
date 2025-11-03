## WorldWise //Kepp track of your adventures

React City Mapper is a single-page React app that uses Leaflet to display cities and countries on an interactive map. It features route-based lazy loading with React Router for optimized performance.

On launch, users go through a fake authentication popup before accessing the main app. Clicking anywhere on the map opens a form to add a city with its name, country flag (auto-detected), and optional notes. Added cities appear as markers and can be removed instantly.

A "Use your position" button centers the map on the user's current position. The app uses mock data and local state — no backend required — and is configured via `vite.config.js`.

Built with reusable components and scalable logic, it's a great example of combining mapping, routing, and dynamic UI in React.

## Start the JSON Server

This app relies on a local JSON server to store and retrieve city data. Without it, the form and city marker functionality will not work.

Make sure the following script is included in your package.json:

"scripts": {
"server": `json-server --watch data/cities.json --port 8000`
}

Then run:
`npm run server`

This will:

- Start a local server at `http://localhost:8000`
- Watch the data/cities.json file for changes
- Allow your app to read/write city data dynamically

## 🧠 Why JSON Server?

The line below is critical to your app’s functionality:
"server": `json-server --watch data/cities.json --port 8000`

Without it:

- The form won’t submit data.
- City markers won’t be saved or displayed.
- The app will appear broken or unresponsive.
