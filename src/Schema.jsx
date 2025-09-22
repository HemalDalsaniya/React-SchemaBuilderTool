const Schema = ({ settingsData, elementsData }) => {
  // Initialize with default values if data is not available yet
  const safeSettingsData = settingsData || {
    name: "My New Section",
    sectionClass: "",
    maxBlocks: "",
    selectedTag: "",
    selectedTemplates: [],
    selectedGroup: [],
    presets: "My New Section"
  };
  
  const safeElementsData = elementsData || {
    droppedElements: [],
    nestedFields: {},
    fieldValues: {}
  };

  const generateSchema = () => {
    // Generate blocks from elements data
    const blocks = [];
    
    if (safeElementsData.droppedElements) {
      safeElementsData.droppedElements.forEach((element, index) => {
        const fieldValues = safeElementsData.fieldValues[index] || {};
        const nestedElements = safeElementsData.nestedFields[index] || [];
        
        if (element.title && element.title.toLowerCase() === 'block') {
          // Handle block elements
          const block = {
            type: fieldValues.type || "",
            name: fieldValues.name || "",
            limit: parseInt(fieldValues.limit),
            settings: []
          };
          
          // Add nested settings for block
          nestedElements.forEach((nestedEl, nestedIndex) => {
            const nestedKey = `${index}-${nestedIndex}`;
            const nestedValues = safeElementsData.fieldValues[nestedKey] || {};
            
            const setting = generateSettingFromElement(nestedEl, nestedValues);
            if (setting) {
              block.settings.push(setting);
            }
          });
          
          blocks.push(block);
        }
      });
    }
    
    // Generate main settings
    const mainSettings = generateMainSettings(safeElementsData);
    
    // Generate main schema
    const schema = {
      name: safeSettingsData.name || "My New Section",
      tag: safeSettingsData.selectedTag || "",
      class: safeSettingsData.sectionClass || "",
      max_blocks: safeSettingsData.maxBlocks || "",
      disable_on: safeSettingsData.selectedGroup.length > 0 ? safeSettingsData.selectedGroup : [],
      settings: mainSettings,
      blocks: blocks,
      templates: safeSettingsData.selectedTemplates.length > 0 ? safeSettingsData.selectedTemplates : [],
      presets: [
        {
          name: safeSettingsData.presets || "My New Section"
        }
      ]
    };
    
    return JSON.stringify(schema, null, 2);
  };
  
  const generateMainSettings = (elementsData) => {
    const settings = [];
    
    if (elementsData.droppedElements) {
      elementsData.droppedElements.forEach((element, index) => {
        // Only add non-block elements to main settings
        if (element.title && element.title.toLowerCase() !== 'block') {
          const fieldValues = elementsData.fieldValues[index] || {};
          const setting = generateSettingFromElement(element, fieldValues);
          if (setting) {
            settings.push(setting);
          }
        }
      });
    }
    
    return settings;
  };
  
  const generateSettingFromElement = (element, values) => {
    if (!element || !element.title) return null;
    
    const type = element.title.toLowerCase();
    
    // Map element types to schema types
    const typeMapping = {
      'text': 'text',
      'textarea': 'textarea',
      'inline richtext': 'inline_richtext',
      'rich text': 'richtext',
      'html': 'html',
      'image picker': 'image_picker',
      'url': 'url',
      'video': 'video',
      'video url': 'video_url',
      'liquid': 'liquid',      
      'text alignment': 'text_alignment',
      'checkbox': 'checkbox',
      'select': 'select',
      'radio': 'radio',
      'number': 'number',
      'range': 'range',
      'color': 'color',
      'color scheme': 'color_scheme',
      'color background': 'color_background',      
      'font picker': 'font_picker',
      'article': 'article',
      'blog': 'blog',
      'header': 'header',
      'link list':'link_list',
      'product': 'product',
      'product list': 'product_list',
      'collection': 'collection',
      'collection list': 'collection_list',
      'page': 'page',
      'metaobject': 'metaobject',
      'metaobject list': 'metaobject_list'
    };
    
    const schemaType = typeMapping[type] || '';
    
    const setting = {
      type: schemaType,
      label: values.label || "",
      id: values.id || ""      
    };
    
    // Add type-specific properties
    switch(type) {
      case 'text':
      case 'textarea':
      case 'number':
        if (values.placeholder) setting.placeholder = values.placeholder;
        if (values.defaultValue) setting.default = values.defaultValue;
        break;
        
      case 'rich text':
      case 'inline richtext':
        if (values.defaultValue) setting.default = values.defaultValue;
        break;
        
      case 'html':
        if (values.placeholder) setting.placeholder = values.placeholder;
        break;
        
      case 'video url':
        //  if (values.defaultValue) setting.default = values.defaultValue;
        if (values.accept && values.accept.length > 0) {
          setting.accept = values.accept.map(item => item.toLowerCase());
        }
        if (values.placeholder) setting.placeholder = values.placeholder;
        break;

  
      case 'checkbox':
        if (values.defaultValue) setting.default = values.defaultValue === 'True';
        break;
        
      case 'radio':
        if (values.options && values.options.length > 0) {
          setting.options = values.options.map(opt => ({
            value: opt.value || "",
            label: opt.label || ""
          }));
        }
        if (values.defaultValue) setting.default = values.defaultValue;
        break;

      case 'select':
        if (values.options && values.options.length > 0) {
          setting.options = values.options.map(opt => ({
            value: opt.value || "",
            label: opt.label || "",
            group: opt.group || ""
          }));
        }
        if (values.defaultValue) setting.default = values.defaultValue;
        break;
        
      case 'range':
        if (values.min) setting.min = parseInt(values.min) || 0;
        if (values.max) setting.max = parseInt(values.max);
        if (values.step) setting.step = parseInt(values.step);
        if (values.unit) setting.unit = values.unit;
        if (values.defaultValue) setting.default = parseInt(values.defaultValue);
        break;
        
      case 'color':
        if (values.colorPalette) setting.default = values.colorPalette;
        break;
        
      case 'color background':
        if (values.colorRgba) setting.default = values.colorRgba;
        break;
        
      case 'header':
        if (values.content) setting.content = values.content;
        break;
        
      case 'font picker':
      case 'text alignment':
        if (values.defaultValue) setting.default = values.defaultValue;
        break;
        
      case 'product list':
      case 'collection list':
        if (values.limit) setting.limit = parseInt(values.limit);
        break;
        
      case 'metaobject':
        if (values.metaobjectType) setting.metaobject_type = values.metaobjectType;
        break;
        
      case 'metaobject list':
        if (values.metaobjectType) setting.metaobject_type = values.metaobjectType;
        if (values.limit) setting.limit = parseInt(values.limit);
        break;
    }
    
    // Add info if present
    if (values.info) setting.info = values.info;
    
    return setting;
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
      <div style={{ marginBottom: '10px' }}>{"{% schema %}"}</div>
      <div dangerouslySetInnerHTML={{ __html: formatSchema(schemaContent) }} style={{ whiteSpace: 'pre-wrap' }} />
      <div style={{ marginTop: '10px' }}>{"{% endschema %}"}</div>
      <div style={{ marginTop: '10px' }}>{"{% stylesheet %}"}</div>
      <div>{"{% endstylesheet %}"}</div>
      <div style={{ marginTop: '10px' }}>{"{% javascript %}"}</div>
      <div>{"{% endjavascript %}"}</div>
    </div>
  );
};
export default Schema;