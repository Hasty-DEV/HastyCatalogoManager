import { Suspense, lazy } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Loader from "../ui/components/loader/loader";

const Register = lazy(() => import("./register/register"));
const Login = lazy(()=> import("./login/login"));

const Pages = () => {
    return (
        <Router>
            <Suspense fallback={<Loader />}>
                <Routes>
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </Suspense>
        </Router>
    )
}

export default Pages; 