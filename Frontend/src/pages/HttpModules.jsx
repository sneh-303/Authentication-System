



// import React, { useState } from "react";
// import api, { fetchAllUsers } from "../api/axios";
// import toast from "react-hot-toast";
// import ModalComponent from "../utils/ModalComponent";
// import GradientBackgroundLayout from "../utils/GradientBackgroundLayout";
// import TableComponent from "../utils/TableComponent";

// const HttpModules = () => {
//   const [open, setOpen] = useState(false);
//   const [file, setFile] = useState(null);
//   const [successMessage, setSuccessMessage] = useState("");

//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

//   const handleGet = async () => {
//     try {
//       const response = await fetchAllUsers();
//       console.log("GET Response:", response.data);
//       setSuccessMessage("GET request completed successfully!");
//       handleOpen();
//     } catch (error) {
//       toast.error(error.response?.data?.message || "GET API failed");
//     }
//   };

//   const handlePost = async () => {
//     try {
//       const formData = new FormData();
//       formData.append("name", "a19");
//       formData.append("email", "a19@gmail.com");
//       formData.append("password", "SNEHsneh1234@");
//       formData.append("ProfilePicture", file);

//       await api.post("/auth/register", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       setSuccessMessage("POST request completed successfully!");
//       handleOpen();
//     } catch (err) {
//       toast.error(err.response?.data?.message || "POST failed");
//     }
//   };

//   const handlePut = async () => {
//     try {
//       const serialNumber = "18";
//       const payload = {
//         name: "Updated User10100",
//         email: "fab101000@gmail.com",
//         password: "snehSNEH1234@",
//         serialNumber,
//         ProfilePicture: "https://i.imgur.com/abcd124.jpg",
//       };
//       await api.put(`/auth/test-put/${serialNumber}`, payload);
//       setSuccessMessage("PUT request completed successfully!");
//       handleOpen();
//     } catch (err) {
//       toast.error(err.response?.data?.message || "PUT failed");
//     }
//   };

//   const handlePatch = async () => {
//     try {
//       const serialNumber = "18";
//       const payload = { name: "New Updated Name60" };
//       await api.patch(`/auth/test-patch/${serialNumber}`, payload);
//       setSuccessMessage("PATCH request completed successfully!");
//       handleOpen();
//     } catch (err) {
//       toast.error(err.response?.data?.message || "PATCH failed");
//     }
//   };

//   const handleDelete = async () => {
//     try {
//       const serialNumber = "18";
//       await api.delete(`/auth/test-delete/${serialNumber}`);
//       setSuccessMessage("DELETE request completed successfully!");
//       handleOpen();
//     } catch (err) {
//       toast.error(err.response?.data?.message || "DELETE failed");
//     }
//   };

//   const rows = [
//     {
//       method: "GET",
//       description: "Fetch data from the server. No changes are made.",
//       onClick: handleGet,
//     },
//     {
//       method: "POST",
//       description: "Send data to the server to create a new resource.",
//       onClick: handlePost,
//       fileInput: true,
//       onFileChange: (e) => setFile(e.target.files[0]),
//     },
//     {
//       method: "PUT",
//       description: "Update the entire resource on the server.",
//       onClick: handlePut,
//     },
//     {
//       method: "PATCH",
//       description: "Partially update the resource on the server.",
//       onClick: handlePatch,
//     },
//     {
//       method: "DELETE",
//       description: "Delete a resource from the server.",
//       onClick: handleDelete,
//     },
//   ];

//   return (
//     <GradientBackgroundLayout>
//       <div className="p-6">
//         <TableComponent rows={rows} />
//         <ModalComponent open={open} handleClose={handleClose} message={successMessage} />
//       </div>
//     </GradientBackgroundLayout>
//   );
// };

// export default HttpModules;
