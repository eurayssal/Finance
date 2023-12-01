/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import hookApi from '../../hooks/api';
import DisplayFlexUi from '../../components/core/display/display-flex.ui';
import SiteLayout from '../_layout';
import { maskMoney } from '../../utils/mold/money.mold';

const LandingPageView = () => {
    const api = hookApi();

    const [somaDespesas, setSomaDespesas] = useState<number>(0);
    const [somaReceitas, setSomaReceitas] = useState<number>(0);
    const [somaDespesaMensal, setSomaDespesasMensal] = useState<number>(0);
    const [saldo, setSaldo] = useState<number>(0); //O saldo é referente a receita

    const getSaldo = async () => {
        try {
            const response = await api.get('api/landingpage/saldo');
            console.log(response.data)
            setSomaDespesas(response.data.somaDespesas);
            setSomaReceitas(response.data.somaReceitas);
            setSomaDespesasMensal(response.data.somaDespesaMensal);
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
                    <p>Soma de despesas: R$ {maskMoney(somaDespesas)}</p>
                    <p>Soma de receitas: R$ {maskMoney(somaReceitas)}</p>
                    <p>Saldo disponível: R$ {maskMoney(saldo)}</p>
                    <p>Despesas mensais: R$ {maskMoney(somaDespesaMensal)}</p>
                </DisplayFlexUi>
            </DisplayFlexUi>
        </SiteLayout>
    );
};

export default LandingPageView;
