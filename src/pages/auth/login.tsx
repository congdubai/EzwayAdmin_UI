import { loginAPI } from '@/config/api';
import { setUserLoginInfo } from '@/redux/slice/accountSlide';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import {
    LoginForm,
    ProConfigProvider,
    ProFormText,
} from '@ant-design/pro-components';
import { message, notification, theme, Typography } from 'antd';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const LoginPage = () => {
    const { token } = theme.useToken();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = async (values: Record<string, any>) => {
        const { username, password } = values;
        try {
            const res = await loginAPI(username, password);
            dispatch(setUserLoginInfo(res.data));
            message.success('Đăng nhập thành công!');
            navigate('/');
        } catch (err: any) {
            notification.error({
                message: 'Đăng nhập thất bại',
                description: err?.response?.data?.resultDesc || 'Sai tài khoản hoặc mật khẩu',
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
                        eKYC Web Admin
                    </Title>
                    <LoginForm
                        logo=""
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
                            placeholder="Tên đăng nhập"
                            rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]}
                        />
                        <ProFormText.Password
                            name="password"
                            fieldProps={{
                                size: 'large',
                                prefix: <LockOutlined className={'prefixIcon'} />,
                            }}
                            placeholder="Mật khẩu"
                            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                        />
                    </LoginForm>
                </div>
            </div>
        </ProConfigProvider>
    );
};

export default LoginPage;
