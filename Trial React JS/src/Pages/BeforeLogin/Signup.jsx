import Header from "../../ComponentsBefore/Components1/Header";
import StudentSignup from "../../ComponentsBefore/Components2/StudentSignup"; // ✅ FIXED: Changed from StudentLogin to StudentSignup
import Footer from "../../ComponentsBefore/Components1/Footer";

const Signup = () => {
    return (
        <>
            <Header />
            <StudentSignup />
            <Footer />
        </>
    );
};

export default Signup;