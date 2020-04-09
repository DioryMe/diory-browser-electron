import uuid from 'uuid'

const getData = (diorys) =>
  Object.entries(diorys).reduce((obj, [key, diory]) => {
    const id = diory.id || uuid()
    return {
      ...obj,
      [key]: { id, ...diory },
    }
  }, {})

const getLinks = (diorys) =>
  Object.entries(diorys).reduce(
    (obj, [key, { id }]) => ({
      ...obj,
      [key]: { id },
    }),
    {}
  )

const getDiorys = (diorys) =>
  Object.values(diorys).reduce(
    (obj, diory) => ({
      ...obj,
      [diory.id]: diory,
    }),
    {}
  )

const flattenDiograph = (diograph) => {
  const results = Object.entries(diograph).reduce((obj, [key, { diorys, ...diory }]) => {
    if (diorys) {
      const data = getData(diorys)
      const links = getLinks(data)
      const linkedDiorys = getDiorys(data)
      return {
        ...obj,
        ...linkedDiorys,
        [key]: { ...diory, links },
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
