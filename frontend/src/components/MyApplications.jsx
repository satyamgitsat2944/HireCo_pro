// // import React, { useEffect } from "react";
// // import { useSelector, useDispatch } from "react-redux";
// // import { Link } from "react-router-dom";
// // import { toast } from "react-toastify";
// // import {
// //   clearAllApplicationErrors,
// //   resetApplicationSlice,
// //   deleteApplication,
// //   fetchJobSeekerApplications,
// // } from "../store/slices/applicationSlice";
// // import Spinner from "./Spinner";

// // const MyApplications = () => {
// //   const { user, isAuthenticated } = useSelector((state) => state.user);
// //   const { loading, error, applications, message } = useSelector(
// //     (state) => state.applications
// //   );
// //   const dispatch = useDispatch();

// //   useEffect(() => {
// //     dispatch(fetchJobSeekerApplications());
// //   }, []);

// //   useEffect(() => {
// //     if (error) {
// //       toast.error(error);
// //       dispatch(clearAllApplicationErrors());
// //     }
// //     if (message) {
// //       toast.success(message);
// //       dispatch(resetApplicationSlice());
// //       dispatch(fetchJobSeekerApplications());
// //     }
// //   }, [dispatch, error, message]);

// //   const handleDeleteApplication = (id) => {
// //     dispatch(deleteApplication(id));
// //   };

// //   return (
// //     <>
// //       {loading ? (
// //         <Spinner />
// //       ) : applications && applications.length <= 0 ? (
// //         <h1 style={{ fontSize: "1.4rem", fontWeight: "600" }}>
// //           You have not applied for any job.
// //         </h1>
// //       ) : (
// //         <>
// //           <div className="account_components">
// //             <h3>My Application For Jobs</h3>
// //             <div className="applications_container">
// //               {applications.map((element) => {
// //                 return (
// //                   <div className="card" key={element._id}>
// //                     <p className="sub-sec">
// //                       <span>Job Title: </span> {element.jobInfo.jobTitle}
// //                     </p>
// //                     <p className="sub-sec">
// //                       <span>Name</span> {element.jobSeekerInfo.name}
// //                     </p>
// //                     <p className="sub-sec">
// //                       <span>Email</span> {element.jobSeekerInfo.email}
// //                     </p>
// //                     <p className="sub-sec">
// //                       <span>Phone: </span> {element.jobSeekerInfo.phone}
// //                     </p>
// //                     <p className="sub-sec">
// //                       <span>Address: </span> {element.jobSeekerInfo.address}
// //                     </p>
// //                     <p className="sub-sec">
// //                       <span>Coverletter: </span>
// //                       <textarea
// //                         value={element.jobSeekerInfo.coverLetter}
// //                         rows={5}
// //                         disabled
// //                       ></textarea>
// //                     </p>
// //                     <div className="btn-wrapper">
// //                       <button
// //                         className="outline_btn"
// //                         onClick={() => handleDeleteApplication(element._id)}
// //                       >
// //                         Delete Application
// //                       </button>
// //                       <Link
// //                         to={
// //                           element.jobSeekerInfo &&
// //                           element.jobSeekerInfo.resume.url
// //                         }
// //                         className="btn"
// //                         target="_blank"
// //                       >
// //                         View Resume
// //                       </Link>
// //                     </div>
// //                   </div>
// //                 );
// //               })}
// //             </div>
// //           </div>
// //         </>
// //       )}
// //     </>
// //   );
// // };

// // export default MyApplications;



// import React, { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { Link } from "react-router-dom";
// import { toast } from "react-toastify";
// import { 
//   FiBriefcase, 
//   FiUser, 
//   FiMail, 
//   FiPhone, 
//   FiMapPin, 
//   FiFileText,
//   FiTrash2,
//   FiExternalLink
// } from "react-icons/fi";
// import {
//   clearAllApplicationErrors,
//   resetApplicationSlice,
//   deleteApplication,
//   fetchJobSeekerApplications,
// } from "../store/slices/applicationSlice";
// import './myapplication.css';
// import Spinner from "./Spinner";

// const MyApplications = () => {
//   const { user, isAuthenticated } = useSelector((state) => state.user);
//   const { loading, error, applications, message } = useSelector(
//     (state) => state.applications
//   );
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(fetchJobSeekerApplications());
//   }, [dispatch]);

