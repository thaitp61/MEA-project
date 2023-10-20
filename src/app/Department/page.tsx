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
import { Button, Card, Checkbox, Container, IconButton, LinearProgress, MenuItem, Modal, Paper, Popover, PopoverVirtualElement, Stack, Tab, TableBody, TableCell, TableRow, Tabs, Typography } from '@mui/material';
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
import { CiKeyboard } from 'react-icons/ci';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: 2, // Thêm bo cong 4px
    border: 'none', // Loại bỏ viền
    p: 4,
};
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
export default function DepartmentList() {

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
                    <IconButton onClick={handleOpenMenu(params.row?.id, params.row?.name)}>
                        <Icon icon="eva:more-vertical-fill" />
                    </IconButton>
                </div>
            ),
        }
    ];
    const [departments, setDepartments] = useState<User[]>([]);
    // const [totalUsers, setTotalUsers] = useState(0);
    const [departmentID, setDepartmentID] = useState('');
    const [departmentName, setDepartmentName] = useState('');
    const [totalDeparment, setTotalDepartment] = useState(0);

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
    // useEffect(() => {
    //     getDepartment();
    // }, [page, pageSize]);
    const fetcher = async (url: string) => {
        try {
            const response = await ApiContext.get(url);
            setTotalDepartment(response?.data?.count);
            setDepartments(response?.data?.data)
            return response?.data?.data;
        } catch (error) {
            console.error('Lỗi khi gọi API:', error);
            throw error;
        }
    }
    const [paginationModel, setPaginationModel] = React.useState({
        page: 0,
        pageSize: 10,
    });
    const { data, error, isLoading } = useSWR(
        `/department?page=${paginationModel?.page}&pageSize=${paginationModel?.pageSize}`,
        fetcher,
        {
            initialData: [], // Dữ liệu ban đầu
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        }
    );

    const DeleteDepartment = async (deparmentID: string) => {
        try {
            const response = await ApiContext.delete(`/department/${deparmentID}`);
            if (response.status === 200) {
                toast.success("Cập nhật thành công");
                getDepartment(); // Gọi lại hàm getPlan() để tải lại dữ liệu
            }
        } catch (error) {
            console.error('API Error:', error);
            toast.success("Cập nhật thất bại");
        }
    }

    const [open, setOpen] = React.useState(null);
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [value, setValue] = useState("");

    const handleOpen = () => setOpenModal(true);
    const handleClose = () => setOpenModal(false);

    const handleSubmit = () => {
        DeleteDepartment(departmentID);
        handleClose();
        setOpen(null);
    }

    const [activeTab, setActiveTab] = React.useState('');
    const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
        setActiveTab(newValue);
    };

    const handleCloseMenu = () => {
        setOpen(null);
    };
    const handleOpenMenu = (departmentID: string, departmentName: string) => (event: any) => {
        setOpen(event.currentTarget);
        setDepartmentID(departmentID);
        setDepartmentName(departmentName);
    };
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
                            paginationModel={paginationModel}
                            onPaginationModelChange={setPaginationModel}
                            pageSizeOptions={[10, 20, 50]}
                            rowCount={totalDeparment}
                            slots={{
                                loadingOverlay: LinearProgress,
                            }}
                            loading={isLoading}
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
                    <MenuItem onClick={handleCloseMenu}>
                        <Iconify icon="eva:edit-fill" sx={{ marginRight: 2 }} />
                        Edit
                    </MenuItem>

                    <MenuItem onClick={handleOpen} sx={{ color: 'error.main' }}>
                        <Iconify icon="eva:trash-2-outline" sx={{ marginRight: 2 }} />
                        Delete
                    </MenuItem>
                    <Modal
                        open={openModal}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"

                    >
                        <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Bạn có chắc chắn muốn xoá phòng ban <strong>{departmentName}</strong> không ?
                            </Typography>
                            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                                <Button onClick={handleClose} sx={{ mr: 2 }} >
                                    Đóng
                                </Button>

                                <Button onClick={handleSubmit} variant="contained" color="error">
                                    Xác nhận
                                </Button>
                            </Box>
                        </Box>
                    </Modal>
                </Popover>
            </Container>
        </BaseLayout>

    );
}
