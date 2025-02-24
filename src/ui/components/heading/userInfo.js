import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {Alert, Button, Col, Label, Modal, ModalBody, ModalFooter, Row} from "reactstrap";
import {useState} from "react";
import LoginModal from "./LoginModal";
import {useDispatch, useSelector} from "react-redux";
import {auth} from "../../../index";
import {signOutUser} from "../../../redux/actions/userActions";
import _ from 'lodash';

/**
 * Field containing information about signed user (with modal window).
 */
const UserInfo = () => {
    const loggedUser = useSelector((state) => state.user?.user)
    const [showModal, setShowModal] = useState(false);
    const [logInModal, setLogInModal] = useState(false);
    const dispatch = useDispatch();
    const [showInfoAlert, setShowInfoAlert] = useState(false);

    const toggle = () => {
        setShowModal(!showModal)
    }

    const toggleLogIn = () => {
        setLogInModal(!logInModal)
    }

    const toggleInfoAlert = () => {
        if (!showInfoAlert) {
            setTimeout(() => setShowInfoAlert(false), 2000)
        }
        setShowInfoAlert(!showInfoAlert)
    }

    const signOut = () => {
        auth.signOut()
            .then(() => {
                dispatch(signOutUser())
                toggleInfoAlert();
            })
            .catch((err) => {
                console.log(err)
            })
        toggle();
    }

    return (
        <>
            <div className='d-flex align-items-center cursor-pointer fa-icon-red' style={{marginRight: '15px'}}
                 onClick={!_.isEmpty(loggedUser) ? toggle : toggleLogIn}>
                <FontAwesomeIcon icon={faUser} className='fa-sm cursor-pointer secondary-text' style={{marginBottom: '5px'}}></FontAwesomeIcon>
                {!_.isEmpty(loggedUser) ?
                    <Label style={{marginLeft: '10px'}} className='cursor-pointer fw-semibold secondary-text' id='data-cy-signout-label'>{loggedUser.email|| 'Anonymous'}</Label>
                    :
                    <Label style={{marginLeft: '10px'}} className='cursor-pointer fw-semibold secondary-text' id='data-cy-login-label'>Log in</Label>
                }
            </div>
            <Modal isOpen={showModal} size={"lg"} centered>
                <ModalBody>
                    <div className='d-flex flex-column'>
                        <FontAwesomeIcon icon={faUser} size='7x' className='mb-2 opacity-25'/>
                        <div className='d-flex justify-content-center'>
                            <h3>{loggedUser.email ? loggedUser.email : "Anonymous"}</h3>
                        </div>
                        <div className='d-flex justify-content-center'>
                            <h5>You are logged in {loggedUser.email ? "with email" : "as a quest"}.</h5>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Row>
                        <Col>
                            <Button onClick={signOut} className='main-red' id='data-cy-signout-button'>Sign out</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button onClick={toggle}>Cancel</Button>
                        </Col>
                    </Row>
                </ModalFooter>
            </Modal>
            <LoginModal isOpen={logInModal} toggleHandler={toggleLogIn}/>
            {showInfoAlert &&
                <Alert className='alert-window' color="info" id="data-cy-signout-success">
                    User has been signed out.
                </Alert>
            }
        </>
    )
}

export default UserInfo;
