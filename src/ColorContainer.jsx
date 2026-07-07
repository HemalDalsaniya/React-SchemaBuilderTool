// import { useState } from 'react';
// import ColorSchemaGroup from './ColorSchemaGroup';
// import ColorSchemaElements from './ColorSchemaElements';
// import ColorSchemaGenerator from './ColorSchemaGenerator';

// const ColorContainer = ({ schemaType, setSchemaType }) => {
//   const [droppedElements, setDroppedElements] = useState([]);
//   const [resetTrigger, setResetTrigger] = useState(0);
//   const [colorSettingsData, setColorSettingsData] = useState({
//     colorSchemaName: "Color Scheme Group",
//     colorSchemeId: "color_schemes",
//     backgroundSolid: "",
//     backgroundGradient: "",
//     textColor: "",
//     primaryButton: "",
//     onPrimaryButton: "",
//     primaryButtonBorder: "",
//     secondaryButton: "",
//     onSecondaryButton: "",
//     secondaryButtonBorder: "",
//     iconsColor: "",
//     linkColor: ""
//   });
//   const [colorElementsData, setColorElementsData] = useState({
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
//     setColorSettingsData({
//       colorSchemaName: "Color Scheme Group",
//       colorSchemeId: "color_schemes",
//       backgroundSolid: "",
//       backgroundGradient: "",
//       textColor: "",
//       primaryButton: "",
//       onPrimaryButton: "",
//       primaryButtonBorder: "",
//       secondaryButton: "",
//       onSecondaryButton: "",
//       secondaryButtonBorder: "",
//       iconsColor: "",
//       linkColor: ""
//     });
//     setColorElementsData({
//       droppedElements: [],
//       nestedFields: {},
//       fieldValues: {}
//     });
//   };

//   return (
//     <div className="flex flex-row gap-x-2 h-[85%] text-white">
//       <ColorSchemaGenerator 
//         resetTrigger={resetTrigger} 
//         colorSettingsData={colorSettingsData}
//         setColorSettingsData={setColorSettingsData}
//         schemaType={schemaType}
//         setSchemaType={setSchemaType}
//         colorElementsData={colorElementsData} // Pass this prop
//       />
//       <ColorSchemaElements 
//         droppedElements={droppedElements} 
//         onDrop={handleDrop} 
//         onDelete={handleDelete}
//         resetTrigger={resetTrigger}
//         colorElementsData={colorElementsData}
//         setColorElementsData={setColorElementsData}
//       />
//       <ColorSchemaGroup 
//         onReset={handleGlobalReset} 
//         resetTrigger={resetTrigger}
//         colorSettingsData={colorSettingsData}
//         colorElementsData={colorElementsData}
//       />
//     </div>
//   );
// };

// export default ColorContainer;



// ****************************************TEST CODE FOR SOME UPDATES IN COPY AND DOWNLOAD*********************************
//*************************************************************************************************************************



import { useState, useRef } from 'react';
import ColorSchemaGroup from './ColorSchemaGroup';
import ColorSchemaElements from './ColorSchemaElements';
import ColorSchemaGenerator from './ColorSchemaGenerator';

const ColorContainer = ({ schemaType, setSchemaType }) => {
  const [droppedElements, setDroppedElements] = useState([]);
  const [resetTrigger, setResetTrigger] = useState(0);
  const [colorSettingsData, setColorSettingsData] = useState({
    colorSchemaName: "Color Scheme Group",
    colorSchemeId: "color_schemes",
    backgroundSolid: "",
    backgroundGradient: "",
    textColor: "",
    primaryButton: "",
    onPrimaryButton: "",
    primaryButtonBorder: "",
    secondaryButton: "",
    onSecondaryButton: "",
    secondaryButtonBorder: "",
    iconsColor: "",
    linkColor: ""
  });
  const [colorElementsData, setColorElementsData] = useState({
    droppedElements: [],
    nestedFields: {},
    fieldValues: {}
  });

  const elementsRef = useRef(null);

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
      colorSchemeId: "color_schemes",
      backgroundSolid: "",
      backgroundGradient: "",
      textColor: "",
      primaryButton: "",
      onPrimaryButton: "",
      primaryButtonBorder: "",
      secondaryButton: "",
      onSecondaryButton: "",
      secondaryButtonBorder: "",
      iconsColor: "",
      linkColor: ""
    });
    setColorElementsData({
      droppedElements: [],
      nestedFields: {},
      fieldValues: {}
    });
  };

  return (
    <div className="flex flex-row gap-x-2 h-[85%] text-white">
      <ColorSchemaGenerator 
        resetTrigger={resetTrigger} 
        colorSettingsData={colorSettingsData}
        setColorSettingsData={setColorSettingsData}
        schemaType={schemaType}
        setSchemaType={setSchemaType}
        colorElementsData={colorElementsData} // Pass this prop
      />
      <ColorSchemaElements 
        droppedElements={droppedElements} 
        onDrop={handleDrop} 
        onDelete={handleDelete}
        resetTrigger={resetTrigger}
        colorElementsData={colorElementsData}
        setColorElementsData={setColorElementsData} ref={elementsRef}
      />
      <ColorSchemaGroup 
        onReset={handleGlobalReset} 
        resetTrigger={resetTrigger}
        colorSettingsData={colorSettingsData}
        colorElementsData={colorElementsData} elementsRef={elementsRef}
      />
    </div>
  );
};

export default ColorContainer;