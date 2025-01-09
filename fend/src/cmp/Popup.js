import React, { useState,useEffect,useRef } from 'react';
import './Popup.css'; // Import the CSS file for styling

function Popup() {
  const [isOpen, setIsOpen] = useState(true);

  const openPopup = () => {
    setIsOpen(true);
  };

  const closePopup = () => {
    setIsOpen(false);
  };
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('popup-open');
    } else {
      document.body.classList.remove('popup-open');
    }
 // Cleanup effect when the component unmounts
 return () => {
    document.body.classList.remove('popup-open');
  };
  
}, [isOpen]);

//---------Learn Event default enter click -------------------------------------------------------
const buttonRef = useRef(null);

const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
        buttonRef.current.click();
    }
};
useEffect(() => {
  window.addEventListener('keydown', handleKeyDown);
  return () => {
      window.removeEventListener('keydown', handleKeyDown);
  };
}, []);

//-------------------------------------------------
  return (
    <div>
      <button className="btn btn-primary mr-3  d-none d-lg-block" onClick={openPopup}>Disclaimer</button>

      {isOpen && (
        <div className="popup-container" style={{background:"rgba(0,0,0,0.6)"}}>
          <div className="popup-content bg-primary " >
          <div className="row">
           {/* <div className="row">  */}
           
            <h2 style={{color:"rgba(255,255,255,1)"}} className="col-md-12">Disclaimer!</h2>
           {/* </div> */}
            </div>
            {/* </div> */}
            <div className=" disclaimer-container mt-0 mx-0 bg-secondary ">
  <p style={{color:"rgba(255,255,255,1)"}} className="disclaimer-header">I am not a lawyer, but I can provide some general information on common disclaimers that law firms often include on their websites in India. However, it's essential to consult with legal counsel to ensure that your specific disclaimer meets all legal requirements and addresses your firm's unique needs. Here are some typical disclaimers that you might consider:
</p>

<ul className="px-3 disclaimer-container " style={{color:"rgba(255,255,255,1)"}}>
 
  <li className="disclaimer-point mx-3 ">
    <span className="disclaimer-title text-uppercase">No Attorney-Client Relationship: </span>
    <span className="disclaimer-description">This is to clarifies that visiting the website or using its information does not create an attorney-client relationship between the visitor and the law firm.</span>
  </li> 
 
  <li className="disclaimer-point mx-3 ">
    <span className="disclaimer-title text-uppercase">Informational Purposes Only: </span>
    <span className="disclaimer-description">Stating that the content on the website is for 
    informational purposes only and should not be construed as legal advice. 
    Encourage visitors to seek legal advice from a qualified attorney for their specific situations.</span>
  </li> 
 
  <li className="disclaimer-point mx-3 ">
    <span className="disclaimer-title text-uppercase">Jurisdictional Limitations: </span>
    <span className="disclaimer-description">Mention any limitations on the geographic areas or jurisdictions in which your 
    firm practices law. This can help manage expectations
     of potential clients.</span>
  </li> 
 
 
 
            
  </ul>
  
            
          </div>
          <div className="row">

{/* <span className="col-lg-12 " style={{width:"100%"}}  onClick={closePopup}>
             &times;
          </span> */}
          <div className="col-lg-10 "></div>
          <button className='btn btn-primary  ' ref={buttonRef} onClick={closePopup}>Accept</button>
</div>
        </div>
      </div>
      )}
    </div>
  );
}

export default Popup;
