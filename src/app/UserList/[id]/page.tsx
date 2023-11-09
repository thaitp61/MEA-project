'use client'
import ApiContext from '@/app/context/ApiContext';
import { Avatar, Box, Button, Card, CardContent, Container, FormControl, Grid, Icon, MenuItem, Select, SelectChangeEvent, Stack, Tab, Tabs, Typography } from '@mui/material';
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
import { DataGrid, GridColDef, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarFilterButton } from '@mui/x-data-grid';


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



const ViewDetailUser = ({ params }: { params: { id: string } }) => {
    function CustomToolbar() {
        return (
            <GridToolbarContainer>
                <GridToolbarColumnsButton />
                <GridToolbarFilterButton />
                <GridToolbarDensitySelector />
                {/* <ExportButton /> */}
            </GridToolbarContainer>
        );
    }
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

    const [userDetail, setUserDetail] = useState<IUser | null>(null)
    const [emailOptions, setEmailOptions] = React.useState('1');

    const handleChangeOptions = (event: SelectChangeEvent) => {
        setEmailOptions(event.target.value);
    };


    const GetUserDetail = async () => {
        try {
            const response = await ApiContext.get(`/user/${params.id}`);
            const userDetail = response?.data
            setUserDetail(userDetail)
        } catch (error) {
            console.error('API Error:', error);
        }
    }
    useEffect(() => {
        GetUserDetail();
    }, [params.id]);
    const [value, setValue] = React.useState('1');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <Container maxWidth={false}>
            <div style={{ textAlign: "left" }}>
                <Link href={'/UserList'} style={{ textDecoration: 'none', color: '#1976d2' }}>
                    <Button
                        startIcon={<ArrowBackIcon />}
                        variant="text"
                        color="info"
                    >
                        Danh sách nhân viên
                    </Button>
                </Link>
            </div>
            <div>
                <Stack spacing={2}>
                    <Grid container spacing={2}>
                        <Grid item>
                            <Avatar
                                alt="Person"
                                src="https://material-kit-pro-react.devias.io/assets/avatars/avatar-miron-vitold.png"
                                sx={{ width: 64, height: 64 }}
                            />
                        </Grid>
                        <Grid item xs={12} sm container>
                            <Grid item xs container direction="column" spacing={2}>
                                <Grid item xs>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {userDetail?.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Mã nhân viên: {userDetail?.id}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Link href={`/UserList/${userDetail?.id}/edit`} passHref>
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
                                    <Grid item xs={4} container direction="column" spacing={2}>
                                        <Grid item xs>
                                            <Box sx={{ width: '100%', bgcolor: '#fff', borderRadius: '15px' }}>
                                                <Stack spacing={2} sx={{ m: 2 }}>
                                                    <Typography gutterBottom variant="h6" component="div">
                                                        Thông tin cá nhân
                                                    </Typography>
                                                    <Stack spacing={0.5} >
                                                        <Typography gutterBottom component="div">
                                                            Họ và tên:
                                                        </Typography>
                                                        <Typography component="div" color="text.secondary" sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                                            {userDetail?.name || "Trống"}
                                                        </Typography>
                                                    </Stack>
                                                    <Stack spacing={0.5}>
                                                        <Typography gutterBottom component="div">
                                                            Ngày sinh
                                                        </Typography>
                                                        <Typography component="div" color="text.secondary" sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                                            {userDetail?.birthday
                                                                ? format(
                                                                    new Date(userDetail?.birthday),
                                                                    "dd/MM/yyyy"
                                                                )
                                                                : "N/A"}
                                                        </Typography>
                                                    </Stack>
                                                    <Stack spacing={0.5}>
                                                        <Typography gutterBottom component="div">
                                                            Giới tinh
                                                        </Typography>
                                                        <Typography component="div" color="text.secondary" sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                                            {userDetail?.gender || "Trống"}
                                                        </Typography>
                                                    </Stack>
                                                    <Stack spacing={0.5}>
                                                        <Typography gutterBottom component="div">
                                                            Số CMND/CCCD
                                                        </Typography>
                                                        <Typography component="div" color="text.secondary" sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                                            {userDetail?.citizenId || "Trống"}
                                                        </Typography>
                                                    </Stack>
                                                    <Stack spacing={0.5}>
                                                        <Typography gutterBottom component="div">
                                                            Email
                                                        </Typography>
                                                        <Typography component="div" color="text.secondary" sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                                            {userDetail?.email || "Trống"}
                                                        </Typography>
                                                    </Stack>
                                                    <Stack spacing={0.5}>
                                                        <Typography gutterBottom component="div">
                                                            Địa chỉ
                                                        </Typography>
                                                        <Typography component="div" color="text.secondary" sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                                            {userDetail?.address || "Trống"}
                                                        </Typography>
                                                    </Stack>
                                                    <Stack spacing={0.5}>
                                                        <Typography gutterBottom component="div">
                                                            Số điện thoại:
                                                        </Typography>
                                                        <Typography component="div" color="text.secondary" sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                                            {userDetail?.phone || "Trống"}
                                                        </Typography>
                                                    </Stack>
                                                    <Stack spacing={0.5}>
                                                        <Typography gutterBottom component="div">
                                                            Vai trò
                                                        </Typography>
                                                        <Typography component="div" color="text.secondary" sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                                            {userDetail?.role?.name || "Trống"}
                                                        </Typography>
                                                    </Stack>
                                                    <Stack spacing={0.5}>
                                                        <Typography gutterBottom component="div">
                                                            Phòng ban
                                                        </Typography>
                                                        <Typography component="div" color="text.secondary" sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                                            {userDetail?.department?.name || "Trống"}
                                                        </Typography>
                                                    </Stack>
                                                    <Stack spacing={0.5}>
                                                        <Typography gutterBottom component="div">
                                                            Ngày bắt đầu làm việc
                                                        </Typography>
                                                        <Typography component="div" color="text.secondary" sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                                            {userDetail?.startWorkDate
                                                                ? format(
                                                                    new Date(userDetail?.startWorkDate),
                                                                    "dd/MM/yyyy"
                                                                )
                                                                : "N/A"}
                                                        </Typography>
                                                    </Stack>
                                                    <Stack spacing={0.5}>
                                                        <Typography gutterBottom component="div">
                                                            Trạng thái
                                                        </Typography>
                                                        <Typography component="div" color="text.secondary" sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                                            {userDetail?.status === "ACTIVE" ? "Đang hoạt động" : "Đã nghỉ việc"}
                                                        </Typography>
                                                    </Stack>
                                                    <Stack spacing={0.5}>
                                                        <Stack direction="row">
                                                            <Button variant="text" color='inherit'>Reset Password</Button>
                                                        </Stack>
                                                    </Stack>
                                                </Stack>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={8} container direction="column" spacing={2}>
                                        <Grid item xs={2}>
                                            <Box sx={{ width: '100%', bgcolor: '#fff', borderRadius: '15px' }}>
                                                <Stack spacing={2} sx={{ m: 2 }}>
                                                    <Typography gutterBottom variant="h6" component="div">
                                                        Quản lý Email
                                                    </Typography>
                                                    <FormControl sx={{ m: 1 }} size="small">
                                                        <Select
                                                            labelId="demo-select-small-label"
                                                            id="demo-select-small"
                                                            value={emailOptions}
                                                            onChange={handleChangeOptions}
                                                        >
                                                            <MenuItem value={1}>Gửi Email khôi phục mật khẩu</MenuItem>
                                                            <MenuItem value={2}>Gửi Email xác thực tài khoản</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                    <Stack spacing={0.5}>
                                                        <Stack direction="row">
                                                            <Button variant="contained" endIcon={<SendIcon />}>
                                                                Gửi
                                                            </Button>
                                                        </Stack>
                                                    </Stack>
                                                    <Box sx={{ p: 1 }} />
                                                </Stack>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Box sx={{ width: '100%', bgcolor: '#fff', borderRadius: '15px' }}>
                                                <Stack spacing={2} sx={{ m: 2 }}>
                                                    <Typography gutterBottom variant="h6" component="div">
                                                        Quản lý dữ liệu
                                                    </Typography>

                                                    <Stack spacing={0.5}>
                                                        <Stack direction="row">
                                                            <Button variant="outlined" color='error' startIcon={<BlockIcon />}>
                                                                Khóa tài khoản
                                                            </Button>
                                                        </Stack>
                                                        <Typography component="div" color="text.secondary">
                                                            Khóa tài khoản trong trường hợp người dùng nghỉ việc hoặc chuyển qua phòng ban khác.
                                                        </Typography>
                                                    </Stack>
                                                    <Box sx={{ p: 2 }} />
                                                </Stack>
                                            </Box>
                                        </Grid>
                                    </Grid>
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

export default ViewDetailUser