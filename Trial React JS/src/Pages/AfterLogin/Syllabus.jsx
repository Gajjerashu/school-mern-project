import React from "react";
import Header1 from "../../ComponentsAfter/Components6/Header1";
import Sill from "../../ComponentsAfter/Components20/Sill";
import Prime from "../../ComponentsAfter/Components20/Prime";
import Footer1 from "../../ComponentsAfter/Components6/Footer1";
import { useLocation } from "react-router-dom";

const Syllabus = () => {
  const location = useLocation();
  const isPrimePage = location.pathname === "/AfterLogin/Syllabus/Primary" ||
    location.pathname === "/AfterLogin/Syllabus/Middle" ||
    location.pathname === "/AfterLogin/Syllabus/High";

  return (
    <div>
      <Header1 />
      {isPrimePage ? <Prime /> : <Sill />}
      <Footer1 />
    </div>
  );
};

export default Syllabus;