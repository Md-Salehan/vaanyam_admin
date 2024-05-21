import React from 'react'
import "./addDestination.css"
import ImageBox from 'components/ImageBox/ImageBox'
import { Accordion, AccordionDetails, AccordionSummary, Button, Divider, FormControl, InputLabel, List, ListItem, ListItemText, MenuItem, Select, TextField } from '@mui/material'
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';
import { Margin, Padding } from '@mui/icons-material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';
import { Host } from 'constant';
import axios from 'axios';
import OutlinedInput from '@mui/material/OutlinedInput';
import { serverAdd } from 'constant';
const imageBoxStyle = { marginLeft: "10px", marginRight: "10px" }
const style = {
  py: 0,
  width: '100%',
  maxWidth: '100%',
  borderRadius: 2,
  border: '1px solid',
  borderColor: 'divider',
  backgroundColor: 'background.paper',
  padding: "0 15px 15px 15px",
  marginTop: "15px"
};






function AddDestination({ content, fetchTableData }) {


  const [dataObj, setDataObj] = useState(content ? content : {
    about: "",
    bestTimeVisit: "",
    touristAttractions: "",
    map: "",
    place: "",
    default: false,
    mainImgName: "",
    itDay: 0,
    itNight: 0,
    itDetail: []
  })
  const handle_textChange = (e) => {
    const { name, value, } = e.target;


    setDataObj({
      ...dataObj,
      [name]: value
    })

    if (name === "itDay" && Number(value)) {
      let arr = [...dataObj.itDetail]
      let to = Number(value) - dataObj.itDetail.length
      console.log(Number(dataObj.itDay), Number(value), Number(value) - dataObj.itDetail.length, "kkkkk");
      if (to > 0) {
        for (let i = 0; i < to; i++) {
          arr = [...arr, {
            title1: "",
            tags: "",
            title2: "",
            icons: "",
            texts: "",
            imgList: []
          }]
        }
      }
      else {
        arr = arr.slice(0, Number(value))
      }
      setDataObj({
        ...dataObj,
        [name]: value,
        itDetail: arr
      })
    }

  }
  // const handle_keyEnter = (e)=>{
  //     const {name, value} = e.target;
  //     console.log(value);
  //     if(Number(e.key) >= 0 && Number(e.key) <= 9)
  //     setDataObj({
  //         ...dataObj,
  //         [name]: dataObj[name]+e.key
  //     })
  // }
  const handle_itinaryDataChange = (e, index) => {
    const { name, value } = e.target;
    const list = dataObj?.itDetail
    list[index][name] = value
    setDataObj({
      ...dataObj,
      itDetail: list
    })
    console.log({
      ...dataObj,
      itDetail: list
    });
  }

  const upload_itinaryImage = async (data, index) => {
    if (data.success) {
      let list = dataObj?.itDetail
      list[index].imgList.push(data?.data?.imgName)
      setDataObj({
        ...dataObj,
        itDetail: list
      })
      console.log({
        ...dataObj,
        itDetail: list
      }, index, list);

    }
  }

  const delete_itinaryImage = async (data, index, imgIndex) => {
    if (data.success) {
      let list = dataObj?.itDetail
      // let arr = list[index].imgList
      // arr = arr.filter(item => item !== imgName)
      // list[index].imgList = arr
      list[index].imgList.splice(imgIndex, 1)
      setDataObj({
        ...dataObj,
        itDetail: list
      })
      console.log({
        ...dataObj,
        itDetail: list
      }, index, list);

    }
  }


  const upload_mainImage = async (data) => {
    if (data.success) {
      setDataObj({
        ...dataObj,
        mainImgName: data?.data?.imgName
      })
    }
  }
  const delete_mainImage = async (data) => {
    if (data.success) {
      setDataObj({
        ...dataObj,
        mainImgName: ""
      })
      console.log("dellll");
    }
  }

  const uploadData = async () => {
    let body = {
      "_id": content? content?._id: undefined,
      "about": dataObj?.about,
      "place": dataObj?.place,
      "map": dataObj?.map,
      "touristAttractions": dataObj?.touristAttractions,
      "bestTimeVisit": dataObj?.bestTimeVisit,
      "imagePath": dataObj?.mainImgName,
      "default": dataObj?.default,
      "itinary": {
        "day": Number(dataObj?.itDay),
        "night": Number(dataObj?.itNight),
        "isExist": dataObj?.itDetail.length ? true : false,
        "detail": [...dataObj?.itDetail]
      }
    }

    if (!content) {
      await axios.post(serverAdd + "/dest/add", body)
        .then((res) => {
          if (res.data.success === true) {
            let obj = {
              ...res.data.data,
              itDay: res?.data?.data?.itinary?.day,
              itNight: res?.data?.data?.itinary?.night,
              itDetail: res?.data?.data?.itinary?.detail
            }
            fetchTableData()
            alert("Destination Added Successfully")
            console.log(obj);
          }
        }).catch((err)=>{
          alert("Something went wrong, refresh the page")
        })
    }
    else{
      await axios.post(serverAdd + "/dest/edit", body)
        .then((res) => {
          if (res.data.success === true) {
            let obj = {
              ...res.data.data,
              itDay: res?.data?.data?.itinary?.day,
              itNight: res?.data?.data?.itinary?.night,
              itDetail: res?.data?.data?.itinary?.detail
            }
            fetchTableData()
            alert("Updated Successfully")
            console.log(obj);
          }
        }).catch((err)=>{
          alert("Something went wrong, refresh the page")
        })
    }

  }
  return (
    <div className='add-destination-form'>
      <ImageBox imgName={dataObj?.mainImgName} onUpLoadImage={upload_mainImage} onDeleteImage={delete_mainImage} width={"100%"} height={"50vh"} />
      <form >

        <List sx={style}>
          <ListItem>
            <ListItemText primary="Overview" />
          </ListItem>
          <ListItem>
            <TextField
              id="filled-search"
              label="Place :"
              type="text"
              fullWidth
              variant="filled"
              name='place'
              value={dataObj?.place}
              onChange={handle_textChange}
              color="secondary"
              className='fild'
            />

          </ListItem>
          <ListItem>
            <TextField
              id="filled-search"
              label="Location :"
              name='map'
              value={dataObj?.map}
              onChange={handle_textChange}
              type="text"
              fullWidth
              variant="filled"
              color="secondary"
              className='fild'
            />

          </ListItem>
          <ListItem>
            <TextField
              id="standard-multiline-static"
              label="About :"
              name='about'
              value={dataObj?.about}
              onChange={handle_textChange}
              multiline
              fullWidth
              rows={5}
              defaultValue=""
              color="secondary"
              variant="filled"
              className='fild'
            />
          </ListItem>
          <ListItem>
            <TextField
              id="standard-multiline-static"
              label="Best Time to Visit :"
              name='bestTimeVisit'
              value={dataObj?.bestTimeVisit}
              onChange={handle_textChange}
              multiline
              fullWidth
              rows={5}
              defaultValue=""
              color="secondary"
              variant="filled"
              className='fild'
            />
          </ListItem>
          <ListItem>
            <TextField
              id="standard-multiline-static"
              label="Tourist Attractions:"
              name='touristAttractions'
              value={dataObj?.touristAttractions}
              onChange={handle_textChange}
              multiline
              fullWidth
              rows={5}
              defaultValue=""
              color="secondary"
              variant="filled"
              className='fild'
            />
          </ListItem>

          <ListItem>
            <TextField
              id="outlined-select-currency"
              select
              label="Select Mode"
              value={dataObj?.default}
              onChange={(e) => setDataObj({ ...dataObj, default: e?.target?.value })}
              size="normal"
              fullWidth
              className='selectfild fild'
              variant="filled"
              color="secondary"
              sx={{ width: "100%" }}
            >

              <MenuItem value={true}>
                Show
              </MenuItem>
              <MenuItem value={false}>
                Hide
              </MenuItem>

            </TextField>
          </ListItem>

          <ListItem>
            <ListItemText primary="Itinary" />
          </ListItem>
          <TextField
            id=""
            label="Day"
            name='itDay'
            value={dataObj?.itDay}
            onChange={handle_textChange}
            type="text"
            autoComplete="off"
            color="secondary"
            className='day-fild'
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            id="filled-number"
            label="Night"
            name='itNight'
            value={dataObj?.itNight}
            onChange={handle_textChange}
            type="text"
            color="secondary"
            className='night-fild'
            InputLabelProps={{
              shrink: true,
            }}

          />

          <div>
            {
              dataObj.itDetail.map((item, index) => (
                <Accordion key={index}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    Day {index + 1}
                  </AccordionSummary>
                  <AccordionDetails>
                    <TextField
                      id="outlined-multiline-flexible"
                      label="Title 1"
                      fullWidth
                      className='fild'
                      value={dataObj?.itDetail[index]?.title1}
                      name='title1'
                      onChange={(e) => handle_itinaryDataChange(e, index)}
                      maxRows={4}
                    />
                    <TextField
                      className='fild'
                      id="outlined-multiline-flexible"
                      label="Tags"
                      value={dataObj?.itDetail[index]?.tags}
                      name='tags'
                      onChange={(e) => handle_itinaryDataChange(e, index)}
                      fullWidth
                      maxRows={4}
                    />
                    <TextField
                      className='fild'
                      id="outlined-multiline-flexible"
                      label="Sub Title"
                      value={dataObj?.itDetail[index]?.title2}
                      name='title2'
                      onChange={(e) => handle_itinaryDataChange(e, index)}
                      fullWidth
                      maxRows={4}
                    />

                    <TextField
                      className='fild'
                      id="outlined-multiline-flexible"
                      label="Icons"
                      value={dataObj?.itDetail[index]?.icons}
                      name='icons'
                      onChange={(e) => handle_itinaryDataChange(e, index)}
                      fullWidth
                      maxRows={4}
                    />
                    {/* <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-name-label">Name</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
          className='fild'
          sx={{ height: 50 }}
        >
          {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, personName, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl> */}


                    <TextField
                      className='fild'
                      id="outlined-multiline-flexible"
                      label="Detail"
                      value={dataObj?.itDetail[index]?.texts}
                      name='texts'
                      onChange={(e) => handle_itinaryDataChange(e, index)}
                      multiline
                      fullWidth
                      maxRows={4}
                    />
                    <div className='multi-imgup-wp'>
                      <ImageBox onUpLoadImage={(data) => upload_itinaryImage(data, index)} style={imageBoxStyle} width={"240px"} height={"300px"} />
                      {/* <ImageBox imgPath={"http://localhost:8080/temp/singleImage-Screenshot 2024-05-18 at 3.48.59 PM.png-1716122439587-612685809"} style={imageBoxStyle} width={"40%"} height={"300px"} /> */}
                      <div className='multi-img-wp'>
                      {
                        dataObj?.itDetail[index]?.imgList?.map((imgName, imgIndex) => (
                          <ImageBox key={imgIndex}
                            // imgPath={Host+"/temp/"+imageName} 
                            imgName={imgName}
                            style={imageBoxStyle}
                            width={"240px"}
                            height={"300px"}
                            onDeleteImage={(data) => delete_itinaryImage(data, index, imgIndex)}
                          />
                        ))
                      }
                      </div>

                    </div>
                  </AccordionDetails>
                </Accordion>

              ))
            }
          </div>
        </List>
      </form>
      <Button onClick={uploadData} >
        {
          content ? "UPDATE":"ADD"
        }
      </Button>
    </div>
  )
}

export default AddDestination