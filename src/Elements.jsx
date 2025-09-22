import { useState } from "react";
import elementsList from "./elementsList";
const Elements = () => {  
       const [searchTerm, setSearchTerm] = useState('');
       const handleDragStart = (e, element) => {
          const dragData = {
            title: element.title,
            description: element.description,
           // iconType: element.iconType
           iconType: element.title.toLowerCase().replace(/\s+/g, '-')
          };
           e.dataTransfer.setData('text/plain', JSON.stringify(dragData));
           e.dataTransfer.effectAllowed = 'copy';
           e.currentTarget.style.opacity = '0.4';
       };
        const handleDragEnd = (e) => {
          e.currentTarget.style.opacity = '1'; // Reset opacity
        };   
        const filtered = elementsList.filter(el =>
          el.title.toLowerCase().includes(searchTerm.toLowerCase())
        );      
        return (
          <>
            <div className="p-3 space-y-4 overflow-y-scroll max-h-[650px]" style={{ scrollbarWidth: "none" }}>
              <div className="bg-stone-700 h-10 p-3 w-full flex items-center space-x-2">
                <svg stroke="currentColor" fill="currentColor" viewBox="0 0 512 512" height="20" width="20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M337.509 305.372h-17.501l-6.571-5.486c20.791-25.232 33.922-57.054 33.922-93.257C347.358 127.632 283.896 64 205.135 64 127.452 64 64 127.632 64 206.629s63.452 142.628 142.225 142.628c35.011 0 67.831-13.167 92.991-34.008l6.561 5.487v17.551L415.18 448 448 415.086 337.509 305.372zm-131.284 0c-54.702 0-98.463-43.887-98.463-98.743 0-54.858 43.761-98.742 98.463-98.742 54.7 0 98.462 43.884 98.462 98.742 0 54.856-43.762 98.743-98.462 98.743z"></path>
                </svg>
                <input
                  className="flex w-full focus:ring-0 focus:outline-none"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>      
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
export default Elements