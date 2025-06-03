// import GradientBackgroundLayout from "../utils/GradientBackgroundLayout";
// import api from "../api/axios";
// import { fetchAllUsers } from "../api/axios";
// import toast from "react-hot-toast";
// import ModalComponent from "../utils/ModalComponent";
// import React from "react";
// import { useState } from "react";
// import { data } from "react-router-dom";


// const HttpModules = () => {
//   const [open, setOpen] = useState(false);
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);
// const [file, setFile] = useState(null);
// const [successMessage, setSuccessMessage] = useState("");


//  const handleGet = async () => {
//   try {
//     const token = localStorage.getItem("token");

//     const response = await fetchAllUsers();
//       // , {
//       // headers: {
//       //   Authorization: `Bearer ${token}`,
//       // },
//     // });

//     console.log("GET Response:", response.data);
//     setSuccessMessage("GET request completed successfully!");
//     handleOpen();

//   } catch (error) {
//     toast.error(error.response?.data?.message || "GET API failed");
//     console.error("GET Error:", error.response?.data || error.message);
//   }
// };


//   const handlePost = async () => {
//     try {
//       const formData = new FormData();
//       formData.append("name", "a12");
//       formData.append("email", "a12@gmail.com");
//       formData.append("password", "SNEHsneh1234@");
//       formData.append("ProfilePicture", file); // Assume file state is already handled

//       await api.post("/auth/register", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       setSuccessMessage("POST request completed successfully!");
//       handleOpen();
//     } catch (err) {
//       toast.error(err.response?.data?.message || "POST failed");
//     }
//   };

//   const handlePut = async () => {
//     try {
//       const serialNumber = '17'
//       const payload = { name: "Updated User1", email:'fab1@gmail.com',password:"snehSNEH1234@",serialNumber:'17 ', ProfilePicture:"https://i.imgur.com/abcd123.jpg" };
//      await api.put(`/auth/test-put/${serialNumber}`, payload);
//       setSuccessMessage("PUT request completed successfully!");
//       handleOpen();
//     } catch (err) {
//       toast.error(err.response?.data?.message || "PUT failed");
//     } 
//   };

//   const handlePatch = async () => {
//     try {
//          const serialNumber = '17'
//       const payload = { name: "New Updated Name2" };
//      await api.patch(`/auth/test-patch/${serialNumber}`, payload);
//       setSuccessMessage("PATCH request completed successfully!");
//       handleOpen();
//     } catch (err) {
//       toast.error(err.response?.data?.message || "PATCH failed");
//     }
//   };


//   const handleDelete = async () => {
//     const serialNumber = '5'
//     try {
//       await api.delete(`/auth/test-delete/${serialNumber}`);

//       setSuccessMessage("DELETE request completed successfully!");
//       handleOpen();
//     } catch (err) {
//       toast.error(err.response?.data?.message || "DELETE failed");
//     }
//   };

// return (
//   <GradientBackgroundLayout>
//     <div className="overflow-x-auto p-6">
//       {/* <h2 className="text-2xl font-bold mb-4">HTTP Methods</h2> */}
//       <table className="min-w-full bg-white border border-gray-200 shadow rounded-lg">
//         <thead className="bg-gray-100">
//           <tr>
//             <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
//               Sr. No
//             </th>
//             <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
//               Http Methods
//             </th>
//             <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
//               Description
//             </th>
//             <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
//               Call Api
//             </th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr className="border-t">
//             <td className="px-6 py-4">1</td>
//             <td className="px-6 py-4">GET</td>
//             <td className="px-6 py-4">
//               The GET method is used to request data from a server. It does not
//               modify any data on the server. The data is usually passed through
//               the URL as query parameters.
//             </td>
//             <td className="px-6 py-4">
//               <button
//                 onClick={handleGet}

//                 className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow-lg transition-all duration-300 hover:bg-blue-700 hover:shadow-xl hover:scale-105 focus:outline-none"
//               >
//                 Click Me
//               </button>
//             </td>
//           </tr>
//           <tr className="border-t">
//             <td className="px-6 py-4">2</td>
//             <td className="px-6 py-4">POST</td>
//             <td className="px-6 py-4">
//               The POST method is used to send data to the server to create a new
//               resource. Data is sent in the request body (often JSON or form
//               data).
//             </td>
//             <td className="px-6 py-4">
//               <input
//                 type="file"
                
