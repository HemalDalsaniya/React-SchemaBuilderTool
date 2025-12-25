// import { useState, useEffect, useCallback } from "react";
// import iconMap from "./iconMap";
// import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
// import { ChevronDownIcon } from '@heroicons/react/20/solid'
// import { SketchPicker } from "react-color";
// import ColorElementsList from "./ColorElementsList";

// const ColorSchemaElements = ({ droppedElements, onDrop, onDelete, resetTrigger, colorElementsData, setColorElementsData }) => {
//   const [collapse, setCollapse] = useState(false);
//   const [nestedCollapse, setNestedCollapse] = useState(false);
//   const [elementsOpen, setElementsOpen] = useState({});
//   const [nestedFields, setNestedFields] = useState(colorElementsData.nestedFields || {});
//   const [expandedNested, setExpandedNested] = useState({});
//   const [fieldValues, setFieldValues] = useState(colorElementsData.fieldValues || {});
//   // const [colorScheme, setColorScheme] = useState(colorElementsData.colorScheme || "");
//   const [colorPalette, setColorPalette] = useState(null);
//   const [colorRgba, setColorRgba] = useState(null);

//   const getColorSchemeElement = () => {
//     return ColorElementsList.find(element => 
//       element.title.toLowerCase() === 'color scheme setting'
//     );
//   };

//   // Function to get all color labels (Color type)
//   const getColorLabels = useCallback(() => {
//     const labels = [];
    
//     // Iterate through all dropped elements to find Headers
//     droppedElements.forEach((element, index) => {
//       if (element.title.toLowerCase() === 'header') {
//         // Check if header has nested color scheme settings
//         if (nestedFields[index]) {
//           nestedFields[index].forEach((nestedElement, nestedIndex) => {
//             if (nestedElement.title.toLowerCase() === 'color scheme setting') {
//               const nestedKey = `${index}-${nestedIndex}`;
//               const nestedValues = fieldValues[nestedKey] || {};
//               // Only include if it's Color type and has a label
//               if (nestedValues.colorScheme === 'Color' && nestedValues.label) {
//                 labels.push(nestedValues.label);
//               }
//             }
//           });
//         }
//       }
//     });
    
//     return labels;
//    }, [droppedElements, nestedFields, fieldValues]);

//   // Function to get all background color labels (Background Color type)
//   const getBackgroundColorLabels = useCallback(() => {
//     const labels = [];
    
//     // Iterate through all dropped elements to find Headers
//     droppedElements.forEach((element, index) => {
//       if (element.title.toLowerCase() === 'header') {
//         // Check if header has nested color scheme settings
//         if (nestedFields[index]) {
//           nestedFields[index].forEach((nestedElement, nestedIndex) => {
//             if (nestedElement.title.toLowerCase() === 'color scheme setting') {
//               const nestedKey = `${index}-${nestedIndex}`;
//               const nestedValues = fieldValues[nestedKey] || {};
//               // Only include if it's Background Color type and has a label
//               if (nestedValues.colorScheme === 'Background Color' && nestedValues.label) {
//                 labels.push(nestedValues.label);
//               }
//             }
//           });
//         }
//       }
//     });
    
//     return labels;
//   }, [droppedElements, nestedFields, fieldValues]);

//   // Update colorElementsData whenever fieldValues, nestedFields, or droppedElements change
//   useEffect(() => {
//     const colorLabels = getColorLabels();
//     const backgroundColorLabels = getBackgroundColorLabels();
    
//     if (setColorElementsData) {
//       setColorElementsData(prev => ({
//         ...prev,
//         droppedElements,
//         nestedFields,
//         fieldValues,
//         colorLabels, // Color type labels for all dropdowns except Background Gradient
//         backgroundColorLabels // Background Color type labels for Background Gradient only
//       }));
//     }
//   }, [fieldValues, nestedFields, droppedElements, setColorElementsData, getColorLabels, getBackgroundColorLabels]);

//   // Reset all fields when resetTrigger changes
//   useEffect(() => {
//     setElementsOpen({});
//     setNestedFields({});
//     setExpandedNested({});
//     setFieldValues({});
//     setColorPalette(null);
//     setColorRgba(null);
    
//     if (setColorElementsData) {
//       setColorElementsData({
//         droppedElements: [],
//         nestedFields: {},
//         fieldValues: {},
//         colorLabels: [],
//         backgroundColorLabels: []
//       });
//     }
//   }, [resetTrigger, setColorElementsData]);

//   // Initialize field values when elements are added
//   useEffect(() => {
//     const newValues = { ...fieldValues };
//      let hasChanges = false;
    
//     // Handle main elements
//     droppedElements.forEach((el, index) => {
//       if (!newValues[index]) {
//         newValues[index] = {
//           label: '',
//           id: '',
//           ...newValues[index]
//         };
//         hasChanges = true;
//       }
//     });
    
//     // Handle nested elements
//     Object.keys(nestedFields).forEach(parentIndex => {
//       nestedFields[parentIndex].forEach((el, nestedIndex) => {
//         const key = `${parentIndex}-${nestedIndex}`;
//         if (!newValues[key]) {
//           newValues[key] = {
//             label: '',
//             id: '',
//             colorScheme: 'Color',
//             colorPalette: '#ffffff',
//             colorRgba: 'rgba(255,255,255,1)',
//             ...newValues[key]
//           };
//            hasChanges = true;
//         }
//       });
//     });
    
//    // Only update if there are actual changes to avoid infinite loops
//     if (hasChanges) {
//       setFieldValues(newValues);
//     }
//   }, [droppedElements, nestedFields, fieldValues]); 

//   const handleDrop = (e, targetIndex = null) => {
//     e.preventDefault();
//     e.stopPropagation(); 
//     const data = e.dataTransfer.getData('text/plain');
//     if (!data) return;  
    
//     const element = JSON.parse(data);
//     const newElement = {
//       ...element,
//       icon: iconMap[element.iconType] 
//     };    
    
//     if (targetIndex !== null && element.title.toLowerCase() !== 'block') {
//       setNestedFields(prev => ({
//         ...prev,
//         [targetIndex]: [...(prev[targetIndex] || []), newElement]
//       }));
//     } else if (targetIndex === null) {
//       // If it's a Header element, automatically add a Color Scheme Setting as nested
//       if (element.title.toLowerCase() === 'header') {
//         const colorSchemeElement = getColorSchemeElement();
        
