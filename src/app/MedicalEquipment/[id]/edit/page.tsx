'use client'
import ApiContext from '@/app/context/ApiContext';
import { Avatar, Box, Button, Card, CardContent, Container, FormControl, FormControlLabel, FormLabel, Grid, Icon, InputLabel, MenuItem, Radio, RadioGroup, Select, SelectChangeEvent, Stack, Tab, Tabs, TextField, Typography } from '@mui/material';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { format } from "date-fns";

const EditDetailUser = ({ params }: { params: { id: string } }) => {
    const [equipmentDetail, setEquipmentDetail] = useState<IEquipment | null>(null)


    const GetEquipmentDetail = async () => {
        try {
            const response = await ApiContext.get(`/equipment/${params.id}`);
            const equipmentDetail = response?.data
            setEquipmentDetail(equipmentDetail)
        } catch (error) {
            console.error('API Error:', error);
        }
    }

    useEffect(() => {
        GetEquipmentDetail();

    }, [params.id]);



    return (
        <Container maxWidth={false}>
            <Link href={'/MedicalEquipment'} style={{ textDecoration: 'none', color: '#1976d2' }}>
                <Button
                    startIcon={<ArrowBackIcon />}
                    variant="text"
                    color="info"
                >
                    Danh sách thiết bị y tế
                </Button>
            </Link>
            <Box sx={{ width: '100%', bgcolor: '#fff', borderRadius: '15px' }}>
                <Grid container spacing={2} m={2}>
                    <Grid item xs={4}>
                        <Stack spacing={2} >
                            <Typography gutterBottom variant="h6" component="div">
                                Thông tin thiết bị
                            </Typography>
                        </Stack>
                    </Grid>
                    <Grid item xs={6}>
                        <Stack spacing={2} margin={2} >
                            <TextField
                                variant="outlined"
                                label="Tên thiết bị"
                            />
                            <TextField
                                variant="outlined"
                                label="Mã thiết bị"
                            />
                            <TextField
                                variant="outlined"
                                label="Nhà cung cấp:"
                            />
                            <TextField
                                variant="outlined"
                                label="Nhà cung cấp:"
                            />
                            <Typography variant="h6" component="div">
                                Mô tả
                            </Typography>
                        </Stack>

                    </Grid>

                </Grid>
            </Box>


        </Container>
    )
}

export default EditDetailUser