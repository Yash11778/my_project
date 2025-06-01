import React, { forwardRef } from "react";
import SectionSvg from "../assets/svg/SectionSvg";

// Fix the ref warning by using forwardRef
const Section = forwardRef(
  (
    { className, id, crosses, crossesOffset, customPaddings, children },
    ref
  ) => {
    return (
      <section
        ref={ref}
        id={id}
        className={`
        relative 
        ${customPaddings || `py-10 lg:py-16 xl:py-20 ${crosses ? "lg:py-32 xl:py-40" : ""}`} 
        ${className || ""}
      `}
      >
        {children}

        {crosses && (
          <div
            className={`hidden absolute top-0 left-0 w-full lg:flex justify-between ${
              crossesOffset || "lg:px-10 xl:px-20"
            }`}
          >
            <SectionSvg />
            <SectionSvg />
          </div>
        )}

        {crosses && (
          <div
            className={`hidden absolute bottom-0 left-0 w-full lg:flex justify-between ${
              crossesOffset || "lg:px-10 xl:px-20"
            }`}
          >
            <SectionSvg />
            <SectionSvg />
          </div>
        )}
      </section>
    );
  }
);

// Add a display name to avoid warnings
Section.displayName = "Section";

export default Section;