//         if (!colorSchemeElement) {
//           console.error("Color Scheme Setting element not found in ColorElementsList");
//           return;
//         }  
        
//         // Add the header element first
//         onDrop(newElement);   
        
//         // Get the index of the newly added header
//         const headerIndex = droppedElements.length;      
        
//         // Add the color scheme setting as a nested element of the header
//         setTimeout(() => {
//           setNestedFields(prev => ({
//             ...prev,
//             [headerIndex]: [{
//               ...colorSchemeElement,
//               icon: iconMap[colorSchemeElement.iconType] || colorSchemeElement.icon
//             }]
//           }));
//         }, 0);
//       } else {
//         onDrop(newElement);
//       }
//     }
//   };

//   const handleDragOver = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     e.dataTransfer.dropEffect = 'copy';
//   };

//   const toggleElement = (index, isNested = false, parentIndex = null) => {
//     if (isNested) {
//       setExpandedNested(prev => ({
//         ...prev,
//         [parentIndex]: {
//           ...(prev[parentIndex] || {}),
//           [index]: !prev[parentIndex]?.[index]
//         }
//       })); 
//       setNestedCollapse(!nestedCollapse);
//     } else {
//       setElementsOpen(prev => ({
//         ...prev,
//         [index]: !prev[index]
//       })); 
//       setCollapse(!collapse);      
//     }
//   };

//   const handleDelete = (index, isNested = false, parentIndex = null) => {
//     if (isNested) {
//       // Delete nested element
//       setNestedFields(prev => {
//         const updatedNestedFields = {...prev};
//         updatedNestedFields[parentIndex] = prev[parentIndex].filter((_, i) => i !== index);
//         return updatedNestedFields;
//       });    
//       // Clean up field values for the nested element
//       setFieldValues(prev => {
//         const newValues = {...prev};
//         const nestedKey = `${parentIndex}-${index}`;
//         delete newValues[nestedKey];
//         return newValues;
//       });
//     } else {
//       // Delete main element
//       onDelete(index);    
//       // Clean up all data associated with the deleted element
//       setFieldValues(prev => {
//         const newValues = {...prev};    
//         // Delete the main element's field values
//         delete newValues[index];   
//         // Delete all nested field values for this element
//         Object.keys(prev).forEach(key => {
//           if (key.startsWith(`${index}-`)) {
//             delete newValues[key];
//           }
//         });    
//         // Reindex only the main elements that come after the deleted one
//         Object.keys(prev).forEach(key => {
//           // Handle main element keys (numeric)
//           if (/^\d+$/.test(key)) {
//             const keyNum = parseInt(key);
//             if (keyNum > index && !newValues[keyNum - 1]) {
//               newValues[keyNum - 1] = prev[key];
//               delete newValues[key];
//             }
//           }
//           // Handle nested element keys (e.g., "0-1", "1-2")
//           else if (key.includes('-')) {
//             const [parentIdx, nestedIdx] = key.split('-').map(Number);        
//             // If the parent index is greater than the deleted index, adjust it
//             if (parentIdx > index && !newValues[`${parentIdx - 1}-${nestedIdx}`]) {
//               newValues[`${parentIdx - 1}-${nestedIdx}`] = prev[key];
//               delete newValues[key];
//             }
//           }
//         });      
//         return newValues;
//       });
//       // Clean up and reindex nested fields
//       setNestedFields(prev => {
//         const newNested = {};      
//         Object.keys(prev).forEach(key => {
//           const parentIdx = parseInt(key);      
//           if (parentIdx === index) {
//             return;
//           } else if (parentIdx > index) {
//             // Adjust parent index for elements after the deleted one
//             newNested[parentIdx - 1] = prev[key];
//           } else {
//             // Keep elements before the deleted one
//             newNested[key] = prev[key];
//           }
//         });      
//         return newNested;
//       }); 
//       // Clean up and reindex expanded states
//       setElementsOpen(prev => {
//         const newOpen = {};      
//         Object.keys(prev).forEach(key => {
//           const keyNum = parseInt(key);     
//           if (keyNum === index) {
//             return;
//           } else if (keyNum > index) {
//             // Adjust index for elements after the deleted one
//             newOpen[keyNum - 1] = prev[key];
//           } else {
//             // Keep elements before the deleted one
//             newOpen[key] = prev[key];
//           }
//         });      
//         return newOpen;
//       });  
//       // Clean up and reindex expanded nested states
//       setExpandedNested(prev => {
//         const newExpanded = {};      
//         Object.keys(prev).forEach(key => {
//           const parentIdx = parseInt(key);        
//           if (parentIdx === index) {
//             return;
//           } else if (parentIdx > index) {
//             // Adjust parent index for elements after the deleted one
//             newExpanded[parentIdx - 1] = prev[key];
//           } else {
//             // Keep elements before the deleted one
//             newExpanded[key] = prev[key];
//           }
//         });      
//         return newExpanded;
//       });
//     }
//   };

//   const handleCopy = (index, isNested = false, parentIndex = null) => {
//     if (isNested) {
//       // Copy nested element with its field values
//       setNestedFields(prev => {
//         const newNestedFields = {...prev};
//         const originalElement = prev[parentIndex][index];
//         const newElement = {...originalElement,
//           icon: iconMap[originalElement.iconType] || originalElement.icon
//         };      
//         newNestedFields[parentIndex] = [...prev[parentIndex], newElement];
        
//         // Copy field values for the nested element
//         setFieldValues(prevValues => {
//           const originalKey = `${parentIndex}-${index}`;
//           const newKey = `${parentIndex}-${prev[parentIndex].length}`; // New index will be the last one        
//           return {
//             ...prevValues,
//             [newKey]: {...prevValues[originalKey]}
//           };
//         });      
//         return newNestedFields;
//       });
//     } else {
//       // Copy the main element
//       const newElement = {...droppedElements[index],
//         icon: iconMap[droppedElements[index].iconType] || droppedElements[index].icon
//       };    
//       // Copy the nested fields if they exist
//       const nestedFieldsCopy = nestedFields[index] 
//         ? nestedFields[index].map(el => ({
//             ...el,
//             icon: iconMap[el.iconType] || el.icon
//           }))
//         : [];     
//       // Add the new element to the dropped elements
//       const newIndex = droppedElements.length;
//       onDrop(newElement);    
//       // Update nested fields for the new copy
//       setNestedFields(prev => ({
//         ...prev,
//         [newIndex]: nestedFieldsCopy
//       }));  
//       // Copy all field values including nested ones
//       const newFieldValues = {};    
//       // Copy main field values
//       if (fieldValues[index]) {
//         newFieldValues[newIndex] = {...fieldValues[index]};
//       }    
//       // Copy nested field values if they exist
//       if (nestedFields[index]) {
//         nestedFields[index].forEach((_, nestedIndex) => {
//           const originalKey = `${index}-${nestedIndex}`;
//           const newKey = `${newIndex}-${nestedIndex}`;        
//           if (fieldValues[originalKey]) {
//             newFieldValues[newKey] = {...fieldValues[originalKey]};
//           }
//         });
//       }    
//       // Update field values with both main and nested copies
//       setFieldValues(prev => ({
//         ...prev,
//         ...newFieldValues
//       }));
//     }
//   };

