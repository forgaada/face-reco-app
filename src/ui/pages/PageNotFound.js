import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTriangleExclamation} from "@fortawesome/free-solid-svg-icons";

const PageNotFound = () => {

    return (
        <>
            <div className='mt-5 main-container align-items-center'>
                <FontAwesomeIcon
                    icon={faTriangleExclamation}
                    size='7x'
                    className='mb-2 opacity-25'
                    color='black'
                />
                <p className='mb-0 fs-4 fw-bolder'>Page not found</p>
                <p className='mb-0'>The address you are trying to reach doesn't exist.</p>
            </div>
        </>
    )
}

export default PageNotFound;