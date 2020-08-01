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
    const { handleChange, valores } = useForm({
        titulo: '', 
        url: '', 
        categoria: ''
    });

    useEffect(() => {
        categoriasRepository
          .getAll()
          .then((categoriasFromServer) => {
            setCategorias(categoriasFromServer);
          });
    }, []);

    console.log(categorias);


    return(
        <PageDefault>
            <h1>Cadastro de Vídeo</h1>

            <form onSubmit={event => {
                event.preventDefault();
                const categoriaEscolhida = categorias.find((categoria) => {
                    return categoria.titulo === valores.categoria;
                });

                videosRepository.create({
                    titulo: valores.titulo,
                    url: valores.url,
                    categoriaId: categoriaEscolhida.id,
                })
                    .then(() => {
                        console.log('Deu bom!');
                        history.push('/');
                    });
            }}>
                <FormField
                    label= "Título do vídeo"
                    type="text"
                    value={valores.titulo}
                    name="titulo"
                    onChange={handleChange}
                />

                <FormField
                    label= "Url"
                    type="text"
                    value={valores.url}
                    name="url"
                    onChange={handleChange}
                />

                <FormField
                    label= "Categoria"
                    type="text"
                    value={valores.categoria}
                    name="categoria"
                    onChange={handleChange}
                    sugestoes={categoryTitles}
                /> 
                
                <Button type="submit">Cadastrar</Button>

            </form>
            <br />
            
            <Link to="/cadastro/categoria">Cadastrar categoria</Link>
        </PageDefault>
    );
}

export default CadastroVideo;