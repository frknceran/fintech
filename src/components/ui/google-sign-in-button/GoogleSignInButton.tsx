import google from "@/assets/google.png";
import { Button } from "@/components/ui/button";
import { AlertCircleIcon } from "lucide-react";
import toast from "react-hot-toast";

export const GoogleSignInButton = () => (
  <Button
    type="button"
    variant="secondary"
    size="lg"
    className="w-full"
    onClick={() => {
      toast("Google sign-in is not enabled in this demo version.", {
        icon: <AlertCircleIcon className="w-8 h-8" />,
        duration: 5000,
        style: {
          backgroundColor: "#fffff",
          color: "#1B212D",
          fontSize: "1rem",
        },
      });
    }}
  >
    <img src={google} alt="google" className="w-4 h-4 mr-4" />
    Sign In with Google
  </Button>
);
