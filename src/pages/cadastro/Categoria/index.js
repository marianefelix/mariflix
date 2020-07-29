import React, { useState } from 'react';
import PageDefault from '../../../components/PageDefault';
import { Link } from 'react-router-dom';

function CadastroCategoria(){
    const valoresIniciais = {
        nome: '',
        descricao: '',
        cor: ''
    }

    const [categorias, setCategorias] = useState([]);
    const [valores, setValores] = useState(valoresIniciais);

    function setValor(chave, valor){
        setValores({
            ...valores,
            [chave]: valor
        })
    }

    function handleChange(infos){
        setValor(
            infos.target.getAttribute(['name']), 
            infos.target.value
        );
    }
    
    return(
        <PageDefault>
            <h1>Cadastro de Categoria: {valores.nome} </h1>
            <form onSubmit={function handerSubmit(infos){
               //previne comportamento padrao do form 
               infos.preventDefault();

               //adiciona nova categoria a lista 
               setCategorias([
                   ...categorias,
                   valores
               ]);

               setValores(valoresIniciais)

            }}>
                <div>
                    <label>
                        Nome da Categoria:
                        <input 
                        type="text"
                        value={valores.nome}
                        name="nome"
                        onChange={handleChange}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Descrição:
                        <textarea 
                        type="text"
                        value={valores.descricao}
                        name="descricao"
                        onChange={handleChange}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Cor:
                        <input 
                        type="color"
                        value={valores.cor}
                        name="cor"
                        onChange={handleChange}
                        />
                    </label>
                </div>
                
                <button>Cadastrar</button>
            </form>
            
            <ul>
                {categorias.map((categoria, indice) => {
                    return (
                        <li key={`${categoria}${indice}`}>
                            {categoria.nome}
                        </li>
                    )
                })}
            </ul>

            <Link to="/">Ir pra home</Link>
        </PageDefault>
    );
}

export default CadastroCategoria;