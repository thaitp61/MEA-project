"use client"
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HandymanIcon from '@mui/icons-material/Handyman';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import ApiContext from '../context/ApiContext';
import React, { useState, useEffect } from 'react';
import { Container, Tabs, Typography } from '@mui/material';
import { FilterComparator, SortOrder } from '../models/common';

interface Notification {
    id: string;
    createdAt: string;
    updatedAt: string;
    content: string;
    actionType: string;
    actionId: string;
    title: string;
    status: string;
    value: number;
}


function formatTimeAgo(createdAt: string) {
    const createdAtDate = new Date(createdAt);
    const now = new Date();

    const timeDifference = now.getTime() - createdAtDate.getTime();

    const minutes = Math.floor(timeDifference / (1000 * 60));
    if (minutes < 60) {
        return `${minutes} phút trước`;
    }

    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    if (hours < 24) {
        return `${hours} giờ trước`;
    }

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    return `${days} ngày trước`;
}

export default function Notification() {
    const [value, setValue] = React.useState('');
    const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
        // Gọi lại API getNotificationList với các tham số tương ứng
        if (newValue === 'UNREAD') {
            getNotificationList(`status||${FilterComparator.EQUAL}||UNREAD`);
        } else {
            getNotificationList('');
        }
    };

    const [notifications, setNotifications] = useState<Notification[]>([]);
    const getNotificationList = async (filters: any) => {
        try {
            const response = await ApiContext.get('/user-me-notification',
                {
                    params: {
                        page: 0,
                        pageSize: 50,
                        filters: filters ? [filters] : [],
                    },
                });
            const notificationList = response?.data?.data; // Danh sách người dùng từ API
            setNotifications(notificationList);
            // setPlans(planList);
        } catch (error) {
            console.error('Lỗi khi gọi API:', error);
        }
    };
    useEffect(() => {
        getNotificationList([]);
    }, []);

    const [open, setOpen] = React.useState(true);



    const handleClick = () => {
        setOpen(!open);
    };

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };


    return (
        <Container maxWidth={false}>
            <List
                sx={{ width: '100%', maxWidth: 1000, bgcolor: 'background.paper', margin: 'auto' }}
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader" sx={{ fontSize: '24px' }}>
                        Thông báo
                    </ListSubheader>
                }
            >
                <Box sx={{ width: '100%', typography: 'body1' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs
                            value={value}
                            onChange={handleTabChange}
                        >
                            <Tab value="" label="Tất cả" />
                            <Tab value="UNREAD" label="Chưa đọc" />
                        </Tabs>
                    </Box>
                    {notifications.map((notification, index) => (
                        <ListItemButton key={index} >
                            <ListItemIcon>
                                <HandymanIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary={
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            color: notification?.status === 'UNREAD' ? 'bold' : '#b0b3b8',
                                        }}
                                    >
                                        {notification?.content}
                                    </Typography>
                                }
                                secondary={
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: notification?.status === 'UNREAD' ? '#0866ff' : '#b0b3b8',
                                        }}
                                    >
                                        {formatTimeAgo(notification?.createdAt)}
                                    </Typography>
                                }
                            />
                        </ListItemButton>
                    ))}
                </Box>

            </List>
        </Container>
    );
}