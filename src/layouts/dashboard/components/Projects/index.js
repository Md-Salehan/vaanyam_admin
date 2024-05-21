/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useEffect, useState } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React examples
import DataTable from "examples/Tables/DataTable";

// Data
import data from "layouts/dashboard/components/Projects/data";
import PopUp from "examples/popUp/PopUp";
import AddDestination from "form/AddDestination";
import axios from "axios";
import { serverAdd } from "constant";
import { Button } from "@mui/material";
import MDAvatar from "components/MDAvatar";

import logoXD from "../../../../assets/images/icons/flags/DE.png";
import edit from "../../../../assets/images/icons/edit_icon.png";
import view from "../../../../assets/images/icons/veiw_icon.png";
import del from "../../../../assets/images/icons/delete_icon.png"

const Company = ({ image, name }) => (
  <MDBox display="flex" alignItems="center" lineHeight={1}>
    <MDAvatar src={image} name={name} size="sm" />
    <MDTypography variant="button" fontWeight="medium" ml={1} lineHeight={1}>
      {name}
    </MDTypography>
  </MDBox>
);

function Projects() {
  const [apiData, set_apiData] = useState(null)
  const [table, set_table] = useState({
    columns: [
      { Header: "Place", accessor: "place", width: "45%", align: "left" },
      { Header: "Location", accessor: "map", width: "30%", align: "left" },
      { Header: "Edit", accessor: "edit", align: "center" },
      { Header: "View", accessor: "view", align: "center" },
      { Header: "Delete", accessor: "del", align: "center" },

    ],
    rows: [],

    
  })
  const [rowData, setrowData] = useState({
    open: false,
    content: null
  })
  const fetchTableData =  async ()=>{
    await axios.get(serverAdd+"/dest/getall")
    .then((res)=>{
      if(res?.data?.success){
        console.log(res.data);
        // set_apiData(res?.data?.data)
        // setrowData({
        //   ...rowData,
        //   allContent: res?.data?.data
        // })
        let apiData = res?.data?.data
        set_table(data(setrowData, apiData, fetchTableData, set_table, table))
      }
    }).catch((err)=>{
      alert("Something went wrong while fetching data, refresh the page")
    })
  }
  useEffect(() => {
    fetchTableData()
  }, [])
  



  
  // const { columns, rows } = data(setrowData, rowData);
  const [menu, setMenu] = useState(null);

  const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const closeMenu = () => setMenu(null);





  return (
    <Card>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
        <MDBox>
          <MDTypography variant="h6" gutterBottom>
            Destinations
          </MDTypography>
          <MDBox display="flex" alignItems="center" lineHeight={0}>
            {/* <Icon
              sx={{
                fontWeight: "bold",
                color: ({ palette: { info } }) => info.main,
                mt: -0.5,
              }}
            >
              done
            </Icon> */}
            <MDTypography variant="button" fontWeight="regular" color="text">
              {/* &nbsp;<strong>Total: </strong> 30 */}
              <Button onClick={()=>setrowData({...rowData, open:true})}>Add</Button>
            </MDTypography>
          </MDBox>
        </MDBox>
        {/* <MDBox color="text" px={2}>
          <Icon sx={{ cursor: "pointer", fontWeight: "bold" }} fontSize="small" onClick={openMenu}>
            more_vert
          </Icon>
        </MDBox>
        {renderMenu} */}
      </MDBox>
      <MDBox>
        <DataTable
          table={table}
          showTotalEntries={true}
          isSorted={true}
          noEndBorder
          entriesPerPage={true}
        />
      </MDBox>
      <PopUp maxWidth="lg" open={rowData.open} onClose={()=>setrowData({...rowData, open:false, content: null})} >
        <AddDestination fetchTableData={fetchTableData} content={rowData?.content ? rowData.content : null} />
      </PopUp>
    </Card>
  );
}

export default Projects;
