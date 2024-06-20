import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Button from "@mui/material/Button";
import * as React from "react";
import {styled} from "@mui/material/styles";

function FileUpload({style, onChange, text}) {
    const defaultText = "File Upload";

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 0.5,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        onChange(file);
    };

    return (
        <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon/>}
            sx={{
                ...style,
            }}
        >
            {text ? text : defaultText}
            <VisuallyHiddenInput type="file" onChange={handleFileChange}/>
        </Button>
    );
}

export default FileUpload;
