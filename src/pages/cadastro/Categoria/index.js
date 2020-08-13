import React, { useState, useEffect } from 'react';
import PageDefault from '../../../components/PageDefault';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';
import useForm from '../../../hooks/useForm';
import categoriasRepository from '../../../repositories/categorias';

const CategoriesTable = styled.div`
    max-width: 100%;
    margin-top: 45px;
    /* --color-primary-medium */
    border: 3px solid var(--blackLighter);
    display: flex;
    flex-direction: column;
    
`;
const TitleTable = styled.div`
    height: 55px;
    display: flex;
    align-items: center;
    background-color: var(--blackLighter);
    
    font-size: 22px;
    font-weight: 400;
    color: var(--black);
    
    
    p:first-child{
        width: 50%;
        margin-left: 100px;
    }
    p:last-child{
        width: 50%;
    }
`;

const CategoriesInfos = styled.div`
    display: flex;   
    align-items: center;
    border-top: 1px solid var(--blackLighter);
    p{
        width: calc(100% - 50%);
    }
    p:first-child{
        margin-left: 100px;
    }
    
`;


function CadastroCategoria(){
    const [categorias, setCategorias] = useState([]);
    const categoryTitles = categorias.map(({ titulo }) => titulo);
    var formIsValid = true;

    const form = useForm({
        valoresIniciais: {
            titulo: '',
            cor: '',
            link_extra: {
                text: '',
                url: ''
            },
        },

        validate: function validate(){
            const errors = {};

            if(form.valores.titulo === ''){
                errors.titulo = 'Esse campo é obrigatório.';
                formIsValid = false;
            }
            else{
                if(categoryTitles.indexOf(form.valores.titulo) !== -1){
                    errors.titulo = 'Essa categoria já existe!';
                    formIsValid = false;
                }
            }

            return errors;
        }
        
    });

    function obterCategorias(){
        //obtem todas as categorias registradas no db 
        categoriasRepository
          .getAll()
            .then((categoriasFromServer) => {
            setCategorias(categoriasFromServer);
          });
    }

    useEffect(() => {
        obterCategorias();
    }, []);
    
    return(
        <PageDefault>
            <h1>Cadastro de Categoria: {form.valores.titulo} </h1>
            <form onSubmit={event => {
                //previne comportamento padrão do form
                event.preventDefault();

                //valida valores do form
                form.validateValues();
                console.log(form.errors.titulo);

                if(formIsValid){
                    //cadastra categoria
                    categoriasRepository.create({
                        titulo: form.valores.titulo,
                        cor: form.valores.cor,
                        link_extra: {
                            text: form.valores.descricao,
                            url: form.valores.url,
                        }
                        })
                        .then(() => {    
                            obterCategorias();                       
                    });

                    //lima campos do form
                    form.clear();
                }
                

            }}>
                <FormField
                    label= "Nome da categoria *"
                    type="text"
                    value={form.valores.titulo}
                    name="titulo"
                    onChange={form.handleChange}
                    error= {form.errors.titulo && (form.errors.titulo)}
                />
                
                <FormField   
                    label="Descrição"
                    type="text"
                    value={form.valores.descricao}
                    name="descricao"
                    onChange={form.handleChange}
                />       
                   
                <FormField
                    label= "Link extra"
                    type="text"
                    value={form.valores.url}
                    name="url"
                    onChange={form.handleChange}
                />
                <FormField 
                    label= "Cor"
                    type="color"
                    value={form.valores.cor}
                    name="cor"
                    onChange={form.handleChange}
                />
                <Button type="submit">Cadastrar</Button>
                
                <Link to="/" style={{textDecoration: 'none', color: '#3CCBCE', float: 'right', marginTop: '16px', marginRight: '5px'}}>Ir pra home</Link>
            
            </form>

            
            
            {/*
                {categorias.length === 0 && (
                <div>
                    Loading...
                </div>
                )}
            */}
            

            <CategoriesTable>
                <TitleTable>
                    <p>Nome</p>
                    <p>Descrição</p>
                </TitleTable>
                

                {categorias.map((categoria, indice) => {
                    return (
                        <CategoriesInfos key={`${categoria.id}`}>
                            <p>
                                {categoria.titulo}
                            </p>
                            
                            {!categoria.link_extra.text  && (
                            <p style={{fontStyle: 'italic'}}>
                                Sem descrição
                            </p>
                            )}

                            {categoria.link_extra.text && (
                                 <p>
                                    {categoria.link_extra.text}
                                </p>
                            )}
                           
                        </CategoriesInfos>
                    )
                })}
            </CategoriesTable>

            
        </PageDefault>
    );
}

export default CadastroCategoria;