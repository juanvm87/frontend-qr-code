import RoutingComponent from "./RoutingComponent";
import Auth from "./components/common/Auth";
import { ContextProvider } from "./store/handleContext";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <ContextProvider>
        <div className="App">
          <RoutingComponent />
        </div>
      </ContextProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
