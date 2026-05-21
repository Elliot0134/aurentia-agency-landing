#!/usr/bin/env python3
"""
Scrape les logos clients depuis leurs sites pour les afficher dans le marquee
"Ils nous font confiance" de la home.

Usage : python3 scripts/scrape-client-logos.py
"""
from __future__ import annotations

import os
import sys
import re
import json
from urllib.parse import urljoin, urlparse
from pathlib import Path

import requests
from bs4 import BeautifulSoup


CLIENTS: list[dict] = [
    {
        "name": "Comparateur IA Facile",
        "slug": "comparateur-ia-facile",
        "candidates": [
            "https://comparateur-ia-facile.com",
            "https://comparateur-ia.com",
        ],
    },
    {
        "name": "French Tech",
        "slug": "french-tech",
        "candidates": [
            "https://www.frenchtechgrandeprovence.com",
            "https://lafrenchtech.com",
        ],
    },
    {
        "name": "AlloRestau",
        "slug": "allorestau",
        "candidates": [
            "https://allo-restau.com",
            "https://allorestau.com",
            "https://allorestau.fr",
        ],
    },
    {
        "name": "Friend'iz",
        "slug": "friendiz",
        "candidates": [
            "https://friendiz.fr",
            "https://www.friend-iz.com",
            "https://friend-iz.com",
            "https://friendiz.com",
        ],
    },
    {
        "name": "HiLove",
        "slug": "hilove",
        "candidates": [
            "https://hilove.fr",
            "https://hi-love.fr",
            "https://hilove.com",
        ],
    },
    {
        "name": "Maison Enileh",
        "slug": "maison-enileh",
        "candidates": [
            "https://maison-enileh.com",
            "https://maisonenileh.fr",
            "https://www.maisonenileh.com",
        ],
    },
    {
        "name": "Golf Mentor",
        "slug": "golf-mentor",
        "candidates": [
            "https://golfmentor.fr",
            "https://golf-mentor.com",
            "https://golfmentor.com",
        ],
    },
]

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
    "Accept-Language": "fr-FR,fr;q=0.9,en;q=0.8",
}


def try_fetch(url: str, timeout: int = 8) -> requests.Response | None:
    try:
        r = requests.get(url, headers=HEADERS, timeout=timeout, allow_redirects=True)
        if r.status_code < 400:
            return r
    except Exception as e:
        print(f"  ✗ {url} -> {e.__class__.__name__}")
    return None


def find_first_working_url(candidates: list[str]) -> tuple[str, requests.Response] | None:
    for url in candidates:
        print(f"  → {url}")
        r = try_fetch(url)
        if r:
            print(f"  ✓ {url} (status {r.status_code})")
            return url, r
    return None


def extract_logo_candidates(html: str, base_url: str) -> list[str]:
    """
    Looks for the logo in standard places:
    1. <link rel="apple-touch-icon"> (best quality for branding usage)
    2. <meta property="og:image">
    3. <img> in header/nav with class/alt matching "logo"
    4. <link rel="icon"> (favicon — lower quality fallback)
    """
    soup = BeautifulSoup(html, "html.parser")
    found: list[str] = []

    # 1. Apple touch icon (usually 180x180)
    for link in soup.find_all("link", rel=lambda v: v and "apple-touch-icon" in (v if isinstance(v, list) else [v])):
        href = link.get("href")
        if href:
            found.append(urljoin(base_url, href))

    # 2. og:image
    og = soup.find("meta", property="og:image")
    if og and og.get("content"):
        found.append(urljoin(base_url, og["content"]))

    # 3. <img> with logo in class, id, or alt — narrow to header/nav
    for parent in soup.find_all(["header", "nav"]):
        for img in parent.find_all("img"):
            score = 0
            text_blob = " ".join(
                str(img.get(k, "") or "") for k in ("class", "id", "alt", "src", "title")
            ).lower()
            if "logo" in text_blob:
                score += 3
            if "brand" in text_blob:
                score += 1
            if score >= 1:
                src = img.get("src") or img.get("data-src") or ""
                if src:
                    found.append(urljoin(base_url, src))

    # 4. icon (svg favicon preferred)
    for link in soup.find_all("link", rel=lambda v: v and "icon" in (v if isinstance(v, list) else [v])):
        href = link.get("href")
        if href:
            url = urljoin(base_url, href)
            # de-prioritize tiny .ico
            if url.lower().endswith(".svg"):
                found.insert(0, url)
            else:
                found.append(url)

    # Dedupe while preserving order
    seen = set()
    out = []
    for u in found:
        if u in seen:
            continue
        seen.add(u)
        out.append(u)
    return out


def download_logo(url: str, slug: str, out_dir: Path) -> Path | None:
    try:
        r = requests.get(url, headers=HEADERS, timeout=8)
        if r.status_code >= 400:
            return None
    except Exception:
        return None

    content_type = r.headers.get("content-type", "").lower()
    ext_from_url = os.path.splitext(urlparse(url).path)[1].lower().lstrip(".")
    if "svg" in content_type or ext_from_url == "svg":
        ext = "svg"
    elif "png" in content_type or ext_from_url == "png":
        ext = "png"
    elif "webp" in content_type or ext_from_url == "webp":
        ext = "webp"
    elif "jpeg" in content_type or "jpg" in content_type or ext_from_url in ("jpg", "jpeg"):
        ext = "jpg"
    elif "x-icon" in content_type or ext_from_url == "ico":
        ext = "ico"
    else:
        ext = "bin"

    if ext == "ico":
        return None

    dest = out_dir / f"{slug}.{ext}"
    dest.write_bytes(r.content)
    return dest


def main() -> int:
    project_root = Path(__file__).resolve().parent.parent
    out_dir = project_root / "public" / "images" / "clients"
    out_dir.mkdir(parents=True, exist_ok=True)

    result: dict[str, dict] = {}

    for client in CLIENTS:
        print(f"\n=== {client['name']} ===")
        found = find_first_working_url(client["candidates"])
        if not found:
            print("  ⨯ No working URL")
            result[client["slug"]] = {"name": client["name"], "url": None, "logo": None}
            continue

        base_url, response = found
        candidates = extract_logo_candidates(response.text, base_url)
        if not candidates:
            print("  ⨯ No logo found in HTML")
            result[client["slug"]] = {"name": client["name"], "url": base_url, "logo": None}
            continue

        downloaded: Path | None = None
        for c in candidates[:6]:
            print(f"  ↓ try {c}")
            d = download_logo(c, client["slug"], out_dir)
            if d:
                size = d.stat().st_size
                print(f"  ✓ downloaded ({size} bytes) -> {d.name}")
                if size < 500 and d.suffix == ".png":
                    # too small, keep looking
                    d.unlink()
                    continue
                downloaded = d
                break

        result[client["slug"]] = {
            "name": client["name"],
            "url": base_url,
            "logo": str(downloaded.relative_to(project_root / "public")) if downloaded else None,
        }

    summary_path = out_dir / "_scrape-result.json"
    summary_path.write_text(json.dumps(result, ensure_ascii=False, indent=2))
    print(f"\n\nSummary written to {summary_path}")
    print(json.dumps(result, ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    sys.exit(main())
