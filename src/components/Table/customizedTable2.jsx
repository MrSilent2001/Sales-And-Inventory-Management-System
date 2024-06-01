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

import React, { useState, useEffect,useMemo } from 'react';

// MRT Imports
import {
    MaterialReactTable,
    useMaterialReactTable,
    MRT_GlobalFilterTextField,
    MRT_ToggleFiltersButton,
} from 'material-react-table';

// Material UI Imports
import {
    Box,
    lighten,
} from '@mui/material';

const CustomTable = ({ data, enableFilters = true, enableSorting = true, initialShowFilters = false, initialShowGlobalFilter = true, rowsPerPageOptions = [5, 10, 15] }) => {
    const columns = useMemo(
        () => [
            {
                accessorFn: (row) => `${row.firstName} ${row.lastName}`,
                id: 'name',
                header: 'Name',
                size: 250,
                Cell: ({ renderedCellValue, row }) => (
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                        }}
                    >
                        <img
                            alt="avatar"
                            height={30}
                            src={row.original.avatar}
                            loading="lazy"
                            style={{ borderRadius: '50%' }}
                        />
                        <span>{renderedCellValue}</span>
                    </Box>
                ),
            },
            {
                accessorKey: 'email',
                enableClickToCopy: true,
                filterVariant: 'autocomplete',
                header: 'Email',
                size: 300,
            },
            {
                accessorKey: 'salary',
                filterFn: 'between',
                header: 'Salary',
                size: 200,
                Cell: ({ cell }) => (
                    <Box
                        component="span"
                        sx={(theme) => ({
                            backgroundColor:
                                cell.getValue() < 50000
                                    ? theme.palette.error.dark
                                    : cell.getValue() >= 50000 && cell.getValue() < 75000
                                        ? theme.palette.warning.dark
                                        : theme.palette.success.dark,
                            borderRadius: '0.25rem',
                            color: '#fff',
                            maxWidth: '9ch',
                            p: '0.25rem',
                        })}
                    >
                        {cell.getValue()?.toLocaleString?.('en-US', {
                            style: 'currency',
                            currency: 'USD',
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                        })}
                    </Box>
                ),
            },
            {
                accessorKey: 'jobTitle',
                header: 'Job Title',
                size: 350,
            },
            {
                accessorFn: (row) => new Date(row.startDate),
                id: 'startDate',
                header: 'Start Date',
                filterVariant: 'date',
                filterFn: 'lessThan',
                sortingFn: 'datetime',
                Cell: ({ cell }) => cell.getValue()?.toLocaleDateString(),
                Header: ({ column }) => <em>{column.columnDef.header}</em>,
                muiFilterTextFieldProps: {
                    sx: {
                        minWidth: '250px',
                    },
                },
            },
        ],
        [],
    );

    const table = useMaterialReactTable({
        columns,
        data,
        enableColumnFilterModes: enableFilters,
        enableColumnOrdering: enableSorting,
        enableGrouping: true,
        enableColumnPinning: true,
        enableFacetedValues: true,
        enableRowActions: true,
        enableRowSelection: true,
        initialState: {
            showColumnFilters: initialShowFilters,
            showGlobalFilter: initialShowGlobalFilter,
            columnPinning: {
                left: ['mrt-row-expand', 'mrt-row-select'],
                right: ['mrt-row-actions'],
            },
            pagination: {
                pageSize: 5,
            },
        },
        paginationDisplayMode: 'pages',
        positionToolbarAlertBanner: 'bottom',
        muiSearchTextFieldProps: {
            size: 'small',
            variant: 'outlined',
        },
        muiPaginationProps: {
            color: 'secondary',
            rowsPerPageOptions,
            shape: 'rounded',
            variant: 'outlined',
        },
        renderTopToolbar: ({ table }) => (
            <Box
                sx={(theme) => ({
                    backgroundColor: lighten(theme.palette.background.default, 0.05),
                    display: 'flex',
                    gap: '0.5rem',
                    p: '8px',
                    justifyContent: 'space-between',
                })}
            >
                <Box sx={{ display: 'flex', gap: '0.5rem', alignItems: 'center'}}>
                    <MRT_GlobalFilterTextField table={table} />
                    <MRT_ToggleFiltersButton table={table} />
                </Box>
            </Box>
        ),
    });

    return (
        <Box sx={{ width: '85%', margin: 'auto' }}>
            <MaterialReactTable table={table} />
        </Box>
    );
};

// Date Picker Imports - these should just be in your Context Provider
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const CustomizedTable = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        // Fetch data from your backend API
        const fetchData = async () => {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/users');
                const result = await response.json();

                // Transform the fetched data to match the table structure
                const transformedData = result.map(user => ({
                    firstName: user.name.split(' ')[0],
                    lastName: user.name.split(' ')[1] || '',
                    email: user.email,
                    salary: Math.floor(Math.random() * 100000) + 30000, // Random salary for example purposes
                    jobTitle: 'Unknown', // Placeholder, as the API doesn't provide job titles
                    startDate: '2021-01-01', // Placeholder start date
                    avatar: `https://i.pravatar.cc/150?img=${user.id}`, // Generate random avatar based on user ID
                }));

                setData(transformedData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <CustomTable data={data} />
        </LocalizationProvider>
    );
};

export default CustomizedTable;

