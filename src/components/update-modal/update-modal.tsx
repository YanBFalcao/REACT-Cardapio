import "./update-modal.css";
import React, { useEffect, useState } from "react"
import { FoodDataUpdate } from "../../interface/FoodDataUpdate";
import { useFoodDataMutateAtualizar } from "../../hooks/useFoodDataMutateAtualizar";

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

export function UpdateModal( { closeModal }: ModalProps){
    
    const[id, setId] = useState<number>(0);
    const[title, setTitle] = useState("");
    const[price, setPrice] = useState(0);
    const[image, setImage] = useState("");
    const { mutate, isSuccess } = useFoodDataMutateAtualizar(); // Função que realiza o submit dos dados
    
    const submitUpdate = () => {
        const FoodDataUpdate: FoodDataUpdate = {
            id,
            title,
            price,
            image
        }
        mutate(FoodDataUpdate)
    }

    useEffect(() => {
        if(!isSuccess) return
        closeModal();
    }, [isSuccess]) 
    return(
        <div className="modal-overlay-update">
            <div className="modal-body-update">
                <h2> Insira o "ID" do item para atualizar e preencha os novos dados.</h2>
                <form className="input-container-update">
                    <Input label="ID do Item:" value={id} updateValue={setId}></Input>
                    <Input label="title" value={title} updateValue={setTitle}></Input>
                    <Input label="price" value={price} updateValue={setPrice}></Input>   
                    <Input label="image" value={image} updateValue={setImage}></Input>
                </form>
                    <button onClick={submitUpdate} className="btn-update">Atualizar</button>
            </div>
        </div>
    )
}