// import SchemaColor from './SchemaColor';
// import { useRef, useState, useEffect } from 'react';

// const ColorSchemaGroup = ({ onReset, resetTrigger, colorSettingsData, colorElementsData }) => {
//   const schemaRef = useRef(null);
//   const [copy, setCopy] = useState(false);
//   const [reset, setReset] = useState(false)
//   const [fileName, setFileName] = useState("");

//   const handleCopyClick = () => {
//     if (schemaRef.current) {
//       const content = schemaRef.current.textContent || '';
//       navigator.clipboard.writeText(content)
//         .then(() => setCopy(true))
//         .catch(err => console.error('Failed to copy: ', err));
//     }
//   };

//   const handleDownloadClick = () => {
//     if (schemaRef.current) {
//       const content = schemaRef.current.textContent || '';
//       const blob = new Blob([content], { type: 'text/plain' });
//       const url = URL.createObjectURL(blob);
//       const a = document.createElement('a');
//       a.href = url;
//       a.download = `${fileName || 'color-scheme-group'}.liquid`;
//       document.body.appendChild(a);
//       a.click();
//       document.body.removeChild(a);
//       URL.revokeObjectURL(url);
//       setFileName("");
//     }
//   };

//   const handleResetClick = () => {
//     onReset();
//     setReset(true);
//   };

//   useEffect(() => {
//     if (copy || reset) {
//       const timer = setTimeout(() => {setCopy(false), setReset(false)}, 3000 );
//       return () => clearTimeout(timer);
//     }
//   }, [copy, reset]);

//   return (
//     <>
//       <div className="relative bg-stone-900 basis-3/12 rounded w-full overflow-hidden">

//         <div className="bg-stone-700 h-12 font-semibold text-center text-lg py-2 px-4">Color Schema Group</div>

//         <div className="flex-wrap">

//           <div className="space-y-1 p-2 overflow-y-scroll max-h-[650px]" style={{ scrollbarWidth: "none" }}>
//             <div ref={schemaRef} className="break-words">
//               <SchemaColor key={resetTrigger} colorSettingsData={colorSettingsData} colorElementsData={colorElementsData}/>
//             </div>
//           </div>

//           <div className="absolute flex w-full h-16 bg-stone-700 justify-between bottom-0">
//             <div className="flex h-16 p-2 justify-between">
//               <input className="border-1 bottom-0 focus:ring-0 focus:outline-0 p-2"
//                 placeholder="color-scheme-group"
//                 value={fileName}
//                 onChange={(e) => setFileName(e.target.value)}/>
//               <button onClick={handleDownloadClick}
//                 className="flex bg-amber-300 text-white font-bold text-lg w-24 cursor-pointer justify-center items-center space-x-1">
//                 <svg stroke="currentColor" fill="currentColor" viewBox="0 0 24 24" className="text-xl" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
//                   <path d="M19 12v7H5v-7H3v7c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2zm-6 .67 2.59-2.58L17 11.5l-5 5-5-5 1.41-1.41L11 12.67V3h2v9.67z"></path>
//                 </svg>
//                 <span>.liquid</span>
//               </button>
//             </div>
//             <button onClick={handleCopyClick}
//               className="h-12 w-12 p-2 m-2 border-2 border-green-700 rounded-full cursor-pointer" 
//               aria-label="Copy Section Schema" 
//               title="Copy Section Schema">
//               <svg stroke="currentColor" fill="currentColor" viewBox="0 0 24 24" className="text-green-700" height="30" width="30" xmlns="http://www.w3.org/2000/svg">
//                 <path d="M18 2H9c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h9c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H9V4h9v12zM3 15v-2h2v2H3zm0-5.5h2v2H3v-2zM10 20h2v2h-2v-2zm-7-1.5v-2h2v2H3zM5 22c-1.1 0-2-.9-2-2h2v2zm3.5 0h-2v-2h2v2zm5 0v-2h2c0 1.1-.9 2-2 2zM5 6v2H3c0-1.1.9-2 2-2z"></path>
//               </svg>
//             </button>
//             <button onClick={handleResetClick}
//               className="h-12 w-12 p-2 m-2 border-2 border-red-700 rounded-full cursor-pointer" 
//               aria-label="Reset Section Schema" 
//               title="Reset Section Schema">
//               <svg stroke="currentColor" fill="currentColor" viewBox="0 0 24 24" className="text-red-700" height="30" width="30" xmlns="http://www.w3.org/2000/svg">
//                 <path fill="none" d="M20,8 C18.5974037,5.04031171 15.536972,3 12,3 C7.02943725,3 3,7.02943725 3,12 C3,16.9705627 7.02943725,21 12,21 L12,21 C16.9705627,21 21,16.9705627 21,12 M21,3 L21,9 L15,9"></path>
//               </svg>
//             </button>
//           </div>

