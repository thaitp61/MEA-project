import React, { forwardRef } from 'react';
import { Icon } from '@iconify/react';
import Box from '@mui/material/Box';

interface IconifyProps {
    icon: React.ReactNode | any;
    sx?: React.CSSProperties;
    width?: number;
}

const Iconify = forwardRef<HTMLDivElement, IconifyProps>(
    function Iconify({ icon, width = 20, sx, ...other }, ref) {
        return (
            <Box
                ref={ref}
                component={Icon}
                className="component-iconify"
                icon={icon}
                sx={{ width, height: width, ...sx }}
                {...other}
            />
        );
    }
);

Iconify.displayName = 'Iconify'; // Đặt tên hiển thị cho thành phần

export default Iconify;
