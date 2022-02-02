import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { useDispatchActions } from '../../../store'

import { inactivateButton } from '../../buttons/buttonsActions'
import { selectMemory } from '../../navigation/navigationActions'

import Modal from '../../../components/Modal'
import TextInput from '../../../components/TextInput'

import fields from './fields'

const useUpdateView = (diory = {}) => {
  const [values, setValues] = useState({})

  const updatedDiory = { ...diory, ...values }
  const { dispatch } = useDispatchActions()
  return {
    fields: fields.map((field) => ({ ...field, value: updatedDiory[field.key] })),
    setValue: (key, value) => setValues({ ...values, [key]: value }),
    updatedDiory,
    resetView: () => {
      dispatch(inactivateButton())
      dispatch(selectMemory())
      setValues({})
    },
  }
}

const resizeImage = ({ file, maxWidth, maxHeight }) => {
  const reader = new FileReader()
  const image = new Image()
  const canvas = document.createElement('canvas')

  const resize = () => {
    // Define the size of the canvas
    let { width, height } = image
    if (width > height) {
      if (width > maxWidth) {
        height *= maxWidth / width
        width = maxWidth
      }
    } else if (height > maxHeight) {
      width *= maxHeight / height
      height = maxHeight
    }
    canvas.width = width
    canvas.height = height

    // Draw image to canvas and get data (in a form of dataUrl)
    canvas.getContext('2d').drawImage(image, 0, 0, width, height)
    const dataUrl = canvas.toDataURL('image/jpeg')

    // Append preview image
    const img = document.createElement('img')
    img.src = dataUrl
    document.getElementById('preview').appendChild(img)

    // Convert data url to blob
    return new Promise((resolve) => {
      canvas.toBlob(resolve, 'image/jpeg')
    })
  }

  return new Promise((resolve) => {
    reader.onload = (readerEvent) => {
      image.onload = () => resolve(resize())
      image.src = readerEvent.target.result
    }
    reader.readAsDataURL(file)
  })
}

const resizeAndSaveImage = (event) => {
  const file = event.target.files[0]
  resizeImage({ file, maxHeight: 360, maxWidth: 480 })
    .then((blob) => {
      console.log('Send blob to backend?', blob)
    })
    .catch((err) => console.log(err))
}

const UpdateView = ({ diory, title, isShown, onDone }) => {
  const { fields, setValue, updatedDiory, resetView } = useUpdateView(diory)

  return (
    <Modal
      title={title}
      isShown={isShown}
      onDone={() => {
        onDone(updatedDiory)
        resetView()
      }}
      onCancel={resetView}
    >
      <div id="preview" />
      <input type="file" accept="image/*" onChange={resizeAndSaveImage} />
      {fields.map(({ key, label, format, value, autoFocus }) => (
        <TextInput
          id={key}
          key={key}
          label={label}
          format={format}
          value={value}
          onChange={(value) => setValue(key, value)}
          autoFocus={autoFocus}
          onKeyPress={(event) => {
            if (event.key === 'Enter') {
              onDone(updatedDiory)
              resetView()
              event.preventDefault()
            }
          }}
        />
      ))}
    </Modal>
  )
}

UpdateView.defaultProps = {
  title: '',
  diory: {},
  isShown: false,
  onDone: () => {},
}

UpdateView.propTypes = {
  title: PropTypes.string,
  diory: PropTypes.shape({
    text: PropTypes.string,
    image: PropTypes.string,
    style: PropTypes.object,
  }),
  isShown: PropTypes.bool,
  onDone: PropTypes.func,
}

export default UpdateView
