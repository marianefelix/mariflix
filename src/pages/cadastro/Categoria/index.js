import React, { useState, useEffect } from 'react';
import PageDefault from '../../../components/PageDefault';
import { Link } from 'react-router-dom';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';
import useForm from '../../../hooks/useForm';

function CadastroCategoria(){
    const valoresIniciais = {
        titulo: '',
        descricao: '',
        cor: ''
    }

    const { handleChange, valores, clearForm } = useForm(valoresIniciais);

    const [categorias, setCategorias] = useState([]);

    useEffect( () => {
        
        const URL = window.location.hostname.includes('localhost')
            ? 'http://localhost:8080/categorias'
            : 'https://mariflix.herokuapp.com/categorias';

        fetch(URL)
            .then(async (respostaDoServer) => {
            if (respostaDoServer.ok) {
                const resposta = await respostaDoServer.json();
                setCategorias([
                    ...resposta,
                ]);
                return;
            }
            throw new Error('Não foi possível pegar os dados');
            });
        

    }, []);
    
    return(
        <PageDefault>
            <h1>Cadastro de Categoria: {valores.titulo} </h1>
            <form onSubmit={function handerSubmit(infos){
               //previne comportamento padrao do form 
               infos.preventDefault();

               //adiciona nova categoria a lista 
               setCategorias([
                   ...categorias,
                   valores
               ]);

               clearForm();

            }}>
                <FormField
                    label= "Nome da categoria"
                    type="text"
                    value={valores.titulo}
                    name="titulo"
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
                            {categoria.titulo}
                        </li>
                    )
                })}
            </ul>

            <Link to="/" style={{textDecoration: 'none', color: '#3CCBCE' }}>Ir pra home</Link>
        </PageDefault>
    );
}

export default CadastroCategoria;