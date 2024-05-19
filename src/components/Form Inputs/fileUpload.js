import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Button from "@mui/material/Button";
import * as React from "react";
import {styled} from "@mui/material/styles";

function FileUpload({style}) {

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });


    return (
        <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon/>}
            style={style}
        >
            Upload Image
            <VisuallyHiddenInput type="file"/>
        </Button>
    );
}

export default FileUpload;