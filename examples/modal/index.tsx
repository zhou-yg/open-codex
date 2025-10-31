import React, { useState } from 'react';
import { Modal, Form, Input, Button, Space } from 'antd';

interface ModalComponentProps {
  visible: boolean;
  onCancel: () => void;
  onOk: (values: { name: string; password: string }) => void;
}

const ModalComponent: React.FC<ModalComponentProps> = ({ visible, onCancel, onOk }) => {
  const [form] = Form.useForm();
  const [confirmVisible, setConfirmVisible] = useState(false);

  const handleCancel = () => {
    setConfirmVisible(true);
  };

  const handleConfirmCancel = () => {
    setConfirmVisible(false);
    form.resetFields();
    onCancel();
  };

  const handleConfirmBack = () => {
    setConfirmVisible(false);
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      onOk(values);
      form.resetFields();
    } catch (error) {
      console.log('Validate Failed:', error);
    }
  };

  return (
    <>
      <Modal
        title="Form Modal"
        open={visible}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleSubmit}>
            OK
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Confirm Cancel"
        open={confirmVisible}
        onCancel={handleConfirmBack}
        footer={[
          <Button key="back" onClick={handleConfirmBack}>
            Back
          </Button>,
          <Button key="confirm" type="primary" danger onClick={handleConfirmCancel}>
            Confirm Cancel
          </Button>,
        ]}
      >
        <p>Are you sure you want to cancel? All input will be lost.</p>
      </Modal>
    </>
  );
};

export default ModalComponent;