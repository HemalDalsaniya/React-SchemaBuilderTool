// import { useState } from 'react';
// import ColorSchema from './ColorSchema';
// import ColorSchemaElements from './ColorSchemaElements';
// import SectionSchemaGenerator from './SectionSchemaGenerator';

// const ColorContainer = ({ schemaGenerator, setSchemaGenerator }) => {
//   const [droppedElements, setDroppedElements] = useState([]);
//   const [resetTrigger, setResetTrigger] = useState(0);
//   const [settingsData, setSettingsData] = useState({
//     colorSchemaName: "Color Schema Group",
//     colorSchemeId: "color_schemes",
//     sectionClass: "",
//     maxBlocks: "",
//     selectedTag: "",
//     selectedTemplates: [],
//     selectedGroup: ""
//   });
//   const [elementsData, setElementsData] = useState({
//     droppedElements: [],
//     nestedFields: {},
//     fieldValues: {}
//   });

//   const handleDrop = (element) => {
//     setDroppedElements([...droppedElements, element]);
//   };
  
//   const handleDelete = (index) => {
//     setDroppedElements(droppedElements.filter((_, i) => i !== index));
//   };
  
//   const handleGlobalReset = () => {
//     setDroppedElements([]);
//     setResetTrigger(prev => prev + 1);
//     setSettingsData({
//       colorSchemaName: "Color Schema Group",
//       colorSchemeId: "color_schemes",
//       sectionClass: "",
//       maxBlocks: "",
//       selectedTag: "",
//       selectedTemplates: [],
//       selectedGroup: ""
//     });
//     setElementsData({
//       droppedElements: [],
//       nestedFields: {},
//       fieldValues: {}
//     });
//   };

//   return (
//     <div className="flex flex-row gap-x-2 h-[85%] text-white ">
//       <SectionSchemaGenerator 
//         resetTrigger={resetTrigger} 
//         settingsData={settingsData}
//         setSettingsData={setSettingsData}
//         schemaGenerator={schemaGenerator}
//         setSchemaGenerator={setSchemaGenerator}
//       />
//       <ColorSchemaElements 
//         droppedElements={droppedElements} 
//         onDrop={handleDrop} 
//         onDelete={handleDelete}
//         resetTrigger={resetTrigger}
//         elementsData={elementsData}
//         setElementsData={setElementsData}
//       />
//       <ColorSchema 
//         onReset={handleGlobalReset} 
//         resetTrigger={resetTrigger}
//         settingsData={settingsData}
//         elementsData={elementsData}
//       />
//     </div>
//   );
// };

// export default ColorContainer


//*****************************************************TEST CODE FOR COLOR SCHEMA******************************************** */
//***************************************************************************************************************************


import { useState } from 'react';
import ColorSchemaGroup from './ColorSchemaGroup';
import ColorSchemaElements from './ColorSchemaElements';
import ColorSchemaGenerator from './ColorSchemaGenerator';

const ColorContainer = ({ schemaType, setSchemaType }) => {
  const [droppedElements, setDroppedElements] = useState([]);
  const [resetTrigger, setResetTrigger] = useState(0);
  const [colorSettingsData, setColorSettingsData] = useState({
    colorSchemaName: "Color Scheme Group",
    colorSchemeId:"color_schemes",
    backgroundSolid:"",
    backgroundGradient:"",
    textColor:"",
    primaryButton:"",
    onPrimaryButton:"",
    primaryButtonBorder:"",
    secondaryButton:"",
    onSecondaryButton:"",
    secondaryButtonBorder:"",
    iconsColor:"",
    linkColor:""
  });
  const [colorElementsData, setColorElementsData] = useState({
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
    setColorSettingsData({
    colorSchemaName: "Color Scheme Group",
    colorSchemeId:"color_schemes",
    backgroundSolid:"",
    backgroundGradient:"",
    textColor:"",
    primaryButton:"",
    onPrimaryButton:"",
    primaryButtonBorder:"",
    secondaryButton:"",
    onSecondaryButton:"",
    secondaryButtonBorder:"",
    iconsColor:"",
    linkColor:""
    });
    setColorElementsData({
      droppedElements: [],
      nestedFields: {},
      fieldValues: {}
    });
  };

  return (
    <div className="flex flex-row gap-x-2 h-[85%] text-white ">
      <ColorSchemaGenerator 
        resetTrigger={resetTrigger} 
        colorSettingsData={colorSettingsData}
        setColorSettingsData={setColorSettingsData}
        schemaType={schemaType}
        setSchemaType={setSchemaType}
      />
      <ColorSchemaElements 
        droppedElements={droppedElements} 
        onDrop={handleDrop} 
        onDelete={handleDelete}
        resetTrigger={resetTrigger}
        colorElementsData={colorElementsData}
        setColorElementsData={setColorElementsData} colorSettingsOptions={colorSettingsData}
      />
      <ColorSchemaGroup 
        onReset={handleGlobalReset} 
        resetTrigger={resetTrigger}
        colorSettingsData={colorSettingsData}
        colorElementsData={colorElementsData}
      />
    </div>
  );
};

export default ColorContainer;