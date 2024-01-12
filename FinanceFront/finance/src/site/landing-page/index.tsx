/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import hookApi from '../../hooks/api';
import DisplayFlexUi from '../../components/core/display/display-flex.ui';
import SiteLayout from '../_layout';
import { maskMoney } from '../../utils/mold/money.mold';
import CardUi from '../../components/core/card';
import ButtonUi from '../../components/core/buttons/buttons';
import { FaPlus, FaMinus } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import ModalUi from '../../components/core/modal';
import FormModalDespesa from './form.modal-despesa';


const LandingPageView = () => {
    const api = hookApi();

    const [somaDespesaMensal, setSomaDespesasMensal] = useState<number>(0);
    const [somaReceitaMensal, setSomaReceitaMensal] = useState<number>(0);
    const [saldo, setSaldo] = useState<number>(0); //O saldo é referente a receita

    const getSaldo = async () => {
        try {
            const response = await api.get('api/landingpage/saldo');
            console.log(response.data)
            setSomaDespesasMensal(response.data.somaDespesaMensal);
            setSomaReceitaMensal(response.data.somaReceitaMensal);

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

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <SiteLayout>

            {isModalOpen && (
                <ModalUi title="Adicionar despesa" onClose={handleCloseModal} >
                    <FormModalDespesa />
                </ModalUi>)}

            <DisplayFlexUi flexDirection='column' alignItems='center'>
                <DisplayFlexUi alignItems='center' gap={32} flexWrap='wrap' justifyContent='center'>
                    <DisplayFlexUi flexWrap='wrap' justifyContent='center' gap={16}>
                        <CardUi width={150}>
                            <DisplayFlexUi flexDirection='column' alignItems='center'>
                                <p>despesas mensais</p>
                                <p>R$ {maskMoney(somaDespesaMensal)}</p>
                            </DisplayFlexUi>
                        </CardUi>
                        <CardUi width={150} justifyContent='center'>
                            <DisplayFlexUi justifyContent='center' flexDirection='column' alignItems='center'>
                                <p>receitas mensais</p>
                                <p>R$ {maskMoney(somaReceitaMensal)}</p>
                            </DisplayFlexUi>
                        </CardUi>
                    </DisplayFlexUi>
                    <DisplayFlexUi gap={32}>
                        <DisplayFlexUi flexDirection='column' alignItems='center' >
                            <ButtonUi onClick={handleOpenModal} ><FaMinus /></ButtonUi>
                            <p>DESPESA</p>
                        </DisplayFlexUi>
                        <DisplayFlexUi flexDirection='column' alignItems='center' >
                            <ButtonUi onClick={toLancamentoReceitas} ><FaPlus /></ButtonUi>
                            <p>RECEITA</p>
                        </DisplayFlexUi>
                    </DisplayFlexUi>
                </DisplayFlexUi>
            </DisplayFlexUi>
        </SiteLayout>
    );
};

export default LandingPageView;
