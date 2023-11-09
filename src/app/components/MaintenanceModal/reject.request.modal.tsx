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
import { Autocomplete, Box, Checkbox, DialogContentText, FormControl, Grid, InputLabel, List, ListItem, MenuItem, Paper, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField } from '@mui/material';

import { mutate } from "swr"
import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { format } from "date-fns";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { FilterComparator } from '@/app/models/common';
import ApiContext from '@/app/context/ApiContext';

interface IProps {
    showModal: boolean;
    setShowModal: (value: boolean) => void;
    repairRequest: IRepairRequest | null;
    setOpen: (value: any) => void;
    getRequestRepair: () => void;
}


export default function RejectModal(props: IProps) {

    const { showModal, setShowModal, setOpen, getRequestRepair, repairRequest } = props;
    const [repairRequestID, setRepairRequestID] = useState<string>('');
    const [note, setNote] = useState<string>('');


    const handleCloseModal = () => {
        setShowModal(false);
        setNote('');
        setOpen(null);
    };
    useEffect(() => {
        if (repairRequest && repairRequest.id) {
            setRepairRequestID(repairRequest.id);
        }
    }, [repairRequest])
    const handleRejectRequestRepair = async () => {
        if (!note) {
            toast.error("Không để trống ghi chú")
            return;
        }
        try {
            const response = await ApiContext.put(`/repair-request/${repairRequestID}/cancel`, {
                note: note,
            });
            if (response.status === 200) {
                getRequestRepair();
                toast.success("Cập nhật thành công");
                // Thực hiện các hành động khác sau khi cập nhật thành công
            }
        } catch (error) {
            toast.error("Cập nhật thất bại");
            console.error("Lỗi khi gọi API:", error);
            // Xử lý lỗi khi gọi API
        }
        handleCloseModal();

    }

    return (
        <Dialog
            open={showModal}
            onClose={setShowModal}
            scroll='paper'
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
            fullWidth
            maxWidth='sm'
        >
            <DialogTitle className="title-text" id="scroll-dialog-title">TỪ CHỐI YÊU CẦU</DialogTitle>
            <DialogContent sx={{ color: "rgb(0, 167, 111)" }} dividers>
                <DialogTitle>Chi tiết yêu cầu:</DialogTitle>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Typography variant="body1" >
                            <span>Người tạo: </span>
                            <span style={{ color: 'black' }}>{repairRequest?.createdBy?.name}</span>
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body1">
                            <span>Ngày tạo: </span>
                            <span style={{ color: 'black' }}>{repairRequest?.createdAt ? format(new Date(repairRequest?.createdAt), 'dd/MM/yyyy') : ''}</span>
                        </Typography>
                    </Grid>

                    <Grid item xs={6}>
                        <Typography variant="body1">
                            <span>Mã thiết bị: </span>
                            <span style={{ color: 'black' }}>{repairRequest?.equipment?.code}</span>
                        </Typography>
                    </Grid>

                    <Grid item xs={6}>
                        <Typography variant="body1">
                            <span>Tên thiết bị: </span>
                            <span style={{ color: 'black' }}>{repairRequest?.equipment?.name}</span>
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="body1">
                            <span>Mô tả tình trạng: </span>
                            <span style={{ color: 'black' }}>{repairRequest?.description}</span>
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body1" >Hình ảnh:</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <List>
                            {repairRequest?.imageUrls.map((image, index) => (
                                <ListItem key={index}>
                                    <img src={image} alt={`Hình ảnh ${index}`} width="100" height="100" />
                                </ListItem>
                            ))}
                        </List>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body1" >Ghi chú:</Typography>
                    </Grid>
                    <Grid item xs={12} >
                        <FormControl fullWidth sx={{ width: "100%" }}>
                            <TextField
                                multiline
                                rows={4}
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                            />
                        </FormControl>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button
                    sx={{ color: 'rgb(0, 167, 111)' }}
                    onClick={handleCloseModal}
                >Huỷ</Button>
                <Button
                    variant="contained"
                    color='info'
                    sx={{ backgroundColor: 'error.main', color: '#fff' }}
                    onClick={handleRejectRequestRepair}
                >Xác nhận</Button>
            </DialogActions>
        </Dialog>

    );

}