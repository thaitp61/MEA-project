"use client"
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams, GridActionsCellItem } from '@mui/x-data-grid';
import BaseLayout from '../components/BaseLayout';
import { Button, Card, Checkbox, Container, IconButton, MenuItem, Paper, Popover, Stack, Tab, TableBody, TableCell, TableRow, Tabs, Typography } from '@mui/material';
import { Icon } from '@iconify/react';
import axios from 'axios'
import useSWR from "swr";
import React, { useState, useEffect } from 'react';
import { FilterComparator, SortOrder } from '../models/common';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";

const columns: GridColDef[] = [
    { field: 'code', headerName: 'ID', width: 150 },
    {
        field: 'startImportDate',
        headerName: 'Ngày bắt đầu',
        width: 150,
        editable: true,
    },
    {
        field: 'endImportDate',
        headerName: 'Ngày kết thúc',
        width: 150,
        editable: true,
    },
    {
        field: 'name',
        headerName: 'Tên',
        type: "string",
        width: 150,
        valueGetter: (params) => params.row.createdBy.name
    },

    {
        field: "actions",
        type: "actions",
        headerName: "Actions",
        width: 150,
        cellClassName: "actions",
        renderCell: (params) => (
            <div>
                <GridActionsCellItem
                    icon={<EditIcon />}
                    label="Edit"
                    className="textPrimary"
                    color="inherit"
                />
                <GridActionsCellItem
                    icon={<DeleteIcon />}
                    label="Delete"
                    color="inherit"
                />
            </div>
        ),
    }
];

const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];


export default function DataGridDemo() {
    const fetcher = (url: string) => axios.get(url).then(res => res.data);

    // const { data, error, isLoading } = useSWR(
    //     ["https://mea.monoinfinity.net/api/v1/import-plan",
    //         {
    //             headers: {
    //                 Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQwNzdkN2ZlLTI4MGUtZWRiYi1kYzVkLWJjNTY0ZmQ1ZTQ2YyIsInR5cGUiOiJBVVRIIiwiZXhwaXJlZEF0IjoxNzAwMDY2MzU2ODA3LCJpYXQiOjE2OTc0NzQzNTZ9.7yjyNqwWNEgvyw-wnu4mUaQHfp5NsNIEEbM6tv4C73k',
    //             },
    //             params: {
    //                 page: 0,
    //                 pageSize: 12,
    //                 filters: [`status||${FilterComparator.EQUAL}||DRAFT`],
    //                 orderBy: [],
    //             },
    //         }
    //     ],
    //     fetcher,
    //     {
    //         initialData: [], // Dữ liệu ban đầu
    //         revalidateOnFocus: false,
    //         revalidateOnReconnect: false,
    //     }
    // );
    const [plans, setPlans] = useState([]);

    const getPlan = async () => {
        try {
            const response = await axios.get('https://mea.monoinfinity.net/api/v1/import-plan',
                {
                    headers: {
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQwNzdkN2ZlLTI4MGUtZWRiYi1kYzVkLWJjNTY0ZmQ1ZTQ2YyIsInR5cGUiOiJBVVRIIiwiZXhwaXJlZEF0IjoxNzAwMDY2MzU2ODA3LCJpYXQiOjE2OTc0NzQzNTZ9.7yjyNqwWNEgvyw-wnu4mUaQHfp5NsNIEEbM6tv4C73k',
                    },
                    params: {
                        page: 0,
                        pageSize: 12,
                        filters: [`status||${FilterComparator.EQUAL}||DRAFT`],
                        orderBy: [],
                    },
                });
            const planList = response?.data?.data; // Danh sách người dùng từ API
            setPlans(planList);
        } catch (error) {
            console.error('Lỗi khi gọi API:', error);
        }
    };
    useEffect(() => {
        getPlan();
    }, []);

    console.log("data:", plans)

    const [open, setOpen] = React.useState(null);

    const [activeTab, setActiveTab] = React.useState('');
    const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
        setActiveTab(newValue);
    };
    const handleCloseMenu = () => {
        setOpen(null);
    };
    const handleOpenMenu = (event: any) => {
        setOpen(event.currentTarget);
    };
    // if (isLoading) {
    //     return <div>Loading....</div>
    // }
    return (
        <BaseLayout>
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4">Danh sách kế hoạch mua sắm</Typography>

                    <Button variant="contained" color="inherit">
                        Tạo kế hoạch mua sắm
                    </Button>
                </Stack>
                <Card>
                    <Tabs value={activeTab} onChange={handleTabChange} aria-label="Product status tabs">
                        <Tab label="Tất cả" value="1" />
                        <Tab label="Đã duyệt" value="2" />
                        <Tab label="Đã hoàn thành" value="3" />
                    </Tabs>
                    <Box sx={{ height: 400, width: '100%' }}>
                        <DataGrid
                            rows={plans}
                            columns={columns}
                            initialState={{
                                pagination: {
                                    paginationModel: {
                                        pageSize: 5,
                                    },
                                },
                            }}
                            pageSizeOptions={[5]}
                            checkboxSelection
                            disableRowSelectionOnClick
                        />
                    </Box>

                </Card>
            </Container>
            {/* <Popover
                open={Boolean(open)}
                anchorEl={open}
                onClose={handleCloseMenu}
                anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                PaperProps={{
                    sx: {
                        p: 1,
                        width: 140,
                        '& .MuiMenuItem-root': {
                            px: 1,
                            typography: 'body2',
                            borderRadius: 0.75,
                        },
                    },
                }}
            >
                <MenuItem>
                    <Icon icon={'eva:edit-fill'} />
                    Edit
                </MenuItem>

                <MenuItem>
                    <Icon icon={'eva:edit-fill'} />
                    Edit
                </MenuItem>
            </Popover> */}
        </BaseLayout>

    );
}
