import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import IAccount from "@/types/IAccount";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@radix-ui/react-label";
import editSVG from "@/assets/filterable-product-table-edit.svg";
import deleteSVG from "@/assets/filterable-product-table-delete.svg";
import "@/index.css";

interface FilterableNamesProps {
  accountList: IAccount[];
  setAccount: React.Dispatch<React.SetStateAction<IAccount[]>>;
}

const FilterableNames = ({ accountList, setAccount }: FilterableNamesProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [editUsername, setEditUsername] = useState("");
  const [editPassword, setEditPassword] = useState("");
  const [id, setId] = useState("");
  const [DialogOpen, setDialogOpen] = useState(false);

  function searchHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchQuery(e.target.value.toLowerCase());
  }

  function handleEdit(account: IAccount) {
    setEditUsername(account.username);
    setEditPassword(account.password);
    setId(account.id);
    setDialogOpen(true);
  }

  function handleDelete(index: number) {
    const updatedAccountList = accountList.filter((_, i) => i !== index);
    setAccount(updatedAccountList);
  }

  // edit - SAVE
  async function handleSave() {
    if (id !== null) {
      const updatedAccountList = {
        id,
        username: editUsername,
        password: editPassword,
      };
      const response = await fetch(
        `http://localhost:5000/api/edit-account/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "Application/json",
          },
          body: JSON.stringify(updatedAccountList),
        }
      );

      try {
        const data = await response.json();
    
        console.log(data.message)
        
        const updatedList = accountList.map((account) =>
          account.id === id
            ? { ...account, username: editUsername, password: editPassword }
            : account
        );
        setAccount([...updatedList]); 
      } catch(err) {
        throw new  Error("No response from the backend" );
      }

      setDialogOpen(!DialogOpen);
    }
  }

  function productTable() {
    const filteredAccounts = accountList.filter((accounts) => {
      return accounts.username?.toLowerCase().includes(searchQuery);
    });
    return (
      <div className="border border rounded-lg p-3">
        <Table className=" p-[1rem]">
          <TableCaption>List of Accounts </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Usernames</TableHead>
              <TableHead className="text-right">Passwords</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAccounts.map((account, index) => (
              <TableRow key={index}>
                <TableCell className="text-left">{account.username}</TableCell>
                <TableCell className="text-right ">
                  {account.password}
                </TableCell>
                <div className="flex items-center justify-center j space-x-[0.5rem] ">
                  <Dialog open={DialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger asChild>
                      <Button
                        className="inline-flex items-center justify-center p-0 "
                        variant="ghost"
                        onClick={() => handleEdit(account)}
                      >
                        <img
                          src={editSVG}
                          alt="edit icon"
                          className="p-[1px]"
                        />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit Account</DialogTitle>
                        <DialogDescription>
                          Make changes in this account. Click save when you're
                          done.
                        </DialogDescription>
                      </DialogHeader>

                      <div>
                        <div>
                          <Label>Username</Label>
                          <Input
                            type="input"
                            placeholder={account.username}
                            value={editUsername} // optional, but still working
                            onChange={(e) => setEditUsername(e.target.value)}
                          ></Input>
                        </div>
                        <div>
                          <Label>Password</Label>
                          <Input
                            type="input"
                            placeholder={account.password}
                            value={editPassword}
                            onChange={(e) => setEditPassword(e.target.value)}
                          ></Input>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button onClick={handleSave}>Save</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  <Button
                    onClick={() => handleDelete(index)}
                    className="inline-flex items-center justify-center p-0"
                    variant="ghost"
                  >
                    <img src={deleteSVG} alt="" />
                  </Button>
                </div>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  function searchBar() {
    return (
      <div className="search-bar-container">
        <Input placeholder="Search..." onChange={searchHandler} />
      </div>
    );
  }
  return (
    <>
      <div className="pl-[4rem]">
        <div className="space-y-[1rem] border rounded-lg p-4 shadow-sm w-[40rem]">
          {searchBar()}
          {productTable()}
        </div>
      </div>
    </>
  );
};

export default FilterableNames;
