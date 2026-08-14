import { useState } from 'react'
import './Gallery.css'

export interface GalleryImage {
  imageUrl: string
  altName: string
}

interface Props {
  images: GalleryImage[]
}

export function Gallery({ images }: Props) {
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  if (images.length === 0) {
    return null
  }

  const currentImage = images[activeImageIndex] ?? images[0]

  return (
    <div className="gallery">
      <div className="gallery__hero">
        <img src={currentImage.imageUrl} alt={currentImage.altName} />
        <span className="gallery__photo-count" aria-hidden="true">
          {activeImageIndex + 1} / {images.length}
        </span>
      </div>

      {images.length > 1 && (
        <ul className="gallery__thumbnails">
          {images.map((img, idx) => (
            <li key={`${img.imageUrl}-${idx}`}>
              <button
                type="button"
                className={`gallery__thumbnail${idx === activeImageIndex ? ' is-active' : ''}`}
                onClick={() => setActiveImageIndex(idx)}
                aria-label={`Show photo ${idx + 1}`}
                aria-pressed={idx === activeImageIndex}
              >
                <img src={img.imageUrl} alt="" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
