/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { IDespesa } from './model';
import hookApi from '../../hooks/api';
import { useNavigate } from 'react-router-dom';

const LancamentoDespesasView = () => {
    const [despesas, setDespesas] = useState<Array<IDespesa>>([]);
    const [novaDespesa, setNovaDespesa] = useState({ nome: '', valor: '' });
    const [editandoDespesa, setEditandoDespesa] = useState<IDespesa | null>(null);
    const [somaDespesas, setSomaDespesas] = useState<number>(0);

    const api = hookApi();

    const getDespesas = async () => {
        try {
            const response = await api.get<Array<IDespesa>>('api/despesa');
            setDespesas(response.data);
        } catch (error) {
            console.log('Erro ao obter despesas: ', error);
        }
    };

    const postDespesa = async () => {
        try {
            await api.post('api/despesa', novaDespesa);
            setNovaDespesa({ nome: '', valor: '' });
            getDespesas();
        } catch (error) {
            console.log('Erro ao adicionar despesa: ', error);
        }
    };

    const editarDespesa = async () => {
        try {
            if (editandoDespesa && editandoDespesa.id) {
                const response = await api.put<IDespesa>(`api/despesa/${editandoDespesa.id}`, novaDespesa);

                setDespesas((prev) => {
                    const props = prev.filter(w => w.id !== response.data.id);
                    return [...props, response.data]
                });

                setEditandoDespesa(null);
                setNovaDespesa({ nome: '', valor: '' });
                getDespesas();
            }
        } catch (error) {
            console.log('Erro ao editar despesa: ', error);
        }
    };

    const cancelarEdicao = () => {
        setEditandoDespesa(null);
        setNovaDespesa({ nome: '', valor: '' });
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

    useEffect(() => {
        getDespesas();
    }, []);

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
                        {despesa.nome} - R$ {despesa.valor}
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
                <button type="submit">{editandoDespesa ? 'Editar Despesa' : 'Adicionar Despesa'}</button>
                {editandoDespesa && <button type="button" onClick={cancelarEdicao}>Cancelar Edição</button>}
            </form>
        </div>
    );
};

export default LancamentoDespesasView