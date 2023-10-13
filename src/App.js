import RoutingComponent from "./RoutingComponent";
import Sidebar from "./components/common/Sidebar";
import Profile from "./components/common/Profile";
import Settings from "./components/common/Settings";
import QRcode from "./components/viewCodes/QRCode";
import { SidebarContextProvider } from "./store/sidebarContext";

function App() {
  return (
    <SidebarContextProvider>
      <div className="App">
        {/* <Settings/> */}
        {/* <Sidebar/> */}
        {/* <Profile /> */}
        <RoutingComponent />
        {/* <QRcode/> */}
        {/* <GenerateCode/> */}
      </div>
    </SidebarContextProvider>
  );
}

export default App;
