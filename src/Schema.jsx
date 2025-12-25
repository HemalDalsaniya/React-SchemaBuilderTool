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
  // Function to escape HTML for JSON output
  const escapeHTML = (str) => {
    if (typeof str !== 'string') return str;
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }; 

  // REVISED HTML CLEANING FUNCTION FOR STRICT NEWLINE-TO-PARAGRAPH CONVERSION
  const cleanHTMLForOutput = (html) => {
    if (!html) return html; 
    
    // --- Step 0: Aggressive Pre-processing to Normalize Line Breaks ---
    let normalizedHtml = html;
    
    // Replace <p>, <div>, and <br> closing/opening tags with a newline character,
    // ensuring no double newlines unless intentional.
    normalizedHtml = normalizedHtml.replace(/<\/(p|div)>|<br\s*\/?>/gi, '\n');
    normalizedHtml = normalizedHtml.replace(/<(p|div|span)[^>]*>/gi, ''); 
    
    // Remove consecutive newlines greater than 2 to prevent excessive empty paragraphs
    normalizedHtml = normalizedHtml.replace(/\n{3,}/g, '\n\n'); 

    // Create a temporary div to parse HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = normalizedHtml;

    // Step 1: Convert b to strong and i to em
    tempDiv.querySelectorAll('b').forEach(b => {
      const strong = document.createElement('strong');
      strong.innerHTML = b.innerHTML;
      b.parentNode.replaceChild(strong, b);
    });
    tempDiv.querySelectorAll('i').forEach(i => {
      const em = document.createElement('em');
      em.innerHTML = i.innerHTML;
      i.parentNode.replaceChild(em, i);
    });

    // Step 2: Remove all <span> tags (unwrap content)
    // Note: <div> and <p> are handled in pre-processing, but this catches stragglers
    tempDiv.querySelectorAll('div, span').forEach(element => {
      const parent = element.parentNode;
      while (element.firstChild) {
        parent.insertBefore(element.firstChild, element);
      }
      element.remove();
    });
    
    // Step 3: Process content and maintain block structure
    const processContent = () => {
      const result = [];
      const nodes = Array.from(tempDiv.childNodes);
      
      let currentInlineContent = '';
      
      const processInlineFormatting = (text) => {
        // Simple formatting processor for markdown-style emphasis if any remains
        return text
          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
          .replace(/\*(.*?)\*/g, '<em>$1</em>')
          .replace(/_(.*?)_/g, '<u>$1</u>');
      };

      const finalizeInlineBlock = (content) => {
        if (!content) return;
        
        // **This is the critical change for the user's requirement:**
        // Split content by newline to create a new <p> for each line
        const lines = content.split('\n');
        
        lines.forEach(line => {
          const trimmedLine = line.trim();
          if (trimmedLine) {
            // Strict P-tag wrapping for every line
            const p = document.createElement('p');
            p.innerHTML = processInlineFormatting(trimmedLine);
            result.push(p.outerHTML);
          }
        });
      };
      
      nodes.forEach(node => {
        if (node.nodeType === Node.TEXT_NODE) {
          // Accumulate text content
          currentInlineContent += node.textContent;

        } else if (node.nodeType === Node.ELEMENT_NODE) {
          
          if (['UL', 'OL'].includes(node.tagName)) {
            // Finish current inline block
            finalizeInlineBlock(currentInlineContent);
            currentInlineContent = '';

            // Add the list element itself
            result.push(node.outerHTML);

          } else if (['STRONG', 'EM', 'U', 'B', 'I', 'A'].includes(node.tagName)) {
            // Accumulate inline elements' outerHTML
            currentInlineContent += node.outerHTML;

          } else {
            // Treat other stray elements' content as inline text
            currentInlineContent += node.textContent || '';
          }
        }
      });
      
      // Add the final inline block
      finalizeInlineBlock(currentInlineContent);
      
      return result.join('');
    };

    // Step 4: Get the processed content
    const processedContent = processContent();
    tempDiv.innerHTML = processedContent;

    // Step 5: Final Cleanup
    // Remove empty block elements
    tempDiv.querySelectorAll('p, ul, ol').forEach(element => {
        if (element.innerHTML === '' || element.textContent.trim() === '') {
            element.remove();
        }
    });

    // Step 6: Clean up list items to remove any block elements that snuck in
    tempDiv.querySelectorAll('li').forEach(li => {
      li.querySelectorAll('p, div').forEach(block => {
        while (block.firstChild) {
          li.insertBefore(block.firstChild, block);
        }
        block.remove();
      });
    });

    // Step 7: Remove all attributes except essential ones for links
    tempDiv.querySelectorAll('*').forEach(element => {
      const attributes = Array.from(element.attributes);
      attributes.forEach(attr => {
        if (element.tagName === 'A') {
          if (attr.name === 'href' || attr.name === 'target' || attr.name === 'rel') {
            return;
          }
        }
        element.removeAttribute(attr.name);
      });
      
      if (element.tagName === 'A') {
        if (!element.hasAttribute('target')) {
          element.setAttribute('target', '_blank');
        }
        if (!element.hasAttribute('rel')) {
          element.setAttribute('rel', 'noopener noreferrer');
        }
      }
    });

    // Step 8: Remove any &nbsp; entities and replace with regular spaces
    const cleanedHTML = tempDiv.innerHTML.replace(/&nbsp;/g, ' ');
    
    return cleanedHTML;
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
            limit: parseInt(fieldValues.limit) || "",
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
      name: safeSettingsData.name === "" ? "" : safeSettingsData.name || "My New Section",
      tag: safeSettingsData.selectedTag || "",
      class: safeSettingsData.sectionClass || "",
      max_blocks: parseInt(safeSettingsData.maxBlocks) || "",
      disable_on: safeSettingsData.selectedGroup.length > 0 ? { groups : safeSettingsData.selectedGroup } : [],
      settings: mainSettings,
      blocks: blocks,
      templates: safeSettingsData.selectedTemplates.length > 0 ? safeSettingsData.selectedTemplates : [],
      presets: [
        {
          name: safeSettingsData.presets === "" ? "" : safeSettingsData.presets || "My New Section"
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
        if (values.defaultValue) {
          // Clean the HTML before output using the new function
          const cleanedHTML = cleanHTMLForOutput(values.defaultValue);
          setting.default = escapeHTML(cleanedHTML);
        }
        break;
      case 'html':
        if (values.placeholder) setting.placeholder = values.placeholder;
        break;
      case 'video url':
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
            label: opt.label || "",
            value: opt.value || ""
          }));
        } else if (values.options && values.options.length === 0) {
          setting.options =[]
        } else {
          setting.options = [{ label: "", value: "" }];
        }
        if (values.defaultValue) setting.default = values.defaultValue;
        break;
      case 'select':
        if (values.options && values.options.length > 0) {
          setting.options = values.options.map(opt => ({
            label: opt.label || "",
            value: opt.value || "",
            group: opt.group || ""
          }));
        } else if (values.options && values.options.length === 0) {
          setting.options =[]
        } else {
          setting.options = [{ label: "", value: "", group: "" }] ;
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

  const formatSchema = (schemaText) => {
    // Make all the inserted data green
    const formattedText = schemaText
      .replace(/(: )(".*?")/g, '$1<span style="color: #CCFF00;">$2</span>')
      .replace(/(: )(\d+)/g, '$1<span style="color: #FFBF00;">$2</span>')
      .replace(/(: )(true|false|null)/g, '$1<span style="color: #ffffff;">$2</span>')
      .replace(/(: )(\[.*?\])/g, '$1<span style="color: #ffffff;">$2</span>')
      .replace(/(: )(\{.*?\})/g, '$1<span style="color: #5CE65C;">$2</span>')
      .replace(/(groups": \[)([^\]]*)(\])/g, (match, p1, p2, p3) => {
        return p1 + p2.replace(/(".*?")/g, '<span style="color: #CCFF00;">$1</span>') + p3;
      })
      .replace(/(templates": \[)([^\]]*)(\])/g, (match, p1, p2, p3) => {
        return p1 + p2.replace(/(".*?")/g, '<span style="color: #CCFF00;">$1</span>') + p3;
      }); 
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
export default Schema