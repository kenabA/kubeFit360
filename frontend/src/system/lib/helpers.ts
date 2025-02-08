import { Dispatch, SetStateAction } from "react";
import { FieldValues, Path, UseFormSetValue } from "react-hook-form";

export const handleFileChange = <T extends FieldValues>(
  name: Path<T>,
  event: React.ChangeEvent<HTMLInputElement>,
  setLocalImage: Dispatch<SetStateAction<File | string | undefined>>,
  setValue: UseFormSetValue<T>
) => {
  event.preventDefault();
  const imageData = event.target.files?.[0];
  if (imageData) {
    setLocalImage?.(imageData);
    setValue(name, imageData.name as any, {
      shouldDirty: true,
    });
  }
};

export const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file); // Attach the file
  formData.append("upload_preset", "images_preset"); // Unsigned upload preset
  formData.append("cloud_name", "dqzodxmpn"); // Optional (helps with compatibility in some APIs)

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/dqzodxmpn/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    if (response.ok) {
      return data.secure_url;
    }
  } catch (err) {
    console.error("Error during upload:", err);
    alert("Could not upload the image!");
  }
};
