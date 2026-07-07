import { useState, useEffect } from 'react'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

const ColorSettings = ({ resetTrigger, colorSettingsData, setColorSettingsData, colorElementsData }) => {
  // Initialize all state with default values from props
  const [colorSchemaName, setColorSchemaName] = useState(colorSettingsData.colorSchemaName || "Color Scheme Group")
  const [colorSchemeId, setColorSchemeId] = useState(colorSettingsData.colorSchemeId || "color_schemes")
  const [backgroundSolid, setBackgroundSolid] = useState(colorSettingsData.backgroundSolid || "")
  const [backgroundGradient, setBackgroundGradient] = useState(colorSettingsData.backgroundGradient || "")
  const [textColor, setTextColor] = useState(colorSettingsData.textColor || "")
  const [primaryButton, setPrimaryButton] = useState(colorSettingsData.primaryButton || "")
  const [onPrimaryButton, setOnPrimaryButton] = useState(colorSettingsData.onPrimaryButton || "")
  const [primaryButtonBorder, setPrimaryButtonBorder] = useState(colorSettingsData.primaryButtonBorder || "")
  const [secondaryButton, setSecondaryButton] = useState(colorSettingsData.secondaryButton || "")
  const [onSecondaryButton, setOnSecondaryButton] = useState(colorSettingsData.onSecondaryButton || "")
  const [secondaryButtonBorder, setSecondaryButtonBorder] = useState(colorSettingsData.secondaryButtonBorder || "")
  const [iconsColor, setIconsColor] = useState(colorSettingsData.iconsColor || "")
  const [linkColor, setLinkColor] = useState(colorSettingsData.linkColor || "")
  
  // Get dynamic labels from colorElementsData
  const colorLabels = colorElementsData?.colorLabels || []; // For Color type
  const backgroundColorLabels = colorElementsData?.backgroundColorLabels || []; // For Background Color type

  // Reset all fields when resetTrigger changes
  useEffect(() => {
    setColorSchemaName("Color Scheme Group")
    setColorSchemeId("color_schemes")
    setBackgroundSolid("")
    setBackgroundGradient("")
    setTextColor("")
    setPrimaryButton("")
    setOnPrimaryButton("")
    setPrimaryButtonBorder("")
    setSecondaryButton("")
    setOnSecondaryButton("")
    setSecondaryButtonBorder("")
    setIconsColor("")
    setLinkColor("") 
  }, [resetTrigger])
  
  // Update settings data when any setting changes
  useEffect(() => {
    if (setColorSettingsData) {
      setColorSettingsData({
        colorSchemaName,
        colorSchemeId,
        backgroundSolid,
        backgroundGradient,
        textColor,
        primaryButton,
        onPrimaryButton,
        primaryButtonBorder,
        secondaryButton,
        onSecondaryButton,
        secondaryButtonBorder,
        iconsColor,
        linkColor       
      });
    }
  }, [
    colorSchemaName, colorSchemeId, backgroundSolid, backgroundGradient, 
    textColor, primaryButton, onPrimaryButton, primaryButtonBorder, 
    secondaryButton, onSecondaryButton, secondaryButtonBorder, 
    iconsColor, linkColor, setColorSettingsData
  ])
  
  // Function to render dropdown menu items for Color type fields
  const renderColorMenuItems = (currentValue, setValue) => {
    const allOptions = [...colorLabels, "None"]; 
    
    return allOptions.map((option) => (
      <MenuItem key={option}>
        {({ focus }) => (
          <div
            onClick={() => setValue(option === "None" ? "None" : option)}
            className={`block px-4 py-2 cursor-pointer ${focus ? 'bg-white text-stone-700' : ''}`}>
            {option}
          </div>
        )}
      </MenuItem>
    ));
  };
  
  // Function to render dropdown menu items for Background Gradient field
  const renderBackgroundGradientMenuItems = (currentValue, setValue) => {
    const allOptions = [...backgroundColorLabels, "None"];
    
    return allOptions.map((option) => (
      <MenuItem key={option}>
        {({ focus }) => (
          <div
            onClick={() => setValue(option === "None" ? "" : option)}
            className={`block px-4 py-2 cursor-pointer ${focus ? 'bg-white text-stone-700' : ''}`}>
            {option}
          </div>
        )}
      </MenuItem>
    ));
  };
  
  return (
    <div className="p-3 overflow-y-scroll space-y-4 max-h-[650px]" style={{ scrollbarWidth: "none" }}>
      <label>Color Schema Name <span className="text-red-500">*</span></label>
      <input type="text"
        className="bg-stone-700 h-12 p-3 w-full rounded required" 
        value={colorSchemaName}
        onChange={(e) => setColorSchemaName(e.target.value)}/>
      
      <label>Color Scheme Id <span className="text-red-500">*</span></label>
      <input type="text"
        className="bg-stone-700 h-12 p-3 w-full rounded required" 
        value={colorSchemeId}
        onChange={(e) => setColorSchemeId(e.target.value)}/>     
      
      {/* Background Solid - shows Color type labels + None */}
      <label>Background Solid</label>
      <Menu as="div" className="relative flex bg-stone-700 h-12 p-3 rounded cursor-pointer">
        <MenuButton className="flex justify-between items-center w-full text-white focus:outline-none focus:ring-0">
          {backgroundSolid || <span className="text-neutral-400">Select Background</span>}
          <ChevronDownIcon aria-hidden="true" className="-mr-1 size-6 text-white ml-2" />
        </MenuButton>
        <MenuItems className="absolute w-full top-13 left-0 z-10 rounded bg-stone-700 text-white focus:outline-none focus:ring-0">
          {renderColorMenuItems(backgroundSolid, setBackgroundSolid)}
        </MenuItems>
      </Menu>     
      
      {/* Background Gradient - shows Background Color type labels + None */}
      <label>Background Gradient</label>
      <Menu as="div" className="relative flex bg-stone-700 h-12 p-3 rounded cursor-pointer">
        <MenuButton className="flex justify-between items-center w-full text-white focus:outline-none focus:ring-0">
          {backgroundGradient || <span className="text-neutral-400">Select Background</span>}
          <ChevronDownIcon aria-hidden="true" className="-mr-1 size-6 text-white ml-2" />
        </MenuButton>
        <MenuItems className="absolute w-full top-13 left-0 z-10 rounded bg-stone-700 text-white focus:outline-none focus:ring-0">
          {renderBackgroundGradientMenuItems(backgroundGradient, setBackgroundGradient)}
        </MenuItems>
      </Menu>
      
      {/* Text - shows Color type labels + None */}
      <label>Text</label>
      <Menu as="div" className="relative flex bg-stone-700 h-12 p-3 rounded cursor-pointer">
        <MenuButton className="flex justify-between items-center w-full text-white focus:outline-none focus:ring-0">
          {textColor || <span className="text-neutral-400">Select Text Color</span>}
          <ChevronDownIcon aria-hidden="true" className="-mr-1 size-6 text-white ml-2" />
        </MenuButton>
        <MenuItems className="absolute w-full top-13 left-0 z-10 rounded bg-stone-700 text-white focus:outline-none focus:ring-0">
          {renderColorMenuItems(textColor, setTextColor)}
        </MenuItems>
      </Menu>
      
      {/* Primary Button - shows Color type labels + None */}
      <label>Primary Button</label>
      <Menu as="div" className="relative flex bg-stone-700 h-12 p-3 rounded cursor-pointer">
        <MenuButton className="flex justify-between items-center w-full text-white focus:outline-none focus:ring-0">
          {primaryButton || <span className="text-neutral-400">Select Button Color</span>}
          <ChevronDownIcon aria-hidden="true" className="-mr-1 size-6 text-white ml-2" />
        </MenuButton>
        <MenuItems className="absolute w-full top-13 left-0 z-10 rounded bg-stone-700 text-white focus:outline-none focus:ring-0">
          {renderColorMenuItems(primaryButton, setPrimaryButton)}
        </MenuItems>
      </Menu>

      {/* On Primary Button - shows Color type labels + None */}
      <label>On Primary Button</label>
      <Menu as="div" className="relative flex bg-stone-700 h-12 p-3 rounded cursor-pointer">
        <MenuButton className="flex justify-between items-center w-full text-white focus:outline-none focus:ring-0">
          {onPrimaryButton || <span className="text-neutral-400">Select Button Color</span>}
          <ChevronDownIcon aria-hidden="true" className="-mr-1 size-6 text-white ml-2" />
        </MenuButton>
        <MenuItems className="absolute w-full top-13 left-0 z-10 rounded bg-stone-700 text-white focus:outline-none focus:ring-0">
          {renderColorMenuItems(onPrimaryButton, setOnPrimaryButton)}
        </MenuItems>
      </Menu>
      
      {/* Primary Button Border - shows Color type labels + None */}
      <label>Primary Button Border</label>
      <Menu as="div" className="relative flex bg-stone-700 h-12 p-3 rounded cursor-pointer">
        <MenuButton className="flex justify-between items-center w-full text-white focus:outline-none focus:ring-0">
          {primaryButtonBorder || <span className="text-neutral-400">Select Button Color</span>}
          <ChevronDownIcon aria-hidden="true" className="-mr-1 size-6 text-white ml-2" />
        </MenuButton>
        <MenuItems className="absolute w-full top-13 left-0 z-10 rounded bg-stone-700 text-white focus:outline-none focus:ring-0">
          {renderColorMenuItems(primaryButtonBorder, setPrimaryButtonBorder)}
        </MenuItems>
      </Menu>
      
      {/* Secondary Button - shows Color type labels + None */}
      <label>Secondary Button</label>
      <Menu as="div" className="relative flex bg-stone-700 h-12 p-3 rounded cursor-pointer">
        <MenuButton className="flex justify-between items-center w-full text-white focus:outline-none focus:ring-0">
          {secondaryButton || <span className="text-neutral-400">Select Button Color</span>}
          <ChevronDownIcon aria-hidden="true" className="-mr-1 size-6 text-white ml-2" />
        </MenuButton>
        <MenuItems className="absolute w-full top-13 left-0 z-10 rounded bg-stone-700 text-white focus:outline-none focus:ring-0">
          {renderColorMenuItems(secondaryButton, setSecondaryButton)}
        </MenuItems>
      </Menu>
      
      {/* On Secondary Button - shows Color type labels + None */}
      <label>On Secondary Button</label>
      <Menu as="div" className="relative flex bg-stone-700 h-12 p-3 rounded cursor-pointer">
        <MenuButton className="flex justify-between items-center w-full text-white focus:outline-none focus:ring-0">
          {onSecondaryButton || <span className="text-neutral-400">Select Button Color</span>}
          <ChevronDownIcon aria-hidden="true" className="-mr-1 size-6 text-white ml-2" />
        </MenuButton>
        <MenuItems className="absolute w-full top-13 left-0 z-10 rounded bg-stone-700 text-white focus:outline-none focus:ring-0">
          {renderColorMenuItems(onSecondaryButton, setOnSecondaryButton)}
        </MenuItems>
      </Menu>
      
      {/* Secondary Button Border - shows Color type labels + None */}
      <label>Secondary Button Border</label>
      <Menu as="div" className="relative flex bg-stone-700 h-12 p-3 rounded cursor-pointer">
        <MenuButton className="flex justify-between items-center w-full text-white focus:outline-none focus:ring-0">
          {secondaryButtonBorder || <span className="text-neutral-400">Select Button Color</span>}
          <ChevronDownIcon aria-hidden="true" className="-mr-1 size-6 text-white ml-2" />
        </MenuButton>
        <MenuItems className="absolute w-full top-13 left-0 z-10 rounded bg-stone-700 text-white focus:outline-none focus:ring-0">
          {renderColorMenuItems(secondaryButtonBorder, setSecondaryButtonBorder)}
        </MenuItems>
      </Menu>
      
      {/* Icons - shows Color type labels + None */}
      <label>Icons</label>
      <Menu as="div" className="relative flex bg-stone-700 h-12 p-3 rounded cursor-pointer">
        <MenuButton className="flex justify-between items-center w-full text-white focus:outline-none focus:ring-0">
          {iconsColor || <span className="text-neutral-400">Select Icons Color</span>}
          <ChevronDownIcon aria-hidden="true" className="-mr-1 size-6 text-white ml-2" />
        </MenuButton>
        <MenuItems className="absolute w-full top-13 left-0 z-10 rounded bg-stone-700 text-white focus:outline-none focus:ring-0">
          {renderColorMenuItems(iconsColor, setIconsColor)}
        </MenuItems>
      </Menu>
      
      {/* Link - shows Color type labels + None */}
      <label>Link</label>
      <Menu as="div" className="relative flex bg-stone-700 h-12 p-3 rounded cursor-pointer">
        <MenuButton className="flex justify-between items-center w-full text-white focus:outline-none focus:ring-0">
          {linkColor || <span className="text-neutral-400">Select Link Color</span>}
          <ChevronDownIcon aria-hidden="true" className="-mr-1 size-6 text-white ml-2" />
        </MenuButton>
        <MenuItems className="absolute w-full top-13 left-0 z-10 rounded bg-stone-700 text-white focus:outline-none focus:ring-0">
          {renderColorMenuItems(linkColor, setLinkColor)}
        </MenuItems>
      </Menu>    
    </div> 
  )
}

export default ColorSettings