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
    console.log(data)

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
                                        alt="img-1"
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
                                            alt="img-2"
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
                    {/* OCR Extra nằm trong cùng card Compare information */}
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
