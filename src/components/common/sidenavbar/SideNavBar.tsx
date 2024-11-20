import { useNavigate } from "react-router-dom";
import { ReactElement, useEffect, useState} from "react";
import { sidenavbarlist } from "../../../datasources/common/constants";
import './sidenavbar.css';

type navitemType = {
    id : string,
    name:string,
    type: string,
    path: string,
    Icon: ReactElement
}
const SideNavBar = () => {

    const[currentItem, setCurrentItem] = useState<string>("");
    const[hideNavBar, setHideNavBar] = useState<boolean>(true);

    useEffect(()=>{
        let currentab = localStorage.getItem('currenttab');
        let ishideNav = localStorage.getItem('navhideshow');
        if(ishideNav !== null) {
            setHideNavBar(JSON.parse(ishideNav));
        }
        if(currentab){
            setCurrentItem(currentab);
        }
      
    },[])

    const navigate = useNavigate();

    const onClickHandler = (current: navitemType) => {
        if(current.type === 'sublogo'){
            localStorage.setItem('currenttab',current.id)
            localStorage.setItem('navhideshow',JSON.stringify(hideNavBar))
        navigate(current.path)
        }
        else  if(current.type === 'logo'){
            setHideNavBar(!hideNavBar);
        }
    }

    return (<div className="sidenavbar-container">
        {sidenavbarlist.map((item:any,index:number) => {
            return (
                <div key={index} className={`sidenavbar-iconcontainer ${item.type} cursor-pointer ${item.id === currentItem ? 'active' : ''}`} onClick={() => onClickHandler(item)}>
                    {!item.id.includes('app') ? <item.Icon width={20} height={20} fill={item.id === currentItem ? 'white' : 'black' }/> : <item.Icon width={32} height={32}/>}
                   {hideNavBar && <div>{item.name}</div>}
                </div>
            )
        })
        }
    </div>)
}

export default SideNavBar;