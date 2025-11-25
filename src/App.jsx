import SchemaBuilderTool from './SchemaBuilderTool'
import { SchemaProvider } from './schemaProvider';
function App() {

  return (
    <>
    <SchemaProvider>
      <SchemaBuilderTool/>
      </SchemaProvider>
    </>
  )
}

export default App
