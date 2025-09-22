import React, { useEffect, useState } from "react";
import { Modal, Tabs } from "antd";
import CompareView from "./CompareView";
import { ICommon, ITransId, IResultResponse } from "@/types/backend";
import { callFetchAuthDetail } from "@/config/api";

interface IProps {
    setOpenModal: (v: boolean) => void;
    openModal: boolean;
    transId?: ITransId | null;
}

const ViewDetailAuth: React.FC<IProps> = ({ setOpenModal, openModal, transId }) => {
    const [data, setData] = useState<ICommon | null>(null);
    const [bucket1, setBucket1] = useState<string>();
    const [bucket2, setBucket2] = useState<string>();

    useEffect(() => {
        const fetchData = async () => {
            if (!transId) return;
            try { 
                const res = await callFetchAuthDetail(transId); 
                setData(res.data);
            } catch (err) {
                console.error("Error fetching AUTH detail:", err);
            }
        };

        if (openModal) {
            fetchData();
        }
    }, [openModal, transId]);

    return (
        <Modal
            title="Authentication detail"
            open={openModal}
            onCancel={() => setOpenModal(false)}
            footer={null}
            width={800}
        >
            <Tabs
                defaultActiveKey="auth"
                items={[
                    {
                        key: "auth",
                        label: "AUTH",
                        children: <CompareView data={data} bucket1="verify" bucket2="selfie" />,
                    },
                ]}
            />
        </Modal>
    );
};

export default ViewDetailAuth;
