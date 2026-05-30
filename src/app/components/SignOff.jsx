export default function SignOff() {
  return (
    <div className="mt-10 flex items-center gap-4">
      <div className="flex-1 h-px bg-gray-200 dark:bg-gray-800" />
      <div className="flex items-center gap-3">
        <img
          src="/profile_pic.png"
          alt="Rayhan"
          width={36}
          height={36}
          className="rounded-full object-cover ring-2 ring-violet-400 dark:ring-violet-500"
        />
        <div className="flex flex-col">
          <span className="text-sm font-black text-gray-900 dark:text-white leading-none">
            Rayhan
          </span>
          <span className="text-xs text-gray-400 dark:text-gray-500">
            just a soul, thinking out loud
          </span>
        </div>
      </div>
      <div className="flex-1 h-px bg-gray-200 dark:bg-gray-800" />
    </div>
  );
}