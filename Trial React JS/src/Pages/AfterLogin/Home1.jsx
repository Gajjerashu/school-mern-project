import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Header1 from "../../ComponentsAfter/Components6/Header1";
import HeroSection1 from "../../ComponentsAfter/Components6/HeroSection1";
import FeaturesSection1 from "../../ComponentsAfter/Components6/FeaturesSection1";
import Inquiry from "../../ComponentsAfter/Components6/Inquiry";
import InqValid from "../../ComponentsAfter/Components6/InqValid";
import Admission from "../../ComponentsAfter/Components6/Admission";
import AcademicsSection1 from "../../ComponentsAfter/Components6/AcademicsSection1";
import FacultySection1 from "../../ComponentsAfter/Components6/FacultySection1";
import ParentPortalSection1 from "../../ComponentsAfter/Components6/ParentPortalSection1";
import StudentPortalSection1 from "../../ComponentsAfter/Components6/StudentPortalSection1";
import Footer1 from "../../ComponentsAfter/Components6/Footer1";

const Home1 = () => {
    const location = useLocation();
    const admissionRef = useRef(null);

    useEffect(() => {
        // ✅ Check if we need to scroll to admission form
        if (location.state?.scrollToAdmission) {
            // Wait for page to fully load, then scroll
            setTimeout(() => {
                if (admissionRef.current) {
                    admissionRef.current.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                }
            }, 500);
        }
    }, [location.state]);

    return (
        <>
            <Header1 />
            <HeroSection1 />
            <FeaturesSection1 />
            <Inquiry />
            <InqValid />
            <div ref={admissionRef}>
                <Admission />
            </div>
            <AcademicsSection1 />
            <FacultySection1 />
            <ParentPortalSection1 />
            <StudentPortalSection1 />
            <Footer1 />
        </>
    );
};

export default Home1;