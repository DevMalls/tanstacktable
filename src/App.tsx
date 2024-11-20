import { HashRouter, Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/home/HomeScreen";
import LoginScreen from "./screens/login/LoginScreen";
import ShipsScreen from "./screens/ships/ShipsScreen";
import RocketsScreen from "./screens/rockets/RocketsScreen";
import withAuth from "./components/common/route/withAuth";


export const App = () : JSX.Element => {
  
  const Home = withAuth(HomeScreen);
  const Characters = withAuth(RocketsScreen);
  const Ships = withAuth(ShipsScreen);

  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route path='/' element={<LoginScreen/>}/>
          <Route path='/login' element={<LoginScreen/>}/>
          <Route path="/home" element={<Home/>} />
          <Route path="/characters" element={<Characters/>} />
          <Route path="/ships" element={<Ships/>} />      
        </Routes>
      </HashRouter>
    </div>
  );
}

