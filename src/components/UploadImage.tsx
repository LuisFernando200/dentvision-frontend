import React, { useState, useRef } from 'react';
import { styles } from './UploadImage.styles';

interface UploadImageProps {
  onFileSelected: (file: File | null) => void;
  resultImageUrl: string | null; // imagen ya procesada por el backend
  onClear: () => void; // limpia todo en el padre (archivo + resultado + diagnostico)
}

export const UploadImage: React.FC<UploadImageProps> = ({
  onFileSelected,
  resultImageUrl,
  onClear,
}) => {
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const [preview, setPreview] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFile = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file);
      setPreview(url);
      onFileSelected(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleLimpiar = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (preview) {
      URL.revokeObjectURL(preview);
    }
    setPreview(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

    onClear(); // avisa al padre: borra archivo, resultado, diagnóstico, todo
  };

  // Si ya hay resultado del backend, ese manda sobre la preview original
  const imagenAMostrar = resultImageUrl || preview;

  return (
    <div style={styles.wrapper}>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !imagenAMostrar && fileInputRef.current?.click()}
        style={styles.dropZone(isDragOver)}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleInputChange}
          accept="image/*"
          style={{ display: 'none' }}
        />

        {imagenAMostrar ? (
          <>
            <img src={imagenAMostrar} alt="Radiografía" style={styles.previewImage} />
            <button
              onClick={handleLimpiar}
              style={{
                marginTop: 12,
                background: '#e53e3e',
                color: 'white',
                border: 'none',
                borderRadius: 6,
                padding: '8px 16px',
                cursor: 'pointer',
              }}
            >
              Quitar imagen
            </button>
          </>
        ) : (
          <>
            <h3 style={styles.title}>Arrastra y suelta tu radiografía aquí</h3>
            <p style={styles.subtitle}>
              o haz clic en cualquier parte de este recuadro para explorar en tu equipo
            </p>
          </>
        )}
      </div>
    </div>
  );
};