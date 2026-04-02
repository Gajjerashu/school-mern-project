import React from "react";
import { useLocation } from "react-router-dom";
import Header1 from "../../ComponentsAfter/Components6/Header1";
import FeesForm from "../../ComponentsAfter/Components10/FeesForm";
import PayReceive from "../../ComponentsAfter/Components10/PayReceive";
import Footer1 from "../../ComponentsAfter/Components6/Footer1";

const Fees = () => {
    const location = useLocation();
    const studentData = location.state || null;

    return (
        <>
            <Header1 />
            <FeesForm studentData={studentData} />
            <PayReceive />
            <Footer1 />
        </>
    );
};

export default Fees;