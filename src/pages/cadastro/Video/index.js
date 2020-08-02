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
    const form = useForm({
        valoresIniciais: {
            titulo: '', 
            url: '', 
            categoria: '',
        },

        validate: function validate(valores){
            const errors = {};

            if(categoryTitles.indexOf(form.valores.categoria) === -1){
                errors.categoria = 'Essa categoria não existe!';
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

    function formIsValid(){
        if(categoryTitles.indexOf(form.valores.categoria) !== -1){
            return true;
        }
        return false;
    }

    return(
        <PageDefault>
            <h1>Cadastro de Vídeo</h1>

            <form onSubmit={event => {
                event.preventDefault();
                
                form.validateValues();

                if(formIsValid()){
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
                    label= "Título do vídeo"
                    type="text"
                    value={form.valores.titulo}
                    name="titulo"
                    onChange={form.handleChange}
                />

                <FormField
                    label= "Url"
                    type="text"
                    value={form.valores.url}
                    name="url"
                    onChange={form.handleChange}
                />

                <FormField
                    label= "Categoria"
                    type="text"
                    value={form.valores.categoria}
                    name="categoria"
                    onChange={form.handleChange}
                    sugestoes={categoryTitles}

                />

                {form.errors.categoria && <span>{form.errors.categoria}</span>}        


                <Button type="submit">Cadastrar</Button>

            </form>
            <br />
            
            <Link to="/cadastro/categoria">Cadastrar categoria</Link>
        </PageDefault>
    );
}

export default CadastroVideo;