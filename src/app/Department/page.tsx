"use client"
import Box from '@mui/material/Box';
import {
    DataGrid, GridColDef, GridValueGetterParams, GridActionsCellItem,
    useGridApiContext,
    useGridSelector,
    gridPageCountSelector,
    GridPagination,
} from '@mui/x-data-grid';
import BaseLayout from '../components/BaseLayout';
import { Button, Card, Checkbox, Container, IconButton, MenuItem, Paper, Popover, Stack, Tab, TableBody, TableCell, TableRow, Tabs, Typography } from '@mui/material';
import { Icon } from '@iconify/react';
import axios from 'axios'
import useSWR from "swr";
import React, { useState, useEffect } from 'react';
import BlockIcon from '@mui/icons-material/Block';
import ClearIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import ViewDetailIcon from '@mui/icons-material/Visibility';
import { toast } from 'react-hot-toast';
import ApiContext from '../context/ApiContext';
import MuiPagination from '@mui/material/Pagination';
import { TablePaginationProps } from '@mui/material/TablePagination';

function Pagination({
    page,
    onPageChange,
    className,
}: Pick<TablePaginationProps, 'page' | 'onPageChange' | 'className'>) {
    const apiRef = useGridApiContext();
    const pageCount = useGridSelector(apiRef, gridPageCountSelector);

    return (
        <MuiPagination
            color="primary"
            className={className}
            count={pageCount}
            page={page + 1}
            onChange={(event, newPage) => {
                onPageChange(event as any, newPage - 1);
            }}
        />
    );
}

function CustomPagination(props: any) {
    return <GridPagination ActionsComponent={Pagination} {...props} />;
}
interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    role: string;
    department: string;
    startWorkDate: string;
    endImportDate: string;
}
export default function UserList() {
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'Mã phòng ban', width: 150 },
        {
            field: 'name',
            headerName: 'Tên phòng ban',
            width: 200,
        },
        {
            field: 'departments',
            headerName: 'Mô tả',
            type: "string",
            width: 300,
        },
        {
            field: 'createdAt',
            headerName: 'Ngày tạo',
            width: 150,
            valueGetter: (params) => {
                const endImportDateValue = params.row.createdAt;

                if (endImportDateValue) {
                    const dateObject = new Date(endImportDateValue);
                    const day = dateObject.getUTCDate();
                    const month = dateObject.getUTCMonth() + 1;
                    const year = dateObject.getUTCFullYear();
                    return `${day}/${month}/${year}`;
                }

                return ''; // Handle the case where 'endImportDate' is not defined or falsy
            },
        },
        {
            field: 'status',
            headerName: 'Trạng thái',
            width: 150,
        },
        {
            field: "actions",
            type: "actions",
            headerName: "Chức năng",
            width: 150,
            cellClassName: "actions",
            renderCell: (params) => (
                <div>
                    <GridActionsCellItem
                        icon={<ViewDetailIcon />}
                        label="View"
                        className="textPrimary"
                        color="inherit"
                    // onClick={() => handleApprovePlan(params.row?.id)}
                    />
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        color="inherit"
                    // onClick={() => handleApprovePlan(params.row?.id)}
                    />
                    <GridActionsCellItem
                        icon={<BlockIcon />}
                        label="Delete"
                        color="inherit"
                        onClick={() => handleDeleteUser(params.row?.id)}
                    />
                </div>
            ),
        }
    ];
    const [departments, setDepartments] = useState<User[]>([]);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    // const [totalUsers, setTotalUsers] = useState(0);

    const getDepartment = async () => {
        try {
            const response = await ApiContext.get('/department',
                {
                    params: {
                        page: 0,
                        pageSize: 50,
                    },
                });
            const departmentList = response?.data?.data; // Danh sách người dùng từ API
            setDepartments(departmentList);
            // setPlans(planList);
        } catch (error) {
            console.error('Lỗi khi gọi API:', error);
        }
    };
    useEffect(() => {
        getDepartment();
    }, [page, pageSize]);
    const DeleteUser = async (userID: string) => {
        try {
            const response = await ApiContext.delete(`https://mea.monoinfinity.net/api/v1/user/${userID}`);
            if (response.status === 200) {
                toast.success("Cập nhật thành công");
                getDepartment(); // Gọi lại hàm getPlan() để tải lại dữ liệu
            }
        } catch (error) {
            console.error('API Error:', error);
            toast.success("Cập nhật thất bại");
        }
    }
    const handleDeleteUser = (userID: string) => {
        DeleteUser(userID);
        console.log("reject PlanID:", userID)
    }

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
    //page size
    const [paginationModel, setPaginationModel] = React.useState({
        pageSize: pageSize,
        page: page,
    });



    return (
        <BaseLayout>
            <Container maxWidth={false}>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4">Danh sách nhân viên</Typography>

                    <Button variant="contained" color="inherit">
                        Tạo mới phòng ban
                    </Button>
                </Stack>
                <Card>
                    <Tabs value={activeTab} onChange={handleTabChange} aria-label="Product status tabs">
                        <Tab label="Tất cả" value="1" />
                        <Tab label="Chưa duyệt" value="2" />
                        <Tab label="Đã duyệt" value="3" />
                        <Tab label="Đã hoàn thành" value="4" />
                    </Tabs>
                    <Box sx={{ height: 540, width: '100%' }}>
                        <DataGrid
                            rows={departments}
                            columns={columns}
                            slots={{
                                pagination: CustomPagination,
                            }}
                            paginationModel={paginationModel}
                            onPaginationModelChange={setPaginationModel}
                            pageSizeOptions={[10, 20, 50]}

                        />
                    </Box>
                </Card>
            </Container>
        </BaseLayout>

    );
}
