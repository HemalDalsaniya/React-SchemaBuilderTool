import { useState, createContext } from 'react';

const SchemaContext = createContext();
export const SchemaProvider = ({ children }) => {
  const [schema, setSchema] = useState('');
  const [settingsData, setSettingsData] = useState({
    name: "My New Section",
    sectionClass: "",
    maxBlocks: "",
    selectedTag: "",
    selectedTemplates: [],
    selectedGroup: "",
    presets: "My New Section"
  });
  const [elementsData, setElementsData] = useState({
    droppedElements: [],
    nestedFields: {},
    fieldValues: {}
  });

  return (
    <SchemaContext.Provider value={{ 
      schema, 
      setSchema, 
      settingsData, 
      setSettingsData, 
      elementsData, 
      setElementsData 
    }}>
      {children}
    </SchemaContext.Provider>
  );
};