//         </div>
//       </div>

//       {copy && (
//         <div id="toast-success" className="flex absolute bottom-12 right-[42%] h-22 w-full justify-center items-center max-w-xs p-4 mb-4 text-gray-500  bg-white shadow-sm rounded" role="alert">
//           {/* Progress Line - Added this part */}
//         <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-200 rounded-b">
//           <div className="h-full bg-green-500 rounded-b"
//             style={{ width: '100%', animation: 'width 3s linear forwards', animationName: 'progressAnimation'}}>
//           </div>     
//           {/* Inline styles for the animation */}
//           <style>
//           {`
//             @keyframes progressAnimation {
//              0% { width: 100%; }
//              100% { width: 0%; }
//             }
//           `}
//           </style>
//         </div> 
//           <div className="inline-flex items-center justify-center shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg">
//             <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
//               <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
//             </svg><span className="sr-only">Check icon</span>
//           </div>
//           <div className="ms-3 text-md font-normal">Color Schema Group copied to clipboard successfully!</div>
//           <button 
//             onClick={() => setCopy(false)}
//             type="button" 
//             className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8" 
//             aria-label="Close"><span className="sr-only">Close</span>
//             <svg className="w-3 h-3 cursor-pointer" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
//               <path stroke="currentColor" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
//             </svg>
//           </button>
//         </div>
//       )}

//   {reset && (
//   <div id="toast-reset" className="flex absolute bottom-12 right-[42%] h-22 w-full justify-center items-center max-w-xs p-4 mb-4 text-gray-500 bg-white shadow-sm rounded" role="alert">
//     {/* Progress Line - Added this part */}
//     <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-200 rounded-b">
//       <div className="h-full bg-green-500 rounded-b"
//         style={{ width: '100%', animation: 'width 3s linear forwards', animationName: 'progressAnimation'}}>
//       </div>     
//       {/* Inline styles for the animation */}
//       <style>
//         {`
//           @keyframes progressAnimation {
//             0% { width: 100%; }
//             100% { width: 0%; }
//           }
//         `}
//       </style>
//     </div>   
//     <div className="inline-flex items-center justify-center shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg">
//       <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
//         <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 1v5h-5M2 19v-5h5m10-4a8 8 0 0 1-14.947 3.97M1 10a8 8 0 0 1 14.947-3.97"/>
//       </svg>
//       <span className="sr-only">Reset icon</span>
//     </div>
//     <div className="ms-3 text-md font-normal">Color Schema Group has been reset successfully!</div>
//     <button onClick={() => setReset(false)}
//       type="button" 
//       className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8" 
//       aria-label="Close"><span className="sr-only">Close</span>
//       <svg className="w-3 h-3 cursor-pointer" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
//         <path stroke="currentColor" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
//       </svg>
//     </button>
//   </div>
// )}
//     </>
//   );
// };

// export default ColorSchemaGroup



// ****************************************TEST CODE FOR SOME UPDATES IN COPY AND DOWNLOAD*********************************
//*************************************************************************************************************************



import SchemaColor from './SchemaColor';
import { useRef, useState, useEffect } from 'react';

