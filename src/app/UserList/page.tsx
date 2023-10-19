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
        { field: 'id', headerName: 'Mã nhân viên', width: 150 },
        {
            field: 'name',
            headerName: 'Họ và tên',
            width: 150,
        },
        {
            field: 'email',
            headerName: 'Địa chỉ Email',
            width: 150,
        },
        {
            field: 'phone',
            headerName: 'Số điện thoại',
            width: 150,
        },
        {
            field: 'address',
            headerName: 'Địa chỉ',
            width: 150,
        },
        {
            field: 'role',
            headerName: 'Vai trò',
            width: 150,
            valueGetter: (params) => params.row.role?.name
        },
        {
            field: 'department',
            headerName: 'Phòng ban',
            width: 150,
            valueGetter: (params) => params.row.department?.name

        },
        {
            field: 'startWorkDate',
            headerName: 'Ngày làm việc',
            width: 150,
            valueGetter: (params) => {
                const startImportDateValue = params.row.startImportDate;

                if (startImportDateValue) {
                    const dateObject = new Date(startImportDateValue);
                    const day = dateObject.getUTCDate();
                    const month = dateObject.getUTCMonth() + 1;
                    const year = dateObject.getUTCFullYear();
                    return `${day}/${month}/${year}`;
                }

                return ''; // Handle the case where 'endImportDate' is not defined or falsy
            },
        },
        {
            field: 'endImportDate',
            headerName: 'Ngày kết thúc',
            width: 150,
            valueGetter: (params) => {
                const endImportDateValue = params.row.endImportDate;

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
            field: "actions",
            type: "actions",
            headerName: "Chức năng",
            width: 150,
            cellClassName: "actions",
            renderCell: (params) => (
                <div>
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
    const [users, setUsers] = useState<User[]>([]);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [totalUsers, setTotalUsers] = useState(0);

    const getUser = async () => {
        try {
            const response = await ApiContext.get('/user',
                {
                    params: {
                        page: 0,
                        pageSize: 50,
                    },
                });
            const totalUsers = response?.data?.count
            setTotalUsers(totalUsers)
            const userList = response?.data?.data; // Danh sách người dùng từ API
            setUsers(userList);
            // setPlans(planList);
        } catch (error) {
            console.error('Lỗi khi gọi API:', error);
        }
    };
    useEffect(() => {
        getUser();
    }, [page, pageSize]);
    const DeleteUser = async (userID: string) => {
        try {
            const response = await ApiContext.delete(`https://mea.monoinfinity.net/api/v1/user/${userID}`);
            if (response.status === 200) {
                toast.success("Cập nhật thành công");
                getUser(); // Gọi lại hàm getPlan() để tải lại dữ liệu
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
                        Tạo mới nhân viên
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
                            rows={users}
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
