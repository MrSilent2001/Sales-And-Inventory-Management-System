// import React, {useEffect, useState} from "react";
// import { Box } from '@mui/material';
// import FormControl from '@mui/material/FormControl';
// import InputLabel from '@mui/material/InputLabel';
// import "./viewInventory.css";
// import { Modal } from "@mui/material";
// import AddItem from "./Modals/Add Item/Add Item";
// import UpdateItem from "./Modals/Update Item/Update Item";
// import InventoryNavbar from "../../../layout/navbar/Inventory navbar/Inventory navbar";
// import Footer from "../../../layout/footer/footer";
// import DeleteItem from "./Modals/Delete Item/Delete Item";
// import CustomizedButton from "../../../components/Button/button";
// import SearchBar from "../../../components/search bar/search bar";
// import CustomizedTable from "../../../components/Table/Customized Table/customizedTable";
// import ComboBox from "../../../components/Form Inputs/comboBox";
// import axios from "axios";
//
// function FilterAvailability(){
//     const [category, setCategory] = React.useState('');
//
//     const handleSelect = (event) => {
//         setCategory(event.target.value);
//     };
//
//     const options = [
//         { value: 'Category 01', label: 'Category 01' },
//         { value: 'Category 02', label: 'Category 02' },
//         { value: 'Category 03', label: 'Category 03' }
//     ];
//
//     return(
//         <Box sx={{ minWidth: 80 }}>
//             <FormControl fullWidth>
//                 <InputLabel
//                     id="demo-simple-select-label"
//                     sx={{
//                         fontSize: '10px',
//                         display: 'flex',
//                         alignItems: 'center',
//                         justifyContent: 'center',
//                         color: 'rgba(255,255,255,0.7)'
//                     }}
//                 >
//                     Select
//                 </InputLabel>
//                 <ComboBox
//                     value={category}
//                     onChange={(event) => handleSelect(event)}
//                     style={{width: '10em', marginRight: '0.5em',  border: '1px solid white'}}
//                     options={options}
//                     label="Category"
//                     size="small"
//                 />
//             </FormControl>
//         </Box>
//     )
// }
//
// function ViewInventory(){
//     const [visible, setVisible] = useState(false);
//     const [addItemVisible, setAddItemVisible] = useState(false);
//     const [deleteItemVisible, setDeleteItemVisible] = useState(false);
//     const [selectedRow, setSelectedRow] = useState(null);
//     const [allInventoryItems, setAllInventoryItems] = useState([]);
//
//     const [category, setCategory] = React.useState('');
//
//     const handleSelect = (event) => {
//         setCategory(event.target.value);
//     };
//
//     const options = [
//         { value: 'Building Material', label: 'Building Material' },
//         { value: 'Plumbing Material', label: 'Plumbing Material' },
//     ];
//
//     const handleSetVisible = (row) => {
//         setSelectedRow(row);
//         setVisible(true);
//     };
//
//     const handleButtonClick = () => {
//         console.log("view")
//     };
//
//     const columns = [
//         { columnId: 'id', label: 'Inventory Id', minWidth: 100, align: 'center' },
//         { columnId: 'itemDescription', label: 'Item Description', minWidth: 200, align: 'center' },
//         { columnId: 'itemCategory', label: 'Item Category', minWidth: 120, align: 'center' },
//         { columnId: 'itemQuantity', label: 'Quantity', minWidth: 100, align: 'center' },
//         { columnId: 'inventoryStatus', label: 'Inventory Status', minWidth: 170, align: 'center' },
//         { columnId: 'viewAction', label: '', minWidth: 100, align: 'center' },
//         { columnId: 'deleteAction', label: '', minWidth: 100, align: 'center' }
//     ];
//
//     const getAllInventoryItems = () => {
//         const url =
//             category === 'Building Material' || category === 'Plumbing Material' ?
//                 `http://localhost:9000/inventory/getByCategory?itemCategory=${encodeURIComponent(category)}`
//                 : 'http://localhost:9000/inventory/getAll';
//
//         axios.get(url).then(res=> {
//             setAllInventoryItems(res.data);
//             console.log(res.data);
//         }).catch(err => {
//             console.log(err);
//         })
//     }
//
//     useEffect(() => {
//         getAllInventoryItems();
//     }, [category]);
//
//     const mappedData = allInventoryItems.map(inventoryItem => ({ ...inventoryItem,
//             viewAction: createViewButton(inventoryItem.id),
//             deleteAction: createDeleteButton(handleButtonClick),
//             inventoryStatus: inventoryItem.itemQuantity > 0 ? 'In Stock' : 'Out of Stock' }
//     ));
//
//     function createViewButton(id) {
//         return (
//             <CustomizedButton
//                 onClick={() => handleSetVisible(id)}
//                 hoverBackgroundColor="#2d3ed2"
//                 style={{
//                     backgroundColor: '#242F9B',
//                     border: '1px solid #242F9B',
//                     width: '9em',
//                     height: '3em',
//                     fontSize: '0.9em',
//                     padding: '0.5em 0.625em',
//                     borderRadius: '0.35em',
//                     fontWeight: '500',
//                     marginTop: '0.625em',
//                     marginRight: '-2em'
//                 }}
//             >
//                 View
//             </CustomizedButton>
//         );
//     }
//
//     function createDeleteButton(handleButtonClick) {
//         return (
//             <CustomizedButton
//                 onClick={() => setDeleteItemVisible(true)}
//                 hoverBackgroundColor="#f11717"
//                 style={{
//                     backgroundColor: '#ff0000',
//                     border: '1px solid #242F9B',
//                     width: '9em',
//                     height: '3em',
//                     fontSize: '0.9em',
//                     padding: '0.5em 0.625em',
//                     borderRadius: '0.35em',
//                     fontWeight: '500',
//                     marginTop: '0.625em',
//                     marginLeft: '-3em',
//                     borderStyle: 'none'
//                 }}
//             >
//                 Delete
//             </CustomizedButton>
//         );
//     }
//
//
//     return(
//         <>
//             <InventoryNavbar/>
//
//             <div className="viewInventoryOuter">
//                 <div className="viewInventoryFilter">
//                     <div className="filterHeader">
//                         <h2>Filter Items</h2>
//                         <div className="itemCategoryFilter">
//                             <div className="itemCategoryTopic">
//                                 <h5>Category</h5>
//                             </div>
//
//                             <Box sx={{ minWidth: 80 }}>
//                                 <FormControl fullWidth>
//                                     <InputLabel
//                                         id="demo-simple-select-label"
//                                         sx={{
//                                             fontSize: '10px',
//                                             display: 'flex',
//                                             alignItems: 'center',
//                                             justifyContent: 'center',
//                                             color: 'rgba(255,255,255,0.7)'
//                                         }}
//                                     >
//                                         Select
//                                     </InputLabel>
//                                     <ComboBox
//                                         value={category}
//                                         onChange={(event) => handleSelect(event)}
//                                         style={{width: '10em', marginRight: '0.5em', border: '1px solid white'}}
//                                         options={options}
//                                         label="Category"
//                                         size="small"
//                                     />
//                                 </FormControl>
//                             </Box>
//
//                         </div>
//                         <div className="itemAvailabilityFilter">
//                             <div className="itemAvailabilityTopic">
//                                 <h5>Availability</h5>
//                             </div>
//                             <FilterAvailability></FilterAvailability>
//                         </div>
//                         <div className="applyButton">
//                             <CustomizedButton
//                                 hoverBackgroundColor="#f11717"
//                                 style={{
//                                     backgroundColor: '#ff0000',
//                                     width: '11em',
//                                     height: '2.5em',
//                                     fontSize: '0.95em',
//                                     padding: '0.5em 0.625em',
//                                     borderRadius: '0.35em',
//                                     fontWeight: '550',
//                                     marginTop: '0.625em',
//                                     marginRight:'1.5em',
//                                     marginLeft: '1.5em',
//                                 }}
//                             >
//                                 Apply
//                             </CustomizedButton>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="viewInventoryItemInner">
//                     <div className="InventorySearchAndButtons">
//                         <div className="viewInventorySearch">
//                             <SearchBar/>
//                         </div>
//                         <div className="viewInventoryButtons">
//                             <CustomizedButton
//                                 onClick={() => setAddItemVisible(true)}
//                                 hoverBackgroundColor="#2d3ed2"
//                                 style={{
//                                     backgroundColor: '#242F9B',
//                                     border: '1px solid #242F9B',
//                                     width: '11em',
//                                     height: '2.95em',
//                                     fontSize: '0.75em',
//                                     padding: '0.5em 0.625em',
//                                     borderRadius: '0.35em',
//                                     fontWeight: '500',
//                                     marginTop: '0.625em',
//                                 }}
//                             >
//                                 Add Item
//                             </CustomizedButton>
//
//                         </div>
//                     </div>
//
//                     <div className="itemTable">
//                         <CustomizedTable
//                             columns={columns}
//                             rows={mappedData}
//                         />
//                     </div>
//                 </div>
//
//                 <Modal open={addItemVisible}>
//                     <AddItem onClose={(value) => { setAddItemVisible(false)}} />
//                 </Modal>
//
//                 <Modal open={deleteItemVisible}>
//                     <DeleteItem onClose={(value) => { setDeleteItemVisible(false)}} />
//                 </Modal>
//
//                 <Modal open={visible}>
//                     <UpdateItem onClose={(value) => { setVisible(false)}} selectedRow={selectedRow} />
//                 </Modal>
//             </div>
//
//             <Footer/>
//         </>
//     )
// }
//
// export default ViewInventory;

