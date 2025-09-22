import React, { useEffect, useState } from "react";
import { Modal, Tabs } from "antd";
import CompareView from "./CompareView";
import { ICommon, ITransId, IResultResponse } from "@/types/backend";
import { callFetchOcrDetail } from "@/config/api";

interface IProps {
    setOpenModal: (v: boolean) => void;
    openModal: boolean;
    transId?: ITransId | null;
}

const ViewDetaiRegister: React.FC<IProps> = ({ setOpenModal, openModal, transId }) => {
    const [data, setData] = useState<ICommon | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!transId) return;
            try {
                const res: IResultResponse<ICommon> = await callFetchOcrDetail(transId);
                setData(res.data); // lấy đúng field "data" từ API
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
            title="Chi tiết đăng ký"
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
                        children: <CompareView data={data} />,
                    },
                    {
                        key: "nfc",
                        label: "NFC",
                        children: <CompareView data={data} />,
                    },
                    {
                        key: "facematch",
                        label: "Facematch",
                        children: <CompareView data={data} />,
                    },
                ]}
            />
        </Modal>
    );
};

export default ViewDetaiRegister;
