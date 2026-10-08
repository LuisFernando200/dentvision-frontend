import { styles } from '../pages/HowltWorks.styles';

// Ejemplo de cómo podría ser tu componente SetpCard.tsx
interface StepCardProps {
  num: number;
  title: string;
  description: string;
  imagen: string;
  imageStyle?: React.CSSProperties; // Agrega esto
}

export const SetpCard = ({ num, title, description, imagen, imageStyle }: StepCardProps) => {
  return (
    <div style={styles.stepCard}>
      <span style={styles.stepNumber}>{num}</span>
      <h3 style={styles.cardTitle}>{title}</h3>
      <p style={styles.cardDescription}>{description}</p>
      
      {/* Combina el estilo base con el estilo opcional pasado */}
      <img src={imagen} alt={title} style={{...styles.cardImage, ...imageStyle}} />
    </div>
  );
};