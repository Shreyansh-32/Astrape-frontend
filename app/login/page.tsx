import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import LoginForm from '@/components/ui/LoginForm'
import Image from 'next/image'
import React from 'react'

export default function Login(){
  return (
    <div className="min-h-screen w-full flex justify-center items-center">
      <Card className="w-3/4 md:w-[40%] lg:w-[35%]">
        <CardHeader>
          <CardTitle><div className="w-full flex flex-col items-center gap-1">
                <Image src={"/logo.png"} alt="Logo" height={100} width={100} className="size-32" />
            </div></CardTitle>
        </CardHeader>
        <CardContent>
          <LoginForm/>
        </CardContent>
      </Card>
    </div>
  )
}
