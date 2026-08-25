"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ScrollReveal } from "@repo/ui/scroll-reveal/scroll-reveal";
import { searchIcon as SearchIcon } from "@/assets/svg";
import logo from "@/assets/images/logo.png";
import { API_BASE_URL } from "@/config/api";
import { LOCALE_KEY_TO_PATH } from "@/lib/search/search-routes";
import styles from "./search.module.scss";

interface SearchResultItem {
  key: string;
  label: string;
  score: number;
  matchedTokenCount: number;
}

interface SearchApiResponse {
  results: SearchResultItem[];
}

const DEBOUNCE_MS = 200;

const COPY = {
  vi: {
    placeholder: "Tìm kiếm...",
    submitLabel: "Tìm kiếm",
    loading: "Đang tìm...",
    noResults: "Không tìm thấy kết quả",
  },
  en: {
    placeholder: "Search...",
    submitLabel: "Search",
    loading: "Searching...",
    noResults: "No results found",
  },
} as const;

function detectSiteLocale(): keyof typeof COPY {
  if (typeof document === "undefined") return "vi";
  return document.documentElement.lang?.toLowerCase().startsWith("vi") ? "vi" : "en";
}

export function Search() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const requestIdRef = useRef(0);

  const [locale, setLocale] = useState<keyof typeof COPY>("vi");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setLocale(detectSiteLocale());
  }, []);

  const runSearch = useCallback(
    (value: string) => {
      const trimmed = value.trim();
      if (!trimmed) {
        setResults([]);
        setIsLoading(false);
        return;
      }

      const requestId = ++requestIdRef.current;
      setIsLoading(true);

      const params = new URLSearchParams({ q: trimmed, lang: locale });
      fetch(`${API_BASE_URL}/search?${params.toString()}`)
        .then((response) => response.json() as Promise<SearchApiResponse>)
        .then((data) => {
          if (requestIdRef.current !== requestId) return;
          setResults(data.results ?? []);
          setActiveIndex(-1);
        })
        .catch(() => {
          if (requestIdRef.current !== requestId) return;
          setResults([]);
        })
        .finally(() => {
          if (requestIdRef.current !== requestId) return;
          setIsLoading(false);
        });
    },
    [locale],
  );

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => runSearch(query), DEBOUNCE_MS);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, runSearch]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const goToResult = useCallback(
    (result: SearchResultItem | undefined) => {
      const path = result ? LOCALE_KEY_TO_PATH[result.key] : undefined;
      if (!path) return;
      router.push(path);
      setIsOpen(false);
      setQuery("");
      setResults([]);
    },
    [router],
  );

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    goToResult(activeIndex >= 0 ? results[activeIndex] : results[0]);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (!isOpen || results.length === 0) return;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((prev) => (prev + 1) % results.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((prev) => (prev - 1 + results.length) % results.length);
    } else if (event.key === "Escape") {
      setIsOpen(false);
    }
  }

  const copy = COPY[locale];
  const showDropdown = isOpen && query.trim().length > 0;

  return (
    <ScrollReveal direction="fromRight">
      <div className={styles.container} ref={containerRef}>
        <form className={styles.searchBar} onSubmit={handleSubmit} role="search">
          <Image src={logo} alt="" width={28} height={28} className={styles.logo} aria-hidden />
          <input
            type="text"
            className={styles.input}
            value={query}
            placeholder={copy.placeholder}
            role="combobox"
            aria-expanded={showDropdown}
            aria-controls="search-suggestions"
            aria-autocomplete="list"
            autoComplete="off"
            onChange={(event) => {
              setQuery(event.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            onKeyDown={handleKeyDown}
          />
          <button type="submit" className={styles.button} aria-label={copy.submitLabel}>
            <SearchIcon />
          </button>
        </form>

        {showDropdown && (
          <ul id="search-suggestions" role="listbox" className={styles.dropdown}>
            {isLoading && <li className={styles.status}>{copy.loading}</li>}
            {!isLoading && results.length === 0 && (
              <li className={styles.status}>{copy.noResults}</li>
            )}
            {!isLoading &&
              results.map((result, index) => (
                <li
                  key={result.key}
                  role="option"
                  aria-selected={index === activeIndex}
                  className={`${styles.item} ${index === activeIndex ? styles.itemActive : ""}`}
                  onMouseDown={(event) => {
                    event.preventDefault();
                    goToResult(result);
                  }}
                  onMouseEnter={() => setActiveIndex(index)}
                >
                  <SearchIcon />
                  <span>{result.label}</span>
                </li>
              ))}
          </ul>
        )}
      </div>
    </ScrollReveal>
  );
}
