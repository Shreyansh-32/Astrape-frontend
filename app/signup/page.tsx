import SignupForm from "@/components/SignupForm";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

export default function Signup(){
  return (
    <div className="min-h-screen w-full flex justify-center items-center">
          <Card className="w-2/3 md:w-[40%] lg:w-[35%]">
            <CardHeader>
              <CardTitle><div className="w-full flex flex-col items-center">
                    <Image src={"/logo.png"} alt="Logo" height={100} width={100} className="size-32" />
                </div></CardTitle>
            </CardHeader>
            <CardContent>
              <SignupForm></SignupForm>
            </CardContent>
          </Card>
        </div>
  );
};
