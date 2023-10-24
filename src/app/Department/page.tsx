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
import { Button, Card, Checkbox, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton, LinearProgress, MenuItem, Modal, Paper, Popover, PopoverVirtualElement, Stack, Tab, TableBody, TableCell, TableRow, Tabs, TextField, Typography } from '@mui/material';
import { Icon } from '@iconify/react';
import axios from 'axios'
import useSWR, { mutate } from "swr";
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
import "./layout.css"
import { FilterComparator, SortOrder } from '../models/common';
import UpdateModal from '../components/deparment.update.modal';

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
interface Department {
    id: string;
    createdAt: string;
    updatedAt: string;
    isDeleted: string;
    isRequiredUpdate: string;
    name: string;
    description: string;
    status: string;
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
            field: 'description',
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
    const [departments, setDepartments] = useState<Department[]>([]);
    // const [totalUsers, setTotalUsers] = useState(0);
    const [departmentID, setDepartmentID] = useState<string>('');
    const [departmentName, setDepartmentName] = useState('');
    const [totalDeparment, setTotalDepartment] = useState(0);
    const [openEditDeparment, setOpenEditDeparment] = useState(false);
    const [openCreateDeparment, setCreateDeparment] = useState(false);
    const [departmentInformation, setDepartmentInformation] = useState<IDepartment | null>(null)
    const [departmentNameInfor, setDepartmentNameInfor] = useState<string>("");
    const [departmentNameCreate, setDepartmentNameCreate] = useState<string>("");
    const [deparmentDescriptionCreate, setDeparmentDescriptionCreate] = useState<string>("");
    const [deparmentDescription, setDeparmentDescription] = useState<string>("");
    const [loading, setLoading] = useState(true);

    const [open, setOpen] = React.useState(null);
    const [openModal, setOpenModal] = useState<boolean>(false);

    const handleOpen = () => setOpenModal(true);
    const handleClose = () => {
        setOpenModal(false)
        setOpen(null)
    };
    const [paginationModel, setPaginationModel] = React.useState({
        page: 0,
        pageSize: 10,
    });
    const [statusFilter, setStatusFilter] = React.useState(''); // Trạng thái filter mặc định là chuỗi trống


    const getDepartment = async () => {
        try {
            const response = await ApiContext.get('/department',
                {
                    params: {
                        page: paginationModel?.page,
                        pageSize: paginationModel?.pageSize,
                        filters: statusFilter ? [`status||${FilterComparator.EQUAL}||${statusFilter}`] : [], // Sử dụng statusFilter nếu nó có giá trị
                        orderBy: [`updatedAt||${SortOrder.DESC}`],

                    },
                });
            const departmentList = response?.data?.data; // Danh sách người dùng từ API
            const totalDeparment = response?.data?.count
            setDepartments(departmentList);
            setTotalDepartment(totalDeparment);
            setLoading(false); // Tắt trạng thái loading khi dữ liệu đã được tải
            // setPlans(planList);
        } catch (error) {
            console.error('Lỗi khi gọi API:', error);
            setLoading(false);
        }
    };
    useEffect(() => {
        getDepartment();
        setLoading(true);
    }, [paginationModel, statusFilter]);

    // Xoá phòng ban
    const DeleteDepartment = async (deparmentID: string) => {
        try {
            const response = await ApiContext.delete(`/department/${deparmentID}`);
            if (response.status === 200) {
                toast.success("Cập nhật thành công");
                getDepartment();
            }
        } catch (error) {
            console.error('API Error:', error);
            toast.success("Cập nhật thất bại");
        }
    }
    const handleSubmit = () => {
        DeleteDepartment(departmentID);
        handleClose();
        setOpen(null);
    }

    // ---------------------------------
    // Get thông tin phòng ban

    const GetInformationDepartment = async (deparmentID: string) => {
        try {
            const response = await ApiContext.get(`/department/${deparmentID}`);
            const deparmentInfor = response?.data
            setDepartmentInformation(deparmentInfor)
        } catch (error) {
            console.error('API Error:', error);
        }
    }

    const handleOpenEditDeparment = () => {
        setOpenEditDeparment(true);
        GetInformationDepartment(departmentID)
    };
    const handleOpenCreateDeparment = () => {
        setCreateDeparment(true);
    };

