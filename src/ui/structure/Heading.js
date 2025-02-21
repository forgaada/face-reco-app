import PageLogo from "../components/heading/pageLogo";
import UserInfo from "../components/heading/userInfo";

/**
 * Page heading section containing logo and user info.
 */
const Heading = () => {

    return (
        <>
            <div className='heading-div'>
                <PageLogo/>
                <UserInfo/>
            </div>
        </>
    )
}

export default Heading
