import {
    Alert,
    Button,
    Col,
    FormGroup,
    Input,
    Label,
    Modal,
    ModalBody,
    ModalFooter,
    Row
} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {signInWithEmailAndPassword, setPersistence, browserSessionPersistence, signInAnonymously} from "firebase/auth";
import {auth} from "../../../index";
import {loadUser} from "../../../redux/actions/userActions";

/**
 * This class represents modal for user's manual login to Firebase services. If email and password are set in project
 * environments - user is logged in immediately.
 */
const LoginModal = ({isOpen, toggleHandler}) => {
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                dispatch(loadUser(user));
                toggleSuccessAlert();
            }
        })
        // eslint-disable-next-line
    },[])

    const logInUserFirebase = (auth, email, password, toggleAfterSignIn = false) => {
        setPersistence(auth, browserSessionPersistence)
            .then(() => signInWithEmailAndPassword(auth, email, password))
            .then(() => {
                if (toggleAfterSignIn) {
                    toggleHandler()
                }
            })
            .catch((error) => {
                toggleErrorAlert();
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
            })
    }
    
    const onUserEmailChanged = (value) => {
        setUserEmail(value);
    }

    const onUserPasswordChanged = (value) => {
        setUserPassword(value);
    }

    const toggleSuccessAlert = () => {
        if (!showSuccessAlert) {
            setTimeout(() => setShowSuccessAlert(false), 2000)
        }
        setShowSuccessAlert(!showSuccessAlert);
    }

    const toggleErrorAlert = () => {
        if (!showErrorAlert) {
            setTimeout(() => setShowErrorAlert(false), 2000)
        }
        setShowErrorAlert(!showErrorAlert)
    }

    const logInUser = () => {
        logInUserFirebase(auth, userEmail, userPassword, true)
    }

    const logInAnonymously = () => {
        signInAnonymously(auth)
            .then(() => toggleHandler())
            .catch((error) => {
                toggleErrorAlert();
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
            })
    }

    return (
        <>
            <Modal isOpen={isOpen} size={"lg"} centered>
                <ModalBody>
                    <div className='d-flex flex-column'>
                        <FontAwesomeIcon icon={faUser} size='7x' className='mb-2 opacity-25'/>
                        <div className='d-flex justify-content-center'>
                            <h3>Log in</h3>
                        </div>
                        <div className='d-flex justify-content-center'>
                            <FormGroup className='d-flex flex-column w-50'>
                                <Label for="data-cy-login-email">Email</Label>
                                <Input id='data-cy-login-email' name="userEmail" placeholder="Type email..."
                                       onChange={(input) => onUserEmailChanged(input.target.value)}/>
                            </FormGroup>
                        </div>
                        <div className='d-flex justify-content-center'>
                            <FormGroup className='d-flex flex-column w-50'>
                                <Label for="data-cy-login-passwd">Password</Label>
                                <Input type="password" id="data-cy-login-passwd" name="userPasswd"
                                       placeholder="Type password..."
                                       onChange={(input) => onUserPasswordChanged(input.target.value)}/>
                                <Label className='d-flex justify-content-center custom-label' onClick={logInAnonymously}>
                                    <FontAwesomeIcon icon={faUser} className="user-icon"/> Continue as a quest
                                </Label>
                            </FormGroup>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Row>
                        <Col>
                            <Button onClick={logInUser} className='main-red' id='data-cy-login-button'>Log in</Button>
                        </Col>
                        <Col>
                            <Button onClick={toggleHandler}>Cancel</Button>
                        </Col>
                    </Row>
                </ModalFooter>
            </Modal>
            {showSuccessAlert &&
                <Alert className='alert-window' color="success" id='data-cy-login-success'>
                    User data successfully loaded.
                </Alert>
            }
            {showErrorAlert &&
                <Alert className='alert-window' color="danger" id='data-cy-login-error'>
                    An error occurred during loading user data.
                </Alert>
            }
        </>
    )
}

export default LoginModal;