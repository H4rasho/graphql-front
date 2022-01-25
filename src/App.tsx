import React from "react";
import { gql, useMutation } from "@apollo/client";

import "./App.css";

const UPLOAD_FILE = gql`
  mutation UploadCoverPhoto($file: Upload!) {
    uploadCoverPhoto(file: $file)
  }
`;

function App() {
  const [uploadFile] = useMutation(UPLOAD_FILE, {
    onCompleted: (data) => console.log(data),
  });

  const handleChange = (e: any) => {
    const file = e.target.files[0];
    if (!file) return;
    uploadFile({
      variables: {
        file,
      },
    });
  };

  return (
    <>
      <div className="flex">
        <h1>Mis contactos</h1>
        <input type="file" onChange={handleChange} />
      </div>
    </>
  );
}

export default App;
