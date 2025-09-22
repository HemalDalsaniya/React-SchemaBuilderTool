const SchemaColor = ({ colorSettingsData, colorElementsData }) => {
  // Initialize with default values if data is not available yet
  const safeColorSettingsData = colorSettingsData || {
    colorSchemaName: "Color Scheme Group",
    colorSchemeId: "color_scheme",
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
  };
  
  const safeColorElementsData = colorElementsData || {
    droppedElements: [],
    nestedFields: {},
    fieldValues: {}
  };

  const generateSchema = () => {
    const definition = [];
    
    // Process all dropped elements
    if (safeColorElementsData.droppedElements) {
      safeColorElementsData.droppedElements.forEach((element, index) => {
        const fieldValues = safeColorElementsData.fieldValues[index] || {};
        const nestedElements = safeColorElementsData.nestedFields[index] || [];
        
        // Handle header elements
        if (element.title && element.title.toLowerCase() === 'header') {
          // Add header to definition
          definition.push({
            type: "header",
            content: fieldValues.content || ""
          });
          
          // Add nested color settings for header
          nestedElements.forEach((nestedEl, nestedIndex) => {
            const nestedKey = `${index}-${nestedIndex}`;
            const nestedValues = safeColorElementsData.fieldValues[nestedKey] || {};
            
            if (nestedEl.title && nestedEl.title.toLowerCase() === 'color scheme setting') {
              // Determine the type based on the selected color scheme
              const colorType = nestedValues.colorScheme === "Background Color" 
                ? "color_background" 
                : "color";

                // Set the default value based on the type
              const defaultValue = colorType === "color_background" 
                ? nestedValues.colorRgba || "rgba(255,255,255,1)"
                : nestedValues.colorPalette || "#ffffff";
              
              definition.push({
                type: colorType,
                id: nestedValues.id || "",
                label: nestedValues.label || "",
                info: nestedValues.info || "",
                default: defaultValue
              });
            }
          });
        }
        
        // Handle other element types (blocks, etc.)
        else if (element.title && element.title.toLowerCase() !== 'block') {
          const def = generateSettingFromElement(element, fieldValues);
          if (def) {
            definition.push(def);
          }
        }
      });
    }
    
    // Generate main schema
    const schema = {
      name: safeColorSettingsData.colorSchemaName || "Color Scheme Group",
      settings: [
        {
          type: "color_scheme_group",
          id: safeColorSettingsData.colorSchemeId || "color_scheme",
          definition: definition,
          role: {
            background: {
              solid: safeColorSettingsData.backgroundSolid || "",
              gradient: safeColorSettingsData.backgroundGradient || "",
            },
            text: safeColorSettingsData.textColor || "",
            primary_button: safeColorSettingsData.primaryButton || "",
            on_primary_button: safeColorSettingsData.onPrimaryButton || "",
            primary_button_border: safeColorSettingsData.primaryButtonBorder || "",
            secondary_button: safeColorSettingsData.secondaryButton || "",
            on_secondary_button: safeColorSettingsData.onSecondaryButton || "",
            secondary_button_border: safeColorSettingsData.secondaryButtonBorder || "",
            icons: safeColorSettingsData.iconsColor || "",
            links: safeColorSettingsData.linkColor || ""
          }
        }
      ]  
    };
    
    return JSON.stringify(schema, null, 2);
  };

  const generateSettingFromElement = (element, values) => {
    if (!element || !element.title) return null;
    
    const type = element.title.toLowerCase();
    
    // Map element types to schema types
    const typeMapping = {   
      'color': 'color',
      'color background': 'color_background',      
      'header': 'header'
    };
    
    const schemaType = typeMapping[type] || '';
    
    const def = {
      type: schemaType,
      label: values.label || "",
      id: values.id || ""      
    };
    
    // Add type-specific properties
    switch(type) {
        
      case 'color':
        if (values.colorPalette) def.default = values.colorPalette;
        break;
        
      case 'color background':
        if (values.colorRgba) def.default = values.colorRgba;
        break;
        
      case 'header':
        if (values.content) def.content = values.content;
        break;

    }
     
    // Add info if present
    if (values.info) def.info = values.info;
    
    return def;
  }; 
  
  // Function to format the schema with all data in green color
  const formatSchema = (schemaText) => {
    // Make all the inserted data green
    const formattedText = schemaText
      .replace(/(: )(".*?")/g, '$1<span style="color: #CCFF00;">$2</span>')
      .replace(/(: )(\d+)/g, '$1<span style="color: #FFBF00;">$2</span>')
      .replace(/(: )(true|false|null)/g, '$1<span style="color: #ffffff;">$2</span>')
      .replace(/(: )(\[.*?\])/g, '$1<span style="color: #ffffff;">$2</span>')
      .replace(/(: )(\{.*?\})/g, '$1<span style="color: #5CE65C;">$2</span>')
      .replace(/("disable_on": )(\[.*?\])/g, '$1<span style="color: #5CE65C;">$2</span>');
    
    return formattedText;
  };
  
  const schemaContent = generateSchema();
  
  return (
    <div style={{ fontFamily: 'monospace', fontSize: '15px', color: '#ffffff' }} > 
      <div dangerouslySetInnerHTML={{ __html: formatSchema(schemaContent) }} style={{ whiteSpace: 'pre-wrap' }} /> 
    </div>
  );
};

export default SchemaColor;