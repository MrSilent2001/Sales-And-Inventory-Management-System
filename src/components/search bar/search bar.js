import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import React, {useState} from "react";

function SearchBar({ label = "Search Here", width = '17.5em', height = '1.95em', hoverCursor = 'pointer', defaultCursor = 'default' }){

    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return(
        <Box
            component="form"
            sx={{
                '& > :not(style)': {
                    m: 2,
                    width: '17.5em',
                    "& .MuiInputBase-root":{
                        height: '1.95em',
                        borderRadius: '1.5em',
                        backgroundColor: 'white'
                    },
                    "& .MuiInputLabel-root": {
                        fontSize: '0.6em',
                        textAlign: 'center',
                    },
                },
            }}
            noValidate
            autoComplete="on"
            style={{display: 'flex', justifyContent: 'right'}}
        >
            <TextField
                id="standard-basic"
                label={label}
                variant="outlined"
                size="small"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{
                    cursor: isHovered ? hoverCursor : defaultCursor,
                }}
            />
        </Box>
    )
}

export default SearchBar;