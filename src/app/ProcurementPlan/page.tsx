"use client"
import Box from '@mui/material/Box';
import {
    DataGrid, GridColDef, GridValueGetterParams, GridActionsCellItem,
    useGridApiContext,
    useGridSelector,
    gridPageCountSelector,
    GridPagination,
} from '@mui/x-data-grid'; import BaseLayout from '../components/BaseLayout';
import { Button, Card, Checkbox, Container, IconButton, LinearProgress, MenuItem, Paper, Popover, Stack, Tab, TableBody, TableCell, TablePaginationProps, TableRow, Tabs, Typography } from '@mui/material';
import { Icon } from '@iconify/react';
import axios from 'axios'
import useSWR from "swr";
import React, { useState, useEffect } from 'react';
import { FilterComparator, SortOrder } from '../models/common';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import ViewDetailIcon from '@mui/icons-material/Visibility';
import { toast } from 'react-hot-toast';
import ApiContext from '../context/ApiContext';
import MuiPagination from '@mui/material/Pagination';
import Iconify from '../components/iconify';
import { Modal } from 'stream-chat-react';

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

export default function DataGridDemo() {
    const columns: GridColDef[] = [
        { field: 'code', headerName: 'Số hoá đơn', width: 150 },
        {
            field: 'documentNumber',
            headerName: 'Số chứng từ',
            width: 150,
        },
        {
            field: 'contractSymbol',
            headerName: 'Ký hiệu hoá đơn',
            width: 150,
        },
        {
            field: 'startImportDate',
            headerName: 'Ngày bắt đầu',
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
            field: 'name',
            headerName: 'Người tạo',
            type: "string",
            width: 150,
            valueGetter: (params) => params.row.createdBy.name
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
                    {/* <GridActionsCellItem
                        icon={<ViewDetailIcon />}
                        label="View"
                        className="textPrimary"
                        color="inherit"
                    // onClick={() => handleApprovePlan(params.row?.id)}
                    />
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
                    /> */}
                    <div>
                        <IconButton onClick={handleOpenMenu(params.row?.id)}>
                            <Icon icon="eva:more-vertical-fill" />
                        </IconButton>
                    </div>
                </div>
            ),
        }
    ];

    const [openViewModal, setOpenViewModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [paginationModel, setPaginationModel] = React.useState({
        page: 0,
        pageSize: 10,
    });
    const [totalPlans, setTotalPlans] = useState(0);
    const [planID, setPlanID] = useState<string>('');



    const [plans, setPlans] = useState([]);
    // Chuỗi ngày tháng gốc


    const getPlan = async () => {
        try {
            const response = await ApiContext.get('/import-plan',
                {
                    params: {
                        page: paginationModel.page,
                        pageSize: paginationModel.pageSize,
                        orderBy: [`updatedAt||${SortOrder.DESC}`],
                        filters: [`status||${FilterComparator.EQUAL}||SUBMITTED`],
                    },
                });
            const planList = response?.data?.data; // Danh sách người dùng từ API
            const total = response?.data?.count
            setPlans(planList);
            setTotalPlans(total);
            setLoading(false); // Tắt trạng thái loading khi dữ liệu đã được tải
        } catch (error) {
            console.error('Lỗi khi gọi API:', error);
        }
    };
    useEffect(() => {
        getPlan();
        setLoading(true);

    }, [paginationModel]);

    const ApprovePlan = async (planID: string) => {
        try {
            const response = await ApiContext.put(`https://mea.monoinfinity.net/api/v1/import-plan/${planID}/approve`, null, {

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
            const response = await ApiContext.put(`https://mea.monoinfinity.net/api/v1/import-plan/${planID}/cancel`);
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


    const [open, setOpen] = React.useState(null);

    const [activeTab, setActiveTab] = React.useState('');
    const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
        setActiveTab(newValue);
    };
    const handleCloseMenu = () => {
        setOpen(null);
    };
    // const handleOpenMenu = (event: any) => {
    //     setOpen(event.currentTarget);
    // };


    const handleOpenModalEdit = () => {
        // setOpenViewModal(true);
        // GetUserDetail(userID)F
        ApprovePlan(planID);
        setOpen(null)
    };
    const handleOpenModalReject = () => {
        // setOpenViewModal(true);
        // GetUserDetail(userID)F
        RejectPlan(planID);
        setOpen(null)
    };
    const handleOpenMenu = (planID: string) => (event: any) => {
        setOpen(event.currentTarget);
        setPlanID(planID);
    };
    console.log("planID", planID)

    return (
        <BaseLayout>
            <Container maxWidth={false}>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4">Danh sách kế hoạch mua sắm</Typography>

                    <Button variant="contained"
                        color='success'
                        sx={{ backgroundColor: 'rgb(0, 167, 111)', color: '#fff' }}
                        startIcon={<Iconify icon="eva:plus-fill" />}
                    // onClick={handleOpenCreateDeparment}
                    >
                        Tạo mới kế hoạch mua sắm
                    </Button>
                </Stack>
                <Card>
                    <Tabs value={activeTab} onChange={handleTabChange} aria-label="Product status tabs">
                        <Tab label="Tất cả" value="" />
                        <Tab label="Chưa duyệt" value="No" />
                        <Tab label="Đã duyệt" value="Yes" />
                        <Tab label="Đã hoàn thành" value="Oke" />
                    </Tabs>
                    <Box sx={{ height: 540, width: '100%' }}>
                        <DataGrid
                            rows={plans}
                            columns={columns}
                            paginationModel={paginationModel}
                            onPaginationModelChange={setPaginationModel}
                            pageSizeOptions={[10, 20, 50]}
                            rowCount={totalPlans}
                            slots={{
                                loadingOverlay: LinearProgress,
                            }}
                            loading={loading}
                            paginationMode='server'
                        />
                    </Box>

                </Card>
            </Container>
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
                <MenuItem >
                    <Iconify icon="eva:eye-outline" sx={{ marginRight: 2 }} />
                    Xem
                </MenuItem>
                <MenuItem onClick={handleOpenModalEdit}>
                    <Iconify icon="eva:checkmark-outline" sx={{ marginRight: 2 }} />
                    Đồng ý
                </MenuItem>
                <MenuItem onClick={handleOpenModalReject} sx={{ color: 'error.main' }}>
                    <Iconify icon="eva:trash-2-outline" sx={{ marginRight: 2 }} />
                    Từ chối
                </MenuItem>
                {/* <Modal
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
                </Modal> */}
            </Popover>
        </BaseLayout>

    );
}
