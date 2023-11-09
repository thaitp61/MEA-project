'use client'
import ApiContext from '@/app/context/ApiContext';
import { Avatar, Box, Button, Card, CardContent, Container, FormControl, FormControlLabel, FormLabel, Grid, Icon, InputLabel, MenuItem, Radio, RadioGroup, Select, SelectChangeEvent, Stack, Tab, Tabs, TextField, Typography } from '@mui/material';
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
import { FilterComparator, SortOrder } from '@/app/models/common';
import { toast } from 'react-hot-toast';
const formatDate = (dateString: string) => {
    const dateObject = new Date(dateString);
    const day = dateObject.getUTCDate();
    const month = dateObject.getUTCMonth() + 1;
    const year = dateObject.getUTCFullYear();
    return `${day}/${month}/${year}`;
};

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
    const [userDetail, setUserDetail] = useState<IUser | null>()
    const [userID, setUserID] = useState<string>('');
    const [userName, setUserName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [startWork, setStartWork] = useState<string>('');
    const [department, setDepartment] = useState<string>('')
    const [role, setRole] = useState<string>('')
    const [gender, setGender] = useState<string>('');
    const [citizenId, setCitizenID] = useState<string>('');
    // const [gender, setGender] = useState<string>('');
    const [birthday, setBirthday] = useState<string>('');
    const [departmentList, setDepartmentList] = useState<IDepartment[]>([]);

    const GetUserDetail = async () => {
        try {
            const response = await ApiContext.get(`/user/${params.id}`);
            const userDetail = response?.data
            setUserDetail(userDetail)
            setUserID(userDetail.id);
            setUserName(userDetail?.name);
            setPhone(userDetail?.phone);
            setEmail(userDetail?.email);
            setAddress(userDetail?.address);
            setDepartment(userDetail?.department?.id);
            setGender(userDetail?.gender);
            setRole(userDetail?.role?.name);
            setCitizenID(userDetail?.citizenId);
            const formattedStartWork = formatDate(userDetail?.startWorkDate);
            const formattedBirthday = formatDate(userDetail?.birthday);
            setStartWork(formattedStartWork);
            setBirthday(formattedBirthday);
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
                        orderBy: [`createdAt||${SortOrder.DESC}`],
                    },
                });
            const departmentList = response?.data?.data; // Danh sách người dùng từ API
            setDepartmentList(departmentList);
        } catch (error) {
            console.error('Lỗi khi gọi API:', error);
        }
    };
    useEffect(() => {
        GetUserDetail();
        getDepartment();
        // console.log("userDetail:",userDetail)
        // if (userDetail) {
        //     setUserID(userDetail.id);
        //     setUserName(userDetail?.name);
        //     setPhone(userDetail?.phone);
        //     setEmail(userDetail?.email);
        //     setAddress(userDetail?.address);
        //     setDepartment(userDetail?.department?.id);
        //     setGender(userDetail?.gender);
        //     setRole(userDetail?.role?.name);
        //     setCitizenID(userDetail?.citizenId);
        //     const formattedStartWork = formatDate(userDetail?.startWorkDate);
        //     const formattedBirthday = formatDate(userDetail?.birthday);
        //     setStartWork(formattedStartWork);
        //     setBirthday(formattedBirthday);
        // }
    }, [params.id]);

    const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGender(event.target.value); // Cập nhật giá trị giới tính khi radio button thay đổi
    };
    const handleChange = (event: SelectChangeEvent) => {
        setDepartment(event.target.value as string);
    };
    const handleUpdateUser = async () => {
        toast.success("Cập nhật thành công");
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
                        </Grid>
                    </Grid>
                    <Box sx={{ width: '100%', typography: 'body1' }}>
                        <Box sx={{ width: '100%', bgcolor: '#fff', borderRadius: '15px' }}>
                            <Stack spacing={2} sx={{ m: 2 }}>
                                <Typography gutterBottom variant="h6" component="div">
                                    Chỉnh sửa thông tin nhân viên
                                </Typography>
                            </Stack>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Stack spacing={2} margin={2}>
                                        <TextField
                                            variant="outlined"
                                            label="Họ và tên"
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            value={userName}
                                        />
                                        <TextField
                                            variant="outlined"
                                            label="Email"
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            value={email}
                                        />
                                        <TextField
                                            variant="outlined"
                                            label="Số điện thoại"
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            value={phone}
                                        />
                                        <TextField
                                            variant="outlined"
                                            label="CCCD/CMND"
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            value={citizenId}
                                        />
                                        <TextField
                                            variant="outlined"
                                            label="Ngày sinh"
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            value={birthday}
                                        />
                                    </Stack>
                                </Grid>
                                <Grid item xs={6}>
                                    <Stack spacing={2} margin={0.8}>
                                        <FormControl>
                                            <FormLabel id="demo-row-radio-buttons-group-label">Giới tính</FormLabel>
                                            <RadioGroup
                                                row
                                                aria-labelledby="demo-row-radio-buttons-group-label"
                                                name="row-radio-buttons-group"
                                                value={gender}
                                                onChange={handleGenderChange}
                                            >
                                                <FormControlLabel value="FEMALE" control={<Radio />} label="Nữ" />
                                                <FormControlLabel value="MALE" control={<Radio />} label="Nam" />
                                            </RadioGroup>
                                        </FormControl>
                                        <TextField
                                            variant="outlined"
                                            label="Ngày bắt đầu làm việc"
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            value={startWork}
                                        />
                                        <TextField
                                            variant="outlined"
                                            label="Địa chỉ"
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            value={address}
                                        />
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Phòng Ban</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={department}
                                                label="Phòng ban"
                                                onChange={handleChange}
                                            >
                                                {departmentList?.map((item) => (
                                                    <MenuItem key={item.id} value={item.id}>
                                                        {item.name}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                        <TextField
                                            variant="outlined"
                                            label="Vai trò"
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            value={role}
                                        />
                                    </Stack>
                                </Grid>

                            </Grid>
                            <Stack spacing={2} margin={2} direction="row">
                                <Button variant="contained" onClick={handleUpdateUser}>Cập nhật</Button>
                                <Link href={`/UserList/${userDetail?.id}`} passHref>
                                    <Button variant="text" component="a">
                                        Hủy
                                    </Button>
                                </Link>
                            </Stack>
                            <Box sx={{ p: 2 }} />

                        </Box>
                    </Box>

                </Stack>
            </div>

        </Container>
    )


}

export default ViewDetailUser