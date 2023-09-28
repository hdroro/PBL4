import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from '~/routes';
import DefaultLayout from './layouts';
// import React, { useEffect, useState } from 'react';

function App() {
    // const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     // Mô phỏng thời gian tải trang (thay bằng mã tải dữ liệu thực tế của bạn)
    //     setTimeout(() => {
    //         setLoading(false);
    //     }, 2000);
    // }, []);
    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;

                        let Layout = DefaultLayout;

                        if (route.layout) Layout = route.layout;
                        else if (route.layout === null) Layout = Fragment;

                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
