import RoutingComponent from "./RoutingComponent";
import Auth from "./components/common/Auth";
import { ContextProvider } from "./store/handleContext";

function App() {
  return (
    <ContextProvider>
      <div className="App">
        <RoutingComponent />
      </div>
    </ContextProvider>
  );
}

export default App;
