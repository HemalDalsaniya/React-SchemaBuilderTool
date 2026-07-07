// import { useState, useEffect, useCallback } from "react";
// import iconMap from "./iconMap";
// import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
// import { ChevronDownIcon, XMarkIcon } from '@heroicons/react/20/solid'
// import { SketchPicker } from "react-color";
// const SectionSchemaElements = ({ droppedElements, onDrop, onDelete, resetTrigger, elementsData, setElementsData }) => {
//   const [collapse, setCollapse]= useState(false)
//   const [nestedCollapse, setNestedCollapse] = useState(false)
//   const [elementsOpen, setElementsOpen] = useState({});
//   const [nestedFields, setNestedFields] = useState(elementsData.nestedFields || {});
//   const [expandedNested, setExpandedNested] = useState({});
//   const [fieldValues, setFieldValues] = useState(elementsData.fieldValues || {});
//   const [colorPalette, setColorPalette] = useState(null);
//   const [colorRgba, setColorRgba] = useState(null);
//   // Update elements data when field values change
//   useEffect(() => {
//     if (setElementsData) {
//       setElementsData({
//         droppedElements,
//         nestedFields,
//         fieldValues
//       });
//     }
//   }, [droppedElements, nestedFields, fieldValues, setElementsData])
//   // Reset all fields when resetTrigger changes
//   useEffect(() => {
//     setElementsOpen({});
//     setNestedFields({});
//     setExpandedNested({});
//     setFieldValues({});
//     setColorPalette(false);
//     setColorRgba(false);
//     // Reset elements data in context
//     if (setElementsData) {
//       setElementsData({
//         droppedElements: [],
//         nestedFields: {},
//         fieldValues: {}
//       });
//     }
//   }, [resetTrigger, setElementsData])
// // Initialize field values when elements are added
// useEffect(() => {
//   const newValues = {...fieldValues};
//   let hasChanges = false;  
//   // Handle main elements
//   droppedElements.forEach((el, index) => {
//     if (!newValues[index]) {
//       hasChanges = true;
//       newValues[index] = {
//         label: '',
//         id: '',
//         name: '',
//         type: '',
//         options: ['select', 'radio'].includes(el.title.toLowerCase()) 
//           ? [{ label: '', value: '', group: '' }]
//           : undefined,
//         ...newValues[index]
//       };
//     }
//   });
//   // Handle nested elements
//   Object.keys(nestedFields).forEach(parentIndex => {
//     nestedFields[parentIndex].forEach((el, nestedIndex) => {
//       const key = `${parentIndex}-${nestedIndex}`;
//       if (!newValues[key]) {
//         hasChanges = true;
//         newValues[key] = {
//           label: '',
//           id: '',
//           name: '',
//           type: '',
//           options: ['select', 'radio'].includes(el.title.toLowerCase()) 
//             ? [{ label: '', value: '', group: '' }]
//             : undefined,
//           ...newValues[key]
//         };
//       }
//     });
//   });
//   // Only update if there are changes to avoid infinite loops
//   if (hasChanges) {
//     setFieldValues(newValues);
//   }
// }, [droppedElements, nestedFields, fieldValues]);

// const addOption = useCallback((fieldIndex, isRadio = false) => {
//   setFieldValues(prev => {
//     const newValues = { ...prev };    
//     // Create field if it doesn't exist
//     if (!newValues[fieldIndex]) {
//       newValues[fieldIndex] = {};
//     }
//     // Create the new option
//     const newOption = isRadio 
//       ? { label: '', value: '' } 
//       : { label: '', value: '', group: '' }; 
//     // Get current options or initialize empty array
//     const currentOptions = Array.isArray(newValues[fieldIndex].options) 
//       ? [...newValues[fieldIndex].options] 
//       : []; 
//     // Add only one new option
//     newValues[fieldIndex] = {
//       ...newValues[fieldIndex],
//       options: [...currentOptions, newOption]
//     };  
//     return newValues;
//   });
// }, []);
// const removeOption = useCallback((fieldIndex, optionIndex) => {
//   setFieldValues(prev => {
//     const newValues = JSON.parse(JSON.stringify(prev));
//     // Add proper existence checks
//     if (newValues[fieldIndex] && newValues[fieldIndex].options && newValues[fieldIndex].options.length) {
//       const removedOptionLabel = newValues[fieldIndex].options[optionIndex]?.label;
//       newValues[fieldIndex].options = newValues[fieldIndex].options
//         .filter((_, idx) => idx !== optionIndex);      
//       // Clear default value if it was the removed option
//       if (newValues[fieldIndex].defaultValue === removedOptionLabel) {
//         newValues[fieldIndex].defaultValue = "";
//       }      
//       if (newValues[fieldIndex].options.length === 0) {
//         newValues[fieldIndex].options = [];
//       }
//     }    
//     return newValues;
//   });
// }, []);
// const handleOptionChange = (fieldIndex, optionIndex, key, value, fieldType) => {
//   setFieldValues(prev => { 
//     const newValues = {...prev};   
//     // Ensure the field exists
//     if (!newValues[fieldIndex]) {
//       newValues[fieldIndex] = {};
//     }
//     // Ensure options array exists and is an array
//     if (!Array.isArray(newValues[fieldIndex].options)) {
//       newValues[fieldIndex].options = [];
//     }        
//     // If we're trying to update an option that doesn't exist, create it
//     if (!newValues[fieldIndex].options[optionIndex]) {
//       const newOption = fieldType === 'radio' 
//         ? { label: '', value: '' } 
//         : { label: '', value: '', group: '' };  
//       // Ensure we have enough slots in the array
//       while (newValues[fieldIndex].options.length <= optionIndex) {
//         newValues[fieldIndex].options.push({...newOption});
//       }
//     }    
//     // Update the specific option
//     newValues[fieldIndex].options = newValues[fieldIndex].options.map((opt, idx) => 
//       idx === optionIndex ? { ...opt, [key]: value } : opt
//     );    
//     return newValues;
//   });
// };
//   const handleDrop = (e, targetIndex = null) => {
//   e.preventDefault();
//   e.stopPropagation(); 
//   const data = e.dataTransfer.getData('text/plain');
//   if (!data) return;  
//   const element = JSON.parse(data);
//   const newElement = {
//     ...element,
//     icon: iconMap[element.iconType] || iconMap['block'] 
//   };  
//   if (targetIndex !== null && element.title.toLowerCase() !== 'block') {
//     setNestedFields(prev => ({
//       ...prev,
//       [targetIndex]: [...(prev[targetIndex] || []), newElement]
//     }));
    
