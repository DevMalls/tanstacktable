import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLazyQuery } from "@apollo/client";
import { ColumnDef } from "@tanstack/react-table";
import { TanStackTableReact } from "../../components/common/tanstack/table/TanStackTableReact";
import SideNavBar from "../../components/common/sidenavbar/SideNavBar";
import TextCell from "../../components/common/tanstack/cell/TextCell";
import SelectCell from "../../components/common/tanstack/cell/SelectCell";
import { GET_LIMIT_SHIPS } from "../../datasources/apis/testquery";
import { pageCountList } from "../../datasources/common/constants";
import './shipsscreen.css';

type Ships = {
  id: string,
  name: string,
  active: boolean,
  imo: number,
  type: string,
  roles:[string]
}

const ShipsScreen = () => {

  const [dataLimitCount, setDataLimitCount] = useState<number>(10);

  const navigate = useNavigate();

  const [fetchItems, { loading, error, data }] = useLazyQuery(GET_LIMIT_SHIPS, {
    variables: {
      limit: dataLimitCount
    }
  });  //uselazyquery 

  // const {loading, error, data }= useQuery(GET_SHIPS);  //uselazyquery


  const shipColumns = useMemo<ColumnDef<Ships>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Name',
      },
      {
        accessorKey: 'type',
        header: 'Type',
        enableSorting: false, // enable sorting for this column
      },
      {
        accessorKey: 'imo',
        header: 'IMO',
        cell: TextCell
        // sortUndefined:'last',
        // sortDescFirst: false,
      },
      {
        accessorKey: 'roles',
        header: 'Roles',
        cell: SelectCell
      },
      {
        accessorKey: 'active',
        header: 'Active'
      }
    ], []);

  useEffect(() => {
    fetchItems();
  }, []);

  const onClickLogout = () => {
    localStorage.removeItem('user');
    navigate('/login')
  }

  const onClickDataLimit = (count: number) => {
    setDataLimitCount(count);
    fetchItems({
      variables: {
        limit: count
      }
    });
  }

  if (loading || !data) {
    return (<div>Loading...</div>)
  }


  return (
    <div className="reports-container">
      <SideNavBar />
      <div className="left-container">
        <div className="logout-container"><button className="outlined-btn-primary" onClick={onClickLogout}>Logout</button></div>
        <div className="content-container">
              <TanStackTableReact
          data={data?.ships}
          columns={shipColumns}
          count={dataLimitCount}
          pagedropdown={true}
          pageCountList={pageCountList}
          onClickDataLimit={onClickDataLimit} />
          </div>
      </div>
    </div>
  )
}

export default ShipsScreen;