"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center px-4">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
          <div className="w-24 h-1 bg-primary mx-auto mb-8 rounded-full"></div>
        </div>
        
        <h2 className="text-3xl font-semibold text-foreground mb-4">
          Page Not Found
        </h2>
        
        <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
          Sorry, we couldn't find the page you're looking for. 
          Perhaps you've mistyped the URL or the page has been moved.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="gap-2">
            <Link href="/">
              <Home className="w-4 h-4" />
              Go Home
            </Link>
          </Button>
          
          <Button asChild variant="outline" size="lg" className="gap-2">
            <Link href="/trade">
              <ArrowLeft className="w-4 h-4" />
              Go to Trade
            </Link>
          </Button>
        </div>
        
        <div className="mt-12 p-6 rounded-lg border border-border bg-card max-w-md mx-auto">
          <p className="text-sm text-muted-foreground">
            If you believe this is an error, please contact our support team.
          </p>
        </div>
      </div>
    </div>
  );
}