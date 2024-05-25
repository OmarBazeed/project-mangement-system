import React from "react";
import { useUser } from "../../../../Context/AuthContext";
import moment from "moment";

export default function AccountInfo() {
  const { currentUser } = useUser();
  return (
    <>
      <section>
        <div
          className={`text-theme container d-flex justify-content-center pb-5 align-items-center `}
        >
          <div className="col-md-6">
            <table className="table table-bordered">
              <tbody>
                <tr>
                  <th className="bg-theme text-theme" colSpan={1}>
                    Name
                  </th>
                  <td className="bg-theme text-theme">
                    {currentUser?.userName}
                  </td>
                </tr>
                <tr>
                  <th className="bg-theme text-theme" scope="row">
                    E-mail
                  </th>
                  <td className="bg-theme text-theme">{currentUser?.email}</td>
                </tr>
                <tr>
                  <th className="bg-theme text-theme" scope="row">
                    Phone Number
                  </th>
                  <td className="bg-theme text-theme">
                    {currentUser?.phoneNumber}
                  </td>
                </tr>
                <tr>
                  <th className="bg-theme text-theme" scope="row">
                    ID
                  </th>
                  <td className="bg-theme text-theme">{currentUser?.id}</td>
                </tr>
                <tr>
                  <th className="bg-theme text-theme" scope="row">
                    Country
                  </th>
                  <td className="bg-theme text-theme">
                    {currentUser?.country}
                  </td>
                </tr>
                <tr>
                  <th className="bg-theme text-theme" scope="row">
                    joined on
                  </th>
                  <td className="bg-theme text-theme">
                    {moment(currentUser?.creationDate).format("LLLL")}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}
