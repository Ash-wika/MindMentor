"use client"

import Link from 'next/link'
import { signIn, useSession } from 'next-auth/react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"

export function Header() {
  const { data: session } = useSession()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b-2 border-border h-14">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center gap-2">
            <Link
              href={session ? "/home" : "/"}
              className="flex items-center gap-2"
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-primary rounded-sm flex items-center justify-center border-2 border-b-3 border-r-3 border-black">
                <span className="text-black text-base sm:text-xl">🎓</span>
              </div>
              <span className="font-semibold text-foreground text-sm sm:text-base">mentora</span>
            </Link>
          </div>

          <nav className="flex items-center space-x-2 sm:space-x-4">
            <>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href="https://github.com/sahilahmed21/Mentoraa"
                      target="_blank"
                      className="hidden sm:inline-block px-4 py-1.5 bg-primary border-2 border-b-4 border-r-4 border-border rounded-lg hover:bg-primary/90 hover:border-b-2 hover:border-r-2 transition-all duration-100 text-foreground text-sm font-medium shadow-sm hover:shadow active:border-b-2 active:border-r-2"
                    >
                      GitHub
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent className="bg-card text-foreground border-border">
                    <p>Star on GitHub</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              {!session ? (
                <div className="flex gap-1 sm:gap-2">
                  <Button
                    variant="outline"
                    onClick={() => signIn()}
                    className="border-2 border-border text-foreground text-xs sm:text-sm px-2 sm:px-4"
                  >
                    Sign In
                  </Button>
                  <Link href="/register" passHref>
                    <button className="px-2 sm:px-4 py-1.5 bg-primary border-2 border-b-4 border-r-4 border-border rounded-lg hover:bg-primary/90 hover:border-b-2 hover:border-r-2 transition-all duration-100 text-foreground text-xs sm:text-sm font-medium shadow-sm hover:shadow active:border-b-2 active:border-r-2">
                      Sign Up
                    </button>
                  </Link>
                </div>
              ) : null}
            </>
          </nav>
        </div>
      </div>
    </header>
  )
}