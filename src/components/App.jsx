import { useState } from "react"

export const App = () => {
    const [serch,setserch] = useState('')
    const [name,setName] = useState('')
    const [image,setImage] = useState('')
    const [sinopsis,setSinopsis] = useState('')
    const [id,setId] = useState('')
    const [status,setStatus] = useState('')
    const [caps,setCaps] = useState()

    const [episodios,setEpisodios] = useState()

    const fetcha = () => {
        fetch(`https://kitsu.io/api/edge/anime?filter[text]=${serch}`)
            .then((response) => response.json())
            .then((data) => {
              setId(data.data[0].id)
              setImage(data.data[0].attributes.posterImage.large)
              setName(data.data[0].attributes.titles.en)
              setSinopsis(data.data[0].attributes.description)
               setStatus(data.data[0].attributes.status)
               setCaps(data.data[0].attributes.episodeCount)
            })
            .catch((error) => {
                console.error('Error fetching data:', error)
            })

            fetch(`https://kitsu.io/api/edge/anime/${id}/episodes`)
            .then((response) => response.json())
            .then((data) => {
               setEpisodios([data])
            })
            .catch((error) => {
                console.error('Error fetching data:', error)
            })

    }




  return (
    <> 
        <input className="form-control me-2" type="text" onChange={(e/*evento*/) => {setserch(e.target.value)}}/>
        <button onClick={fetcha}>Pruebas</button>
        <h1>ID: {id} </h1>
        <h1>Nombre: {name} </h1>
        <h1>Estado: {status}</h1>
        <h1>Capitulos: {caps} </h1>
        <h1>Sinopsis: {sinopsis} </h1>
        <img src={image} alt="img"/>
        <div>
          <div>
            {episodios.map(({id, url})=>{
              return (
                <img key={id} src ={url}/>
              )
            })}
          </div>
        </div>
    </>
  )
}
