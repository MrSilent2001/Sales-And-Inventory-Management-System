import React, { useMemo } from 'react';
import {
    MaterialReactTable,
    useMaterialReactTable,
    MRT_GlobalFilterTextField,
    MRT_ToggleFiltersButton,
} from 'material-react-table';
import { Box, lighten } from '@mui/material';

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
                      }) => {

    const transformedColumns = useMemo(() => {
        const baseColumns = [
            {
                accessorKey: 'id',
                header: 'Id',
                size: 20,
                Cell: ({ cell }) => <Box textAlign="center">{cell.getValue()}</Box>,
            },
            ...columns.filter(col => col.accessorKey !== 'id').map(col => ({
                accessorKey: col.accessorKey,
                header: col.header,
                size: col.size,
                Cell: ({ cell }) => <Box textAlign="center">{cell.getValue()}</Box>,
            }))
        ];

        if (includeProfile) {
            baseColumns.splice(1, 0, {
                accessorKey: 'profile',
                header: 'Profile',
                Cell: ({ cell }) => (
                    <Box display="flex" alignItems="center" justifyContent="center">
                        <img
                            src={cell.row.original.profilePicture}
                            alt="Profile"
                            style={{ width: 40, height: 40, borderRadius: '50%', marginRight: 8 }}
                        />
                        <span>{cell.row.original.username}</span>
                    </Box>
                ),
                size: 100,
            });
        }

        return baseColumns;
    }, [columns, includeProfile]);

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
                <Box sx={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <MRT_GlobalFilterTextField table={table} />
                    <MRT_ToggleFiltersButton table={table} />
                </Box>
            </Box>
        ),
        renderRowActions: createActions ? ({ row }) => createActions(row.original.id, row.original.lastLogin) : undefined,
    });

    return (
        <Box sx={{ width: '85%', margin: 'auto' }}>
            <MaterialReactTable table={table} />
        </Box>
    );
};

export default DynamicTable;