//     // Initialize field values for the new nested element
//     const nestedKey = `${targetIndex}-${(prev[targetIndex] || []).length}`;
//     setFieldValues(prevValues => ({
//       ...prevValues,
//       [nestedKey]: {
//         label: '',
//         id: '',
//         name: '',
//         type: '',
//         options: ['select', 'radio'].includes(element.title.toLowerCase()) 
//           ? [{ label: '', value: '', group: '' }]
//           //? [{ label: '', value: '', ...(element.title.toLowerCase() !== 'radio' && { group: '' }) }]
//           : undefined,
//         ...prevValues[nestedKey]
//       }
//     }));
//   } else if (targetIndex === null) {
//     onDrop(newElement);
//   }
// };
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
//       setNestedCollapse(!nestedCollapse)
//     } else {
//       setElementsOpen(prev => ({
//         ...prev,
//         [index]: !prev[index]
//       })); 
//       setCollapse(!collapse)      
//     }
//   };
// const handleDelete = (index, isNested = false, parentIndex = null) => {
//   if (isNested) {
//     // Delete nested element
//     setNestedFields(prev => {
//       const updatedNestedFields = {...prev};
//       updatedNestedFields[parentIndex] = prev[parentIndex].filter((_, i) => i !== index);
//       return updatedNestedFields;
//     });  
//     // Clean up field values for the nested element
//     setFieldValues(prev => {
//       const newValues = {...prev};
//       const nestedKey = `${parentIndex}-${index}`;
//       delete newValues[nestedKey];
//       return newValues;
//     });
//   } else {
//     // Delete main element
//     onDelete(index);  
//     // Clean up all data associated with the deleted element
//     setFieldValues(prev => {
//       const newValues = {...prev};    
//       // Delete the main element's field values
//       delete newValues[index];   
//       // Delete all nested field values for this element
//       Object.keys(prev).forEach(key => {
//         if (key.startsWith(`${index}-`)) {
//           delete newValues[key];
//         }
//       });      
//       // Reindex only the main elements that come after the deleted one
//       Object.keys(prev).forEach(key => {
//         // Handle main element keys (numeric)
//         if (/^\d+$/.test(key)) {
//           const keyNum = parseInt(key);
//           if (keyNum > index && !newValues[keyNum - 1]) {
//             newValues[keyNum - 1] = prev[key];
//             delete newValues[key];
//           }
//         }
//         // Handle nested element keys (e.g., "0-1", "1-2")
//         else if (key.includes('-')) {
//           const [parentIdx, nestedIdx] = key.split('-').map(Number);        
//           // If the parent index is greater than the deleted index, adjust it
//           if (parentIdx > index && !newValues[`${parentIdx - 1}-${nestedIdx}`]) {
//             newValues[`${parentIdx - 1}-${nestedIdx}`] = prev[key];
//             delete newValues[key];
//           }
//         }
//       });      
//       return newValues;
//     });    
//     // Clean up and reindex nested fields
//     setNestedFields(prev => {
//       const newNested = {};      
//       Object.keys(prev).forEach(key => {
//         const parentIdx = parseInt(key);      
//         if (parentIdx === index) {
//           return;
//         } else if (parentIdx > index) {
//           // Adjust parent index for elements after the deleted one
//           newNested[parentIdx - 1] = prev[key];
//         } else {
//           // Keep elements before the deleted one
//           newNested[key] = prev[key];
//         }
//       });      
//       return newNested;
//     });    
//     // Clean up and reindex expanded states
//     setElementsOpen(prev => {
//       const newOpen = {};      
//       Object.keys(prev).forEach(key => {
//         const keyNum = parseInt(key);     
//         if (keyNum === index) {
//           return;
//         } else if (keyNum > index) {
//           // Adjust index for elements after the deleted one
//           newOpen[keyNum - 1] = prev[key];
//         } else {
//           // Keep elements before the deleted one
//           newOpen[key] = prev[key];
//         }
//       });      
//       return newOpen;
//     }); 
//     // Clean up and reindex expanded nested states
//     setExpandedNested(prev => {
//       const newExpanded = {};      
//       Object.keys(prev).forEach(key => {
//         const parentIdx = parseInt(key);        
//         if (parentIdx === index) {
//           return;
//         } else if (parentIdx > index) {
//           // Adjust parent index for elements after the deleted one
//           newExpanded[parentIdx - 1] = prev[key];
//         } else {
//           // Keep elements before the deleted one
//           newExpanded[key] = prev[key];
//         }
//       });      
//       return newExpanded;
//     });
//   }
// };
//   const handleCopy = (index, isNested = false, parentIndex = null) => {
//   if (isNested) {
//     // Copy nested element with its field values
//     setNestedFields(prev => {
//       const newNestedFields = {...prev};
//       const originalElement = prev[parentIndex][index];
//       const newElement = {...originalElement};      
//       newNestedFields[parentIndex] = [...prev[parentIndex], newElement];     
//       // Copy field values for the nested element
//       setFieldValues(prevValues => {
//         const originalKey = `${parentIndex}-${index}`;
//         const newKey = `${parentIndex}-${prev[parentIndex].length}`; // New index will be the last one        
//         return {
//           ...prevValues,
//           [newKey]: {...prevValues[originalKey]}
//         };
//       });      
//       return newNestedFields;
//     });
//   } else {
//     // Copy the main element
//     const newElement = {...droppedElements[index]};    
//     // Copy the nested fields if they exist
//     const nestedFieldsCopy = nestedFields[index] ? [...nestedFields[index]] : [];    
//     // Add the new element to the dropped elements
//     const newIndex = droppedElements.length;
//     onDrop(newElement);    
//     // Update nested fields for the new copy
//     setNestedFields(prev => ({
//       ...prev,
//       [newIndex]: nestedFieldsCopy
//     }));  
//     // Copy all field values including nested ones
//     const newFieldValues = {};    
//     // Copy main field values
//     if (fieldValues[index]) {
//       newFieldValues[newIndex] = {...fieldValues[index]};
//     }    
//     // Copy nested field values if they exist
//     if (nestedFields[index]) {
//       nestedFields[index].forEach((_, nestedIndex) => {
//         const originalKey = `${index}-${nestedIndex}`;
//         const newKey = `${newIndex}-${nestedIndex}`;        
//         if (fieldValues[originalKey]) {
//           newFieldValues[newKey] = {...fieldValues[originalKey]};
//         }
//       });
//     }    
//     // Update field values with both main and nested copies
//     setFieldValues(prev => ({
//       ...prev,
//       ...newFieldValues
//     }));
//   }
// };

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
//    const toggleColorPicker = (fieldIndex, pickerType) => {
//     const pickerKey = `${fieldIndex}-${pickerType}`;
//     if (colorPalette === pickerKey) {
//       setColorPalette(null);
//     } else {
//       setColorPalette(pickerKey);
//     }
//     if (colorRgba === pickerKey) {
//       setColorRgba(null);
//     } else {
//       setColorRgba(pickerKey);
//     }
//   };

//   const renderInputFields = (element, index) => {
//     const type = element.title.toLowerCase();
//     const isBlock = type === 'block';
//     const values = fieldValues[index] || {};
//     // Common fields for non-block elements
//     const commonFields = !isBlock ? (
//       <>
//         <div className="mb-4">
//           <label>Label <span className="text-red-500">*</span></label>
//           <input 
//             placeholder="Enter Label"
//             type="text" 
//             value={values.label || ''}
//             onChange={(e) => handleFieldChange(index, 'label', e.target.value, 'id')}
//             className="bg-stone-700 h-12 p-3 w-full required" 
//           />
//         </div>
//         <div className="mb-4">
//           <label>ID <span className="text-red-500">*</span></label>
//           <input 
//             placeholder="Enter ID"
//             type="text" 
//             value={values.id || ''}
//             onChange={(e) => handleFieldChange(index, 'id', e.target.value)}
//             className="bg-stone-700 h-12 p-3 w-full required" 
//           />
//         </div>
//       </>
//     ) : (
//       // Block element fields
//       <>
//         <div className="mb-4">
//           <label>Name <span className="text-red-500">*</span></label>
//           <input 
//             placeholder="Enter Name"
//             type="text" 
//             value={values.name || ''}
//             onChange={(e) => handleFieldChange(index, 'name', e.target.value, 'type')}
//             className="bg-stone-700 h-12 p-3 w-full required" 
//           />
//         </div>
//         <div className="mb-4">
//           <label>Type <span className="text-red-500">*</span></label>
//           <input 
//             placeholder="Enter Type"
//             type="text" 
//             value={values.type || ''}
//             onChange={(e) => handleFieldChange(index, 'type', e.target.value)}
//             className="bg-stone-700 h-12 p-3 w-full required" 
//           />
//         </div>
//       </>
//     );
//     // Info field (appears last for all elements except blocks)
//     const infoField = !isBlock && (
//       <div className="mb-4">
//         <label>Info</label>
//         <textarea 
//           placeholder="Enter Info Value"
//           value={values.info || ''}
//           onChange={(e) => handleFieldChange(index, 'info', e.target.value)}
//           className=" bg-stone-700 h-24 p-3 w-full" style={{'scrollbarWidth' : 'none'}}
//         />
//       </div>
//     );
//     // Type-specific fields
//     let typeSpecificFields = null;
//     switch(type) { 

//         case 'text':
//       case 'textarea':
//       case 'number':
//         typeSpecificFields = (
//           <>
//             <div className="mb-4">
//               <label>Placeholder</label>
//               <input 
//                 placeholder="Enter Placeholder"
//                 type="text" 
//                 value={values.placeholder || ''}
//                 onChange={(e) => handleFieldChange(index, 'placeholder', e.target.value)}
//                 className="bg-stone-700 h-12 p-3 w-full" 
//               />
//             </div>
//             <div className="mb-4">
//               <label>Default</label>
//               <input 
//                 placeholder="Enter Default Value"
//                 type={type === 'number' ? 'number' : 'text'} 
//                 value={values.defaultValue || ''}
//                 onChange={(e) => handleFieldChange(index, 'defaultValue', e.target.value)}
//                 className="flex-wrap bg-stone-700 h-12 p-3 w-full"
//               />
//             </div>
//           </>
//         );
//         break;

//        case 'html':
//         typeSpecificFields = (
//           <div className="mb-4">
//             <label>Placeholder</label>
//             <input 
//               placeholder="Enter Placeholder"
//               type="text" 
//               value={values.placeholder || ''}
//               onChange={(e) => handleFieldChange(index, 'placeholder', e.target.value)}
//               className="bg-stone-700 h-12 p-3 w-full" 
//             />
//           </div>
//         );
//         break;
         
//       case 'video url': {
//       const acceptValues = values.accept || [];
  
//       typeSpecificFields = (
//       <>
//       <div className="mb-4">
//         <label>Accept</label>
//         <Menu as="div" className="relative bg-stone-700 min-h-12 p-3 rounded cursor-pointer">
//           <MenuButton className="flex flex-wrap items-center w-full gap-2 text-white focus:outline-none focus:ring-0">
//             {acceptValues.length === 0 ? (
//               "Enter the Disable Group Value"
//             ) : (
//               acceptValues.map((item) => (
//                 <span key={item} 
//                   className="bg-white text-black text-sm px-2 py-1 rounded-full flex items-center">{item}
//                   <XMarkIcon
//                     onClick={(e) => {
//                       e.stopPropagation()
//                       const updatedValues = acceptValues.filter((i) => i !== item);
//                       handleFieldChange(index, 'accept', updatedValues);
//                     }}
//                     className="w-4 h-4 ml-1 cursor-pointer hover:text-red-400"/>
//                 </span>
//               ))
//             )}
//             <ChevronDownIcon className="ml-auto size-6 text-white" />
//           </MenuButton>
//           <MenuItems className="absolute w-full top-13 left-0 z-10 rounded bg-stone-700 text-white focus:outline-none focus:ring-0">
//             {["Youtube","Vimeo"].map((item) => (
//               <MenuItem key={item}>
//                 {({ focus }) => (
//                   <div
//                     onClick={() => {
//                       if (acceptValues.includes(item)) {
//                         const updatedValues = acceptValues.filter((i) => i !== item);
//                         handleFieldChange(index, 'accept', updatedValues);
//                       } else {
//                         const updatedValues = [...acceptValues, item];
//                         handleFieldChange(index, 'accept', updatedValues);
//                       }
//                     }}
//                     className={`block px-4 py-2 cursor-pointer ${focus || acceptValues.includes(item) 
//                       ? 'bg-white text-stone-700 font-medium' 
//                       : ''}`}>{item}</div>
//                 )}
//               </MenuItem>
//             ))}
//           </MenuItems>
//         </Menu>        
//        </div>
//        <div className="mb-4">
//         <label>Placeholder</label>
//         <input 
//           placeholder="Enter Placeholder"
//           type="text" 
//           value={values.placeholder || ''}
//           onChange={(e) => handleFieldChange(index, 'placeholder', e.target.value)}
//           className="bg-stone-700 h-12 p-3 w-full" 
//         />        
//        </div>
//       </>
//       );
//       break;
//       }
      
