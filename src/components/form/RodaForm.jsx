import React, { useState , useEffect} from 'react'
import formStyles from './Form.module.css'
import Input from './Input.jsx'


const RodaForm = ({ handleSubmit, btnText, carData }) => {
    const [roda, setRoda] = useState(carData || {})  // Inicializa com os dados da roda
    const [preview, setPreview] = useState([])  
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (carData) {
            setRoda(carData);  // Atualiza o estado quando os dados forem recebidos
        }
    }, [carData]);

    function onFileChange(e) {
        setPreview(Array.from(e.target.files))
        setRoda({ ...roda, images: [...e.target.files] })
    }

    function handleChange(e) {
        setRoda({ ...roda, [e.target.name]: e.target.value })
    }

    async function Submit(e) {
        e.preventDefault()
        setIsLoading(true) 
        console.log(roda)
        await handleSubmit(roda)
        setIsLoading(false) 
    }

    return (
        <form onSubmit={Submit} className={formStyles.form_container}>
<div className={formStyles.preview_pet_images}>
    {preview.length > 0
        ? preview.map((image, index) => (
            <img
                src={URL.createObjectURL(image)}
                alt={roda.name}
                key={`${roda.name}+${index}`}
            />
        ))
        : roda.images && roda.images.map((image, index) => (
            <img
                src={`${import.meta.env.VITE_API_URL}/images/rodas/${image}`}
                alt={roda.name}
                key={`${roda.name}+${index}`}
            />
        ))
    }
</div>

            <Input
                text="Imagens da roda"
                type="file"
                name="images"
                handleOnChange={onFileChange}
                multiple={true}
            />
            <Input
                text="Nome da roda"
                type="text"
                name="name"
                placeholder="Digite o nome"
                handleOnChange={handleChange}
                value={roda.name || ""}  // Garantir que o valor seja preenchido
            />
            <Input
                text="Preço da roda"
                type="text"
                name="price"
                placeholder="Digite o preço (Apenas Números)"
                handleOnChange={handleChange}
                value={roda.price || ""}
            />
            <Input
                text="Localização"
                type="text"
                name="location"
                placeholder="Digite a localidade (Ex: São Paulo - SP)"
                handleOnChange={handleChange}
                value={roda.location || ""}
            />
            <button
                type="submit"
                disabled={isLoading}
                className={formStyles.submitButton}
            >
                {isLoading ? <span className={formStyles.loader}></span> : btnText}
            </button>
        </form>
    );
}

export default RodaForm
