import "./card.css"

interface CardProps{
    id: number,
    price: number,
    title: string,
    image: string
}

export function Card({ id, price, image, title }: CardProps){
    return(
        <div className="card"> 
            <img src={image}/>
            <h2 align-itens='center' className="fontTitle" font-size> ID: {id} - {title}</h2>
            <p><b>Valor: </b>{price}</p>
        </div>
    )
}