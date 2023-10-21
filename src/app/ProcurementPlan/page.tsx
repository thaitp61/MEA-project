"use client"
import Box from '@mui/material/Box';
import {
    DataGrid, GridColDef, GridValueGetterParams, GridActionsCellItem,
    useGridApiContext,
    useGridSelector,
    gridPageCountSelector,
    GridPagination,
} from '@mui/x-data-grid'; import BaseLayout from '../components/BaseLayout';
import { Button, Card, Checkbox, Container, IconButton, MenuItem, Paper, Popover, Stack, Tab, TableBody, TableCell, TablePaginationProps, TableRow, Tabs, Typography } from '@mui/material';
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
                    <GridActionsCellItem
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
                    />
                </div>
            ),
        }
    ];

    const [plans, setPlans] = useState([]);
    // Chuỗi ngày tháng gốc
    const dateString = "2023-10-18T01:54:08.254Z";

    // Chuyển đổi thành một đối tượng Date
    const dateObject = new Date(dateString);

    // Lấy ngày, tháng và năm từ đối tượng Date
    const day = dateObject.getUTCDate();
    const month = dateObject.getUTCMonth() + 1; // Tháng bắt đầu từ 0, cần +1
    const year = dateObject.getUTCFullYear();

    // Định dạng lại thành "dd/mm/yyyy"
    const formattedDate = `${day}/${month}/${year}`;

    console.log(formattedDate); // Kết quả: "18/10/2023"


    const getPlan = async () => {
        try {
            const response = await ApiContext.get('/import-plan',
                {
                    params: {
                        page: 0,
                        pageSize: 10,
                        filters: [`status||${FilterComparator.EQUAL}||SUBMITTED`],
                        orderBy: [],
                    },
                });
            const planList = response?.data?.data; // Danh sách người dùng từ API
            setPlans(planList);
            // setPlans(planList);
        } catch (error) {
            console.error('Lỗi khi gọi API:', error);
        }
    };
    useEffect(() => {
        getPlan();
    }, []);
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
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [paginationModel, setPaginationModel] = React.useState({
        pageSize: pageSize,
        page: page,
    });

    return (
        <BaseLayout>
            <Container maxWidth={false}>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4">Danh sách kế hoạch mua sắm</Typography>

                    <Button variant="contained" color="inherit">
                        Tạo kế hoạch mua sắm
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
                            rows={plans}
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
