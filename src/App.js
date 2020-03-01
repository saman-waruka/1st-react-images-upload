import React, { useState } from 'react';
import ImageUploader from 'react-images-upload';
 
const   App = () =>  {
    let [pictures,setPictures] = useState([]);
    console.log("REnder Component",pictures )

    const onDrop = (picture) =>  {
      console.log( ' OnDrop ==> ', pictures);
      setPictures(picture);
      console.log( ' OnDrop setPictures ==> ', pictures);

    }

    const removeImage = (index) => {
      console.log(" Delete ", index);
      console.log(" pictures ", pictures);
      setPictures(pictures.filter((value, i)=> { return i !== index;}));
    }
 

        return (
          <>
          {pictures.length < 6 ?
          (<ImageUploader
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