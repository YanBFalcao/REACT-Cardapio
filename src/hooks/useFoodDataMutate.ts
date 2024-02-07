import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosPromise } from "axios";
import { FoodData } from '../interface/FoodData';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = 'http://localhost:8080';

const postData = async (data: FoodData): AxiosPromise<any> => {
    
    try{
        const response = axios.post(API_URL + '/cardapio', data);
            if((await response).status === 200){
                toast.success("Item adicionado ao cardápio!", {
                position: 'bottom-left',
                autoClose: 3000,
            });
        }
        return response;
    }
    catch(error){
        toast.error("Erro ao adicionar item ao cardápio! Valide os dados!", {
            position: 'bottom-left',
            autoClose: 3000,
        });
    }
}

export function useFoodDataMutate(){
    const queryClient = useQueryClient();

    const mutate = useMutation({
        mutationFn: postData,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries(['food-data'])
        }
    })
    
    return mutate;
}