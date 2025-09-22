import SchemaBuilderTool from './SchemaBuilderTool'
import { SchemaProvider } from './schemaProvider';
import A from './A'
function App() {

  return (
    <>
    <SchemaProvider>
      <SchemaBuilderTool/>
      {/* <A/> */}
      </SchemaProvider>
    </>
  )
}

export default App
