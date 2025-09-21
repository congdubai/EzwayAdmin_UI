import { Card, Col, Descriptions, Row, Tag } from "antd";

interface IData {
    transId: string;   // ID của cặp ảnh
    status: string; // trạng thái so sánh
    img1: string;      // ảnh 1
    img2: string;      // ảnh 2
}

interface ICompareViewProps {
    data: IData;
}

const CompareView: React.FC<ICompareViewProps> = ({ data }) => {
    return (
        <>
            {/* 2 ảnh song song */}
            <Row gutter={24} justify="center">
                <Col xs={24} md={12}>
                    <Card
                        hoverable
                        style={{ textAlign: "center", borderRadius: 12 }}
                        cover={
                            <img
                                alt="img-1"
                                src={data.img1}
                                style={{
                                    borderTopLeftRadius: 12,
                                    borderTopRightRadius: 12,
                                    height: 200,
                                    objectFit: "cover",
                                }}
                            />
                        }
                    />
                </Col>
                <Col xs={24} md={12}>
                    <Card
                        hoverable
                        style={{ textAlign: "center", borderRadius: 12 }}
                        cover={
                            <img
                                alt="img-2"
                                src={data.img2}
                                style={{
                                    borderTopLeftRadius: 12,
                                    borderTopRightRadius: 12,
                                    height: 200,
                                    objectFit: "cover",
                                }}
                            />
                        }
                    />
                </Col>
            </Row>

            {/* Thông tin so sánh */}
            <Card style={{ marginTop: 20 }}>
                <Descriptions
                    title="Thông tin so sánh"
                    bordered
                    column={2}
                    size="middle"
                    layout="vertical"
                >
                    <Descriptions.Item label="TranId">{data.transId}</Descriptions.Item>
                    <Descriptions.Item label="Trạng thái">
                        {data.status === "success" ? (
                            <Tag color="green">Thành công</Tag>
                        ) : (
                            <Tag color="red">Thất bại</Tag>
                        )}
                    </Descriptions.Item>
                </Descriptions>
            </Card>
        </>
    );
};

export default CompareView;
