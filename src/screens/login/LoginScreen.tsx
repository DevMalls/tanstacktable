import { useCallback, useState } from "react";
import Modal from "../../components/common/modal/Modal";
import LoginComponent from "../../components/login/LoginComponent";
import '../../common/common.css';

const LoginScreen = () : JSX.Element => {

    const [isOpen, setIsOpen] = useState(false);

    const showHideModal = useCallback(() => {
        setIsOpen(!isOpen);
    },[isOpen]);

    return (
        <>
            {!isOpen ? <button className="outlined-btn-primary" onClick={showHideModal}>Login</button>
            : <Modal onClose={showHideModal} width='350px' height="240px">
                <LoginComponent showHideModal={showHideModal}/>
            </Modal> }
        </>
    )
}
export default LoginScreen;