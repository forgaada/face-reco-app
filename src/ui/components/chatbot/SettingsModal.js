import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalBody, Button, FormGroup, Label, Input } from 'reactstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentNodes } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { changeSettings } from "../../../redux/actions/settingsActions";

const SettingsModal = ({ isOpen, toggleHandler }) => {
    const dispatch = useDispatch();
    const currentModel = useSelector((state) => state.settings?.settings?.model);
    const [selectedModel, setSelectedModel] = useState(currentModel);

    const updateSettings = () => {
        dispatch(changeSettings({ model: selectedModel }));
        toggleHandler();
    };

    const handleModelChange = (e) => {
        setSelectedModel(e.target.value);
    };

    return (
        <>
            <Modal isOpen={isOpen} size="lg" centered>
                <ModalBody>
                    <div className='d-flex flex-column'>
                        <FontAwesomeIcon icon={faCommentNodes} size='6x' className='mb-2 opacity-25'/>
                        <div className='d-flex justify-content-center'>
                            <h3>AI Model Settings</h3>
                        </div>
                        <FormGroup tag="fieldset" className="mt-3 d-flex flex-column justify-content-center">
                            {['llama-3.3-70b-versatile', 'deepseek-r1-distill-qwen-32b', 'qwen-2.5-32b'].map((model) => (
                                <FormGroup check key={model} className="d-flex justify-content-center">
                                    <Label check>
                                        <Input
                                            type="radio"
                                            size="3x"
                                            name="model"
                                            value={model}
                                            checked={selectedModel === model}
                                            onChange={handleModelChange}
                                        />
                                        <div style={{width: "300px", marginLeft: "20px"}}>{model}</div>
                                    </Label>
                                </FormGroup>
                            ))}
                        </FormGroup>
                    </div>
                </ModalBody>
                <div className="modal-footer">
                    <Button className="main-red" onClick={updateSettings}>Save</Button>
                    <Button onClick={toggleHandler}>Cancel</Button>
                </div>
            </Modal>
        </>
    );
};

SettingsModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    toggleHandler: PropTypes.func.isRequired
};

export default SettingsModal;