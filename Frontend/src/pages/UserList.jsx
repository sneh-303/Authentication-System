import { useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";
import { fetchAllUsers } from "../api/axios";
import { useNavigate } from "react-router-dom";
import GradientBackgroundLayout from "../utils/GradientBackgroundLayout";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import gsap from "gsap";
import * as XLSX from "xlsx";
import axios from "axios";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import DownloadIcon from "@mui/icons-material/Download";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { CircularProgress } from "@mui/material";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [excludedUsers, setExcludedUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
const [loadingUsers, setLoadingUsers] = useState(true);

  const navigate = useNavigate();
  const USERS_PER_PAGE = 5;

  const tableRef = useRef(null);
  const rowsRef = useRef([]);
  const paginationRef = useRef(null);

  const SERVER_URL = `${import.meta.env.VITE_BACKEND_URL}`;

  useEffect(() => {
     setLoadingUsers(true); // Start loading  
    fetchAllUsers()
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoadingUsers(false)); // Stop loading
  }, []);

  useEffect(() => {
    if (!users.length) return;

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

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("excelFile", file);

    try {
        setUploading(true);
      setExcludedUsers([]); //Clear previous excluded users


      const response = await axios.post(
        `${SERVER_URL}/api/auth/import-users`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const { importResults } = response.data;
      const newExcluded = importResults.filter(
        (user) => user.status !== "Imported"
      );

      setExcludedUsers(newExcluded); // Set only fresh results
      setModalOpen(newExcluded.length > 0); //  Open only if needed

      toast.success(
        `Import completed: ${
          importResults.length - newExcluded.length
        } imported, ${newExcluded.length} excluded.`
      );

      fetchAllUsers().then((res) => setUsers(res.data));
      event.target.value = null; // reset file input
    } catch (error) {
      toast.error("Failed to import users");
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  const downloadExcel = () => {
    if (!users.length) return;

    const data = users.map((user, index) => ({
      SrNo: index + 1,
      Name: user.name,
      Email: user.email,
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
    XLSX.writeFile(workbook, "RegisteredUsers.xlsx");

    toast.success("Excel file downloaded successfully!");
  };

  const logoutHandle = () => {
    localStorage.removeItem("token");
    navigate("/login");
    toast.success("Logged out successfully");
  };

  return (
    <GradientBackgroundLayout>
      <div className="p-6 max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            <PeopleAltIcon fontSize="large" />
            Registered Users
          </h2>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 mb-6">
          <Button
            variant="contained"
            startIcon={<DownloadIcon />}
            onClick={downloadExcel}
            sx={{
              backgroundColor: "#6A5ACD",
              "&:hover": { backgroundColor: "#5A4AB5" },
              fontWeight: "bold",
              textTransform: "none",
              borderRadius: 2,
              px: 3,
              py: 1.5,
            }}
          >
            Download Excel
          </Button>

          <Button
            variant="contained"
            component="label"
            // startIcon={
            //   uploading ? (
            //     <CircularProgress size={20} color="inherit" />
            //   ) : (
            //     <UploadFileIcon />
            //   )
            // }
            // disabled={uploading}
            sx={{
              backgroundColor: "#4CAF50",
              "&:hover": { backgroundColor: "#388E3C" },
              fontWeight: "bold",
              textTransform: "none",
              borderRadius: 2,
              px: 3,
              py: 1.5,
            }}
          >
            {uploading ? "Importing..." : "Upload Excel"}
            <input
              type="file"
              accept=".xlsx, .xls"
              hidden
              onChange={handleFileUpload}
            />
          </Button>

          {excludedUsers.length > 0 && (
            <Button
              variant="contained"
              onClick={() => setModalOpen(true)}
              sx={{
                backgroundColor: "#FDE68A",
                "&:hover": { backgroundColor: "#FCD34D" },
                color: "#4B0082",
                fontWeight: 600,
                borderRadius: 2,
                textTransform: "none",
                px: 3,
                py: 1.5,
              }}
            >
              View Excluded Users
            </Button>
          )}
        </div>

        {/* User Table */}
       <div className="overflow-x-auto min-h-[200px] flex justify-center items-center">
  {loadingUsers ? (
    <CircularProgress size={40} color="secondary" />
  ) : (
    <table ref={tableRef} className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">

            <thead className="bg-purple-600 text-white text-sm uppercase">
              <tr>
                <th className="px-6 py-3 text-left">Sr. No</th>
                <th className="px-6 py-3 text-left">Photo</th>
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Email</th>
              </tr>
            </thead>
            <tbody>
              {usersToShow.length > 0 ? (
                usersToShow.map((user, index) => (
                  <tr
                    key={user._id || `${user.email}-${index}`}
                    ref={(el) => (rowsRef.current[index] = el)}
                    className={`${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } hover:bg-purple-100 transition`}
                  >
                    <td className="px-6 py-4 font-medium text-gray-700">
                      {startIndex + index + 1}
                    </td>
                    <td className="px-6 py-4">
                      <img
                        className="w-10 h-10 rounded-full object-cover border"
                        alt="User"
                        src={
                          user.ProfilePicture?.startsWith("http")
                            ? user.ProfilePicture
                            : `${SERVER_URL}${user.ProfilePicture}`
                        }
                      />
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-800">
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
           )}
        </div>

        {/* Pagination */}
        <Stack ref={paginationRef} spacing={2} alignItems="center" mt={5}>
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

      {/* Excluded Users Modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            bgcolor: "white",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            maxHeight: "70vh",
            overflowY: "auto",
          }}
        >
          <h3 className="text-lg font-semibold mb-4">Excluded Users</h3>
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Reason</th>
              </tr>
            </thead>
            <tbody>
              {excludedUsers.map((user, idx) => (
                <tr key={idx}>
                  <td className="px-4 py-2 border-t border-gray-200">
                    {user.Email}
                  </td>
                  <td className="px-4 py-2 border-t border-gray-200 text-red-600">
                    {user.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Box>
      </Modal>
    </GradientBackgroundLayout>
  );
};

export default UserList;