    const handleCloseEditDepartment = () => {
        setDepartmentNameInfor("");
        setDeparmentDescription("");
        setOpenEditDeparment(false);
        setOpen(null);
    };
    const handleCloseCreateDepartment = () => {
        setDeparmentDescriptionCreate("");
        setDepartmentNameCreate("");
        setCreateDeparment(false);
        setOpen(null);
    };
    const handleCreateEditDepartment = () => {
        setCreateDeparment(false);
        setOpen(null);
    };

    const handleCreateDepartment = async () => {
        if (!departmentNameCreate) {
            toast.error("Không để trống tên phòng ban!")
            return;
        }
        if (!deparmentDescriptionCreate) {
            toast.error("Không để trống mô tả phòng ban")
            return;
        }
        try {
            const response = await ApiContext.post(`/department`, {
                name: departmentNameCreate,
                description: deparmentDescriptionCreate,
            });
            if (response.status === 201 || response.status === 200) {
                getDepartment();
                toast.success("Cập nhật thành công");
                // Thực hiện các hành động khác sau khi cập nhật thành công
            }
        } catch (error) {
            toast.error("Cập nhật thất bại");
            // Xử lý lỗi khi gọi API
        }
        handleCloseCreateDepartment();
    };

    const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
        // Cập nhật trạng thái statusFilter dựa trên tab được chọn
        if (newValue === 'INACTIVE') {
            setStatusFilter('INACTIVE');
        } else {
            setStatusFilter(''); // Trạng thái khác
        }
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
                    <Typography variant="h4">Danh sách phòng ban</Typography>
                    <Button variant="contained"
                        color='success'
                        sx={{ backgroundColor: 'rgb(0, 167, 111)', color: '#fff' }}
                        startIcon={<Iconify icon="eva:plus-fill" />}
                        onClick={handleOpenCreateDeparment}
                    >
                        Tạo mới phòng ban
                    </Button>
                    <Dialog
                        open={openCreateDeparment}
                        onClose={handleCreateEditDepartment}
                        scroll='paper'
                        aria-labelledby="scroll-dialog-title"
                        aria-describedby="scroll-dialog-description"
                        fullWidth
                        maxWidth='md'
                    >
                        <DialogTitle className="title-text" id="scroll-dialog-title-create">TẠO MỚI PHÒNG BAN</DialogTitle>
                        <DialogContent sx={{ color: "rgb(0, 167, 111)" }} dividers>
                            <Stack spacing={2} margin={2}>
                                <TextField
                                    id="name"
                                    label="Tên phòng ban"
                                    value={departmentNameCreate}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        setDepartmentNameCreate(event.target.value);
                                    }}
                                />
                            </Stack>
                            <Stack spacing={2} margin={2}>
                                <TextField
                                    id="desciption"
                                    label="Mô tả"
                                    multiline
                                    rows={4}
                                    value={deparmentDescriptionCreate}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        setDeparmentDescriptionCreate(event.target.value);
                                    }}
                                />
                            </Stack>
                        </DialogContent>
                        <DialogActions>
                            <Button
                                sx={{ color: 'rgb(0, 167, 111)' }}
                                onClick={handleCloseCreateDepartment}
                            >Huỷ</Button>
                            <Button
                                variant="contained"
                                color='success'
                                sx={{ backgroundColor: 'rgb(0, 167, 111)', color: '#fff' }}
                                onClick={handleCreateDepartment}
                            >Xác nhận</Button>
                        </DialogActions>
                    </Dialog>
                </Stack>
                <Card>
                    <Tabs
                        value={statusFilter}
                        onChange={handleTabChange}
                        indicatorColor="primary"
                        textColor="primary"
                        aria-label="full width tabs example"
                    >
                        <Tab label="Tất cả" value="" />
                        <Tab label="Không hoạt động" value="INACTIVE" />
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
                    <MenuItem onClick={handleOpenEditDeparment}>
                        <Iconify icon="eva:edit-fill" sx={{ marginRight: 2 }} />
                        Sửa
                    </MenuItem>
                    <MenuItem onClick={handleOpen} sx={{ color: 'error.main' }}>
                        <Iconify icon="eva:trash-2-outline" sx={{ marginRight: 2 }} />
                        Xoá
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
            <UpdateModal
                showModalUpdate={openEditDeparment}
                setShowModalUpdate={setOpenEditDeparment}
                department={departmentInformation}
                setDeparments={setDepartmentInformation}
                setOpen={setOpen}
                getDepartment={getDepartment}
            />
        </BaseLayout>

    );
}
