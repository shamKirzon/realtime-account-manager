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
import IAccount from "@/types/IAccount";
import { toast } from "sonner";

interface ApplicationFormProps {
  accountList: IAccount[];
  setAccounts: React.Dispatch<React.SetStateAction<IAccount[]>>;
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

const CreateAccount = ({ accountList, setAccounts }: ApplicationFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("front-end data: ",values);

    try {
      const response = await fetch("http://localhost:5000/api/create-account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      } else if (response.ok) {
        try{
          const data = await response.json();
       
          const newAccounts = {
            id: data.id,
            username: data.username,
            password: data.password,
          };

          setAccounts([...accountList, newAccounts]);
  
          // pop-up
          toast("Form Submitted", {
            description: new Date().toLocaleString(),
            action: {
              label: "Undo",
              onClick: () => console.log("Undo"),
            },
          });
  
          console.log("z response", data.id, data.message);
  
          form.reset();
        }catch(err){
          console.error("failed to display " + err)
          
        }
      }
    } catch (err) {
      console.error("Failed connection to back-end ");
    }
  }

  return (
    <>
      <div className="pl-[4rem]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 border border-grey-300 rounded-lg p-4 shadow-sm"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="username@gmail.com" {...field} />
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
                    <Input
                      className="w-[20rem]"
                      type="password"
                      placeholder="Enter your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Create</Button>
          </form>
        </Form>
      </div>
    </>
  );
};

export default CreateAccount;
