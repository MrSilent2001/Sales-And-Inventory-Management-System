import React, { useMemo, useState } from 'react';
import {
    MaterialReactTable,
    useMaterialReactTable,
    MRT_GlobalFilterTextField,
    MRT_ToggleFiltersButton,
} from 'material-react-table';
import { Box, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const DynamicTable = ({
                          columns,
                          data,
                          enableFilters = true,
                          enableSorting = true,
                          initialShowFilters = false,
                          initialShowGlobalFilter = true,
                          rowsPerPageOptions = [5, 10, 15],
                          createActions = null,
                          includeProfile = false,
                          renderToolbarItems = null,
                          onRowClick,
                      }) => {
    const [globalFilter, setGlobalFilter] = useState('');
    const navigate = useNavigate();
    const theme = useTheme();

    const transformedColumns = useMemo(() => {
        const baseColumns = [
            ...columns.filter(col => col.accessorKey !== 'id').map(col => ({
                accessorKey: col.accessorKey,
                header: col.header,
                size: col.size,
                enableClickToCopy: true,
                Cell: col.cellRenderer || (({ renderedCellValue }) => {
                    const value = renderedCellValue;
                    const isMatch = globalFilter && value.toString().toLowerCase().includes(globalFilter.toLowerCase());
                    return (
                        <Box textAlign="left" sx={isMatch ? { backgroundColor: theme.palette.warning.light } : {}}>
                            {value}
                        </Box>
                    );
                }),
            }))
        ];

        if (includeProfile) {
            baseColumns.splice(1, 0, {
                accessorKey: 'username',
                header: 'Name',
                enableClickToCopy: true,
                Cell: ({ row }) => (
                    <Box display="flex" alignItems="center">
                        <img
                            src={row.original.profilePicture}
                            alt="Profile"
                            style={{ width: 40, height: 40, borderRadius: '50%', marginRight: 8 }}
                        />
                        <span>{row.original.username}</span>
                    </Box>
                ),
                size: 100,
            });
        }

        return baseColumns;
    }, [columns, includeProfile, globalFilter, theme.palette.warning.light]);

    const table = useMaterialReactTable({
        columns: transformedColumns,
        data,
        enableColumnFilterModes: enableFilters,
        enableColumnOrdering: enableSorting,
        enableGrouping: true,
        enableColumnPinning: true,
        enableFacetedValues: true,
        enableRowActions: Boolean(createActions),
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
        muiTableHeadCellProps: {
            sx: {
                textAlign: 'center',
                cursor: 'pointer',
                backgroundColor: '#ffffff', // Light gray for header background
                color: theme.palette.text.primary,
                fontWeight: 'bold',
                boxShadow: 'none', // Remove shadow
                borderBottom: 'none', // Remove border
                padding: '10px 16px', // Add padding
            },
        },
        muiTableBodyCellProps: {
            sx: {
                backgroundColor: '#ffffff', // Standardize white color
                boxShadow: 'none', // Remove shadow
                borderBottom: 'none', // Remove border
                padding: '10px 16px', // Add padding
            },
        },
        renderTopToolbar: ({ table }) => (
            (enableFilters || initialShowGlobalFilter || renderToolbarItems) && (
                <Box
                    sx={{
                        backgroundColor: '#ffffff', // Standardize white color
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        p: '8px 20px',
                        borderBottom: `1px solid ${theme.palette.divider}`,
                        boxShadow: 'none', // Remove shadow
                    }}
                >
                    <Box sx={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        {initialShowGlobalFilter && <MRT_GlobalFilterTextField table={table} />}
                        {enableFilters && <MRT_ToggleFiltersButton table={table} />}
                    </Box>
                    {renderToolbarItems && renderToolbarItems(table)}
                </Box>
            )
        ),
        renderRowActions: createActions ? ({ row }) => createActions(row.original.id, row.original.lastLogin) : undefined,
        muiTableBodyRowProps: ({ row }) => ({
            onClick: () => {
                if (onRowClick) {
                    onRowClick(row.original);
                }
            },
            sx: {
                '& .MuiCheckbox-root': {
                    margin: 'auto',
                    cursor: 'pointer',
                },
                cursor: 'pointer',
                '&:hover': {
                    backgroundColor: theme.palette.action.hover,
                },
                backgroundColor: '#ffffff', // Standardize white color
                boxShadow: 'none', // Remove shadow
                '&:not(:last-child)': {
                    borderBottom: '1px solid #e0e0e0', // Light border between rows
                },
                '& td:first-of-type': {
                    borderLeft: 'none', // Remove border for the first column
                    width: '40px', // Reduce width of the checkbox column
                    backgroundColor: '#ffffff', // Ensure checkbox column is pure white
                },
                '& td': {
                    borderLeft: 'none', // Remove border between columns
                },
            },
        }),
    });

    return (
        <Box sx={{ width: '85%', margin: 'auto' }}>
            <MaterialReactTable table={table} />
        </Box>
    );
};

export default DynamicTable;
