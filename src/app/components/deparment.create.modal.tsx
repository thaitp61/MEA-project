// 'use client'
// import * as React from 'react';
// import Button from '@mui/material/Button';
// import { styled } from '@mui/material/styles';
// import Dialog from '@mui/material/Dialog';
// import DialogTitle from '@mui/material/DialogTitle';
// import DialogContent from '@mui/material/DialogContent';
// import DialogActions from '@mui/material/DialogActions';
// import IconButton from '@mui/material/IconButton';
// import CloseIcon from '@mui/icons-material/Close';
// import Typography from '@mui/material/Typography';
// import { DialogContentText, Grid, Stack, TextField } from '@mui/material';

// import { mutate } from "swr"
// import { useState, useEffect } from 'react';
// import { toast } from 'react-hot-toast';
// import ApiContext from '../context/ApiContext';

// interface IProps {
//     showModalUpdate: boolean;
//     setShowModalUpdate: (value: boolean) => void;
//     setOpen: (value: any) => void;
//     deparment: IDepartment | null;
//     setDeparments: (value: IDepartment | null) => void;
//     getDepartment: () => void;
// }

// export default function UpdateDeparment(props: IProps) {
//     const { showModalUpdate, setShowModalUpdate, deparment, setDeparments, setOpen, getDepartment } = props;

//     const [departmentID, setDepartmentID] = useState<string>('');
//     const [departmentName, setDepartmentName] = useState<string>('');
//     const [deparmentDescription, setDeparmentDescription] = useState<string>("");


//     useEffect(() => {
//         if (deparment && deparment.id) {
//             setDepartmentID(deparment.id);
//             setDepartmentName(deparment.name);
//             setDeparmentDescription(deparment.description);
//         }
//     }, [deparment])

//     const handleCloseEditDepartment = () => {
//         setDepartmentName("");
//         setDeparmentDescription("");
//         setShowModalUpdate(false);
//         setDeparments(null);
//         setOpen(null);
//     };

//     const handleUpdateDepartment = async () => {
//         if (!departmentName) {
//             toast.error("Không để trống tên phòng ban!")
//             return;
//         }
//         if (!deparmentDescription) {
//             toast.error("Không để trống mô tả phòng ban")
//             return;
//         }
//         try {
//             const response = await ApiContext.put(`/department/${departmentID}`, {
//                 name: departmentName,
//                 description: deparmentDescription,
//                 status: "ACTIVE"
//             });
//             if (response.status === 200) {
//                 getDepartment();
//                 toast.success("Cập nhật thành công");
//                 // Thực hiện các hành động khác sau khi cập nhật thành công
//             }
//         } catch (error) {
//             toast.error("Cập nhật thất bại");
//             console.error("Lỗi khi gọi API:", error);
//             // Xử lý lỗi khi gọi API
//         }
//         handleCloseEditDepartment();
//     };

//     return (
       
//     );


// }