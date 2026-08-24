export default function CalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
    <div className="flex flex-col items-center inset-0 justify-center w-full h-52 bg-cover bg-center bg-no-repeat py-8"
        style={{
          backgroundImage: `url('/page-banner.png')`,
        }}>
      <h1 className="uppercase text-2xl md:text-5xl text-white font-bold">loan calculator</h1>
    </div>
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      {children}
    </section>
  </>
  );
}
