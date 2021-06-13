# medical-device-manager

### Features
1. Login
2. Show devices
3. Show related data on clicking a particular device
4. Add a new device

### Instructions
1. Clone this repo or download zipped file and unzip
2. Run `npm install` to install dependencies
3. Run `npm run start` to run the project on browser

### Project Description
The project has been developed using `react js` with `typescript`. The design has been done with `scss`. All the source code is bundled to js files using `webpack` which is a very popular bundler. Most of the files having `tsx` extensions heavily rely on scrict type checking. `Functional Components` have been used to develop user interfaces. Third party dependencies like [react](https://www.npmjs.com/package/react) and [react-dom](https://www.npmjs.com/package/react-dom) have been used for react support and rendering output with design. For typescript support [typescript](https://www.npmjs.com/package/typescript) dependency is used. To give routing support [react-router-dom](https://www.npmjs.com/package/react-router-dom) is used. For making http requests like `get`, `post` [axios](https://www.npmjs.com/package/axios) is used. [node-sass](https://www.npmjs.com/package/node-sass) is used for `scss` support. 

### Project Architecture
As the project is developed with react, there is an entry point from where the execution or main flow starts. From the `index.tsx` file `App.tsx` is rendered. This component contains `AddDataModal`, `ModelDataModal`, `Home` and `Login` components. The latest two components are associated with route. Here `Home` has got a protected route which is an `HOC` for the home route. This component checks whether the user is authenticated. If so then it redirects the user to the home route else to the login route. The authentication is checked with the `auth_token` from remote server which is kept stored in `localStorage`. The `Home` component shows the medical devices coming from backend api. In order to store the data coming from api, `useState` hook is used. To make GET request, `useEffect` hook is used. On clicking the `Show Data` button of each device model, a pop up modal opens which is the `ModelDataModal` component. This components rendering depends on a boolean value upon the value of which this component is shown or hidden. This component also takes the device name and device brand as props. In order to update and use this props a `React Context` is created and wrapped with the `App` using `Context Provider`. On clicking the `Add Model` button another pop up is shown which takes another boolean value as props to get rendered. Its value is also used with the context created. Using this pop up user can add a new device making POST request to the server. At last there is the `Logout` button on clicking which the user is logged out by removing the `auth_token` from localStorage.
