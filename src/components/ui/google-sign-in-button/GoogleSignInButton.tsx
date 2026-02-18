import google from "@/assets/google.png";
import { Button } from "@/components/ui/button";

export const GoogleSignInButton = () => (
  <Button type="button" variant="secondary" size="lg" className="w-full">
    <img src={google} alt="google" className="w-4 h-4 mr-4" />
    Sign In with Google
  </Button>
);
