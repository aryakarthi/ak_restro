import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers } from "../api";
import { setAllUsers } from "../app/slices/allUsersSlice";
import { DataTable } from "../components";
import { avatar } from "../assets";

const DBUsers = () => {
  const allUsers = useSelector((data) => data.allUsers);
  const editable = allUsers?.map((user) => ({ ...user }));

  const dispatch = useDispatch();

  useEffect(() => {
    if (!allUsers) {
      getAllUsers().then((data) => {
        dispatch(setAllUsers(data));
      });
    }
  }, []);

  return (
    <div className="flex items-center justify-self-center gap-4 pt-6 w-full">
      <DataTable
        columns={[
          {
            title: "Image",
            field: "photoURL",
            render: (rowData) => (
              <img
                src={rowData.photoURL ? rowData.photoURL : avatar}
                className="w-32 h-16 object-contain rounded-full"
              />
            ),
          },
          {
            title: "Name",
            field: "displayName",
          },
          {
            title: "Email",
            field: "email",
          },
          {
            title: "Verified",
            field: "emailVerified",
            render: (rowData) => (
              <p
                className={`px-2 py-1 w-32 text-center text-primary rounded-md ${
                  rowData.emailVerified ? "bg-emerald-500" : "bg-red-500"
                }`}
              >
                {rowData.emailVerified ? "Verified" : "Not Verified"}
              </p>
            ),
          },
        ]}
        data={editable}
        title="List of Users"
      />
    </div>
  );
};

export default DBUsers;
