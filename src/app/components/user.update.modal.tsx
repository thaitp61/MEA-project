'use client'
import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { DialogContentText, FormControl, FormControlLabel, FormLabel, Grid, InputLabel, MenuItem, Radio, RadioGroup, Select, SelectChangeEvent, Stack, TextField } from '@mui/material';

import { mutate } from "swr"
import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import ApiContext from '../context/ApiContext';
import "./layout.css"
interface IProps {
    showModalUpdate: boolean;
    setShowModalUpdate: (value: boolean) => void;
    setOpen: (value: any) => void;
    user: IUser | null;
    setUser: (value: IUser | null) => void;
    getUser: () => void;
    departmentList: IDepartment[];
}


export default function UpdateUser(props: IProps) {
    const { showModalUpdate, setShowModalUpdate, user, setUser, setOpen, getUser, departmentList } = props;
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


    // const [deparmentDescription, setDeparmentDescription] = useState<string>("");
    const formatDate = (dateString: string) => {
        const dateObject = new Date(dateString);
        const day = dateObject.getUTCDate();
        const month = dateObject.getUTCMonth() + 1;
        const year = dateObject.getUTCFullYear();
        return `${day}/${month}/${year}`;
    };


    useEffect(() => {
        if (user && user.id) {
            setUserID(user.id);
            setUserName(user?.name);
            setPhone(user?.phone)
            setEmail(user?.email)
            setAddress(user?.address)
            setDepartment(user?.department?.id)
            setGender(user?.gender)
            setRole(user?.role?.name)
            setCitizenID(user?.citizenId)
            setBirthday(user?.birthday)
           
            const formattedStartWork = formatDate(user?.startWorkDate);
            const formattedBirthday = formatDate(user?.birthday);
            setStartWork(formattedStartWork)
            setBirthday(formattedBirthday)
        }
    }, [user])

    const handleChange = (event: SelectChangeEvent) => {
        setDepartment(event.target.value as string);
    };

    const handleCloseEditUser = () => {
        setShowModalUpdate(false);
        setUser(null);
        setOpen(null);
    };

    const handleUpdateUser = async () => {
        // if (!userName) {
        //     toast.error("Không để trống tên phòng ban!")
        //     return;
        // }
        // if (!role) {
        //     toast.error("Không để trống mô tả phòng ban")
        //     return;
        // }
        // if (!department) {
        //     toast.error("Không để trống mô tả phòng ban")
        //     return;
        // }
        // if (!birthday) {
        //     toast.error("Không để trống ngày sinh")
        // }
        // try {
        //     const response = await ApiContext.put(`/department/${userID}`, {
        //         name: userName,
        //         phone: phone,
        //         address: address,
        //         citizenId: citizenId,
        //         gender: gender,
        //         roleId:
        //             password:
        //         departmentId:
        //     });
        //     if (response.status === 200) {
        //         getDepartment();
        //         toast.success("Cập nhật thành công");
        //         // Thực hiện các hành động khác sau khi cập nhật thành công
        //     }
        // } catch (error) {
        //     toast.error("Cập nhật thất bại");
        //     console.error("Lỗi khi gọi API:", error);
        //     // Xử lý lỗi khi gọi API
        // }

        handleCloseEditUser();
    };
    const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGender(event.target.value); // Cập nhật giá trị giới tính khi radio button thay đổi
    };



    return (
        <Dialog
            open={showModalUpdate}
            onClose={handleCloseEditUser}
            scroll='paper'
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
            fullWidth
            maxWidth='md'
        >
            <DialogTitle className="title-text" id="scroll-dialog-title">CHỈNH SỬA NHÂN VIÊN</DialogTitle>
            <DialogContent sx={{ color: "rgb(0, 167, 111)" }} dividers>
                <DialogTitle>Chi tiết nhân viên</DialogTitle>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Stack spacing={2} margin={2}>
                            <TextField variant="outlined"
                                id="userID"
                                label="Mã nhân viên"
                                InputProps={{
                                    readOnly: true,
                                }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={userID}
                            />
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
            </DialogContent>
            <DialogActions>
                <Button
                    sx={{ color: 'rgb(0, 167, 111)' }}
                    onClick={handleCloseEditUser}
                >Huỷ</Button>
                <Button
                    variant="contained"
                    color='success'
                    sx={{ backgroundColor: 'rgb(0, 167, 111)', color: '#fff' }}
                    onClick={handleUpdateUser}
                >Xác nhận</Button>
            </DialogActions>
        </Dialog>
    );


}