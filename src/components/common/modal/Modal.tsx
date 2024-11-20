import './modal.css'
const Modal = (props:any) : JSX.Element => {

    const{onClose, children, width, height} = props;
    
     return (
        <div className="modal-overlay">
            <div className="modal-content" style={{width: width, height: height}}>
                <div className="model-closebutton">
                <button className="closebutton cursor-pointer" onClick={onClose}> X
                </button>
                </div>
                {children}
            </div>
        </div>
    )
}

export default Modal;