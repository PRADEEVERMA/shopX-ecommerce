const Contact = () => {
  return (
    <section className="space-y-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-600">
            Contact
          </p>
          <h1 className="mt-2 text-4xl font-black text-slate-950">
            We’re here to help
          </h1>
        </div>
        <p className="max-w-2xl text-sm text-slate-500 sm:text-base">
          Reach out with questions about orders, products, or your wishlist.
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {[
          { title: "Customer Service", detail: "support@shopx.com" },
          { title: "Phone Support", detail: "+91 9140018301" },
          { title: "Live Chat", detail: "Available 24/7" },
        ].map((item) => (
          <div
            key={item.title}
            className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft"
          >
            <p className="text-sm text-orange-600">{item.title}</p>
            <h2 className="mt-4 text-2xl font-bold text-slate-950">
              {item.detail}
            </h2>
            <p className="mt-3 text-sm text-slate-500">
              We aim to respond quickly to all customer inquiries.
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Contact;