//   const handleFieldChange = (index, field, value, syncField = null) => {
//     setFieldValues(prev => {
//       const newValues = {
//         ...prev,
//         [index]: {
//           ...prev[index],
//           [field]: value
//         }
//       };      
      
//       if (syncField) {
//         newValues[index][syncField] = value;
//       }   
      
//       return newValues;
//     });
//   };

//   const toggleColorPicker = (fieldIndex, pickerType) => {
//     const pickerKey = `${fieldIndex}-${pickerType}`;
//     if (pickerType === 'colorPalette') {
//       if (colorPalette === pickerKey) {
//         setColorPalette(null);
//       } else {
//         setColorPalette(pickerKey);
//         setColorRgba(null);
//       }
//     } else if (pickerType === 'colorRgba') {
//       if (colorRgba === pickerKey) {
//         setColorRgba(null);
//       } else {
//         setColorRgba(pickerKey);
//         setColorPalette(null);
//       }
//     }
//   };

//   const addOptions = (parentIndex) => {
//     const colorSchemeElement = getColorSchemeElement();
    
//     if (!colorSchemeElement) {
//       console.error("Color Scheme Setting element not found in ColorElementsList");
//       return;
//     }
    
//     setNestedFields(prev => ({
//       ...prev,
//       [parentIndex]: [...(prev[parentIndex] || []), {
//         ...colorSchemeElement,
//         icon: iconMap[colorSchemeElement.iconType] || colorSchemeElement.icon
//       }]
//     }));
//   };

//   const renderInputFields = (element, index) => {
//     const type = element.title.toLowerCase();
//     const values = fieldValues[index] || {};
    
//     switch(type) {    
//       case 'header':
//         return (
//           <div>
//             <label>Content <span className="text-red-500">*</span></label>
//             <input 
//               placeholder="Enter Content"
//               value={values.content || ''}
//               onChange={(e) => handleFieldChange(index, 'content', e.target.value)}
//               className="bg-stone-700 h-12 p-3 w-full" 
//             />
//           </div>
//         );     
//       case 'color scheme setting':
//         return (
//           <>
//             <Menu as="div" className="relative flex bg-stone-700 h-12 p-3 rounded cursor-pointer mb-2">
//               <MenuButton className="flex justify-between items-center w-full text-white focus:outline-none focus:ring-0">
//                 {values.colorScheme || "Color"}
//                 <ChevronDownIcon aria-hidden="true" className="-mr-1 size-6 text-white ml-2" />
//               </MenuButton>
//               <MenuItems className="absolute w-full top-13 left-0 z-10 rounded bg-stone-700 text-white focus:outline-none focus:ring-0">
//                 {["Color", "Background Color"].map((item) => (
//                   <MenuItem key={item}>
//                     {({ focus }) => (
//                       <div
//                         onClick={() => handleFieldChange(index, 'colorScheme', item)}
//                         className={`block px-4 py-2 cursor-pointer ${focus ? 'bg-white text-stone-700' : ''}`}>
//                         {item}
//                       </div>
//                     )}
//                   </MenuItem>
//                 ))}
//               </MenuItems>
//             </Menu>           
//             <label>Label <span className="text-red-500">*</span></label>
//             <input 
//               placeholder="Enter Label"
//               type="text" 
//               value={values.label || ''}
//               onChange={(e) => handleFieldChange(index, 'label', e.target.value, 'id')}
//               className="bg-stone-700 h-12 p-3 w-full required" 
//             />           
//             <label>ID <span className="text-red-500">*</span></label>
//             <input 
//               placeholder="Enter ID"
//               type="text" 
//               value={values.id || ''}
//               onChange={(e) => handleFieldChange(index, 'id', e.target.value)}
//               className="bg-stone-700 h-12 p-3 w-full required" 
//             />            
//             <label>Info</label>
//             <textarea 
//               placeholder="Enter Info Value"
//               value={values.info || ''}
//               onChange={(e) => handleFieldChange(index, 'info', e.target.value)}
//               className="bg-stone-700 h-12 p-3 w-full" 
//               style={{'scrollbarWidth': 'none'}}
//             />           
//             {values.colorScheme === "Background Color" ? (
//               <div className="mb-4 flex gap-4 w-full relative">
//                 <div style={{ 
//                   backgroundColor: values.colorRgba || 'rgba(255,255,255,1)',
//                   backgroundImage: values.colorRgba && values.colorRgba.includes('gradient') ? values.colorRgba : 'none'
//                 }}
//                   className="w-12 h-12 cursor-pointer rounded border border-gray-300 z-0" 
//                   onClick={() => toggleColorPicker(index, 'colorRgba')}
//                 ></div>
//                 <input type="text" 
//                   value={values.colorRgba || 'rgba(255,255,255,1)'}
//                   onChange={(e) => handleFieldChange(index, 'colorRgba', e.target.value)}
//                   className="bg-stone-700 h-12 p-3 w-full text-white" 
//                 />
//                 {colorRgba === `${index}-colorRgba` && (
//                   // <div className="absolute top-full left-0 mt-2 text-black z-50">   
//                   <div className="absolute z-[9999] text-black" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -90%)' }}>    
//                     <SketchPicker width={240} className="text-center font-semibold text-md"
//                       color={values.colorRgba || 'rgba(255,255,255,1)'} 
//                       onChangeComplete={(color) => {
//                         handleFieldChange(index, 'colorRgba', `rgba(${color.rgb.r},${color.rgb.g},${color.rgb.b},${color.rgb.a || 1})`);
//                         setColorRgba(null);
//                       }}
//                       presetColors={[
//                         '#D0021B', '#F5A623', '#F8E71C', '#8B572A',
//                         '#7ED321', '#417505', '#BD10E0', '#9013FE',
//                         '#4A90E2', '#50E3C2', '#B8E986', '#000000',
//                         '#4A4A4A', '#9B9B9B', '#FFFFFF'
//                       ]} 
//                     />
//                   </div>   
//                 )}  
//               </div>
//             ) : (
//               <div className="mb-4 flex gap-4 w-full relative">
//                 <div 
//                   style={{ backgroundColor: values.colorPalette || '#ffffff' }}
//                   className="w-12 h-12 cursor-pointer rounded border border-gray-300 z-0" 
//                   onClick={() => toggleColorPicker(index, 'colorPalette')}
//                 ></div>
//                 <input 
//                   type="text" 
//                   value={values.colorPalette || '#ffffff'}
//                   onChange={(e) => handleFieldChange(index, 'colorPalette', e.target.value)}
//                   className="bg-stone-700 h-12 p-3 w-full text-white" 
//                 />
//                 {colorPalette === `${index}-colorPalette` && (  
//                   <div className="absolute z-50 text-black" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -90%)' }}>    
//                     <SketchPicker  width={240} className="text-center font-semibold text-md"
//                       color={values.colorPalette || '#ffffff'} 
//                       onChangeComplete={(color) => {
//                         handleFieldChange(index, 'colorPalette', color.hex);
//                         setColorPalette(null);
//                       }}
//                       presetColors={[
//                         '#D0021B', '#F5A623', '#F8E71C', '#8B572A',
//                         '#7ED321', '#417505', '#BD10E0', '#9013FE',
//                         '#4A90E2', '#50E3C2', '#B8E986', '#000000',
//                         '#4A4A4A', '#9B9B9B', '#FFFFFF'
//                       ]} 
//                     />
//                   </div>   
//                 )}  
//               </div>
//             )}
//           </>
//         );    
//     }
//   };

