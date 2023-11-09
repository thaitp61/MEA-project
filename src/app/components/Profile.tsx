"use client";
import React, { useCallback } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import {
    Box,
    Container,
    FormControl,
    InputLabel,
    MenuItem,
    Modal,
    OutlinedInput,
    Select,
} from "@mui/material";

const UserProfile: React.FC = () => {

    const [openModal, setOpenModal] = React.useState(false);
    const handleOpen = () => setOpenModal(true);
    const handleClose = () => setOpenModal(false);

    const [gender, setGender] = React.useState("");

    const handleChangeGender = (event: any) => {
        setGender(event.target.value);
    };

    const handleSubmit = () => {
        handleClose();
    };

    return (
        <Container maxWidth={false}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                    <Card>
                        <CardHeader title="Chỉnh Sửa Thông Tin" subheader="Hồ Sơ Của Bạn" />
                        <CardContent>
                            <Grid container spacing={1}>
                                <Grid item xs={12} sm={6}>
                                    <TextField fullWidth label="Họ tên" variant="outlined" />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField fullWidth label="Tên" variant="outlined" />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth variant="outlined">
                                        <InputLabel id="gender-label">Giới tính</InputLabel>
                                        <Select
                                            labelId="gender-label"
                                            id="gender"
                                            label="Giới tính"
                                            value={gender}
                                            onChange={handleChangeGender}
                                            input={<OutlinedInput label="Giới tính" />}
                                        >
                                            <MenuItem value="Nam">Nam</MenuItem>
                                            <MenuItem value="Nữ">Nữ</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Số điện thoại"
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField fullWidth label="Email" variant="outlined" />
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Card>
                        <CardHeader
                            avatar={<Avatar src="/Avatar.jpg" />}
                            title="Nguyễn Hoàng Tân"
                            subheader="Vai trò: Quản Lý Cơ Sở Vật Chất"
                        />
                        <CardContent>
                            {/* <Button
                style={{ height: "2.5rem" }}
                {...getRootProps()}
                variant="contained"
                color="primary"
              >
                <AiOutlineUpload />
                Upload Image
              </Button> */}
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            <Modal
                open={openModal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "100vh",
                    }}
                >
                    <Box
                        sx={{
                            backgroundColor: "white",
                            padding: "50px",
                            borderRadius: "8px",
                            textAlign: "center",
                        }}
                    >
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Bạn muốn cập nhật thông tin?
                        </Typography>
                        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                            <Button onClick={handleClose} sx={{ mr: 2 }}>
                                Đóng
                            </Button>
                            <Button onClick={handleSubmit} variant="contained">
                                Cập nhật
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Modal>
            <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                    <Card>
                        <CardHeader title="Đổi mật khẩu" />
                        <CardContent>
                            <Grid container spacing={1}>
                                <Grid item xs={12}>
                                    <TextField fullWidth label="Mật khẩu cũ" variant="outlined" />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Mật khẩu mới"
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Xác nhận mật khẩu"
                                        variant="outlined"
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                onClick={handleOpen}
                                style={{ marginTop: "1rem" }}
                                variant="contained"
                                color="primary"
                            >
                                Cập nhật thông tin
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>

    );
};

export default UserProfile;
