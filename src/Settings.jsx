import { useState, useEffect } from 'react'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon, XMarkIcon } from '@heroicons/react/20/solid'

const Settings = ({ resetTrigger, settingsData, setSettingsData }) => {
  // Initialize all state with default values from props
  const [name, setName] = useState(settingsData.name || "My New Section")
  const [sectionClass, setSectionClass] = useState(settingsData.sectionClass || "")
  const [maxBlocks, setMaxBlocks] = useState(settingsData.maxBlocks || "")
  const [selectedTag, setSelectedTag] = useState(settingsData.selectedTag || "")
  const [selectedTemplates, setSelectedTemplates] = useState(settingsData.selectedTemplates || [])
  const [selectedGroup, setSelectedGroup] = useState(settingsData.selectedGroup || [])
  const [presets, setPresets] = useState(settingsData.presets || "My New Section")

  // Reset all fields when resetTrigger changes
  useEffect(() => {
    setName("My New Section")
    setSectionClass("")
    setMaxBlocks("")
    setSelectedTag("")
    setSelectedTemplates([])
    setSelectedGroup([])
    setPresets("My New Section")
  }, [resetTrigger])

  // Update settings data when any setting changes
  useEffect(() => {
    if (setSettingsData) {
      setSettingsData({
        name,
        sectionClass,
        maxBlocks,
        selectedTag,
        selectedTemplates,
        selectedGroup,
        presets
      });
    }
  }, [name, sectionClass, maxBlocks, selectedTag, selectedTemplates, selectedGroup, presets, setSettingsData])

  const handleSelectedTemplates = (item) => {
    if (selectedTemplates.includes(item)) {
      setSelectedTemplates(selectedTemplates.filter((i) => i !== item))
    } else {
      setSelectedTemplates([...selectedTemplates, item])
    }
  }

  const removeSelectedTemplates = (item) => {
    setSelectedTemplates(selectedTemplates.filter((i) => i !== item))
  }
  
const handleSelectedGroup = (item) => {
    if (selectedGroup.includes(item)) {
      setSelectedGroup(selectedGroup.filter((i) => i !== item))
    } else {
      setSelectedGroup([...selectedGroup, item])
    }
  }

  const removeSelectedGroup = (item) => {
    setSelectedGroup(selectedGroup.filter((i) => i !== item))
  }

  return (
    <div className="p-3 overflow-y-scroll max-h-[650px]" style={{ scrollbarWidth: "none" }}>

     {/* {!settings &&  */}
      <div className="space-y-4">
      <label>Name <span className="text-red-500">*</span></label>
      <input type="text"
        className="bg-stone-700 h-12 p-3 w-full rounded required" 
        value={name}
        onChange={(e) => setName(e.target.value)}/>
      
      <label>Class <span className="text-red-500">*</span></label>
      <input type="text"
        className="bg-stone-700 h-12 p-3 w-full rounded required" 
        value={sectionClass}
        onChange={(e) => setSectionClass(e.target.value)}/>
      
      <label>Max Blocks <span className="text-red-500">*</span></label>
      <input type="number" 
        min="0"
        className="bg-stone-700 h-12 p-3 w-full rounded required"  
        value={maxBlocks}
        onChange={(e) => setMaxBlocks(e.target.value)}/>
      
      <label>Tag</label>
      <Menu as="div" className="relative flex bg-stone-700 h-12 p-3 rounded cursor-pointer">
        <MenuButton className="flex justify-between items-center w-full text-white focus:outline-none focus:ring-0">
          {selectedTag || "Select Tag"}
          <ChevronDownIcon aria-hidden="true" className="-mr-1 size-6 text-white ml-2" />
        </MenuButton>
        <MenuItems className="absolute w-full top-13 left-0 z-10 rounded bg-stone-700 text-white focus:outline-none focus:ring-0">
          {["div", "article", "aside", "footer", "header", "section"].map((item) => (
            <MenuItem key={item}>
              {({ focus }) => (
                <div
                  onClick={() => setSelectedTag(item)}
                  className={`block px-4 py-2 cursor-pointer ${focus ? 'bg-white text-stone-700' : ''}`}>{item}</div>
              )}
            </MenuItem>
          ))}
        </MenuItems>
      </Menu>
      
      <label>Templates</label>
      <Menu as="div" className="relative bg-stone-700 min-h-12 p-3 rounded cursor-pointer">
        <MenuButton className="flex flex-wrap items-center w-full gap-2 text-white focus:outline-none focus:ring-0">
          {selectedTemplates.length === 0 ? (
            "Select Template"
          ) : (
            selectedTemplates.map((item) => (
              <span key={item}
                className="bg-white text-black text-sm px-2 py-1 rounded-full flex items-center">{item}
                <XMarkIcon
                  onClick={(e) => {
                    e.stopPropagation()
                    removeSelectedTemplates(item)
                  }}
                  className="w-4 h-4 ml-1 cursor-pointer hover:text-red-400"/>
              </span>
            ))
          )}
          <ChevronDownIcon className="ml-auto size-6 text-white" />
        </MenuButton>
        <MenuItems className="absolute w-full top-13 left-0 z-10 rounded bg-stone-700 text-white max-h-60 overflow-y-auto focus:outline-none focus:ring-0" 
                   style={{'scrollbarWidth':'none'}}>
          {["404", "article", "blog", "cart", "collection", "list-collections", "customers/account",
            "customers/activate_account", "customers/addresses", "customers/login", "customers/order",
            "customers/register", "customers/reset_password", "gift_card", "index", "page", "password",
            "policy", "product", "search"].map((item) => (
            <MenuItem key={item}>
              {({ focus }) => (
                <div
                  onClick={() => handleSelectedTemplates(item)}
                  className={`block px-4 py-2 cursor-pointer ${focus || selectedTemplates.includes(item) 
                    ? 'bg-white text-stone-700 font-medium' 
                    : ''}`}>{item}</div>
              )}
            </MenuItem>
          ))}
        </MenuItems>
      </Menu>
      
      <label>Presets</label>
      <input className="bg-stone-700 h-12 p-3 w-full rounded" 
        value={presets}
        onChange={(e) => setPresets(e.target.value)}/>

      <label>Disable Groups</label>
      <Menu as="div" className="relative bg-stone-700 min-h-12 p-3 rounded cursor-pointer">
        <MenuButton className="flex flex-wrap items-center w-full gap-2 text-white focus:outline-none focus:ring-0">
          {selectedGroup.length === 0 ? (
            "Enter the Disable Group Value"
          ) : (
            selectedGroup.map((item) => (
              <span key={item}
                className="bg-white text-black text-sm px-2 py-1 rounded-full flex items-center">{item}
                <XMarkIcon
                  onClick={(e) => {
                    e.stopPropagation()
                    removeSelectedGroup(item)
                  }}
                  className="w-4 h-4 ml-1 cursor-pointer hover:text-red-400"/>
              </span>
            ))
          )}
          <ChevronDownIcon className="ml-auto size-6 text-white" />
        </MenuButton>
        <MenuItems className="absolute w-full top-13 left-0 z-10 rounded bg-stone-700 text-white focus:outline-none focus:ring-0" >
          {["header", "footer", "aside"].map((item) => (
            <MenuItem key={item}>
              {({ focus }) => (
                <div
                  onClick={() => handleSelectedGroup(item)}
                  className={`block px-4 py-2 cursor-pointer ${focus || selectedGroup.includes(item) 
                    ? 'bg-white text-stone-700 font-medium' 
                    : ''}`}>{item}</div>
              )}
            </MenuItem>
          ))}
        </MenuItems>
      </Menu>
      </div> 
      {/* }

      {settings &&
        <div>
          hnyytyjjt 
        </div>} */}

    </div>
  )
}

export default Settings