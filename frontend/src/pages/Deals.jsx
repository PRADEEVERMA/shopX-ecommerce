const Deals = () => {
  return (
    <section className="space-y-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-600">
            Deals
          </p>
          <h1 className="mt-2 text-4xl font-black text-slate-950">
            Latest Premium Offers
          </h1>
        </div>
        <p className="max-w-2xl text-sm text-slate-500 sm:text-base">
          Save on premium electronics, fashion, and lifestyle essentials.
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {["Save 30% on Tech", "Fashion Flash Sale", "Home Bundle Savings"].map(
          (deal) => (
            <div
              key={deal}
              className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft"
            >
              <p className="text-sm text-orange-600">Deal</p>
              <h2 className="mt-4 text-2xl font-bold text-slate-950">{deal}</h2>
              <p className="mt-3 text-sm text-slate-500">
                Limited time offer for premium shoppers looking for the best
                value.
              </p>
            </div>
          ),
        )}
      </div>
    </section>
  );
};

export default Deals;
