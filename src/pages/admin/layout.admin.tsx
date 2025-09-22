import React, { useState, useEffect } from 'react';
import {
    AppstoreOutlined,
    ExceptionOutlined,
    ApiOutlined,
    UserOutlined,
    BankOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    AliwangwangOutlined,
    BugOutlined,
    ScheduleOutlined,
    SkinOutlined,
    ShoppingOutlined,
    FormatPainterOutlined,
    TagsOutlined,
    HomeOutlined,
    ClusterOutlined,
    BarsOutlined,
    ReconciliationOutlined,
    HeartTwoTone,
} from '@ant-design/icons';
import { Layout, Menu, Dropdown, Space, message, Avatar, Button, notification } from 'antd';
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import type { MenuProps } from 'antd';
import logo from '../../assets/image/woori_logo.png';
import { Footer } from 'antd/es/layout/layout';
import { useAppSelector } from '@/redux/hooks';

const { Content, Sider } = Layout;

const LayoutAdmin = () => {
    const location = useLocation();
    const [collapsed, setCollapsed] = useState(false);
    const [activeMenu, setActiveMenu] = useState('');
    const [menuItems, setMenuItems] = useState<MenuProps['items']>([]);
    const account = useAppSelector(state => state.account.account);

    const navigate = useNavigate();


    const handleLogout = async () => {

    }
    useEffect(() => {

        const fixedMenu = [
            { label: <Link to='/'>Dashboard</Link>, key: '/', icon: <HomeOutlined /> },
            { label: <Link to='/registration'>Registration</Link>, key: '/registration', icon: <UserOutlined /> },
            { label: <Link to='/role'>Authentication</Link>, key: '/admin/role', icon: <ClusterOutlined /> },

        ];
        setMenuItems(fixedMenu);
    }, []);

    useEffect(() => {
        setActiveMenu(location.pathname);
    }, [location]);

    const itemsDropdown = [
        {
            label: <Link to={'/'}>Trang chủ</Link>,
            key: 'home',
        },
        {
            label: <label
                style={{ cursor: 'pointer' }}
                onClick={() => handleLogout()}
            >Đăng xuất</label>,
            key: 'logout',
        },
    ];

    return (
        <>
            <Layout style={{ marginLeft: !isMobile ? (collapsed ? 80 : 200) : 0, transition: 'all 0.2s' }}
                className="layout-admin"
            >
                {!isMobile ? (
                    <Sider
                        theme='dark'
                        collapsible
                        collapsed={collapsed}
                        onCollapse={(value) => setCollapsed(value)}
                        width={200} // bạn có thể thay đổi width tùy theo thiết kế
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            height: '100vh',
                            zIndex: 1000,
                            overflow: 'auto',
                            boxShadow: '2px 0 6px rgba(0, 0, 0, 0.1)',
                        }}
                    >
                        <div
                            style={{
                                height: 50,
                                background: "white",
                                margin: 8
                            }}
                        >
                            <img src={logo} alt="Woori Logo" style={{ height: 50, width: 190 }} />
                        </div>

                        <Menu
                            theme="dark"   // 👈 menu nền đen
                            selectedKeys={[activeMenu]}
                            mode="inline"
                            items={menuItems}
                            onClick={(e) => setActiveMenu(e.key)}
                            style={{ borderRight: 0, marginTop: 15 }}
                        />
                    </Sider>
                ) : (
                    <Menu
                        selectedKeys={[activeMenu]}
                        items={menuItems}
                        onClick={(e) => setActiveMenu(e.key)}
                        mode="horizontal"
                    />
                )}


                <Layout>
                    {!isMobile &&
                        <div className='admin-header' style={{ display: "flex", justifyContent: "space-between", marginRight: 20 }}>
                            <Button
                                type="text"
                                icon={collapsed ? React.createElement(MenuUnfoldOutlined) : React.createElement(MenuFoldOutlined)}
                                onClick={() => setCollapsed(!collapsed)}
                                style={{
                                    fontSize: '16px',
                                    width: 64,
                                    height: 64,
                                }}
                            />

                            <Dropdown menu={{ items: itemsDropdown }} trigger={['click']}>
                                <Space style={{ cursor: "pointer" }}>
                                    Welcome {account?.fullName}
                                    <Avatar> {account?.fullName?.substring(0, 2)?.toUpperCase()} </Avatar>

                                </Space>
                            </Dropdown>
                        </div>
                    }
                    <Content style={{ padding: '15px' }}>
                        <Outlet />
                    </Content>
                    <Footer style={{ padding: 10, textAlign: 'center' }}>
                        Ekyc web admin &copy; Cong & Hung - Made with <HeartTwoTone />
                    </Footer>
                </Layout>
            </Layout>

        </>
    );
};

export default LayoutAdmin;