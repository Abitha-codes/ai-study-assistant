import {
  HiOutlineDocumentText,
  HiOutlineTrash,
  HiOutlineEye,
} from "react-icons/hi2";

const NoteCard = ({
  note,
  onDelete,
  onView,
  onSummary,
}) => {
  return (
    <div className="card rounded-2xl p-5 border border-gray-200 dark:border-gray-700">

      <div className="flex items-start justify-between">

        <div className="flex gap-3">

          <div className="p-3 rounded-xl bg-primary-100 dark:bg-primary-900">
            <HiOutlineDocumentText
              size={26}
              className="text-primary-600"
            />
          </div>

          <div>

            <h2 className="font-semibold text-lg">
              {note.title}
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              📚 {note.subject?.name}
            </p>

            <p className="text-sm text-gray-500">
              📏 {(note.fileSize / 1024 / 1024).toFixed(2)} MB
            </p>

            <p className="text-sm text-gray-500">
              📅 {new Date(note.createdAt).toLocaleDateString()}
            </p>

          </div>

        </div>

        <div className="flex gap-2">

          <button
            onClick={() => onView(note)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <HiOutlineEye size={22} />
          </button>

          <button onClick={() => onSummary(note)} className="p-2 rounded-lg hover:bg-blue-100">🤖</button>

          <button
            onClick={() => onDelete(note)}
            className="p-2 rounded-lg hover:bg-red-100"
          >
            <HiOutlineTrash
              size={22}
              className="text-red-500"
            />
          </button>

        </div>

      </div>

    </div>
  );
};

export default NoteCard;