import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import "./popUp.css"
import { IconButton } from '@mui/material';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';



export default function PopUp({titleStyle, open, onClose, children, title, PopUpButtom, maxWidth="md"}) {
  

  const handleClose = () => {
    onClose()
  };

  return (
    <React.Fragment>
      <Dialog
        fullWidth={true}
        maxWidth={maxWidth}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle sx={{...titleStyle}}>{title}</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: "#444",
          }}
        ><CloseOutlinedIcon /></IconButton>
        {/* <div className='DialogContent-wp'> */}
        <DialogContent>
          {children}
          
        </DialogContent>
        {/* </div> */}
        <DialogActions>
          {PopUpButtom && <PopUpButtom />}
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}