import { useEffect, useState } from "react"
import { useFoodDataMutate } from "../../hooks/useFoodDataMutate";
import { FoodData } from "../../interface/FoodData";
import "./create-modal.css";
import "react-toastify/dist/ReactToastify.css";

interface InputProps {
    label: string,
    value: string | number,
    updateValue(value: any): void
}

interface ModalProps{
    closeModal(): void
}

const Input = ({label, value, updateValue}: InputProps) => {
    return (
        <>
            <label>{label}</label>
            <input value={value} onChange={event => updateValue(event.target.value)}></input>
        </>
    )
}

export function CreateModal({ closeModal }: ModalProps){

    const[title, setTitle] = useState("");
    const[price, setPrice] = useState(0);
    const[image, setImage] = useState("");
    const { mutate, isSuccess } = useFoodDataMutate(); // Função que realiza o submit dos dados
    
    // useState é um hook do react que faça a manipulação de status, linkado a renderização do react
    // O acima, retorna um array, onde ele no primeiro valor do array, será onde ele ficará salvo
    // E no segundo, será a função de atualização.

    const submit = () => {
        const foodData: FoodData = {
            title,
            price,
            image
        }
        mutate(foodData)
    }

    useEffect(() => { // Hook do react, gerando um efeito colateral, dependendo do array de dependencias
        if(!isSuccess) {
            // Não fazer nada
        }
        else{
            return closeModal();
        }

    }, [isSuccess]) // Toda vez que o array mudar, ele fecha ou executa uma ação

    return(
        <div className="modal-overlay">
            <div className="modal-body">
                <h2> Cadastre um novo item no cardápio</h2>
                <form className="input-container">
                    <Input label="title" value={title} updateValue={setTitle}></Input>
                    <Input label="price" value={price} updateValue={setPrice}></Input>   
                    <Input label="image" value={image} updateValue={setImage}></Input>
                </form>
                <button onClick={submit} className="btn-secondary"> Gravar </button>
           </div>    
        </div>
    )
}