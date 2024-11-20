import { useNavigate } from "react-router-dom";
import SideNavBar from "../../components/common/sidenavbar/SideNavBar";
import './homescreen.css';

const HomeScreen = () => {

  const navigate = useNavigate();
  
  const onClickLogout = () => {
    localStorage.removeItem('user');
    navigate('/login')
  }

    return (
      <div className="home-container">
        <SideNavBar/>
        <div className="left-container">
         <div className="logout-container"><button className="outlined-btn-primary" onClick={onClickLogout}>Logout</button></div>
      <div className="content-container">Welcome Home</div> 
       </div>
       </div>
    )
}

export default HomeScreen;