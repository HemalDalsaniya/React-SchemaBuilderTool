import { useState, useEffect } from 'react'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon, XMarkIcon } from '@heroicons/react/20/solid'

const ColorSettings = ({ resetTrigger, colorSettingsData, setColorSettingsData }) => {
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
  }, [colorSchemaName, colorSchemeId, backgroundSolid, backgroundGradient, textColor, primaryButton, onPrimaryButton,
      primaryButtonBorder, secondaryButton, onSecondaryButton, secondaryButtonBorder, iconsColor, linkColor, setColorSettingsData])

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
      
      <label>Background Solid</label>
      <Menu as="div" className="relative flex bg-stone-700 h-12 p-3 rounded cursor-pointer">
        <MenuButton className="flex justify-between items-center w-full text-white focus:outline-none focus:ring-0">
          {backgroundSolid || "Select Background"}
          <ChevronDownIcon aria-hidden="true" className="-mr-1 size-6 text-white ml-2" />
        </MenuButton>
        <MenuItems className="absolute w-full top-13 left-0 z-10 rounded bg-stone-700 text-white focus:outline-none focus:ring-0">
          {["div", "article", "aside", "footer", "header", "section"].map((item) => (
            <MenuItem key={item}>
              {({ focus }) => (
                <div
                  onClick={() => setBackgroundSolid(item)}
                  className={`block px-4 py-2 cursor-pointer ${focus ? 'bg-white text-stone-700' : ''}`}>{item}</div>
              )}
            </MenuItem>
          ))}
        </MenuItems>
      </Menu>
      
      <label>Background Gradient</label>
      <Menu as="div" className="relative flex bg-stone-700 h-12 p-3 rounded cursor-pointer">
        <MenuButton className="flex justify-between items-center w-full text-white focus:outline-none focus:ring-0">
          {backgroundGradient || "Select Background"}
          <ChevronDownIcon aria-hidden="true" className="-mr-1 size-6 text-white ml-2" />
        </MenuButton>
        <MenuItems className="absolute w-full top-13 left-0 z-10 rounded bg-stone-700 text-white focus:outline-none focus:ring-0">
          {["div", "article", "aside", "footer", "header", "section"].map((item) => (
            <MenuItem key={item}>
              {({ focus }) => (
                <div
                  onClick={() => setBackgroundGradient(item)}
                  className={`block px-4 py-2 cursor-pointer ${focus ? 'bg-white text-stone-700' : ''}`}>{item}</div>
              )}
            </MenuItem>
          ))}
        </MenuItems>
      </Menu>

      <label>Text</label>
      <Menu as="div" className="relative flex bg-stone-700 h-12 p-3 rounded cursor-pointer">
        <MenuButton className="flex justify-between items-center w-full text-white focus:outline-none focus:ring-0">
          {textColor || "Select Text Color"}
          <ChevronDownIcon aria-hidden="true" className="-mr-1 size-6 text-white ml-2" />
        </MenuButton>
        <MenuItems className="absolute w-full top-13 left-0 z-10 rounded bg-stone-700 text-white focus:outline-none focus:ring-0">
          {["div", "article", "aside", "footer", "header", "section"].map((item) => (
            <MenuItem key={item}>
              {({ focus }) => (
                <div
                  onClick={() => setTextColor(item)}
                  className={`block px-4 py-2 cursor-pointer ${focus ? 'bg-white text-stone-700' : ''}`}>{item}</div>
              )}
            </MenuItem>
          ))}
        </MenuItems>
      </Menu>

      <label>Primary Button</label>
      <Menu as="div" className="relative flex bg-stone-700 h-12 p-3 rounded cursor-pointer">
        <MenuButton className="flex justify-between items-center w-full text-white focus:outline-none focus:ring-0">
          {primaryButton || "Select Button Color"}
          <ChevronDownIcon aria-hidden="true" className="-mr-1 size-6 text-white ml-2" />
        </MenuButton>
        <MenuItems className="absolute w-full top-13 left-0 z-10 rounded bg-stone-700 text-white focus:outline-none focus:ring-0">
          {["div", "article", "aside", "footer", "header", "section"].map((item) => (
            <MenuItem key={item}>
              {({ focus }) => (
                <div
                  onClick={() => setPrimaryButton(item)}
                  className={`block px-4 py-2 cursor-pointer ${focus ? 'bg-white text-stone-700' : ''}`}>{item}</div>
              )}
            </MenuItem>
          ))}
        </MenuItems>
      </Menu>

       <label>On Primary Button</label>
      <Menu as="div" className="relative flex bg-stone-700 h-12 p-3 rounded cursor-pointer">
        <MenuButton className="flex justify-between items-center w-full text-white focus:outline-none focus:ring-0">
          {onPrimaryButton || "Select Button Color"}
          <ChevronDownIcon aria-hidden="true" className="-mr-1 size-6 text-white ml-2" />
        </MenuButton>
        <MenuItems className="absolute w-full top-13 left-0 z-10 rounded bg-stone-700 text-white focus:outline-none focus:ring-0">
          {["div", "article", "aside", "footer", "header", "section"].map((item) => (
            <MenuItem key={item}>
              {({ focus }) => (
                <div
                  onClick={() => setOnPrimaryButton(item)}
                  className={`block px-4 py-2 cursor-pointer ${focus ? 'bg-white text-stone-700' : ''}`}>{item}</div>
              )}
            </MenuItem>
          ))}
        </MenuItems>
      </Menu>

       <label>Primary Button Border</label>
      <Menu as="div" className="relative flex bg-stone-700 h-12 p-3 rounded cursor-pointer">
        <MenuButton className="flex justify-between items-center w-full text-white focus:outline-none focus:ring-0">
          {primaryButtonBorder || "Select Button Color"}
          <ChevronDownIcon aria-hidden="true" className="-mr-1 size-6 text-white ml-2" />
        </MenuButton>
        <MenuItems className="absolute w-full top-13 left-0 z-10 rounded bg-stone-700 text-white focus:outline-none focus:ring-0">
          {["div", "article", "aside", "footer", "header", "section"].map((item) => (
            <MenuItem key={item}>
              {({ focus }) => (
                <div
                  onClick={() => setPrimaryButtonBorder(item)}
                  className={`block px-4 py-2 cursor-pointer ${focus ? 'bg-white text-stone-700' : ''}`}>{item}</div>
              )}
            </MenuItem>
          ))}
        </MenuItems>
      </Menu>

      <label>Secondary Button</label>
      <Menu as="div" className="relative flex bg-stone-700 h-12 p-3 rounded cursor-pointer">
        <MenuButton className="flex justify-between items-center w-full text-white focus:outline-none focus:ring-0">
          {secondaryButton || "Select Button Color"}
          <ChevronDownIcon aria-hidden="true" className="-mr-1 size-6 text-white ml-2" />
        </MenuButton>
        <MenuItems className="absolute w-full top-13 left-0 z-10 rounded bg-stone-700 text-white focus:outline-none focus:ring-0">
          {["div", "article", "aside", "footer", "header", "section"].map((item) => (
            <MenuItem key={item}>
              {({ focus }) => (
                <div
                  onClick={() => setSecondaryButton(item)}
                  className={`block px-4 py-2 cursor-pointer ${focus ? 'bg-white text-stone-700' : ''}`}>{item}</div>
              )}
            </MenuItem>
          ))}
        </MenuItems>
      </Menu>

       <label>On Secondary Button</label>
      <Menu as="div" className="relative flex bg-stone-700 h-12 p-3 rounded cursor-pointer">
        <MenuButton className="flex justify-between items-center w-full text-white focus:outline-none focus:ring-0">
          {onSecondaryButton || "Select Button Color"}
          <ChevronDownIcon aria-hidden="true" className="-mr-1 size-6 text-white ml-2" />
        </MenuButton>
        <MenuItems className="absolute w-full top-13 left-0 z-10 rounded bg-stone-700 text-white focus:outline-none focus:ring-0">
          {["div", "article", "aside", "footer", "header", "section"].map((item) => (
            <MenuItem key={item}>
              {({ focus }) => (
                <div
                  onClick={() => setOnSecondaryButton(item)}
                  className={`block px-4 py-2 cursor-pointer ${focus ? 'bg-white text-stone-700' : ''}`}>{item}</div>
              )}
            </MenuItem>
          ))}
        </MenuItems>
      </Menu>

      <label>Secondary Button Border</label>
      <Menu as="div" className="relative flex bg-stone-700 h-12 p-3 rounded cursor-pointer">
        <MenuButton className="flex justify-between items-center w-full text-white focus:outline-none focus:ring-0">
          {secondaryButtonBorder || "Select Button Color"}
          <ChevronDownIcon aria-hidden="true" className="-mr-1 size-6 text-white ml-2" />
        </MenuButton>
        <MenuItems className="absolute w-full top-13 left-0 z-10 rounded bg-stone-700 text-white focus:outline-none focus:ring-0">
          {["div", "article", "aside", "footer", "header", "section"].map((item) => (
            <MenuItem key={item}>
              {({ focus }) => (
                <div
                  onClick={() => setSecondaryButtonBorder(item)}
                  className={`block px-4 py-2 cursor-pointer ${focus ? 'bg-white text-stone-700' : ''}`}>{item}</div>
              )}
            </MenuItem>
          ))}
        </MenuItems>
      </Menu>

      <label>Icons</label>
      <Menu as="div" className="relative flex bg-stone-700 h-12 p-3 rounded cursor-pointer">
        <MenuButton className="flex justify-between items-center w-full text-white focus:outline-none focus:ring-0">
          {iconsColor|| "Select Icons Color"}
          <ChevronDownIcon aria-hidden="true" className="-mr-1 size-6 text-white ml-2" />
        </MenuButton>
        <MenuItems className="absolute w-full top-13 left-0 z-10 rounded bg-stone-700 text-white focus:outline-none focus:ring-0">
          {["div", "article", "aside", "footer", "header", "section"].map((item) => (
            <MenuItem key={item}>
              {({ focus }) => (
                <div
                  onClick={() => setIconsColor(item)}
                  className={`block px-4 py-2 cursor-pointer ${focus ? 'bg-white text-stone-700' : ''}`}>{item}</div>
              )}
            </MenuItem>
          ))}
        </MenuItems>
      </Menu>

      <label>Link</label>
      <Menu as="div" className="relative flex bg-stone-700 h-12 p-3 rounded cursor-pointer">
        <MenuButton className="flex justify-between items-center w-full text-white focus:outline-none focus:ring-0">
          {linkColor || "Select Link Color"}
          <ChevronDownIcon aria-hidden="true" className="-mr-1 size-6 text-white ml-2" />
        </MenuButton>
        <MenuItems className="absolute w-full top-13 left-0 z-10 rounded bg-stone-700 text-white focus:outline-none focus:ring-0">
          {["div", "article", "aside", "footer", "header", "section"].map((item) => (
            <MenuItem key={item}>
              {({ focus }) => (
                <div
                  onClick={() => setLinkColor(item)}
                  className={`block px-4 py-2 cursor-pointer ${focus ? 'bg-white text-stone-700' : ''}`}>{item}</div>
              )}
            </MenuItem>
          ))}
        </MenuItems>
      </Menu>
      
      </div> 

  )
}

export default ColorSettings


// *************************************TEST CODE FOR COLOR SCHEMA*****************************************************
//****************************************************************************************************************** */


