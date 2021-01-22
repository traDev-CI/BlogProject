import React from 'react';
import { Layout, Tabs } from 'antd';
import { Redirect } from 'react-router-dom';
import Logo from '../../../assets/img/png/logo.png';
import ResgisterForm from '../../../components/Admin/RegisterForm';
import LoginForm from '../../../components/Admin/LoginForm/LoginForm';
import { getAccessToken } from '../../../API/auth';
import './SignIn.scss';

export default function SignIn() {
    const { Content } = Layout;
    const { TabPane } = Tabs;
    if (getAccessToken()) {
        return <Redirect to="/admin" />
    }
    return (
        <Layout className="signin">
            <Content className="signin__content">
                <h1 className="signin__content-logo">
                    <img src={Logo} alt="Alfredo Rivas Jimenez" />
                </h1>
                <div className="signin__content-tabs">
                    <Tabs type="card">
                        <TabPane tab={<span>Entrar</span>} key="1">
                            <LoginForm />
                        </TabPane>
                        <TabPane tab={<spam>Nuevo usuario</spam>} key="2">
                            <ResgisterForm />
                        </TabPane>
                    </Tabs>
                </div>
            </Content>
        </Layout>
    )
}