/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { IReceita } from './model';
import hookApi from '../../hooks/api';

const LancamentoReceitasView = () => {
    const [receitas, setReceitas] = useState<Array<IReceita>>([]);
    const [novaReceita, setNovaReceita] = useState({ nome: '', valor: '' });
    const [editandoReceita, setEditandoReceita] = useState<IReceita | null>(null);
    const [somaReceita, setSomaReceitas] = useState<number>(0);

    const api = hookApi();

    const getReceitas = async () => {
        try {
            const response = await api.get<Array<IReceita>>('api/receita');
            setReceitas(response.data);
        } catch (error) {
            console.log('Erro ao obter receita: ', error);
        }
    };

    const postReceita = async () => {
        try {
            await api.post('api/receita', novaReceita);
            setNovaReceita({ nome: '', valor: '' });
            getReceitas();
        } catch (error) {
            console.log('Erro ao adicionar receita: ', error);
        }
    };

    const editarReceita = async () => {
        try {
            if (editandoReceita && editandoReceita.id) {
                const response = await api.put<IReceita>(`api/receita/${editandoReceita.id}`, novaReceita);

                setReceitas((prev) => {
                    const props = prev.filter(w => w.id !== response.data.id);
                    return [...props, response.data]
                });

                setEditandoReceita(null);
                setNovaReceita({ nome: '', valor: '' });
                getReceitas();
            }
        } catch (error) {
            console.log('Erro ao editar receita: ', error);
        }
    };

    const cancelarEdicao = () => {
        setEditandoReceita(null);
        setNovaReceita({ nome: '', valor: '' });
    };

    const excluirReceita = async (receita: any) => {
        try {
            await api.delete(`api/receita/${receita.id}`);
            getReceitas();
        } catch (error) {
            console.log('Erro ao excluir receita: ', error);
        }
    };

    const getSomaReceitas = async () => {
        try {
            const response = await api.get('api/receita/soma');
            setSomaReceitas(response.data.somaReceita);
        } catch (error) {
            console.log('Erro: ', error)
        }
    }

    useEffect(() => {
        getReceitas();
    }, []);

    useEffect(() => {
        if (receitas.length) { getSomaReceitas() }

    }, [receitas])

    const navigate = useNavigate();
    const toLancamentoDespesas = () => navigate('/lancamento-despesas');
    const toLandingPage = () => navigate('/landing-page');

    console.log('somaReceitas', somaReceita)

    return (
        <div>
            <h2>Lancamento Receitas</h2>
            <button onClick={toLandingPage}>Landing Page</button>
            <button onClick={toLancamentoDespesas}>Lançamento de despesas</button>
            <ul>
                {receitas.map((receita) => (
                    <li key={receita.id}>
                        {receita.nome} - R$ {receita.valor}
                        <button onClick={() => setEditandoReceita(receita)}>Editar</button>
                        <button onClick={() => excluirReceita(receita)}>Excluir</button>
                    </li>
                ))}
            </ul>
            <p>Soma receitas: R$ {somaReceita}</p>

            <h3>{editandoReceita ? 'Editar Receita' : 'Adicionar Nova Receita'}</h3>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    if (editandoReceita) {
                        editarReceita();
                    } else {
                        postReceita();
                    }
                }}
            >
                <label>
                    Nome:
                    <input
                        type="text"
                        value={novaReceita.nome}
                        onChange={(e) => setNovaReceita({ ...novaReceita, nome: e.target.value })}
                    />
                </label>
                <label>
                    Valor:
                    <input
                        type="text"
                        value={novaReceita.valor}
                        onChange={(e) => setNovaReceita({ ...novaReceita, valor: e.target.value })}
                    />
                </label>
                <button type="submit">{editandoReceita ? 'Editar Receita' : 'Adicionar Receita'}</button>
                {editandoReceita && <button type="button" onClick={cancelarEdicao}>Cancelar Edição</button>}
            </form>
        </div>

    )
}

export default LancamentoReceitasView