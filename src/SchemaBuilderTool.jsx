import Header from './Header'
import Container from './Container'
import ColorContainer from './ColorContainer'
import Footer from './Footer'
import { useState } from 'react'

const SchemaBuilderTool = () => {
  const [schemaType, setSchemaType] = useState('Section Schema Generator'); 
  
  return (  
    <>
      <div className="bg-black h-screen px-5 overflow-hidden">
        <Header  />
        
        {schemaType === 'Section Schema Generator' ? (
          <Container schemaType={schemaType} setSchemaType={setSchemaType} />
        ) : (
          <ColorContainer schemaType={schemaType} setSchemaType={setSchemaType} />
        )}

        <Footer  />
      </div>
    </>
  )
}
export default SchemaBuilderTool