import { Card, Divider, Typography } from "antd";
import logo from "../../assets/image/Logo-Shinhan-Bank.webp";

const { Title, Paragraph } = Typography;

const DashboardPage = () => {
    return (
        <div
            style={{
                minHeight: "100vh",
                background: "#fff",
                padding: "20px 40px",
                display: "flex",
                justifyContent: "flex-start",
                marginTop: -10
            }}
        >
            <Card
                style={{
                    width: "100%",
                    maxWidth: 1200,
                    background: "transparent",
                    border: "none"
                }}
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
                        color: "#1677ff", // Ant Design primary blue
                        fontWeight: 700,
                    }}
                >
                    Welcome to the eKYC Admin System
                </Title>

                <Divider style={{ borderColor: "#eaeaea" }} />

                {/* Description */}
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
                    This is the centralized administration platform for the eKYC system.
                    <br />
                    Please select a function from the left-hand menu to get started.
                </Paragraph>
            </Card>
        </div>
    );
};

export default DashboardPage;