//   const renderElement = (element, index, isNested = false, parentIndex = null) => {
//     const isExpanded = isNested 
//       ? expandedNested[parentIndex]?.[index] 
//       : elementsOpen[index];    
//     const currentValues = fieldValues[isNested ? `${parentIndex}-${index}` : index] || {};
//     const displayTitle = element.title.toLowerCase() === 'header' 
//       ? currentValues.content
//       : currentValues.label;

//     return (
//       <div key={isNested ? `${parentIndex}-${index}` : index} className="basis-6/12 w-full overflow-hidden">
//         {/* <div className="bg-stone-800 py-1 mt-2 px-4 flex items-center group "> */}
//         <div className={`bg-stone-800 py-1 ${isNested ? "mb-2" : "mt-2"} px-4 flex items-center group `}>

//           <div className="bg-stone-900 p-1 rounded-sm mr-3">
//             <span className="text-light-bg text-xl">{element.icon}</span>
//           </div>
//           <div className="flex-1 ms-2">
//             <h4 className="font-semibold text-lg">{displayTitle}</h4>
//           </div>
//           <div className="flex justify-between space-x-5 items-center">
//             <h4 className="font-semibold text-lg">{element.title}</h4>
//             <button aria-label="Delete"
//               onClick={() => handleDelete(index, isNested, parentIndex)}
//               className="text-white p-[8px] rounded-full hover:bg-stone-600 hover:bg-opacity-[0.08] cursor-pointer"
//             >
//               <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
//                 <path fill="none" d="M0 0h24v24H0z"></path>
//                 <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path>
//               </svg>
//             </button>           
//             <button aria-label="Copy"
//               onClick={() => handleCopy(index, isNested, parentIndex)}
//               className="text-white p-[8px] rounded-full hover:bg-stone-600 hover:bg-opacity-[0.08] cursor-pointer"
//             >
//               <svg stroke="currentColor" fill="currentColor" viewBox="0 0 512 512" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
//                 <rect width="336" height="336" x="128" y="128" fill="none" strokeLinejoin="round" strokeWidth="32" rx="57" ry="57"></rect>
//                 <path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="m383.5 128 .5-24a56.16 56.16 0 0 0-56-56H112a64.19 64.19 0 0 0-64 64v216a56.16 56.16 0 0 0 56 56h24"></path>
//               </svg>
//             </button>            
//             <button aria-label="Collapse"
//               onClick={() => toggleElement(index, isNested, parentIndex)}
//               className={`text-white p-[8px] rounded-full hover:bg-stone-600 hover:bg-opacity-[0.08] cursor-pointer transition-transform duration-200 ${collapse || nestedCollapse ? 'rotate-180':'rotate-0'}  `}
//             >
//               <svg stroke="currentColor" fill="currentColor" viewBox="0 0 512 512" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
//                 <path d="M256 294.1L383 167c9.4-9.4 24.6-9.4 33.9 0s9.3 24.6 0 34L273 345c-9.1 9.1-23.7 9.3-33.1.7L95 201.1c-4.7-4.7-7-10.9-7-17s2.3-12.3 7-17c9.4-9.4 24.6-9.4 33.9 0l127.1 127z"></path>
//               </svg>
//             </button>
//           </div>          
//         </div>     
//         {isExpanded && (
//           <div className="w-full bg-stone-950 py-4 px-4">
//             {renderInputFields(element, isNested ? `${parentIndex}-${index}` : index)}
//           </div>
//         )}
//       </div>
//     );
//   };    

//   return (
//     <div className="bg-stone-700 basis-6/12 rounded-lg w-full overflow-hidden"
//       onDragOver={handleDragOver}
//       onDrop={handleDrop}>
//       <div className="m-5 h-[95%] border-1 border-black border-dashed rounded">
//         {droppedElements.length === 0 ? (
//           <p className="p-3 font-bold text-center text-xl">Drag fields here from left to right</p>
//         ) : (
//           <div className="p-3 overflow-y-auto h-full" style={{"scrollbarWidth":"none"}}>
//             {droppedElements.map((el, index) => (
//               <div key={index}>
//                 {renderElement(el, index)} 

