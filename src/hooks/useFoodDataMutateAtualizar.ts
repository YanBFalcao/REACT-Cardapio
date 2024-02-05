import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosPromise } from "axios";
import { FoodDataUpdate } from "../interface/FoodDataUpdate";

const API_URL = 'http://localhost:8080';

const putData = async (data: FoodDataUpdate): Promise<any> => {
    const response = await axios.put(`${API_URL}/cardapio/${data.id}`, data);
    return response.data;
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