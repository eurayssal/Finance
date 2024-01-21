/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { IConta, IReceita, IReceitaCreate } from './model';
import hookApi from '../../hooks/api';
import InputUi from '../../components/core/input';
import ButtonUi from '../../components/core/buttons/buttons';
import DisplayFlexUi from '../../components/core/display/display-flex.ui';
import SiteLayout from '../_layout';
import InputMoneyUi from '../../components/core/input-money';
import { maskMoney } from '../../utils/mold/money.mold';
import { maskFormattedDate } from '../../utils/mold/data.mold';
import SelectUi from '../../components/core/select';
import FormUi from '../../components/form';

const dataReceita = {
    nome: '',
    valor: '',
    data: '',
    contaId: '',
    contaName: '',
}

const LancamentoReceitasView = () => {
    const api = hookApi();

    const [contas, setContas] = useState<Array<IConta>>([]);
    const [receitas, setReceitas] = useState<Array<IReceita>>([]);
    const [novaReceita, setNovaReceita] = useState<IReceitaCreate>(dataReceita);
    const [editandoReceita, setEditandoReceita] = useState<IReceita | null>(null);
    const [somaReceita, setSomaReceitas] = useState<number>(0);

    const getReceitas = async () => {
        try {
            const response = await api.get('api/receita');
            setReceitas(response.data);
        } catch (error) {
            console.log('Erro ao obter receita: ', error);
        }
    };
    useEffect(() => {
        getReceitas();
    }, []);

    const postReceita = async () => {
        try {
            await api.post('api/receita', novaReceita);
            setNovaReceita(dataReceita);
            getReceitas();
        } catch (error) {
            console.log('Erro ao adicionar receita: ', error);
        };
    };

    const editarReceita = async () => {
        try {
            if (editandoReceita && editandoReceita.id) {
                const response = await api.put<IReceita>(
                    `api/receita/${editandoReceita.id}`,
                    {
                        nome: novaReceita.nome,
                        valor: novaReceita.valor,
                        data: novaReceita.data ? new Date(novaReceita.data) : null,
                        contaId: novaReceita.contaId || '',
                        contaName: novaReceita.contaName || ''
                    });

                setReceitas((prev) => {
                    const props = prev.filter(w => w.id !== response.data.id);
                    return [...props, response.data]
                });

                setEditandoReceita(null);
                setNovaReceita(dataReceita);
                getReceitas();
            }
        } catch (error) {
            console.log('Erro ao editar receita: ', error);
        }
    };

    useEffect(() => {
        if (editandoReceita) {
            setNovaReceita({
                nome: editandoReceita.nome || '',
                valor: editandoReceita.valor ? editandoReceita.valor.toString() : '',
                data: editandoReceita.data
                    ? new Date(editandoReceita.data).toISOString().split('T')[0]
                    : '',
                contaId: editandoReceita.contaId || '',
                contaName: editandoReceita.contaName || ''
            });
        }
    }, [editandoReceita]);

    const cancelarEdicao = () => {
        setNovaReceita(dataReceita);
        setEditandoReceita(null);
    };

    const excluirReceita = async (receita: IReceita) => {
        try {
            await api.delete(`api/receita/${receita.id}`);
            getReceitas();
        } catch (error) {
            console.log('Erro ao excluir receita: ', error);
        }
    };

    const getContas = async () => {
        try {
            const response = await api.get('/api/cadconta');
            setContas(response.data);
        } catch (error) {
            console.error('Erro ao obter contas: ', error);
        }
    };
    useEffect(() => {
        getContas();
    }, [])

    const getSomaReceitas = async () => {
        try {
            const response = await api.get('api/receita/soma');
            setSomaReceitas(response.data.somaReceita);
        } catch (error) {
            console.log('Erro: ', error)
        }
    }
    useEffect(() => {
        if (receitas.length) {
            getSomaReceitas()
        }
    }, [receitas])

    const handleChangeNome = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNovaReceita({ ...novaReceita, nome: e.target.value });
    }

    const handleChangeValor = (value: string) => {
        setNovaReceita({ ...novaReceita, valor: value });
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (editandoReceita) {
            editarReceita();
        } else {
            postReceita();
        }
    }

    const handleChangeData = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNovaReceita({ ...novaReceita, data: e.target.value })
    }

    const handleChangeConta = (e: React.ChangeEvent<HTMLSelectElement>) => {
        var conta = contas.find((conta) => conta.id === e.target.value)
        if (!conta) { return }

        setNovaReceita({ ...novaReceita, contaId: conta.id, contaName: conta.nome })
    }

    return (
        <SiteLayout>
            <DisplayFlexUi flexDirection='column'>
                <h2>Lancamento Receitas</h2>
                <DisplayFlexUi flexDirection='row' gap={32}>
                    <DisplayFlexUi flexDirection='column'>
                        <h3>{editandoReceita ? 'Editar Receita' : 'Adicionar Nova Receita'}</h3>
                        <FormUi onSubmit={handleSubmit}>
                            <DisplayFlexUi flexDirection='column' gap={16}>
                                <InputUi label='Nome' name='Nome' type="text" value={novaReceita.nome} onChange={handleChangeNome} />
                                <InputMoneyUi name='Valor' label='Valor' value={novaReceita.valor} onChange={handleChangeValor} />
                                <InputUi name='Data' label='Data' type="date" value={novaReceita.data} onChange={handleChangeData} />
                                <SelectUi
                                    name={'conta'}
                                    label={'Conta'}
                                    value={'Selecione uma conta ou cartão'}
                                    options={[{ value: '', label: 'Selecione uma conta ou cartão' },
                                    ...contas
                                        .filter((conta) => conta.atividade === true && conta.tipo === 'conta')
                                        .map((conta) => ({ value: conta.id, label: conta.nome })),
                                    ]} />
                                <ButtonUi type="submit">{editandoReceita ? 'Editar Receita' : 'Adicionar Receita'}</ButtonUi>
                                {editandoReceita && <ButtonUi type="button" onClick={cancelarEdicao}>Cancelar Edição</ButtonUi>}
                            </DisplayFlexUi>
                        </FormUi>
                    </DisplayFlexUi>
                    <DisplayFlexUi flexDirection='column'>
                        <ul>
                            {receitas.map((receita) => (
                                <li key={receita.id}>
                                    {receita.nome} - R$ {maskMoney(receita.valor)}
                                    - Data: {maskFormattedDate(receita.data)}
                                    {receita.contaName ? `- Conta: ${receita.contaName}` : ''}
                                    <ButtonUi variant='secondary' onClick={() => setEditandoReceita(receita)}>Editar</ButtonUi>
                                    <ButtonUi variant='secondary' onClick={() => excluirReceita(receita)}>Excluir</ButtonUi>
                                </li>
                            ))}
                        </ul>

                        <h4>Soma receitas:</h4><p>R$ {somaReceita.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                    </DisplayFlexUi>
                </DisplayFlexUi>
            </DisplayFlexUi>
        </SiteLayout>
    )
}

export default LancamentoReceitasView