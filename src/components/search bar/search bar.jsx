import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import React, { useState } from "react";
import { GoSearch } from "react-icons/go";

function SearchBar({
                       label = "Search Here",
                       width = '17.5em',
                       height = '1.95em',
                       hoverCursor = 'pointer',
                       defaultCursor = 'default',
                       onKeyPress
                   }) {

    const [isHovered, setIsHovered] = useState(false);
    const [query, setQuery] = useState('');

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const handleChange = (event) => {
        setQuery(event.target.value);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            onKeyPress(query);
        }
    };

    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': {
                    m: 2,
                    width: '17.5em',
                    "& .MuiInputBase-root": {
                        height: '1.95em',
                        borderRadius: '1.5em',
                        backgroundColor: 'white',
                        position: 'relative',
                    },
                    "& .MuiInputLabel-root": {
                        fontSize: '0.6em',
                        textAlign: 'center',
                    },
                    "& .search-icon": {
                        position: 'absolute',
                        right: '15px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        pointerEvents: 'none',
                    },
                },
            }}
            noValidate
            autoComplete="on"
            style={{ display: 'flex', justifyContent: 'right' }}
        >
            <TextField
                id="standard-basic"
                label={label}
                variant="outlined"
                size="small"
                value={query}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{
                    cursor: isHovered ? hoverCursor : defaultCursor,
                }}
                InputProps={{
                    endAdornment: (
                        <GoSearch className="search-icon" />
                    )
                }}
            />
        </Box>
    )
}

export default SearchBar;
