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
import ApiContext from '@/app/context/ApiContext';
import Divider from '@mui/material/Divider';

interface IProps {
    showModalCreate: boolean;
    setShowModalCreate: (value: boolean) => void;
    equipments: IEquipment[] | null;
    supply: Supply[];
}
interface Supply {
    id: string,
    name: string,
    code: string,
    unit: string,
    imageUrls: void,

}
interface SupplyId {
    supplyId: string,
    quantity: number
}
const top100Films = [
    {
        "code": "53vwp86akq",
        "id": "e34b99c7-c2f0-4d5a-8985-164c27c1e10c",
        "name": "0pou31mkwk",
        "unit": "re99xgm84e"
    },
    {
        "code": "i3a8oft17p",
        "id": "7cf0a4f0-029a-4708-8b55-adf5c9d8356a",
        "name": "8m4yjyfr4x",
        "unit": "kczjdy34y7"
    },
    {
        "code": "2gid8ugeqa",
        "id": "09cc49fb-3c5b-41be-9f6d-c57aba264cf6",
        "name": "3cp0194nqt",
        "unit": "j2autb5hn2"
    },
    {
        "code": "g89w4batwj",
        "id": "2b6370d1-8d58-46ab-86d1-013208e6aa1e",
        "name": "mm8hx5xwyv",
        "unit": "oozodcd4ab"
    },
    {
        "code": "2ctlaz7y18",
        "id": "b9305230-2694-4d33-8169-dc2c176af4ec",
        "name": "dnhupm0hpu",
        "unit": "zvmvx1kfe4"
    },
    {
        "code": "sole6mnsxm",
        "id": "1f52f57d-0af6-4807-84b1-01e9e2bd073e",
        "name": "k6b820vza9",
        "unit": "ashfyo4q9w"
    },
    {
        "code": "gge6tyxz9d",
        "id": "b0734bb4-44fc-48f5-bce0-2b30023f5c0d",
        "name": "7dbgvytkf1",
        "unit": "3i6jl4r2og"
    },
    {
        "code": "qzlq2b5pto",
        "id": "9dbf879c-d458-420a-ab02-547133660f2e",
        "name": "h6bgkcyamc",
        "unit": "i6ozeemad2"
    },
    {
        "code": "lcoyzoshvt",
        "id": "3e946d63-58aa-4217-8e3a-d2ccaa94ddbf",
        "name": "f4sogf07r7",
        "unit": "yr4dp8yclv"
    },
    {
        "code": "eubukkl850",
        "id": "2b9eee58-9fd0-495e-819b-46b9a1ad71f9",
        "name": "u0nbla811u",
        "unit": "zzul0u9sn8"
    },
    {
        "code": "du0oiq45oe",
        "id": "aa4f5d3e-8a50-4ef4-8cdc-8d45815f5bf4",
        "name": "wbzzzvpob4",
        "unit": "bhrg2h8vtq"
    },
    {
        "code": "04gyqigzrw",
        "id": "c1b9ac10-ee47-43f3-819e-db6c38c9b659",
        "name": "5x65mnr5rw",
        "unit": "92wl4wkfhe"
    },
    {
        "code": "ej9vy286mo",
        "id": "ed45ee34-0e69-4b14-a005-5d7daa84795a",
        "name": "kxhecdl3wz",
        "unit": "wg9ljkcjcq"
    },
    {
        "code": "KT",
        "id": "d6cb4d13-eb1a-443c-a19d-aa83e5d277fd",
        "name": "Kim Tiêm",
        "unit": "Cái"
    }

];
type TableCellCustomProps = {
    value: string;
};

