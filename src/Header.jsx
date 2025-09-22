const Header = () => {
  return (
    <>
    <div className="flex justify-between items-center text-white p-4">
        <div className="text-3xl flex-col">Schema Builder</div>
        <div className="flex gap-x-3 items-center text-xl">
            <img src="./HeaderIcon.png" className="w-6 h-6 "/> 
            <a className="hover:underline underline-offset-3">🚨New Launch Alert!🚨</a>
        </div>
        <div className="flex gap-x-1 items-center text-lg">Share : 
             <a target="_blank" className="hover:bg-amber-400 rounded-full p-2 cursor-pointer" href="https://www.instagram.com/magmawebstech/">
                <svg stroke="currentColor" fill="currentColor"  viewBox="0 0 512 512" height="22" width="22" xmlns="http://www.w3.org/2000/svg">
                  <path d="M426.8 64H85.2C73.5 64 64 73.5 64 85.2v341.6c0 11.7 9.5 21.2 21.2 21.2H256V296h-45.9v-56H256v-41.4c0-49.6 34.4-76.6 78.7-76.6 21.2 0 44 1.6 49.3 2.3v51.8h-35.3c-24.1 0-28.7 11.4-28.7 28.2V240h57.4l-7.5 56H320v152h106.8c11.7 0 21.2-9.5 21.2-21.2V85.2c0-11.7-9.5-21.2-21.2-21.2z"></path>
               </svg>
             </a>
             <a target="_blank" className="hover:bg-amber-400 rounded-full w-10 h-10" href="https://www.instagram.com/magmawebstech/">
                <img src="./instaLogo.png" />
                {/* <svg stroke="currentColor" fill="currentColor"  viewBox="0 0 16 16" height="17" width="17" xmlns="http://www.w3.org/2000/svg">
                   <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z"></path>
                </svg> */} 
             </a>
             <a target="_blank" className="hover:bg-amber-400 rounded-full p-2" href="https://in.linkedin.com/company/magma-web-tech">
                <svg stroke="currentColor" fill="currentColor"  viewBox="0 0 448 512" height="20" width="20" xmlns="http://www.w3.org/2000/svg">
                   <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"></path>
                </svg>
             </a>
             <a target="_blank" className="hover:bg-amber-400 rounded-full p-2" href="https://mail.google.com/mail/?view=cm&fs=1&to=magmawebstech@gmail.com">
                <svg stroke="currentColor" fill="currentColor"  viewBox="0 0 512 512" height="22" width="22" xmlns="http://www.w3.org/2000/svg">
                  <path d="M464 80H48a16 16 0 0 0-16 16v320a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V96a16 16 0 0 0-16-16zM265.82 284.63a16 16 0 0 1-19.64 0L89.55 162.81l19.64-25.26L256 251.73l146.81-114.18 19.64 25.26z"></path>
               </svg>
             </a>
        </div>
    </div>
    </>
  )
}

export default Header