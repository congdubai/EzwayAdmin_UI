import { callFetchImage } from "@/config/api";
import { ICommon } from "@/types/backend";
import { Card, Col, Descriptions, Modal, Row, Spin, Tag } from "antd";
import { useState, useEffect } from "react";

interface ICompareViewProps {
    data: ICommon | null;
    bucket1: string;
    bucket2: string;
}

const CompareView: React.FC<ICompareViewProps> = ({ data, bucket1, bucket2 }) => {
    const [image1Url, setImage1Url] = useState<string>("");
    const [image2Url, setImage2Url] = useState<string>("");
    const [loading, setLoading] = useState(true);

    // preview state
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState("");

    const handlePreview = (src: string) => {
        setPreviewImage(src);
        setPreviewVisible(true);
    };

    useEffect(() => {
        if (!data?.image1) return;

        let isMounted = true;
        let url1: string | undefined;
        let url2: string | undefined;

        const fetchImage = async () => {
            setLoading(true);
            try {
                const res1 = await callFetchImage(bucket1, data.image1);
                const res2 = await callFetchImage(bucket2, data.image2);

                if (!isMounted) return;

                url1 = URL.createObjectURL(res1);
                url2 = URL.createObjectURL(res2);

                setImage1Url(url1);
                setImage2Url(url2);
            } catch (error) {
                if (isMounted) console.error("Error fetching images:", error);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchImage();

        return () => {
            isMounted = false;
            if (url1) URL.revokeObjectURL(url1);
            if (url2) URL.revokeObjectURL(url2);
        };
    }, [data, bucket1, bucket2]);

    return (
        <>
            <Row gutter={24} justify="center">
                <Col xs={24} md={12}>
                    <Card
                        hoverable
                        style={{ textAlign: "center", borderRadius: 12, maxHeight: 280 }}
                        cover={
                            loading ? (
                                <div
                                    style={{
                                        height: 250,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <Spin />
                                </div>
                            ) : (
                                image1Url && (
                                    <img
                                        alt="auth"
                                        src={image1Url}
                                        onClick={() => handlePreview(image1Url)}
                                        style={{
                                            borderTopLeftRadius: 12,
                                            borderTopRightRadius: 12,
                                            maxHeight: 250,
                                            paddingTop: 15,
                                            width: "100%",
                                            objectFit: "contain",
                                            cursor: "pointer",
                                        }}
                                    />
                                )
                            )
                        }
                    />
                </Col>
                <Col xs={24} md={12}>
                    <Card
                        hoverable
                        style={{ textAlign: "center", borderRadius: 12, maxHeight: 280 }}
                        cover={
                            loading ? (
                                <div
                                    style={{
                                        height: 250,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <Spin />
                                </div>
                            ) : (
                                image2Url && (
                                    <img
                                        alt="ekyc"
                                        src={image2Url}
                                        onClick={() => handlePreview(image2Url)}
                                        style={{
                                            borderTopLeftRadius: 12,
                                            borderTopRightRadius: 12,
                                            maxHeight: 250,
                                            paddingTop: 15,
                                            width: "100%",
                                            objectFit: "contain",
                                            cursor: "pointer",
                                        }}
                                    />
                                )
                            )
                        }
                    />
                </Col>
            </Row>

            {/* Preview Modal */}
            <Modal
                open={previewVisible}
                footer={null}
                onCancel={() => setPreviewVisible(false)}
                width={800}
                centered
            >
                <img
                    alt="preview"
                    src={previewImage}
                    style={{ width: "100%", maxHeight: "80vh", objectFit: "contain" }}
                />
            </Modal>

            <Card style={{ marginTop: 20 }}>
                <Descriptions
                    title="Compare information"
                    bordered
                    column={2}
                    size="middle"
                    layout="vertical"
                >
                    <Descriptions.Item label="TranId">{data?.transId}</Descriptions.Item>
                    <Descriptions.Item label="Status">
                        {data?.result === "0000" ? (
                            <Tag color="green">Success</Tag>
                        ) : (
                            <Tag color="red">Fail</Tag>
                        )}
                    </Descriptions.Item>
                </Descriptions>
            </Card>
        </>
    );
};

export default CompareView;