const ColorSchemaGroup = ({ onReset, resetTrigger, colorSettingsData, colorElementsData, elementsRef }) => {
  const schemaRef = useRef(null);
  const [copy, setCopy] = useState(false);
  const [reset, setReset] = useState(false)
  const [fileName, setFileName] = useState("")
  const [validation, setValidation] = useState(null);

  const runValidation = () => {
    if (!elementsRef?.current) return true;

    const result = elementsRef.current.validate();
    if (!result.isValid) {
      setValidation(result.errors[0]); // show first error
      return false;
    }
    return true;
  };

  const handleCopyClick = () => {
    if (schemaRef.current) {

      if (!runValidation()) return;

      const content = schemaRef.current.textContent || '';
      navigator.clipboard.writeText(content)
        .then(() => setCopy(true))
        .catch(err => console.error('Failed to copy: ', err));
    }
  };

  const handleDownloadClick = () => {
    if (schemaRef.current) {

      if (!runValidation()) return;

      const content = schemaRef.current.textContent || '';
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${fileName || 'color-scheme-group'}.liquid`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setFileName("");
    }
  };

  const handleResetClick = () => {
    onReset();
    setReset(true);
  };

  useEffect(() => {
    if (copy || reset || validation) {
      const timer = setTimeout(() => {setCopy(false), setReset(false), setValidation(false)}, 3000 );
      return () => clearTimeout(timer);
    }
  }, [copy, reset, validation]);

  return (
    <>
      <div className="relative bg-stone-900 basis-3/12 rounded w-full overflow-hidden">

        <div className="bg-stone-700 h-12 font-semibold text-center text-lg py-2 px-4">Color Schema Group</div>

        <div className="flex-wrap">

          <div className="space-y-1 p-2 overflow-y-scroll max-h-[650px]" style={{ scrollbarWidth: "none" }}>
            <div ref={schemaRef} className="break-words">
              <SchemaColor key={resetTrigger} colorSettingsData={colorSettingsData} colorElementsData={colorElementsData}/>
            </div>
          </div>

          <div className="absolute flex w-full h-16 bg-stone-700 justify-between bottom-0">
            <div className="flex h-16 p-2 justify-between">
              <input className="border-1 bottom-0 focus:ring-0 focus:outline-0 p-2"
                placeholder="color-scheme-group"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}/>
              <button onClick={handleDownloadClick}
                className="flex bg-amber-300 text-white font-bold text-lg w-24 cursor-pointer justify-center items-center space-x-1">
                <svg stroke="currentColor" fill="currentColor" viewBox="0 0 24 24" className="text-xl" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 12v7H5v-7H3v7c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2zm-6 .67 2.59-2.58L17 11.5l-5 5-5-5 1.41-1.41L11 12.67V3h2v9.67z"></path>
                </svg>
                <span>.liquid</span>
              </button>
            </div>
            <button onClick={handleCopyClick}
              className="h-12 w-12 p-2 m-2 border-2 border-green-700 rounded-full cursor-pointer" 
              aria-label="Copy Section Schema" 
              title="Copy Section Schema">
              <svg stroke="currentColor" fill="currentColor" viewBox="0 0 24 24" className="text-green-700" height="30" width="30" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 2H9c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h9c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H9V4h9v12zM3 15v-2h2v2H3zm0-5.5h2v2H3v-2zM10 20h2v2h-2v-2zm-7-1.5v-2h2v2H3zM5 22c-1.1 0-2-.9-2-2h2v2zm3.5 0h-2v-2h2v2zm5 0v-2h2c0 1.1-.9 2-2 2zM5 6v2H3c0-1.1.9-2 2-2z"></path>
              </svg>
            </button>
            <button onClick={handleResetClick}
              className="h-12 w-12 p-2 m-2 border-2 border-red-700 rounded-full cursor-pointer" 
              aria-label="Reset Section Schema" 
              title="Reset Section Schema">
              <svg stroke="currentColor" fill="currentColor" viewBox="0 0 24 24" className="text-red-700" height="30" width="30" xmlns="http://www.w3.org/2000/svg">
                <path fill="none" d="M20,8 C18.5974037,5.04031171 15.536972,3 12,3 C7.02943725,3 3,7.02943725 3,12 C3,16.9705627 7.02943725,21 12,21 L12,21 C16.9705627,21 21,16.9705627 21,12 M21,3 L21,9 L15,9"></path>
              </svg>
            </button>
          </div>

        </div>
      </div>

      {copy && (
        <div id="toast-success" className="flex absolute bottom-12 right-[42%] h-22 w-full justify-center items-center max-w-xs p-4 mb-4 text-gray-500  bg-white shadow-sm rounded" role="alert">
          {/* Progress Line - Added this part */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-200 rounded-b">
          <div className="h-full bg-green-500 rounded-b"
            style={{ width: '100%', animation: 'width 3s linear forwards', animationName: 'progressAnimation'}}>
          </div>     
          {/* Inline styles for the animation */}
          <style>
          {`
            @keyframes progressAnimation {
             0% { width: 100%; }
             100% { width: 0%; }
            }
          `}
          </style>
        </div> 
          <div className="inline-flex items-center justify-center shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg">
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
            </svg><span className="sr-only">Check icon</span>
          </div>
          <div className="ms-3 text-md font-normal">Color Schema Group copied to clipboard successfully!</div>
          <button 
            onClick={() => setCopy(false)}
            type="button" 
            className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8" 
            aria-label="Close"><span className="sr-only">Close</span>
            <svg className="w-3 h-3 cursor-pointer" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
          </button>
        </div>
      )}

  {reset && (
  <div id="toast-reset" className="flex absolute bottom-12 right-[42%] h-22 w-full justify-center items-center max-w-xs p-4 mb-4 text-gray-500 bg-white shadow-sm rounded" role="alert">
    {/* Progress Line - Added this part */}
    <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-200 rounded-b">
      <div className="h-full bg-green-500 rounded-b"
        style={{ width: '100%', animation: 'width 3s linear forwards', animationName: 'progressAnimation'}}>
      </div>     
      {/* Inline styles for the animation */}
      <style>
        {`
          @keyframes progressAnimation {
            0% { width: 100%; }
            100% { width: 0%; }
          }
        `}
      </style>
    </div>   
    <div className="inline-flex items-center justify-center shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg">
      <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 1v5h-5M2 19v-5h5m10-4a8 8 0 0 1-14.947 3.97M1 10a8 8 0 0 1 14.947-3.97"/>
      </svg>
      <span className="sr-only">Reset icon</span>
    </div>
    <div className="ms-3 text-md font-normal">Color Schema Group has been reset successfully!</div>
    <button onClick={() => setReset(false)}
      type="button" 
      className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8" 
      aria-label="Close"><span className="sr-only">Close</span>
      <svg className="w-3 h-3 cursor-pointer" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
        <path stroke="currentColor" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
      </svg>
    </button>
  </div>
)}

{validation && (
        <div id="toast-validation" className="flex absolute bottom-12 right-[42%] h-22 w-full justify-center items-center max-w-xs p-4 mb-4 text-gray-500 bg-white shadow-sm rounded" role="alert">
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-200 rounded-b">
            <div className="h-full bg-red-400 rounded-b"
              style={{ width: '100%', animation: 'width 3s linear forwards', animationName: 'progressAnimation'}}>
            </div>     
            {/* Inline styles for the animation */}
            <style>
            {`
              @keyframes progressAnimation {
               0% { width: 100%; }
               100% { width: 0%; }
              }
            `}
            </style>
          </div>     
          <div className="inline-flex items-center justify-center shrink-0 w-8 h-8 text-green-500 rounded-lg">
            <svg viewBox="0 0 24 24" width="100%" height="100%" fill="red" >
              <path d="M11.983 0a12.206 12.206 0 00-8.51 3.653A11.8 11.8 0 000 12.207 11.779 11.779 0 0011.8 24h.214A12.111 12.111 0 0024 11.791 11.766 11.766 0 0011.983 0zM10.5 16.542a1.476 1.476 0 011.449-1.53h.027a1.527 1.527 0 011.523 1.47 1.475 1.475 0 01-1.449 1.53h-.027a1.529 1.529 0 01-1.523-1.47zM11 12.5v-6a1 1 0 012 0v6a1 1 0 11-2 0z"></path>
            </svg>
            <span className="sr-only">Validation icon</span> 
          </div>
          <div className="ms-3 text-md font-normal">{validation}</div>
          <button onClick={() => setValidation(false)}
            type="button" 
            className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8" 
            aria-label="Close"><span className="sr-only">Close</span>
            <svg className="w-3 h-3 cursor-pointer" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
          </button>
        </div>
      )}

    </>
  );
};

export default ColorSchemaGroup