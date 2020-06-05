import React, { useState, useContext } from 'react'
import { Uploader, Alert, Icon, Loader } from 'rsuite'
import { context } from '../context/context'

function previewFile(file, callback) {
  const reader = new FileReader()
  reader.onloadend = () => {
    callback(reader.result)
  }
  reader.readAsDataURL(file)
}

const styles = {
  button: {
    width: '20rem',
    height: '20rem'
  },
  image: {
    maxHeight: '100%',
    maxWidth: '100%'
  }
}

export const UploadUserAvatars = () => {
  const [uploading, setUploading] = useState(false)
  const { userAvatar, setUserAvatar } = useContext(context)

  return (
    <Uploader
      fileListVisible={false}
      listType="picture"
      action="/api/auth/upload"
      onUpload={file => {
        setUploading(true)
        previewFile(file.blobFile, value => {
          setUserAvatar(value)
        })
      }}
      onSuccess={(response: Object, file: FileType) => {
        setUploading(false)
        Alert.success('Uploaded successfully')
        console.log(response)
      }}
      onError={() => {
        setUserAvatar(null)
        setUploading(false)
        Alert.error('Upload failed')
      }}
    >
      <button style={styles.button}>
        {uploading && <Loader backdrop center />}
        { userAvatar 
          ? <img src={userAvatar} style={styles.image} />
          : <Icon icon="avatar" size="5x" />
        }
      </button>
    </Uploader>
  )
}