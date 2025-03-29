import React, { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import Piggy from "../model/Piggy2";
import MoneyBag from "../model/MoneyBag";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LocomotiveScroll from "locomotive-scroll";
import "../App.css";
import Navbar from "../components/Navbar";
import Dashboard from "../components/Dashboard";
import "locomotive-scroll/dist/locomotive-scroll.css";
import { a } from "@react-spring/three";
import { div } from "three/tsl";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const [heroCmt, setHeroCmt] = useState(true);
  const [dashCmt, setDashCmt] = useState(false);
  const[displayFeatures, setDisplayFeatures] = useState(false);
  const [anim, setAnim] = useState({
    x: 4,
    y: 1,
    z: -1,
    rx: 0,
    ry: -0.55,
    rz: 0,
    s: 1.5,
  });
  const [anim2, setAnim2] = useState({
    mx: 5.5,
  });

  const scrollRef = useRef(null);

  useEffect(() => {
    const scroll = new LocomotiveScroll({
      el: scrollRef.current,
      smooth: true,
      lerp: 0.08,
    });

    ScrollTrigger.scrollerProxy(scrollRef.current, {
      scrollTop(value) {
        return arguments.length
          ? scroll.scrollTo(value, 0, 0)
          : scroll.scroll.instance.scroll.y;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
    });

    scroll.on("scroll", ScrollTrigger.update);
    ScrollTrigger.addEventListener("refresh", () => scroll.update());
    ScrollTrigger.refresh();

    return () => {
      scroll.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  useEffect(() => {
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#dash",
        start: "top bottom",
        end: "top top",
        scrub: true,
        scroller: scrollRef.current,
      },
    });

    const timeline2 = gsap.timeline({
      scrollTrigger: {
        trigger: "#features",
        start: "top bottom",
        end: "top top",
        scrub: true,
        scroller: scrollRef.current,
      },
    })

    timeline2.to(
      anim,{
        x: 0,
        y: 0,
        z: 0,
        rx: 0,
        ry: 0,
        rz: 0,
        s: 2,
      }
    )

    timeline.to(
      anim,
      {
        x: -5.7,
        y: 0.2,
        z: 0,
        rx: 0,
        ry: Math.PI / 4,
        rz: 0,
        s: 1,
        onUpdate: () => setAnim({ ...anim }),
        onStart: () => setHeroCmt(false),
        onReverseComplete: () => setHeroCmt(true),
      },
      0
    );

    timeline.to(
      anim2,
      {
        mx: 9,
        onUpdate: () => setAnim2({ ...anim2 }),
        onComplete: () => setDashCmt(true),
        onReverseComplete: () => setDashCmt(false),
      },
      0
    );

    return () => {
      timeline.kill();
      timeline2.kill();
    };
  }, []);

  useEffect(() => {
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#features",
        start: "top bottom",
        end: "top top",
        scrub: true,
        scroller: scrollRef.current,
      },
    })

    timeline.to(
      anim,{
        x: 0,
        y: 0,
        z: 0,
        rx: 0,
        ry: 0,
        rz: 0,
        s: 2,
        onUpdate: () => setAnim({ ...anim }),
        onComplete: () => setDisplayFeatures(true),
      }
    )

    return () => {
      timeline.kill();
    };
  },[]);

  return (
    <div>
      <Navbar />
    <div
      ref={scrollRef}
      data-scroll-container
      className="main w-screen min-h-screen relative"
    >
      

      {/* Fixed Canvas */}
      <div className="fixed top-0 left-0 w-full h-screen z-[10]">
        <Canvas className="w-full h-full pointer-events-none absolute">
          <ambientLight intensity={0.5} />
          <directionalLight position={[2, 2, 2]} />
          <Piggy anim={anim} />
          <MoneyBag anim={anim2} />
        </Canvas>
        <div
          style={{
            display: heroCmt ? "block" : "none",
            transition: "display 0.5s",
          }}
          className="comment_box absolute right-10 top-15 bg-white p-4 rounded-lg shadow-lg border border-gray-300"
        >
          <p className="text-lg font-semibold text-black">
            🐷 Hey! I am your financial assistant
          </p>
          <div className="absolute bottom-[-10px] left-3 w-0 h-0 border-l-[10px] border-l-transparent border-t-[10px] border-t-white border-r-[10px] border-r-transparent"></div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div
        id="hero"
        data-scroll-section
        className="w-full h-screen flex items-center justify-start pl-20"
      >
        <div className="">
          <h1 className="text-8xl text-[#7673F5] font-bold mb-7">
            Niveshसहायक:
          </h1>
          <p className="text-6xl text-black font-bold text-right">
            AI-Driven Financial
          </p>
          <p className="text-6xl text-black font-bold">Empowerment</p>
          <div className="flex items-center justify-between gap-6 w-full mt-10" >
            <div className="w-[250px] h-[150px] rounded-lg" >
              <h1 className="text-3xl font-bold" >Card</h1>
              <p className="text-xl font-semibold my-3" >spend limit, and many more</p>
              <button className="bg-[#7673F5] py-1 px-2 rounded-lg text-white" >-Label</button>
            </div>
            <div className="w-[250px] h-[150px] rounded-lg" >
              <h1 className="text-3xl font-bold" >Card</h1>
              <p className="text-xl font-semibold my-3" >spend limit, and many more</p>
              <button className="bg-[#7673F5] py-1 px-2 rounded-lg text-white" >-Label</button>
            </div>
          </div>
        </div>
        
      </div>

      <div
        id="dash"
        data-scroll-section
        className="relative w-full h-screen flex justify-end items-center z-30"
      >
        <div className="ml-auto mr-20">
          <Dashboard />
        </div>
        <div
          style={{
            display: dashCmt ? "block" : "none",
            transition: "display 0.5s",
          }}
          className="absolute top-20 left-20 max-w-80 bg-white p-4 rounded-lg shadow-lg border border-gray-300"
        >
          <p className="text-lg font-semibold text-black">
            Get your Financial Insights on our interactive dashboard
          </p>
          <div className="absolute bottom-[-10px] left-3 w-0 h-0 border-l-[10px] border-l-transparent border-t-[10px] border-t-white border-r-[10px] border-r-transparent"></div>
        </div>
      </div>

      <div
        data-scroll-section
        className="w-full h-screen relative flex justify-center items-center z-30"
        id="features"
        
      > 
        <div style={{
          display: displayFeatures ? "block" : "none",
          transition: "display 0.2s",
        }} >
        <div className="absolute top-18 left-10 bg-white p-3 rounded-lg shadow-lg flex flex-col items-center gap-1 max-w-96 font-bold">
          AI Assistance
          <div className="bg-black h-0.5 w-[80%]"></div>
          <p className="text-center font-normal">
            Answers financial queries using natural language processing (NLP)
            and suggests relevant saving, budgeting, and investment strategies.
          </p>
          <button class="px-4 py-2 bg-[#7673F5] text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition">
            Explore
          </button>
          <div className="absolute -bottom-2 -right-2 -rotate-45 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-white"></div>
        </div>

        <div className="absolute bottom-18 left-10 bg-white p-3 rounded-lg shadow-lg flex flex-col items-center gap-1 max-w-96 font-bold">
          Community
          <div className="bg-black h-0.5 w-[80%]"></div>
          <p className="text-center font-normal">
            Answers financial queries using natural language processing (NLP)
            and suggests relevant saving, budgeting, and investment strategies.
          </p>
          <button class="px-4 py-2 bg-[#7673F5] text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition">
            Explore
          </button>
          <div className="absolute -top-0 -right-4 -rotate-90 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-white"></div>
        </div>

        <div className="absolute top-18 right-10 bg-white p-3 rounded-lg shadow-lg flex flex-col items-center gap-1 max-w-96 font-bold">
          Learning
          <div className="bg-black h-0.5 w-[80%]"></div>
          <p className="text-center font-normal">
            Answers financial queries using natural language processing (NLP)
            and suggests relevant saving, budgeting, and investment strategies.
          </p>
          <button class="px-4 py-2 bg-[#7673F5] text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition">
            Explore
          </button>
          <div className="absolute -bottom-2 -left-2 rotate-45 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-white"></div>
        </div>

        <div className="absolute bottom-18 right-10 bg-white p-3 rounded-lg shadow-lg flex flex-col items-center gap-1 max-w-96 font-bold">
          Expenses
          <div className="bg-black h-0.5 w-[80%]"></div>
          <p className="text-center font-normal">
            Answers financial queries using natural language processing (NLP)
            and suggests relevant saving, budgeting, and investment strategies.
          </p>
          <button class="px-4 py-2 bg-[#7673F5] text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition">
            Explore
          </button>
          <div className="absolute -top-0 -left-4 rotate-90 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-white"></div>
        </div>
        </div>
      </div>
    </div>
    
    </div>
  );
};

export default Home;
