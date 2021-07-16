import React from "react";
import Button from "./Button";

const FileUpload = props => {
  const triggerInput = () => {
    document.getElementById("fileButton").click();
  };

  const onChange = e => {
    props.getVideo(e.target.files[0]);
  };

  return (
    <div>
      <input
        accept="video/mp4,video/x-m4v,video/*"
        id="fileButton"
        type="file"
        hidden
        onChange={onChange}
      />
      <Button onClick={triggerInput} title={"Upload Video"} />
    </div>
  );
};

export default FileUpload;