//       case 'text alignment':
//       case 'checkbox':
//       case 'font picker': {   
//         const options = {
//           'text alignment': ['Center', 'Left', 'Right'],
//           'checkbox': ['True', 'False'],
//           'font picker': [
//             'Mono', 
//             'Sans-serif', 
//             'Serif', 
//             'Bitter', 
//             'Bitter Italic', 
//             'Bitter Bold', 
//             'Open Sans', 
//             'Times New Roman', 
//             'Raleway'
//           ]
//         }[type];

//         typeSpecificFields = (
//           <div className="mb-4">
//             <label>Default</label>
//             <Menu as="div" className="relative flex bg-stone-700 h-12 p-3 cursor-pointer">
//               <MenuButton className="flex justify-between items-center w-full text-white focus:outline-none focus:ring-0">
//                 {values.defaultValue || "Select default value"}
//                 <ChevronDownIcon aria-hidden="true" className="-mr-1 size-6 text-white ml-2" />
//               </MenuButton>
//               <MenuItems className="absolute w-full top-13 left-0 rounded bg-stone-700 text-white focus:outline-none focus:ring-0 max-h-42 overflow-y-auto"
//                          style={{'scrollbarWidth' : 'none'}}> 
//                 <div>
//                   {options.map((item) => (
//                     <MenuItem key={item}>
//                       <li
//                         onClick={() => handleFieldChange(index, 'defaultValue', item)}
//                         className="block px-4 py-2 cursor-pointer hover:bg-white hover:text-stone-700"
//                       >
//                         {item}
//                       </li>
//                     </MenuItem>
//                   ))}
//                 </div>
//               </MenuItems>
//             </Menu>
//           </div>
//         );
//         break;
//       }

//      case 'select':
//      case 'radio': {
//      const options = values.options || [{ label: '', value: '', ...(type !== 'radio' && { group: '' }) }];

//      typeSpecificFields = (
//      <>
//       <div className="mb-4 border-1 border-white px-2">
//         <h2 className="font-semibold text-lg my-2">Options</h2>
        
//         {options.map((option, optionIndex) => (
//           <div key={optionIndex} className="flex gap-5 border-t-1 border-t-white py-2">
//             <div className="flex-1">
//               <label>Label</label>
//               <input 
//                 placeholder="Enter Label"
//                 type="text" 
//                 value={option.label || ''}
//                 onChange={(e) => handleOptionChange(index, optionIndex, 'label', e.target.value, type)}
//                 className="bg-stone-700 h-12 p-3 w-full" 
//               />   
//               <label>Value</label>
//               <input 
//                 placeholder="Enter Value"
//                 type="text" 
//                 value={option.value || ''}
//                 onChange={(e) => handleOptionChange(index, optionIndex, 'value', e.target.value, type)}
//                 className="bg-stone-700 h-12 p-3 w-full" 
//               />  
//               {type !== 'radio' && (
//                 <>
//                   <label>Group</label>
//                   <input 
//                     placeholder="Enter Group"
//                     type="text" 
//                     value={option.group || ''}
//                     onChange={(e) => handleOptionChange(index, optionIndex, 'group', e.target.value, type)}
//                     className="bg-stone-700 h-12 p-3 w-full" 
//                   />
//                 </>
//               )}
//             </div>
//             <div className="flex items-center justify-center px-4">
//               <button 
//                 onClick={(e) => {
//                   e.preventDefault();
//                   e.stopPropagation();
//                   removeOption(index, optionIndex);
//                 }}
//                 className="text-gray-600 p-[8px] rounded-full bg-stone-700 bg-opacity-[0.08] cursor-pointer"
//               // disabled={options.length <= 1}
//               >
//                 <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className="text-white" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
//                   <path fill="none" d="M0 0h24v24H0z"></path>
//                   <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path>
//                 </svg>
//               </button>
//             </div>
//           </div>
//         ))}  
//       </div>

//       <button 
//         onClick={(e) => {
//           e.preventDefault();
//           e.stopPropagation();
//           addOption(index, type === 'radio');
//         }}
//         className="flex w-full py-2 text-lg justify-center items-center border-1 border-dotted border-white cursor-pointer mb-4"
//       >
//         + Add Option
//       </button>
      
//       <div className="my-4">
//         <label>Default</label>
//         <Menu as="div" className="relative flex bg-stone-700 h-12 p-3 cursor-pointer">
//           <MenuButton className="flex justify-between items-center w-full text-white focus:outline-none focus:ring-0">
//             {values.defaultValue || <span className="text-neutral-400">Select Default Value</span>}
//             <ChevronDownIcon aria-hidden="true" className="-mr-1 size-6 text-white ml-2" />
//           </MenuButton>
//           <MenuItems className="absolute w-full top-13 left-0 z-10 rounded bg-stone-700 text-white focus:outline-none focus:ring-0">
//             <div>       
//              {options.length === 0 ? (
//                 <MenuItem>
//                   <div className="block px-4 py-2 cursor-pointer hover:bg-white hover:text-stone-700">
//                      <span className="text-neutral-400 flex justify-center">No Options</span>
//                   </div>
//                 </MenuItem>
//               ) : (
//               options.map((option, idx) => (
//                 <MenuItem key={idx}>
//                   <div onClick={() => handleFieldChange(index, 'defaultValue', option.label)}
//                       className="block px-4 py-2 cursor-pointer hover:bg-white hover:text-stone-700" 
//                   >{option.label}
//                   </div>
//                 </MenuItem>
//               ))
//               )}
//             </div>
//           </MenuItems>
//         </Menu>
//       </div>
//     </>
//     );
//     break;
//     }
      
//       case 'range':
//         typeSpecificFields = (
//           <>
//             <div className="space-y-4">
//               <div>
//                 <label>Min</label>
//                 <input 
//                   placeholder="Enter Min Value"
//                   type="number" 
//                   min="0" 
//                   value={values.min || ''}
//                   onChange={(e) => handleFieldChange(index, 'min', e.target.value)}
//                   className="bg-stone-700 h-12 p-3 w-full" 
//                 />
//               </div>
//               <div>
//                 <label>Max</label>
//                 <input  
//                   placeholder="Enter Max Value"
//                   type="number" 
//                   min="0" 
//                   value={values.max || ''}
//                   onChange={(e) => handleFieldChange(index, 'max', e.target.value)}
//                   className="bg-stone-700 h-12 p-3 w-full" 
//                 />
//               </div>
//               <div>
//                 <label>Step</label>
//                 <input 
//                   placeholder="Enter Step Value"
//                   type="number" 
//                   min="0" 
//                   value={values.step || ''}
//                   onChange={(e) => handleFieldChange(index, 'step', e.target.value)}
//                   className="bg-stone-700 h-12 p-3 w-full" 
//                 />
//               </div>
//               <div>
//                 <label>Unit</label>
//                 <input 
//                   placeholder="Enter Unit Value"
//                   type="text" 
//                   value={values.unit || ''}
//                   onChange={(e) => handleFieldChange(index, 'unit', e.target.value)}
//                   className="bg-stone-700 h-12 p-3 w-full" 
//                 />
//               </div>
//               <div className="mb-4">
//                 <label>Default</label>
//                 <input 
//                   placeholder="Enter Default Value"
//                   type="number" 
//                   min="0" 
//                   value={values.defaultValue || ''}
//                   onChange={(e) => handleFieldChange(index, 'defaultValue', e.target.value)}
//                   className="bg-stone-700 h-12 p-3 w-full" 
//                 />
//               </div>
//             </div>
//           </>
//         );
//         break;

//      case 'color':
//        typeSpecificFields = (
//          <>
//           <div className="mb-4 flex gap-4 w-full relative">
//             <div style={{ backgroundColor: values.colorPalette || '#ffffff' }}
//               className="w-12 h-12 cursor-pointer rounded border border-gray-300" 
//               onClick={() => toggleColorPicker(index, 'colorPalette')}
//             ></div>
//             <input type="text" value={values.colorPalette || '#ffffff'}
//               onChange={(e) => handleFieldChange(index, 'colorPalette', e.target.value)}
//               className="bg-stone-700 h-12 p-3 w-full text-white" 
//             />
//             {colorPalette === `${index}-colorPalette` && (
        
//               <div className="absolute z-[9999] text-black" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>       
//                 <SketchPicker  width={294} className="text-center font-semibold text-md"
//                   color={values.colorPalette || '#ffffff'}
//                   onChangeComplete={(color) => {
//                     handleFieldChange(index, 'colorPalette', color.hex);
//                     setColorPalette(null);
//                   }}
//                   presetColors={[
//                    '#D0021B', '#F5A623', '#F8E71C', '#8B572A', '#7ED321', 
//                    '#417505', '#BD10E0', '#9013FE', '#4A90E2', '#50E3C2', 
//                    '#B8E986', '#000000', '#4A4A4A', '#9B9B9B', '#FFFFFF',
//                   '#C0C0C0', '#000080', '#0000FF', '#808000', '#008080'
//                   ]} 
//                 />
//               </div>
//            )}
//          </div>         
//         </>
//        );
//       break;
  
//         case 'color background':
//         typeSpecificFields = (
//           <>
//             <div className="mb-4 flex gap-4 w-full relative">
//               <div 
//                 style={{ backgroundColor: values.colorRgba || 'rgba(255,255,255,1)' }}
//                 className="w-12 h-12 cursor-pointer rounded border border-gray-300" 
//                 onClick={() => toggleColorPicker(index, 'colorRgba')}
//               ></div>
//               <input 
//                 type="text" 
//                 value={values.colorRgba || 'rgba(255,255,255,1)'}
//                 onChange={(e) => handleFieldChange(index, 'colorRgba', e.target.value)}
//                 className="bg-stone-700 h-12 p-3 w-full text-white" 
//               />
//               {colorRgba === `${index}-colorRgba` && ( 

