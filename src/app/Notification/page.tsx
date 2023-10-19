"use client"
import * as React from 'react';
import BaseLayout from '../components/BaseLayout';
import Notification from '../components/Notification';
interface Notification {
    content: string;
    day: string;
    value: number;
}

export default function NotificationList() {
    return (
        <BaseLayout>
            <div>
                <Notification />
            </div>
        </BaseLayout>
    );
}