//                 onChange={(e) => setFile(e.target.files[0])}
//                 className="block w-full text-sm text-gray-700 border border-gray-300 rounded-md file:mr-4 file:py-1 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
//               />
//               <button
//                 onClick={handlePost}
//                 className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow-lg transition-all duration-300 hover:bg-blue-700 hover:shadow-xl hover:scale-105 focus:outline-none"
//               >
//                 Click Me
//               </button>
//             </td>
//           </tr>
//           <tr className="border-t">
//             <td className="px-6 py-4">3</td>
//             <td className="px-6 py-4">PUT</td>
//             <td className="px-6 py-4">
//               The PUT method is used to completely update or replace a resource
//               on the server. You send the entire updated object, even if only
//               one field changed.
//             </td>
//             <td className="px-6 py-4">
//               <button
//                  onClick={handlePut}
//                 className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow-lg transition-all duration-300 hover:bg-blue-700 hover:shadow-xl hover:scale-105 focus:outline-none"
//               >
//                 Click Me
//               </button>
//             </td>
//           </tr>
//           <tr className="border-t">
//             <td className="px-6 py-4">4</td>
//             <td className="px-6 py-4">PATCH</td>
//             <td className="px-6 py-4">
//               The PATCH method is used to partially update a resource. Only send
//               the changed fields in the request body. More efficient when only
//               one or two fields need updating.
//             </td>
//             <td className="px-6 py-4">
//               <button
//                 onClick={handlePatch}
//                 className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow-lg transition-all duration-300 hover:bg-blue-700 hover:shadow-xl hover:scale-105 focus:outline-none"
//               >
//                 Click Me
//               </button>
//             </td>
//           </tr>
//           <tr className="border-t">
//             <td className="px-6 py-4">5</td>
//             <td className="px-6 py-4">DELETE</td>
//             <td className="px-6 py-4">
//               The DELETE method is used to remove a resource from the server. It
//               typically doesn’t require a request body, just the ID or path.
//             </td>
//             <td className="px-6 py-4">
//               <button
//                 onClick={handleDelete}
//                 className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow-lg transition-all duration-300 hover:bg-blue-700 hover:shadow-xl hover:scale-105 focus:outline-none"
//               >
//                 Click Me
//               </button>
//             </td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//     <ModalComponent open={open} handleClose={handleClose}  message={successMessage} />
//   </GradientBackgroundLayout>
// );
// }
// export default HttpModules;




// import React, { useState } from "react";
// import toast from "react-hot-toast";
// import GradientBackgroundLayout from "../utils/GradientBackgroundLayout";
// import ModalComponent from "../utils/ModalComponent";
// import api, { fetchAllUsers } from "../api/axios";
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
//       formData.append("name", "a12");
//       formData.append("email", "a12@gmail.com");
//       formData.append("password", "SNEHsneh1234@");
//       formData.append("ProfilePicture", file);
//       await api.post("/auth/register", formData);
//       setSuccessMessage("POST request completed successfully!");
//       handleOpen();
//     } catch (err) {
//       toast.error(err.response?.data?.message || "POST failed");
//     }
//   };

//   const handlePut = async () => {
//     try {
//       const payload = {
//         name: "Updated User1",
//         email: "fab1@gmail.com",
//         password: "snehSNEH1234@",
//         serialNumber: "17",
//         ProfilePicture: "https://i.imgur.com/abcd123.jpg",
//       };
//       await api.put("/auth/test-put/17", payload);
//       setSuccessMessage("PUT request completed successfully!");
//       handleOpen();
//     } catch (err) {
//       toast.error(err.response?.data?.message || "PUT failed");
//     }
//   };

//   const handlePatch = async () => {
//     try {
//       await api.patch("/auth/test-patch/17", { name: "New Updated Name2" });
//       setSuccessMessage("PATCH request completed successfully!");
//       handleOpen();
//     } catch (err) {
//       toast.error(err.response?.data?.message || "PATCH failed");
//     }
//   };

//   const handleDelete = async () => {
//     try {
//       await api.delete("/auth/test-delete/5");
//       setSuccessMessage("DELETE request completed successfully!");
//       handleOpen();
//     } catch (err) {
//       toast.error(err.response?.data?.message || "DELETE failed");
//     }
//   };

