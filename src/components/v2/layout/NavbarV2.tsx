// src/components/v2/layout/NavbarV2.tsx
import { NavbarV2Desktop } from "./NavbarV2Desktop";
import { NavbarV2Mobile } from "./NavbarV2Mobile";

export function NavbarV2() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-foreground/10 bg-background/85 backdrop-blur-md">
      <NavbarV2Desktop />
      <NavbarV2Mobile />
    </header>
  );
}
