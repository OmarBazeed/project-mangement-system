import React from "react";
import Images from "../../../ImageModule/components/Images/Images";

export default function NoData() {
  return (
    <>
      <section>
        <div className="container-fluid text-center mt-5">
          <img src={Images.NoData} alt="" />
          <h4 className="my-3 text-theme">No Data !</h4>
        </div>
      </section>
    </>
  );
}
