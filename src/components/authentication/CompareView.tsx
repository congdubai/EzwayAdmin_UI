import { callFetchImage } from "@/config/api";
import { ICommon } from "@/types/backend";
import { Card, Col, Descriptions, Row, Spin, Tag } from "antd";
import axios from "axios";
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

    useEffect(() => {
        const fetchImage = async () => {
            if (!data?.image1) return;
            setLoading(true);
            try {
                const res1 = await callFetchImage(bucket1, data?.image1);
                const res2 = await callFetchImage(bucket2, data?.image2);
                const url1 = URL.createObjectURL(res1);
                const ur2 = URL.createObjectURL(res2);
                setImage1Url(url1);
                setImage2Url(ur2);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchImage();
    }, [data, bucket1, bucket2]);


    return (
        <>
            <Row gutter={24} justify="center">
                <Col xs={24} md={12}>
                    <Card
                        hoverable
                        style={{ textAlign: "center", borderRadius: 12, maxHeight: 250 }}
                        cover={<>
                            {loading ? (
                                <div style={{ height: 250, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <Spin />
                                </div>
                            ) : (
                                image1Url && (
                                    <img
                                        alt="auth"
                                        src={image1Url}
                                        style={{
                                            borderTopLeftRadius: 12,
                                            borderTopRightRadius: 12,
                                            height: 200,
                                            paddingTop: 20,
                                            objectFit: "contain",
                                        }}
                                    />
                                )
                            )}
                        </>
                        }
                    />
                </Col>
                <Col xs={24} md={12}>
                    <Card
                        hoverable
                        style={{ textAlign: "center", borderRadius: 12, maxHeight: 250 }}
                        cover={
                            <>
                                {loading ? (
                                    <div style={{ height: 250, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                        <Spin />
                                    </div>
                                ) : (
                                    image2Url && (
                                        <img
                                            alt="ekyc"
                                            src={image2Url}
                                            style={{
                                                borderTopLeftRadius: 12,
                                                borderTopRightRadius: 12,
                                                height: 200,
                                                paddingTop: 20,
                                                objectFit: "contain",
                                            }}
                                        />
                                    )
                                )}
                            </>
                        }
                    />
                </Col> 
            </Row>

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
