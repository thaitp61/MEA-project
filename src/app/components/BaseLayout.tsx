'use client'
import React, { ReactNode } from 'react';
import Sidebar from './Sidebar';
import "../styles/sidebar.css"

interface BaseLayoutProps {
    children: ReactNode;
}

const BaseLayout: React.FC<BaseLayoutProps> = ({ children }) => {
    return (
        <div className="layout">
            <Sidebar />
            <main className="layout__main-content">
                {children}
            </main>
        </div>
    );
};

export default BaseLayout;