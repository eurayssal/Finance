import React from 'react';
import LandingPageView from './landing-page';
import LancamentoDespesasView from './lancamento-despesas';
import LancamentoReceitasView from './lancamento-receitas';
import CadContasView from './cad-contas';
import CadCartaoView from './cad-cartao';
import { Navigate, Route, Routes } from 'react-router-dom';
import ThemeJss from './theme/theme.jss';

const SiteRoute: React.FC = () => {
    return (
        <ThemeJss>
            <Routes>
                <Route index element={<Navigate to='landing-page' />} />
                <Route path="landing-page" element={<LandingPageView />} />

                <Route path="lancamento-despesas" element={<LancamentoDespesasView />} />
                <Route path="lancamento-receitas" element={<LancamentoReceitasView />} />
                <Route path="cadastro-contas" element={<CadContasView />} />
                <Route path="cadastro-cartoes" element={<CadCartaoView />} />
            </Routes>
        </ThemeJss>
    );
};

export default SiteRoute;
