import {styled} from "@mui/material/styles";
import Button from "@mui/material/Button";

const DeleteItemButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText('#D41400'),
    backgroundColor: '#D41400',
    '&:hover': {
        backgroundColor: '#D41400' // You can adjust the darken value as needed
    },
}));

export default DeleteItemButton;