//   const rows = [
//     {
//       method: "GET",
//       description:
//         "The GET method is used to request data from a server. It does not modify any data on the server.",
//       onClick: handleGet,
//     },
//     {
//       method: "POST",
//       description:
//         "The POST method is used to send data to the server to create a new resource.",
//       onClick: handlePost,
//       fileInput: true,
//       onFileChange: (e) => setFile(e.target.files[0]),
//     },
//     {
//       method: "PUT",
//       description:
//         "The PUT method is used to completely update or replace a resource on the server.",
//       onClick: handlePut,
//     },
//     {
//       method: "PATCH",
//       description:
//         "The PATCH method is used to partially update a resource. Only send the changed fields.",
//       onClick: handlePatch,
//     },
//     {
//       method: "DELETE",
//       description:
//         "The DELETE method is used to remove a resource from the server.",
//       onClick: handleDelete,
//     },
    
//   ];

//   return (
//     <GradientBackgroundLayout>
//       <TableComponent rows={rows} />
//       <ModalComponent open={open} handleClose={handleClose} message={successMessage} />
//     </GradientBackgroundLayout>
//   );
// };

// export default HttpModules;





import React, { useState } from "react";
import api, { fetchAllUsers } from "../api/axios";
import toast from "react-hot-toast";
import ModalComponent from "../utils/ModalComponent";
import GradientBackgroundLayout from "../utils/GradientBackgroundLayout";
import TableComponent from "../utils/TableComponent";

const HttpModules = () => {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleGet = async () => {
    try {
      const response = await fetchAllUsers();
      console.log("GET Response:", response.data);
      setSuccessMessage("GET request completed successfully!");
      handleOpen();
    } catch (error) {
      toast.error(error.response?.data?.message || "GET API failed");
    }
  };

  const handlePost = async () => {
    try {
      const formData = new FormData();
      formData.append("name", "a12");
      formData.append("email", "a12@gmail.com");
      formData.append("password", "SNEHsneh1234@");
      formData.append("ProfilePicture", file);

      await api.post("/auth/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSuccessMessage("POST request completed successfully!");
      handleOpen();
    } catch (err) {
      toast.error(err.response?.data?.message || "POST failed");
    }
  };

  const handlePut = async () => {
    try {
      const serialNumber = "17";
      const payload = {
        name: "Updated User1",
        email: "fab1@gmail.com",
        password: "snehSNEH1234@",
        serialNumber,
        ProfilePicture: "https://i.imgur.com/abcd123.jpg",
      };
      await api.put(`/auth/test-put/${serialNumber}`, payload);
      setSuccessMessage("PUT request completed successfully!");
      handleOpen();
    } catch (err) {
      toast.error(err.response?.data?.message || "PUT failed");
    }
  };

  const handlePatch = async () => {
    try {
      const serialNumber = "17";
      const payload = { name: "New Updated Name2" };
      await api.patch(`/auth/test-patch/${serialNumber}`, payload);
      setSuccessMessage("PATCH request completed successfully!");
      handleOpen();
    } catch (err) {
      toast.error(err.response?.data?.message || "PATCH failed");
    }
  };

  const handleDelete = async () => {
    try {
      const serialNumber = "5";
      await api.delete(`/auth/test-delete/${serialNumber}`);
      setSuccessMessage("DELETE request completed successfully!");
      handleOpen();
    } catch (err) {
      toast.error(err.response?.data?.message || "DELETE failed");
    }
  };

  const rows = [
    {
      method: "GET",
      description: "Fetch data from the server. No changes are made.",
      onClick: handleGet,
    },
    {
      method: "POST",
      description: "Send data to the server to create a new resource.",
      onClick: handlePost,
      fileInput: true,
      onFileChange: (e) => setFile(e.target.files[0]),
    },
    {
      method: "PUT",
      description: "Update the entire resource on the server.",
      onClick: handlePut,
    },
    {
      method: "PATCH",
      description: "Partially update the resource on the server.",
      onClick: handlePatch,
    },
    {
      method: "DELETE",
      description: "Delete a resource from the server.",
      onClick: handleDelete,
    },
  ];

  return (
    <GradientBackgroundLayout>
      <div className="p-6">
        <TableComponent rows={rows} />
        <ModalComponent open={open} handleClose={handleClose} message={successMessage} />
      </div>
    </GradientBackgroundLayout>
  );
};

export default HttpModules;
