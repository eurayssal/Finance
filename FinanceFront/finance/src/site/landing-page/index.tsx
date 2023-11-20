/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import hookApi from '../../hooks/api';
import ButtonUi from '../../components/core/buttons/buttons';
import DisplayFlexUi from '../../components/core/display/display-flex.ui';

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

    const navigate = useNavigate();
    const toLancamentoDespesas = () => navigate('/lancamento-despesas')
    const toLancamentoReceitas = () => navigate('/lancamento-receitas')
    const toCadContas = () => navigate('/cadastro-contas')

    return (
        <div>
            <h2>LandingPageView</h2>
            <DisplayFlexUi gap={8}>
                <ButtonUi onClick={toLancamentoDespesas}>Lançamento de despesas</ButtonUi>
                <ButtonUi onClick={toLancamentoReceitas}>Lançamento de receitas</ButtonUi>
                <ButtonUi onClick={toCadContas}>Lançamento de receitas</ButtonUi>
            </DisplayFlexUi>

            <div>
                <h3>Soma de despesas: R$ {somaDespesas}</h3>
                <h3>Soma de receitas: R$ {somaReceitas}</h3>
                <h3>Saldo disponível: R$ {saldo}</h3>
            </div>
        </div>
    );
};

export default LandingPageView;
