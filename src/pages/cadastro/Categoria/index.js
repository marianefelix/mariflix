import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';

import useForm from '../../../hooks/useForm';

import categoriasRepository from '../../../repositories/categorias';

import { TableCategories, TableTitle, CategoriesInfos } from './styles';

function CadastroCategoria(){
    const [categories, setCategories] = useState([]);
    const categoryTitles = categories.map(({ titulo }) => titulo);
    
    var formIsValid = true;

    const form = useForm({
        initialsValues: {
            titulo: '',
            cor: '',
            link_extra: {
                text: '',
                url: ''
            },
        },

        validate: function validate(){
            const errors = {};

            if(form.values.titulo === ''){
                errors.titulo = 'Esse campo é obrigatório.';
                formIsValid = false;
            }
            else{
                if(categoryTitles.indexOf(form.values.titulo) !== -1){
                    errors.titulo = 'Essa categoria já existe!';
                    formIsValid = false;
                }
            }

            return errors;
        }
        
    });

    function getCategories(){
        //obtem todas as categorias registradas no db 

        categoriasRepository
          .getAll()
            .then((categoriesFromServer) => {
            setCategories(categoriesFromServer);
          });
    }

    useEffect(() => {
        getCategories();
    }, []);
    
    return(
        <PageDefault>
            <h1>Cadastro de Categoria: {form.values.titulo} </h1>
            <form onSubmit={event => {
                //previne comportamento padrão do form
                event.preventDefault();

                //valida valores do form
                form.validateValues();
                //console.log(form.errors.titulo);

                if(formIsValid){
                    //cadastra categoria
                    categoriasRepository.create({
                        titulo: form.values.titulo,
                        cor: form.values.cor,
                        link_extra: {
                            text: form.values.descricao,
                            url: form.values.url,
                        }
                        })
                        .then(() => {    
                            getCategories();                       
                    });

                    //lima campos do form
                    form.clear();
                }
                

            }}>
                <FormField
                    label= "Nome da categoria *"
                    type="text"
                    value={form.values.titulo}
                    name="titulo"
                    onChange={form.handleChange}
                    error= {form.errors.titulo && (form.errors.titulo)}
                />
                
                <FormField   
                    label="Descrição"
                    type="text"
                    value={form.values.descricao}
                    name="descricao"
                    onChange={form.handleChange}
                />       
                   
                <FormField
                    label= "Link extra"
                    type="text"
                    value={form.values.url}
                    name="url"
                    onChange={form.handleChange}
                />

                <FormField 
                    label= "Cor"
                    type="color"
                    value={form.values.cor}
                    name="cor"
                    onChange={form.handleChange}
                />

                <Button type="submit">Cadastrar</Button>
                
                <Link to="/" 
                style={{
                    textDecoration: 'none', 
                    color: '#3CCBCE', 
                    float: 'right', 
                    marginTop: '16px', 
                    marginRight: '5px'
                
                }}>Ir pra home</Link>
            
            </form>

            
            
            {/*
                {categorias.length === 0 && (
                <div>
                    Loading...
                </div>
                )}
            */}
            

            <TableCategories>
                <TableTitle>
                    <p>Nome</p>
                    <p>Descrição</p>
                </TableTitle>
                

                {categories.map((category, indice) => {
                    return (
                        <CategoriesInfos key={`${category.id}`}>
                            <p>
                                {category.titulo}
                            </p>
                            
                            {!category.link_extra.text  && (
                            <p style={{fontStyle: 'italic'}}>
                                Sem descrição
                            </p>
                            )}

                            {category.link_extra.text && (
                                 <p>
                                    {category.link_extra.text}
                                </p>
                            )}
                           
                        </CategoriesInfos>
                    )
                })}
            </TableCategories>

            
        </PageDefault>
    );
}

export default CadastroCategoria;