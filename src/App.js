import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Landing from "./containers/Landing/Landing";
import Navbar from "./components/Navbar/Navbar";
import Home from "./containers/Home/Home";
import { MetaMaskUIProvider } from "@metamask/sdk-react-ui";

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
