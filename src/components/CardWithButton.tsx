"use client";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"


export default function CardWithButton() {
  const apiBase = process.env.NEXT_PUBLIC_API_BASE;
    return (
    <Card className="max-w-sm mx-auto mt-8">
      <CardHeader>
        <CardTitle>Simple Button</CardTitle>
      </CardHeader>
      <CardContent>
        <p>This button logs two lines to the console.</p>
        <Button onClick = {() => {console.log('clicked'); console.log(`API Base: ${apiBase}`)}} className="mt-4 w-full" variant="default" >
          Click
        </Button>
      </CardContent>
    </Card>
  );
}