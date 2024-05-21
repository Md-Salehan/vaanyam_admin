/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
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

// @mui material components
import Tooltip from "@mui/material/Tooltip";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDProgress from "components/MDProgress";
import PopUp from "examples/popUp/PopUp";

// Images
import logoXD from "assets/images/icons/flags/DE.png";
import edit from "assets/images/icons/edit_icon.png";
import view from "assets/images/icons/veiw_icon.png";
import del from "assets/images/icons/delete_icon.png"
import logoAtlassian from "assets/images/small-logos/logo-atlassian.svg";
import logoSlack from "assets/images/small-logos/logo-slack.svg";
import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
import logoJira from "assets/images/small-logos/logo-jira.svg";
import logoInvesion from "assets/images/small-logos/logo-invision.svg";
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import { useEffect } from "react";
import { Host } from "constant";
import axios from "axios";
import { serverAdd } from "constant";
import Loader from "components/Loader/Loader";

export default function data(setrowData, apiData=[], fetchTableData, set_table, table) {
  

  const Company = ({ image, name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDTypography variant="button" fontWeight="medium" ml={1} lineHeight={1}>
        {name}
      </MDTypography>
    </MDBox>
  );

  const handle_deleteRow = async (item, index)=>{
    let body={
      _id:item?._id
    }
    // apiData[index].loading = true
    // console.log(table);
    

    if (window.confirm("Are you sure?")) {
      await axios.post(serverAdd + "/dest/del", body)
        .then((res) => {
          if (res.data.success === true) {
            fetchTableData()
            // set_table({
            //   ...table,
            //   rows: table.rows.filter((item, i)=> true)
            // })
            // console.log();
            
          }
        })
    }
  }

  const handle_popup= (item)=>{
    setrowData({
      open: true,
      content: {
        _id: item?._id,
        about: item?.about,
        bestTimeVisit: item?.bestTimeVisit,
        touristAttractions: item?.touristAttractions,
        map:item?.map,
        place: item?.place,
        default: item?.default,
        mainImgName: item?.imagePath,
        itDay: item?.itinary?.day,
        itNight: item?.itinary?.night,
        itDetail: item?.itinary?.detail || []
    }
    })
}

  return {
    columns: [
      { Header: "Place", accessor: "place", width: "45%", align: "left" },
      { Header: "Location", accessor: "map", width: "30%", align: "left" },
      { Header: "Edit", accessor: "edit", align: "center" },
      // { Header: "View", accessor: "view", align: "center" },
      { Header: "Delete", accessor: "del", align: "center" },

    ],
    rows: [
      ...apiData?.map((item, index)=>(
        {
          place: <Company image={Host+"/temp/"+item?.imagePath} name={item.place} />,
          map: (
            <MDTypography variant="caption" color="text" fontWeight="medium">
              {item?.map}
            </MDTypography>
          ),
          edit: <div style={{cursor: "pointer"}} onClick={()=>handle_popup(item)}>
            <Company image={edit} name="" />
          </div>,
          // view: <Company  image={view} name="" />,
          del: <div style={{cursor: "pointer"}} onClick={()=>handle_deleteRow(item, index)}>
            {
              item?.loading? 
              <Loader />:
              <Company image={del} name="" /> 
            }
          </div>
          
  
          
        }
      ))
    ],

    
  };
}

/*

rows: [
      // {
      //   companies: <Company image={logoXD} name="jammu and kasmir" />,
      //   members: (
      //     <MDBox display="flex" py={1}>
      //       {avatars([
      //         [team1, "Ryan Tompson"],
      //         [team2, "Romina Hadid"],
      //         [team3, "Alexander Smith"],
      //         [team4, "Jessica Doe"],
      //       ])}
      //     </MDBox>
      //   ),
      //   budget: (
      //     <MDTypography variant="caption" color="text" fontWeight="medium">
      //       $14,000
      //     </MDTypography>
      //   ),
      //   completion: (
      //     <MDBox width="8rem" textAlign="left">
      //       <MDProgress value={60} color="info" variant="gradient" label={false} />
      //     </MDBox>
      //   ),
      // },
      {
        place: <Company image={logoXD} name="jammu and kasmir" />,
        map: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            North india
          </MDTypography>
        ),
        edit: <div onClick={()=>handle_popup({title: "hello"})}>
          <Company image={edit} name="" />
        </div>,
        view: <Company image={view} name="" />,
        del: <Company image={del} name="" />

        
      }
      
      
    ],


*/