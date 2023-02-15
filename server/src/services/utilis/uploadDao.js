const cloudinary = require("cloudinary");
const fs = require("fs");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// const fileUpload = (file, folder) => {
//   return new Promise((resolve) => {
//     cloudinary.uploader.upload(
//       file,
//       (result) => {
//         resolve({
//           url: result.url,
//           id: result.public_id,
//         });
//       },
//       {
//         resource_type: "auto",
//         folder: folder,
//       }
//     );
//   });
// };
const fileUploadAndRemove = (file, folder) => {
  return new Promise((resolve) => {
    cloudinary.uploader.upload(
      file,
      (result) => {
        // remove file from server, after upload
        fs.unlink(file, (err) => {
          if (err) {
            console.log("Error removing file after successfull upload", err);
          }
          resolve({
            url: result.url,
            id: result.public_id,
          });
        });
      },
      {
        resource_type: "auto",
        folder: folder,
      }
    );
  });
};
module.exports = {
  // fileUpload,
  fileUploadAndRemove,
};