//   useEffect(() => {
//     if (error) {
//       toast.error(error);
//       dispatch(clearAllApplicationErrors());
//     }
//     if (message) {
//       toast.success(message);
//       dispatch(resetApplicationSlice());
//       dispatch(fetchJobSeekerApplications());
//     }
//   }, [dispatch, error, message]);

//   const handleDeleteApplication = (id) => {
//     if (window.confirm("Are you sure you want to delete this application?")) {
//       dispatch(deleteApplication(id));
//     }
//   };

//   return (
//     <div className="applications-container">
//       {loading ? (
//         <Spinner />
//       ) : applications && applications.length <= 0 ? (
//         <div className="glass-card empty-state">
//           <h1 className="empty-title">
//             <FiBriefcase className="title-icon" /> No Applications Found
//           </h1>
//           <p className="empty-message">You have not applied for any jobs yet.</p>
//           <Link to="/jobs" className="auth-button">
//             Browse Jobs
//           </Link>
//         </div>
//       ) : (
//         <div className="glass-card">
//           <h2 className="applications-title">
//             <FiBriefcase className="title-icon" /> My Job Applications
//           </h2>
//           <div className="applications-grid">
//             {applications.map((application) => (
//               <div className="application-card" key={application._id}>
//                 <div className="application-header">
//                   <h3 className="job-title">
//                     <FiBriefcase /> {application.jobInfo.jobTitle}
//                   </h3>
//                 </div>
                
//                 <div className="application-details">
//                   <div className="detail-item">
//                     <FiUser className="detail-icon" />
//                     <span>{application.jobSeekerInfo.name}</span>
//                   </div>
                  
//                   <div className="detail-item">
//                     <FiMail className="detail-icon" />
//                     <span>{application.jobSeekerInfo.email}</span>
//                   </div>
                  
//                   <div className="detail-item">
//                     <FiPhone className="detail-icon" />
//                     <span>{application.jobSeekerInfo.phone || "Not provided"}</span>
//                   </div>
                  
//                   <div className="detail-item">
//                     <FiMapPin className="detail-icon" />
//                     <span>{application.jobSeekerInfo.address || "Not provided"}</span>
//                   </div>
                  
//                   {application.jobSeekerInfo.coverLetter && (
//                     <div className="detail-item full-width">
//                       <FiFileText className="detail-icon" />
//                       <div className="cover-letter">
//                         <label>Cover Letter:</label>
//                         <p>{application.jobSeekerInfo.coverLetter}</p>
//                       </div>
//                     </div>
//                   )}
//                 </div>
                
//                 <div className="application-actions">
//                   <button
//                     className="danger-button"
//                     onClick={() => handleDeleteApplication(application._id)}
//                   >
//                     <FiTrash2 className="button-icon" /> Delete
//                   </button>
                  
//                   {application.jobSeekerInfo?.resume?.url && (
//                     <a
//                       href={application.jobSeekerInfo.resume.url}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="auth-button"
//                     >
//                       <FiExternalLink className="button-icon" /> View Resume
//                     </a>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyApplications;
// import React, { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { fetchJobSeekerApplications } from "../store/slices/applicationSlice";
// import Spinner from "./Spinner";
// import { FaClock, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
// import { toast } from "react-toastify";

// const MyApplications = () => {
//   const dispatch = useDispatch();
//   const { applications, loading, error } = useSelector(
//     (state) => state.applications
//   );

//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         await dispatch(fetchJobSeekerApplications()).unwrap();
//       } catch (err) {
//         toast.error(err.message || "Failed to load applications");
//       }
//     };
//     loadData();
//   }, [dispatch]);

//   const getStatusIcon = (status) => {
//     switch (status.toLowerCase()) {
//       case "pending":
//         return <FaClock className="text-yellow-500" />;
//       case "accepted":
//         return <FaCheckCircle className="text-green-500" />;
//       case "rejected":
//         return <FaTimesCircle className="text-red-500" />;
//       default:
//         return <FaClock className="text-gray-500" />;
//     }
//   };

//   if (loading) return <Spinner />;

