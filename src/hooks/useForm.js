import { useState } from 'react';

function useForm({ valoresIniciais, validate} ){
    const [valores, setValores] = useState(valoresIniciais);
    const [errors, setErrors] = useState([]);
    
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

    function clear() {
        setValores(valoresIniciais);
    }

    function validateValues() {
        setErrors(validate());
    }

    return{
        valores, 
        handleChange,
        clear,
        validateValues,
        errors,
        setErrors,

    };

}
export default useForm;