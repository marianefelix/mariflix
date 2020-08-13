import { useState } from 'react';

function useForm({ initialsValues, validate} ){
    const [values, setValues] = useState(initialsValues);
    const [errors, setErrors] = useState([]);
    
    function setValue(chave, value){
        setValues({
            ...values,
            [chave]: value
        })
    }

    function handleChange(infos){
        setValue(
            infos.target.getAttribute(['name']), 
            infos.target.value
        );
    }

    function clear() {
        setValues(initialsValues);
    }

    function validateValues() {
        setErrors(validate());
    }

    return{
        values, 
        handleChange,
        clear,
        validateValues,
        errors,
        setErrors,
    };

}
export default useForm;