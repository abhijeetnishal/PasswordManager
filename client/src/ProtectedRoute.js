import { Navigate } from 'react-router-dom';
import { useCookies } from "react-cookie";

const ProtectedRoute = ({children}) => {
        //eslint-disable-next-line
        const [cookies, setCookies] = useCookies(["access_token"]);

        return cookies.access_token ? children : <Navigate to = '/login' />

}

export default ProtectedRoute