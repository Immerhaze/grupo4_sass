import { cn } from "@/lib/utils";

export const BentoGrid = ({ className, children }) => {
  return (
    <div
      className={cn(
        "mx-auto grid max-w-7xl grid-cols-1 gap-4 md:auto-rows-[20rem] md:grid-cols-3",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({ className, title, description, icon }) => {
  return (
    <div
      className={cn(
        "group/bento row-span-1 flex flex-col justify-between space-y-4 rounded-xl border border-neutral-200 bg-white p-6 transition duration-200 hover:shadow-2xl dark:border-white/[0.2] dark:bg-black dark:shadow-none",
        className
      )}
    >
      <div className="flex justify-center items-center h-20">
        <span
          className={`${icon} text-8xl text-blue-900 group-hover/bento:text-blue-500 transition-all group-hover/bento:scale-110 duration-300`}
        ></span>
      </div>
      <div className="text-center">
        <div className="mt-2 mb-2 font-sans font-bold text-blue-950 dark:text-neutral-200 text-lg">
          {title}
        </div>
        <div className="font-sans text-sm text-neutral-600 dark:text-neutral-300">
          {description}
        </div>
      </div>
    </div>
  );
};
