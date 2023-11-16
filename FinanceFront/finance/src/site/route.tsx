import React from 'react';
import { Navigate, Route, Routes } from "react-router-dom";
import LandingPageView from './landing-page';
import LancamentoDespesasView from './lancamento-despesas';
import LancamentoReceitasView from './lancamento-receitas';
import CadContasView from './cad-contas';

const SiteRoute: React.FC = () => {
    return (
        <Routes>
            <Route index element={<Navigate to='landing-page' />} />
            <Route path="landing-page" element={<LandingPageView />} />
            <Route path="lancamento-despesas" element={<LancamentoDespesasView />} />
            <Route path="lancamento-receitas" element={<LancamentoReceitasView />} />
            <Route path="cadastro-contas" element={<CadContasView />} />
        </Routes>
    );
};

export default SiteRoute;
