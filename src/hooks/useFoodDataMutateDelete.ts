import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosPromise } from "axios";
import { FoodDataId } from '../interface/FoodDataId';

const API_URL = 'http://localhost:8080';

const deleteData = async (id: FoodDataId): Promise<any> => {
    const response = await axios.delete(`${API_URL}/cardapio/${id.id}`);
    return response.data; // Retorna os dados da resposta para serem usados na manipulação do sucesso da mutação
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