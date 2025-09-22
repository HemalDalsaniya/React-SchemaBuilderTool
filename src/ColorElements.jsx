import ColorElementsList from "./ColorElementsList"
const ColorElements = () => {  
       const handleDragStart = (e, element) => {
          const dragData = {
            title: element.title,
            description: element.description,
           iconType: element.title.toLowerCase().replace(/\s+/g, '-')
          };
           e.dataTransfer.setData('text/plain', JSON.stringify(dragData));
           e.dataTransfer.effectAllowed = 'copy';
           e.currentTarget.style.opacity = '0.4';
       };
        const handleDragEnd = (e) => {
          e.currentTarget.style.opacity = '1'; // Reset opacity
        };   
        const filtered = ColorElementsList.filter(el =>
          el.title==='Header'
        );      
        return (
          <>
            <div className="p-3 space-y-4 overflow-y-scroll max-h-[650px]" style={{ scrollbarWidth: "none" }}>
              {filtered.map((el, index) => (
                <div key={index} className="bg-stone-700 h-10 px-3 py-10 w-full flex items-center space-x-2 cursor-grab"
                     draggable 
                     onDragStart={(e) => handleDragStart(e, el)}
                     onDragEnd={handleDragEnd} >
                  <div className="bg-stone-900 p-1 rounded-sm">
                    <span className="text-2xl text-white">
                      {el.icon}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold leading-5">{el.title}</h4>
                    <p className="text-sm">{el.description}</p>
                  </div>
                </div>
              ))}     
            </div>
    </>
  )
}
export default ColorElements