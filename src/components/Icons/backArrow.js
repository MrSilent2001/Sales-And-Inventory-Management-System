import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import React from "react";
function BackArrow({size, style, onClick}){
    return(
        <ArrowBackIosIcon
            fontSize={size}
            style={style}
            sx={{ width: '80%', p: '0px', pr: '7%', mt: '2%', mb: '2%' }}
            onClick={onClick}
        />
    )
}

export default BackArrow;