import React from 'react';
import { Form, Icon, Input, Select, Button, Row, Col } from 'antd';
import './EditUserForm.scss';

export default function EditForm(props) {
    const { userData, setUserData, updateUser } = props;
    const { Option } = Select;
    return (
        <div>
            <Form className="form-edit" onSubmit={updateUser}>
                <Row gutter={24}>
                    <Col span={12}>
                        <Form.Item>
                            <Input
                                prefix={<Icon type="user" />}
                                placeholder="Name"
                                value={userData.name}
                                onChange={e => setUserData({ ...userData, name: e.target.value })}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item>
                            <Input
                                prefix={<Icon type="user" />}
                                placeholder="Last Name"
                                value={userData.lastname}
                                onChange={e => setUserData({ ...userData, lastname: e.target.value })}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col span={12}>
                        <Form.Item>
                            <Input
                                prefix={<Icon type="mail" />}
                                placeholder="Email"
                                value={userData.email}
                                onChange={e => setUserData({ ...userData, email: e.target.value })}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item>
                            <Select
                                placeholder="Select a rol"
                                value={userData.rol}
                                onChange={e => setUserData({ ...userData, rol: e.target.value })}
                            >
                                <Option value="admin">Admin</Option>
                                <Option value="editor">Edit</Option>
                                <Option value="reviwer">Audit</Option>

                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col span={12}>
                        <Form.Item>
                            <Input
                                prefix={<Icon type="lock" />}
                                type="password"
                                placeholder="Password"
                                onChange={e => setUserData({ ...userData, password: e.target.value })}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item>
                            <Input
                                prefix={<Icon type="lock" />}
                                type="password"
                                placeholder="Repeat you pastword"
                                onChange={e => setUserData({ ...userData, repeatPassword: e.target.value })}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="btn-submit">
                        Update
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}