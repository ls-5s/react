interface LoadingProps {
  text?: string;
}

const Loading = ({ text = '加载中...' }: LoadingProps) => {
  return (
    <div className="text-center py-20">
      <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-blue-500 mb-4"></div>
      <p className="text-gray-500">{text}</p>
    </div>
  );
};

export default Loading;

