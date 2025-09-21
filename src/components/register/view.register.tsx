import React from "react";
import { Modal, Tabs } from "antd";
import CompareView from "./CompareView";

interface IProps {
    setOpenModal: (v: boolean) => void;
    openModal: boolean;
}

const ViewDetaiRegister: React.FC<IProps> = ({ setOpenModal, openModal }) => {
    const data = {
        transId: "TRX123456",
        status: "success",
        img1: "https://via.placeholder.com/200x150.png?text=Ảnh+1",
        img2: "https://via.placeholder.com/200x150.png?text=Ảnh+2",
    };


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
