import SchemaBuilderTool from './SchemaBuilderTool'
import { SchemaProvider } from './schemaProvider';
function App() {

  return (
    <>
      <SchemaProvider>
         <SchemaBuilderTool className="overflow-x-hidden max-w-screen"/>
      </SchemaProvider>
    </>
  )
}

export default App
