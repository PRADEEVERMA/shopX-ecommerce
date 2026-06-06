const Categories = () => {
  return (
    <section className="space-y-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-600">
            Categories
          </p>
          <h1 className="mt-2 text-4xl font-black text-slate-950">
            Browse our curated categories
          </h1>
        </div>
        <p className="max-w-2xl text-sm text-slate-500 sm:text-base">
          Explore every premium collection and discover the right category for
          your style.
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {[
          "Electronics",
          "Fashion",
          "Home & Kitchen",
          "Beauty & Health",
          "Sports",
          "Gifts",
        ].map((category) => (
          <div
            key={category}
            className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft"
          >
            <p className="text-sm text-orange-600">Category</p>
            <h2 className="mt-4 text-2xl font-bold text-slate-950">
              {category}
            </h2>
            <p className="mt-3 text-sm text-slate-500">
              Discover curated products, top brands, and exclusive offers in
              this section.
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
