
import { Button } from "@/components/ui/button"
import { signIn } from "@/auth"

export default function Login() {
  return (
    <form
      action={async () => {
        "use server"
        await signIn("google", {
          redirectTo: "/dashboard"
        })
      }}
    >
      <div className="mx-auto max-w-sm space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Login</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Continue with Google.
          </p>
        </div>
        <div className="space-y-4">
          <Button variant="outline" className="w-full">
            <ChromeIcon className="mr-2 h-5 w-5" />
            Sign in with Google
          </Button>
        </div>
      </div>
    </form>
  )
}

function ChromeIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="4" />
      <line x1="21.17" x2="12" y1="8" y2="8" />
      <line x1="3.95" x2="8.54" y1="6.06" y2="14" />
      <line x1="10.88" x2="15.46" y1="21.94" y2="14" />
    </svg>
  )
}