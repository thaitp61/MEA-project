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
import { DialogContentText, Grid, Stack, TextField } from '@mui/material';

import { mutate } from "swr"
import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import ApiContext from '../context/ApiContext';

interface IProps {
    showModalUpdate: boolean;
    setShowModalUpdate: (value: boolean) => void;
    setOpen: (value: any) => void;
    department: IDepartment | null;
    setDeparments: (value: IDepartment | null) => void;
    getDepartment: () => void;
}

export default function UpdateDeparment(props: IProps) {
    const { showModalUpdate, setShowModalUpdate, department, setDeparments, setOpen, getDepartment } = props;

    const [departmentID, setDepartmentID] = useState<string>('');
    const [departmentName, setDepartmentName] = useState<string>('');
    const [deparmentDescription, setDeparmentDescription] = useState<string>("");
    const [deparmentCreateAt, setDeparmentCreateAt] = useState<string>("");



    useEffect(() => {
        if (department && department.id) {
            setDepartmentID(department.id);
            setDepartmentName(department.name);
            setDeparmentDescription(department.description);
            const dateObject = new Date(department?.createdAt);

            // Trích xuất ngày, tháng và năm
            const day = dateObject.getUTCDate();
            const month = dateObject.getUTCMonth() + 1;
            const year = dateObject.getUTCFullYear();

            // Tạo chuỗi ngày/tháng/năm
            const formattedDate = `${day}/${month}/${year}`;
            setDeparmentCreateAt(formattedDate)
        }
    }, [department])

    const handleCloseEditDepartment = () => {
        setDepartmentName("");
        setDeparmentDescription("");
        setShowModalUpdate(false);
        setDeparments(null);
        setOpen(null);
    };


    const handleUpdateDepartment = async () => {
        if (!departmentName) {
            toast.error("Không để trống tên phòng ban!")
            return;
        }
        if (!deparmentDescription) {
            toast.error("Không để trống mô tả phòng ban")
            return;
        }
        try {
            const response = await ApiContext.put(`/department/${departmentID}`, {
                name: departmentName,
                description: deparmentDescription,
                status: "ACTIVE"
            });
            if (response.status === 200) {
                getDepartment();
                toast.success("Cập nhật thành công");
                // Thực hiện các hành động khác sau khi cập nhật thành công
            }
        } catch (error) {
            toast.error("Cập nhật thất bại");
            console.error("Lỗi khi gọi API:", error);
            // Xử lý lỗi khi gọi API
        }
        handleCloseEditDepartment();
    };

    return (
        <Dialog
            open={showModalUpdate}
            onClose={handleCloseEditDepartment}
            scroll='paper'
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
            fullWidth
            maxWidth='md'
        >
            <DialogTitle className="title-text" id="scroll-dialog-title">CHỈNH SỬA PHÒNG BAN</DialogTitle>
            <DialogContent sx={{ color: "rgb(0, 167, 111)" }} dividers>
                <DialogTitle>Chi tiết phòng ban</DialogTitle>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Stack spacing={2} margin={2}>
                            <TextField variant="outlined"
                                id="deparmentID"
                                label="Mã phòng ban"
                                value={department?.id}
                                InputProps={{
                                    readOnly: true,
                                }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <TextField
                                variant="outlined"
                                label="Ngày tạo"
                                value={department?.createdAt}
                                InputProps={{
                                    readOnly: true,
                                }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs={6}>
                        <Stack spacing={2} margin={2}>
                            <TextField
                                variant="outlined"
                                label="Tên phòng ban"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={departmentName}
                                onChange={(e) => setDepartmentName(e.target.value)}
                            />
                            <TextField
                                variant="outlined"
                                label="Ngày cập nhật gần đây"
                                InputProps={{
                                    readOnly: true,
                                }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={deparmentCreateAt} />
                        </Stack>
                    </Grid>
                </Grid>
                <Stack spacing={2} margin={2}>
                    <TextField
                        label="Mô tả"
                        multiline
                        rows={4}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={deparmentDescription}
                        onChange={(e) => setDeparmentDescription(e.target.value)}
                    />
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button
                    sx={{ color: 'rgb(0, 167, 111)' }}
                    onClick={handleCloseEditDepartment}
                >Huỷ</Button>
                <Button
                    variant="contained"
                    color='success'
                    sx={{ backgroundColor: 'rgb(0, 167, 111)', color: '#fff' }}
                    onClick={handleUpdateDepartment}
                >Xác nhận</Button>
            </DialogActions>
        </Dialog>
    );


}