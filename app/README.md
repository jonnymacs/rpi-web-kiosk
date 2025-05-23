# Self Order Kiosk Frontend

This project is a self-order kiosk application built with React and TypeScript, bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Project Overview

This application is a self-service kiosk for a restaurant, allowing customers to:
- Choose their dining option (eat in or take out)
- Select payment method
- Browse menu items by category
- Add items to cart
- Review and modify orders
- Complete the order process

The project also includes:
- Admin panel for order management
- Queue display screen for kitchen staff and customers

## Tech Stack

- React 18
- TypeScript
- MaterialUI (MUI) for UI components
- React Router for navigation
- Context API for state management
- Axios for API requests
- AOS for animations
- SweetAlert2 for notifications

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## TypeScript Implementation

This project has been converted from JavaScript to TypeScript to provide:
- Better developer experience with enhanced IDE support
- Static type checking
- Improved code maintainability
- Type-safe props and state
- Better documentation through type definitions

Type definitions can be found in the `src/types.ts` file, which includes interfaces for:
- Products
- Categories
- Orders
- Order Items
- Application State
- Action Types

## Project Structure

- `/src/assets`: Contains images and other static assets
- `/src/Screens`: Contains all the screen components
- `/src/types.ts`: TypeScript type definitions
- `/src/Store.tsx`: Context provider and reducer functions
- `/src/actions.ts`: Action creators for state management
- `/src/constants.ts`: Constants used throughout the application

## Backend API

The application communicates with a backend API for:
- Fetching menu categories and products
- Submitting orders
- Retrieving order history and queue information

The backend API is hosted at: `https://self-order-kiosk-back.vercel.app/api/`

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
