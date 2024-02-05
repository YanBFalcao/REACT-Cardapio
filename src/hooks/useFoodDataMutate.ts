import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosPromise } from "axios";
import { FoodData } from '../interface/FoodData';
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";

const API_URL = 'http://localhost:8080';

const postData = async (data: FoodData): AxiosPromise<any> => {
    const response = axios.post(API_URL + '/cardapio', data);
    return response;
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