import { sql } from "drizzle-orm";

import { db } from "@/db/index";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default async function CreateInvoice() {
  const results = await db.execute(sql`SELECT current_database();`);
  console.log(results);

  return (
    <main className="flex flex-col justify-center h-full  gap-6 max-w-5xl mx-auto my-12">
      <div className="flex justify-between">
        <h1 className="text-5xl font-bold">Create Invoice</h1>
        <p></p>
      </div>

      {JSON.stringify(results)}
      <form className="grid gap-4 max-w-sm">
        <div>
          <Label htmlFor="name" className="block font-semibold mb-2">
            Billing Name
          </Label>
          <Input id="name" type="text" />
        </div>
        <div>
          <Label htmlFor="email" className="block font-semibold mb-2">
            Billing Email
          </Label>
          <Input id="email" type="text" />
        </div>
        <div>
          <Label htmlFor="value" className="block font-semibold mb-2">
            Value
          </Label>
          <Input id="value" type="text" />
        </div>
        <div>
          <Label htmlFor="desciption" className="block font-semibold mb-2">
            Description
          </Label>
          <Textarea id="description" name="description"></Textarea>
        </div>
        <div>
          <Button className="w-full font-semibold">Submit</Button>
        </div>
      </form>
    </main>
  );
}
