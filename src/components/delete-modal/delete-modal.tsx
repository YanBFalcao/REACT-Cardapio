import "./delete-modal.css";
import React, { useEffect, useState } from "react"
import { FoodDataId } from "../../interface/FoodDataId";
import { useFoodDataMutateDelete } from "../../hooks/useFoodDataMutateDelete"

interface InputProps {
    label: string,
    value: string | number,
    deleteValue(value: any): void
}

interface ModalProps{
    closeModal(): void
}

const Input = ({label, value, deleteValue}: InputProps) => {
    return (
        <>
            <label>{label}</label>
            <input value={value} onChange={event => deleteValue(event.target.value)}></input>
        </>
    )
}

export function DeleteModal({ closeModal }: ModalProps){
    const[id, setId] = useState(0);
    const { mutate, isSuccess } = useFoodDataMutateDelete(); 
    
    const submitDelete = () => {
        const foodDataId: FoodDataId = {
            id,
        }
        mutate(foodDataId)
    }

    useEffect(() => {
        if(!isSuccess) return
        closeModal();
    }, [isSuccess])

    return(
        <div className="modal-overlay-delete">
            <div className="modal-body-delete">
                <h2> Insira o "ID" do item que deseja excluir </h2>
                <form className="input-container-delete">
                    <Input label="ID do Item:" value={id} deleteValue={setId}></Input>
                </form>
                    <button onClick={submitDelete} className="btn-delete">Deletar</button>
            </div>
        </div>
    )
}