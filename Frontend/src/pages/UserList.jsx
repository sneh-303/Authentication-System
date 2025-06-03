import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { fetchAllUsers } from "../api/axios";
import { useNavigate } from "react-router-dom";
import GradientBackgroundLayout from "../utils/GradientBackgroundLayout";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { ClassNames } from "@emotion/react";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const USERS_PER_PAGE = 4;
  const SERVER_URL = "http://localhost:5000/";

  useEffect(() => {
    fetchAllUsers()
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Calculate total pages simply
  const totalPages = Math.ceil(users.length / USERS_PER_PAGE);

  // Calculate start index and slice users for current page
  const startIndex = (page - 1) * USERS_PER_PAGE;
  const usersToShow = users.slice(startIndex, startIndex + USERS_PER_PAGE);

  // Pagination page change handler
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const logoutHandle = () => {
    localStorage.removeItem("token");
    navigate("/login");
    toast.success("Logged out successfully");
  };

  return (
    <GradientBackgroundLayout>
      <div className="overflow-x-auto p-6">
        <h2 className="text-2xl font-bold mb-4">User List</h2>
        <table className="min-w-full bg-white border border-gray-200 shadow rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Sr. No
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Photo
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Email ID
              </th>
            </tr>
          </thead>
          <tbody>
            {usersToShow.length > 0 ? (
              usersToShow.map((user, index) => (
                <tr key={user._id} className="border-t">
                  <td className="px-6 py-4">{startIndex + index + 1}</td>
                  <td className="px-6 py-4">
                    <img
                      src={`${SERVER_URL}${user.ProfilePicture}`}
                      alt="User"
                      className="w-10 h-10 rounded-full object-cover border"
                    />
                  </td>
                  <td className="px-6 py-4">{user.name}</td>
                  <td className="px-6 py-4">{user.email}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <Stack
          spacing={2}
          alignItems="center"
          sx={{ mt: 2, backgroundColor: "##bdbdbd" }}
          color={"##e3f2fd"}
        >
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            variant="outlined"
            shape="rounded"
            sx={{
              color: "#e3f2fd", // for the text color of pagination items
              "& .Mui-selected": {
                backgroundColor: "#e3f2fd", // selected page background color
                color: "#0d47a1", // selected page text color (for contrast)
              },
            }}
          />
        </Stack>
      </div>
    </GradientBackgroundLayout>
  );
};

export default UserList;



// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import { fetchAllUsers } from "../api/axios";
// import { useNavigate } from "react-router-dom";
// import GradientBackgroundLayout from "../utils/GradientBackgroundLayout";
// import Pagination from "@mui/material/Pagination";
// import Stack from "@mui/material/Stack";
// import { ClassNames } from "@emotion/react";
// import TableComponent from "../utils/TableComponent";
// const UserList = () => {
//   const [users, setUsers] = useState([]);
//   const navigate = useNavigate();
//   const [page, setPage] = useState(1);
//   const USERS_PER_PAGE = 4;
//   const SERVER_URL = "http://localhost:5000/";

//   useEffect(() => {
//     fetchAllUsers()
//       .then((res) => setUsers(res.data))
//       .catch((err) => console.error(err));
//   }, []);

//   // Calculate total pages simply
//   const totalPages = Math.ceil(users.length / USERS_PER_PAGE);

//   // Calculate start index and slice users for current page
//   const startIndex = (page - 1) * USERS_PER_PAGE;
//   const usersToShow = users.slice(startIndex, startIndex + USERS_PER_PAGE);

//   // Pagination page change handler
//   const handlePageChange = (event, value) => {
//     setPage(value);
//   };

//   const logoutHandle = () => {
//     localStorage.removeItem("token");
//     navigate("/login");
//     toast.success("Logged out successfully");
//   };
// const rows = [
//     {
//       method: "GET",
//       description:
//         "The GET method is used to request data from a server. It does not modify any data on the server.",
//       onClick: handleGet,
//     },
    
    
//   ];
//   return (
//     <GradientBackgroundLayout>
//     <TableComponent/>
//     </GradientBackgroundLayout>
//   );
// };

// export default UserList;
