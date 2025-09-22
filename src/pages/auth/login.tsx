import { loginAPI } from '@/config/api';
import { useAppSelector } from '@/redux/hooks';
import { setUserLoginInfo } from '@/redux/slice/accountSlide';
import {
    AlipayCircleOutlined,
    LockOutlined,
    MailOutlined,
    MobileOutlined,
    TaobaoCircleOutlined,
    UserOutlined,
    WeiboCircleOutlined,
} from '@ant-design/icons';
import {
    LoginForm,
    ProConfigProvider,
    ProFormCaptcha,
    ProFormCheckbox,
    ProFormInstance,
    ProFormText,
    setAlpha,
} from '@ant-design/pro-components';
import { Space, Tabs, message, theme, Typography, notification } from 'antd';
import type { CSSProperties } from 'react';
import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';


const { Title } = Typography;

const LoginPage = () => {
    const { token } = theme.useToken();
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassWord, setLoginPassWord] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();



    const iconStyles: CSSProperties = {
        marginInlineStart: '8px',
        color: setAlpha(token.colorTextBase, 0.3),
        fontSize: '22px',
        verticalAlign: 'middle',
        cursor: 'pointer',
        transition: 'all 0.3s',
    };

    const handleLogin = async (values: { username: string; password: string }) => {
        const { username, password } = values;
        const res = await loginAPI(username, password);
        if (res?.data?.accessToken) {
            localStorage.setItem('access_token', res.data.accessToken);
            dispatch(setUserLoginInfo(res.data))
            setLoginPassWord("")
            setLoginEmail("")
            message.success('Đăng nhập thành công!');
            navigate('/');
        } else {
            notification.error({
                message: 'Đăng nhập thất bại',
                description: res.resultDesc || 'Lỗi không xác định',
            });
        }
    };
    return (
        <ProConfigProvider hashed={false}>
            <div
                style={{
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg, #f0f5ff, #e6f7ff)',
                    padding: '20px',
                }}
            >
                <div
                    style={{
                        width: '100%',
                        maxWidth: 420,
                        background: '#fff',
                        padding: '32px',
                        borderRadius: 16,
                        boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
                    }}
                >
                    <Title level={3} style={{ textAlign: 'center', marginBottom: 24 }}>
                        eKYC Web Admin                    </Title>
                    <LoginForm
                        logo=""
                        submitter={{
                            searchConfig: {
                                submitText: 'Login',
                            },
                            submitButtonProps: {
                                size: 'large',
                                style: {
                                    width: '100%',
                                    borderRadius: 8,
                                },
                            },
                        }}
                        onFinish={async (values) => {
                            await handleLogin({
                                username: loginEmail,
                                password: loginPassWord
                            });

                        }}

                    >
                        <>
                            <ProFormText
                                name="username"
                                fieldProps={{
                                    size: 'large',
                                    prefix: <UserOutlined className={'prefixIcon'} />,
                                    onChange: (e) => setLoginEmail(e.target.value)
                                }}
                                placeholder={'Tên đăng nhập'}
                                rules={[
                                    { required: true, message: 'Vui lòng nhập tên đăng nhập!' },
                                ]}
                            />
                            <ProFormText.Password
                                name="password"
                                fieldProps={{
                                    size: 'large',
                                    prefix: <LockOutlined className={'prefixIcon'} />,
                                    onChange: (e) => setLoginPassWord(e.target.value)
                                }}
                                placeholder={'Mật khẩu'}
                                rules={[
                                    { required: true, message: 'Vui lòng nhập mật khẩu!' },
                                ]}
                            />
                        </>
                    </LoginForm>
                </div>
            </div>
        </ProConfigProvider>
    );
};

export default LoginPage;
