import React from 'react';
import { Navigate, Route, Routes } from "react-router-dom";
import LandingPageView from './landing-page';

const SiteRoute: React.FC = () => {
    return (
        <Routes>
            <Route index element={<Navigate to='landing-page' />} />
            <Route path="landing-page" element={<LandingPageView />} />
        </Routes>
    );
};

export default SiteRoute;
