import { useRef } from "react";
import { toast } from "react-toastify";
import clipPin from "../../../src/assets/Images/icons/clip-pin.png";

export const FileUploader = ({
  handleFileChange,
  formik,
  className,
  errorClass,
}) => {
  const hiddenFileInput = useRef(null);

    const handleClick = (event) => {
      hiddenFileInput.current.click();
    };

  //   const handleChange = (event) => {
  //     const allowedFileTypes = [
  //       "application/pdf",
  //       "application/msword",
  //       "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  //       "application/vnd.ms-excel",
  //       "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  //       "image/jpeg",
  //       "image/png",
  //       "image/gif",
  //     ];

  //     const disallowedFileTypes = [
  //       "application/x-rar-compressed",
  //       "application/zip",
  //       "application/x-msdownload", // exe
  //       // Add more disallowed file types as needed
  //     ];

  //     const selectedFile = event.target.files[0];

  //     if (
  //       selectedFile &&
  //       allowedFileTypes.includes(selectedFile.type) &&
  //       !disallowedFileTypes.includes(selectedFile.type)
  //     ) {
  //       handleFileChange([selectedFile]);
  //     } else {
  //       toast.error("Invalid file type");
  //       console.log("Invalid file type");
  //       // You can display an error message or handle the invalid file type as needed
  //     }
  //   };

  return (
    <>
      <div
       
        className={`file-container ${className}`}
        onClick={handleClick}
      >
        <img src={clipPin} alt="clipPin" />
        <p className="mx-2" >Upload Profile Picture</p>
      </div>
      <input
        type="file"
        // onChange={handleChange}
        ref={hiddenFileInput}
        style={{ display: "none" }}
        accept=".pdf, .doc, .docx, .xls, .xlsx, .jpg, .jpeg, .png, .gif"
      />
      {/* {formik.touched.files && formik.errors.files ? (
        <div className={`error mx-4 ${errorClass}`}>{formik.errors.files}</div>
      ) : null} */}
    </>
  );
};