//                <div className="bg-stone-950 px-4">
//                {elementsOpen[index] && (
//                   <>
//                     {(nestedFields[index] || []).map((nestedEl, nestedIndex) =>
//                       renderElement(nestedEl, nestedIndex, true, index)
//                     )}
//                     {/* Always show Add Option button */}
//                     <button onClick={() => addOptions(index)}
//                       className="flex w-full py-2 text-lg justify-center items-center border-1 border-dotted border-gray-300 cursor-pointer"
//                     > Add Option + </button>
//                   </>
//                )}
//                </div>   

//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ColorSchemaElements


// ****************************************TEST CODE FOR SOME UPDATES IN COPY AND DOWNLOAD*********************************
//*************************************************************************************************************************



import { useState, useEffect, useCallback, forwardRef, useImperativeHandle } from "react";
import iconMap from "./iconMap";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { SketchPicker } from "react-color";
import ColorElementsList from "./ColorElementsList";

const ColorSchemaElements = forwardRef( ({ droppedElements, onDrop, onDelete, resetTrigger, colorElementsData, setColorElementsData }, ref) => {
  const [collapse, setCollapse] = useState(false);
  const [nestedCollapse, setNestedCollapse] = useState(false);
  const [elementsOpen, setElementsOpen] = useState({});
  const [nestedFields, setNestedFields] = useState(colorElementsData.nestedFields || {});
  const [expandedNested, setExpandedNested] = useState({});
  const [fieldValues, setFieldValues] = useState(colorElementsData.fieldValues || {});
  const [colorPalette, setColorPalette] = useState(null);
  const [colorRgba, setColorRgba] = useState(null);

      /** ---------------- VALIDATION ---------------- */
  const validateRequiredFields = useCallback(() => {
    const errors = [];

    droppedElements.forEach((el, index) => {
      const values = fieldValues[index] || {};
  
        if (!values.content?.trim()) {
          errors.push(`Validation failed in ${el.title} Element. Unable to update the color schema.`);
        }
        (nestedFields[index] || []).forEach((nestedEl, nIdx) => {
          const nestedKey = `${index}-${nIdx}`;
          const nestedValues = fieldValues[nestedKey] || {};

          if (!nestedValues.label?.trim() || !nestedValues.id?.trim()) {
            errors.push(`Validation failed in Color Scheme Element. Unable to update the color schema.`);
          }
        });

    });

    return {
      isValid: errors.length === 0,
      errors
    };
  }, [droppedElements, fieldValues, nestedFields]); 

  /** expose validation to parent */
  useImperativeHandle(ref, () => ({
    validate: validateRequiredFields
  }));
 
  const getColorSchemeElement = () => {
    return ColorElementsList.find(element => 
      element.title.toLowerCase() === 'color scheme setting'
    );
  };

  // Function to get all color labels (Color type)
  const getColorLabels = useCallback(() => {
    const labels = [];
    
    // Iterate through all dropped elements to find Headers
    droppedElements.forEach((element, index) => {
      if (element.title.toLowerCase() === 'header') {
        // Check if header has nested color scheme settings
        if (nestedFields[index]) {
          nestedFields[index].forEach((nestedElement, nestedIndex) => {
            if (nestedElement.title.toLowerCase() === 'color scheme setting') {
              const nestedKey = `${index}-${nestedIndex}`;
              const nestedValues = fieldValues[nestedKey] || {};
              // Only include if it's Color type and has a label
              if (nestedValues.colorScheme === 'Color' && nestedValues.label) {
                labels.push(nestedValues.label);
              }
            }
          });
        }
      }
    });
    
    return labels;
   }, [droppedElements, nestedFields, fieldValues]);

  // Function to get all background color labels (Background Color type)
  const getBackgroundColorLabels = useCallback(() => {
    const labels = [];
    
    // Iterate through all dropped elements to find Headers
    droppedElements.forEach((element, index) => {
      if (element.title.toLowerCase() === 'header') {
        // Check if header has nested color scheme settings
        if (nestedFields[index]) {
          nestedFields[index].forEach((nestedElement, nestedIndex) => {
            if (nestedElement.title.toLowerCase() === 'color scheme setting') {
              const nestedKey = `${index}-${nestedIndex}`;
              const nestedValues = fieldValues[nestedKey] || {};
              // Only include if it's Background Color type and has a label
              if (nestedValues.colorScheme === 'Background Color' && nestedValues.label) {
                labels.push(nestedValues.label);
              }
            }
          });
        }
      }
    });
    
    return labels;
  }, [droppedElements, nestedFields, fieldValues]);

  // Update colorElementsData whenever fieldValues, nestedFields, or droppedElements change
  useEffect(() => {
    const colorLabels = getColorLabels();
    const backgroundColorLabels = getBackgroundColorLabels();
    
    if (setColorElementsData) {
      setColorElementsData(prev => ({
        ...prev,
        droppedElements,
        nestedFields,
        fieldValues,
        colorLabels, // Color type labels for all dropdowns except Background Gradient
        backgroundColorLabels // Background Color type labels for Background Gradient only
      }));
    }
  }, [fieldValues, nestedFields, droppedElements, setColorElementsData, getColorLabels, getBackgroundColorLabels]);

  // Reset all fields when resetTrigger changes
  useEffect(() => {
    setElementsOpen({});
    setNestedFields({});
    setExpandedNested({});
    setFieldValues({});
    setColorPalette(null);
    setColorRgba(null);
    
    if (setColorElementsData) {
      setColorElementsData({
        droppedElements: [],
        nestedFields: {},
        fieldValues: {},
        colorLabels: [],
        backgroundColorLabels: []
      });
    }
  }, [resetTrigger, setColorElementsData]);

  // Initialize field values when elements are added
  useEffect(() => {
    const newValues = { ...fieldValues };
     let hasChanges = false;
    
    // Handle main elements
    droppedElements.forEach((el, index) => {
      if (!newValues[index]) {
        newValues[index] = {
          label: '',
          id: '',
          ...newValues[index]
        };
        hasChanges = true;
      }
    });
    
    // Handle nested elements
    Object.keys(nestedFields).forEach(parentIndex => {
      nestedFields[parentIndex].forEach((el, nestedIndex) => {
        const key = `${parentIndex}-${nestedIndex}`;
        if (!newValues[key]) {
          newValues[key] = {
            label: '',
            id: '',
            colorScheme: 'Color',
            colorPalette: '#ffffff',
            colorRgba: 'rgba(255,255,255,1)',
            ...newValues[key]
          };
           hasChanges = true;
        }
      });
    });
    
   // Only update if there are actual changes to avoid infinite loops
    if (hasChanges) {
      setFieldValues(newValues);
    }
  }, [droppedElements, nestedFields, fieldValues]); 

  const handleDrop = (e, targetIndex = null) => {
    e.preventDefault();
    e.stopPropagation(); 
    const data = e.dataTransfer.getData('text/plain');
    if (!data) return;  
    
    const element = JSON.parse(data);
    const newElement = {
      ...element,
      icon: iconMap[element.iconType] 
    };    
    
    if (targetIndex !== null && element.title.toLowerCase() !== 'block') {
      setNestedFields(prev => ({
        ...prev,
        [targetIndex]: [...(prev[targetIndex] || []), newElement]
      }));
    } else if (targetIndex === null) {
      // If it's a Header element, automatically add a Color Scheme Setting as nested
      if (element.title.toLowerCase() === 'header') {
        const colorSchemeElement = getColorSchemeElement();
        
        if (!colorSchemeElement) {
          console.error("Color Scheme Setting element not found in ColorElementsList");
          return;
        }  
        
        // Add the header element first
        onDrop(newElement);   
        
        // Get the index of the newly added header
        const headerIndex = droppedElements.length;      
        
        // Add the color scheme setting as a nested element of the header
        setTimeout(() => {
          setNestedFields(prev => ({
            ...prev,
            [headerIndex]: [{
              ...colorSchemeElement,
              icon: iconMap[colorSchemeElement.iconType] || colorSchemeElement.icon
            }]
          }));
        }, 0);
      } else {
        onDrop(newElement);
      }
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = 'copy';
  };

  const toggleElement = (index, isNested = false, parentIndex = null) => {
    if (isNested) {
      setExpandedNested(prev => ({
        ...prev,
        [parentIndex]: {
          ...(prev[parentIndex] || {}),
          [index]: !prev[parentIndex]?.[index]
        }
      })); 
      setNestedCollapse(!nestedCollapse);
    } else {
      setElementsOpen(prev => ({
        ...prev,
        [index]: !prev[index]
      })); 
      setCollapse(!collapse);      
    }
  };

  const handleDelete = (index, isNested = false, parentIndex = null) => {
    if (isNested) {
      // Delete nested element
      setNestedFields(prev => {
        const updatedNestedFields = {...prev};
        updatedNestedFields[parentIndex] = prev[parentIndex].filter((_, i) => i !== index);
        return updatedNestedFields;
      });    
      // Clean up field values for the nested element
      setFieldValues(prev => {
        const newValues = {...prev};
        const nestedKey = `${parentIndex}-${index}`;
        delete newValues[nestedKey];
        return newValues;
      });
    } else {
      // Delete main element
      onDelete(index);    
      // Clean up all data associated with the deleted element
      setFieldValues(prev => {
        const newValues = {...prev};    
        // Delete the main element's field values
        delete newValues[index];   
        // Delete all nested field values for this element
        Object.keys(prev).forEach(key => {
          if (key.startsWith(`${index}-`)) {
            delete newValues[key];
          }
        });    
        // Reindex only the main elements that come after the deleted one
        Object.keys(prev).forEach(key => {
          // Handle main element keys (numeric)
          if (/^\d+$/.test(key)) {
            const keyNum = parseInt(key);
            if (keyNum > index && !newValues[keyNum - 1]) {
              newValues[keyNum - 1] = prev[key];
              delete newValues[key];
            }
          }
          // Handle nested element keys (e.g., "0-1", "1-2")
          else if (key.includes('-')) {
            const [parentIdx, nestedIdx] = key.split('-').map(Number);        
            // If the parent index is greater than the deleted index, adjust it
            if (parentIdx > index && !newValues[`${parentIdx - 1}-${nestedIdx}`]) {
              newValues[`${parentIdx - 1}-${nestedIdx}`] = prev[key];
              delete newValues[key];
            }
          }
        });      
        return newValues;
      });
      // Clean up and reindex nested fields
      setNestedFields(prev => {
        const newNested = {};      
        Object.keys(prev).forEach(key => {
          const parentIdx = parseInt(key);      
          if (parentIdx === index) {
            return;
          } else if (parentIdx > index) {
            // Adjust parent index for elements after the deleted one
            newNested[parentIdx - 1] = prev[key];
          } else {
            // Keep elements before the deleted one
            newNested[key] = prev[key];
          }
        });      
        return newNested;
      }); 
      // Clean up and reindex expanded states
      setElementsOpen(prev => {
        const newOpen = {};      
        Object.keys(prev).forEach(key => {
          const keyNum = parseInt(key);     
          if (keyNum === index) {
            return;
          } else if (keyNum > index) {
            // Adjust index for elements after the deleted one
            newOpen[keyNum - 1] = prev[key];
          } else {
            // Keep elements before the deleted one
            newOpen[key] = prev[key];
          }
        });      
        return newOpen;
      });  
      // Clean up and reindex expanded nested states
      setExpandedNested(prev => {
        const newExpanded = {};      
        Object.keys(prev).forEach(key => {
          const parentIdx = parseInt(key);        
          if (parentIdx === index) {
            return;
          } else if (parentIdx > index) {
            // Adjust parent index for elements after the deleted one
            newExpanded[parentIdx - 1] = prev[key];
          } else {
            // Keep elements before the deleted one
            newExpanded[key] = prev[key];
          }
        });      
        return newExpanded;
      });
    }
  };

  const handleCopy = (index, isNested = false, parentIndex = null) => {
    if (isNested) {
      // Copy nested element with its field values
      setNestedFields(prev => {
        const newNestedFields = {...prev};
        const originalElement = prev[parentIndex][index];
        const newElement = {...originalElement,
          icon: iconMap[originalElement.iconType] || originalElement.icon
        };      
        newNestedFields[parentIndex] = [...prev[parentIndex], newElement];
        
        // Copy field values for the nested element
        setFieldValues(prevValues => {
          const originalKey = `${parentIndex}-${index}`;
          const newKey = `${parentIndex}-${prev[parentIndex].length}`; // New index will be the last one        
          return {
            ...prevValues,
            [newKey]: {...prevValues[originalKey]}
          };
        });      
        return newNestedFields;
      });
    } else {
      // Copy the main element
      const newElement = {...droppedElements[index],
        icon: iconMap[droppedElements[index].iconType] || droppedElements[index].icon
      };    
      // Copy the nested fields if they exist
      const nestedFieldsCopy = nestedFields[index] 
        ? nestedFields[index].map(el => ({
            ...el,
            icon: iconMap[el.iconType] || el.icon
          }))
        : [];     
      // Add the new element to the dropped elements
      const newIndex = droppedElements.length;
      onDrop(newElement);    
      // Update nested fields for the new copy
      setNestedFields(prev => ({
        ...prev,
        [newIndex]: nestedFieldsCopy
      }));  
      // Copy all field values including nested ones
      const newFieldValues = {};    
      // Copy main field values
      if (fieldValues[index]) {
        newFieldValues[newIndex] = {...fieldValues[index]};
      }    
      // Copy nested field values if they exist
      if (nestedFields[index]) {
        nestedFields[index].forEach((_, nestedIndex) => {
          const originalKey = `${index}-${nestedIndex}`;
          const newKey = `${newIndex}-${nestedIndex}`;        
          if (fieldValues[originalKey]) {
            newFieldValues[newKey] = {...fieldValues[originalKey]};
          }
        });
      }    
      // Update field values with both main and nested copies
      setFieldValues(prev => ({
        ...prev,
        ...newFieldValues
      }));
    }
  };

  const handleFieldChange = (index, field, value, syncField = null) => {
    setFieldValues(prev => {
      const newValues = {
        ...prev,
        [index]: {
          ...prev[index],
          [field]: value
        }
      };      
      
      if (syncField) {
        newValues[index][syncField] = value;
      }   
      
      return newValues;
    });
  };

  const toggleColorPicker = (fieldIndex, pickerType) => {
    const pickerKey = `${fieldIndex}-${pickerType}`;
    if (pickerType === 'colorPalette') {
      if (colorPalette === pickerKey) {
        setColorPalette(null);
      } else {
        setColorPalette(pickerKey);
        setColorRgba(null);
      }
    } else if (pickerType === 'colorRgba') {
      if (colorRgba === pickerKey) {
        setColorRgba(null);
      } else {
        setColorRgba(pickerKey);
        setColorPalette(null);
      }
    }
  };

  const addOptions = (parentIndex) => {
    const colorSchemeElement = getColorSchemeElement();
    
    if (!colorSchemeElement) {
      console.error("Color Scheme Setting element not found in ColorElementsList");
      return;
    }
    
    setNestedFields(prev => ({
      ...prev,
      [parentIndex]: [...(prev[parentIndex] || []), {
        ...colorSchemeElement,
        icon: iconMap[colorSchemeElement.iconType] || colorSchemeElement.icon
      }]
    }));
  };

  const renderInputFields = (element, index) => {
    const type = element.title.toLowerCase();
    const values = fieldValues[index] || {};
    
    switch(type) {    
      case 'header':
        return (
          <div>
            <label>Content <span className="text-red-500">*</span></label>
            <input 
              placeholder="Enter Content"
              value={values.content || ''}
              onChange={(e) => handleFieldChange(index, 'content', e.target.value)}
              className="bg-stone-700 h-12 p-3 w-full required" 
            />
          </div>
        );     
      case 'color scheme setting':
        return (
          <>
            <Menu as="div" className="relative flex bg-stone-700 h-12 p-3 rounded cursor-pointer mb-2">
              <MenuButton className="flex justify-between items-center w-full text-white focus:outline-none focus:ring-0">
                {values.colorScheme || "Color"}
                <ChevronDownIcon aria-hidden="true" className="-mr-1 size-6 text-white ml-2" />
              </MenuButton>
              <MenuItems className="absolute w-full top-13 left-0 z-10 rounded bg-stone-700 text-white focus:outline-none focus:ring-0">
                {["Color", "Background Color"].map((item) => (
                  <MenuItem key={item}>
                    {({ focus }) => (
                      <div
                        onClick={() => handleFieldChange(index, 'colorScheme', item)}
                        className={`block px-4 py-2 cursor-pointer ${focus ? 'bg-white text-stone-700' : ''}`}>
                        {item}
                      </div>
                    )}
                  </MenuItem>
                ))}
              </MenuItems>
            </Menu>           
            <label>Label <span className="text-red-500">*</span></label>
            <input 
              placeholder="Enter Label"
              type="text" 
              value={values.label || ''}
              onChange={(e) => handleFieldChange(index, 'label', e.target.value, 'id')}
              className="bg-stone-700 h-12 p-3 w-full required" 
            />           
            <label>ID <span className="text-red-500">*</span></label>
            <input 
              placeholder="Enter ID"
              type="text" 
              value={values.id || ''}
              onChange={(e) => handleFieldChange(index, 'id', e.target.value)}
              className="bg-stone-700 h-12 p-3 w-full required" 
            />            
            <label>Info</label>
            <textarea 
              placeholder="Enter Info Value"
              value={values.info || ''}
              onChange={(e) => handleFieldChange(index, 'info', e.target.value)}
              className="bg-stone-700 h-12 p-3 w-full" 
              style={{'scrollbarWidth': 'none'}}
            />           
            {values.colorScheme === "Background Color" ? (
              <div className="mb-4 flex gap-4 w-full relative">
                <div style={{ 
                  backgroundColor: values.colorRgba || 'rgba(255,255,255,1)',
                  backgroundImage: values.colorRgba && values.colorRgba.includes('gradient') ? values.colorRgba : 'none'
                }}
                  className="w-12 h-12 cursor-pointer rounded border border-gray-300 z-0" 
                  onClick={() => toggleColorPicker(index, 'colorRgba')}
                ></div>
                <input type="text" 
                  value={values.colorRgba || 'rgba(255,255,255,1)'}
                  onChange={(e) => handleFieldChange(index, 'colorRgba', e.target.value)}
                  className="bg-stone-700 h-12 p-3 w-full text-white" 
                />
                {colorRgba === `${index}-colorRgba` && (
                  // <div className="absolute top-full left-0 mt-2 text-black z-50">   
                  <div className="absolute z-[9999] text-black" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -90%)' }}>    
                    <SketchPicker width={240} className="text-center font-semibold text-md"
                      color={values.colorRgba || 'rgba(255,255,255,1)'} 
                      onChangeComplete={(color) => {
                        handleFieldChange(index, 'colorRgba', `rgba(${color.rgb.r},${color.rgb.g},${color.rgb.b},${color.rgb.a || 1})`);
                        setColorRgba(null);
                      }}
                      presetColors={[
                        '#D0021B', '#F5A623', '#F8E71C', '#8B572A',
                        '#7ED321', '#417505', '#BD10E0', '#9013FE',
                        '#4A90E2', '#50E3C2', '#B8E986', '#000000',
                        '#4A4A4A', '#9B9B9B', '#FFFFFF'
                      ]} 
                    />
                  </div>   
                )}  
              </div>
            ) : (
              <div className="mb-4 flex gap-4 w-full relative">
                <div 
                  style={{ backgroundColor: values.colorPalette || '#ffffff' }}
                  className="w-12 h-12 cursor-pointer rounded border border-gray-300 z-0" 
                  onClick={() => toggleColorPicker(index, 'colorPalette')}
                ></div>
                <input 
                  type="text" 
                  value={values.colorPalette || '#ffffff'}
                  onChange={(e) => handleFieldChange(index, 'colorPalette', e.target.value)}
                  className="bg-stone-700 h-12 p-3 w-full text-white" 
                />
                {colorPalette === `${index}-colorPalette` && (  
                  <div className="absolute z-50 text-black" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -90%)' }}>    
                    <SketchPicker  width={240} className="text-center font-semibold text-md"
                      color={values.colorPalette || '#ffffff'} 
                      onChangeComplete={(color) => {
                        handleFieldChange(index, 'colorPalette', color.hex);
                        setColorPalette(null);
                      }}
                      presetColors={[
                        '#D0021B', '#F5A623', '#F8E71C', '#8B572A',
                        '#7ED321', '#417505', '#BD10E0', '#9013FE',
                        '#4A90E2', '#50E3C2', '#B8E986', '#000000',
                        '#4A4A4A', '#9B9B9B', '#FFFFFF'
                      ]} 
                    />
                  </div>   
                )}  
              </div>
            )}
          </>
        );    
    }
  };

  const renderElement = (element, index, isNested = false, parentIndex = null) => {
    const isExpanded = isNested 
      ? expandedNested[parentIndex]?.[index] 
      : elementsOpen[index];    
    const currentValues = fieldValues[isNested ? `${parentIndex}-${index}` : index] || {};
    const displayTitle = element.title.toLowerCase() === 'header' 
      ? currentValues.content
      : currentValues.label;

    return (
      <div key={isNested ? `${parentIndex}-${index}` : index} className="basis-6/12 w-full overflow-hidden">
        {/* <div className="bg-stone-800 py-1 mt-2 px-4 flex items-center group "> */}
        <div className={`bg-stone-800 py-1 ${isNested ? "mb-2" : "mt-2"} px-4 flex items-center group `}>

          <div className="bg-stone-900 p-1 rounded-sm mr-3">
            <span className="text-light-bg text-xl">{element.icon}</span>
          </div>
          <div className="flex-1 ms-2">
            <h4 className="font-semibold text-lg">{displayTitle}</h4>
          </div>
          <div className="flex justify-between space-x-5 items-center">
            <h4 className="font-semibold text-lg">{element.title}</h4>
            <button aria-label="Delete"
              onClick={() => handleDelete(index, isNested, parentIndex)}
              className="text-white p-[8px] rounded-full hover:bg-stone-600 hover:bg-opacity-[0.08] cursor-pointer"
            >
              <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path>
              </svg>
            </button>           
            <button aria-label="Copy"
              onClick={() => handleCopy(index, isNested, parentIndex)}
              className="text-white p-[8px] rounded-full hover:bg-stone-600 hover:bg-opacity-[0.08] cursor-pointer"
            >
              <svg stroke="currentColor" fill="currentColor" viewBox="0 0 512 512" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
                <rect width="336" height="336" x="128" y="128" fill="none" strokeLinejoin="round" strokeWidth="32" rx="57" ry="57"></rect>
                <path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="m383.5 128 .5-24a56.16 56.16 0 0 0-56-56H112a64.19 64.19 0 0 0-64 64v216a56.16 56.16 0 0 0 56 56h24"></path>
              </svg>
            </button>            
            <button aria-label="Collapse"
              onClick={() => toggleElement(index, isNested, parentIndex)}
              className={`text-white p-[8px] rounded-full hover:bg-stone-600 hover:bg-opacity-[0.08] cursor-pointer transition-transform duration-200 ${collapse || nestedCollapse ? 'rotate-180':'rotate-0'}  `}
            >
              <svg stroke="currentColor" fill="currentColor" viewBox="0 0 512 512" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
                <path d="M256 294.1L383 167c9.4-9.4 24.6-9.4 33.9 0s9.3 24.6 0 34L273 345c-9.1 9.1-23.7 9.3-33.1.7L95 201.1c-4.7-4.7-7-10.9-7-17s2.3-12.3 7-17c9.4-9.4 24.6-9.4 33.9 0l127.1 127z"></path>
              </svg>
            </button>
          </div>          
        </div>     
        {isExpanded && (
          <div className="w-full bg-stone-950 py-4 px-4">
            {renderInputFields(element, isNested ? `${parentIndex}-${index}` : index)}
          </div>
        )}
      </div>
    );
  };    

  return (
    <div className="bg-stone-700 basis-6/12 rounded-lg w-full overflow-hidden"
      onDragOver={handleDragOver}
      onDrop={handleDrop}>
      <div className="m-5 h-[95%] border-1 border-black border-dashed rounded">
        {droppedElements.length === 0 ? (
          <p className="p-3 font-bold text-center text-xl">Drag fields here from left to right</p>
        ) : (
          <div className="p-3 overflow-y-auto h-full" style={{"scrollbarWidth":"none"}}>
            {droppedElements.map((el, index) => (
              <div key={index}>
                {renderElement(el, index)} 

               <div className="bg-stone-950 px-4">
               {elementsOpen[index] && (
                  <>
                    {(nestedFields[index] || []).map((nestedEl, nestedIndex) =>
                      renderElement(nestedEl, nestedIndex, true, index)
                    )}
                    {/* Always show Add Option button */}
                    <button onClick={() => addOptions(index)}
                      className="flex w-full py-2 text-lg justify-center items-center border-1 border-dotted border-gray-300 cursor-pointer"
                    > Add Option + </button>
                  </>
               )}
               </div>   

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
});

export default ColorSchemaElements