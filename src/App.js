import React, {Suspense} from 'react';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Heading from "./ui/structure/Heading";
import {Container, Row} from "reactstrap";
import PageNotFound from "./ui/pages/PageNotFound";
import FaceRecognitionScreen from "./ui/pages/FaceRecognitionScreen";

function App() {
    return (
        <BrowserRouter>
            <Heading/>
            <Container fluid className='d-flex flex-grow-1 flex-column w-85'>
                <Row className=''>
                    <Suspense>
                        <Routes>
                            <Route path='/' element={<Navigate to="/home" />} />
                            <Route exact path='/home' element={<FaceRecognitionScreen />} />
                            <Route path='*' element={<PageNotFound />} />
                        </Routes>
                    </Suspense>
                </Row>
            </Container>
        </BrowserRouter>
    );
}

export default App;
