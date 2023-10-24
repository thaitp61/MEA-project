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
import React, { useState, useEffect, useRef } from 'react';
import { CircularProgress, Container, LinearProgress, Tabs, Typography } from '@mui/material';
import { FilterComparator, SortOrder } from '../models/common';
import InfiniteScroll from 'react-infinite-scroll-component';

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
    const [value, setValue] = React.useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [totalNotification, setTotalNotification] = useState<number>(0)
    const [page, setPage] = useState<number>(0)
    const [hasMore, setHasMore] = useState(true);


    const [notifications, setNotifications] = useState<Notification[]>([]);
    const isMounted = useRef(false);

    const getNotificationList = async () => {
        // setPage(page + 1);
        console.log(page)
        try {
            const response = await ApiContext.get('/user-me-notification', {
                params: {
                    page: page,
                    pageSize: 12,
                    filters: value ? [`status||${FilterComparator.EQUAL}||${value}`] : [], // Sử dụng statusFilter nếu nó có giá trị
                    orderBy: [`createdAt||${SortOrder.DESC}`],
                },
            });
            const notificationList = response.data.data;
            const total = response.data.count;
            setNotifications((prevNotifications) => [...prevNotifications, ...notificationList]);
            setPage((prevPage) => prevPage + 1);
            setTotalNotification(total);
            if (notificationList.length === 0) {
                setHasMore(false);
            }
        } catch (error) {
            console.error('Lỗi khi gọi API:', error);
        }
    };

    useEffect(() => {
        if (!isMounted.current) {
            isMounted.current = true;
            getNotificationList();
        }
    }, [value]);
    console.log("value", value)
    const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
        // Cập nhật trạng thái statusFilter dựa trên tab được chọn
        if (newValue === 'UNREAD') {
            setValue('UNREAD');
        } else {
            setValue(''); // Trạng thái khác
        }
    };

    // const fetchData = () => {
    //     setPage(page + 1);
    //     console.log(page)
    //     const getNotificationList = async () => {
    //         try {
    //             const response = await ApiContext.get('/user-me-notification',
    //                 {
    //                     params: {
    //                         page: page,
    //                         pageSize: 10,
    //                         filters: value ? [`status||${FilterComparator.EQUAL}||${value}`] : [], // Sử dụng statusFilter nếu nó có giá trị
    //                         orderBy: [`createdAt||${SortOrder.DESC}`],
    //                     },
    //                 });
    //             const total = response?.data?.count
    //             setTotalNotification(total);
    //             setNotifications(notifications.concat(response.data.data));
    //             // setPlans(planList);
    //         } catch (error) {
    //             console.error('Lỗi khi gọi API:', error);
    //         }
    //     };
    //     getNotificationList();
    // }

    const [open, setOpen] = React.useState(true);


    return (
        <Container maxWidth={false}>
            <List
                sx={{
                    width: '100%', maxWidth: 1000, bgcolor: 'background.paper', margin: 'auto', overflowX: 'visible'
                }}
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader" sx={{ fontSize: '24px', color: "rgb(0, 167, 111)" }}>
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
                    <InfiniteScroll
                        dataLength={notifications.length}
                        next={getNotificationList}
                        hasMore={hasMore} // Thay đổi thành logic kiểm tra xem còn thông báo nào khác để tải hay không
                        loader={
                            <Box sx={{ width: '100%' }}>
                                <LinearProgress />
                            </Box>
                        }
                        height={650}
                        endMessage={
                            <p style={{ textAlign: 'center' }}>
                                <b>Đã hết thông báo</b>
                            </p>

                        }
                    >
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
                                                color: notification.status === 'UNREAD' ? 'bold' : '#b0b3b8',
                                            }}
                                        >
                                            {notification.content}
                                        </Typography>
                                    }
                                    secondary={
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                color: notification.status === 'UNREAD' ? '#0866ff' : '#b0b3b8',
                                            }}
                                        >
                                            {formatTimeAgo(notification.createdAt)}
                                        </Typography>
                                    }
                                />
                            </ListItemButton>
                        ))}
                    </InfiniteScroll>

                </Box>

            </List>
        </Container>
    );
}