// import React, { useMemo } from 'react';
//
// // MRT Imports
// import {
//     MaterialReactTable,
//     useMaterialReactTable,
//     MRT_GlobalFilterTextField,
//     MRT_ToggleFiltersButton,
// } from 'material-react-table';
//
// // Material UI Imports
// import {
//     Box,
//     lighten,
// } from '@mui/material';
//
//
// // Mock Data
// const data = [
//     {
//         firstName: 'John',
//         lastName: 'Doe',
//         email: 'john.doe@example.com',
//         salary: 50000,
//         jobTitle: 'Software Engineer',
//         startDate: '2020-01-01',
//         avatar: 'https://via.placeholder.com/150',
//         signatureCatchPhrase: 'Hello World!',
//     },
//     {
//         firstName: 'Jane',
//         lastName: 'Smith',
//         email: 'jane.smith@example.com',
//         salary: 75000,
//         jobTitle: 'Project Manager',
//         startDate: '2019-03-15',
//         avatar: 'https://via.placeholder.com/150',
//         signatureCatchPhrase: 'Let’s do it!',
//     },
//     // Add more mock data as needed
// ];
//
// const Example = () => {
//     const columns = useMemo(
//         () => [
//             {
//                 accessorFn: (row) => `${row.firstName} ${row.lastName}`, // accessorFn used to join multiple data into a single cell
//                 id: 'name', // id is still required when using accessorFn instead of accessorKey
//                 header: 'Name',
//                 size: 250,
//                 Cell: ({ renderedCellValue, row }) => (
//                     <Box
//                         sx={{
//                             display: 'flex',
//                             alignItems: 'center',
//                             gap: '1rem',
//                         }}
//                     >
//                         <img
//                             alt="avatar"
//                             height={30}
//                             src={row.original.avatar}
//                             loading="lazy"
//                             style={{ borderRadius: '50%' }}
//                         />
//                         {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
//                         <span>{renderedCellValue}</span>
//                     </Box>
//                 ),
//             },
//             {
//                 accessorKey: 'email', // accessorKey used to define `data` column. `id` gets set to accessorKey automatically
//                 enableClickToCopy: true,
//                 filterVariant: 'autocomplete',
//                 header: 'Email',
//                 size: 300,
//             },
//             {
//                 accessorKey: 'salary',
//                 // filterVariant: 'range', // if not using filter modes feature, use this instead of filterFn
//                 filterFn: 'between',
//                 header: 'Salary',
//                 size: 200,
//                 // custom conditional format and styling
//                 Cell: ({ cell }) => (
//                     <Box
//                         component="span"
//                         sx={(theme) => ({
//                             backgroundColor:
//                                 cell.getValue() < 50000
//                                     ? theme.palette.error.dark
//                                     : cell.getValue() >= 50000 && cell.getValue() < 75000
//                                         ? theme.palette.warning.dark
//                                         : theme.palette.success.dark,
//                             borderRadius: '0.25rem',
//                             color: '#fff',
//                             maxWidth: '9ch',
//                             p: '0.25rem',
//                         })}
//                     >
//                         {cell.getValue()?.toLocaleString?.('en-US', {
//                             style: 'currency',
//                             currency: 'USD',
//                             minimumFractionDigits: 0,
//                             maximumFractionDigits: 0,
//                         })}
//                     </Box>
//                 ),
//             },
//             {
//                 accessorKey: 'jobTitle', // hey a simple column for once
//                 header: 'Job Title',
//                 size: 350,
//             },
//             {
//                 accessorFn: (row) => new Date(row.startDate), // convert to Date for sorting and filtering
//                 id: 'startDate',
//                 header: 'Start Date',
//                 filterVariant: 'date',
//                 filterFn: 'lessThan',
//                 sortingFn: 'datetime',
//                 Cell: ({ cell }) => cell.getValue()?.toLocaleDateString(), // render Date as a string
//                 Header: ({ column }) => <em>{column.columnDef.header}</em>, // custom header markup
//                 muiFilterTextFieldProps: {
//                     sx: {
//                         minWidth: '250px',
//                     },
//                 },
//             },
//         ],
//         [],
//     );
//
//     const table = useMaterialReactTable({
//         columns,
//         data, // data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
//         enableColumnFilterModes: true,
//         enableColumnOrdering: true,
//         enableGrouping: true,
//         enableColumnPinning: true,
//         enableFacetedValues: true,
//         enableRowActions: true,
//         enableRowSelection: true,
//         initialState: {
//             showColumnFilters: false,
//             showGlobalFilter: true,
//             columnPinning: {
//                 left: ['mrt-row-expand', 'mrt-row-select'],
//                 right: ['mrt-row-actions'],
//             },
//         },
//         paginationDisplayMode: 'pages',
//         positionToolbarAlertBanner: 'bottom',
//         muiSearchTextFieldProps: {
//             size: 'small',
//             variant: 'outlined',
//         },
//         muiPaginationProps: {
//             color: 'secondary',
//             rowsPerPageOptions: [10, 20, 30],
//             shape: 'rounded',
//             variant: 'outlined',
//         },
//         renderRowActionMenuItems: ({ closeMenu }) => [
//
//         ],
//         renderTopToolbar: ({ table }) => {
//
//             return (
//                 <Box
//                     sx={(theme) => ({
//                         backgroundColor: lighten(theme.palette.background.default, 0.05),
//                         display: 'flex',
//                         gap: '0.5rem',
//                         p: '8px',
//                         justifyContent: 'space-between',
//                     })}
//                 >
//                     <Box sx={{ display: 'flex', gap: '0.5rem', alignItems: 'center'}}>
//                         {/* import MRT sub-components */}
//                         <MRT_GlobalFilterTextField table={table} />
//                         <MRT_ToggleFiltersButton table={table} />
//                     </Box>
//
//                 </Box>
//             );
//         },
//     });
//
//     return(
//         <Box sx={{ width: '85%', margin: 'auto' }}>
//             <MaterialReactTable table={table} />
//         </Box>
//     );
// };
//
// // Date Picker Imports - these should just be in your Context Provider
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
//
// const CustomizedTable2 = () => (
//     // App.tsx or AppProviders file
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//         <Example />
//     </LocalizationProvider>
// );
//
// export default CustomizedTable2;

