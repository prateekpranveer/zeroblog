export default function CommentThread({ comments }) {
  if (!comments?.length) return <p>No comments yet.</p>;

  return (
    <div className="space-y-6 rounded-md">
        <h1 className="mb-6 underline">Comment Thread</h1>
      {comments.map((comment) => (
        <div key={comment._id} className="border-b text-xs pb-2">
          <p className="font-bold text-sky-800">{comment.name} | <span className="text-gray-600">{comment.email}</span></p>
          <p className="py-2">{comment.comment}</p>

          {/* Owner Reply */}
          {comment.ownerReply && (
            <div className="mt-2 ml-4 p-2 bg-gray-100 border-l-4 border-purple-600">
              <p className="text-sm font-semibold text-purple-700">Admin Reply:</p>
              <p className="text-xs">{comment.ownerReply.comment}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
