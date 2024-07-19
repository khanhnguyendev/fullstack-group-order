import { ChangeEvent, FormEvent, useState } from "react";

const Initial_data = {
  name: "",
  description: "",
  restaurant_id: "",
  delivery_id: "",
  url: "",
};
const useCreateRoom = () => {
  const [data, setData] = useState(Initial_data);

  const onChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!data.name || !data.url) return;

    try {
      await fetch("http://localhost:3001/room", {
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
