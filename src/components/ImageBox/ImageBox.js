import React from 'react'
import "./ImageBox.css"
import AddIcon from '@mui/icons-material/Add';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import axios from 'axios';
import { useState } from 'react';
import { Host } from 'constant';
import { serverAdd } from 'constant';
const EditIconStyle = { fontSize: "80px !important", color: "white !important", opacity: "0.8" }
const AddIconStyle = { fontSize: "80px !important", opacity: "0.7" }
function ImageBox({ width, height, style, imgName, imgPath = "", onUpLoadImage, onDeleteImage }) {
    const [loading, set_loading] = useState({
        add: false,
        del:false
    })
    const upload_image = async (e)=>{
        const {name, files} = e.target
        const formData = new FormData();
        formData.append("singleImage", files[0])

        set_loading({
            ...loading,
            add: true
        })
        await axios.post(serverAdd+"/upload/singleimage",formData).then((res)=>{
            onUpLoadImage(res.data)
        }).catch((err)=>{
            onUpLoadImage({success: false})
        })
        .finally(()=>{
            set_loading({
                ...loading,
                add: false
            })
        })
        console.log("main");
      }
      const delete_image = async (e)=>{

        set_loading({
            ...loading,
            del: true
        })
        await axios.post(serverAdd+"/upload/delimg",{
            imgName
        }).then((res)=>{
            onDeleteImage(res.data)
        }).catch((err)=>{
            console.log(err);
            onDeleteImage({success: false})
        })
        .finally(()=>{
            set_loading({
                ...loading,
                del: false
            })
        })
      }
    return (
        <div style={{ height, minWidth: width, ...style }} className='imageBox'>
            {imgName && <img src={Host+"/temp/"+imgName} alt='img' />}
            
            {imgName && <div onClick={delete_image} className='del-icon-wp'>
            {!loading?.del ? <CloseOutlinedIcon />: "loading"}
            </div>}
            <div className='icon-wp'>
                {imgName ?
                    ""
                    :
                    <div className='img-icons-wp'>
                        {!loading?.add ? <AddIcon sx={AddIconStyle} />: "loading"}
                        <input type='file' onChange={upload_image} className='fileInput' />
                    </div>

                }

            </div>
        </div>
    )
}

export default ImageBox

// {/* <EditTwoToneIcon sx={EditIconStyle} /> */}