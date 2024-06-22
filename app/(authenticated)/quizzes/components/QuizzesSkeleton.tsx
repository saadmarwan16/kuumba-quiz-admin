import { Skeleton } from "@/components/ui/skeleton";
import { FunctionComponent } from "react";

interface QuizzesSkeletonProps {}

const QuizzesSkeleton: FunctionComponent<QuizzesSkeletonProps> = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((item) => (
        <div key={item} className="flex flex-col space-y-3">
          <Skeleton className="w-full aspect-[9/16] rounded-lg" />
          <div className="space-y-2">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-5 w-full" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuizzesSkeleton;
