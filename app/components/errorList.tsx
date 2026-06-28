import { Separator } from "./ui/separator";

const ErrorList = ({ list }: { list: string[]; }) => {
  return (
    <div className="flex max-w-sm flex-col gap-4 mb-4">
      <ul className="list-disc [&>li]:mt-2 text-red-400">
        {list.map(error => {
          return (
            <li>{error}</li>
          );
        })}
      </ul>
      <Separator />
    </div>
  );
};

export default ErrorList;