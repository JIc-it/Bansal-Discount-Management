import { useRef } from "react";
import { toast } from "react-toastify";
import clipPin from "../../../src/assets/Images/icons/clip-pin.png";

export const FileUploader = ({ handleFileChange, formik, className }) => {
  const hiddenFileInput = useRef(null);

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };
  console.log(formik.values?.profilePicture);
  return (
    <>
      <div className={`file-container ${className}`} onClick={handleClick}>
        <img src={clipPin} alt="clipPin" />
        <p className="mx-2">
          {formik.values?.profilePicture?.name || "Upload Profile Picture"}
        </p>
      </div>
      <input
        type="file"
        onChange={handleFileChange}
        ref={hiddenFileInput}
        style={{ display: "none" }}
        accept=" .jpg, .jpeg, .png"
      />
      {formik.errors.profilePicture && (
        <div className="error mx-4">{formik.errors.profilePicture}</div>
      )}
    </>
  );
};
