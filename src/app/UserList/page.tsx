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
            headerName: 'Ngày bắt đầu',
            width: 150,
            valueGetter: (params) => {
                const startWorkDateValue = params.row.startWorkDate;

                if (startWorkDateValue) {
                    const dateObject = new Date(startWorkDateValue);
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
                    <IconButton onClick={handleOpenMenu(params.row?.id, params.row?.name)}>
                        <Icon icon="eva:more-vertical-fill" />
                    </IconButton>
                </div>
            ),
        }
    ];
    const [users, setUsers] = useState<User[]>([]);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [totalUsers, setTotalUsers] = useState(0);
    const [userID, setUserID] = useState<string>("");
    const [userName, setUserName] = useState<string>("");
    const [open, setOpen] = React.useState(null);
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [loading, setLoading] = useState(true);
    const [paginationModel, setPaginationModel] = React.useState({
        page: 0,
        pageSize: 10,
    });
    const [openEditModal, setOpenEditModal] = useState(false);
    const [userDetail, setUserDetail] = useState<IUser | null>(null)
    const [departmentList, setDepartmentList] = useState<IDepartment[]>([]);
    const handleOpen = () => setOpenModal(true);
    const handleClose = () => {
        setOpenModal(false)
        setOpen(null)
    };


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

    const GetUserDetail = async (userID: string) => {
        try {
            const response = await ApiContext.get(`/user/${userID}`);
            const userDetail = response?.data
            setUserDetail(userDetail)
        } catch (error) {
            console.error('API Error:', error);
        }
    }
    const getDepartment = async () => {
        try {
            const response = await ApiContext.get('/department',
                {
                    params: {
                        page: 0,
                        pageSize: 100,
                        filters: [`status||${FilterComparator.EQUAL}||ACTIVE`], // Sử dụng statusFilter nếu nó có giá trị

                    },
                });
            const departmentList = response?.data?.data; // Danh sách người dùng từ API
            setDepartmentList(departmentList);
        } catch (error) {
            console.error('Lỗi khi gọi API:', error);
        }
    };
    const handleOpenModalEdit = () => {
        setOpenEditModal(true);
        GetUserDetail(userID);
        getDepartment();
    };

    /// menu action

    return (
        <BaseLayout>
            <Container maxWidth={false}>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4">Danh sách nhân viên</Typography>
                    <Button variant="contained"
                        color='success'
                        sx={{ backgroundColor: 'rgb(0, 167, 111)', color: '#fff' }}
                        startIcon={<Iconify icon="eva:plus-fill" />}
                    // onClick={handleOpenCreateDeparment}
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
                    <MenuItem onClick={handleOpenModalEdit}>
                        <Iconify icon="eva:eye-fill" sx={{ marginRight: 2 }} />
                        Xem
                    </MenuItem>
                    <MenuItem sx={{ color: 'error.main' }}>
                        <Iconify icon="eva:trash-2-outline" sx={{ marginRight: 2 }} />
                        Khoá
                    </MenuItem>
                </Popover>
            </Container>
            <UpdateModal
                showModalUpdate={openEditModal}
                setShowModalUpdate={setOpenEditModal}
                user={userDetail}
                setUser={setUserDetail}
                setOpen={setOpen}
                getUser={getUser}
                departmentList={departmentList}
            />
        </BaseLayout>

    );
}
