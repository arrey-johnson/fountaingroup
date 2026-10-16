import { setRequestLocale, getTranslations, getLocale } from "next-intl/server";
import { getFaqs } from "@/lib/data/repository";
import { faqJsonLd } from "@/lib/seo/jsonld";
import { t as tl } from "@/lib/utils";
import type { Locale } from "@/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default async function FaqPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const [t, faqs] = await Promise.all([getTranslations("faq"), getFaqs()]);
  const loc = (await getLocale()) as Locale;

  return (
    <div className="mx-auto max-w-3xl px-4 pb-20 pt-36 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs, loc)) }}
      />
      <h1 className="font-display text-4xl">{t("title")}</h1>
      <p className="mt-4 text-muted">{t("intro")}</p>
      <Accordion type="single" collapsible className="mt-10">
        {faqs.map((f) => (
          <AccordionItem key={f.id} value={f.id}>
            <AccordionTrigger>{tl(f.question, loc)}</AccordionTrigger>
            <AccordionContent>{tl(f.answer, loc)}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
