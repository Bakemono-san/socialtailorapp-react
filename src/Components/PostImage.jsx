// components/post/PostImage.jsx
export function PostImage({ post }) {
  return (
    <main className="flex flex-col p-4">

      <div className="tv:text-xl lg:text-md text-sm font-semibold bg-[#3b5999] rounded-lg w-fit mb-2 p-2 flex justify-between items-center">
        <span className="text-yellow-300">{post.Models.prix} Fr</span>
      </div>
      <img
        className="min-w-86 h-80 object-cover lg:object-fill rounded-lg"
        src={post.Models.contenu}
        alt=""
      />
      <div className="py-2 px-6 md:p-6 flex flex-col md:gap-6 gap-4 w-full bg-white rounded-lg">
        <h2 className="xl:text-3xl font-bold text-center text-gray-800">
          {post.description}
        </h2>
      </div>
    </main>
  );
}