import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';

import useForm from '../../../hooks/useForm';

import videosRepository from '../../../repositories/videos';
import categoriasRepository from '../../../repositories/categorias';

function CadastroVideo(){
    const history = useHistory();
    const [categories, setCategories] = useState([]);
    const categoryTitles = categories.map(({ titulo }) => titulo);

    var formIsValid = true;
    
    const form = useForm({
        initialsValues: {
            titulo: '', 
            url: '', 
            categoria: '',
        },

        validate: function validate(){
            const errors = {};

            if(form.values.titulo === ''){
                errors.titulo = 'Esse campo é obrigatório.';
                formIsValid = false;
            }

            if(form.values.url === ''){
                errors.url = 'Esse campo é obrigatório.';
                formIsValid = false;
                //validar url depois com regex
            }

            if(form.values.categoria === ''){
                errors.categoria = 'Esse campo é obrigatório.';
                formIsValid = false;
            }
            else{
                if(categoryTitles.indexOf(form.values.categoria) === -1){
                    errors.categoria = 'Essa categoria não existe!';
                    formIsValid = false;
                }
            }

            return errors;
        }
        
    });

    useEffect(() => {
        categoriasRepository
          .getAll()
          .then((categoriesFromServer) => {
            setCategories(categoriesFromServer);
          });
    }, []);


    return(
        <PageDefault>
            <h1>Cadastro de Vídeo</h1>

            <form onSubmit={event => {
                event.preventDefault();
                
                form.validateValues();

                if(formIsValid){
                    const chosenCategory = categories.find((categoria) => {
                        return categoria.titulo === form.values.categoria;
                    });

                    videosRepository.create({
                        titulo: form.values.titulo,
                        url: form.values.url,
                        categoriaId: chosenCategory.id,
                        })
                        .then(() => {
                            history.push('/');
                    });
                }
                
            }}>
                <FormField
                    label= "Título do vídeo *"
                    type="text"
                    value={form.values.titulo}
                    name="titulo"
                    onChange={form.handleChange}
                    error={form.errors.titulo && (form.errors.titulo) }
                />

                <FormField
                    label= "Url *"
                    type="text"
                    value={form.values.url}
                    name="url"
                    onChange={form.handleChange}
                    error={form.errors.url && (form.errors.url) }
                />

                <FormField
                    label= "Categoria *"
                    type="text"
                    value={form.values.categoria}
                    name="categoria"
                    onChange={form.handleChange}
                    suggestions={categoryTitles}
                    error = {form.errors.categoria && ( form.errors.categoria ) }

                />

                <Button type="submit">Cadastrar</Button>

                <Link to="/cadastro/categoria" 
                style={{
                    textDecoration: 'none', 
                    color: '#3CCBCE', 
                    float: 'right', 
                    marginTop: '16px', 
                    marginRight: '5px'
                }}>Ir para categoria</Link>

            </form>            
        </PageDefault>
    );
}

export default CadastroVideo;