//   if (error)
//     return (
//       <div className="max-w-4xl mx-auto p-4">
//         <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
//           <p>Error loading applications: {error}</p>
//           <button
//             onClick={() => dispatch(fetchJobSeekerApplications())}
//             className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
//           >
//             Retry
//           </button>
//         </div>
//       </div>
//     );

//   return (
//     <div className="max-w-4xl mx-auto p-4">
//       <h2 className="text-2xl font-bold mb-6 text-gray-800">My Job Applications</h2>

//       {applications.length === 0 ? (
//         <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4">
//           <p>You haven't applied to any jobs yet.</p>
//         </div>
//       ) : (
//         <div className="space-y-4">
//           {applications.map((application) => (
//             <div
//               key={application._id}
//               className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow"
//             >
//               <div className="flex justify-between items-start">
//                 <div>
//                   <h3 className="text-xl font-semibold text-gray-800">
//                     {application.job?.title || "Untitled Position"}
//                   </h3>
//                   <p className="text-gray-600">
//                     {application.job?.companyName || "No company specified"}
//                   </p>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   {getStatusIcon(application.status)}
//                   <span
//                     className={`px-3 py-1 rounded-full text-sm font-medium ${
//                       application.status.toLowerCase() === "pending"
//                         ? "bg-yellow-100 text-yellow-800"
//                         : application.status.toLowerCase() === "accepted"
//                         ? "bg-green-100 text-green-800"
//                         : "bg-red-100 text-red-800"
//                     }`}
//                   >
//                     {application.status}
//                   </span>
//                 </div>
//               </div>

//               <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <p className="text-gray-700">
//                     <span className="font-medium">Applied On:</span>{" "}
//                     {new Date(application.createdAt).toLocaleDateString("en-US", {
//                       year: "numeric",
//                       month: "long",
//                       day: "numeric",
//                     })}
//                   </p>
//                   <p className="text-gray-700">
//                     <span className="font-medium">Location:</span>{" "}
//                     {application.job?.location || "Not specified"}
//                   </p>
//                 </div>
//                 <div>
//                   <p className="text-gray-700">
//                     <span className="font-medium">Job Type:</span>{" "}
//                     {application.job?.jobType || "Not specified"}
//                   </p>
//                   <p className="text-gray-700">
//                     <span className="font-medium">Salary:</span>{" "}
//                     {application.job?.salary || "Not specified"}
//                   </p>
//                 </div>
//               </div>

//               {application.status.toLowerCase() === "rejected" && (
//                 <div className="mt-4 bg-red-50 p-3 rounded-md">
//                   <p className="text-red-700">
//                     Your application was not selected for this position.
//                   </p>
//                 </div>
//               )}

//               {application.status.toLowerCase() === "accepted" && (
//                 <div className="mt-4 bg-green-50 p-3 rounded-md">
//                   <p className="text-green-700">
//                     Congratulations! Your application was accepted.
//                   </p>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyApplications;




// import React, { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { fetchJobSeekerApplications } from "../store/slices/applicationSlice";
// import Spinner from "./Spinner";
// import { FaClock, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

// const MyApplications = () => {
//   const dispatch = useDispatch();
//   const { applications, loading, error } = useSelector(
//     (state) => state.applications
//   );

//   useEffect(() => {
//     dispatch(fetchJobSeekerApplications());
//   }, [dispatch]);

//   const getStatusIcon = (status) => {
//     const safeStatus = (status || "pending").toLowerCase();
//     switch (safeStatus) {
//       case "pending":
//         return <FaClock className="text-yellow-500" />;
//       case "accepted":
//         return <FaCheckCircle className="text-green-500" />;
//       case "rejected":
//         return <FaTimesCircle className="text-red-500" />;
//       default:
//         return <FaClock className="text-gray-500" />;
//     }
//   };

//   if (loading) return <Spinner />;

//   if (error)
//     return (
//       <div className="max-w-4xl mx-auto p-4">
//         <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
//           <p>Error loading applications: {error}</p>
//           <button
//             onClick={() => dispatch(fetchJobSeekerApplications())}
//             className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
//           >
//             Retry
//           </button>
//         </div>
//       </div>
//     );

