import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosPromise } from "axios";
import { FoodDataUpdate } from "../interface/FoodDataUpdate";
import { toast } from "react-toastify";

const API_URL = 'http://localhost:8080';

const putData = async (data: FoodDataUpdate): Promise<any> => {
    
    try{
        const response = await axios.put(`${API_URL}/cardapio/${data.id}`, data);
        if((await response).status === 200){
            toast.success("Item atualizado no cardápio!", {
                position: 'bottom-left',
                autoClose: 3000,
            });
        }
        return response.data;
    }
    catch(error){
        toast.error("Erro ao atualizar item ao cardápio! Valide os dados!", {
            position: 'bottom-left',
            autoClose: 3000,
        });
    }
}

export function useFoodDataMutateAtualizar(){
    const queryClient = useQueryClient();

    const mutate = useMutation({
        mutationFn: putData,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries(['food-data'])
        }     
    })
    return mutate;
}