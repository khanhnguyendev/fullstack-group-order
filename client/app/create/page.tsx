"use client";

import useCreateRoom from "@/hooks/room/useCreateRoom";

const Create = () => {
  const { handleSubmit, onChange, data } = useCreateRoom();

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-teal-900 rounded absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col p-3 space-y-3 w-1/2"
    >
      <input
        type="text"
        name="name"
        onChange={onChange}
        value={data.name}
        className="bg-slate-300 p-2 outline-none"
        autoComplete="off"
        placeholder="Name"
      />
      <input
        type="text"
        name="url"
        onChange={onChange}
        value={data.url}
        autoComplete="off"
        className="bg-slate-300 p-2 outline-none"
        placeholder="url"
      />
      <input
        type="text"
        name="description"
        onChange={onChange}
        value={data.description}
        autoComplete="off"
        className="bg-slate-300 p-2 outline-none"
        placeholder="description"
      />

      <button type="submit" className="py-2  rounded bg-slate-100">
        create
      </button>
    </form>
  );
};

export default Create;
