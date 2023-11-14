/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import hookApi from '../../hooks/api';

const LandingPageView = () => {
    const api = hookApi();
    const [somaDespesas, setSomaDespesas] = useState<number>(0);
    const [somaReceitas, setSomaReceitas] = useState<number>(0);
    const [saldo, setSaldo] = useState<number>(0);

    const getSaldo =async () => {
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

    return (
        <div>
            <h2>LandingPageView</h2>
            <button onClick={toLancamentoDespesas}>Lançamento de despesas</button>
            <button onClick={toLancamentoReceitas}>Lançamento de receitas</button>

            <div>
                <h3>Soma de despesas: R$ {somaDespesas}</h3>
                <h3>Soma de receitas: R$ {somaReceitas}</h3>
                <h3>Saldo disponível: R$ {saldo}</h3>
            </div>
        </div>
    );
};

export default LandingPageView;