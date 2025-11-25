import { useState } from 'react';
import SectionSchema from './SectionSchema';
import SectionSchemaElements from './SectionSchemaElements';
import SectionSchemaGenerator from './SectionSchemaGenerator';

const Container = ({ schemaType, setSchemaType }) => {
  const [droppedElements, setDroppedElements] = useState([]);
  const [resetTrigger, setResetTrigger] = useState(0);
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

  const handleDrop = (element) => {
    setDroppedElements([...droppedElements, element]);
  };
  
  const handleDelete = (index) => {
    setDroppedElements(droppedElements.filter((_, i) => i !== index));
  };
  
  const handleGlobalReset = () => {
    setDroppedElements([]);
    setResetTrigger(prev => prev + 1);
    setSettingsData({
      name: "My New Section",
      sectionClass: "",
      maxBlocks: "",
      selectedTag: "",
      selectedTemplates: [],
      selectedGroup: "",
      presets: "My New Section"
    });
    setElementsData({
      droppedElements: [],
      nestedFields: {},
      fieldValues: {}
    });
  };

  return (
    <div className="flex flex-row gap-x-2 h-[85%] text-white ">
      <SectionSchemaGenerator 
        resetTrigger={resetTrigger} 
        settingsData={settingsData}
        setSettingsData={setSettingsData}
        schemaType={schemaType}
        setSchemaType={setSchemaType}
      />

        <SectionSchemaElements 
          droppedElements={droppedElements} 
          onDrop={handleDrop} 
          onDelete={handleDelete}
          resetTrigger={resetTrigger}
          elementsData={elementsData}
          setElementsData={setElementsData}
        />

        <SectionSchema 
          onReset={handleGlobalReset} 
          resetTrigger={resetTrigger}
          settingsData={settingsData}
          elementsData={elementsData} 
        />
    </div>
  );
};

export default Container;