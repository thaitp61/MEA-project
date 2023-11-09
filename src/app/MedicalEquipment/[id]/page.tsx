'use client'
import ApiContext from '@/app/context/ApiContext';
import { Avatar, Box, Button, Card, CardContent, Container, FormControl, Grid, Icon, MenuItem, Paper, Select, SelectChangeEvent, Stack, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, Typography } from '@mui/material';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import TabContext from '@mui/lab/TabContext/TabContext';
import TabList from '@mui/lab/TabList/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { format } from "date-fns";
import SendIcon from '@mui/icons-material/Send';
import BlockIcon from '@mui/icons-material/Block';
import { DataGrid, GridColDef, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarFilterButton, GridValueGetterParams } from '@mui/x-data-grid';


const rows = [
    { id: 1, method: 'Snow', event: 'Jon', status: "200", createdAt: "2023-10-04T05:19:37.967Z" },
    { id: 2, method: 'Lannister', event: 'Cersei', status: "400", createdAt: "2023-10-04T05:19:37.967Z" },
    { id: 3, method: 'Lannister', event: 'Jaime', status: "200", createdAt: "2023-10-04T05:19:37.967Z" },
    { id: 4, method: 'Stark', event: 'Arya', status: "200", createdAt: "2023-10-04T05:19:37.967Z" },
    { id: 5, method: 'Targaryen', event: 'Daenerys', status: "200", createdAt: "2023-10-04T05:19:37.967Z" },
    { id: 6, method: 'Melisandre', event: null, status: "200", createdAt: "2023-10-04T05:19:37.967Z" },
    { id: 7, method: 'Clifford', event: 'Ferrara', status: "200", createdAt: "2023-10-04T05:19:37.967Z" },
    { id: 8, method: 'Frances', event: 'Rossini', status: "200", createdAt: "2023-10-04T05:19:37.967Z" },
    { id: 9, method: 'Roxie', event: 'Harvey', status: "200", createdAt: "2023-10-04T05:19:37.967Z" },
];
const history = [
    { id: 1, startDay: '2023-10-10T16:07:16.769Z', endDay: '2023-10-15T16:07:16.769Z', description: "Bảo trì thay thế bộ lọc", name: "Quân Hùng", status: "COMPLETED" },
    { id: 2, startDay: '2023-10-11T16:07:16.769Z', endDay: '2023-10-15T16:07:16.769Z', description: "Bảo trì thay thế bộ lọc", name: "Quân Hùng", status: "FIXING" },
    { id: 3, startDay: '2023-10-12T16:07:16.769Z', endDay: '2023-10-15T16:07:16.769Z', description: "Bảo trì thay thế bộ lọc", name: "Quân Hùng", status: "CANCELLED" },
    { id: 4, startDay: '2023-10-13T16:07:16.769Z', endDay: '2023-10-15T16:07:16.769Z', description: "Bảo trì thay thế bộ lọc", name: "Quân Hùng", status: "COMPLETED" },
    { id: 5, startDay: '2023-10-14T16:07:16.769Z', endDay: '2023-10-15T16:07:16.769Z', description: "Bảo trì thay thế bộ lọc", name: "Quân Hùng", status: "COMPLETED" },
    { id: 6, startDay: '2023-10-15T16:07:16.769Z', endDay: '2023-10-15T16:07:16.769Z', description: "Bảo trì thay thế bộ lọc", name: "Quân Hùng", status: "COMPLETED" },
    { id: 7, startDay: '2023-10-16T16:07:16.769Z', endDay: '2023-10-15T16:07:16.769Z', description: "Bảo trì thay thế bộ lọc", name: "Quân Hùng", status: "COMPLETED" },
];

