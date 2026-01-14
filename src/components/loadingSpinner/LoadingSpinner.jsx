import { Loader2 } from "lucide-react";

export function LoadingSpinner() {
  return <div className="w-full h-full flex items-center justify-center mx-auto ">
    <Loader2 className="h-8 w-8 animate-spin " />
  </div>
}
