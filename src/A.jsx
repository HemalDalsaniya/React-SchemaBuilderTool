import { useState, useEffect } from 'react'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

const ColorSettings = ({ resetTrigger, colorSettingsData, setColorSettingsData, onOptionsChange }) => {
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

  // Prepare options for nested label fields based on current selections
  useEffect(() => {
    if (typeof onOptionsChange === 'function') {
      // Options for "Color" scheme: all except Background Gradient
      const colorOptions = [
        backgroundSolid,
        textColor,
        primaryButton,
        onPrimaryButton,
        primaryButtonBorder,
        secondaryButton,
        onSecondaryButton,
        secondaryButtonBorder,
        iconsColor,
        linkColor
      ].filter(Boolean) // remove empty strings

      // Options for "Background Color" scheme: only Background Gradient if set
      const backgroundColorOptions = backgroundGradient ? [backgroundGradient] : []

      onOptionsChange({
        colorOptions,
        backgroundColorOptions
      })
    }
  }, [
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
    linkColor,
    onOptionsChange
  ])

  // Helper to render a select menu
  const renderSelectMenu = (label, value, setValue) => {
    const items = ["div", "article", "aside", "footer", "header", "section"]
    return (
      <>
        <label>{label}</label>
        <Menu as="div" className="relative flex bg-stone-700 h-12 p-3 rounded cursor-pointer">
          <MenuButton className="flex justify-between items-center w-full text-white focus:outline-none focus:ring-0">
            {value || `Select ${label}`}
            <ChevronDownIcon aria-hidden="true" className="-mr-1 size-6 text-white ml-2" />
          </MenuButton>
          <MenuItems className="absolute w-full top-13 left-0 z-10 rounded bg-stone-700 text-white focus:outline-none focus:ring-0">
            {items.map((item) => (
              <MenuItem key={item}>
                {({ focus }) => (
                  <div
                    onClick={() => setValue(item)}
                    className={`block px-4 py-2 cursor-pointer ${focus ? 'bg-white text-stone-700' : ''}`}>{item}</div>
                )}
              </MenuItem>
            ))}
          </MenuItems>
        </Menu>
      </>
    )
  }

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

      {renderSelectMenu("Background Solid", backgroundSolid, setBackgroundSolid)}
      {renderSelectMenu("Background Gradient", backgroundGradient, setBackgroundGradient)}
      {renderSelectMenu("Text", textColor, setTextColor)}
      {renderSelectMenu("Primary Button", primaryButton, setPrimaryButton)}
      {renderSelectMenu("On Primary Button", onPrimaryButton, setOnPrimaryButton)}
      {renderSelectMenu("Primary Button Border", primaryButtonBorder, setPrimaryButtonBorder)}
      {renderSelectMenu("Secondary Button", secondaryButton, setSecondaryButton)}
      {renderSelectMenu("On Secondary Button", onSecondaryButton, setOnSecondaryButton)}
      {renderSelectMenu("Secondary Button Border", secondaryButtonBorder, setSecondaryButtonBorder)}
      {renderSelectMenu("Icons", iconsColor, setIconsColor)}
      {renderSelectMenu("Link", linkColor, setLinkColor)}

    </div>
  )
}
export default ColorSettings
