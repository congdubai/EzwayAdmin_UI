import React from "react";
import { Modal, Tabs } from "antd";

interface IProps {
    setOpenModal: (v: boolean) => void;
    openModal: boolean;
}

const ViewDetaiRegister: React.FC<IProps> = ({ setOpenModal, openModal }) => {
    return (
        <Modal
            title="Chi tiết đăng ký"
            open={openModal}
            onCancel={() => setOpenModal(false)}
            footer={null} // ẩn nút OK/Cancel mặc định
            width={800}
        >
            <Tabs
                defaultActiveKey="orc"
                items={[
                    {
                        key: "orc",
                        label: "ORC",
                        children: <div>👉 Đây là nội dung tab ORC</div>,
                    },
                    {
                        key: "nfc",
                        label: "NFC",
                        children: <div>👉 Đây là nội dung tab NFC</div>,
                    },
                    {
                        key: "facematch",
                        label: "Facematch",
                        children: <div>👉 Đây là nội dung tab Facematch</div>,
                    },
                ]}
            />
        </Modal>
    );
};

export default ViewDetaiRegister;
