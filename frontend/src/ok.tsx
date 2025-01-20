// import React from "react";
// import { useState } from "react";

// export default function ok() {
//   const [file, setFile] = useState<File | null>(null);

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       setFile(e.target.files[0]);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!file) {
//       alert("Please choose a file.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", file); // Attach the file
//     formData.append("upload_preset", "images_preset"); // Unsigned upload preset
//     formData.append("cloud_name", "dqzodxmpn"); // Optional (helps with compatibility in some APIs)

//     try {
//       const response = await fetch(
//         `https://api.cloudinary.com/v1_1/dqzodxmpn/image/upload`,
//         {
//           method: "POST",
//           body: formData,
//         }
//       );

//       const data = await response.json();
//       if (response.ok) {
//         console.log("Uploaded successfully:", data.secure_url);
//         alert("Image uploaded successfully!");
//       } else {
//         console.error("Upload failed:", data);
//         alert("Failed to upload image. See console for details.");
//       }
//     } catch (err) {
//       console.error("Error during upload:", err);
//       alert("Something went wrong!");
//     }
//   };
//   return (
//     <form onSubmit={handleSubmit} className="flex flex-col">
//       <input type="file" accept="image/*" onChange={handleFileChange} />
//       <button type="submit">Submit</button>
//     </form>
//   );
// }
