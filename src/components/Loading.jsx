import loading from "../../public/loading.svg";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <img src={loading} alt="Loading..." />
    </div>
  );
};

export default Loading;
