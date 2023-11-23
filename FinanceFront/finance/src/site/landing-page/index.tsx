/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import hookApi from '../../hooks/api';
import DisplayFlexUi from '../../components/core/display/display-flex.ui';
import SiteLayout from '../_layout';

const LandingPageView = () => {
    const api = hookApi();
    const [somaDespesas, setSomaDespesas] = useState<number>(0);
    const [somaReceitas, setSomaReceitas] = useState<number>(0);
    const [saldo, setSaldo] = useState<number>(0);

    const getSaldo = async () => {
        try {
            const response = await api.get('api/landingpage/saldo');
            setSomaDespesas(response.data.somaDespesas);
            setSomaReceitas(response.data.somaReceitas);
            setSaldo(response.data.saldo);
        } catch (error) {
            console.error('Erro ao obter as informações de saldo: ', error);
        }
    }
    useEffect(() => {
        getSaldo()
    }, [])

    return (
        <SiteLayout>
            <DisplayFlexUi flexDirection='column'>
                <h2>LandingPageView</h2>
                <DisplayFlexUi flexDirection='column'>
                    <p>Soma de despesas: R$ {somaDespesas}</p>
                    <p>Soma de receitas: R$ {somaReceitas}</p>
                    <p>Saldo disponível: R$ {saldo}</p>
                </DisplayFlexUi>
            </DisplayFlexUi>
        </SiteLayout>
    );
};

export default LandingPageView;