//                  <div className="absolute z-[9999] text-black" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}> 
//                   <SketchPicker width={294} className="text-center font-semibold text-md"
//                     color={values.colorRgba || 'rgba(255,255,255,1)'}
//                     onChangeComplete={(color) => {
//                       const rgba = `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`;
//                       handleFieldChange(index, 'colorRgba', rgba);
//                       setColorRgba(null);
//                     }}
//                     presetColors={[
//                       '#D0021B', '#F5A623', '#F8E71C', '#8B572A', '#7ED321', 
//                       '#417505', '#BD10E0', '#9013FE', '#4A90E2', '#50E3C2', 
//                       '#B8E986', '#000000', '#4A4A4A', '#9B9B9B', '#FFFFFF',
//                       '#C0C0C0', '#000080', '#0000FF', '#808000', '#008080'
//                     ]} 
//                   />
//                 </div>
//               )}
//             </div>
//           </>
//         );
//         break;
      
//       case 'header':
//         return (
//           <div className="mb-4">
//             <label>Content</label>
//             <input 
//               placeholder="Enter Content"
//               value={values.content || ''}
//               onChange={(e) => handleFieldChange(index, 'content', e.target.value)}
//               className="bg-stone-700 h-12 p-3 w-full" 
//             />
//           </div>
//         );
      
//       case 'product list':
//       case 'collection list':
//         typeSpecificFields = (
//           <div className="mb-4">
//             <label>Limit</label>
//             <input 
//               placeholder="Enter Limit"
//               type="number" 
//               min="0" 
//               value={values.limit || ''}
//               onChange={(e) => handleFieldChange(index, 'limit', e.target.value)}
//               className="bg-stone-700 h-12 p-3 w-full" 
//             />
//           </div>
//         );
//         break;
      
//       case 'metaobject':
//         typeSpecificFields = (
//           <div className="mb-4">
//             <label>Metaobject_type</label>
//             <input 
//               placeholder="Enter Metaobject Type"
//               type="text" 
//               value={values.metaobjectType || ''}
//               onChange={(e) => handleFieldChange(index, 'metaobjectType', e.target.value)}
//               className="bg-stone-700 h-12 p-3 w-full" 
//             />
//           </div>
//         );
//         break;
      
//       case 'metaobject list':
//         typeSpecificFields = (
//           <>
//             <div className="mb-4">
//               <label>Metaobject_type</label>
//               <input 
//                 placeholder="Enter Metaobject Type"
//                 type="text" 
//                 value={values.metaobjectType || ''}
//                 onChange={(e) => handleFieldChange(index, 'metaobjectType', e.target.value)}
//                 className="bg-stone-700 h-12 p-3 w-full" 
//               />
//             </div>
//             <div className="mb-4">
//               <label>Limit</label>
//               <input 
//                 placeholder="Enter Limit"
//                 type="number" 
//                 min="0" 
//                 value={values.limit || ''}
//                 onChange={(e) => handleFieldChange(index, 'limit', e.target.value)}
//                 className="bg-stone-700 h-12 p-3 w-full" 
//               />
//             </div>
//           </>
//         );
//         break;  
        
//       case 'rich text':
//       case 'inline richtext': {
//         const isInlineRichText = type === 'inline richtext';
        
//         const handleFormat = (format, event) => {
//           event.preventDefault();
//           const editor = document.getElementById(`richtext-${index}`);
//           if (!editor) return;
//           editor.focus();
//           switch (format) {
//           case 'bold':
//             document.execCommand('bold', false, null);
//             break;
//           case 'italic':
//             document.execCommand('italic', false, null);
//             break;
//           case 'underline':
//             document.execCommand('underline', false, null);
//             break;

//           case 'bullet': {
//             const selection = window.getSelection();
//             if (!selection.rangeCount) return;
//             const range = selection.getRangeAt(0);
//             // Insert a marker span to remember cursor position
//             const marker = document.createElement('span');
//             marker.id = 'cursor-marker';
//             marker.appendChild(document.createTextNode('\u200B')); // zero-width space
//             range.insertNode(marker);
//             editor.focus();
//             document.execCommand('insertUnorderedList', false, null);
//             // Restore cursor to marker position and remove marker
//             setTimeout(() => {
//               const markerEl = document.getElementById('cursor-marker');
//               if (markerEl) {
//                 const newRange = document.createRange();
//                 newRange.setStartAfter(markerEl);
//                 newRange.collapse(true);
//                 selection.removeAllRanges();
//                 selection.addRange(newRange);
//                 markerEl.parentNode.removeChild(markerEl);
//               }
//               // Optional: style the list
//               const lists = editor.getElementsByTagName('ul');
//               if (lists.length > 0) {
//                 const lastList = lists[lists.length - 1];
//                 lastList.style.listStyleType = 'disc';
//                 lastList.style.paddingLeft = '40px';
//                 lastList.style.margin = '0';

//                 const listItems = lastList.getElementsByTagName('li');
//                 for (let li of listItems) {
//                   li.style.margin = '2px 0';
//                   li.style.display = 'list-item'; 
//                 }
//               }
//               handleFieldChange(index, 'defaultValue', editor.innerHTML);
//             }, 0);
//             break;
//           }
//           case 'url': {
//             const url = prompt('Enter URL:', 'https://');
//             if (url) {
//               document.execCommand('createLink', true, url);
//             }
//             break;
//           }
//           default:
//           break;
//           } 
//           handleFieldChange(index, 'defaultValue', editor.innerHTML);
//         };
//         const handleKeyDown = (e) => {
//           const editor = e.currentTarget;
//           if (e.key === 'Enter') {
//             const selection = window.getSelection();
//             if (!selection.rangeCount) return;

//             const range = selection.getRangeAt(0);
//             let node = range.commonAncestorContainer;
//             let listItem = null;
//             while (node && node !== editor) {
//               if (node.nodeName === 'LI') {
//               listItem = node;
//               break;
//               }
//               node = node.parentNode;
//             }
//             if (listItem) {
//               const textContent = listItem.textContent.trim();
//               if (textContent === '' && listItem.innerHTML !== '<br>') {
//                 e.preventDefault();
//                 const list = listItem.parentNode;
//                 const newDiv = document.createElement('div');
//                 newDiv.innerHTML = '<br>';
//                 if (listItem === list.lastChild && list.children.length === 1) {
//                   list.parentNode.replaceChild(newDiv, list);
//                 } else {
//                   list.removeChild(listItem);
//                   if (list.children.length === 0) {
//                     list.parentNode.removeChild(list);
//                   }
//                   list.parentNode.insertBefore(newDiv, list.nextSibling);
//                 }
//                 const newRange = document.createRange();
//                 newRange.setStart(newDiv, 0);
//                 newRange.collapse(true);
//                 selection.removeAllRanges();
//                 selection.addRange(newRange);
//                 handleFieldChange(index, 'defaultValue', editor.innerHTML);
//                 return;
//               }
//             }
//             setTimeout(() => {
//               handleFieldChange(index, 'defaultValue', editor.innerHTML);
//             }, 0);
//           }
//         };
//         const initializeEditor = (editorElement) => {
//           if (!editorElement.innerHTML.trim()) {
//             editorElement.innerHTML = '<div><br></div>';
//           }
//         };
//         typeSpecificFields = (
//         <>
//         <div className="bg-stone-700 border-gray-400 border-1 mb-4">
//           <div className="flex flex-wrap items-center p-1 border-b border-gray-400">
//             <div className="flex space-x-0">
//               <button
//                 onClick={(e) => handleFormat('bold', e)}
//                 className="h-8 w-8 flex items-center justify-center rounded hover:bg-gray-600 font-bold cursor-pointer"
//                 title="Bold"
//               >
//               B
//               </button>

//               <button
//                onClick={(e) => handleFormat('italic', e)}
//                className="h-8 w-8 flex items-center justify-center rounded hover:bg-gray-600 italic cursor-pointer"
//                title="Italic"
//               >
//               I
//               </button>

//              {!isInlineRichText && (
//               <button
//                 onClick={(e) => handleFormat('underline', e)}
//                 className="h-8 w-8 flex items-center justify-center rounded hover:bg-gray-600 underline cursor-pointer"
//                 title="Underline"
//               >
//                 U
//               </button>
//              )}
//               <button
//                 onClick={(e) => handleFormat('url', e)}
//                 className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-600 cursor-pointer"
//                 title="Insert Link"
//               >
//                <svg viewBox="0 0 18 18" className="w-5 h-5" fill="none">
//                 <line className="stroke-white" x1="7" x2="11" y1="7" y2="11"></line>
//                 <path className="stroke-white" d="M8.9,4.577a3.476,3.476,0,0,1,.36,4.679A3.476,3.476,0,0,1,4.577,8.9C3.185,7.5,2.035,6.4,4.217,4.217S7.5,3.185,8.9,4.577Z"></path>
//                 <path className="stroke-white" d="M13.423,9.1a3.476,3.476,0,0,0-4.679-.36,3.476,3.476,0,0,0,.36,4.679c1.392,1.392,2.5,2.542,4.679.36S14.815,10.5,13.423,9.1Z"></path>
//                </svg>
//               </button>
//              {!isInlineRichText && (
//               <button
//                 onClick={(e) => handleFormat('bullet', e)}
//                 className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-600 cursor-pointer"
//                 title="Bullet List"
//               >
//                 <svg viewBox="0 0 18 18" className="w-4 h-4">
//                   <line stroke="currentcolor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="6" x2="15" y1="4" y2="4"></line>
//                   <line stroke="currentcolor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="6" x2="15" y1="9" y2="9"></line>
//                   <line stroke="currentcolor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="6" x2="15" y1="14" y2="14"></line>
//                   <line stroke="currentcolor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="3" x2="3" y1="4" y2="4"></line>
//                   <line stroke="currentcolor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="3" x2="3" y1="9" y2="9"></line>
//                   <line stroke="currentcolor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="3" x2="3" y1="14" y2="14"></line>
//                 </svg>
//               </button>
//              )}
//             </div>
//           </div>
//           <div className="p-3 min-h-11">
//             <div
//               id={`richtext-${index}`}
//               contentEditable
//               onInput={(e) => handleFieldChange(index, 'defaultValue', e.target.innerHTML)}
//               onKeyDown={handleKeyDown}
//               onFocus={(e) => initializeEditor(e.target)}
//               className="bg-transparent h-full outline-none resize-none richtext-editor"
//             />
//           </div>
//         </div>
//        </>
//        );
//        break;
//       }  

