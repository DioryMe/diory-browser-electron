/* eslint-disable no-unused-vars */
import uuid from 'uuid'

const getData = diorys =>
  Object.entries(diorys).reduce((obj, [key, diory]) => {
    const id = diory.id || uuid()
    return {
      ...obj,
      [key]: { id, ...diory },
    }
  }, {})

const getLinks = diorys =>
  Object.entries(diorys).reduce(
    (obj, [key, { id }]) => ({
      ...obj,
      [key]: { id },
    }),
    {}
  )

const getDiorys = diorys =>
  Object.values(diorys).reduce(
    (obj, diory) => ({
      ...obj,
      [diory.id]: diory,
    }),
    {}
  )

const flattenDiograph = diograph => {
  const results = Object.entries(diograph).reduce((obj, [key, { data, ...diory }]) => {
    if (data) {
      const { geo: { zoom, ...geo } = {} } = data
      return {
        ...obj,
        [key]: { ...diory, ...geo },
      }
    }
    return {
      ...obj,
      [diory.id]: diory,
    }
  }, {})

  console.log(JSON.stringify(results))
}

export default flattenDiograph
