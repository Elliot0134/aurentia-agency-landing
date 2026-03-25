"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { ThemeSwitch } from "@/components/unlumen-ui/theme-switch";
import { siteConfig } from "@/data/content";
import { CalModal } from "@/components/shared/CalModal";

const services = [
  { label: "Sites vitrines", href: "/sites-vitrines" },
  { label: "SaaS & Logiciels", href: "/saas" },
  { label: "Landing Pages", href: "/landing-pages" },
  { label: "Identité Visuelle", href: "/identite-visuelle" },
];

const agenceItems = [
  { label: "À propos", href: "/a-propos" },
  { label: "Réalisations", href: "/realisations" },
  { label: "Formation", href: "/formation", badge: "NEW" },
  { label: "Apport d'affaires", href: "/apport-affaires" },
  { label: "Blog", href: "/blog" },
];

export function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [agenceDropdownOpen, setAgenceDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [calOpen, setCalOpen] = useState(false);
  const dropdownTriggerRef = useRef<HTMLDivElement>(null);
  const agenceTriggerRef = useRef<HTMLDivElement>(null);
  const dropdownMenuRef = useRef<HTMLDivElement>(null);
  const agenceMenuRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const agenceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [servicesPos, setServicesPos] = useState({ top: 0, left: 0 });
  const [agencePos, setAgencePos] = useState({ top: 0, left: 0 });

  useEffect(() => {
    requestAnimationFrame(() => setMounted(true));
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      const inServices = dropdownTriggerRef.current?.contains(target) || dropdownMenuRef.current?.contains(target);
      if (dropdownOpen && !inServices) {
        setDropdownOpen(false);
      }
      const inAgence = agenceTriggerRef.current?.contains(target) || agenceMenuRef.current?.contains(target);
      if (agenceDropdownOpen && !inAgence) {
        setAgenceDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownOpen, agenceDropdownOpen]);

  // Recalculate dropdown positions
  const updatePositions = useCallback(() => {
    if (dropdownTriggerRef.current) {
      const rect = dropdownTriggerRef.current.getBoundingClientRect();
      setServicesPos({ top: rect.bottom + 8, left: rect.left });
    }
    if (agenceTriggerRef.current) {
      const rect = agenceTriggerRef.current.getBoundingClientRect();
      setAgencePos({ top: rect.bottom + 8, left: rect.left });
    }
  }, []);

  useEffect(() => {
    if (dropdownOpen || agenceDropdownOpen) {
      updatePositions();
      window.addEventListener("scroll", updatePositions, { passive: true });
      window.addEventListener("resize", updatePositions, { passive: true });
      return () => {
        window.removeEventListener("scroll", updatePositions);
        window.removeEventListener("resize", updatePositions);
      };
    }
  }, [dropdownOpen, agenceDropdownOpen, updatePositions]);

  const handleDropdownEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    updatePositions();
    setDropdownOpen(true);
  };

  const handleDropdownLeave = () => {
    timeoutRef.current = setTimeout(() => setDropdownOpen(false), 150);
  };

  const handleAgenceDropdownEnter = () => {
    if (agenceTimeoutRef.current) clearTimeout(agenceTimeoutRef.current);
    updatePositions();
    setAgenceDropdownOpen(true);
  };

  const handleAgenceDropdownLeave = () => {
    agenceTimeoutRef.current = setTimeout(() => setAgenceDropdownOpen(false), 150);
  };


  return (
    <>
    <header
      ref={navRef}
      data-splash-navbar
      className="fixed top-0 left-0 w-full z-50 px-4 sm:px-6 pointer-events-none"
      style={{ paddingTop: "16px" }}
    >
      <nav
        data-splash-nav-pill
        className="pointer-events-auto mx-auto max-w-5xl rounded-full border transition-all duration-500"
        style={{
          background: "var(--glass-nav-bg)",
          backdropFilter: `blur(${scrolled ? 24 : 16}px)`,
          WebkitBackdropFilter: `blur(${scrolled ? 24 : 16}px)`,
          borderColor: "var(--glass-border)",
        }}
      >
        <div className="flex items-center justify-between px-6 py-3">
          {/* Left — Nav Links */}
          <div data-splash-nav-item className="hidden md:flex items-center gap-1 flex-1">
            {/* Services Trigger */}
            <div
              ref={dropdownTriggerRef}
              data-splash-nav-el
              onMouseEnter={handleDropdownEnter}
              onMouseLeave={handleDropdownLeave}
            >
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-foreground/70 hover:text-foreground rounded-xl hover:bg-foreground/5 transition-all duration-200"
              >
                Services
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                />
              </button>
            </div>

            {/* L'agence Trigger */}
            <div
              ref={agenceTriggerRef}
              data-splash-nav-el
              onMouseEnter={handleAgenceDropdownEnter}
              onMouseLeave={handleAgenceDropdownLeave}
            >
              <button
                onClick={() => setAgenceDropdownOpen(!agenceDropdownOpen)}
                className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-foreground/70 hover:text-foreground rounded-xl hover:bg-foreground/5 transition-all duration-200"
              >
                L&apos;agence
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${agenceDropdownOpen ? "rotate-180" : ""}`}
                />
              </button>
            </div>
          </div>

          {/* Center — Logo */}
          <div data-splash-logo-parent className="shrink-0">
            <Link
              href="/"
              data-splash-logo-target
              className="flex items-baseline group shrink-0"
            >
              <span
                data-logo-aurentia
                className="font-heading text-[1.4rem] leading-none text-foreground font-bold group-hover:opacity-80 transition-opacity duration-200"
              >
                Aurentia
              </span>
              <span
                data-logo-agency
                className="font-heading text-[1.4rem] leading-none text-foreground font-normal group-hover:opacity-80 transition-opacity duration-200"
              >
                .agency
              </span>
            </Link>
          </div>

          {/* Right — Actions */}
          <div data-splash-nav-item className="hidden md:flex items-center gap-1.5 flex-1 justify-end">
            {/* Theme Toggle */}
            <ThemeSwitch
              iconSize={16}
              className="w-8 h-8 rounded-xl bg-transparent border-0 hover:bg-foreground/5 text-foreground/70 hover:text-foreground"
              data-splash-nav-el
            />

            {/* WhatsApp */}
            <a
              href={`https://wa.me/${siteConfig.phone?.replace(/\s+/g, "").replace("+", "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-xl flex items-center justify-center bg-[#25D366] hover:bg-[#1ebe5b] transition-all duration-200 text-white"
              aria-label="WhatsApp"
              data-splash-nav-el
              data-splash-whatsapp
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </a>

            {/* Réserver un call */}
            <button
              onClick={() => setCalOpen(true)}
              data-splash-nav-el
              className="px-4 py-1.5 text-sm font-semibold rounded-xl bg-foreground text-background hover:opacity-90 transition-all duration-500 shadow-sm"
            >
              Réserver un call
            </button>
          </div>

          {/* Mobile — Toggle + Actions */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeSwitch
              iconSize={16}
              className="w-8 h-8 rounded-xl bg-transparent border-0 hover:bg-foreground/5 text-foreground/70"
            />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="w-8 h-8 flex flex-col items-center justify-center gap-1 rounded-xl hover:bg-foreground/5 transition-colors"
              aria-label="Menu"
            >
              <span
                className={`w-4 h-[1.5px] bg-foreground rounded-full transition-all duration-300 ${
                  mobileOpen ? "rotate-45 translate-y-[3.25px]" : ""
                }`}
              />
              <span
                className={`w-4 h-[1.5px] bg-foreground rounded-full transition-all duration-300 ${
                  mobileOpen ? "-rotate-45 -translate-y-[3.25px]" : ""
                }`}
              />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            mobileOpen ? "max-h-[32rem] border-t" : "max-h-0"
          }`}
          style={{ borderColor: "var(--glass-border)" }}
        >
          <div className="px-4 py-3 space-y-1">
            {/* Services sub-items */}
            <p className="text-sm font-semibold text-foreground/40 uppercase tracking-wider px-3 pt-1">
              Services
            </p>
            {services.map((service) => (
              <Link
                key={service.label}
                href={service.href}
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2 text-sm text-foreground/70 hover:text-foreground hover:bg-foreground/5 rounded-lg transition-colors"
              >
                {service.label}
              </Link>
            ))}
            <p className="text-sm font-semibold text-foreground/40 uppercase tracking-wider px-3 pt-3">
              L&apos;agence
            </p>
            {agenceItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 px-3 py-2 text-sm text-foreground/70 hover:text-foreground hover:bg-foreground/5 rounded-lg transition-colors"
              >
                {item.label}
                {item.badge && (
                  <span className="px-1.5 py-0.5 text-[10px] font-bold leading-none rounded-full bg-orange-500 text-white uppercase tracking-wide">
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}

            <div className="flex gap-2 pt-2">
              <a
                href={`https://wa.me/${siteConfig.phone?.replace(/\s+/g, "").replace("+", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium rounded-xl border text-foreground/70 hover:text-foreground transition-colors"
                style={{ borderColor: "var(--glass-border)" }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp
              </a>
              <button
                onClick={() => {
                  setMobileOpen(false);
                  setCalOpen(true);
                }}
                className="flex-1 px-3 py-2 text-sm font-semibold rounded-xl bg-foreground text-background hover:opacity-90 transition-all"
              >
                Réserver un call
              </button>
            </div>
          </div>
        </div>
      </nav>


    </header>

    <CalModal open={calOpen} onClose={() => setCalOpen(false)} />

    {/* Portaled Dropdowns — outside navbar's backdrop-filter context for real glassmorphism */}
    {mounted && createPortal(
      <>
        {/* Services Dropdown */}
        <div
          ref={dropdownMenuRef}
          onMouseEnter={handleDropdownEnter}
          onMouseLeave={handleDropdownLeave}
          className={`fixed z-[60] w-52 rounded-2xl border overflow-hidden transition-[opacity,transform] duration-200 origin-top ${
            dropdownOpen
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-95 -translate-y-1 pointer-events-none"
          }`}
          style={{
            top: servicesPos.top,
            left: servicesPos.left,
            background: "var(--glass-dropdown-bg)",
            backdropFilter: "blur(32px) saturate(1.4)",
            WebkitBackdropFilter: "blur(32px) saturate(1.4)",
            borderColor: "var(--glass-border-hover)",
            boxShadow: "0 16px 48px rgba(0,0,0,0.2), 0 0 0 1px rgba(255,255,255,0.06) inset",
          }}
        >
          {services.map((service) => (
              <Link
                key={service.label}
                href={service.href}
                onClick={() => setDropdownOpen(false)}
                className="block px-4 py-2.5 text-sm text-foreground/70 hover:text-foreground hover:bg-foreground/5 transition-colors"
              >
                {service.label}
              </Link>
          ))}
        </div>

        {/* L'agence Dropdown */}
        <div
          ref={agenceMenuRef}
          onMouseEnter={handleAgenceDropdownEnter}
          onMouseLeave={handleAgenceDropdownLeave}
          className={`fixed z-[60] w-48 rounded-2xl border overflow-hidden transition-[opacity,transform] duration-200 origin-top ${
            agenceDropdownOpen
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-95 -translate-y-1 pointer-events-none"
          }`}
          style={{
            top: agencePos.top,
            left: agencePos.left,
            background: "var(--glass-dropdown-bg)",
            backdropFilter: "blur(32px) saturate(1.4)",
            WebkitBackdropFilter: "blur(32px) saturate(1.4)",
            borderColor: "var(--glass-border-hover)",
            boxShadow: "0 16px 48px rgba(0,0,0,0.2), 0 0 0 1px rgba(255,255,255,0.06) inset",
          }}
        >
          {agenceItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setAgenceDropdownOpen(false)}
              className="flex items-center gap-2 px-4 py-2.5 text-sm text-foreground/70 hover:text-foreground hover:bg-foreground/5 transition-colors"
            >
              {item.label}
              {item.badge && (
                <span className="px-1.5 py-0.5 text-[10px] font-bold leading-none rounded-full bg-orange-500 text-white uppercase tracking-wide">
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
        </div>
      </>,
      document.body
    )}
  </>
  );
}
