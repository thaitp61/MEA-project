"use client"
import Box from '@mui/material/Box';
import {
    DataGrid,
    GridColDef,
    GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarDensitySelector,
    GridToolbar,
    GridToolbarQuickFilter,
} from '@mui/x-data-grid';
import { Button, Card, Checkbox, Container, IconButton, LinearProgress, MenuItem, Paper, Popover, Stack, Tab, TableBody, TableCell, TableRow, Tabs, Typography } from '@mui/material';
import { Icon } from '@iconify/react';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import ApiContext from '../context/ApiContext';
import Iconify from '../components/iconify';
import { FilterComparator, SortOrder } from '@/app/models/common';
import { ExportButton } from "../components/Toolbar/excel-export-equipment/ExportButton"
import AddPlanMaintenanceButton from '../components/Toolbar/Buttons/AddButton';
import "./layout.css"
import Link from 'next/link';

export interface Equipments {
    id: string;
    name: string;
    code: string;
    description: string;
    mfDate: string;
    importDate: string;
    department: string;
    expiredDate: string;
    endOfWarrantyDate: string;
    equipmentCategory: {
        id: string;
        name: string;
    }
    equipmentMaintainSchedule: {
        id: string
        cycleMaintainPerMonth: number;
        lastMaintainDate: string;
        lastNotifyDate: string;
    }
    status: string;
}


