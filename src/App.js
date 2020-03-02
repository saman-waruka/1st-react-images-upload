import React, { useState, useRef } from "react";
import ImageUploader from "react-images-upload";
import axios from "axios";
require("dotenv").config();

const App = () => {
  const ImageUploaderRef = useRef();
  // let [pictures,setPictures] = useState([]);
  let [pictures, setPictures] = useState([]);
  let [selectedFile, setSelectedFile] = useState(null);
  console.log("REnder Component", pictures);
  console.log("ImageUploaderRef => ", ImageUploaderRef);

  const onDrop = picture => {
    console.log(" OnDrop ==> ", pictures);
    setPictures(picture);
    console.log(" OnDrop setPictures ==> ", pictures);
    if (picture.length >= 6) {
      setPictures([]);
      ImageUploaderRef.current.state.pictures = [];
      ImageUploaderRef.current.state.files = [];
      ImageUploaderRef.current.state.fileErrors[0] = {
        name: "many_files.jpg",
        type: "Maximum Select picture are 6 pictures"
      };
    }
  };

  const removeImage = index => {
    console.log(" Delete ", index);
    console.log(" pictures ", pictures);
    setPictures(
      pictures.filter((value, i) => {
        return i !== index;
      })
    );
    ImageUploaderRef.current.state.pictures = ImageUploaderRef.current.state.pictures.filter(
      (value, i) => {
        return i !== index;
      }
    );
  };

  const upload = file => {
    console.log(" file ==> ", file);

    let data = new FormData();
    data.append("file", file);
    data.append("name", file.name);
    console.log(" FormData ==> ", data);

    axios
      .post(process.env.REACT_APP_API_ENDPOINT, data, {
        // receive two    parameter endpoint url ,form data
      })
      .then(res => {
        // then print response status
        console.log(res);
      });
  };

  const onChangeHandler = event => {
    setSelectedFile(event.target.files[0]);
    console.log(event.target.files[0]);
  };

  const onClickHandler = () => {
    const data = new FormData();
    data.append("file", selectedFile);
    data.append("name", selectedFile.name);
    console.log(" selectedFile ", selectedFile);
    axios
      .post(process.env.REACT_APP_API_ENDPOINT, data, {
        // receive two    parameter endpoint url ,form data
      })
      .then(res => {
        // then print response status
        console.log(res);
      });
  };
  return (
    <>
      <input type="file" className="file" onChange={onChangeHandler} />
      <button
        type="button"
        className="btn btn-success btn-block"
        onClick={onClickHandler}
      >
        Upload
      </button>

      <button onClick={() => upload(ImageUploaderRef.current.state.files[0])}>
        Send to Server
      </button>
      {process.env.REACT_APP_API_ENDPOINT}
      {pictures.length < 6 ? (
        <ImageUploader
          ref={ImageUploaderRef}
          singleImage={true}
          withIcon={true}
          withPreview={true}
          withLabel={true}
          label={"Max file size: 5mb, accepted: jpg | gif | png"}
          accept="image/png, image/jpeg, , image/png"
          buttonText="Choose images"
          onChange={onDrop}
          imgExtension={[".jpg", ".gif", ".png"]}
          maxFileSize={5242880}
        />
      ) : (
        "Only 6 images can be uploaded at a time"
      )}
      {/* {console.log(pictures ) } */}
      {pictures.map((picture, i) => (
        <div key={`container${i}`} id={`container${i}`}>
          <button
            key={`delete${i}`}
            id={`delete${i}`}
            onClick={() => removeImage(i)}
          >
            X
          </button>
          <img
            src={URL.createObjectURL(picture)}
            key={i}
            id={i}
            alt={picture.name}
            height="400"
            width="400"
          />
        </div>
      ))}
    </>
  );
};

export function uploadSuccess({ data }) {
  return {
    type: "UPLOAD_DOCUMENT_SUCCESS",
    data
  };
}

export function uploadFail(error) {
  return {
    type: "UPLOAD_DOCUMENT_FAIL",
    error
  };
}

export default App;
