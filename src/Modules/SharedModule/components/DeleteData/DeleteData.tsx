import React from "react";
import Images from "../../../ImageModule/components/Images/Images";

export default function DeleteData({ deleteItem }) {
  return (
    <>
      <div className="delete text-center mt-4">
        <img src={Images.NoData} alt="" />
        <h5 className="my-2 text-theme">
          Delete This <span className="text-danger">{deleteItem}</span> ?
        </h5>
        <p className="text-theme">
          are you sure you want to delete this item ? if you are sure just click
          on delete it
        </p>
      </div>
    </>
  );
}
