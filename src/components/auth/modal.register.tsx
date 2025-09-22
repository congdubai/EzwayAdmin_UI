import React from "react";
import { Button, Form, Input, Modal, Select, message } from "antd";
import { registerAPI } from "@/config/api"; // 👈 đường dẫn api của bạn
import type { IUser } from "@/types/backend"; // 👈 interface user
const { Option } = Select;

interface IProps {
    setOpenRegister: (v: boolean) => void;
    openRegister: boolean;
}

const RegisterForm: React.FC<IProps> = ({ setOpenRegister, openRegister }) => {
    const [form] = Form.useForm();

    const onFinish = async (values: IUser) => {
        const res = await registerAPI(values);
        if (res.resultCode == "00") {
            message.success("Đăng ký thành công!");
            form.resetFields();
            setOpenRegister(false);
        } else {
            message.error(res.resultDesc || "Đăng ký thất bại!");
        }
    };

    return (
        <Modal
            title="Register"
            open={openRegister}
            onCancel={() => setOpenRegister(false)}
            footer={null}
            width={490}
            style={{ marginTop: -50 }}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                style={{ maxWidth: 400 }}
            >
                {/* Employee ID */}
                <Form.Item
                    label="Employee ID"
                    name="employeeId"
                    rules={[{ required: true, message: "Please input your employee id" }]}
                >
                    <Input placeholder="Please input your employee id" />
                </Form.Item>

                {/* Password */}
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: "Please input password" }]}
                >
                    <Input.Password placeholder="Please input password" />
                </Form.Item>

                {/* Full Name */}
                <Form.Item
                    label="Full Name"
                    name="fullName"
                    rules={[{ required: true, message: "Please input your full name" }]}
                >
                    <Input placeholder="Please input your full name" />
                </Form.Item>

                {/* Email */}
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        { required: true, message: "Please enter your email!" },
                        { type: "email", message: "The input is not a valid email!" },
                    ]}
                >
                    <Input placeholder="Enter Email Address..." />
                </Form.Item>
                {/* Role */}
                <Form.Item
                    label="Role"
                    name="role"
                    rules={[{ required: true, message: "Please select role" }]}
                >
                    <Select placeholder="Select role">
                        <Option value="STAFF">STAFF</Option>
                    </Select>
                </Form.Item>

                {/* Buttons */}
                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>
                        Register
                    </Button>
                    <Button
                        htmlType="button"
                        onClick={() => {
                            form.resetFields();
                            setOpenRegister(false);
                        }}
                    >
                        Close
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default RegisterForm;
