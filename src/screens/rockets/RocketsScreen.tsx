import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { useQuery } from "@apollo/client";
import SideNavBar from "../../components/common/sidenavbar/SideNavBar";
import { TanStackTableReact } from "../../components/common/tanstack/table/TanStackTableReact";
import { GET_ROCKETS } from "../../datasources/apis/testquery";
import './rocketsscreen.css';

type Rockets = {
  id: string,
  name: string,
  stages: number,
  first_flight: Date,
  active: boolean,
  engines: object
}
const RocketsScreen = () => {

  const navigate = useNavigate();

  const {loading, error, data }= useQuery(GET_ROCKETS); 
  
  const characterscolumns = useMemo<ColumnDef<Rockets>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Name',
      },
      {
        accessorKey: 'stages',
        header: 'Stages'
      },
      {
        accessorKey: 'first_flight',
        header: 'First Flight Date'
      },
      {
        accessorFn: (row: any) => row.engines.type, 
        // accessorKey: 'engines/type',
        header: 'Engine Type'
      },
      {
        accessorKey: 'active',
        header: 'Status'
      }
    ], []);

  const onClickLogout = () => {
    localStorage.removeItem('user');
    navigate('/login')
  }

  if (loading || !data) {
    return (<div>Loading...</div>)
  }

    return (
      <div className="users-container">
        <SideNavBar/>
        <div className="left-container">
         <div className="logout-container"><button className="outlined-btn-primary" onClick={onClickLogout}>Logout</button></div>
       <div className="content-container">
      <TanStackTableReact
          data={data?.rockets}
          columns={characterscolumns}
        />
       </div>
       </div> 
       </div>
    )
}

export default RocketsScreen;