"use client";

import React, { useRef, useEffect } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";

const HeroSection = () => {
  const title1Ref = useRef(null);
  const title2Ref = useRef(null);
  const imageRef = useRef(null);

  /* -----------------------------------------------------------
      TEXT ANIMATION (WELCOME SLIDE + FADE, SUBTITLE SCALE)
  ------------------------------------------------------------- */
  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      title1Ref.current,
      { x: -120, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: "power4.out" }
    )
      .to(title1Ref.current, {
        opacity: 0,
        duration: 0.9,
        delay: 0.5,
        ease: "power2.inOut"
      })
      .fromTo(
        title2Ref.current,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power3.out"
        },
        "-=0.5"
      );
  }, []);

  /* -----------------------------------------------------------
      IMAGE ANIMATION  
      - Strong backward tilt on scroll  
      - Opposite tilt on cursor movement  
  ------------------------------------------------------------- */
  useEffect(() => {
    const img = imageRef.current;
    if (!img) return;

    /* SCROLL TILT: stronger depth */
    const handleScroll = () => {
      const y = window.scrollY;

      if (y > 120) {
        img.style.transform =
          "rotateX(25deg) rotateY(0deg) scale(0.94)";
      } else {
        img.style.transform =
          "rotateX(0deg) rotateY(0deg) scale(1)";
      }
    };

    window.addEventListener("scroll", handleScroll);

    /* MOUSE TILT: strong + symmetric + opposite direction */
    const handleMouseMove = (e) => {
      const rect = img.getBoundingClientRect();

      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);

      // Stronger opposite tilt
      const rotateY = -(x / 25); // move right → tilt left
      const rotateX = y / 25;    // move up → tilt backward properly

      img.style.transition = "transform 0.08s ease-out";
      img.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1)`;
    };

    const resetTilt = () => {
      img.style.transition = "transform 0.4s ease";
      img.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
    };

    img.addEventListener("mousemove", handleMouseMove);
    img.addEventListener("mouseleave", resetTilt);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      img.removeEventListener("mousemove", handleMouseMove);
      img.removeEventListener("mouseleave", resetTilt);
    };
  }, []);

  return (
    <section className="px-4 pb-20">
      <div className="container mx-auto text-center max-w-8xl pt-8">

        {/* -----------------------------------------------------------
            TITLE WRAPPER (ANIMATED OVERLAP)
        ------------------------------------------------------------- */}
        <div
          className="
            relative 
            h-[200px] md:h-[300px] lg:h-[340px]
            w-full flex items-center justify-center
            overflow-visible
          "
        >
          {/* Welcome Title */}
          <h1
            ref={title1Ref}
            className="
              absolute inset-0 flex items-center justify-center text-center
              text-5xl md:text-6xl lg:text-7xl
              font-extrabold leading-[1.1]
              bg-gradient-to-r from-blue-500 to-purple-600
              bg-clip-text text-transparent
              tracking-tight max-w-[90%] mx-auto
            "
          >
            WELCOME TO FINEXA
          </h1>

          {/* Subtitle */}
          <h2
            ref={title2Ref}
            className="
              absolute inset-0 flex items-center justify-center text-center opacity-0
              text-5xl md:text-6xl lg:text-8xl
              font-black leading-[1.1]
              bg-gradient-to-r from-blue-600 to-purple-600
              bg-clip-text text-transparent
              tracking-tight max-w-[90%] mx-auto 
            "
          >
            YOUR MONEY MANAGED WITH ACTUAL INTELLIGENCE
          </h2>
        </div>

        {/* -----------------------------------------------------------
            DESCRIPTION
        ------------------------------------------------------------- */}
        <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-5 mt-5">
          Finexa helps you track, analyze and optimize your spending using real time AI powered insights.
          <br />
          Smart automation, clean reporting and intelligent monitoring for financial clarity.
        </p>

        {/* Badge */}
        <span className="inline-block px-4 py-1 mb-10 rounded-full border border-blue-400/40
          bg-blue-400/10 text-blue-700 text-sm font-medium backdrop-blur-sm">
          Smarter control over every rupee you spend.
        </span>

        {/* Buttons */}
        <div className="flex justify-center gap-4">
          <Link href="/dashboard">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl transition-all shadow-sm hover:shadow-md">
              Get Started
            </Button>
          </Link>

          <Link href="/about">
            <Button className="bg-transparent border border-gray-300 text-gray-800 hover:bg-gray-100 px-6 py-3 rounded-xl transition-all">
              Demo
            </Button>
          </Link>
        </div>

        {/* -----------------------------------------------------------
            IMAGE WITH SCROLL + MOUSE 3D TILT
        ------------------------------------------------------------- */}
        <div className="mt-16 flex justify-center">
          <div
            ref={imageRef}
            className="rounded-xl shadow-lg border transition-transform duration-300"
            style={{ transformStyle: "preserve-3d" }}
          >
            <Image
              src="/banner.png"
              alt="Finexa Banner"
              width={1200}
              height={720}
              className="rounded-xl pointer-events-none"
              priority
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
