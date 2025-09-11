"use client";
import { Oval } from "react-loader-spinner";

export function Loading() {
   const loaderClass = {
      position: "absolute",
      left: "45%",
      top: "45%",
   };
   return (
      <Oval
         visible={true}
         height="100"
         width="100"
         ariaLabel="oval-loading"
         wrapperStyle={loaderClass}
         wrapperClass="magnifying-glass-wrapper"
         color="#9FC131"
      />
   );
}
