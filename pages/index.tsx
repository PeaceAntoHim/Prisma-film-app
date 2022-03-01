import { useState } from 'react';

const ImageUpload = () => {
    const [pictureFile, setpictureFile] = useState(null);
    
    const pictureChangeHandler = event => {
        setpictureFile(event.target.files[0]);  
    };
    const submitContact = async (event) => {
      event.preventDefault();
      alert(`So your name is ${event.target.picture.value}?`);
    };
    const uploadPictureHandler = async () => {
      const pictureData = new FormData();
      pictureData.append('image', pictureFile);
      try {
          const response = await fetch('/api/upload', {
              method: 'POST',
              body: pictureData,
          });
          const data = await response.json();
          if (!response.ok) {
              throw data;
          }
          setpictureFile(null);
      } catch (error) {
          console.log(error.message);
      }
  };
    return (
      <div className="input-group input-group-sm mb-3">
        <form className="flex flex-col" onSubmit={submitContact}>
          <label htmlFor="name" className="mb-2 italic">Name</label>
          <input
            className="mb-4 border-b-2"
            id="name"
            name="name"
            type="text"
          />
          <input accept=".png, .jpg" type="file" className="form-control" id='picture' name='picture' onChange={pictureChangeHandler} />
          <button
            type="submit"
            className="px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700"
          >
            Submit
          </button>
        </form>
        <input accept=".png, .jpg" type="file" className="form-control" name='picture' onChange={pictureChangeHandler} />
          <button onClick={uploadPictureHandler}>
              submit
          </button>
      </div>
    );
};
export default ImageUpload;