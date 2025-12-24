import HeroSection from "@/components/hero";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { featuresData, howItWorksData, statsData, testimonialsData, TestimonialsData } from "@/data/landing";
import Link from "next/link";


export default function Home() {
  return (
    <div className="mt-40">

      {/* HERO SECTION */}
      <HeroSection />

      {/* STATS SECTION */}
      <section className="py-20 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {statsData.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-4xl font-bold   bg-gradient-to-r from-blue-600 to-purple-600 
        bg-clip-text text-transparent mb-2">{stat.value}</p>
                <p className="text-blue-900">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-20 bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto px-4">

          <h2 className="text-3xl font-bold text-center mb-12   bg-gradient-to-r from-blue-600 to-purple-600 
        bg-clip-text text-transparent">
            Everything you need to manage your finances in one place
          </h2>

          <div className="
            grid grid-cols-1 md:grid-cols-2 
            gap-8 max-w-5xl mx-auto
          ">
            {featuresData.map((feature, index) => (
              <Card
                key={index}
                className="
                  p-6 rounded-2xl shadow-sm 
                  hover:shadow-md transition-all 
                  border border-blue-100 
                  bg-white/70 backdrop-blur-sm
                  hover:-translate-y-1
                "
              >
                <CardContent className="flex gap-4">
                  <div className="text-blue-600 text-3xl">
                    {feature.icon}
                  </div>

                  <div>
                    <h3 className="font-bold   bg-gradient-to-r from-blue-600 to-purple-600 
        bg-clip-text text-transparent text-lg">
                      {feature.title}
                    </h3>
                    <p className="text-blue-900 text-sm mt-1">
                      {feature.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="py-20 bg-gradient-to-b from-blue-100 to-purple-100">
        <div className="container mx-auto px-4">

          <h2 className="
            text-4xl font-extrabold text-center mb-16 
              bg-gradient-to-r from-blue-600 to-purple-600 
         bg-clip-text text-transparent tracking-tight
          ">
            How It Works
          </h2>

          <div className="
            grid grid-cols-1 md:grid-cols-3 
            gap-12 max-w-6xl mx-auto
          ">
            {howItWorksData.map((step, index) => (
              <Card
                key={index}
                className="
                  p-10 rounded-3xl bg-white/70 
                  backdrop-blur-md
                  shadow-[0_8px_24px_rgba(0,0,0,0.06)]
                  border border-blue-100
                  hover:border-blue-500/50
                  hover:shadow-[0_12px_40px_rgba(0,80,255,0.15)]
                  transition-all duration-300
                  hover:-translate-y-2
                "
              >
                <CardContent className="flex flex-col items-center text-center gap-6">

                  <div
                    className="
                      w-20 h-20 flex items-center justify-center 
                      rounded-2xl border-2 border-blue-500 
                      text-blue-600 text-4xl bg-white
                      shadow-sm transition-all duration-300
                      hover:shadow-[0_0_18px_rgba(0,80,255,0.35)]
                    "
                  >
                    {step.icon}
                  </div>

                  <h3 className="font-extrabold text-xl text-blue-900 tracking-tight">
                    {index + 1}. {step.title}
                  </h3>

                  <p className="text-blue-800 text-sm leading-relaxed max-w-xs">
                    {step.description}
                  </p>

                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="py-20 bg-gradient-to-b from-white to-blue-50">
  <div className="container mx-auto px-4">

    <h2 className="
      text-4xl font-extrabold text-center mb-16 
      text-blue-900 tracking-tight leading-snug
    ">
      Why Choose Finexa?
      <br />
      <span className="
        bg-gradient-to-r from-blue-600 to-purple-600 
        bg-clip-text text-transparent
      ">
        What Our Users Say About Us
      </span>
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
      {testimonialsData.map((t, index) => (
        <Card
          key={index}
          className="
            p-8 rounded-3xl bg-white/70 
            backdrop-blur-lg border border-blue-200
            shadow-[0_8px_25px_rgba(0,0,0,0.05)]
            transition-all duration-300
            hover:-translate-y-2
            hover:shadow-[0_12px_40px_rgba(0,80,255,0.15)]
            hover:border-blue-500/50
          "
        >
          <CardContent className="flex flex-col gap-6">

            {/* QUOTE */}
            <p className="text-blue-900 italic leading-relaxed text-[15px]">
              "{t.quote}"
            </p>

            {/* USER INFO */}
            <div className="flex items-center gap-4">
              <div
                className="
                  w-16 h-16 rounded-full p-[2px]
                  bg-gradient-to-br from-blue-500 to-purple-600
                  shadow-md
                "
              >
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-full h-full rounded-full object-cover bg-white"
                />
              </div>

              <div>
                <p className="
                  text-lg font-extrabold 
                  bg-gradient-to-r from-blue-600 to-purple-600 
                  bg-clip-text text-transparent
                ">
                  {t.name}
                </p>

                <p className="text-sm text-blue-700">{t.role}</p>
              </div>
            </div>

          </CardContent>
        </Card>
      ))}
    </div>

  </div>
</section>

<section className="py-20 bg-gradient-to-b from-blue-600 to-purple-600">
  <div className="container mx-auto px-4">

    <div
      className="
        max-w-3xl mx-auto text-center 
        bg-white/10 backdrop-blur-md
        p-12 rounded-3xl
        shadow-[0_8px_30px_rgba(0,0,0,0.15)]
        border border-white/20
      "
    >
      {/* Headline */}
      <h2
        className="
          text-4xl md:text-5xl font-extrabold 
          text-white tracking-tight mb-4
        "
      >
        Ready to take control of your finances?
      </h2>

      {/* Subtext */}
      <p
        className="
          text-white/90 text-lg mb-8
        "
      >
        Join thousands of users who trust Finexa to manage their money effectively.
      </p>

      {/* CTA Button */}
      <Link href="/dashboard">
        <Button
          className="
            bg-white text-blue-700 font-semibold 
            px-10 py-4 rounded-xl text-lg
            shadow-lg
            hover:shadow-[0_0_25px_rgba(255,255,255,0.6)]
            hover:bg-blue-50
            transition-all
          "
        >
          Get Started Now
        </Button>
      </Link>
    </div>

  </div>
</section>




    </div>
  );
}
