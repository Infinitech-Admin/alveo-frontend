"use client";
import React from "react";
import { Card, CardBody, Image, Chip, Divider } from "@heroui/react";
import { FiCompass, FiAward, FiHeart, FiZap } from "react-icons/fi";

import ContactUs from "../home/contactus";

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://infinitech-api6.site";

export default function AboutPage() {
  const CoreValues = [
    {
      key: 1,
      fig: "01",
      title: "Foresight",
      icon: FiCompass,
      description:
        "We anticipate the evolving needs of a future-forward market, going where the growth is and staying ahead of where the country is headed.",
    },
    {
      key: 2,
      fig: "02",
      title: "Excellence",
      icon: FiAward,
      description:
        "We hold ourselves to an unparalleled standard, delivering thoughtfully-designed, masterplanned environments in every community we build.",
    },
    {
      key: 3,
      fig: "03",
      title: "Total Commitment",
      icon: FiHeart,
      description:
        "We are dedicated fully to our customers and communities, seeing every project through with accountability and care.",
    },
    {
      key: 4,
      fig: "04",
      title: "Innovation",
      icon: FiZap,
      description:
        "Driven by passion and an inherent drive to innovate, we continuously reimagine what living and working well can look like.",
    },
  ];

  const brandData = [
    { key: 1, title: "Masterplanned Communities", image: `${apiUrl}/assets/img/brand-values-modern-city.jpg` },
    { key: 2, title: "Growth Center Living", image: `${apiUrl}/assets/img/brand-values-medium-density.jpg` },
    { key: 3, title: "Resort-Inspired Living", image: `${apiUrl}/assets/img/Resort%20Living.jpg` },
    { key: 4, title: "Thematic Developments", image: `${apiUrl}/assets/img/brand-values-themed-development.jpg` },
    { key: 5, title: "Quality Craftsmanship", image: `${apiUrl}/assets/img/brand-values-quality-workmanship.jpg` },
    { key: 6, title: "Ready for Occupancy", image: `${apiUrl}/assets/img/Ready%20for%20occupancy.jpg` },
    { key: 7, title: "Worry-Free Living", image: `${apiUrl}/assets/img/Worry-free%20lving.jpg` },
  ];

  const partnerData = [
    { key: 1, image: "https://www.dmcihomes.com/uploads/media/bpi.jpg" },
    { key: 2, image: "https://www.dmcihomes.com/uploads/media/partner-image-1550835568259.jpg" },
    { key: 3, image: "https://www.dmcihomes.com/uploads/media/partner-image-1551156543414.jpg" },
    { key: 4, image: "https://www.dmcihomes.com/uploads/media/partner-image-1551156606344.jpg" },
    { key: 5, image: "https://www.dmcihomes.com/uploads/media/partner-image-1551156695438.jpg" },
    { key: 6, image: "https://www.dmcihomes.com/uploads/media/partner-image-1551157038919.jpg" },
    { key: 7, image: "https://www.dmcihomes.com/uploads/media/partner-image-1551157111806.jpg" },
    { key: 8, image: "https://www.dmcihomes.com/uploads/media/partner-image-1551157171813.jpg" },
    { key: 9, image: "https://www.dmcihomes.com/uploads/media/partner-image-1551157229700.jpg" },
    { key: 10, image: "https://www.dmcihomes.com/uploads/media/partner-image-1551157297236.jpg" },
    { key: 11, image: "https://www.dmcihomes.com/uploads/media/partner-image-1551157346861.jpg" },
    { key: 12, image: "https://www.dmcihomes.com/uploads/media/partner-image-1551157401916.jpg" },
    { key: 13, image: "https://www.dmcihomes.com/uploads/media/partner-image-1551157434324.jpg" },
    { key: 14, image: "https://www.dmcihomes.com/uploads/media/partner-image-1551157470053.jpg" },
    { key: 15, image: "https://www.dmcihomes.com/uploads/media/partner-image-1551157531692.jpg" },
    { key: 16, image: "https://www.dmcihomes.com/uploads/media/partner-image-1551157577108.jpg" },
    { key: 17, image: "https://www.dmcihomes.com/uploads/media/partner-image-1551157619204.jpg" },
    { key: 18, image: "https://www.dmcihomes.com/uploads/media/partner-image-1551157663219.jpg" },
    { key: 19, image: "https://www.dmcihomes.com/uploads/media/partner-image-1551157852213.jpg" },
    { key: 20, image: "https://www.dmcihomes.com/uploads/media/partner-image-1551157899283.jpg" },
    { key: 21, image: "https://www.dmcihomes.com/uploads/media/partner-image-1551157939371.jpg" },
    { key: 22, image: "https://www.dmcihomes.com/uploads/media/partner-image-1551157972275.jpg" },
    { key: 23, image: "https://www.dmcihomes.com/uploads/media/partner-image-1551158019618.jpg" },
    { key: 24, image: "https://www.dmcihomes.com/uploads/media/partner-image-1551158059652.jpg" },
  ];

  // ---- shared decorative primitives, in the page's "masterplan drawing" idiom ----

  const CornerMarks = ({ className = "" }: { className?: string }) => (
    <>
      <span className={`plan-mark absolute left-0 top-0 h-3 w-3 border-l border-t ${className}`} />
      <span className={`plan-mark absolute right-0 top-0 h-3 w-3 border-r border-t ${className}`} />
      <span className={`plan-mark absolute left-0 bottom-0 h-3 w-3 border-l border-b ${className}`} />
      <span className={`plan-mark absolute right-0 bottom-0 h-3 w-3 border-r border-b ${className}`} />
    </>
  );

  const ChapterLabel = ({ children }: { children: React.ReactNode }) => (
    <div className="flex items-center gap-4 mt-16 mb-6">
      <span className="h-px flex-1 bg-default-200" />
      <h3 className="font-serif italic text-xl md:text-2xl text-default-900 tracking-wide whitespace-nowrap">
        {children}
      </h3>
      <span className="h-px flex-1 bg-default-200" />
    </div>
  );

  const BlueprintQuote = ({ children }: { children: React.ReactNode }) => (
    <blockquote className="relative my-6 py-3 pl-6 pr-2">
      <span className="absolute left-0 top-0 h-3 w-3 border-l-2 border-t-2 border-[var(--plan-brass)]/60" />
      <span className="absolute left-0 bottom-0 h-3 w-3 border-l-2 border-b-2 border-[var(--plan-brass)]/60" />
      <p className="font-serif italic text-lg md:text-xl text-default-800 leading-snug">{children}</p>
    </blockquote>
  );

  return (
    <main className="mx-auto">
      <section className="plan-grid-bg relative border-b border-default-200 px-4 sm:px-6 lg:px-8 py-20 md:py-28 overflow-hidden">
        <div className="pointer-events-none absolute inset-0]flex flex-col items-center inset-0 justify-center w-full h-80 bg-cover bg-center bg-no-repeat py-8"
          style={{
            backgroundImage: `url('/page-banner.png')`,
          }}>
          <div className="relative max-w-5xl mx-auto text-center">
            <h1 className="uppercase text-2xl lg:text-5xl font-bold text-white mt-6 lg:mt-8">
              Living and working well,
              <br className="block" /> by design.
            </h1>
          </div>
        </div>
      </section>

      {/* VISION & MISSION */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 md:py-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          <div className="relative border border-default-200 rounded-none p-8 md:p-10">
            <CornerMarks />
            <span className="text-[#0F1B2E]">• Vision &amp; Mission</span>
            <h2 className="text-2xl md:text-3xl text-default-900 mt-4 mb-5 leading-tight">
              Elevating everyday life in the country&rsquo;s growth centers.
            </h2>
            <p className="font-sans-body text-default-600 leading-relaxed">
              We aim to elevate the quality of life of our customers through innovative real
              estate solutions, built within vibrant growth centers across the country.
            </p>
            <Divider className="my-6 bg-default-200" />
            <p className="font-sans-body text-sm font-semibold uppercase tracking-wide text-default-500 mb-3">
              In pursuing this, we are committed to
            </p>
            <ul className="space-y-2.5 font-sans-body text-sm md:text-base text-default-600">
              {[
                "Acting responsibly with integrity and accountability.",
                "Delivering total commitment in every development we build.",
                "Achieving excellence through passion, focus, and foresight.",
                "Creating masterplanned communities suited to a discerning, forward-looking market.",
                "Driving innovation in every project we undertake.",
                "Upholding the legacy of trust built by Ayala Land, our parent company.",
              ].map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#0F1B2E]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative border border-default-200 rounded-none p-8 md:p-10">
            <CornerMarks />
            <span className="text-[#0F1B2E]">• The Alveo Promise</span>
            <h2 className="text-2xl md:text-3xl text-default-900 mt-4 mb-5 leading-tight">
              We believe.
            </h2>
            <ul className="space-y-4 font-sans-body text-sm md:text-base text-default-600">
              {[
                "That building well means building for people, not just for profit.",
                "That sharper foresight and unparalleled excellence should guide every decision we make.",
                "That every development should nurture both the individuals who live there and the investments they\u2019ve worked hard for.",
                "That growth centers deserve thoughtfully designed spaces for both living and working well.",
                "That passion, drive, and innovation are what set a truly modern developer apart.",
                "That our name, derived from the Latin word for \u201cto be well,\u201d should be reflected in everything we build.",
              ].map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span className="font-serif italic text-[#0F1B2E] text-sm shrink-0">{`0${i + 1}`}</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-default-50 border-y border-default-200 px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[#0F1B2E]">• Core Values</span>
            <h2 className="text-3xl md:text-4xl text-default-900 mt-4">
              The principles behind every plan.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-default-200 border border-default-200">
            {CoreValues.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.key}
                  className="group relative flex min-h-[220px] flex-col justify-between overflow-hidden bg-background p-7 sm:p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  {/* Decorative element */}
                  <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[var(--plan-pine)]/5 transition-transform duration-500 group-hover:scale-150" />

                  <div className="relative z-10">
                    {/* Title */}
                    <div className="mb-3">
                      <h3 className="text-lg font-bold uppercase tracking-wide text-[var(--plan-pine)] sm:text-xl">
                        {item.title}
                      </h3>

                      <div className="mt-3 h-px w-10 bg-[var(--plan-pine)] transition-all duration-300 group-hover:w-16" />
                    </div>
                  </div>

                  {/* Description */}
                  <p className="relative z-10 max-w-xl font-sans-body text-sm leading-7 text-default-600 sm:text-[15px]">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* What Set Us Apart
      <section className="px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <div>
              <Eyebrow>What Sets Us Apart</Eyebrow>
              <h2 className="font-serif text-3xl md:text-4xl text-default-900 mt-4">
                Every Alveo Land development, in brief.
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {brandData.map((item) => (
              <Card key={item.key} isFooterBlurred className="border-none group" radius="none">
                <Image
                  isZoomed
                  removeWrapper={false}
                  alt={item.title}
                  className="object-cover aspect-[4/5] grayscale group-hover:grayscale-0 transition-all duration-500"
                  src={item.image}
                  width="100%"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent p-4 pt-10">
                  <p className="font-sans-body text-xs sm:text-sm font-medium text-white leading-snug">
                    {item.title}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section> */}

      {/* Brand History */}
      <section className="bg-default-50 border-y border-default-200">
        <div className="max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto px-6 py-16 md:py-24">
          <header className="text-center mb-16">
            <h1 className="font-semibold text-4xl md:text-5xl text-default-900 leading-tight mt-4">
              To Be Well, By Design
            </h1>
            <div className="flex items-center justify-center gap-3 mt-6">
              <span className="h-px w-8 bg-[var(--plan-brass)]/40" />
              <p className="font-serif italic text-default-500 text-base">
                From Salveo, &ldquo;to be well&rdquo;
              </p>
              <span className="h-px w-8 bg-[var(--plan-brass)]/40" />
            </div>
          </header>

          <article className="font-sans-body text-default-700 leading-[1.85] text-[1.05rem] space-y-5 text-center md:text-left">
            <p>
              <span className="float-left font-serif text-6xl leading-[0.8] pr-2 pt-1 text-[var(--plan-pine)]">
                I
              </span>
              n 1995, Ayala Land registered a new company with the Securities and Exchange
              Commission, built on a simple conviction: that a rapidly growing class of urban
              achievers deserved homes designed specifically around their ambitions. That company
              began its life as Community Innovations Incorporated&mdash;a name chosen to reflect
              a promise of specially designed living environments for a market whose needs
              weren&apos;t yet being fully met.
            </p>

            <p>
              For years, the company sharpened its craft, deepening its understanding of what
              &ldquo;discerning&rdquo; customers actually wanted&mdash;not just a place to live,
              but a place engineered for how they worked, gathered, and grew.
            </p>

            <BlueprintQuote>
              &ldquo;Living and working well isn&apos;t a slogan. It&apos;s the standard we build
              to.&rdquo;
            </BlueprintQuote>

            <p>
              In 2008, the company was reborn as Alveo Land Corp. The name itself carries the
              story: derived from the Latin <em>salveo</em>, meaning &ldquo;to be well,&rdquo; it
              captured everything the brand had been working toward&mdash;sharper foresight,
              unparalleled excellence, and a total commitment to the people who would call its
              developments home.
            </p>

            <ChapterLabel>Building for Growth Centers</ChapterLabel>

            <p>
              As a subsidiary of Ayala Land&mdash;the most trusted property developer in the
              Philippines, with decades of experience enhancing land and enriching
              lives&mdash;Alveo carried forward a legacy far larger than any single project. But
              rather than stay fixed on established districts, Alveo went where the growth was
              happening: thriving and emerging centers all across the country, from established
              metros to rising provincial hubs.
            </p>

            <BlueprintQuote>
              &ldquo;We don&apos;t wait for the map to catch up. We help draw it.&rdquo;
            </BlueprintQuote>

            <p>
              Each new address was planned around the same idea&mdash;exclusive communities
              positioned where transport corridors and economic hubs converge, vibrant
              neighborhoods that nurture family and community life, and masterplanned
              environments that blend living, working, and leisure into a single, cohesive
              experience.
            </p>

            <p className="font-serif italic text-default-900 text-lg">
              Because a well-designed address should do more than shelter a life&mdash;it should
              elevate it.
            </p>

            <ChapterLabel>Holding the Line on Excellence</ChapterLabel>

            <p>
              Growth brought its own test. As the portfolio expanded, so did the temptation to
              move faster than the standard allowed. Alveo&apos;s answer was to hold firmly to its
              founding values: excellence achieved through passion, focus, and foresight, and an
              accountability to customers that never loosened, no matter how many communities were
              added to the map.
            </p>

            <p className="font-serif italic text-default-900 text-lg">
              Total commitment isn&apos;t a milestone you reach. It&apos;s a discipline you keep.
            </p>

            <ChapterLabel>Looking Ahead</ChapterLabel>

            <p>
              Today, Alveo Land stands as one of the Philippines&apos; leading innovative
              developers of vibrant communities and groundbreaking living solutions. With an
              inherent drive for innovation, the company continues to reimagine what masterplanned
              living can be, building eco-friendly, safe, and sustainable communities for the
              urban achievers of tomorrow&mdash;and for everyone who believes a home should be a
              place to genuinely be well.
            </p>
          </article>

          <div className="relative mt-14 pt-10 text-center">
            <span className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-16 bg-[var(--plan-brass)]/40" />
            <p className="font-serif text-2xl md:text-3xl text-default-900 leading-snug">
              For every urban achiever, a place built to help you{" "}
              <span className="italic text-[var(--plan-pine)]">live and work well</span>.
            </p>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl text-default-900 mt-4">
              Trusted institutions behind every development.
            </h2>
            <p className="font-sans-body text-default-600 mt-4 leading-relaxed">
              Alveo Land works alongside trusted institutions to ensure the excellent quality of
              every development we deliver.
            </p>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-px">
            {partnerData.map((item) => (
              <div
                key={item.key}
                className="group relative bg-background aspect-[3/2] flex items-center justify-center p-6"
              >
                <Image
                  removeWrapper
                  alt="Alveo Land partner"
                  src={item.image}
                  className="max-h-50 w-auto object-contain grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}