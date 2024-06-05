import React, { useMemo, useState } from 'react';
import {
    MaterialReactTable,
    useMaterialReactTable,
    MRT_GlobalFilterTextField,
    MRT_ToggleFiltersButton,
} from 'material-react-table';
import { Box, lighten } from '@mui/material';
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
                          onRowClick
                      }) => {

    const [globalFilter, setGlobalFilter] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    const transformedColumns = useMemo(() => {
        const baseColumns = [
            {
                accessorKey: 'id',
                header: 'Id',
                enableClickToCopy: true,
                size: 20,
                Cell: ({ renderedCellValue }) => <Box textAlign="center">{renderedCellValue}</Box>,
            },
            ...columns.filter(col => col.accessorKey !== 'id').map(col => ({
                accessorKey: col.accessorKey,
                header: col.header,
                size: col.size,
                enableClickToCopy: true,
                Cell: ({ renderedCellValue }) => {
                    const value = renderedCellValue;
                    const isMatch = globalFilter && value.toString().toLowerCase().includes(globalFilter.toLowerCase());
                    return (
                        <Box textAlign="left" sx={isMatch ? { backgroundColor: 'yellow' } : {}}>
                            {value}
                        </Box>
                    );
                },
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
    }, [columns, includeProfile, globalFilter]);

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
            },
        },
        renderTopToolbar: ({ table }) => (
            (enableFilters || initialShowGlobalFilter || renderToolbarItems) && (
                <Box
                    sx={(theme) => ({
                        backgroundColor: lighten(theme.palette.background.default, 0.05),
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        p: '8px 20px',
                    })}
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
