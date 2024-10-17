// components/post/PostImage.jsx
export function PostImage({ post }) {
    return (
      <main className="flex flex-col">
        <img
          className="min-w-86 h-80 object-cover lg:object-fill"
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