const columnss: GridColDef[] = [
    {
        field: 'startDay', headerName: 'Ngày bắt đầu.', width: 130,
        valueGetter: (params) => {
            const startDayDateValue = params.row.startDay;
            if (startDayDateValue) {
                const dateObject = new Date(startDayDateValue);
                const day = dateObject.getUTCDate();
                const month = dateObject.getUTCMonth() + 1;
                const year = dateObject.getUTCFullYear();
                return `${day}/${month}/${year}`;
            }
            return ''; // Handle the case where 'endImportDate' is not defined or falsy
        },
    },
    {
        field: 'endDay', headerName: 'Ngày kết thúc', width: 130,
        valueGetter: (params) => {
            const endDayDateValue = params.row.endDay;
            if (endDayDateValue) {
                const dateObject = new Date(endDayDateValue);
                const day = dateObject.getUTCDate();
                const month = dateObject.getUTCMonth() + 1;
                const year = dateObject.getUTCFullYear();
                return `${day}/${month}/${year}`;
            }
            return ''; // Handle the case where 'endImportDate' is not defined or falsy
        },
    },
    { field: 'description', headerName: 'Nội dung bảo trì', width: 300 },
    { field: 'name', headerName: 'Người bảo trì', width: 130 },
    {
        field: 'status',
        headerName: 'Trạng thái',
        width: 150,
        renderCell: (params) => {
            const { value } = params;
            if (value === 'COMPLETED') {
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
                            width: '100px',
                            justifyContent: 'center',
                        }}
                    >
                        HOÀN THÀNH
                    </Box>
                );
            } else if (value === 'CANCELLED') {
                return (
                    <Box
                        component="div"
                        sx={{
                            display: 'flex',
                            p: 1,
                            m: 1,
                            bgcolor: '#F44336;',
                            color: '#fff',
                            border: '1px solid',
                            borderColor: (theme) =>
                                theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
                            borderRadius: "12px",
                            fontSize: '0.8rem',
                            fontWeight: 600,
                            width: '100px',
                            justifyContent: 'center',
                        }}
                    >
                        ĐÃ HỦY
                    </Box>
                );
            } else if (value === 'FIXING') {
                return (
                    <Box
                        component="div"
                        sx={{
                            display: 'flex',
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
                            justifyContent: 'center',
                            width: '100px'


                        }}
                    >
                        ĐANG BẢO TRÌ
                    </Box>
                );
            }

            return (
                <Box
                    component="div"
                    sx={{
                        display: 'flex',
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
                        width: '90px',
                        justifyContent: 'center',


                    }}
                >
                    {value}
                </Box>
            );
        },

    },
];




