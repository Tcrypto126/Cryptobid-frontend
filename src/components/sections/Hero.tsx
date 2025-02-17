import Section from "../SectionContainer";
import Container from "../container";
import PrimaryButton from "../button";
import Image from "next/image";

const HeroSection = () => {
  return (
    <Section className=" pt-[128px] pb-[28px] min-h-[100vh] bg-pattern-bubbles flex items-center">
      <div className="-z-10 absolute pointer-events-none inset-0 flex items-center justify-center bg-[url('/assets/images/bg.jpg')] bg-cover bg-center bg-no-repeat"></div>
      <Container className=" z-20 relative">
        <div className=" md:w-[60%] flex flex-col gap-3">
          <h1 className=" ">Showcase Your American Real Estate in Real Time with Decentralized system! Stream, Bid, and Sell</h1>
        </div>
        <p>
          description
        </p>
        <div>
          <PrimaryButton
            isPrimary
            className="mt-6 px-6 py-4 text-[14px] sm:text-[18px]"
          >
            Let&apos;s Get Started
          </PrimaryButton>
        </div>
      </Container>
    </Section>
  );
};


export default HeroSection;
