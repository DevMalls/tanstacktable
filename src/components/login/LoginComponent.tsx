import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './logincomponent.css';
import './../../common/common.css';

type UserType = {
    username: string,
    password: string
}

const defaultUser = {
    username: '',
    password: ''
}
const LoginComponent = (props: any) : JSX.Element => {

    const [userdetails, setUserDetails] = useState<UserType>(defaultUser);
    const [error,setError] = useState("");

    const navigate = useNavigate();

    const onChangeInputField = (event:React.ChangeEvent<HTMLInputElement>) => {
       setUserDetails((prev) => ({...prev, [event.target.name] : event.target.value}) )
    }

    const onClickLogin = () => { 
        if(!userdetails.username || !userdetails.password) {
            setError("All fields are mandatory")
        }
        else {
            localStorage.setItem('user', JSON.stringify({[userdetails.username]:'123'}));
            localStorage.setItem('currenttab', 'homelogo');
            navigate('/home');
        }
    }

    const onClickCancel = () => {
        props.showHideModal()
    }
    
    return(
        <div className="login-container">
            <div className="login-input-container">
            <div className="login-inputfiled">
                <label>Username : </label>
            <input type="text" required onChange={onChangeInputField} value ={userdetails?.username}
             placeholder="Enter usename" name="username"/>
            </div>
            <div className="login-inputfiled">
            <label>Password : </label>
              <input type="password" required onChange={onChangeInputField} value ={userdetails?.password} 
               placeholder="Enter password" name="password"/> 
                   </div>
                   <p className="error-lbl">{error}</p> 
            </div>
            <div className="login-action-container">
            <button className="login-btn primary cursor-pointer" onClick={onClickLogin}>Login</button>
            <button className="login-btn secondary cursor-pointer" onClick={onClickCancel}>Cancel</button>
            </div>
        </div>
    )
}
export default LoginComponent;