// import { useState } from "react";
// import { useDropzone } from "react-dropzone";

// const MultipleFileUpload = () => {
//   const [files, setFiles] = useState([]);

//   const onDrop = (acceptedFiles) => {
//     const newFiles = acceptedFiles.map((file) =>
//       Object.assign(file, {
//         preview: URL.createObjectURL(file),
//         progress: 100, // Simulating upload progress
//       })
//     );
//     setFiles([...files, ...newFiles]);
//   };

//   const removeFile = (name) => {
//     setFiles(files.filter((file) => file.name !== name));
//   };

//   const { getRootProps, getInputProps } = useDropzone({
//     accept: "image/*",
//     onDrop,
//     multiple: true,
//     maxSize: 2 * 1024 * 1024, // 2MB file size limit
//   });

//   return (
//     <div className="p-6 bg-white shadow-md rounded-md">
//       {/* Dropzone */}
//       <div
//         {...getRootProps()}
//         className="border-dashed border-2 border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500"
//       >
//         <input {...getInputProps()} />
//         <p className="text-gray-500">
//           Drop your file here or <span className="text-blue-500">browse</span>
//         </p>
//         <p className="text-xs text-gray-400">Pick a file up to 2MB.</p>
//       </div>

//       {/* Uploaded Files List */}
//       <div className="mt-4">
//         {files.map((file) => (
//           <div
//             key={file.name}
//             className="flex items-center justify-between p-2 border rounded-md shadow-sm mb-2"
//           >
//             <div className="flex items-center">
//               <img
//                 src={file.preview}
//                 alt={file.name}
//                 className="w-12 h-12 object-cover rounded-md mr-3"
//               />
//               <div>
//                 <p className="text-sm font-medium">{file.name}</p>
//                 <p className="text-xs text-gray-500">
//                   {(file.size / 1024).toFixed(2)} KB
//                 </p>
//                 {/* Progress Bar */}
//                 <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
//                   <div
//                     className="bg-green-500 h-1.5 rounded-full"
//                     style={{ width: `${file.progress}%` }}
//                   ></div>
//                 </div>
//               </div>
//             </div>
//             <button
//               className="text-red-500 hover:text-red-700"
//               onClick={() => removeFile(file.name)}
//             >
//               ❌
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MultipleFileUpload;
