import {styles} from './ImagenCalor.styles'
interface Image {
    direcction : string;
    description:string;
}

export const ImagenCalor = ({direcction,description} : Image) => {
  return (
    <div style={styles.contenedor}>
        <img 
        src= {direcction} 
        alt= {description}
        style={styles.imagen}        
        />
    </div>
  )
}