const ViewDetailEquipment = ({ params }: { params: { id: string } }) => {
    const columns: GridColDef[] = [
        {
            field: 'createdAt',
            headerName: 'Ngày tạo',
            width: 200,
            valueGetter: (params) => {
                const createdAtValue = params.row.createdAt;
                if (createdAtValue) {
                    const createdAt = new Date(createdAtValue);
                    const formattedDate = format(createdAt, "dd/MM/yyyy HH:mm:ss");
                    return formattedDate;
                }
                return '';
            },
        },
        {
            field: 'method',
            headerName: 'Chức năng',
            width: 150,
        },
        {
            field: 'event',
            headerName: 'Sự kiện',
            width: 400,
            type: "string"
        },
        {
            field: 'status',
            headerName: 'Trạng thái',
            width: 150,
            renderCell: (params) => {
                const { value } = params;
                if (value === '200') {
                    return (
                        <Box
                            component="div"
                            sx={{
                                display: 'inline',
                                p: 1,
                                m: 1,
                                bgcolor: 'rgba(16, 185, 129, 0.12)',
                                color: 'rgb(11, 129, 90)',
                                border: '1px solid',
                                borderColor: (theme) =>
                                    theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
                                borderRadius: "12px",
                                fontSize: '0.8rem',
                                fontWeight: 600,
                            }}
                        >
                            200
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
                            bgcolor: 'rgba(240, 68, 56, 0.12);',
                            color: 'rgb(180, 35, 24);',
                            border: '1px solid',
                            borderColor: (theme) =>
                                theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
                            borderRadius: "12px",
                            fontSize: '0.8rem',
                            fontWeight: 600,
                        }}
                    >
                        400
                    </Box>
                );
            },

        },
    ];

    const [equipmentDetail, setEquipmentDetail] = useState<IEquipment | null>(null)
    const [emailOptions, setEmailOptions] = React.useState('1');

    const handleChangeOptions = (event: SelectChangeEvent) => {
        setEmailOptions(event.target.value);
    };


    const GetEquipmentDetail = async () => {
        try {
            const response = await ApiContext.get(`/equipment/${params.id}`);
            const userDetail = response?.data
            setEquipmentDetail(userDetail)
        } catch (error) {
            console.error('API Error:', error);
        }
    }
    useEffect(() => {
        GetEquipmentDetail();
    }, [params.id]);
    const [value, setValue] = React.useState('1');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };


    return (
        <Container maxWidth={false}>
            <div style={{ textAlign: "left" }}>
                <Link href={'/MedicalEquipment'} style={{ textDecoration: 'none', color: '#1976d2' }}>
                    <Button
                        startIcon={<ArrowBackIcon />}
                        variant="text"
                        color="info"
                    >
                        Danh sách thiết bị y tế
                    </Button>
                </Link>
            </div>
            <div>
                <Stack spacing={2}>
                    <Grid container spacing={2}>
                        <Grid item>
                            <Box
                                component="img"
                                sx={{
                                    height: 233,
                                    width: 350,
                                    maxHeight: { xs: 233, md: 167 },
                                    maxWidth: { xs: 350, md: 250 },
                                }}
                                alt={equipmentDetail?.code}
                                src={equipmentDetail?.imageUrls[0]}
                            />
                        </Grid>
                        <Grid item xs={12} sm container>
                            <Grid item xs container direction="column" spacing={2}>
                                <Grid item xs>
                                    <Typography gutterBottom variant="h5" component="div">
                                        Tên thiết bị:{equipmentDetail?.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Mã thiết bị: {equipmentDetail?.id}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Link href={`/MedicalEquipment/${equipmentDetail?.id}/edit`} passHref>
                                    <Button variant="outlined" startIcon={<EditIcon />} component="a">
                                        Chỉnh sửa
                                    </Button>
                                </Link>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Box sx={{ width: '100%', typography: 'body1' }}>
                        <TabContext value={value}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <TabList onChange={handleChange} aria-label="lab API tabs example">
                                    <Tab label="Chi tiết" value="1" />
                                    <Tab label="Lịch sử" value="2" />
                                </TabList>
                            </Box>
                            <TabPanel value="1">
                                <Grid container spacing={2}>
                                    <Box sx={{ width: '100%', bgcolor: '#fff', borderRadius: '15px' }}>
                                        <Grid container spacing={1} sx={{ m: 2 }}>
                                            <Typography gutterBottom variant="h6" component="div">
                                                Thông tin thiết bị
                                            </Typography>
                                            <Grid item xs={12}>

                                            </Grid>
                                            <Grid item xs={2}>
                                                <Typography gutterBottom component="div" color="text.secondary">
                                                    Loại thiết bị:
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={10}>
                                                <Typography component="div" color="text.secondary">
                                                    {equipmentDetail?.equipmentCategory?.name || "Trống"}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={2}>
                                                <Typography gutterBottom component="div" color="text.secondary">
                                                    Nhà cung cấp:
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={10}>
                                                <Typography component="div" color="text.secondary">
                                                    {equipmentDetail?.brand || "Trống"}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={2}>
                                                <Typography gutterBottom component="div" color="text.secondary">
                                                    Số Serial:
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={10}>
                                                <Typography component="div" color="text.secondary">
                                                    {equipmentDetail?.code || "Trống"}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={2}>
                                                <Typography gutterBottom component="div" color="text.secondary">
                                                    Ngày sản xuất:
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={10}>
                                                <Typography component="div" color="text.secondary">
                                                    {equipmentDetail?.mfDate ? format(
                                                        new Date(equipmentDetail?.mfDate),
                                                        "dd/MM/yyyy"
                                                    )
                                                        : "N/A"}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={2}>
                                                <Typography gutterBottom component="div" color="text.secondary">
                                                    Ngày nhập kho:
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={10}>
                                                <Typography component="div" color="text.secondary">
                                                    {equipmentDetail?.importDate ? format(
                                                        new Date(equipmentDetail?.importDate),
                                                        "dd/MM/yyyy"
                                                    )
                                                        : "N/A"}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={2}>
                                                <Typography gutterBottom component="div" color="text.secondary">
                                                    Thời gian bảo hành:
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={10}>
                                                <Typography component="div" color="text.secondary">
                                                    {equipmentDetail?.endOfWarrantyDate ? format(
                                                        new Date(equipmentDetail?.endOfWarrantyDate),
                                                        "dd/MM/yyyy"
                                                    )
                                                        : "N/A"}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={2}>
                                                <Typography gutterBottom component="div" color="text.secondary">
                                                    Phòng ban:
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={10}>
                                                <Typography component="div" color="text.secondary">
                                                    {equipmentDetail?.department?.name || "Trống"}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={2}>
                                                <Typography gutterBottom component="div" color="text.secondary">
                                                    Trạng thái:
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={10}>
                                                <Typography component="div" color="text.secondary">
                                                    {equipmentDetail?.currentStatus === "ACTIVE" ? "Đang hoạt động" :
                                                        equipmentDetail?.currentStatus === "INACTIVE" ? "Không hoạt động" :
                                                            equipmentDetail?.currentStatus === "BROKEN" ? "Hỏng" :
                                                                equipmentDetail?.currentStatus === "FIXING" ? "Bảo trì" :
                                                                    "..."
                                                    }
                                                </Typography>
                                            </Grid>
                                            <Typography gutterBottom variant="h6" component="div">
                                                Mô tả thiết bị
                                            </Typography>
                                            <Grid item xs={12}>

                                            </Grid>
                                            <Grid item xs={12}>
                                                <Typography component="div" color="text.secondary">
                                                    {equipmentDetail?.description || "Trống"}
                                                </Typography>
                                            </Grid>
                                            <Typography gutterBottom variant="h6" component="div">
                                                Thông tin bảo trì
                                            </Typography>
                                            <Grid item xs={12}>

                                            </Grid>
                                            <Grid item xs={2}>
                                                <Typography gutterBottom component="div" color="text.secondary">
                                                    Số lần bảo trì:
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={10}>
                                                <Typography component="div" color="text.secondary">
                                                    {equipmentDetail?.equipmentCategory?.name || "Trống"}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={2}>
                                                <Typography gutterBottom component="div" color="text.secondary">
                                                    Lần bảo trì gần nhất:
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={10}>
                                                <Typography component="div" color="text.secondary">
                                                    {equipmentDetail?.equipmentMaintainSchedule?.lastMaintainDate ? format(
                                                        new Date(equipmentDetail?.equipmentMaintainSchedule?.lastMaintainDate),
                                                        "dd/MM/yyyy"
                                                    )
                                                        : "N/A"}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={2}>
                                                <Typography gutterBottom component="div" color="text.secondary">
                                                    Lần bảo trì tiếp theo:
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={10}>
                                                <Typography component="div" color="text.secondary">
                                                    {equipmentDetail?.equipmentMaintainSchedule?.lastMaintainDate ? format(
                                                        new Date(equipmentDetail?.equipmentMaintainSchedule?.lastMaintainDate),
                                                        "dd/MM/yyyy"
                                                    )
                                                        : "N/A"}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={2}>
                                                <Typography gutterBottom component="div" color="text.secondary">
                                                    Lịch sử bảo trì:
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={9}>
                                                <div style={{ height: 400, width: '100%' }}>
                                                    <DataGrid
                                                        rows={history}
                                                        columns={columnss}
                                                        initialState={{
                                                            pagination: {
                                                                paginationModel: { page: 0, pageSize: 5 },
                                                            },
                                                        }}
                                                        pageSizeOptions={[5, 10]}
                                                    />
                                                </div>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Grid>
                            </TabPanel>
                            <TabPanel value="2">
                                <Box sx={{ height: "85vh", width: '100%', bgcolor: '#fff' }}>
                                    <DataGrid
                                        rows={rows}
                                        columns={columns}
                                        initialState={{
                                            pagination: {
                                                paginationModel: {
                                                    pageSize: 5,
                                                },
                                            },
                                        }}
                                        pageSizeOptions={[5]}
                                    />
                                </Box>

                            </TabPanel>
                        </TabContext>
                    </Box>
                </Stack>
            </div>
        </Container>
    )


}

export default ViewDetailEquipment