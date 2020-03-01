import React, { useState, useRef } from 'react';
import ImageUploader from 'react-images-upload';
 
const   App = () =>  {
    const ImageUploaderRef = useRef();
    // let [pictures,setPictures] = useState([]);
    let [pictures,setPictures] = useState([]);
    console.log("REnder Component",pictures );
    console.log("ImageUploaderRef => ",ImageUploaderRef );

    const onDrop = (picture) =>  {
      console.log( ' OnDrop ==> ', pictures);
      setPictures(picture);
      console.log( ' OnDrop setPictures ==> ', pictures);
      if (picture.length >= 6) {
        setPictures([]);
        ImageUploaderRef.current.state.pictures = [];
        ImageUploaderRef.current.state.files = [];
        ImageUploaderRef.current.state.fileErrors[0] = {name: "many_files.jpg" , type: "Maximum Select picture are 6 pictures"};
      }
    }

    const removeImage = (index) => {
      console.log(" Delete ", index);
      console.log(" pictures ", pictures);
      setPictures(pictures.filter((value, i)=> { return i !== index;}));
      ImageUploaderRef.current.state.pictures = ImageUploaderRef.current.state.pictures.filter((value, i)=> { return i !== index;});
    }
 

        return (
          <>
          {pictures.length < 6 ?
          (<ImageUploader
                ref= {ImageUploaderRef}
                withIcon={true}
                withPreview= {true}
                withLabel= {true}
                label= { 'Max file size: 5mb, accepted: jpg | gif | png'}
                accept = "image/png, image/jpeg, , image/png"
                buttonText='Choose images'
                onChange={onDrop}
                imgExtension={['.jpg', '.gif', '.png']}
                maxFileSize={5242880}
            />): ('Only 6 images can be uploaded at a time') }
            {/* {console.log(pictures ) } */}
            {  pictures.map( (picture, i) => <div  key={`container${i}`} id = {`container${i}`} ><button key={`delete${i}`} id={`delete${i}`} onClick={()=> removeImage(i) }>X</button><img src={ URL.createObjectURL(picture)} key={i} id={i} alt={picture.name} height="400" width="400"/></div>)}
            
          </>

        );

}

export default App;