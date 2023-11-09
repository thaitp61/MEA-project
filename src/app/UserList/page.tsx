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
import { Button, Card, Checkbox, Container, IconButton, LinearProgress, MenuItem, Paper, Popover, Stack, Tab, TableBody, TableCell, TableRow, Tabs, Typography } from '@mui/material';
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
import Iconify from '../components/iconify';
import { FilterComparator, SortOrder } from '../models/common';
import UpdateModal from '../components/user.update.modal';
import CreateModal from '../components/user.create.modal';
import Link from 'next/link';

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
            width: 200,
        },
        {
            field: 'email',
            headerName: 'Địa chỉ Email',
            width: 200,
        },
        {
            field: 'phone',
            headerName: 'Số điện thoại',
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
            width: 120,
            valueGetter: (params) => params.row.department?.name

        },
        {
            field: 'status',
            headerName: 'Trạng thái',
            width: 120,
            renderCell: (params) => {
                const { value } = params;
                if (value === 'ACTIVE') {
                    return (
                        <Box
                            component="div"
                            sx={{
                                display: 'inline',
                                p: 1,
                                m: 1,
                                bgcolor: 'rgb(0, 167, 111);',
                                color: '#fff',
                                border: '1px solid',
                                borderColor: (theme) =>
                                    theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
                                borderRadius: "12px",
                                fontSize: '0.8rem',
                                fontWeight: 600,
                                width: '90px'
                            }}
                        >
                            HOẠT ĐỘNG
                        </Box>
                    );
                } else if (value === 'INACTIVE') {
                    return (
                        <Button variant="contained" color="error" style={{ width: '90px' }}>
                            DỪNG
                        </Button>
                    );
                }

                return value;
            },
        },
        {
            field: "actions",
            type: "actions",
            width: 80,
            cellClassName: "actions",
            renderCell: (params) => (
                <div>
                    <IconButton onClick={handleOpenMenu(params.row?.id, params.row?.name)}>
                        <Icon icon="eva:more-vertical-fill" />
                    </IconButton>
                </div>
            ),
        }
    ];
    const [users, setUsers] = useState<User[]>([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [userID, setUserID] = useState<string>("");
    const [userName, setUserName] = useState<string>("");
    const [open, setOpen] = React.useState(null);
    const [loading, setLoading] = useState(true);
    const [paginationModel, setPaginationModel] = React.useState({
        page: 0,
        pageSize: 10,
    });
    const [openEditModal, setOpenEditModal] = useState(false);
    const [userDetail, setUserDetail] = useState<IUser | null>(null)
    const [departmentList, setDepartmentList] = useState<IDepartment[]>([]);
    const [openCreateModal, setOpenCreateModal] = useState(false);



    const getUser = async () => {
        try {
            const response = await ApiContext.get('/user',
                {
                    params: {
                        page: paginationModel?.page,
                        pageSize: paginationModel?.pageSize,
                        orderBy: [`updatedAt||${SortOrder.DESC}`],
                    },
                });
            const totalUsers = response?.data?.count
            setTotalUsers(totalUsers)
            const userList = response?.data?.data; // Danh sách người dùng từ API
            setUsers(userList);
            setLoading(false); // Tắt trạng thái loading khi dữ liệu đã được tải

        } catch (error) {
            console.error('Lỗi khi gọi API:', error);
        }
    };
    useEffect(() => {
        getUser();
        setLoading(true);
    }, [paginationModel]);
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


    const [activeTab, setActiveTab] = React.useState('');
    const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
        setActiveTab(newValue);
    };
    //page size
    const handleOpenMenu = (userID: string, userName: string) => (event: any) => {
        setOpen(event.currentTarget);
        setUserID(userID);
        setUserName(userName);
    };
    const handleCloseMenu = () => {
        setOpen(null);
    };

    // const GetUserDetail = async (userID: string) => {
    //     try {
    //         const response = await ApiContext.get(`/user/${userID}`);
    //         const userDetail = response?.data
    //         setUserDetail(userDetail)
    //     } catch (error) {
    //         console.error('API Error:', error);
    //     }
    // }
    const getDepartment = async () => {
        try {
            const response = await ApiContext.get('/department',
                {
                    params: {
                        page: 0,
                        pageSize: 100,
                        filters: [`status||${FilterComparator.EQUAL}||ACTIVE`], // Sử dụng statusFilter nếu nó có giá trị
                        orderBy: [`createdAt||${SortOrder.DESC}`],
                    },
                });
            const departmentList = response?.data?.data; // Danh sách người dùng từ API
            setDepartmentList(departmentList);
        } catch (error) {
            console.error('Lỗi khi gọi API:', error);
        }
    };
    const handleOpenModalEdit = () => {
        // setOpenEditModal(true);
        // GetUserDetail(userID);
        getDepartment();
    };
    const handleOpenModalCreate = () => {
        setOpenCreateModal(true);
        getDepartment();
    }

    /// menu action

    return (
        <>
            <Container maxWidth={false}>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4">Danh sách nhân viên</Typography>
                    <Button variant="contained"
                        color='success'
                        sx={{ backgroundColor: 'rgb(0, 167, 111)', color: '#fff' }}
                        startIcon={<Iconify icon="eva:plus-fill" />}
                        onClick={handleOpenModalCreate}
                    >
                        Tạo mới nhân viên
                    </Button>
                </Stack>
                <Card>
                    <Tabs value={activeTab} onChange={handleTabChange} aria-label="Product status tabs">
                        <Tab label="Tất cả" value="" />
                        <Tab label="Không hoạt động" value="Ban" />
                    </Tabs>
                    <Box sx={{ height: 540, width: '100%' }}>
                        <DataGrid
                            rows={users}
                            columns={columns}
                            paginationModel={paginationModel}
                            onPaginationModelChange={setPaginationModel}
                            pageSizeOptions={[10, 20, 50]}
                            rowCount={totalUsers}
                            slots={{
                                loadingOverlay: LinearProgress,
                            }}
                            loading={loading}
                            paginationMode='server'
                        />
                    </Box>
                </Card>
                <Popover
                    open={!!open}
                    anchorEl={open}
                    onClose={handleCloseMenu}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                    PaperProps={{
                        sx: { width: 140 },
                    }}
                >
                    <MenuItem sx={{ color: '#1976d2' }}>
                        <Iconify icon="eva:eye-fill" sx={{ marginRight: 2 }} />
                        <Link href={`/UserList/${userID}`} passHref
                            style={{
                                textDecoration: 'none',
                                color: '#1976d2',
                            }}
                        >
                            Chi tiết
                        </Link>
                    </MenuItem>
                    <MenuItem sx={{ color: 'error.main' }}>
                        <Iconify icon="eva:trash-2-outline" sx={{ marginRight: 2 }} />
                        Khoá
                    </MenuItem>
                </Popover>
            </Container>
            {/* <UpdateModal
                showModalUpdate={openEditModal}
                setShowModalUpdate={setOpenEditModal}
                user={userDetail}
                setUser={setUserDetail}
                setOpen={setOpen}
                getUser={getUser}
                departmentList={departmentList}
            /> */}
            <CreateModal
                showModalCreate={openCreateModal}
                setShowModalCreate={setOpenCreateModal}
                departmentList={departmentList}
                getUser={getUser}
            />
        </>

    );
}
