import { Card, Divider, Typography } from "antd";
import logo from "../../assets/image/woori_logo.png";

const { Title, Paragraph } = Typography;

const DashboardPage = () => {
    return (
        <div
            style={{
                minHeight: "100vh",
                background: "#fff",
                padding: "40px 60px",
                display: "flex",
                justifyContent: "flex-start",
            }}
        >
            <Card
                bordered={false}
                style={{
                    width: "100%",
                    maxWidth: 1200,
                    background: "transparent",
                }}
                bodyStyle={{ padding: 0 }}
            >
                {/* Logo */}
                <div style={{ marginBottom: 32 }}>
                    <img
                        src={logo}
                        alt="dashboard illustration"
                        style={{
                            height: 100,
                            width: "auto",
                            objectFit: "contain",
                        }}
                    />
                </div>

                {/* Tiêu đề */}
                <Title
                    level={2}
                    style={{
                        marginBottom: 16,
                        color: "#1677ff", // xanh primary antd
                        fontWeight: 700,
                    }}
                >
                    Chào mừng đến với Hệ thống Quản trị eKYC
                </Title>

                <Divider style={{ borderColor: "#eaeaea" }} />

                {/* Mô tả */}
                <Paragraph
                    style={{
                        fontSize: 16,
                        color: "rgba(0,0,0,0.65)",
                        lineHeight: 1.8,
                        paddingLeft: 16,
                        borderLeft: "4px solid #1677ff",
                        background: "#fafafa",
                        padding: "12px 16px",
                        borderRadius: 4,
                    }}
                >
                    Đây là nền tảng quản trị tập trung cho hệ thống eKYC.
                    <br />
                    Vui lòng chọn chức năng từ menu bên trái để bắt đầu làm việc.
                </Paragraph>
            </Card>
        </div>
    );
};

export default DashboardPage;
