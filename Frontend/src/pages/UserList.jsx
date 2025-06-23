



import { useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";
import { fetchAllUsers } from "../api/axios";
import { useNavigate } from "react-router-dom";
import GradientBackgroundLayout from "../utils/GradientBackgroundLayout";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import gsap from "gsap";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const USERS_PER_PAGE = 4;
  const SERVER_URL = "https://authentication-system-3-y5zg.onrender.com/api/auth/";

  const tableRef = useRef(null);
  const rowsRef = useRef([]);
  const paginationRef = useRef(null);

  useEffect(() => {
    fetchAllUsers()
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (users.length === 0) return;

    gsap.fromTo(
      tableRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
    );

    gsap.fromTo(
      rowsRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
        stagger: 0.1,
        delay: 0.3,
      }
    );

    gsap.fromTo(
      paginationRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", delay: 0.7 }
    );
  }, [users, page]);

  const totalPages = Math.ceil(users.length / USERS_PER_PAGE);
  const startIndex = (page - 1) * USERS_PER_PAGE;
  const usersToShow = users.slice(startIndex, startIndex + USERS_PER_PAGE);

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
      <div className="overflow-x-auto p-6 max-w-5xl mx-auto">
        <h2 className="text-3xl font-extrabold mb-6 text-gray-800 border-b pb-2">
          User List
        </h2>

        <table
          ref={tableRef}
          className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md overflow-hidden"
        >
          <thead className="bg-purple-600 text-white uppercase text-sm tracking-wider select-none">
            <tr>
              <th className="px-6 py-3 text-left">Sr. No</th>
              <th className="px-6 py-3 text-left">Photo</th>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Email ID</th>
            </tr>
          </thead>
          <tbody>
            {usersToShow.length > 0 ? (
              usersToShow.map((user, index) => (
                <tr
                  key={user._id}
                  ref={(el) => (rowsRef.current[index] = el)}
                  className={`border-b last:border-0 cursor-pointer
                    ${
                      index % 2 === 0
                        ? "bg-gray-50 hover:bg-purple-100 transition-colors duration-200"
                        : "bg-white hover:bg-purple-100 transition-colors duration-200"
                    }`}
                >
                  <td className="px-6 py-4 text-gray-700 font-medium">
                    {startIndex + index + 1}
                  </td>
                  <td className="px-6 py-4">
                    <img
                      src={`${SERVER_URL}${user.ProfilePicture}`}
                      alt="User"
                      className="w-10 h-10 rounded-full object-cover border border-gray-300"
                    />
                  </td>
                  <td className="px-6 py-4 text-gray-800 font-semibold">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 text-gray-600">{user.email}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="px-6 py-6 text-center text-gray-500 font-medium"
                >
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <Stack
          ref={paginationRef}
          spacing={2}
          alignItems="center"
          sx={{ mt: 4 }}
          color={"#121414"}
        >
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            variant="outlined"
            shape="rounded"
            sx={{
              "& .Mui-selected": {
                backgroundColor: "#c3dbdb", 
                color: "#121414",
              },
              "& .MuiPaginationItem-root": {
                color: "#121414",
              },
            }}
          />
        </Stack>
      </div>
    </GradientBackgroundLayout>
  );
};

export default UserList;