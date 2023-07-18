import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { user_API } from "../../apis/api";
import axios from "axios";

const Datatable = () => {
  // const location = useLocation()
  // const path = location.pathname.split('/')[1]
  const [list, setList] = useState([]);
  const { data } = useFetch(user_API);

  useEffect(() => {
    setList(data);
  }, [data]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${user_API}/${id}`);
      setList(list.filter((item) => item._id !== id));
    } catch (err) {}
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className='cellAction'>
            <Link to='/users/test' style={{ textDecoration: "none" }}>
              <div className='viewButton'>View</div>
            </Link>
            <div
              className='deleteButton'
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className='datatable'>
      <div className='datatableTitle'>
        Add New User
        <Link to='/users/new' className='link'>
          Add New
        </Link>
      </div>
      <DataGrid
        className='datagrid'
        rows={list}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={(row) => row._id}
      />
    </div>
  );
};

export default Datatable;
