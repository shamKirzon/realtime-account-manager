import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import IAccount from "@/types/IAccount";


interface ApplicationFormProps {
  accountList: IAccount[], 
  setAccounts:  React.Dispatch<React.SetStateAction<IAccount[]>>; // why react.dispatch...
}

const formSchema = z.object({
  username: z
    .string()
    .min(2, { message: "Username must be at least 2 characters" })
    .max(50, { message: "Maximum of 50 characters" }),
  password: z
    .string()
    .min(5, { message: "Password must be at least 5 characters" })
    .max(30),
});

const ApplicationForm = ({accountList, setAccounts}: ApplicationFormProps ) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    const {username, password} = values;

    try {
        const response = await fetch('http://localhost:5000/application-form', {
            method: "POST", 
            headers: {
                "Content-Type": "application/json"
            }, body: JSON.stringify(values) 
        })

        if(!response.ok){
            throw new Error("Failed to submit form");
        } else if(response.ok){

          const newAccounts = {
            username: username, 
            password: password
          }
          setAccounts([...accountList, newAccounts])
        }

        const data = await response.json(); 
        console.log("form submitted succesfully", data)
    } catch (err) {
        console.error("Failed to submit form ")
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="username..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="password..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </>
  );
};

export default ApplicationForm;
