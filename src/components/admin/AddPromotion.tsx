import { Select } from "@chakra-ui/react";
import { Input } from "postcss";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
const AddPromotion = () => {
  const [description, setDescription] = useState<string>("");
  const [file, setFile] = useState<string>("");
  const handleDescriptionChange = (value: string) => {
    setDescription(value);
  };

  const handleFile = (value: string) => {
    setFile(value);
  };
  return (
    <div>
      {/* <input
        type="file"
        name="file"
        onChange={(e) => handleFile(e.target.value)}
      />
      <input
        type="file"
        name="file"
        onChange={(e) => handleFile(e.target.value)}
      />
      <input
        type="text"
        name="title"
        onChange={(e) => handleFile(e.target.value)}
      />
      <input
        type="date"
        name="open_date"
        onChange={(e) => handleFile(e.target.value)}
      />
      <input
        type="date"
        name="end_date"
        onChange={(e) => handleFile(e.target.value)}
      />

      <Select>
        <option value={"cricket"}>Cricket</option>
        <option value={"soccer"}>Soccer</option>
        <option value={"tennis"}>Tennis</option>
        <option value={"casino"}>Casino</option>
      </Select> */}

      <h2>ReactQuill Editor Example</h2>
      <ReactQuill
        value={description}
        onChange={handleDescriptionChange}
        modules={{
          toolbar: [
            [{ header: "1" }, { header: "2" }, { font: [] }],
            [{ list: "ordered" }, { list: "bullet" }],
            ["bold", "italic", "underline"],
            ["link", "image"],
            ["clean"],
          ],
        }}
        style={{ height: "200px", width: "700px", color: "black" }}
      />
      <div>
        <h3>Editor Content:</h3>
        <div dangerouslySetInnerHTML={{ __html: description }} />
      </div>
    </div>
  );
};

export default AddPromotion;
