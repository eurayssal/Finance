/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { IDespesa } from './model';
import hookApi from '../../hooks/api';
import { useNavigate } from 'react-router-dom';

const LancamentoDespesasView = () => {
    const [contas, setContas] = useState([]);
    const [despesas, setDespesas] = useState<Array<IDespesa>>([]);
    const [novaDespesa, setNovaDespesa] = useState({ nome: '', valor: '', data: '', contaId: '' });
    const [editandoDespesa, setEditandoDespesa] = useState<IDespesa | null>(null);
    const [somaDespesas, setSomaDespesas] = useState<number>(0);

    const api = hookApi();
    
    const getDespesas = async () => {
        try {
            const response = await api.get('/api/despesa');
            const despesa = response.data.map(async (despesa: any) => {
                return { ...despesa };
            });
            const despesasComContasResolved = await Promise.all(despesa);
            setDespesas(despesasComContasResolved);
        } catch (error) {
            console.error('Erro ao obter despesas: ', error);
        }
    };

    const postDespesa = async () => {
        try {
            await api.post('api/despesa', novaDespesa);
            setNovaDespesa({ nome: '', valor: '', data: '', contaId: '' });
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
                    }
                );

                setDespesas((prev) => {
                    const props = prev.filter((w) => w.id !== response.data.id);
                    return [...props, response.data];
                });

                setEditandoDespesa(null);
                setNovaDespesa({ nome: '', valor: '', data: '', contaId: '' });
                getDespesas();
            }
        } catch (error) {
            console.log('Erro ao editar despesa: ', error);
        }
    };

    const cancelarEdicao = () => {
        setEditandoDespesa(null);
        setNovaDespesa({ nome: '', valor: '', data: '', contaId: '' });
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

    const getContas = async () => {
        try {
            const response = await api.get('/api/cadconta');
            setContas(response.data);
        } catch (error) {
            console.error('Erro ao obter contas: ', error);
        }
    };

    useEffect(() => {
        getDespesas();
        getContas();
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
            });
        }
    }, [editandoDespesa]);
    

    useEffect(() => {
        if (despesas.length) { getSomaDespesas() }

    }, [despesas])

    const navigate = useNavigate();
    const toLandingPage = () => navigate('/landing-page')
    const toLancamentoReceitas = () => navigate('/lancamento-receitas')

    console.log('somaDespesas', somaDespesas)
    return (
        <div>
            <h2>Lançamento de despesas</h2>
            <button onClick={toLandingPage}>Landing Page</button>
            <button onClick={toLancamentoReceitas}>Lancamento de receitas</button>
            <h3>Despesas</h3>
            <ul>
                {despesas.map((despesa) => (
                    <li key={despesa.id}>
                        {despesa.nome} - R$ {despesa.valor} - Data: {getFormattedDate(despesa.data)} - Conta: {despesa.contaName}
                        <button onClick={() => setEditandoDespesa(despesa)}>Editar</button>
                        <button onClick={() => excluirDespesa(despesa)}>Excluir</button>
                    </li>
                ))}
            </ul>
            <p>Soma despesas: R$ {somaDespesas}</p>

            <h3>{editandoDespesa ? 'Editar Despesa' : 'Adicionar Nova Despesa'}</h3>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    if (editandoDespesa) {
                        editarDespesa();
                    } else {
                        postDespesa();
                    }
                }}
            >
                <label>
                    Nome:
                    <input
                        type="text"
                        value={novaDespesa.nome}
                        onChange={(e) => setNovaDespesa({ ...novaDespesa, nome: e.target.value })}
                    />
                </label>
                <label>
                    Valor:
                    <input
                        type="text"
                        value={novaDespesa.valor}
                        onChange={(e) => setNovaDespesa({ ...novaDespesa, valor: e.target.value })}
                    />
                </label>
                <label>
                    Data:
                    <input
                        type="date"
                        value={novaDespesa.data}
                        onChange={(e) => setNovaDespesa({ ...novaDespesa, data: e.target.value })}
                    />
                </label>
                <label>
                    Conta:
                    <select
                        value={novaDespesa.contaId}
                        onChange={(e) => setNovaDespesa({ ...novaDespesa, contaId: e.target.value })}
                    >
                        <option value="">Selecione uma conta</option>
                        {contas.map((conta: any) => (
                            <option key={conta.id} value={conta.id}>
                                {conta.nome}
                            </option>
                        ))}
                    </select>
                </label>
                <button type="submit">{editandoDespesa ? 'Editar Despesa' : 'Adicionar Despesa'}</button>
                {editandoDespesa && <button type="button" onClick={cancelarEdicao}>Cancelar Edição</button>}
            </form>
        </div>
    );
};

export default LancamentoDespesasView