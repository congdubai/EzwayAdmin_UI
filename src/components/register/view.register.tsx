import React, { useEffect, useState } from "react";
import { Modal, Tabs } from "antd";
import CompareView from "./CompareView";
import { ICommon, ITransId} from "@/types/backend";
import { callFetchCrossCheckDetail, callFetchFaceMatchDetail, callFetchOcrDetail2 } from "@/config/api";

interface IProps {
    setOpenModal: (v: boolean) => void;
    openModal: boolean;
    transId?: ITransId | null;
}

const ViewDetaiRegister: React.FC<IProps> = ({ setOpenModal, openModal, transId }) => {
    const [data, setData] = useState<ICommon | null>(null);
    const [data1, setData1] = useState<ICommon | null>(null);
    const [data2, setData2] = useState<ICommon | null>(null);
    const [bucket1, setBucket1] = useState<string>();
    const [bucket2, setBucket2] = useState<string>();

    useEffect(() => {
        const fetchData = async () => {
            if (!transId) return;
            try {
                const res = await callFetchOcrDetail2(transId);
                const ocrCommon: ICommon = {
                    ...res.data,
                    ocr: res.data2
                };
                setData(ocrCommon);
                console.log(ocrCommon)
                const res1 = await callFetchCrossCheckDetail(transId);
                setData1(res1.data);
                const res2 = await callFetchFaceMatchDetail(transId);
                setData2(res2.data);
            } catch (err) {
                console.error("Error fetching OCR detail:", err);
            }
        };

        if (openModal) {
            fetchData();
        }
    }, [openModal, transId]);

    return (
        <Modal
            title="Registration detail"
            open={openModal}
            onCancel={() => setOpenModal(false)}
            footer={null}
            width={800}
        >
            <Tabs
                defaultActiveKey="orc" 
                items={[
                    {
                        key: "orc",
                        label: "ORC",
                        children: <CompareView data={data} bucket1="idcard" bucket2="idcard" />,
                    },
                    {
                        key: "nfc",
                        label: "NFC",
                        children: <CompareView data={data1} bucket1="idcard" bucket2="ppnfc" />,
                    },
                    {
                        key: "facematch",
                        label: "Facematch",
                        children: <CompareView data={data2} bucket1="ppnfc" bucket2="selfie" />,
                    },
                ]}
            />
        </Modal>
    );
};

export default ViewDetaiRegister;
