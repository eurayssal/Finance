/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { ICartao, IConta, IDespesa } from './model';
import hookApi from '../../hooks/api';
import { useNavigate } from 'react-router-dom';
import ButtonUi from '../../components/core/buttons/buttons';
import DisplayFlexUi from '../../components/core/display/display-flex.ui';

const LancamentoDespesasView = () => {
    const api = hookApi();

    const [contas, setContas] = useState<Array<IConta>>([]);
    const [cartoes, setCartoes] = useState<Array<ICartao>>([]);
    const [despesas, setDespesas] = useState<Array<IDespesa>>([]);
    const [novaDespesa, setNovaDespesa] = useState({ nome: '', valor: '', data: '', contaId: '', status: true });
    const [editandoDespesa, setEditandoDespesa] = useState<IDespesa | null>(null);
    const [somaDespesas, setSomaDespesas] = useState<number>(0);

    const getDespesas = async () => {
        try {
            const response = await api.get('/api/despesa');
            const despesa = response.data.map((despesa: any) => {
                return { ...despesa };
            });
            setDespesas(despesa);
        } catch (error) {
            console.error('Erro ao obter despesas: ', error);
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

    const getCartoes = async () => {
        try {
            const response = await api.get('/api/cadcartao')
            setCartoes(response.data);
        } catch (error) {
            console.error('Erro ao obter cartões: ', error);
        }
    }

    const postDespesa = async () => {
        try {
            console.log('novaDespesa', novaDespesa);

            await api.post('api/despesa', novaDespesa);
            setNovaDespesa({ nome: '', valor: '', data: '', contaId: '', status: true });
            getDespesas();
        } catch (error) {
            console.log('Erro ao adicionar despesa: ', error);
        }
    };

    const editarDespesa = async () => {
        try {
            if (editandoDespesa && editandoDespesa.id) {
                const response = await api.put<IDespesa>(
                    `api/despesa/${editandoDespesa.id}`,
                    {
                        nome: novaDespesa.nome,
                        valor: parseFloat(novaDespesa.valor),
                        data: novaDespesa.data ? new Date(novaDespesa.data) : null,
                        contaId: novaDespesa.contaId
                    }
                );

                setDespesas((prev) => {
                    const props = prev.filter((w) => w.id !== response.data.id);
                    return [...props, response.data];
                });

                setEditandoDespesa(null);
                setNovaDespesa({ nome: '', valor: '', data: '', contaId: '', status: true });
                getDespesas();
            }
        } catch (error) {
            console.log('Erro ao editar despesa: ', error);
        }
    };

    const cancelarEdicao = () => {
        setEditandoDespesa(null);
        setNovaDespesa({ nome: '', valor: '', data: '', contaId: '', status: true });
    };

    const excluirDespesa = async (despesa: any) => {
        try {
            await api.delete(`api/despesa/${despesa.id}`);
            getDespesas();
        } catch (error) {
            console.log('Erro ao excluir despesa: ', error);
        }
    };

    const getSomaDespesas = async () => {
        try {
            const response = await api.get('api/despesa/soma');
            setSomaDespesas(response.data.somaDespesas);
        } catch (error) {
            console.log('Erro: ', error)
        }
    }

    const getFormattedDate = (isoDate: string | number | Date) => {
        const date = new Date(isoDate);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    };

    

    useEffect(() => {
        getDespesas();
        getSomaDespesas();
        getContas();
        getCartoes();
    }, []);

    useEffect(() => {
        if (editandoDespesa) {
            setNovaDespesa({
                nome: editandoDespesa.nome || '',
                valor: editandoDespesa.valor ? editandoDespesa.valor.toString() : '',
                data: editandoDespesa.data
                    ? new Date(editandoDespesa.data).toISOString().split('T')[0]
                    : '',
                contaId: editandoDespesa.contaId || '',
                status: editandoDespesa.status,
            });
        }
    }, [editandoDespesa]);

    useEffect(() => {
        if (despesas.length) { getSomaDespesas() }
    }, [despesas])

    const navigate = useNavigate();
    const toLandingPage = () => navigate('/landing-page')
    const toLancamentoReceitas = () => navigate('/lancamento-receitas')
    const toCadContas = () => navigate('/cadastro-contas')
    const toCadCartoes = () => navigate('/cadastro-cartoes')

    return (
        <DisplayFlexUi flexDirection='column'>
            <h2>Lançamento de despesas</h2>
            <DisplayFlexUi>
                <ButtonUi onClick={toLandingPage}>Landing Page</ButtonUi>
                <ButtonUi onClick={toLancamentoReceitas}>Lancamento de receitas</ButtonUi>
                <ButtonUi onClick={toLancamentoReceitas}>Lancamento de receitas</ButtonUi>
                <ButtonUi onClick={toCadContas}>Cadastro de contas</ButtonUi>
                <ButtonUi onClick={toCadCartoes}>Cadastro de cartões</ButtonUi>
            </DisplayFlexUi>

            <DisplayFlexUi flexDirection='column'>
                <h3>{editandoDespesa ? 'Editar Despesa' : 'Adicionar Nova Despesa'}</h3>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        if (editandoDespesa) {
                            editarDespesa();
                        } else {
                            postDespesa();
                        }
                    }}>
                    <DisplayFlexUi flexDirection='column' gap={16}>
                        <label>Nome:
                            <input
                                type="text"
                                value={novaDespesa.nome}
                                onChange={(e) => setNovaDespesa({ ...novaDespesa, nome: e.target.value })} />
                        </label>
                        <label>Valor:
                            <input
                                type="text"
                                value={novaDespesa.valor}
                                onChange={(e) => setNovaDespesa({ ...novaDespesa, valor: e.target.value })} />
                        </label>
                        <label>Data:
                            <input
                                type="date"
                                value={novaDespesa.data}
                                onChange={(e) => setNovaDespesa({ ...novaDespesa, data: e.target.value })} />
                        </label>
                        <label>Conta:
                            <select
                                value={novaDespesa.contaId}
                                onChange={(e) => {
                                    setNovaDespesa({ ...novaDespesa, contaId: e.target.value });
                                    console.log('e', e)
                                }}>

                                <option value="">Selecione uma conta ou cartão</option>
                                <optgroup label="Contas">
                                    {contas
                                        .filter((conta) => { return conta.atividade === true && conta.tipo === 'conta' })
                                        .map((conta: any) => (
                                            <option key={conta.id} value={conta.id}>
                                                {conta.nome}
                                            </option>
                                        ))}
                                </optgroup>
                                <optgroup label='Cartões'>
                                    {cartoes
                                        .filter((cartao) => { return cartao.atividade === true && cartao.tipo === 'cartao' })
                                        .map((cartao: any) => (
                                            <option key={cartao.id} value={cartao.id}>
                                                {cartao.nome}
                                            </option>))}
                                </optgroup>
                            </select>
                        </label>

                        <label>Status:
                            <select
                                value={novaDespesa.status.toString()}
                                onChange={(e) => setNovaDespesa({ ...novaDespesa, status: e.target.value === 'true' })}>
                                <option value='true'>Ativo</option>
                                <option value='false'>Inativo</option>
                            </select>
                        </label>
                        <DisplayFlexUi>
                            <ButtonUi type="submit">{editandoDespesa ? 'Editar Despesa' : 'Adicionar Despesa'}</ButtonUi>
                            {editandoDespesa && <ButtonUi type="button" onClick={cancelarEdicao}>Cancelar Edição</ButtonUi>}
                        </DisplayFlexUi>
                    </DisplayFlexUi>
                </form>
            </DisplayFlexUi>

            <DisplayFlexUi flexDirection='column'>

                <h3>Despesas</h3>
                <ul>
                    {despesas.map((despesa) => (
                        <li key={despesa.id}>
                            {despesa.nome} - R$ {despesa.valor}
                            - Data: {getFormattedDate(despesa.data)}
                            - Conta: {despesa.contaName}
                            - Status: {despesa.status ? 'Paga' : 'Não paga'}
                            <ButtonUi onClick={() => setEditandoDespesa(despesa)}>Editar</ButtonUi>
                            <ButtonUi onClick={() => excluirDespesa(despesa)}>Excluir</ButtonUi>
                        </li>
                    ))}
                </ul>
                <p>Soma despesas: R$ {somaDespesas}</p>
            </DisplayFlexUi>
        </DisplayFlexUi >
    );
};

export default LancamentoDespesasView