import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Landing from "./containers/Landing/Landing";
import Navbar from "./components/Navbar/Navbar";
import Home from "./containers/Home/Home";
import { MetaMaskUIProvider } from "@metamask/sdk-react-ui";
import PartnerOffers from "./containers/PartnerOffers/PartnerOffers";
import Leaderboard from "./containers/Leaderboard/Leaderboard";

function App() {
  const paths = [
    {
      path: "/",
      component: Landing,
    },
    {
      path: "/home",
      component: Home,
    },
    {
      path: "/home/partner-offers",
      component: PartnerOffers,
    },
    {
      path: "home/leaderboard",
      component: Leaderboard,
    }
  ];
  return (
    <>
      <MetaMaskUIProvider>
        <Navbar></Navbar>
        <div className="app_container">
          <Routes>
            {paths.map((path, index) => (
              <Route key={index} path={path.path} element={<path.component />} />
            ))}
          </Routes>
        </div>
      </MetaMaskUIProvider>
    </>
  );
}

export default App;
