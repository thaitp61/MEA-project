"use client"
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
import { Autocomplete, Box, Checkbox, DialogContentText, FormControl, Grid, InputLabel, MenuItem, Paper, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField } from '@mui/material';

import { mutate } from "swr"
import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { format } from "date-fns";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { FilterComparator } from '@/app/models/common';
import ApiContext from '../context/ApiContext';

const ID_ADMIN = "b5dc78c3-7fa6-738d-f675-f8098e4827e5";
const ID_QLK = "3a0ce6a3-040d-385b-dbf6-855815a4c9b6";
const ID_QLBT = "429f5e78-61aa-0f61-06fd-8e7d4e6e8969";
const ID_STAFF = "2375e466-45d6-f1c2-9170-af1dcc2f5f6c";
const ID_QLVT = "c311038c-aef9-c4b2-1d25-7b416b5f20a4";


interface IProps {
    showModalCreate: boolean;
    setShowModalCreate: (value: boolean) => void;
    departmentList: IDepartment[];
    getUser: () => void;
}


export default function CreateUser(props: IProps) {
    const { showModalCreate, setShowModalCreate, departmentList, getUser } = props;
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [startWorkDate, setStartWorkDate] = useState('');
    const [department, setDepartment] = useState<string>('')
    const [role, setRole] = useState<string>('');
    const handleCloseModal = () => {

        setShowModalCreate(false);
    };
    const handleCreateUser = async () => {
        if (!username) {
            toast.error("Không để trống tài khoản!")
            return;
        }
        if (!password) {
            toast.error("Không để trống mật khẩu")
            return;
        }
        if (!password) {
            toast.error("Không để ngày bắt đầu làm việc")
            return;
        }
        if (!password) {
            toast.error("Không để trống vai trò")
            return;
        }
        if (!password) {
            toast.error("Không để trống phòng ban")
            return;
        }
        try {
            const response = await ApiContext.post(`/user-admin/create-user`, {
                username: username,
                password: password,
                startWorkDate: startWorkDate,
                roleId: role,
                departmentId: department
            });
            if (response.status === 201 || response.status === 200) {
                toast.success("Cập nhật thành công");
                getUser();
                // Thực hiện các hành động khác sau khi cập nhật thành công
            }
        } catch (error) {
            toast.error("Cập nhật thất bại");
            // Xử lý lỗi khi gọi API
        }

        handleCloseModal();
    };
    console.log("deparment", department)

    return (
        <Dialog
            open={showModalCreate}
            onClose={handleCloseModal}
            scroll='paper'
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
            fullWidth
            maxWidth='sm'
        >
            <DialogTitle className="title-text" id="scroll-dialog-title-create">TẠO MỚI NHÂN VIÊN</DialogTitle>
            <DialogContent sx={{ color: "rgb(0, 167, 111)" }} dividers>
                <Stack spacing={2} margin={2}>
                    <TextField
                        id="username"
                        label="Tài khoản"
                        value={username}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setUsername(event.target.value);
                        }}
                    />
                </Stack>
                <Stack spacing={2} margin={2}>
                    <TextField
                        id="password"
                        label="Mật khẩu"
                        value={password}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setPassword(event.target.value);
                        }}
                    />
                </Stack>
                <Stack spacing={2} margin={2}>
                    <TextField
                        type="date"
                        id="startWorkDate"
                        variant="outlined"
                        label="Ngày bắt đầu làm việc"
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={startWorkDate}
                        onChange={(e) => setStartWorkDate(e.target.value)}
                    />
                </Stack>
                <Stack spacing={2} margin={2}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Phòng Ban</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={department}
                            label="Phòng ban"
                            onChange={(e) => setDepartment(e.target.value)}
                        >
                            {departmentList?.map((item) => (
                                <MenuItem key={item.id} value={item.id}>
                                    {item.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Stack>
                <Stack spacing={2} margin={2}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Vai trò</InputLabel>
                        <Select
                            id="role"
                            value={role}
                            label="Vai trò"
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <MenuItem value={ID_ADMIN}>Quản trị viên</MenuItem>
                            <MenuItem value={ID_QLK}>Quản lý kho</MenuItem>
                            <MenuItem value={ID_QLBT}>Quản lý bảo trì</MenuItem>
                            <MenuItem value={ID_QLVT}>Quản lý vật tư</MenuItem>
                            <MenuItem value={ID_STAFF}>Nhân viên</MenuItem>
                        </Select>
                    </FormControl>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button
                    sx={{ color: 'rgb(0, 167, 111)' }}
                    onClick={handleCloseModal}
                >Huỷ</Button>
                <Button
                    variant="contained"
                    color='success'
                    sx={{ backgroundColor: 'rgb(0, 167, 111)', color: '#fff' }}
                    onClick={handleCreateUser}
                >Xác nhận</Button>
            </DialogActions>
        </Dialog>

    );

}