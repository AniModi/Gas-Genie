import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Landing from "./containers/Landing/Landing";
import Navbar from "./components/Navbar/Navbar";

function App() {
  const paths = [
    {
      path: "/",
      component: Landing,
    },
  ];
  return (
    <>
      <Navbar></Navbar>
      <div className="app_container">
        <Routes>
          {paths.map((path, index) => (
            <Route key={index} path={path.path} element={<path.component />} />
          ))}
        </Routes>
      </div>
    </>
  );
}

export default App;