//   if (!applications || applications.length === 0) {
//     return (
//       <div className="max-w-4xl mx-auto p-4">
//         <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4">
//           <p>You haven't applied to any jobs yet.</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-4xl mx-auto p-4">
//       <h2 className="text-2xl font-bold mb-6 text-gray-800">My Job Applications</h2>

//       <div className="space-y-4">
//         {applications.map((application) => {
//           const job = application?.jobInfo || {};
//           const status = (application?.status || "pending").toLowerCase();

//           return (
//             <div
//               key={application?._id}
//               className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow"
//             >
//               <div className="flex justify-between items-start">
//                 <div>
//                   <h3 className="text-xl font-semibold text-gray-800">
//                     {job?.jobTitle ?? "Untitled Position"}
//                   </h3>
//                   <p className="text-gray-600">
//                     {/* Adjust as per your data structure */}
//                     {application.employerInfo?.id ?? "No company specified"}
//                   </p>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   {getStatusIcon(status)}
//                   <span
//                     className={`px-3 py-1 rounded-full text-sm font-medium ${
//                       status === "pending"
//                         ? "bg-yellow-100 text-yellow-800"
//                         : status === "accepted"
//                         ? "bg-green-100 text-green-800"
//                         : "bg-red-100 text-red-800"
//                     }`}
//                   >
//                     {status}
//                   </span>
//                 </div>
//               </div>

//               <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <p className="text-gray-700">
//                     <span className="font-medium">Applied On:</span>{" "}
//                     {application.createdAt
//                       ? new Date(application.createdAt).toLocaleDateString(
//                           "en-US",
//                           {
//                             year: "numeric",
//                             month: "long",
//                             day: "numeric",
//                           }
//                         )
//                       : "Not available"}
//                   </p>
//                   <p className="text-gray-700">
//                     <span className="font-medium">Location:</span>{" "}
//                     {job?.location ?? "Not specified"}
//                   </p>
//                 </div>
//                 <div>
//                   <p className="text-gray-700">
//                     <span className="font-medium">Job Type:</span>{" "}
//                     {job?.jobType ?? "Not specified"}
//                   </p>
//                   <p className="text-gray-700">
//                     <span className="font-medium">Salary:</span>{" "}
//                     {typeof job?.salary === "number"
//                       ? `$${job.salary.toLocaleString()}`
//                       : "Not specified"}
//                   </p>
//                 </div>
//               </div>

//               {status === "rejected" && (
//                 <div className="mt-4 bg-red-50 p-3 rounded-md">
//                   <p className="text-red-700">
//                     Your application was not selected for this position.
//                   </p>
//                 </div>
//               )}

//               {status === "accepted" && (
//                 <div className="mt-4 bg-green-50 p-3 rounded-md">
//                   <p className="text-green-700">
//                     Congratulations! Your application was accepted.
//                   </p>
//                 </div>
//               )}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default MyApplications;




// import React, { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { fetchJobSeekerApplications } from "../store/slices/applicationSlice";
// import Spinner from "./Spinner";
// import { FaClock, FaCheckCircle, FaTimesCircle, FaBriefcase, FaMapMarkerAlt, FaMoneyBillWave, FaCalendarAlt } from "react-icons/fa";

// const MyApplications = () => {
//   const dispatch = useDispatch();
//   const { applications, loading, error } = useSelector(
//     (state) => state.applications
//   );

//   useEffect(() => {
//     dispatch(fetchJobSeekerApplications());
//   }, [dispatch]);

//   const getStatusIcon = (status) => {
//     const safeStatus = (status || "pending").toLowerCase();
//     switch (safeStatus) {
//       case "pending":
//         return <FaClock className="text-yellow-500" />;
//       case "accepted":
//         return <FaCheckCircle className="text-green-500" />;
//       case "rejected":
//         return <FaTimesCircle className="text-red-500" />;
//       default:
//         return <FaClock className="text-gray-500" />;
//     }
//   };

//   if (loading) return <Spinner />;

//   if (error)
//     return (
//       <div className="applications-container">
//         <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
//           <p>Error loading applications: {error}</p>
//           <button
//             onClick={() => dispatch(fetchJobSeekerApplications())}
//             className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
//           >
//             Retry
//           </button>
//         </div>
//       </div>
//     );

