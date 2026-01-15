"use client";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function CardWithButton() {
    return (
    <Card className="max-w-sm mx-auto mt-8">
      <CardHeader>
        <CardTitle>Simple Button</CardTitle>
      </CardHeader>
      <CardContent>
        <Button onClick = {() => console.log('clicked')} className="mt-4 w-full" variant="default" >
          Click
        </Button>
      </CardContent>
    </Card>
  );
}