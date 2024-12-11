import React, { useState } from 'react'
import formStyles from './Form.module.css'
import Input from './Input.jsx'
import Select from './Select.jsx'

const Carform = ({ handleSubmit, carData, btnText }) => {
    const [car, setCar] = useState({features: [], ...carData || {}})
    const [preview, setPreview] = useState([])
    const [isLoading, setIsLoading] = useState(false) 
    const brands = ["Honda", "Fiat", "Ford", "Chevrolet", "Renault"]
    const transmissions = ["Manual", "Automatico", "CVT"]
    const colors = ["Branco", "Preto", "Vermelho", "Cinza", "Azul"]
    const fuels = ["Gasolina", "Acool", "Flex", "Hibrido"]
    const featuresOptions = [
        "Ar-condicionado",
        "Teto solar",
        "Rodas de liga leve",
        "Sensor de estacionamento",
        "Câmera de ré",
        "Faróis de LED",
        "Volante de couro"
    ];

    function onFileChange(e) {
        setPreview(Array.from(e.target.files))
        setCar({ ...car, images: [...e.target.files] })
    }

    function handleChange(e) {
        setCar({ ...car, [e.target.name]: e.target.value })
    }

    function handleBrand(e) {
        setCar({ ...car, brand: e.target.options[e.target.selectedIndex].text })
    }

    function handleColor(e) {
        setCar({ ...car, color: e.target.options[e.target.selectedIndex].text })
    }

    function handleFuel(e) {
        setCar({ ...car, fuel: e.target.options[e.target.selectedIndex].text })
    }

    function handleTransmission(e) {
        setCar({ ...car, transmission: e.target.options[e.target.selectedIndex].text })
        
    }

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        setCar(prevCar => ({
            ...prevCar,
            features: checked 
                ? [...prevCar.features, value]  // Adiciona a feature se o checkbox estiver marcado
                : prevCar.features.filter(feature => feature !== value)  // Remove a feature se desmarcado
        }));
    };

    async function Submit(e) {
        e.preventDefault()
        setIsLoading(true) 
        console.log(car)
        await handleSubmit(car)
        setIsLoading(false) 
    }

    return (
        <form onSubmit={Submit} className={formStyles.form_container}>
            <div className={formStyles.preview_pet_images}>
                {preview.length > 0
                    ? preview.map((image, index) => (
                        <img
                            src={URL.createObjectURL(image)}
                            alt={car.name}
                            key={`${car.name}+${index}`}
                        />
                    ))
                    : car.images && car.images.map((image, index) => (
                        <img
                            src={`${import.meta.env.VITE_API_URL}/images/cars/${image}`}
                            alt={car.name}
                            key={`${car.name}+${index}`}
                        />
                    ))
                }
            </div>
            <Input
                text="Imagens do Carro"
                type="file"
                name="images"
                handleOnChange={onFileChange}
                multiple={true}
            />
            <Input
                text="Nome do carro"
                type="text"
                name="name"
                placeholder="Digite o nome"
                handleOnChange={handleChange}
                value={car.name || ""}
            />
            <Input
                text="Preço do Carro"
                type="text"
                name="price"
                placeholder="Digite o preço (Apenas Numeros)"
                handleOnChange={handleChange}
                value={car.price || ""}
            />
            <Input
                text="Ano do carro"
                type="number"
                name="year"
                placeholder="Digite o ano"
                handleOnChange={handleChange}
                value={car.year || ""}
            />
            <Input
                text="Km Rodados"
                type="number"
                name="km"
                placeholder="Digite o Km"
                handleOnChange={handleChange}
                value={car.km || ""}
            />
            <Input
                text="Motor"
                type="text"
                name="motor"
                placeholder="Digite o motor (Ex: 1.0, 2.0)"
                handleOnChange={handleChange}
                value={car.motor || ""}
            />
            <Select
                name="brand"
                text="Selecione a Marca"
                options={brands}
                handleOnChange={handleBrand}
                value={car.brand || ''}
            />
            <Select
                name="color"
                text="Selecione a Cor"
                options={colors}
                handleOnChange={handleColor}
                value={car.color || ''}
            />
            <Select
                name="transmission"
                text="Selecione o Cambio"
                options={transmissions}
                handleOnChange={handleTransmission}
                value={car.transmission || ''}
            />
            <Select
                name="fuel"
                text="Selecione o Combustivel"
                options={fuels}
                handleOnChange={handleFuel}
                value={car.fuel || ''}
            />
            <Input
                text="Localização"
                type="text"
                name="location"
                placeholder="Digite a localidade (Ex: São Paulo -SP)"
                handleOnChange={handleChange}
                value={car.location || ""}
            />
            <div>
                <h3>Selecione as Features:</h3>
                {featuresOptions.map((feature) => (
                    <label key={feature}>
                        <input
                            type="checkbox"
                            value={feature}
                            checked={car.features.includes(feature)}  // Verifica se a feature já está selecionada
                            onChange={handleCheckboxChange}
                        />
                        {feature}
                    </label>
                ))}
            </div>
            <button
                type="submit"
                disabled={isLoading}  
                className={formStyles.submitButton}
            >
                {isLoading ? (
                    <span className={formStyles.loader}></span> 
                ) : (
                    btnText
                )}
            </button>
        </form>
    )
}

export default Carform