//   if (!applications || applications.length === 0) {
//     return (
//       <div className="applications-container">
//         <div className="empty-state">
//           <h3 className="empty-title">
//             <FaBriefcase /> No Applications Found
//           </h3>
//           <p className="empty-message">You haven't applied to any jobs yet.</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="applications-container">
//       <h2 className="applications-title">
//         <FaBriefcase /> My Job Applications
//       </h2>

//       <div className="applications-grid">
//         {applications.map((application) => {
//           const job = application?.job || application?.jobInfo || {};
//           const status = (application?.status || "pending").toLowerCase();

//           return (
//             <div key={application?._id} className="application-card">
//               <div className="application-header">
//                 <h3 className="job-title">
//                   {getStatusIcon(status)}
//                   {job?.title || job?.jobTitle || "Untitled Position"}
//                 </h3>
//                 <p className="text-gray-400 text-sm mt-1">
//                   {job?.company?.name || application.employerInfo?.name || "No company specified"}
//                 </p>
//               </div>

//               <div className="application-details">
//                 <div className="detail-item">
//                   <span className="detail-icon">
//                     <FaCalendarAlt />
//                   </span>
//                   <span>
//                     <strong>Applied On:</strong>{" "}
//                     {application.createdAt
//                       ? new Date(application.createdAt).toLocaleDateString("en-US", {
//                           year: "numeric",
//                           month: "long",
//                           day: "numeric",
//                         })
//                       : "Not available"}
//                   </span>
//                 </div>

//                 <div className="detail-item">
//                   <span className="detail-icon">
//                     <FaMapMarkerAlt />
//                   </span>
//                   <span>
//                     <strong>Location:</strong>{" "}
//                     {job?.location || job?.jobLocation || "Not specified"}
//                   </span>
//                 </div>

//                 <div className="detail-item">
//                   <span className="detail-icon">
//                     <FaBriefcase />
//                   </span>
//                   <span>
//                     <strong>Job Type:</strong>{" "}
//                     {job?.jobType || job?.type || "Not specified"}
//                   </span>
//                 </div>

//                 <div className="detail-item">
//                   <span className="detail-icon">
//                     <FaMoneyBillWave />
//                   </span>
//                   <span>
//                     <strong>Salary:</strong>{" "}
//                     {job?.salary
//                       ? `$${job.salary.toLocaleString()}`
//                       : job?.salaryRange
//                       ? `${job.salaryRange}`
//                       : "Not specified"}
//                   </span>
//                 </div>
//               </div>

//               {application.coverLetter && (
//                 <div className="cover-letter">
//                   <label>Cover Letter</label>
//                   <p>{application.coverLetter}</p>
//                 </div>
//               )}

//               {status === "rejected" && (
//                 <div className="mt-4 p-3 bg-red-900 bg-opacity-20 rounded-md">
//                   <p className="text-red-300">
//                     Your application was not selected for this position.
//                   </p>
//                 </div>
//               )}

//               {status === "accepted" && (
//                 <div className="mt-4 p-3 bg-green-900 bg-opacity-20 rounded-md">
//                   <p className="text-green-300">
//                     Congratulations! Your application was accepted.
//                   </p>
//                 </div>
//               )}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default MyApplications;




// import React, { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { fetchJobSeekerApplications } from "../store/slices/applicationSlice";
// import Spinner from "./Spinner";
// import { 
//   FaClock, 
//   FaCheckCircle, 
//   FaTimesCircle, 
//   FaBriefcase, 
//   FaMapMarkerAlt, 
//   FaMoneyBillWave, 
//   FaCalendarAlt 
// } from "react-icons/fa";

// const MyApplications = () => {
//   const dispatch = useDispatch();
//   const { applications, loading, error } = useSelector(
//     (state) => state.applications
//   );

//   useEffect(() => {
//     dispatch(fetchJobSeekerApplications());
//   }, [dispatch]);

//   const getStatusIcon = (status) => {
//     const safeStatus = (status || "pending").toLowerCase();
//     switch (safeStatus) {
//       case "pending":
//         return <FaClock className="text-yellow-500" />;
//       case "accepted":
//         return <FaCheckCircle className="text-green-500" />;
//       case "rejected":
//         return <FaTimesCircle className="text-red-500" />;
//       default:
//         return <FaClock className="text-gray-500" />;
//     }
//   };

