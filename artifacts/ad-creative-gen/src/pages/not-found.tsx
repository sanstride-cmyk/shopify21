import { Link } from "wouter";
import { AlertCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-20 h-20 rounded-2xl bg-destructive/10 text-destructive flex items-center justify-center mx-auto mb-8">
          <AlertCircle className="w-10 h-10" />
        </div>
        
        <h1 className="text-4xl font-display font-bold text-secondary">404 - Page Not Found</h1>
        <p className="text-lg text-muted-foreground">
          The page you are looking for doesn't exist or has been moved.
        </p>
        
        <div className="pt-6">
          <Link href="/">
            <Button size="lg" className="rounded-xl">
              <ArrowLeft className="w-5 h-5 mr-2" /> Back to Generator
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