const TableCellCustom: React.FC<TableCellCustomProps> = ({ value }) => {
    let backgroundColor, textColor, textContent;

    if (value === 'ACTIVE') {
        backgroundColor = 'rgb(0, 167, 111)';
        textColor = '#fff';
        textContent = 'HOẠT ĐỘNG';
    } else if (value === 'INACTIVE') {
        backgroundColor = 'rgba(240, 68, 56, 0.12)';
        textColor = 'rgb(180, 35, 24)';
        textContent = 'Dừng';
    } else if (value === 'FIXING') {
        backgroundColor = '#FF5722';
        textColor = '#fff';
        textContent = 'BẢO TRÌ';
    } else {
        backgroundColor = '#9E9E9E';
        textColor = '#fff';
        textContent = value;
    }

    return (
        <Box
            component="div"
            sx={{
                display: 'inline',
                p: 1,
                m: 1,
                bgcolor: backgroundColor,
                color: textColor,
                border: '1px solid',
                borderColor: (theme) =>
                    theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
                borderRadius: "12px",
                fontSize: '0.8rem',
                fontWeight: 600,
                width: '90px'
            }}
        >
            {textContent}
        </Box>
    );
};


export default function CreateMaintenace(props: IProps) {
    const { showModalCreate, setShowModalCreate, equipments, supply } = props;

    const [type, setType] = useState('');
    const [replaceMatrial, setReplaceMaterial] = useState([]);
    const [startAt, setStartAt] = useState('');
    const [endAt, setEndAt] = useState('');
    const [description, setDescription] = useState('');
    const [equipmentIds, setEquipmentIds] = useState<string[]>([]);
    const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
    const checkedIcon = <CheckBoxIcon fontSize="small" />;
    const [selectedSupply, setSelectedSupply] = useState<Supply[]>([]);
    const [quantityChanges, setQuantityChanges] = useState<SupplyId[]>([]);
    // const [options, setOptions] = useState([]);
    // const [searchSupplyCalled, setSearchSupplyCalled] = useState(false);
    useEffect(() => {
        if (equipments) {
            const ids = equipments.map((equipment) => equipment.id);
            setEquipmentIds(ids);
        }
        // const initialQuantityChanges = selectedSupply.map((row) => {
        //     const existingQuantityChange = quantityChanges.find((item) => item.supplyId === row.id);
        //     return existingQuantityChange || { supplyId: row.id, quantity: 1 };
        // });
        // setQuantityChanges(initialQuantityChanges);

        // if (!searchSupplyCalled) {
        //     const searchSupply = async () => {
        //         try {
        //             const response = await apiClient.get('/supply/search', {
        //                 params: {
        //                     page: 0,
        //                     pageSize: 20,
        //                     filters: [`search||${FilterComparator.LIKE}||`],
        //                 },
        //             });
        //             const supply = response?.data?.data;
        //             setOptions(supply);
        //             setSearchSupplyCalled(true); // Đánh dấu rằng đã gọi searchSupply
        //         } catch (error) {
        //             console.error('Lỗi khi gọi API:', error);
        //         }
        //     };
        //     searchSupply();
        // }
    }, [equipments]);


    const handleCloseModal = () => {
        setStartAt("");
        setEquipmentIds([]);
        setDescription('');
        setReplaceMaterial([]);
        setEndAt('');
        setType('');
        setShowModalCreate(false);
    };
    const handleCreateMaintenance = async () => {
        if (!startAt) {
            toast.error("Không để trống ngày bắt đầu")
            return;
        }
        if (!endAt) {
            toast.error("Không để trống ngày kết thúc")
            return;
        }
        if (!description) {
            toast.error("Không để trống nội dung công việc")
            return;
        }
        if (!type) {
            toast.error("Không để trống loại đơn")
            return;
        }
        // try {
        //     const response = await ApiContext.post(`/repair-report`, {
        //         type: type,
        //         description: description,
        //         startAt: startAt,
        //         endAt: endAt,
        //         equipmentIds: equipmentIds,
        //         replaceItems: quantityChanges
        //     });
        //     if (response.status === 201 || response.status === 200) {
        //         toast.success("Cập nhật thành công");
        //         // Thực hiện các hành động khác sau khi cập nhật thành công
        //     }
        // } catch (error) {
        //     toast.error("Cập nhật thất bại");
        //     // Xử lý lỗi khi gọi API
        // }

        handleCloseModal();
    };

    const handleQuantityChange = (id: string, quantity: number,) => {
        const updatedQuantityChanges = quantityChanges.map((item) => {
            if (item.supplyId === id) {
                return { ...item, quantity };
            }
            return item;
        });
        setQuantityChanges(updatedQuantityChanges);
    };
    const handleChangeType = (event: any) => {
        setType(event.target.value);
    };



    const handleSelectionChange = (event: React.SyntheticEvent, newValue: any) => {
        setSelectedSupply(newValue);
    };

    return (
        <Dialog
            open={showModalCreate}
            onClose={handleCloseModal}
            scroll='paper'
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
            fullWidth
            maxWidth='md'
        >
            <DialogTitle className="title-text" id="scroll-dialog-title">TẠO ĐƠN BẢO TRÌ</DialogTitle>
            <DialogContent sx={{ color: "rgb(0, 167, 111)" }} dividers>
                <DialogTitle sx={{ fontWeight: 'bold' }}>Thời gian</DialogTitle>

                <Grid container spacing={2}>
                    <Grid item xs={2.5}>
                        <Typography variant="body1" style={{ marginLeft: "40px", marginTop: "10px" }}>Ngày bắt đầu:</Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <FormControl fullWidth sx={{ width: "100%" }}>
                            <TextField
                                type="date"
                                id="startImportDate"
                                variant="outlined"
                                fullWidth
                                value={startAt}
                                onChange={(e) => setStartAt(e.target.value)}
                                inputProps={{
                                    style: { height: "0px" },
                                }}
                                style={{ marginTop: "5px" }}
                                sx={{
                                    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                                        borderColor: "black",
                                    },
                                }}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={2.5}>
                        <Typography variant="body1" style={{ marginLeft: "40px", marginTop: "10px" }}>
                            Ngày kết thúc:
                        </Typography>

                    </Grid>
                    <Grid item xs={3}>
                        <FormControl fullWidth sx={{ width: "100%" }}>
                            <TextField
                                type="date"
                                id="endImportDate"
                                variant="outlined"
                                fullWidth
                                value={endAt}
                                onChange={(e) => setEndAt(e.target.value)}
                                inputProps={{
                                    style: { height: "0px" },
                                }}
                                style={{ marginTop: "5px" }}
                                sx={{
                                    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                                        borderColor: "black",
                                    },
                                }}
                            />
                        </FormControl>
                    </Grid>
                </Grid>



                {equipments?.map((row) => (
                    <div key={row.id}>
                        {/* Chi tiết bảo trì */}
                        <DialogTitle sx={{ fontWeight: 'bold' }}>Chi tiết bảo trì</DialogTitle>
                        <Stack spacing={2}>

                            <Grid container spacing={2}>
                                <Grid item xs={2.5}>
                                    <Typography variant="body1" style={{ marginLeft: "40px", marginTop: "10px" }}>
                                        Thiết bị bảo trì:
                                    </Typography>
                                </Grid>
                                <Grid item xs={9}>
                                    <TableContainer component={Paper} sx={{ width: 'max-content' }}>
                                        <Table sx={{ minWidth: 600 }} aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell align="left">Mã thiết bị</TableCell>
                                                    <TableCell align="left">Tên thiết bị</TableCell>
                                                    <TableCell align="left">Loại thiết bị</TableCell>
                                                    <TableCell align="left">Phòng ban</TableCell>
                                                    {/* <TableCell align="right">Trạng thái</TableCell> */}
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                <TableRow
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell align="left">{row?.code}</TableCell>
                                                    <TableCell align="left">{row?.name}</TableCell>
                                                    <TableCell align="left">{row?.equipmentCategory?.name}</TableCell>
                                                    <TableCell align="left">{row?.department?.name}</TableCell>
                                                    {/* <TableCell align="right">
                                    {row?.currentStatus && (
                                        <TableCellCustom value={row.currentStatus} />
                                    )}
                                </TableCell> */}
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Grid>
                                <Grid item xs={2.5}>
                                    <Typography variant="body1" style={{ marginLeft: "40px", marginTop: "10px" }}>
                                        Loại đơn:
                                    </Typography>
                                </Grid>
                                <Grid item xs={8.5}>
                                    <FormControl fullWidth sx={{ width: "100%" }} size='small'>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={type}
                                            inputProps={{
                                                style: { height: "0px" },
                                            }}
                                            style={{ marginTop: "5px" }}
                                            sx={{
                                                "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                                                    borderColor: "black",
                                                },
                                            }}
                                            onChange={handleChangeType}
                                        >
                                            <MenuItem value={"FIXING"}>Bảo trì</MenuItem>
                                            <MenuItem value={"REPAIR"}>Sửa chữa</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={2.5}>
                                    <Typography variant="body1" style={{ marginLeft: "40px", marginTop: "10px" }}>
                                        Nội dung công việc:
                                    </Typography>
                                </Grid>
                                <Grid item xs={8.5}>
                                    <FormControl fullWidth sx={{ width: "100%" }}>
                                        <TextField
                                            multiline
                                            rows={4}
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={2.5}>
                                    <Typography variant="body1" style={{ marginLeft: "40px", marginTop: "10px" }}>
                                        Người thực hiện:
                                    </Typography>
                                </Grid>
                                <Grid item xs={8.5}>
                                    <FormControl fullWidth sx={{ width: "100%" }}>
                                        <TextField
                                            multiline
                                            rows={2}
                                        />
                                    </FormControl>
                                </Grid>
                            </Grid>

                            {/* Vật tư thay thế dự kiến */}
                            <DialogTitle sx={{ fontWeight: 'bold' }}>Vật tư thay thế dự kiến</DialogTitle>
                            <Grid container spacing={2}>
                                <Grid item xs={2.5}>
                                    <Typography variant="body1" style={{ marginLeft: "40px", marginTop: "10px" }}>
                                        Tìm kiếm:
                                    </Typography>
                                </Grid>
                                {/* Thêm phần tìm kiếm và Autocomplete ở đây */}
                                <Grid item xs={8}>
                                    <Autocomplete
                                        multiple
                                        id="checkboxes-tags-demo"
                                        options={top100Films}
                                        disableCloseOnSelect
                                        getOptionLabel={(option) => option.name}
                                        value={selectedSupply}
                                        onChange={handleSelectionChange}
                                        renderOption={(props, option, { selected }) => (
                                            <li {...props}>
                                                <Checkbox
                                                    icon={icon}
                                                    checkedIcon={checkedIcon}
                                                    style={{ marginRight: 8 }}
                                                    checked={selected}
                                                />
                                                {option.name} {option.code}
                                            </li>
                                        )}
                                        style={{ width: 590 }}
                                        renderInput={(params) => (
                                            <TextField {...params} placeholder="Vật tư" />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={2.5}>
                                    <Typography variant="body1" style={{ marginLeft: "40px", marginTop: "10px" }}>
                                        Danh sách vật tư:
                                    </Typography>
                                </Grid>
                                <Grid item xs={8}>
                                    <TableContainer component={Paper} sx={{ width: 'max-content' }}>
                                        <Table sx={{ minWidth: 600 }} aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell align="left" >Mã vật tư</TableCell>
                                                    <TableCell align="left">Tên vật tư</TableCell>
                                                    <TableCell align="left">Đơn vị tính</TableCell>
                                                    <TableCell align="left">Số lượng</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {selectedSupply?.map((row) => (
                                                    <TableRow
                                                        key={row.id}
                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    >
                                                        <TableCell align="left">{row?.code}</TableCell>
                                                        <TableCell align="left">{row?.name}</TableCell>
                                                        <TableCell align="left">{row?.unit}</TableCell>
                                                        <TableCell align="left">
                                                            <TextField
                                                                type="number"
                                                                value={quantityChanges.find((item) => item.supplyId === row.id)?.quantity || 1}
                                                                inputProps={{ min: 1, max: 10 }}
                                                                onChange={(e) => handleQuantityChange(row.id, +e.target.value)}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Grid>
                            </Grid>
                            <Divider sx={{ bgcolor: 'text.primary' }} />
                        </Stack>
                    </div>
                ))}

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
                    onClick={handleCreateMaintenance}
                >Xác nhận</Button>
            </DialogActions>
        </Dialog>

    );

}