import RoutingComponent from "./RoutingComponent";
import Sidebar from "./components/common/Sidebar";
import Profile from "./components/common/Profile";
import Settings from "./components/common/Settings";
import QRcode from "./components/viewCodes/QRCode";
import GenerateCode from "./components/viewCodes/GenerateCode";
function App() {
  return (
    <div className="App">
    {/* <Settings/> */}
      {/* <Sidebar/> */}
      {/* <Profile /> */}
      <RoutingComponent/>      
      {/* <QRcode/> */}
      {/* <GenerateCode/> */}
    </div>
  );
}

export default App;
