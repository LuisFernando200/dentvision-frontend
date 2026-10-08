import React, { useState, useRef } from 'react';
import { styles } from './UploadImage.styles';

interface UploadImageProps {
  onFileSelected : (file: File | null) => void;
}

export const UploadImageHelp: React.FC<UploadImageProps> = ({
  onFileSelected,
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFile = (file: File) => {
    if (file.type.startsWith('image/')) {
      // Si ya había una imagen, libera la memoria
      if (preview) {
        URL.revokeObjectURL(preview);
      }

      const imageUrl = URL.createObjectURL(file);

      setPreview(imageUrl);
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

    if (e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
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

    onFileSelected(null);
  };

  return (
    <div style={styles.wrapper}>
      <div
        style={styles.dropZone(isDragOver)}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => {
          if (!preview) {
            fileInputRef.current?.click();
          }
        }}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleInputChange}
        />

        {preview ? (
          <>
            <img
              src={preview}
              alt="Vista previa"
              style={styles.previewImage}
            />

            <button
              onClick={handleLimpiar}
              style={{
                marginTop: 12,
                background: '#e53e3e',
                color: '#fff',
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
            <h3 style={styles.title}>
              Arrastra y suelta tu imagen aquí
            </h3>

            <p style={styles.subtitle}>
              o haz clic en cualquier parte de este recuadro para seleccionar una imagen
            </p>
          </>
        )}
      </div>
    </div>
  );
};