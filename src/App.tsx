import './App.css'
import "react-toastify/dist/ReactToastify.css";
import { useState } from 'react';
import { Card } from './components/card/card';
import { useFoodData } from './hooks/useFoodData';
import { CreateModal } from './components/create-modal/create-modal';
import { UpdateModal } from './components/update-modal/update-modal';
import { DeleteModal } from './components/delete-modal/delete-modal';
import { ToastContainer } from 'react-toastify';

function App() {

  const { data } = useFoodData();
  const [isModalOpen, setIsModalOpen]= useState(false);
  const [isModalPutOpen, setIsModalPutOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(prev => !prev)
  }

  const handleOpenModalPut = () => {
    setIsModalPutOpen(prev => !prev)
  }

  const handleOpenModalDelete = () => {
    setIsModalDeleteOpen(prev => !prev)
  }

  return (
      <div className="container">
        <h1>Cardápio</h1>
        <div className="card-grid">
          {data?.map((foodData, index) => 
            <Card
              key={index} // Adicionando uma chave única para cada item na lista
              id={foodData.id}
              price={foodData.price}
              title={foodData.title}
              image={foodData.image}
            />
          )}
        </div>
        
        {isModalOpen && <CreateModal closeModal={handleOpenModal}/>}
        <button onClick={handleOpenModal} className='btnNovo'> Adicionar Item </button>

        {isModalPutOpen && <UpdateModal closeModal={handleOpenModalPut}/>}
        <button onClick={handleOpenModalPut} className='btnAtualizar'> Atualizar Item </button>
        
        {isModalDeleteOpen && <DeleteModal closeModal={handleOpenModalDelete}/>}
        <button onClick={handleOpenModalDelete} className='btnDeletar'> Deletar Item </button>

        <ToastContainer autoClose={3000}></ToastContainer>

      </div>
  )
}

export default App