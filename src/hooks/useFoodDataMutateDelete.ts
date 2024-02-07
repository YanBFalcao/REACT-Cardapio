import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosPromise } from "axios";
import { FoodDataId } from '../interface/FoodDataId';
import { toast, ToastContainer } from "react-toastify";

const API_URL = 'http://localhost:8080';

const deleteData = async (id: FoodDataId): Promise<any> => {
    
    try{
        const response = await axios.delete(`${API_URL}/cardapio/${id.id}`);
            if(((await response).status === 200) && (id.id != null)){
                toast.success("Item excluído do cardápio!", {
                position: 'bottom-left',
                autoClose: 3000,
            });
        }
        return response.data; // Retorna os dados da resposta para serem usados na manipulação do sucesso da mutação
    }
    catch(error){
        toast.error("Erro ao excluir item ao cardápio! Valide o Id do item!", {
            position: 'bottom-left',
            autoClose: 3000,
        });
    }
}

export function useFoodDataMutateDelete(){
    const queryClient = useQueryClient();

    const mutateDelete = useMutation({
        mutationFn: deleteData,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries(['food-data'])            
        }     
    })
    return mutateDelete;
}