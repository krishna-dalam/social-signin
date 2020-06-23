const { createContext } = require("react");

const AppContext = createContext();

const Provider = AppContext.Provider;

export default AppContext;

export { Provider };
