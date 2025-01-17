import React, { useRef, useEffect, useState } from 'react';
import './App.css';
import * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection';
import '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-converter';
import * as tf from '@tensorflow/tfjs';

function App() {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [faces, setFaces] = useState([]);
    const [videoWidth, setVideoWidth] = useState(640);
    const [videoHeight, setVideoHeight] = useState(480);
    const [modelLoaded, setModelLoaded] = useState(false);
    const [detector, setDetector] = useState(null);

    useEffect(() => {
        // Set the backend to WebGL (or CPU if needed)
        tf.setBackend('webgl').then(() => {
            console.log("TensorFlow.js backend set to WebGL.");
        }).catch(err => {
            console.error("Error setting backend:", err);
        });

        console.log("Starting video stream...");
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    console.log("Video stream started.");
                }
            }).catch(err => console.error("Error accessing camera: ", err));

        const loadModel = async () => {
            console.log("Loading face detection model...");
            const model = faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh;
            const detectorConfig = {
                runtime: 'tfjs',
                maxFaces: 1 // Limit to 1 face
            };
            const detector = await faceLandmarksDetection.createDetector(model, detectorConfig);
            console.log("Model loaded successfully.");
            setModelLoaded(true); // Set model loaded state
            setDetector(detector); // Set the detector
        };

        loadModel();

    }, []);

    const detectFaces = async () => {
        if (!modelLoaded || !detector || !videoRef.current || videoRef.current.readyState !== 4) {
            // Stop recursion if model is not loaded, or video is not ready
            return;
        }

        console.log("Detecting faces...");
        const detectedFaces = await detector.estimateFaces(videoRef.current, { flipHorizontal: false });
        setFaces(detectedFaces);

        // Request next frame
        requestAnimationFrame(detectFaces);
    };

    useEffect(() => {
        if (modelLoaded && detector) {
            detectFaces(); // Start face detection when model is loaded
        }
    }, [modelLoaded, detector]); // Trigger detectFaces when modelLoaded or detector changes

    useEffect(() => {
        if (canvasRef.current && faces.length > 0) {
            console.log("Drawing faces on canvas...");
            const context = canvasRef.current.getContext('2d');
            context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

            faces.forEach(face => {
                const keypoints = face.keypoints;
                console.log("Keypoints: ", keypoints);

                const xCoords = keypoints.map(point => point.x);
                const yCoords = keypoints.map(point => point.y);

                const xMin = Math.min(...xCoords);
                const xMax = Math.max(...xCoords);
                const yMin = Math.min(...yCoords);
                const yMax = Math.max(...yCoords);

                context.strokeStyle = '#00FF00';
                context.lineWidth = 2;
                context.strokeRect(xMin, yMin, xMax - xMin, yMax - yMin);

                keypoints.forEach(point => {
                    context.fillStyle = 'red';
                    context.beginPath();
                    context.arc(point.x, point.y, 2, 0, 2 * Math.PI);
                    context.fill();
                });
            });
        } else {
            console.log("No faces to draw.");
        }
    }, [faces]);

    const firstFace = faces[0];

    return (
        <div className="App">
            <header className="App-header">
                <h1>Face Detection App</h1>
            </header>
            <main className="main-content">
                <div className="video-container">
                    <video ref={videoRef} autoPlay muted width={videoWidth} height={videoHeight} />
                    <canvas
                        className="overlay-canvas"
                        ref={canvasRef}
                        width={videoWidth}
                        height={videoHeight}
                    />
                </div>
                <div className="data-container">
                    <h2>Video Data</h2>
                    <p>Width: {videoWidth}px</p>
                    <p>Height: {videoHeight}px</p>
                    <h3>Face Details</h3>
                    {faces.length > 0 ? (
                        <div>
                            <p>Keypoints: {firstFace.keypoints.length}</p>
                            <p>Top-left: ({Math.min(...firstFace.keypoints.map(p => p.x)).toFixed(2)},
                                {Math.min(...firstFace.keypoints.map(p => p.y)).toFixed(2)})</p>
                            <p>Bottom-right: ({Math.max(...firstFace.keypoints.map(p => p.x)).toFixed(2)},
                                {Math.max(...firstFace.keypoints.map(p => p.y)).toFixed(2)})</p>
                        </div>
                    ) : (
                        <p>No faces detected yet.</p>
                    )}
                </div>
            </main>
        </div>
    );
}

export default App;
