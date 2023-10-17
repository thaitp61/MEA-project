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
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { toast } from 'react-hot-toast';
import ApiContext from '../context/ApiContext';


const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjI4NWI2OWRiLWE2NmYtNDFiOC1hYTMxLTM5NDRkNWI5MTYxOCIsInR5cGUiOiJBVVRIIiwiZXhwaXJlZEF0IjoxNzAwMTA3Mjg2MjIyLCJpYXQiOjE2OTc1MTUyODZ9.bUR6ovOjT3ukc8fcV-qRUZkp-MXNEvNutdIVjFhH1co"


export default function DataGridDemo() {
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 150 },
        { field: 'code', headerName: 'Số hoá đơn', width: 150 },
        {
            field: 'documentNumber',
            headerName: 'Số chứng từ',
            width: 150,
            editable: true,
        },
        {
            field: 'contractSymbol',
            headerName: 'Ký hiệu hoá đơn',
            width: 150,
            editable: true,
        },
        {
            field: 'startImportDate',
            headerName: 'Ngày bắt đầu',
            width: 150,
            editable: true,
        },
        {
            field: 'startImportDate',
            headerName: 'Ngày bắt đầu',
            width: 150,
            editable: true,
        },
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
            headerName: 'Người tạo',
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
                        icon={<CheckIcon />}
                        label="Accept"
                        className="textPrimary"
                        color="inherit"
                        onClick={() => handleApprovePlan(params.row?.id)}
                    />
                    <GridActionsCellItem
                        icon={<ClearIcon />}
                        label="Reject"
                        color="inherit"
                        onClick={() => handleRejectPlan(params.row?.id)}
                    />
                </div>
            ),
        }
    ];
    // const fetcher = (url: string) => axios.get(url).then(res => res.data);

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
            const response = await ApiContext.get('/import-plan',
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    params: {
                        page: 0,
                        pageSize: 12,
                        filters: [`status||${FilterComparator.EQUAL}||SUBMITTED`],
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
    const planID = "1";
    const ApprovePlan = async (planID: string) => {
        try {
            const response = await axios.put(`https://mea.monoinfinity.net/api/v1/import-plan/${planID}/approve`, null, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            if (response.status === 200) {
                toast.success("Cập nhật thành công");
                getPlan(); // Gọi lại hàm getPlan() để tải lại dữ liệu
            }
        } catch (error) {
            toast.error("Cập nhật thất bại");
            console.error('API Error:', error);
        }
    }
    const handleApprovePlan = (planID: string) => {
        ApprovePlan(planID);
        console.log("Approve PlanID:", planID)
    }
    const RejectPlan = async (planID: string) => {
        try {
            const response = await axios.put(`https://mea.monoinfinity.net/api/v1/import-plan/${planID}/cancel`, null, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            if (response.status === 200) {
                toast.success("Cập nhật thành công");
                getPlan(); // Gọi lại hàm getPlan() để tải lại dữ liệu
            }
        } catch (error) {
            console.error('API Error:', error);
            toast.success("Cập nhật thất bại");
        }
    }
    const handleRejectPlan = (planID: string) => {
        RejectPlan(planID);
        console.log("reject PlanID:", planID)
    }



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
