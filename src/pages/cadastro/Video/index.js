import React, { useState, useEffect } from 'react';
import PageDefault from '../../../components/PageDefault';
import { Link, useHistory } from 'react-router-dom';
import FormField from '../../../components/FormField';
import useForm from '../../../hooks/useForm';
import Button from '../../../components/Button';
import videosRepository from '../../../repositories/videos';
import categoriasRepository from '../../../repositories/categorias';

function CadastroVideo(){
    const history = useHistory();
    const [categorias, setCategorias] = useState([]);
    const categoryTitles = categorias.map(({ titulo }) => titulo);
    var formIsValid = true;
    
    const form = useForm({
        valoresIniciais: {
            titulo: '', 
            url: '', 
            categoria: '',
        },

        validate: function validate(){
            const errors = {};

            if(form.valores.titulo === ''){
                errors.titulo = 'Esse campo é obrigatório.';
                formIsValid = false;
            }

            if(form.valores.url === ''){
                errors.url = 'Esse campo é obrigatório.';
                formIsValid = false;
                //validar url depois com regex
            }

            if(form.valores.categoria === ''){
                errors.categoria = 'Esse campo é obrigatório.';
                formIsValid = false;
            }
            else{
                if(categoryTitles.indexOf(form.valores.categoria) === -1){
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
          .then((categoriasFromServer) => {
            setCategorias(categoriasFromServer);
          });
    }, []);

    /*function formIsValid(){
        if(categoryTitles.indexOf(form.valores.categoria) !== -1){
            return true;
        }
        return false;
    }*/

    return(
        <PageDefault>
            <h1>Cadastro de Vídeo</h1>

            <form onSubmit={event => {
                event.preventDefault();
                
                form.validateValues();

                if(formIsValid){
                    const categoriaEscolhida = categorias.find((categoria) => {
                        return categoria.titulo === form.valores.categoria;
                    });

                    videosRepository.create({
                        titulo: form.valores.titulo,
                        url: form.valores.url,
                        categoriaId: categoriaEscolhida.id,
                        })
                        .then(() => {
                            history.push('/');
                    });
                }
                
            }}>
                <FormField
                    label= "Título do vídeo *"
                    type="text"
                    value={form.valores.titulo}
                    name="titulo"
                    onChange={form.handleChange}
                    error={form.errors.titulo && (form.errors.titulo) }
                />

                <FormField
                    label= "Url *"
                    type="text"
                    value={form.valores.url}
                    name="url"
                    onChange={form.handleChange}
                    error={form.errors.url && (form.errors.url) }
                />

                <FormField
                    label= "Categoria *"
                    type="text"
                    value={form.valores.categoria}
                    name="categoria"
                    onChange={form.handleChange}
                    suggestions={categoryTitles}
                    error = {form.errors.categoria && ( form.errors.categoria ) }

                />

                <Button type="submit">Cadastrar</Button>

                <Link to="/cadastro/categoria" style={{textDecoration: 'none', color: '#3CCBCE', float: 'right', marginTop: '16px', marginRight: '5px'}}>Cadastrar categoria</Link>

            </form>            
        </PageDefault>
    );
}

export default CadastroVideo;