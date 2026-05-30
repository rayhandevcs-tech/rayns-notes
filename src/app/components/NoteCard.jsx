import Link from "next/link";

export default function NoteCard({ note }) {

  return (

    <Link href={`/${note.slug}`}>
      <div className="group rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-violet-400 dark:hover:border-violet-500 hover:shadow-lg hover:shadow-violet-100 dark:hover:shadow-violet-950 transition-all duration-300 cursor-pointer overflow-hidden">

        {/* Cover Image */}
        {note.coverImage && note.coverImage !== "" ? (

          <div className="w-full h-44 overflow-hidden">

            <img
              src={note.coverImage}
              alt={note.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />

          </div>

        ) : (

          <div className="w-full h-44 bg-gradient-to-br from-violet-50 to-purple-100 dark:from-violet-950 dark:to-purple-900 flex items-center justify-center">

            <span className="text-5xl">{note.mood || "📝"}</span>

          </div>

        )}


        {/* Content */}

        <div className="p-5">

          <div className="flex items-center justify-between mb-2">

            <span className="text-lg">{note.mood || "📝"}</span>

            <span className="text-xs text-gray-400 dark:text-gray-500">
              {note.readingTime || "1 min read"}
            </span>

          </div>

          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors duration-200 line-clamp-2">
            {note.title}
          </h2>

          <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed mb-4">
            {note.excerpt}
          </p>

          {note.tags?.length > 0 && (

            <div className="flex flex-wrap gap-2 mb-3">

              {note.tags.slice(0, 3).map((tag) => (

                <span
                  key={tag}
                  className="text-xs px-2 py-1 rounded-full bg-violet-50 dark:bg-violet-950 text-violet-600 dark:text-violet-400 font-medium"
                >
                  #{tag}
                </span>

              ))}

            </div>

          )}

          <p className="text-xs text-gray-400 dark:text-gray-600">
            {note.publishedAt}
          </p>

        </div>

      </div>

    </Link>
    
  );
}