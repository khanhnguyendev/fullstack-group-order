import { ChangeEvent, FormEvent, useState } from "react";

const Initial_data = {
  name: "",
  description: "",
  url: "",
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const CREATE_ROOM_URL = `${API_URL}/room`;

const useCreateRoom = () => {
  const [data, setData] = useState(Initial_data);

  const onChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!data.name || !data.url) {
      alert("Please fill in all fields");
    }

    try {
      await fetch(CREATE_ROOM_URL, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      setData(Initial_data);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    onChange,
    handleSubmit,
    data,
  };
};

export default useCreateRoom;
