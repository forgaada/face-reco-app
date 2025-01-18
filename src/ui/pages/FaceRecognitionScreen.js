import {useEffect, useRef, useState} from "react";
import 'tracking/build/tracking-min.js';
import 'tracking/build/data/face-min.js';

/**
 * Main screen of the application where user uses camera for face detection.
 */
const FaceRecognitionScreen = () => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null); // Canvas ref for clearing and drawing
    const [faces, setFaces] = useState([]);
    const [videoWidth, setVideoWidth] = useState(640);
    const [videoHeight, setVideoHeight] = useState(480);

    useEffect(() => {
        // Ensure the video stream is fetched and shown
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            }).catch(err => {
            console.error("Error accessing camera: ", err);
        });

        // Tracking setup
        const tracker = new window.tracking.ObjectTracker('face');
        tracker.setInitialScale(0.8);
        tracker.setStepSize(2);
        tracker.setEdgesDensity(0.1);

        window.tracking.track(videoRef.current, tracker, { camera: true });

        tracker.on('track', (event) => {
            setFaces(event.data);  // Save face data
        });
    }, []);

    useEffect(() => {
        if (canvasRef.current && faces.length > 0) {
            const context = canvasRef.current.getContext('2d');
            context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height); // Clear canvas

            // Draw the rectangles for each detected face
            faces.forEach((face) => {
                context.strokeStyle = '#ff0000';
                context.lineWidth = 4;
                context.strokeRect(face.x, face.y, face.width, face.height);
            });
        }
    }, [faces]);


    return(
        <div className='main-content'>
            <div className="video-container">
                <video ref={videoRef} autoPlay muted width={videoWidth} height={videoHeight}/>
                <canvas
                    className="overlay-canvas"
                    ref={canvasRef}
                    width={videoWidth}
                    height={videoHeight}
                />
            </div>
            <div className="data-container">
                <h3>Face Details</h3>
                {faces.length > 0 ? (
                    <p>{faces.length} faces detected.</p>
                ) : (
                    <p>No faces detected yet.</p>
                )}
                <h3>Video Data</h3>
                <p>Width: {videoWidth}px</p>
                <p>Height: {videoHeight}px</p>
            </div>
        </div>
    )
}

export default FaceRecognitionScreen;