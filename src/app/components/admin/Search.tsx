"use client"

import { Search as SearchIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useDebounce } from "@/app/utils/hooks/debounce"

export function Search() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [value, setValue] = useState(searchParams.get("q") || "")
  const debouncedValue = useDebounce(value, 500)

  useEffect(() => {
    if (!debouncedValue) {
      router.push(pathname)
    } else {
      router.push(`${pathname}?q=${debouncedValue}`)
    }
  }, [debouncedValue, router, pathname])

  return (
    <div className="relative w-full max-w-[400px]">
      <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search..."
        className="pl-9"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  )
}