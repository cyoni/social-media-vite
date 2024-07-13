import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "../ui/button";

interface IProps {
  fieldChange: (file: File[]) => void;
}

function FileUploader({ fieldChange }: IProps) {
  ///const [file, setFile] = useState<File[]>([]);

  const [fileUrl, setFileUrl] = useState<string>("");

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      ///setFile(acceptedFiles);
      fieldChange(acceptedFiles);
      setFileUrl(URL.createObjectURL(acceptedFiles[0]));
    },
  });

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => URL.revokeObjectURL(fileUrl);
  }, []);

  const handleRemoveImage = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    // setFile([]);
    setFileUrl("");
  };

  return (
    <div
      {...getRootProps({ className: "dropzone" })}
      className="bg-dark-3 rounded-md flex flex-col justify-center items-center gap-3 p-2 cursor-pointer"
    >
      <input {...getInputProps()} />

      {fileUrl ? (
        <>
          <div className="w-full p-3">
            <img
              src={fileUrl}
              alt="image"
              className="h-60 lg:h-[480px] w-full rounded-xl object-cover"
            />
          </div>
          <p className="text-sm text-light-3">Click or drag photo to replace</p>
          <Button
            variant="default"
            className="bg-dark-4 hover:bg-gray-500 mt-4"
            onClick={handleRemoveImage}
          >
            Remove Image
          </Button>
        </>
      ) : (
        <div className="flex flex-col items-center h-60 justify-center">
          <img src="/assets/icons/file-upload.svg" width={96} height={96} />
          <p className="text-white font-semibold mt-2">Drag photo here</p>

          <Button
            variant="default"
            className="bg-dark-4 hover:bg-gray-500 mt-4"
          >
            Upload an Image
          </Button>
        </div>
      )}
    </div>
  );
}

export default FileUploader;
