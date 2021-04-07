import DataAttributeDiory from './DataAttributeDiory'
import Diory from './Diory'

function getSchemaType({ diory: { data = [] } }) {
  return data[0] && [data[0]['@context'], data[0]['@type']].join('/')
}

const DataAwareDiory = (props) => {
  const schemaType = getSchemaType(props)
  switch(schemaType) {
    case 'https://schema.org/ExerciseSummary':
    case 'https://schema.org/ExerciseAction':
      return <DataAttributeDiory {...props} />
    default:
      return <Diory {...props} />
  }
}

export default DataAwareDiory