//       case 'block':
//       default:
//         break;
//     }
//     return (
//       <>
//         {commonFields}
//         {typeSpecificFields}
//         {infoField}
        
//         {/* Nested fields section for block elements */}
//         {isBlock && (
//           <>
//             <div className="mb-4">
//               <label>Limit</label>
//               <input 
//                 placeholder="Enter Limit"
//                 type="number" 
//                 min="0" 
//                 value={values.limit || ''}
//                 onChange={(e) => handleFieldChange(index, 'limit', e.target.value)}
//                 className="bg-stone-700 h-12 p-3 w-full" 
//               />
//             </div>
//             <label className="font-semibold text-md">Nested Fields</label>
//             <div 
//               className="nested-drop-zone my-4 mx-3 min-h-24 border-1 border-gray-300 border-dashed rounded p-2"
//               onDragOver={handleDragOver}
//               onDrop={(e) => handleDrop(e, index)}
//             >
//               {(nestedFields[index] || []).length === 0 ? (
//                 <p className="p-3 font-bold text-center text-gray-300 text-xl">
//                   Drag fields here 
//                 </p>
//               ) : (
//                 <div className="space-y-2">
//                   {(nestedFields[index] || []).map((nestedEl, nestedIndex) => 
//                     renderElement(nestedEl, nestedIndex, true, index)
//                   )}
//                 </div>
//               )}
//             </div>
//           </>
//         )}
//       </>
//     );
//   };
//   const renderElement = (element, index, isNested = false, parentIndex = null) => {
//     const isExpanded = isNested 
//       ? expandedNested[parentIndex]?.[index] 
//       : elementsOpen[index]; 
//     // Get current values for dynamic title
//     const currentValues = fieldValues[isNested ? `${parentIndex}-${index}` : index] || {};
//     const displayTitle = element.title.toLowerCase() === 'block' 
//       ? currentValues.name
//       : currentValues.label
//     return (
//       <div key={isNested ? `${parentIndex}-${index}` : index} className="basis-6/12 w-full overflow-hidden">
//         <div className="bg-stone-800 py-1 px-4 flex items-center group">
//           <div className="bg-stone-900 p-1 rounded-sm mr-3">
//             <span className="text-light-bg text-2xl">{element.icon}</span>
//           </div>
//           <div className="flex-1 ms-2 ">
//             <h4 className="font-semibold text-lg ">{displayTitle}</h4>
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
//           <div className="w-full bg-stone-950 py-6 px-4">
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
//           <div className="p-3 space-y-2 overflow-y-auto h-full" style={{"scrollbarWidth":"none"}}>
//             {droppedElements.map((el, index) => renderElement(el, index))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };
// export default SectionSchemaElements




// ****************************************TEST CODE FOR SOME UPDATES IN COPY AND DOWNLOAD*********************************
//*************************************************************************************************************************



