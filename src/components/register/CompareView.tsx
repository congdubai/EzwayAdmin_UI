import { callFetchImage } from "@/config/api";
import { ICommon } from "@/types/backend";
import { Card, Col, Descriptions, Modal, Row, Spin, Tag, Typography } from "antd";
import { useState, useEffect } from "react";

const { Text } = Typography;

interface ICompareViewProps {
    data: ICommon | null;
    bucket1: string;
    bucket2: string;
}

const ScoreBar = ({ score = 0, benchmark = 30 }: { score?: number; benchmark?: number }) => {
    const percentScore = Math.min(Number(score), 100);
    const percentBenchmark = Math.min(Number(benchmark), 100);

    return (
        <div style={{ width: "100%", marginTop: 24, position: "relative" }}>
            {/* Label Threshold trên cùng */}
            <div
                style={{
                    position: "absolute",
                    left: `${percentBenchmark}%`,
                    top: -20,
                    transform: "translateX(-50%)",
                    fontSize: 12,
                    color: "red",
                    whiteSpace: "nowrap",
                }}
            >
                Threshold: {benchmark}
            </div>

            {/* Thanh chính */}
            <div style={{ position: "relative", height: 18, borderRadius: 6, background: "#f0f0f0" }}>
                <div
                    style={{
                        width: `${percentScore}%`,
                        height: "100%",
                        backgroundColor: "#1890ff",
                        borderRadius: 6,
                        transition: "width 0.3s",
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        left: `${percentBenchmark}%`,
                        top: 0,
                        width: 2,
                        height: "100%",
                        backgroundColor: "red",
                        transform: "translateX(-50%)",
                    }}
                />
            </div>

            {/* Label Score dưới thanh */}
            <div style={{ position: "relative", marginTop: 4, height: 20 }}>
                <div
                    style={{
                        position: "absolute",
                        left: `${percentScore}%`,
                        transform: "translateX(-50%)",
                        fontSize: 12,
                        fontWeight: 600,
                        whiteSpace: "nowrap",
                    }}
                >
                    Score: {score}
                </div>
            </div>
        </div>
    );
};

const CompareView: React.FC<ICompareViewProps> = ({ data, bucket1, bucket2 }) => {
    const [image1Url, setImage1Url] = useState<string>("");
    const [image2Url, setImage2Url] = useState<string>("");
    const [loading1, setLoading1] = useState(true);
    const [loading2, setLoading2] = useState(true);

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

        const fetchImages = async () => {
            const image2Key = data?.image2 ?? data.image1;

            setLoading1(true);
            setLoading2(true);

            try {
                const [res1, res2] = await Promise.all([
                    callFetchImage(bucket1, data.image1),
                    callFetchImage(bucket2, image2Key),
                ]);

                if (!isMounted) return;

                url1 = URL.createObjectURL(res1);
                url2 = URL.createObjectURL(res2);

                setImage1Url(url1);
                setImage2Url(url2);
            } catch (error) {
                if (isMounted) console.error("Error fetching images:", error);
            } finally {
                if (isMounted) {
                    setLoading1(false);
                    setLoading2(false);
                }
            }
        };

        fetchImages();

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
                            loading1 ? (
                                <div style={{ height: 250, display: "flex", alignItems: "center", justifyContent: "center" }}>
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
                                            paddingTop: 15,
                                            maxHeight: 250,
                                            width: "100%",
                                            objectFit: "contain",
                                            cursor: "pointer",
                                        }}
                                    />
                                )
                            )
                        }
                    />
                    {data?.kind !== "ID_OCR" && (
                        <ScoreBar
                            score={Number(data?.score ?? 0)}
                            benchmark={Number(data?.threshold ?? 30)}
                        />
                    )}
                </Col>

                <Col xs={24} md={12}>
                    <Card
                        hoverable
                        style={{ textAlign: "center", borderRadius: 12, maxHeight: 280 }}
                        cover={
                            loading2 ? (
                                <div style={{ height: 250, display: "flex", alignItems: "center", justifyContent: "center" }}>
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
                                            paddingTop: 15,
                                            maxHeight: 250,
                                            width: "100%",
                                            objectFit: "contain",
                                            cursor: "pointer",
                                        }}
                                    />
                                )
                            )
                        }
                    />
                    {data?.kind !== "ID_OCR" && (
                        <ScoreBar
                            score={Number(data?.score ?? 0)}
                            benchmark={Number(data?.threshold ?? 30)}
                        />
                    )}                </Col>
            </Row>

            <Modal open={previewVisible} footer={null} onCancel={() => setPreviewVisible(false)} width={800} centered>
                <img alt="preview" src={previewImage} style={{ width: "100%", maxHeight: "80vh", objectFit: "contain" }} />
            </Modal>

            <Card style={{ marginTop: 20 }}>
                <Descriptions title="Compare information" bordered column={2} size="middle" layout="vertical">
                    <Descriptions.Item label="TranId">{data?.transId}</Descriptions.Item>
                    <Descriptions.Item label="Status">
                        {data?.result === "0000" ? <Tag color="green">Success</Tag> : <Tag color="red">Fail</Tag>}
                    </Descriptions.Item>
                    {data?.kind === "ID_OCR" && data?.ocr && (
                        <>
                            <Descriptions.Item label="Full name">{data.ocr.fullName || "-"}</Descriptions.Item>
                            <Descriptions.Item label="ID number">{data.ocr.idNo || "-"}</Descriptions.Item>
                            <Descriptions.Item label="Birthday">{data.ocr.birthday || "-"}</Descriptions.Item>
                            <Descriptions.Item label="Sex">{data.ocr.sex || "-"}</Descriptions.Item>
                            <Descriptions.Item label="Address" span={2}>
                                {data.ocr.address || "-"}
                            </Descriptions.Item>
                            <Descriptions.Item label="Country">{data.ocr.country || "-"}</Descriptions.Item>
                            <Descriptions.Item label="Doctype">{data.ocr.doctype || "-"}</Descriptions.Item>
                            <Descriptions.Item label="Issue date">{data.ocr.issueDate || "-"}</Descriptions.Item>
                            <Descriptions.Item label="Expiration">{data.ocr.expiration || "-"}</Descriptions.Item>
                            <Descriptions.Item label="ID card type">{data.ocr.idcardType || "-"}</Descriptions.Item>
                            <Descriptions.Item label="Created at">{data.ocr.createDate || "-"}</Descriptions.Item>
                            <Descriptions.Item label="Updated at">{data.ocr.updateDate || "-"}</Descriptions.Item>
                        </>
                    )}
                </Descriptions>
            </Card>
        </>
    );
};

export default CompareView;
