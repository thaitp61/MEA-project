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
import Iconify from '../components/iconify';

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
interface Equipments {
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
    status: string;
}
export default function EquipmentList() {
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
            field: 'description',
            headerName: 'Mô tả',
            width: 300,
        },
        {
            field: 'mfDate',
            headerName: 'Ngày sản xuất',
            width: 150,
            valueGetter: (params) => {
                const mfDateValue = params.row.mfDate;

                if (mfDateValue) {
                    const dateObject = new Date(mfDateValue);
                    const day = dateObject.getUTCDate();
                    const month = dateObject.getUTCMonth() + 1;
                    const year = dateObject.getUTCFullYear();
                    return `${day}/${month}/${year}`;
                }

                return ''; // Handle the case where 'endImportDate' is not defined or falsy
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
            field: 'expiredDate',
            headerName: 'Bảo hành đến',
            width: 150,
            valueGetter: (params) => {
                const expiredDateValue = params.row.expiredDate;

                if (expiredDateValue) {
                    const dateObject = new Date(expiredDateValue);
                    const day = dateObject.getUTCDate();
                    const month = dateObject.getUTCMonth() + 1;
                    const year = dateObject.getUTCFullYear();
                    return `${day}/${month}/${year}`;
                }

                return ''; // Handle the case where 'endImportDate' is not defined or falsy
            },

        },
        {
            field: 'endOfWarrantyDate',
            headerName: 'Ngày bảo trì tiếp theo',
            width: 150,
            valueGetter: (params) => {
                const endOfWarrantyDateValue = params.row.endOfWarrantyDate;

                if (endOfWarrantyDateValue) {
                    const dateObject = new Date(endOfWarrantyDateValue);
                    const day = dateObject.getUTCDate();
                    const month = dateObject.getUTCMonth() + 1;
                    const year = dateObject.getUTCFullYear();
                    return `${day}/${month}/${year}`;
                }

                return ''; // Handle the case where 'endImportDate' is not defined or falsy
            },
        },
        {
            field: 'lastStatus',
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
                        label="Delete"
                        color="inherit"
                    />

                </div>
            ),
        }
    ];
    const [equipments, setEquipments] = useState<Equipments[]>([]);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [totalUsers, setTotalUsers] = useState(0);

    const getEquipmentList = async () => {
        try {
            const response = await ApiContext.get('/equipment',
                {
                    params: {
                        page: 0,
                        pageSize: 200,
                    },
                });
            const equipmentList = response?.data?.data; // Danh sách người dùng từ API
            setEquipments(equipmentList);
            // setPlans(planList);
        } catch (error) {
            console.error('Lỗi khi gọi API:', error);
        }
    };
    useEffect(() => {
        getEquipmentList();
    }, [page, pageSize]);
    // const DeleteUser = async (userID: string) => {
    //     try {
    //         const response = await ApiContext.delete(`https://mea.monoinfinity.net/api/v1/user/${userID}`);
    //         if (response.status === 200) {
    //             toast.success("Cập nhật thành công");
    //             getUser(); // Gọi lại hàm getPlan() để tải lại dữ liệu
    //         }
    //     } catch (error) {
    //         console.error('API Error:', error);
    //         toast.success("Cập nhật thất bại");
    //     }
    // }
    // const handleDeleteUser = (userID: string) => {
    //     DeleteUser(userID);
    //     console.log("reject PlanID:", userID)
    // }

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
                    <Typography variant="h4">Danh sách thiết bị y tế</Typography>
                    <Button variant="contained"
                        color='success'
                        sx={{ backgroundColor: 'rgb(0, 167, 111)', color: '#fff' }}
                        startIcon={<Iconify icon="eva:plus-fill" />}
                    // onClick={handleOpenCreateDeparment}
                    >
                        Tạo mới thiết bị
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
                            rows={equipments}
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