import { useState, useEffect, useCallback, forwardRef, useImperativeHandle  } from "react";
import iconMap from "./iconMap";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon, XMarkIcon } from '@heroicons/react/20/solid'
import { SketchPicker } from "react-color";
const SectionSchemaElements = forwardRef( ({ droppedElements, onDrop, onDelete, resetTrigger, elementsData, setElementsData }, ref) => {
  const [collapse, setCollapse]= useState(false)
  const [nestedCollapse, setNestedCollapse] = useState(false)
  const [elementsOpen, setElementsOpen] = useState({});
  const [nestedFields, setNestedFields] = useState(elementsData.nestedFields || {});
  const [expandedNested, setExpandedNested] = useState({});
  const [fieldValues, setFieldValues] = useState(elementsData.fieldValues || {});
  const [colorPalette, setColorPalette] = useState(null);
  const [colorRgba, setColorRgba] = useState(null);

       /** ---------------- VALIDATION ---------------- */
  const validateRequiredFields = useCallback(() => {
    const errors = [];

    droppedElements.forEach((el, index) => {
      const values = fieldValues[index] || {};
      const type = el.title.toLowerCase();

      if (type === 'block') {
        
         if (!values.name?.trim() || !values.type?.trim()) {
          errors.push(`Validation failed in ${el.title} Element. Unable to update the section schema.`);
        }
        (nestedFields[index] || []).forEach((nestedEl, nIdx) => {
          const nestedKey = `${index}-${nIdx}`;
          const nestedValues = fieldValues[nestedKey] || {};

          if (!nestedValues.label?.trim() || !nestedValues.id?.trim()) {
             errors.push(`Validation failed in Nested ${nestedEl.title} Element. Unable to update the section schema.`);
          }
        });

      } else {
        if (!values.label?.trim() || !values.id?.trim()) {
          errors.push(`Validation failed in ${el.title} Element. Unable to update the section schema.`);
        }
      }
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

  // Update elements data when field values change
  useEffect(() => {
    if (setElementsData) {
      setElementsData({
        droppedElements,
        nestedFields,
        fieldValues
      });
    }
  }, [droppedElements, nestedFields, fieldValues, setElementsData])
  // Reset all fields when resetTrigger changes
  useEffect(() => {
    setElementsOpen({});
    setNestedFields({});
    setExpandedNested({});
    setFieldValues({});
    setColorPalette(false);
    setColorRgba(false);
    // Reset elements data in context
    if (setElementsData) {
      setElementsData({
        droppedElements: [],
        nestedFields: {},
        fieldValues: {}
      });
    }
  }, [resetTrigger, setElementsData])
// Initialize field values when elements are added
useEffect(() => {
  const newValues = {...fieldValues};
  let hasChanges = false;  
  // Handle main elements
  droppedElements.forEach((el, index) => {
    if (!newValues[index]) {
      hasChanges = true;
      newValues[index] = {
        label: '',
        id: '',
        name: '',
        type: '',
        options: ['select', 'radio'].includes(el.title.toLowerCase()) 
          ? [{ label: '', value: '', group: '' }]
          : undefined,
        ...newValues[index]
      };
    }
  });
  // Handle nested elements
  Object.keys(nestedFields).forEach(parentIndex => {
    nestedFields[parentIndex].forEach((el, nestedIndex) => {
      const key = `${parentIndex}-${nestedIndex}`;
      if (!newValues[key]) {
        hasChanges = true;
        newValues[key] = {
          label: '',
          id: '',
          name: '',
          type: '',
          options: ['select', 'radio'].includes(el.title.toLowerCase()) 
            ? [{ label: '', value: '', group: '' }]
            : undefined,
          ...newValues[key]
        };
      }
    });
  });
  // Only update if there are changes to avoid infinite loops
  if (hasChanges) {
    setFieldValues(newValues);
  }
}, [droppedElements, nestedFields, fieldValues]);

const addOption = useCallback((fieldIndex, isRadio = false) => {
  setFieldValues(prev => {
    const newValues = { ...prev };    
    // Create field if it doesn't exist
    if (!newValues[fieldIndex]) {
      newValues[fieldIndex] = {};
    }
    // Create the new option
    const newOption = isRadio 
      ? { label: '', value: '' } 
      : { label: '', value: '', group: '' }; 
    // Get current options or initialize empty array
    const currentOptions = Array.isArray(newValues[fieldIndex].options) 
      ? [...newValues[fieldIndex].options] 
      : []; 
    // Add only one new option
    newValues[fieldIndex] = {
      ...newValues[fieldIndex],
      options: [...currentOptions, newOption]
    };  
    return newValues;
  });
}, []);
const removeOption = useCallback((fieldIndex, optionIndex) => {
  setFieldValues(prev => {
    const newValues = JSON.parse(JSON.stringify(prev));
    // Add proper existence checks
    if (newValues[fieldIndex] && newValues[fieldIndex].options && newValues[fieldIndex].options.length) {
      const removedOptionLabel = newValues[fieldIndex].options[optionIndex]?.label;
      newValues[fieldIndex].options = newValues[fieldIndex].options
        .filter((_, idx) => idx !== optionIndex);      
      // Clear default value if it was the removed option
      if (newValues[fieldIndex].defaultValue === removedOptionLabel) {
        newValues[fieldIndex].defaultValue = "";
      }      
      if (newValues[fieldIndex].options.length === 0) {
        newValues[fieldIndex].options = [];
      }
    }    
    return newValues;
  });
}, []);
const handleOptionChange = (fieldIndex, optionIndex, key, value, fieldType) => {
  setFieldValues(prev => { 
    const newValues = {...prev};   
    // Ensure the field exists
    if (!newValues[fieldIndex]) {
      newValues[fieldIndex] = {};
    }
    // Ensure options array exists and is an array
    if (!Array.isArray(newValues[fieldIndex].options)) {
      newValues[fieldIndex].options = [];
    }        
    // If we're trying to update an option that doesn't exist, create it
    if (!newValues[fieldIndex].options[optionIndex]) {
      const newOption = fieldType === 'radio' 
        ? { label: '', value: '' } 
        : { label: '', value: '', group: '' };  
      // Ensure we have enough slots in the array
      while (newValues[fieldIndex].options.length <= optionIndex) {
        newValues[fieldIndex].options.push({...newOption});
      }
    }    
    // Update the specific option
    newValues[fieldIndex].options = newValues[fieldIndex].options.map((opt, idx) => 
      idx === optionIndex ? { ...opt, [key]: value } : opt
    );    
    return newValues;
  });
};
  const handleDrop = (e, targetIndex = null) => {
  e.preventDefault();
  e.stopPropagation(); 
  const data = e.dataTransfer.getData('text/plain');
  if (!data) return;  
  const element = JSON.parse(data);
  const newElement = {
    ...element,
    icon: iconMap[element.iconType] || iconMap['block'] 
  };  
  if (targetIndex !== null && element.title.toLowerCase() !== 'block') {
    setNestedFields(prev => ({
      ...prev,
      [targetIndex]: [...(prev[targetIndex] || []), newElement]
    }));
    
    // Initialize field values for the new nested element
    const nestedKey = `${targetIndex}-${(prev[targetIndex] || []).length}`;
    setFieldValues(prevValues => ({
      ...prevValues,
      [nestedKey]: {
        label: '',
        id: '',
        name: '',
        type: '',
        options: ['select', 'radio'].includes(element.title.toLowerCase()) 
          ? [{ label: '', value: '', group: '' }]
          //? [{ label: '', value: '', ...(element.title.toLowerCase() !== 'radio' && { group: '' }) }]
          : undefined,
        ...prevValues[nestedKey]
      }
    }));
  } else if (targetIndex === null) {
    onDrop(newElement);
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
      setNestedCollapse(!nestedCollapse)
    } else {
      setElementsOpen(prev => ({
        ...prev,
        [index]: !prev[index]
      })); 
      setCollapse(!collapse)      
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
      const newElement = {...originalElement};      
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
    const newElement = {...droppedElements[index]};    
    // Copy the nested fields if they exist
    const nestedFieldsCopy = nestedFields[index] ? [...nestedFields[index]] : [];    
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
    if (colorPalette === pickerKey) {
      setColorPalette(null);
    } else {
      setColorPalette(pickerKey);
    }
    if (colorRgba === pickerKey) {
      setColorRgba(null);
    } else {
      setColorRgba(pickerKey);
    }
  };

  const renderInputFields = (element, index) => {
    const type = element.title.toLowerCase();
    const isBlock = type === 'block';
    const values = fieldValues[index] || {};
    // Common fields for non-block elements
    const commonFields = !isBlock ? (
      <>
        <div className="mb-4">
          <label>Label <span className="text-red-500">*</span></label>
          <input 
            placeholder="Enter Label"
            type="text" 
            value={values.label || ''} 
            onChange={(e) => handleFieldChange(index, 'label', e.target.value, 'id')} 
            className=" bg-stone-700 h-12 p-3 w-full required"
          />
        </div>
        <div className="mb-4">
          <label>ID <span className="text-red-500">*</span></label>
          <input 
            placeholder="Enter ID"
            type="text" 
            value={values.id || ''}
            onChange={(e) => handleFieldChange(index, 'id', e.target.value)}
            className="bg-stone-700 h-12 p-3 w-full required" 
          />
        </div>
      </>
    ) : (
      // Block element fields
      <>
        <div className="mb-4">
          <label>Name <span className="text-red-500">*</span></label>
          <input 
            placeholder="Enter Name"
            type="text" 
            value={values.name || ''}
            onChange={(e) => handleFieldChange(index, 'name', e.target.value, 'type')}
            className="bg-stone-700 h-12 p-3 w-full required" 
          />
        </div>
        <div className="mb-4">
          <label>Type <span className="text-red-500">*</span></label>
          <input 
            placeholder="Enter Type"
            type="text" 
            value={values.type || ''}
            onChange={(e) => handleFieldChange(index, 'type', e.target.value)}
            className="bg-stone-700 h-12 p-3 w-full required" 
          />
        </div>
      </>
    );
    // Info field (appears last for all elements except blocks)
    const infoField = !isBlock && (
      <div className="mb-4">
        <label>Info</label>
        <textarea 
          placeholder="Enter Info Value"
          value={values.info || ''}
          onChange={(e) => handleFieldChange(index, 'info', e.target.value)}
          className=" bg-stone-700 h-24 p-3 w-full" style={{'scrollbarWidth' : 'none'}}
        />
      </div>
    );
    // Type-specific fields
    let typeSpecificFields = null;
    switch(type) { 

        case 'text':
      case 'textarea':
      case 'number':
        typeSpecificFields = (
          <>
            <div className="mb-4">
              <label>Placeholder</label>
              <input 
                placeholder="Enter Placeholder"
                type="text" 
                value={values.placeholder || ''}
                onChange={(e) => handleFieldChange(index, 'placeholder', e.target.value)}
                className="bg-stone-700 h-12 p-3 w-full" 
              />
            </div>
            <div className="mb-4">
              <label>Default</label>
              <input 
                placeholder="Enter Default Value"
                type={type === 'number' ? 'number' : 'text'} 
                value={values.defaultValue || ''}
                onChange={(e) => handleFieldChange(index, 'defaultValue', e.target.value)}
                className="flex-wrap bg-stone-700 h-12 p-3 w-full"
              />
            </div>
          </>
        );
        break;

       case 'html':
        typeSpecificFields = (
          <div className="mb-4">
            <label>Placeholder</label>
            <input 
              placeholder="Enter Placeholder"
              type="text" 
              value={values.placeholder || ''}
              onChange={(e) => handleFieldChange(index, 'placeholder', e.target.value)}
              className="bg-stone-700 h-12 p-3 w-full" 
            />
          </div>
        );
        break;
         
      case 'video url': {
      const acceptValues = values.accept || [];
  
      typeSpecificFields = (
      <>
      <div className="mb-4">
        <label>Accept</label>
        <Menu as="div" className="relative bg-stone-700 min-h-12 p-3 rounded cursor-pointer">
          <MenuButton className="flex flex-wrap items-center w-full gap-2 text-white focus:outline-none focus:ring-0">
            {acceptValues.length === 0 ? (
              "Enter the Disable Group Value"
            ) : (
              acceptValues.map((item) => (
                <span key={item} 
                  className="bg-white text-black text-sm px-2 py-1 rounded-full flex items-center">{item}
                  <XMarkIcon
                    onClick={(e) => {
                      e.stopPropagation()
                      const updatedValues = acceptValues.filter((i) => i !== item);
                      handleFieldChange(index, 'accept', updatedValues);
                    }}
                    className="w-4 h-4 ml-1 cursor-pointer hover:text-red-400"/>
                </span>
              ))
            )}
            <ChevronDownIcon className="ml-auto size-6 text-white" />
          </MenuButton>
          <MenuItems className="absolute w-full top-13 left-0 z-10 rounded bg-stone-700 text-white focus:outline-none focus:ring-0">
            {["Youtube","Vimeo"].map((item) => (
              <MenuItem key={item}>
                {({ focus }) => (
                  <div
                    onClick={() => {
                      if (acceptValues.includes(item)) {
                        const updatedValues = acceptValues.filter((i) => i !== item);
                        handleFieldChange(index, 'accept', updatedValues);
                      } else {
                        const updatedValues = [...acceptValues, item];
                        handleFieldChange(index, 'accept', updatedValues);
                      }
                    }}
                    className={`block px-4 py-2 cursor-pointer ${focus || acceptValues.includes(item) 
                      ? 'bg-white text-stone-700 font-medium' 
                      : ''}`}>{item}</div>
                )}
              </MenuItem>
            ))}
          </MenuItems>
        </Menu>        
       </div>
       <div className="mb-4">
        <label>Placeholder</label>
        <input 
          placeholder="Enter Placeholder"
          type="text" 
          value={values.placeholder || ''}
          onChange={(e) => handleFieldChange(index, 'placeholder', e.target.value)}
          className="bg-stone-700 h-12 p-3 w-full" 
        />        
       </div>
      </>
      );
      break;
      }
      
      case 'text alignment':
      case 'checkbox':
      case 'font picker': {   
        const options = {
          'text alignment': ['Center', 'Left', 'Right'],
          'checkbox': ['True', 'False'],
          'font picker': [
            'Mono', 
            'Sans-serif', 
            'Serif', 
            'Bitter', 
            'Bitter Italic', 
            'Bitter Bold', 
            'Open Sans', 
            'Times New Roman', 
            'Raleway'
          ]
        }[type];

        typeSpecificFields = (
          <div className="mb-4">
            <label>Default</label>
            <Menu as="div" className="relative flex bg-stone-700 h-12 p-3 cursor-pointer">
              <MenuButton className="flex justify-between items-center w-full text-white focus:outline-none focus:ring-0">
                {values.defaultValue || "Select default value"}
                <ChevronDownIcon aria-hidden="true" className="-mr-1 size-6 text-white ml-2" />
              </MenuButton>
              <MenuItems className="absolute w-full top-13 left-0 rounded bg-stone-700 text-white focus:outline-none focus:ring-0 max-h-42 overflow-y-auto"
                         style={{'scrollbarWidth' : 'none'}}> 
                <div>
                  {options.map((item) => (
                    <MenuItem key={item}>
                      <li
                        onClick={() => handleFieldChange(index, 'defaultValue', item)}
                        className="block px-4 py-2 cursor-pointer hover:bg-white hover:text-stone-700"
                      >
                        {item}
                      </li>
                    </MenuItem>
                  ))}
                </div>
              </MenuItems>
            </Menu>
          </div>
        );
        break;
      }

     case 'select':
     case 'radio': {
     const options = values.options || [{ label: '', value: '', ...(type !== 'radio' && { group: '' }) }];

     typeSpecificFields = (
     <>
      <div className="mb-4 border-1 border-white px-2">
        <h2 className="font-semibold text-lg my-2">Options</h2>
        
        {options.map((option, optionIndex) => (
          <div key={optionIndex} className="flex gap-5 border-t-1 border-t-white py-2">
            <div className="flex-1">
              <label>Label</label>
              <input 
                placeholder="Enter Label"
                type="text" 
                value={option.label || ''}
                onChange={(e) => handleOptionChange(index, optionIndex, 'label', e.target.value, type)}
                className="bg-stone-700 h-12 p-3 w-full" 
              />   
              <label>Value</label>
              <input 
                placeholder="Enter Value"
                type="text" 
                value={option.value || ''}
                onChange={(e) => handleOptionChange(index, optionIndex, 'value', e.target.value, type)}
                className="bg-stone-700 h-12 p-3 w-full" 
              />  
              {type !== 'radio' && (
                <>
                  <label>Group</label>
                  <input 
                    placeholder="Enter Group"
                    type="text" 
                    value={option.group || ''}
                    onChange={(e) => handleOptionChange(index, optionIndex, 'group', e.target.value, type)}
                    className="bg-stone-700 h-12 p-3 w-full" 
                  />
                </>
              )}
            </div>
            <div className="flex items-center justify-center px-4">
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  removeOption(index, optionIndex);
                }}
                className="text-gray-600 p-[8px] rounded-full bg-stone-700 bg-opacity-[0.08] cursor-pointer"
              // disabled={options.length <= 1}
              >
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className="text-white" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path>
                </svg>
              </button>
            </div>
          </div>
        ))}  
      </div>

      <button 
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          addOption(index, type === 'radio');
        }}
        className="flex w-full py-2 text-lg justify-center items-center border-1 border-dotted border-white cursor-pointer mb-4"
      >
        + Add Option
      </button>
      
      <div className="my-4">
        <label>Default</label>
        <Menu as="div" className="relative flex bg-stone-700 h-12 p-3 cursor-pointer">
          <MenuButton className="flex justify-between items-center w-full text-white focus:outline-none focus:ring-0">
            {values.defaultValue || <span className="text-neutral-400">Select Default Value</span>}
            <ChevronDownIcon aria-hidden="true" className="-mr-1 size-6 text-white ml-2" />
          </MenuButton>
          <MenuItems className="absolute w-full top-13 left-0 z-10 rounded bg-stone-700 text-white focus:outline-none focus:ring-0">
            <div>       
             {options.length === 0 ? (
                <MenuItem>
                  <div className="block px-4 py-2 cursor-pointer hover:bg-white hover:text-stone-700">
                     <span className="text-neutral-400 flex justify-center">No Options</span>
                  </div>
                </MenuItem>
              ) : (
              options.map((option, idx) => (
                <MenuItem key={idx}>
                  <div onClick={() => handleFieldChange(index, 'defaultValue', option.label)}
                      className="block px-4 py-2 cursor-pointer hover:bg-white hover:text-stone-700" 
                  >{option.label}
                  </div>
                </MenuItem>
              ))
              )}
            </div>
          </MenuItems>
        </Menu>
      </div>
    </>
    );
    break;
    }
      
      case 'range':
        typeSpecificFields = (
          <>
            <div className="space-y-4">
              <div>
                <label>Min</label>
                <input 
                  placeholder="Enter Min Value"
                  type="number" 
                  min="0" 
                  value={values.min || ''}
                  onChange={(e) => handleFieldChange(index, 'min', e.target.value)}
                  className="bg-stone-700 h-12 p-3 w-full" 
                />
              </div>
              <div>
                <label>Max</label>
                <input  
                  placeholder="Enter Max Value"
                  type="number" 
                  min="0" 
                  value={values.max || ''}
                  onChange={(e) => handleFieldChange(index, 'max', e.target.value)}
                  className="bg-stone-700 h-12 p-3 w-full" 
                />
              </div>
              <div>
                <label>Step</label>
                <input 
                  placeholder="Enter Step Value"
                  type="number" 
                  min="0" 
                  value={values.step || ''}
                  onChange={(e) => handleFieldChange(index, 'step', e.target.value)}
                  className="bg-stone-700 h-12 p-3 w-full" 
                />
              </div>
              <div>
                <label>Unit</label>
                <input 
                  placeholder="Enter Unit Value"
                  type="text" 
                  value={values.unit || ''}
                  onChange={(e) => handleFieldChange(index, 'unit', e.target.value)}
                  className="bg-stone-700 h-12 p-3 w-full" 
                />
              </div>
              <div className="mb-4">
                <label>Default</label>
                <input 
                  placeholder="Enter Default Value"
                  type="number" 
                  min="0" 
                  value={values.defaultValue || ''}
                  onChange={(e) => handleFieldChange(index, 'defaultValue', e.target.value)}
                  className="bg-stone-700 h-12 p-3 w-full" 
                />
              </div>
            </div>
          </>
        );
        break;

     case 'color':
       typeSpecificFields = (
         <>
          <div className="mb-4 flex gap-4 w-full relative">
            <div style={{ backgroundColor: values.colorPalette || '#ffffff' }}
              className="w-12 h-12 cursor-pointer rounded border border-gray-300" 
              onClick={() => toggleColorPicker(index, 'colorPalette')}
            ></div>
            <input type="text" value={values.colorPalette || '#ffffff'}
              onChange={(e) => handleFieldChange(index, 'colorPalette', e.target.value)}
              className="bg-stone-700 h-12 p-3 w-full text-white" 
            />
            {colorPalette === `${index}-colorPalette` && (
        
              <div className="absolute z-[9999] text-black" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>       
                <SketchPicker  width={294} className="text-center font-semibold text-md"
                  color={values.colorPalette || '#ffffff'}
                  onChangeComplete={(color) => {
                    handleFieldChange(index, 'colorPalette', color.hex);
                    setColorPalette(null);
                  }}
                  presetColors={[
                   '#D0021B', '#F5A623', '#F8E71C', '#8B572A', '#7ED321', 
                   '#417505', '#BD10E0', '#9013FE', '#4A90E2', '#50E3C2', 
                   '#B8E986', '#000000', '#4A4A4A', '#9B9B9B', '#FFFFFF',
                  '#C0C0C0', '#000080', '#0000FF', '#808000', '#008080'
                  ]} 
                />
              </div>
           )}
         </div>         
        </>
       );
      break;
  
        case 'color background':
        typeSpecificFields = (
          <>
            <div className="mb-4 flex gap-4 w-full relative">
              <div 
                style={{ backgroundColor: values.colorRgba || 'rgba(255,255,255,1)' }}
                className="w-12 h-12 cursor-pointer rounded border border-gray-300" 
                onClick={() => toggleColorPicker(index, 'colorRgba')}
              ></div>
              <input 
                type="text" 
                value={values.colorRgba || 'rgba(255,255,255,1)'}
                onChange={(e) => handleFieldChange(index, 'colorRgba', e.target.value)}
                className="bg-stone-700 h-12 p-3 w-full text-white" 
              />
              {colorRgba === `${index}-colorRgba` && ( 

                 <div className="absolute z-[9999] text-black" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}> 
                  <SketchPicker width={294} className="text-center font-semibold text-md"
                    color={values.colorRgba || 'rgba(255,255,255,1)'}
                    onChangeComplete={(color) => {
                      const rgba = `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`;
                      handleFieldChange(index, 'colorRgba', rgba);
                      setColorRgba(null);
                    }}
                    presetColors={[
                      '#D0021B', '#F5A623', '#F8E71C', '#8B572A', '#7ED321', 
                      '#417505', '#BD10E0', '#9013FE', '#4A90E2', '#50E3C2', 
                      '#B8E986', '#000000', '#4A4A4A', '#9B9B9B', '#FFFFFF',
                      '#C0C0C0', '#000080', '#0000FF', '#808000', '#008080'
                    ]} 
                  />
                </div>
              )}
            </div>
          </>
        );
        break;
      
      case 'header':
        return (
          <div className="mb-4">
            <label>Content</label>
            <input 
              placeholder="Enter Content"
              value={values.content || ''}
              onChange={(e) => handleFieldChange(index, 'content', e.target.value)}
              className="bg-stone-700 h-12 p-3 w-full" 
            />
          </div>
        );
      
      case 'product list':
      case 'collection list':
        typeSpecificFields = (
          <div className="mb-4">
            <label>Limit</label>
            <input 
              placeholder="Enter Limit"
              type="number" 
              min="0" 
              value={values.limit || ''}
              onChange={(e) => handleFieldChange(index, 'limit', e.target.value)}
              className="bg-stone-700 h-12 p-3 w-full" 
            />
          </div>
        );
        break;
      
      case 'metaobject':
        typeSpecificFields = (
          <div className="mb-4">
            <label>Metaobject_type</label>
            <input 
              placeholder="Enter Metaobject Type"
              type="text" 
              value={values.metaobjectType || ''}
              onChange={(e) => handleFieldChange(index, 'metaobjectType', e.target.value)}
              className="bg-stone-700 h-12 p-3 w-full" 
            />
          </div>
        );
        break;
      
      case 'metaobject list':
        typeSpecificFields = (
          <>
            <div className="mb-4">
              <label>Metaobject_type</label>
              <input 
                placeholder="Enter Metaobject Type"
                type="text" 
                value={values.metaobjectType || ''}
                onChange={(e) => handleFieldChange(index, 'metaobjectType', e.target.value)}
                className="bg-stone-700 h-12 p-3 w-full" 
              />
            </div>
            <div className="mb-4">
              <label>Limit</label>
              <input 
                placeholder="Enter Limit"
                type="number" 
                min="0" 
                value={values.limit || ''}
                onChange={(e) => handleFieldChange(index, 'limit', e.target.value)}
                className="bg-stone-700 h-12 p-3 w-full" 
              />
            </div>
          </>
        );
        break;  
        
      case 'rich text':
      case 'inline richtext': {
        const isInlineRichText = type === 'inline richtext';
        
        const handleFormat = (format, event) => {
          event.preventDefault();
          const editor = document.getElementById(`richtext-${index}`);
          if (!editor) return;
          editor.focus();
          switch (format) {
          case 'bold':
            document.execCommand('bold', false, null);
            break;
          case 'italic':
            document.execCommand('italic', false, null);
            break;
          case 'underline':
            document.execCommand('underline', false, null);
            break;

          case 'bullet': {
            const selection = window.getSelection();
            if (!selection.rangeCount) return;
            const range = selection.getRangeAt(0);
            // Insert a marker span to remember cursor position
            const marker = document.createElement('span');
            marker.id = 'cursor-marker';
            marker.appendChild(document.createTextNode('\u200B')); // zero-width space
            range.insertNode(marker);
            editor.focus();
            document.execCommand('insertUnorderedList', false, null);
            // Restore cursor to marker position and remove marker
            setTimeout(() => {
              const markerEl = document.getElementById('cursor-marker');
              if (markerEl) {
                const newRange = document.createRange();
                newRange.setStartAfter(markerEl);
                newRange.collapse(true);
                selection.removeAllRanges();
                selection.addRange(newRange);
                markerEl.parentNode.removeChild(markerEl);
              }
              // Optional: style the list
              const lists = editor.getElementsByTagName('ul');
              if (lists.length > 0) {
                const lastList = lists[lists.length - 1];
                lastList.style.listStyleType = 'disc';
                lastList.style.paddingLeft = '40px';
                lastList.style.margin = '0';

                const listItems = lastList.getElementsByTagName('li');
                for (let li of listItems) {
                  li.style.margin = '2px 0';
                  li.style.display = 'list-item'; 
                }
              }
              handleFieldChange(index, 'defaultValue', editor.innerHTML);
            }, 0);
            break;
          }
          case 'url': {
            const url = prompt('Enter URL:', 'https://');
            if (url) {
              document.execCommand('createLink', true, url);
            }
            break;
          }
          default:
          break;
          } 
          handleFieldChange(index, 'defaultValue', editor.innerHTML);
        };
        const handleKeyDown = (e) => {
          const editor = e.currentTarget;
          if (e.key === 'Enter') {
            const selection = window.getSelection();
            if (!selection.rangeCount) return;

            const range = selection.getRangeAt(0);
            let node = range.commonAncestorContainer;
            let listItem = null;
            while (node && node !== editor) {
              if (node.nodeName === 'LI') {
              listItem = node;
              break;
              }
              node = node.parentNode;
            }
            if (listItem) {
              const textContent = listItem.textContent.trim();
              if (textContent === '' && listItem.innerHTML !== '<br>') {
                e.preventDefault();
                const list = listItem.parentNode;
                const newDiv = document.createElement('div');
                newDiv.innerHTML = '<br>';
                if (listItem === list.lastChild && list.children.length === 1) {
                  list.parentNode.replaceChild(newDiv, list);
                } else {
                  list.removeChild(listItem);
                  if (list.children.length === 0) {
                    list.parentNode.removeChild(list);
                  }
                  list.parentNode.insertBefore(newDiv, list.nextSibling);
                }
                const newRange = document.createRange();
                newRange.setStart(newDiv, 0);
                newRange.collapse(true);
                selection.removeAllRanges();
                selection.addRange(newRange);
                handleFieldChange(index, 'defaultValue', editor.innerHTML);
                return;
              }
            }
            setTimeout(() => {
              handleFieldChange(index, 'defaultValue', editor.innerHTML);
            }, 0);
          }
        };
        const initializeEditor = (editorElement) => {
          if (!editorElement.innerHTML.trim()) {
            editorElement.innerHTML = '<div><br></div>';
          }
        };
        typeSpecificFields = (
        <>
        <div className="bg-stone-700 border-gray-400 border-1 mb-4">
          <div className="flex flex-wrap items-center p-1 border-b border-gray-400">
            <div className="flex space-x-0">
              <button
                onClick={(e) => handleFormat('bold', e)}
                className="h-8 w-8 flex items-center justify-center rounded hover:bg-gray-600 font-bold cursor-pointer"
                title="Bold"
              >
              B
              </button>

              <button
               onClick={(e) => handleFormat('italic', e)}
               className="h-8 w-8 flex items-center justify-center rounded hover:bg-gray-600 italic cursor-pointer"
               title="Italic"
              >
              I
              </button>

             {!isInlineRichText && (
              <button
                onClick={(e) => handleFormat('underline', e)}
                className="h-8 w-8 flex items-center justify-center rounded hover:bg-gray-600 underline cursor-pointer"
                title="Underline"
              >
                U
              </button>
             )}
              <button
                onClick={(e) => handleFormat('url', e)}
                className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-600 cursor-pointer"
                title="Insert Link"
              >
               <svg viewBox="0 0 18 18" className="w-5 h-5" fill="none">
                <line className="stroke-white" x1="7" x2="11" y1="7" y2="11"></line>
                <path className="stroke-white" d="M8.9,4.577a3.476,3.476,0,0,1,.36,4.679A3.476,3.476,0,0,1,4.577,8.9C3.185,7.5,2.035,6.4,4.217,4.217S7.5,3.185,8.9,4.577Z"></path>
                <path className="stroke-white" d="M13.423,9.1a3.476,3.476,0,0,0-4.679-.36,3.476,3.476,0,0,0,.36,4.679c1.392,1.392,2.5,2.542,4.679.36S14.815,10.5,13.423,9.1Z"></path>
               </svg>
              </button>
             {!isInlineRichText && (
              <button
                onClick={(e) => handleFormat('bullet', e)}
                className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-600 cursor-pointer"
                title="Bullet List"
              >
                <svg viewBox="0 0 18 18" className="w-4 h-4">
                  <line stroke="currentcolor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="6" x2="15" y1="4" y2="4"></line>
                  <line stroke="currentcolor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="6" x2="15" y1="9" y2="9"></line>
                  <line stroke="currentcolor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="6" x2="15" y1="14" y2="14"></line>
                  <line stroke="currentcolor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="3" x2="3" y1="4" y2="4"></line>
                  <line stroke="currentcolor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="3" x2="3" y1="9" y2="9"></line>
                  <line stroke="currentcolor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="3" x2="3" y1="14" y2="14"></line>
                </svg>
              </button>
             )}
            </div>
          </div>
          <div className="p-3 min-h-11">
            <div
              id={`richtext-${index}`}
              contentEditable
              onInput={(e) => handleFieldChange(index, 'defaultValue', e.target.innerHTML)}
              onKeyDown={handleKeyDown}
              onFocus={(e) => initializeEditor(e.target)}
              className="bg-transparent h-full outline-none resize-none richtext-editor"
            />
          </div>
        </div>
       </>
       );
       break;
      }  

      case 'block':
      default:
        break;
    }

    return (
      <>
        {commonFields}
        {typeSpecificFields}
        {infoField}
        
        {/* Nested fields section for block elements */}
        {isBlock && (
          <>
            <div className="mb-4">
              <label>Limit</label>
              <input 
                placeholder="Enter Limit"
                type="number" 
                min="0" 
                value={values.limit || ''}
                onChange={(e) => handleFieldChange(index, 'limit', e.target.value)}
                className="bg-stone-700 h-12 p-3 w-full" 
              />
            </div>
            <label className="font-semibold text-md">Nested Fields</label>
            <div 
              className="nested-drop-zone my-4 mx-3 min-h-24 border-1 border-gray-300 border-dashed rounded p-2"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
            >
              {(nestedFields[index] || []).length === 0 ? (
                <p className="p-3 font-bold text-center text-gray-300 text-xl">
                  Drag fields here 
                </p>
              ) : (
                <div className="space-y-2">
                  {(nestedFields[index] || []).map((nestedEl, nestedIndex) => 
                    renderElement(nestedEl, nestedIndex, true, index)
                  )}
                </div>
              )}
            </div>
          </>
        )}
      </>
    );
  };
  const renderElement = (element, index, isNested = false, parentIndex = null) => {
    const isExpanded = isNested 
      ? expandedNested[parentIndex]?.[index] 
      : elementsOpen[index]; 
    // Get current values for dynamic title
    const currentValues = fieldValues[isNested ? `${parentIndex}-${index}` : index] || {};
    const displayTitle = element.title.toLowerCase() === 'block' 
      ? currentValues.name
      : currentValues.label
    return (
      <div key={isNested ? `${parentIndex}-${index}` : index} className="basis-6/12 w-full overflow-hidden">
        <div className="bg-stone-800 py-1 px-4 flex items-center group">
          <div className="bg-stone-900 p-1 rounded-sm mr-3">
            <span className="text-light-bg text-2xl">{element.icon}</span>
          </div>
          <div className="flex-1 ms-2 ">
            <h4 className="font-semibold text-lg ">{displayTitle}</h4>
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
          <div className="w-full bg-stone-950 py-6 px-4">
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
          <div className="p-3 space-y-2 overflow-y-auto h-full" style={{"scrollbarWidth":"none"}}>
            {droppedElements.map((el, index) => renderElement(el, index))}
          </div>
        )}
      </div>
    </div>
  );
});
export default SectionSchemaElements