export default function EquipmentList() {

    function CustomToolbar() {
        return (
            <GridToolbarContainer>
                <GridToolbarColumnsButton />
                <GridToolbarFilterButton />
                <GridToolbarDensitySelector />
                <ExportButton />
                <AddPlanMaintenanceButton selectedRows={selectedRows} />
                <GridToolbarQuickFilter />
            </GridToolbarContainer>
        );
    }

    const columns: GridColDef[] = [
        { field: 'code', headerName: 'Mã thiết bị', width: 150 },
        {
            field: 'name',
            headerName: 'Tên thiết bị',
            width: 150,
            type: "string"
        },
        {
            field: 'equipmentCategory',
            headerName: 'Loại thiết bị',
            width: 150,
            type: "string",
            valueGetter: (params) => {
                if (params.row.equipmentCategory) {
                    return params.row.equipmentCategory.name;
                }
                return '';
            },
        },

        {
            field: 'importDate',
            headerName: 'Ngày nhập kho',
            width: 150,
            valueGetter: (params) => {
                const importDateValue = params.row.importDate;

                if (importDateValue) {
                    const dateObject = new Date(importDateValue);
                    const day = dateObject.getUTCDate();
                    const month = dateObject.getUTCMonth() + 1;
                    const year = dateObject.getUTCFullYear();
                    return `${day}/${month}/${year}`;
                }

                return ''; // Handle the case where 'endImportDate' is not defined or falsy
            },
        },
        {
            field: 'lastMaintainDate',
            headerName: 'Lần bảo trì gần nhất',
            width: 150,
            valueGetter: (params) => {
                const lastMaintainDateValue = params.row.equipmentMaintainSchedule.lastMaintainDate;
                if (lastMaintainDateValue) {
                    const dateObject = new Date(lastMaintainDateValue);
                    const day = dateObject.getUTCDate();
                    const month = dateObject.getUTCMonth() + 1;
                    const year = dateObject.getUTCFullYear();
                    return `${day}/${month}/${year}`;
                }
                return ''; // Handle the case where 'endImportDate' is not defined or falsy
            },
        },
        {
            field: 'nextMaintainDate',
            headerName: 'Lần bảo trì tiếp theo',
            width: 150,
            valueGetter: (params) => {
                if (params.row.equipmentMaintainSchedule && params.row.equipmentMaintainSchedule.lastMaintainDate && params.row.equipmentMaintainSchedule.cycleMaintainPerMonth) {
                    const lastMaintainDate = new Date(params.row.equipmentMaintainSchedule.lastMaintainDate);
                    const cycleMaintainPerMonth = params.row.equipmentMaintainSchedule.cycleMaintainPerMonth;

                    // Tính nextMaintainDate bằng cách cộng thêm số tháng từ lastMaintainDate theo giá trị của cycleMaintainPerMonth
                    const nextMaintainDate = new Date(lastMaintainDate);
                    nextMaintainDate.setMonth(lastMaintainDate.getMonth() + cycleMaintainPerMonth);

                    const day = nextMaintainDate.getUTCDate();
                    const month = nextMaintainDate.getUTCMonth() + 1;
                    const year = nextMaintainDate.getUTCFullYear();

                    return `${day}/${month}/${year}`;
                }
                return '';
            },
        },
        {
            field: 'currentStatus',
            headerName: 'Trạng thái',
            width: 150,
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
                        <Box
                            component="div"
                            sx={{
                                display: 'inline',
                                p: 1,
                                m: 1,
                                bgcolor: 'rgba(240, 68, 56, 0.12);',
                                color: 'rgb(180, 35, 24);',
                                border: '1px solid',
                                borderColor: (theme) =>
                                    theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
                                borderRadius: "12px",
                                fontSize: '0.8rem',
                                fontWeight: 600,
                                width: '90px'

                            }}
                        >
                            Dừng
                        </Box>
                    );
                } else if (value === 'FIXING') {
                    return (
                        <Box
                            component="div"
                            sx={{
                                display: 'inline',
                                p: 1,
                                m: 1,
                                bgcolor: '#FF5722',
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
                            BẢO TRÌ
                        </Box>
                    );
                }

                return (
                    <Box
                        component="div"
                        sx={{
                            display: 'inline',
                            p: 1,
                            m: 1,
                            bgcolor: '#9E9E9E',
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
                        {value}
                    </Box>
                );
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
    const [equipments, setEquipments] = useState<Equipments[]>([]);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [totalEquipment, setTotalEquipment] = useState(0);
    const [paginationModel, setPaginationModel] = React.useState({
        page: 0,
        pageSize: 10,
    });
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = React.useState(''); // Trạng thái filter mặc định là chuỗi trống
    const [equipmentID, setEquipmentID] = React.useState(''); // Trạng thái filter mặc định là chuỗi trống
    const [equipmentName, setEquipmentName] = React.useState(''); // Trạng thái filter mặc định là chuỗi trống
    const [selectedRows, setSelectedRows] = useState([]);
    const getEquipmentList = async () => {
        try {
            const response = await ApiContext.get('/equipment',
                {
                    params: {
                        page: paginationModel?.page,
                        pageSize: paginationModel?.pageSize,
                        filters: statusFilter ? [`status||${FilterComparator.EQUAL}||${statusFilter}`] : [], // Sử dụng statusFilter nếu nó có giá trị
                        orderBy: [`updatedAt||${SortOrder.DESC}`],

                    },
                });
            const equipmentList = response?.data?.data; // Danh sách người dùng từ API
            setEquipments(equipmentList);
            setLoading(false); // Tắt trạng thái loading khi dữ liệu đã được tải
            const totalEquipment = response?.data?.count
            setTotalEquipment(totalEquipment)
        } catch (error) {
            console.error('Lỗi khi gọi API:', error);
        }
    };
    useEffect(() => {
        getEquipmentList();
        setLoading(true);
    }, [paginationModel, statusFilter]);
    const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
        // Cập nhật trạng thái statusFilter dựa trên tab được chọn
        if (newValue === 'INACTIVE') {
            setStatusFilter('INACTIVE');
        }
        else if (newValue === 'FIXING') {
            setStatusFilter('FIXING');
        }
        else {
            setStatusFilter(''); // Trạng thái khác
        }
    };

    const [open, setOpen] = React.useState(null);

    const handleCloseMenu = () => {
        setOpen(null);
    };

    //page size
    const handleOpenMenu = (equipmentID: string, equipmentName: string) => (event: any) => {
        setOpen(event.currentTarget);
        setEquipmentID(equipmentID);
        setEquipmentName(equipmentName);
    };

    return (
        <Container maxWidth={false}>
            <Card >
                <Tabs
                    value={statusFilter}
                    onChange={handleTabChange}
                    indicatorColor="primary"
                    textColor="primary"
                    aria-label="full width tabs example"
                >
                    <Tab label="Tất cả" value="" />
                    <Tab label="Không hoạt động" value="INACTIVE" />
                    <Tab label="Bảo trì" value="FIXING" />
                </Tabs>
                <Box sx={{ height: "85vh", width: '100%' }}>
                    <DataGrid
                        rows={equipments}
                        columns={columns}
                        paginationModel={paginationModel}
                        onPaginationModelChange={setPaginationModel}
                        pageSizeOptions={[10, 20, 50]}
                        rowCount={totalEquipment}
                        slots={{
                            loadingOverlay: LinearProgress,
                            toolbar: CustomToolbar,
                        }}
                        localeText={{
                            toolbarColumns: "Cột",
                            toolbarFilters: "Tìm kiếm",
                            toolbarDensity: "Kích thước",
                            toolbarExport: "Xuất file"
                        }}
                        loading={loading}
                        paginationMode='server'
                        checkboxSelection
                        onRowSelectionModelChange={(ids) => {
                            const selectedIDs = new Set(ids);
                            const selectedRows: any = equipments.filter((row: any) =>
                                selectedIDs.has(row.id),
                            );
                            setSelectedRows(selectedRows);
                        }}
                        initialState={{
                            columns: {
                                columnVisibilityModel: {
                                    // Hide columns status and traderName, the other columns will remain visible
                                    id: false,
                                },
                            },
                        }}
                        slotProps={{
                            toolbar: {
                                showQuickFilter: true,
                            },
                        }}
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
                    <Link href={`/MedicalEquipment/${equipmentID}`} passHref
                        style={{
                            textDecoration: 'none',
                            color: '#1976d2',
                        }}
                    >
                        Chi tiết
                    </Link>
                </MenuItem>
                <MenuItem sx={{ color: 'rgb(0, 167, 111)' }}>
                    <Iconify icon="eva:edit-outline" sx={{ marginRight: 2 }} />
                    Cập nhật
                </MenuItem>
            </Popover>
        </Container>

    );
}
