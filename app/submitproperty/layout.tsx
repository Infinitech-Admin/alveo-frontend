export default function SubmitPropertyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <h1 className="font-bold text-2xl leading-4">Submit Property</h1>
      {children}
    </section>
  );
}
