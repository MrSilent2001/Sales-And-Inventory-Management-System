import {styled} from "@mui/material/styles";
import Button from "@mui/material/Button";

const AddItemButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText('#242F9B'),
    backgroundColor: '#242F9B',
    '&:hover': {
        backgroundColor: '#242F9B' // You can adjust the darken value as needed
    },
    '&.MuiButton-root': {
        width: '10.625em',
        height: '2.75em'
    },
}));



export default AddItemButton;