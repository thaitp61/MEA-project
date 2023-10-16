"use client";
// Sidebar.tsx
import React, { useContext, useEffect, useState } from "react";
import "../styles/sidebar.css"
//reat-icons
import {
    AiTwotoneHome,
    AiFillSetting,
    AiOutlineMenuFold,
    AiOutlineMenuUnfold,
    AiOutlineShoppingCart,
} from "react-icons/ai";
import { IoMdNotifications } from "react-icons/Io";
import { BsMessenger, BsListCheck, BsClipboardCheck } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
import { GiAutoRepair } from "react-icons/gi";
import { CiMedicalClipboard } from "react-icons/ci";
import { GrUserManager } from "react-icons/gr";
import { LiaHistorySolid } from "react-icons/lia";
import Link from "next/link";

import { Avatar, Button } from "@mui/material";
import { useRouter } from "next/navigation";


const ID_QuanLyKho = '3a0ce6a3-040d-385b-dbf6-855815a4c9b6';
const ID_QuanLyBaoTri = '429f5e78-61aa-0f61-06fd-8e7d4e6e8969';
const ID_QuanLyCSVC = 'c311038c-aef9-c4b2-1d25-7b416b5f20a4';

interface SidebarItem {
    name: string;
    href: string;
    Icon: React.FC;
}

interface SidebarInformation {
    href: string;
    Icon: React.FC;
}

interface UserData {
    name: string;
    role: {
        name: string;
    };
}

// let SidebarInformation: SidebarInformation[] = [];
// let sidebarItems: SidebarItem[] = [];

const SidebarInformation: SidebarInformation[] = [
    {
        href: '/QuanLyVatTu/ThongBao',
        Icon: IoMdNotifications,
    },
    {
        href: '/QuanLyVatTu/TinNhan',
        Icon: BsMessenger,
    },
    {
        href: '/QuanLyVatTu/ThietLap',
        Icon: AiFillSetting,
    },
    {
        href: '/logout',
        Icon: BiLogOut,
    },
]

const sidebarItems: SidebarItem[] = [
    {
        name: 'Trang Chủ',
        href: '/',
        Icon: AiTwotoneHome,
    },
    {
        name: 'Danh sách kế hoạch mua sắm',
        href: '/ProcurementPlan',
        Icon: AiTwotoneHome,
    },
    {
        name: 'Danh sách thiết bị y tế',
        href: '/MedicalEquipment',
        Icon: AiTwotoneHome,
    },
    {
        name: 'Danh sách nhân viên',
        href: '/UserList',
        Icon: AiTwotoneHome,
    },
];



const Sidebar: React.FC = () => {
    const [isSidebarOpen, setSidebarOpen] = useState<boolean>(true);
    const [isInformationVisible, setInformationVisible] = useState<boolean>(true);
    const [activeSidebarItem, setActiveSidebarItem] = useState<string>("");
    const [userData, setUserData] = useState<UserData | null>(null);

    const router = useRouter();
    useEffect(() => {
        const currentPathname = window.location.pathname;
        setActiveSidebarItem(currentPathname);
    }, []);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 1200) { // Kích thước màn hình nhỏ hơn hoặc bằng 768px (hoặc kích thước nhất định mà bạn muốn)
                setSidebarOpen(false);
                setInformationVisible(false); // Ẩn sidebar khi màn hình thu lại
            } else {
                setSidebarOpen(true);
                setInformationVisible(true);
            }
        };

        window.addEventListener('resize', handleResize); // Thêm sự kiện `resize` của cửa sổ trình duyệt
        return () => {
            window.removeEventListener('resize', handleResize); // Xóa sự kiện `resize` khi component unmount
        };
    }, []);

    const toggleSidebar = () => {
        setSidebarOpen((prevOpen) => !prevOpen);
        setInformationVisible((prevVisible) => !prevVisible);
    };

    const handleSidebarItemClick = (href: string) => {
        setActiveSidebarItem(href);
    };


    return (
        <div
            className={`sidebar__wrapper ${isSidebarOpen ? "" : "sidebar__wrapper--collapsed"
                }`}
        >
            <aside className={`sidebar ${isSidebarOpen ? "" : "sidebar--collapsed"}`}>
                <button className="btn" onClick={toggleSidebar}>
                    {isSidebarOpen ? <AiOutlineMenuFold /> : <AiOutlineMenuUnfold />}
                </button>
                <div className="sidebar__top">
                    <Avatar
                        className="sidebar__logo"
                        src="https://cdn-icons-png.flaticon.com/512/3607/3607444.png"
                        alt="logo"
                    />
                    <div className="sidebar__logo-name">
                        <h4>name:</h4>
                        <h6>Vai trò: </h6>
                    </div>
                </div>
                <div className="sidebar__content">
                    <ul
                        className={`sidebar__list sidebar__list--information ${isInformationVisible ? "sidebar__list--visible" : ""
                            }`}
                    >
                        {SidebarInformation.map(({ href, Icon }) => {
                            return (
                                <li key={href} className="sidebar__icon-information">
                                    {href === "/logout" ? (
                                        <a
                                            className={`sidebar__link sidebar__link--active ${activeSidebarItem === href ? "sidebar__link--selected" : ""}`}
                                        >
                                            <span className="sidebar__icon">
                                                <Icon />
                                            </span>
                                        </a>
                                    ) : (
                                        <Link
                                            href={href}
                                            className={`sidebar__link sidebar__link--active ${activeSidebarItem === href ? "sidebar__link--selected" : ""}`}
                                            onClick={() => handleSidebarItemClick(href)}
                                        >
                                            <span className="sidebar__icon">
                                                <Icon />
                                            </span>
                                        </Link>
                                    )}
                                </li>
                            );
                        })}

                    </ul>
                </div>
                <div className="sidebar__content">
                    <ul className="sidebar__list ">
                        {sidebarItems.map(({ name, href, Icon }) => {
                            return (
                                <li key={href} className="sidebar__item">
                                    <Link
                                        href={href}
                                        passHref
                                        className={`sidebar__link sidebar__link--active ${activeSidebarItem === href
                                            ? "sidebar__link--selected"
                                            : ""
                                            }`}
                                        onClick={() => handleSidebarItemClick(href)}
                                    >
                                        <span className="sidebar__icon">
                                            <Icon />
                                        </span>
                                        <span className="sidebar__name">{name}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </aside>
        </div>
    );
};

export default Sidebar;