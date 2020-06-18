import React, { useState, useRef, useCallback, useEffect } from 'react'
import { Icon, Loader } from 'rsuite'
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'

const styles = {
  image: {
    maxHeight: '20rem',
    maxWidth: '20rem'
  },
  canvas: {
    width: '10rem',
    height: '10rem',
    margin: '0 1rem'
  },
  none: { display: 'none' },
  box: {
    display: 'flex',
    margin: '1rem 0',
    justifyContent: 'flex-start',
    width: '95%'
  },
  pointer: { cursor: 'pointer' }
}

export const UploadImage = ({ setImage }) => {
  const [uploading, setUploading] = useState(false)
  const [initialImage, setInitialmage] = useState(null)
  const [completedCrop, setCompletedCrop] = useState(null)
  const [crop, setCrop] = useState({ x: 20, y: 20, width: 80, height: 80, aspect: 1 })
  const imgRef = useRef(null)
  const previewCanvasRef = useRef(null)
  const hiddenCanvasRef = useRef(null)

  const onSelectFile = e => {
    setUploading(true)
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader()
      // reader.addEventListener('load', () => setImage(reader.result), false)
      reader.onloadend = () => {setInitialmage(reader.result)}
      reader.readAsDataURL(e.target.files[0])
      setUploading(false)
    }
  }

  const onLoad = useCallback(img => {imgRef.current = img}, []);

  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return
    }
    const image = imgRef.current
    const canvas = previewCanvasRef.current
    const hcanvas = hiddenCanvasRef.current
    const crop = completedCrop
    const dpr = window.devicePixelRatio || 1

    const scaleX = image.naturalWidth / image.width
    const scaleY = image.naturalHeight / image.height
    const ctx = canvas.getContext('2d')
    const hctx = hcanvas.getContext('2d')

    canvas.width = crop.width * dpr
    canvas.height = crop.height * dpr

    if ((crop.width > 0) && (crop.height > 0)) {
      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width * dpr,
        crop.height * dpr
      )
      hctx.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, 64, 64)
      const base64Image = hcanvas.toDataURL('image/jpeg')
      setImage(base64Image)
    }
  }, [completedCrop])

 
  return (
    <div>
        <div>
          <label htmlFor="file-input" style={styles.pointer}>
            <Icon icon="upload" size="5x" />
          </label>
          <input id="file-input" type="file" accept="image/*" onChange={onSelectFile} style={styles.none} />
        </div>
        {uploading && <Loader backdrop center />}
        { initialImage 
          ? <div style={styles.box}>
              <ReactCrop imageStyle={styles.image} src={initialImage} crop={crop} ref={imgRef}
                onImageLoaded={onLoad}
                onComplete={crop => setCompletedCrop(crop)}
                onChange={crop => setCrop(crop)}
              />
              <div>
                <canvas ref={previewCanvasRef} style={styles.canvas} />
                <canvas ref={hiddenCanvasRef} style={styles.none} width='64' height='64' />
              </div>
            </div>
          : <>Select file</>
        }
    </div>
  )
}