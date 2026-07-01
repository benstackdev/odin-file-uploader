import { Marker, MarkerContent } from "./ui/marker";
import { Spinner } from "./ui/spinner";

const Loading = () => {
  return (
    <Marker role="status">
      <div className="flex justify-center items-center gap-4 text-xl">
        <Spinner className="size-6" />
        <MarkerContent className="shimmer">
          Loading...
        </MarkerContent>
      </div>
    </Marker>
  );
};

export default Loading;