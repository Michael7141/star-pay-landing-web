"use client"

import { useEffect, useState, type RefObject } from "react"

interface UseIntersectionObserverOptions {
  threshold?: number | number[]
  root?: Element | null
  rootMargin?: string
}

export function useIntersectionObserver(
  elementRef: RefObject<Element | null>,
  options: UseIntersectionObserverOptions = {},
): IntersectionObserverEntry | null {
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null)

  const { threshold = 0, root = null, rootMargin = "0px" } = options

  useEffect(() => {
    const element = elementRef?.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setEntry(entry)
      },
      { threshold, root, rootMargin },
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [elementRef, threshold, root, rootMargin])

  return entry
}

