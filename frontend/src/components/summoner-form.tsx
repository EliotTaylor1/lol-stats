"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  summonerName: z.string()
  .min(3, {
    message: "Summoner name must be at least 3 characters.",
  }).max(16, {
    message: "Name can't be more than 16 characters."
  }).toLowerCase(),
  tag: z.string()
    .min(3, {
    message: "Tag must be at least 3 characters.",
  }).max(5, {
    message: "Tag can't be more than 5 characters.",
  }).toLowerCase(),
  region: z.enum(["euw1", "eun1", "me1", "tr", "ru", 
    "na1", "br1", "la1", "la2", "kr", 
    "jp1", "oc1", "sg2", "tw2", "vn2"]),
}).required();

export function SummonerForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      summonerName: "",
      tag: "",
      region: "euw1",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // Handle form submission here
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="summonerName"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input placeholder="Enter summoner name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tag"
            render={({ field }) => (
              <FormItem className="w-1/4">
                <FormControl>
                  <Input placeholder="EUW" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="region"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select region" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="euw1">EUW</SelectItem>
                  <SelectItem value="eun1">EUNE</SelectItem>
                  <SelectItem value="me1">ME</SelectItem>
                  <SelectItem value="tr">TR</SelectItem>
                  <SelectItem value="ru">RU</SelectItem>
                  <SelectItem value="na1">NA</SelectItem>
                  <SelectItem value="br1">BR</SelectItem>
                  <SelectItem value="la1">LAN</SelectItem>
                  <SelectItem value="la2">LAS</SelectItem>
                  <SelectItem value="kr">KR</SelectItem>
                  <SelectItem value="jp1">JP</SelectItem>
                  <SelectItem value="oc1">OCE</SelectItem>
                  <SelectItem value="sg2">SG</SelectItem>
                  <SelectItem value="tw2">TW</SelectItem>
                  <SelectItem value="vn2">VN</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Search</Button>
      </form>
    </Form>
  );
}