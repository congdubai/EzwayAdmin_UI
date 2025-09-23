import { loginAPI } from '@/config/api';
import { setUserLoginInfo } from '@/redux/slice/accountSlide';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import {
    LoginForm,
    ProConfigProvider,
    ProFormText,
} from '@ant-design/pro-components';
import { message, theme, Typography } from 'antd';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { App } from "antd";

const { Title } = Typography;

const LoginPage = () => {
    const { notification } = App.useApp();
    const { token } = theme.useToken();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = async (values: Record<string, any>) => {
        const { username, password } = values;
        const res = await loginAPI(username, password);
        if (res.resultCode === '00') {
            dispatch(setUserLoginInfo(res.data));
            message.success('Login successful!');
            navigate('/');
        } else {
            notification.error({
                message: 'Login failed',
                description: res.resultDesc,
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
                    <Title level={3} style={{ textAlign: 'center', marginBottom: 20, color: "#1677ff", fontWeight: 650 }}>
                        eKYC Web Admin
                    </Title>
                    <LoginForm
                        submitter={{
                            searchConfig: { submitText: 'Login' },
                            submitButtonProps: { size: 'large', style: { width: '100%', borderRadius: 8 } },
                        }}
                        onFinish={async (values) => {
                            await handleLogin(values);
                        }}
                    >
                        <ProFormText
                            name="username"
                            fieldProps={{
                                size: 'large',
                                prefix: <UserOutlined className={'prefixIcon'} />,
                            }}
                            placeholder="Username"
                            rules={[{ required: true, message: 'Please enter your username!' }]}
                        />
                        <ProFormText.Password
                            name="password"
                            fieldProps={{
                                size: 'large',
                                prefix: <LockOutlined className={'prefixIcon'} />,
                            }}
                            placeholder="Password"
                            rules={[{ required: true, message: 'Please enter your password!' }]}
                        />
                    </LoginForm>
                </div>
            </div>
        </ProConfigProvider>
    );
};

export default LoginPage;
