import React, { useState, useEffect } from 'react';
import PageDefault from '../../../components/PageDefault';
import { Link } from 'react-router-dom';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';
import useForm from '../../../hooks/useForm';
import categoriasRepository from '../../../repositories/categorias';

function CadastroCategoria(){
    const [categorias, setCategorias] = useState([]);
    const categoryTitles = categorias.map(({ titulo }) => titulo);
    var formIsValid = true;

    const form = useForm({
        valoresIniciais: {
            titulo: '',
            descricao: '',
            cor: '',
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
                        descricao: form.valores.descricao,
                        cor: form.valores.cor,
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
                    type="textarea"
                    value={form.valores.descricao}
                    name="descricao"
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