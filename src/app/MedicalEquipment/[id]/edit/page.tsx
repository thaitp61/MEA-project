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
import Divider from '@mui/material/Divider';

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
    const [equipmentDetail, setEquipmentDetail] = useState<IEquipment | null>()
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

    const GetEquipmentDetail = async () => {
        try {
            const response = await ApiContext.get(`/equipment/${params.id}`);
            const equipmentDetail = response?.data
            setEquipmentDetail(equipmentDetail)
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
        GetEquipmentDetail();
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
        </Container>
    )
}

export default ViewDetailUser