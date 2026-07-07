import { useState, useEffect } from 'react'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import Settings from './Settings'
import Elements from './Elements'

const SectionSchemaGenerator = ({ resetTrigger, settingsData, setSettingsData, schemaType, setSchemaType }) => {
    const [settings, setSettings] = useState(true)
    const [elements, setElements] = useState(false)    
    
    // Reset to Settings tab when reset is triggered
    useEffect(() => {
        setSettings(true)
        setElements(false)
    }, [resetTrigger])    
    
    const handleSettingsClick = () => {
       setSettings(true)
       setElements(false)
    }    
    
    const handleElementsClick = () => {
       setSettings(false)
       setElements(true)
    }

     const handleGeneratorChange = (generator) => {
        setSchemaType(generator);
    }

    return (
        <div className="bg-stone-900 basis-3/12 rounded w-full overflow-hidden" >

            <div>
             <Menu as="div" className="relative flex bg-stone-700 h-12 py-2 px-4 font-semibold text-lg rounded cursor-pointer">
               <MenuButton className="flex justify-between items-center w-full text-white focus:outline-none focus:ring-0">
                {schemaType}
                  <ChevronDownIcon aria-hidden="true" className="-mr-1 size-6 text-white ml-2" />
               </MenuButton>
               <MenuItems className="absolute w-full top-13 left-0 z-10 rounded bg-stone-700 text-white focus:outline-none focus:ring-0">
               {["Section Schema Generator","Color Schema Generator"].map((item) => (
                 <MenuItem key={item}>
                 {({ focus }) => (
                  <div
                   onClick={() => handleGeneratorChange(item)} 
                   className={`block px-4 py-2 cursor-pointer ${focus ? 'bg-white text-stone-700' : ''}`}>{item}</div>
                 )}
                 </MenuItem>
               ))}
               </MenuItems>
             </Menu>
            </div>

            <div className="flex flex-row cursor-pointer p-3">
                <div 
                    className={`basis-1/2 text-center text-lg p-2 ${settings ? "bg-stone-700 border-b-2" : ""}`} 
                    onClick={handleSettingsClick}>Settings
                </div>
                <div 
                    className={`basis-1/2 text-center text-lg p-2 ${elements ? "bg-stone-700 border-b-2" : ""}`} 
                    onClick={handleElementsClick}>Elements
                </div>
            </div>

            <div style={{ scrollbarWidth: "none" }}>

                {settings && schemaType === 'Section Schema Generator' && 
                <Settings resetTrigger={resetTrigger} settingsData={settingsData} setSettingsData={setSettingsData} />}

                {elements && schemaType === 'Section Schema Generator' && 
                <Elements resetTrigger={resetTrigger} />}

            </div>
        </div>
    )
}
export default SectionSchemaGenerator
