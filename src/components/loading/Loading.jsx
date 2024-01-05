import { Bars } from "react-loader-spinner";

const Loading = () => {
  return (
    <div className="loading">
      <Bars
        height="80"
        width="80"
        color="#00000052"
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

export default Loading;
