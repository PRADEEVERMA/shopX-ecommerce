const Blog = () => {
  return (
    <section className="space-y-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-600">
            Blog
          </p>
          <h1 className="mt-2 text-4xl font-black text-slate-950">
            Stories for modern shoppers
          </h1>
        </div>
        <p className="max-w-2xl text-sm text-slate-500 sm:text-base">
          Tips, guides, and trend pieces to help you shop with confidence.
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {["Premium Style Tips", "Electronics Trends", "Home Styling Guide"].map(
          (post) => (
            <div
              key={post}
              className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft"
            >
              <p className="text-sm text-orange-600">Article</p>
              <h2 className="mt-4 text-2xl font-bold text-slate-950">{post}</h2>
              <p className="mt-3 text-sm text-slate-500">
                Read our latest insights on curated products and modern living.
              </p>
            </div>
          ),
        )}
      </div>
    </section>
  );
};

export default Blog;
