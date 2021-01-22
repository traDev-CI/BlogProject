import React from 'react';
import { Layout } from 'antd';
import './LayoutBasic.scss';
import { Route, Switch } from 'react-router-dom';

export default function LayoutBasic(props) {
    const { routes } = props;
    const { Header, Content, Footer } = Layout;
    return (
        <Layout>
            <h1>Menu Sider basic user...</h1>
            <Layout>
                <Header>Hola a todos amigos</Header>
                <Content>
                    <LoadRouter routes={routes} />
                </Content>
                <Footer>Pie de paginita</Footer>
            </Layout>
        </Layout>
    )
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