//   const getJobInfo = (application) => {
//     // Try all possible paths to job information
//     return (
//       application?.job || 
//       application?.jobInfo || 
//       {
//         title: "Untitled Position",
//         location: "Not specified",
//         jobType: "Not specified",
//         salary: null,
//         company: { name: "No company specified" }
//       }
//     );
//   };

//   if (loading) return <Spinner />;

//   if (error) {
//     return (
//       <div className="applications-container">
//         <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
//           <p>Error loading applications: {error}</p>
//           <button
//             onClick={() => dispatch(fetchJobSeekerApplications())}
//             className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
//           >
//             Retry
//           </button>
//         </div>
//       </div>
//     );
//   }

//   if (!applications || applications.length === 0) {
//     return (
//       <div className="applications-container">
//         <div className="empty-state">
//           <h3 className="empty-title">
//             <FaBriefcase /> No Applications Found
//           </h3>
//           <p className="empty-message">You haven't applied to any jobs yet.</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="applications-container">
//       <h2 className="applications-title">
//         <FaBriefcase /> My Job Applications
//       </h2>

//       <div className="applications-grid">
//         {applications.map((application) => {
//           const job = getJobInfo(application);
//           const status = (application?.status || "pending").toLowerCase();
//           const appliedDate = application?.createdAt 
//             ? new Date(application.createdAt).toLocaleDateString("en-US", {
//                 year: "numeric",
//                 month: "long",
//                 day: "numeric",
//               })
//             : "Not available";

//           return (
//             <div key={application?._id} className="application-card">
//               <div className="application-header">
//                 <h3 className="job-title">
//                   {getStatusIcon(status)}
//                   {job?.title || job?.jobTitle || "Untitled Position"}
//                 </h3>
//                 <p className="text-gray-400 text-sm mt-1">
//                   {job?.company?.name || "No company specified"}
//                 </p>
//               </div>

//               <div className="application-details">
//                 <div className="detail-item">
//                   <span className="detail-icon">
//                     <FaCalendarAlt />
//                   </span>
//                   <span>
//                     <strong>Applied On:</strong> {appliedDate}
//                   </span>
//                 </div>

//                 <div className="detail-item">
//                   <span className="detail-icon">
//                     <FaMapMarkerAlt />
//                   </span>
//                   <span>
//                     <strong>Location:</strong> {job?.location || job?.jobLocation || "Not specified"}
//                   </span>
//                 </div>

//                 <div className="detail-item">
//                   <span className="detail-icon">
//                     <FaBriefcase />
//                   </span>
//                   <span>
//                     <strong>Job Type:</strong> {job?.jobType || job?.type || "Not specified"}
//                   </span>
//                 </div>

//                 <div className="detail-item">
//                   <span className="detail-icon">
//                     <FaMoneyBillWave />
//                   </span>
//                   <span>
//                     <strong>Salary:</strong>{" "}
//                     {job?.salary 
//                       ? `$${job.salary.toLocaleString()}` 
//                       : job?.salaryRange 
//                         ? job.salaryRange 
//                         : "Not specified"}
//                   </span>
//                 </div>
//               </div>

//               {application.coverLetter && (
//                 <div className="cover-letter">
//                   <label>Cover Letter</label>
//                   <p>{application.coverLetter}</p>
//                 </div>
//               )}

//               {status === "rejected" && (
//                 <div className="mt-4 p-3 bg-red-900 bg-opacity-20 rounded-md">
//                   <p className="text-red-300">
//                     Your application was not selected for this position.
//                   </p>
//                 </div>
//               )}

//               {status === "accepted" && (
//                 <div className="mt-4 p-3 bg-green-900 bg-opacity-20 rounded-md">
//                   <p className="text-green-300">
//                     Congratulations! Your application was accepted.
//                   </p>
//                 </div>
//               )}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default MyApplications;


import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchJobSeekerApplications } from "../store/slices/applicationSlice";
import Spinner from "./Spinner";
import { 
  FaClock, 
  FaCheckCircle, 
  FaTimesCircle, 
  FaBriefcase, 
  FaMapMarkerAlt, 
  FaMoneyBillWave, 
  FaCalendarAlt 
} from "react-icons/fa";

