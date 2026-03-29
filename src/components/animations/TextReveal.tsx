"use client";

import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { useAnimationsEnabled } from "./AnimationContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface TextRevealProps {
  text?: string;
  children?: React.ReactNode;
  className?: string;
  elementType?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";
  delay?: number;
}

export function TextReveal({
  text,
  children,
  className,
  elementType = "p",
  delay = 0,
}: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const animationsEnabled = useAnimationsEnabled();

  useEffect(() => {
    if (!containerRef.current || hasAnimated || !animationsEnabled) return;

    const words = containerRef.current.querySelectorAll(".word");
    if (!words.length) return;

    const rect = containerRef.current.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight + 100;

    if (isVisible) {
      gsap.fromTo(
        words,
        { y: "100%", opacity: 0 },
        {
          y: "0%",
          opacity: 1,
          duration: 0.7,
          stagger: 0.04,
          delay: delay || 0.2,
          ease: "power3.out",
          onComplete: () => setHasAnimated(true),
        }
      );
    } else {
      gsap.fromTo(
        words,
        { y: "100%", opacity: 0 },
        {
          y: "0%",
          opacity: 1,
          duration: 0.7,
          stagger: 0.04,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          onComplete: () => setHasAnimated(true),
        }
      );
    }
  }, [delay, hasAnimated, animationsEnabled]);

  const Tag = elementType;

  // On mobile, render text directly without word-wrapping spans
  if (!animationsEnabled) {
    if (children) {
      return (
        <Tag className={className}>
          {children}
        </Tag>
      );
    }
    return (
      <Tag className={className}>
        {text}
      </Tag>
    );
  }

  if (children) {
    return (
      <Tag ref={containerRef as React.Ref<never>} className={cn("flex flex-wrap gap-x-[0.18em]", className)}>
        {wrapChildren(children)}
      </Tag>
    );
  }

  const wordsArray = (text ?? "").split(" ");

  return (
    <Tag ref={containerRef as React.Ref<never>} className={cn("flex flex-wrap gap-x-[0.18em]", className)}>
      {wordsArray.map((word, i) => (
        <span key={i} className="overflow-hidden inline-flex">
          <span className="word inline-block origin-bottom">
            {word}
          </span>
        </span>
      ))}
    </Tag>
  );
}

function wrapChildren(node: React.ReactNode, inheritedClassName?: string): React.ReactNode {
  if (typeof node === "string") {
    return node.split(" ").filter(Boolean).map((word, i, arr) => (
      <span key={i} className="overflow-hidden inline-flex">
        <span className={cn("word inline-block origin-bottom", inheritedClassName)}>
          {word}
          {i < arr.length - 1 ? "\u00A0" : ""}
        </span>
      </span>
    ));
  }

  if (Array.isArray(node)) {
    return node.map((child, i) => (
      <React.Fragment key={i}>{wrapChildren(child, inheritedClassName)}</React.Fragment>
    ));
  }

  if (React.isValidElement(node)) {
    const element = node as React.ReactElement<{ children?: React.ReactNode; className?: string }>;
    const elementClassName = element.props.className;

    // If the element has bg-clip-text (gradient text), propagate its classes to word spans
    // instead of keeping them on a wrapper (bg-clip-text doesn't work with nested text elements)
    if (elementClassName && elementClassName.includes("bg-clip-text")) {
      return wrapChildren(element.props.children, elementClassName);
    }

    return React.cloneElement(element, {}, wrapChildren(element.props.children, inheritedClassName));
  }

  return node;
}
