import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/home/Hero";
import { BrandStatement } from "@/components/home/BrandStatement";
import { WhyFountain } from "@/components/home/WhyFountain";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { RetailWholesaleSplit } from "@/components/home/RetailWholesaleSplit";
import { CoconutFeature } from "@/components/home/CoconutFeature";
import { RedOilFeature } from "@/components/home/RedOilFeature";
import { WholesaleCta } from "@/components/home/WholesaleCta";
import { DistributionSection } from "@/components/home/DistributionSection";
import { Partners } from "@/components/home/Partners";
import { FinalCta } from "@/components/home/FinalCta";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <FeaturedProducts />
      <BrandStatement />
      <WhyFountain />
      <RetailWholesaleSplit />
      <CoconutFeature />
      <RedOilFeature />
      <WholesaleCta />
      <DistributionSection />
      <Partners />
      <FinalCta />
    </>
  );
}
