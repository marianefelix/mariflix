import React, { useState, useEffect } from 'react';
import PageDefault from '../../../components/PageDefault';
import { Link } from 'react-router-dom';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';



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

    useEffect( () => {
        if (window.location.href.includes('localhost')) {
            const URL = 'http://localhost:8080/categorias';
            fetch(URL)
              .then(async (respostaDoServer) => {
                if (respostaDoServer.ok) {
                  const resposta = await respostaDoServer.json();
                  setCategorias(resposta);
                  return;
                }
                throw new Error('Não foi possível pegar os dados');
                });
        }

    }, []);
    
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
                <FormField
                    label= "Nome da categoria"
                    type="text"
                    value={valores.nome}
                    name="nome"
                    onChange={handleChange}
                />
                
                <FormField   
                    label="Descrição"
                    type="textarea"
                    value={valores.descricao}
                    name="descricao"
                    onChange={handleChange}
                />       
                   
                <FormField 
                    label= "Cor"
                    type="color"
                    value={valores.cor}
                    name="cor"
                    onChange={handleChange}
                />
                <Button>Cadastrar</Button>
            </form>
            
            {categorias.length === 0 && (
            <div>
                Loading...
            </div>
            )}

            <ul>
                {categorias.map((categoria, indice) => {
                    return (
                        <li key={`${categoria}${indice}`}>
                            {categoria.nome}
                        </li>
                    )
                })}
            </ul>

            <Link to="/" style={{textDecoration: 'none', color: '#3CCBCE' }}>Ir pra home</Link>
        </PageDefault>
    );
}

export default CadastroCategoria;