const MyApplications = () => {
  const dispatch = useDispatch();
  const { applications, loading, error } = useSelector(
    (state) => state.applications
  );

  useEffect(() => {
    dispatch(fetchJobSeekerApplications());
  }, [dispatch]);

  const getStatusIcon = (status) => {
    const safeStatus = (status || "pending").toLowerCase();
    switch (safeStatus) {
      case "pending":
        return <FaClock className="text-yellow-500" />;
      case "accepted":
        return <FaCheckCircle className="text-green-500" />;
      case "rejected":
        return <FaTimesCircle className="text-red-500" />;
      default:
        return <FaClock className="text-gray-500" />;
    }
  };

  const getJobInfo = (application) => {
    return (
      application?.job || 
      application?.jobInfo || 
      {
        title: "Untitled Position",
        location: "Not specified",
        jobType: "Not specified",
        salary: null,
        company: { name: "No company specified" }
      }
    );
  };

  if (loading) return <Spinner />;

  if (error) {
    return (
      <div className="applications-container">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
          <p>Error loading applications: {error}</p>
          <button
            onClick={() => dispatch(fetchJobSeekerApplications())}
            className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!applications || applications.length === 0) {
    return (
      <div className="applications-container">
        <div className="empty-state">
          <h3 className="empty-title">
            <FaBriefcase /> No Applications Found
          </h3>
          <p className="empty-message">You haven't applied to any jobs yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="applications-container">
      <h2 className="applications-title">
        <FaBriefcase /> My Job Applications
      </h2>

      <div className="applications-grid">
        {applications.map((application) => {
          const job = getJobInfo(application);
          const status = (application?.status || "pending").toLowerCase();
          const appliedDate = application?.createdAt 
            ? new Date(application.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            : "Not available";

          return (
            <div
              key={application?._id}
              className="application-card"
              style={{
                backgroundColor: "rgba(23, 37, 84, 0.5)", // dark bluish
                border: "1px solid rgba(125, 211, 252, 0.3)", // sky bluish
                borderRadius: "1rem",
                padding: "1.25rem",
                marginBottom: "1.5rem",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                transition: "0.3s ease",
              }}
            >
              <div className="application-header">
                <h3 className="job-title">
                  {getStatusIcon(status)}
                  {job?.title || job?.jobTitle || "Untitled Position"}
                </h3>
                <p className="text-gray-400 text-sm mt-1">
                  {job?.company?.name || "No company specified"}
                </p>
              </div>

              <div className="application-details">
                <div className="detail-item">
                  <span className="detail-icon">
                    <FaCalendarAlt />
                  </span>
                  <span>
                    <strong>Applied On:</strong> {appliedDate}
                  </span>
                </div>

                <div className="detail-item">
                  <span className="detail-icon">
                    <FaMapMarkerAlt />
                  </span>
                  <span>
                    <strong>Location:</strong> {job?.location || job?.jobLocation || "Not specified"}
                  </span>
                </div>

                <div className="detail-item">
                  <span className="detail-icon">
                    <FaBriefcase />
                  </span>
                  <span>
                    <strong>Job Type:</strong> {job?.jobType || job?.type || "Not specified"}
                  </span>
                </div>

                <div className="detail-item">
                  <span className="detail-icon">
                    <FaMoneyBillWave />
                  </span>
                  <span>
                    <strong>Salary:</strong>{" "}
                    {job?.salary 
                      ? `$${job.salary.toLocaleString()}` 
                      : job?.salaryRange 
                        ? job.salaryRange 
                        : "Not specified"}
                  </span>
                </div>
              </div>

              {application.coverLetter && (
                <div className="cover-letter">
                  <label>Cover Letter</label>
                  <p>{application.coverLetter}</p>
                </div>
              )}

              {status === "rejected" && (
                <div className="mt-4 p-3 bg-red-900 bg-opacity-20 rounded-md">
                  <p className="text-red-300">
                    Your application was not selected for this position.
                  </p>
                </div>
              )}

              {status === "accepted" && (
                <div className="mt-4 p-3 bg-green-900 bg-opacity-20 rounded-md">
                  <p className="text-green-300">
                    Congratulations! Your application was accepted.
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyApplications;
