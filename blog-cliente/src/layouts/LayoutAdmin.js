import React, { useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Layout } from 'antd';
import MenuTop from '../components/Admin/MenuTop';
import MenuSider from '../components/Admin/MenuSider';
import AdminSignIn from '../pages/Admin/SignIn';
import useAuth from '../hooks/useAuth';
import './LayoutAdmin.scss';

export default function LayoutAdmin(props) {
    const { routes } = props;
    const [menuCollapsed, setMenuCollapsed] = useState(false);
    const { Header, Content, Footer } = Layout;
    const { user, isLoading } = useAuth();

    if (!user && !isLoading) {
        return (
            <>
                <Route path="/admin/login" component={AdminSignIn} />
                <Redirect to="/admin/login" />
            </>
        );
    }
    if (user && !isLoading) {
        return (
            < Layout >
                <MenuSider menuCollapsed={menuCollapsed} />
                <Layout className="LayoutAdmin" style={{ marginLeft: menuCollapsed ? "80px" : "200px" }}>
                    <Header className="LayoutAdmin__header">
                        <MenuTop menuCollapsed={menuCollapsed} setMenuCollapsed={setMenuCollapsed} />
                    </Header>
                    <Content className="LayoutAdmin__content">
                        <LoadRouter routes={routes} />
                    </Content>
                    <Footer className="LayoutAdmin__footer">Alfredo Rivas Jimenez</Footer>
                </Layout>
            </Layout >
        );
    }
    return null;
}

function LoadRouter({ routes }) {
    return (
        <Switch>
            {routes.map((route, index) => (
                <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    component={route.component}
                />
            ))}
        </Switch>
    )
}