import { Table } from "antd";
import { useState } from "react";
import ViewDetaiRegister from "./components/register/view.register";

const RegisterPage = () => {
    const [openModal, setOpenModal] = useState<boolean>(false);

    const dataSource = [
        {
            key: '1',
            name: 'Mike',
            age: 32,
            address: '10 Downing Street',
        },
        {
            key: '2',
            name: 'John',
            age: 42,
            address: '10 Downing Street',
        },
    ];

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
    ];

    return (
        <>
            <Table dataSource={dataSource} columns={columns} />
            <button onClick={() => { setOpenModal(true) }}>
                Chi tiết
            </button>

            <ViewDetaiRegister
                openModal={openModal}
                setOpenModal={setOpenModal}

            />
        </>
    );

}
export default RegisterPage;