// import React, { useState, useEffect,useMemo } from 'react';
//
// // MRT Imports
// import {
//     MaterialReactTable,
//     useMaterialReactTable,
//     MRT_GlobalFilterTextField,
//     MRT_ToggleFiltersButton,
// } from 'material-react-table';
//
// // Material UI Imports
// import {
//     Box,
//     lighten,
// } from '@mui/material';
//
// const CustomTable = ({ data, enableFilters = true, enableSorting = true, initialShowFilters = false, initialShowGlobalFilter = true, rowsPerPageOptions = [5, 10, 15] }) => {
//     const columns = useMemo(
//         () => [
//             {
//                 accessorFn: (row) => `${row.firstName} ${row.lastName}`,
//                 id: 'name',
//                 header: 'Name',
//                 size: 250,
//                 Cell: ({ renderedCellValue, row }) => (
//                     <Box
//                         sx={{
//                             display: 'flex',
//                             alignItems: 'center',
//                             gap: '1rem',
//                         }}
//                     >
//                         <img
//                             alt="avatar"
//                             height={30}
//                             src={row.original.avatar}
//                             loading="lazy"
//                             style={{ borderRadius: '50%' }}
//                         />
//                         <span>{renderedCellValue}</span>
//                     </Box>
//                 ),
//             },
//             {
//                 accessorKey: 'email',
//                 enableClickToCopy: true,
//                 filterVariant: 'autocomplete',
//                 header: 'Email',
//                 size: 300,
//             },
//             {
//                 accessorKey: 'salary',
//                 filterFn: 'between',
//                 header: 'Salary',
//                 size: 200,
//                 Cell: ({ cell }) => (
//                     <Box
//                         component="span"
//                         sx={(theme) => ({
//                             backgroundColor:
//                                 cell.getValue() < 50000
//                                     ? theme.palette.error.dark
//                                     : cell.getValue() >= 50000 && cell.getValue() < 75000
//                                         ? theme.palette.warning.dark
//                                         : theme.palette.success.dark,
//                             borderRadius: '0.25rem',
//                             color: '#fff',
//                             maxWidth: '9ch',
//                             p: '0.25rem',
//                         })}
//                     >
//                         {cell.getValue()?.toLocaleString?.('en-US', {
//                             style: 'currency',
//                             currency: 'USD',
//                             minimumFractionDigits: 0,
//                             maximumFractionDigits: 0,
//                         })}
//                     </Box>
//                 ),
//             },
//             {
//                 accessorKey: 'jobTitle',
//                 header: 'Job Title',
//                 size: 350,
//             },
//             {
//                 accessorFn: (row) => new Date(row.startDate),
//                 id: 'startDate',
//                 header: 'Start Date',
//                 filterVariant: 'date',
//                 filterFn: 'lessThan',
//                 sortingFn: 'datetime',
//                 Cell: ({ cell }) => cell.getValue()?.toLocaleDateString(),
//                 Header: ({ column }) => <em>{column.columnDef.header}</em>,
//                 muiFilterTextFieldProps: {
//                     sx: {
//                         minWidth: '250px',
//                     },
//                 },
//             },
//         ],
//         [],
//     );
//
//     const table = useMaterialReactTable({
//         columns,
//         data,
//         enableColumnFilterModes: enableFilters,
//         enableColumnOrdering: enableSorting,
//         enableGrouping: true,
//         enableColumnPinning: true,
//         enableFacetedValues: true,
//         enableRowActions: true,
//         enableRowSelection: true,
//         initialState: {
//             showColumnFilters: initialShowFilters,
//             showGlobalFilter: initialShowGlobalFilter,
//             columnPinning: {
//                 left: ['mrt-row-expand', 'mrt-row-select'],
//                 right: ['mrt-row-actions'],
//             },
//             pagination: {
//                 pageSize: 5,
//             },
//         },
//         paginationDisplayMode: 'pages',
//         positionToolbarAlertBanner: 'bottom',
//         muiSearchTextFieldProps: {
//             size: 'small',
//             variant: 'outlined',
//         },
//         muiPaginationProps: {
//             color: 'secondary',
//             rowsPerPageOptions,
//             shape: 'rounded',
//             variant: 'outlined',
//         },
//         renderTopToolbar: ({ table }) => (
//             <Box
//                 sx={(theme) => ({
//                     backgroundColor: lighten(theme.palette.background.default, 0.05),
//                     display: 'flex',
//                     gap: '0.5rem',
//                     p: '8px',
//                     justifyContent: 'space-between',
//                 })}
//             >
//                 <Box sx={{ display: 'flex', gap: '0.5rem', alignItems: 'center'}}>
//                     <MRT_GlobalFilterTextField table={table} />
//                     <MRT_ToggleFiltersButton table={table} />
//                 </Box>
//             </Box>
//         ),
//     });
//
//     return (
//         <Box sx={{ width: '85%', margin: 'auto' }}>
//             <MaterialReactTable table={table} />
//         </Box>
//     );
// };
//
// // Date Picker Imports - these should just be in your Context Provider
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
//
// const CustomizedTable = () => {
//     const [data, setData] = useState([]);
//
//     useEffect(() => {
//         // Fetch data from your backend API
//         const fetchData = async () => {
//             try {
//                 const response = await fetch('https://jsonplaceholder.typicode.com/users');
//                 const result = await response.json();
//
//                 // Transform the fetched data to match the table structure
//                 const transformedData = result.map(user => ({
//                     firstName: user.name.split(' ')[0],
//                     lastName: user.name.split(' ')[1] || '',
//                     email: user.email,
//                     salary: Math.floor(Math.random() * 100000) + 30000, // Random salary for example purposes
//                     jobTitle: 'Unknown', // Placeholder, as the API doesn't provide job titles
//                     startDate: '2021-01-01', // Placeholder start date
//                     avatar: `https://i.pravatar.cc/150?img=${user.id}`, // Generate random avatar based on user ID
//                 }));
//
//                 setData(transformedData);
//             } catch (error) {
//                 console.error('Error fetching data:', error);
//             }
//         };
//
//         fetchData();
//     }, []);
//
//     return (
//         <LocalizationProvider dateAdapter={AdapterDayjs}>
//             <CustomTable data={data} />
//         </LocalizationProvider>
//     );
// };
//
// export default CustomizedTable;
//
