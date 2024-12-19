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
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@radix-ui/react-label";


interface FilterableProductTableProps{
  accountList: IAccount[], 
  setAccount: React.Dispatch<React.SetStateAction<IAccount[]>>
}

const FilterableProductTable = ({
  accountList,setAccount
}: FilterableProductTableProps) => {

  const [searchQuery, setSearchQuery] = useState("");
  const [editUsername, setEditUsername] = useState("");
  const [editPassword, setEditPassword] = useState("");
  const [editIndex, setEditIndex] = useState<number|null>(null);
  const [DialogOpen, setDialogOpen] = useState(false);
  


  function searchHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchQuery(e.target.value.toLowerCase());
  }

  function handleEdit(account: IAccount, index: number){
    setEditUsername(account.username)
    setEditPassword(account.password)
    setEditIndex(index)
    setDialogOpen(true)
  }

  function handleSave() {

    // simple validation: 
    if(editIndex !==null){
      const updatedAccountList = [...accountList];
      updatedAccountList[editIndex] = {
        ...updatedAccountList[editIndex], 
        username: editUsername, 
        password: editPassword
      }
      setAccount(updatedAccountList)
      setDialogOpen(!DialogOpen)
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
                <TableCell className="text-right">{account.password}</TableCell>
                <div className="space-x-2">
                  <Dialog open = {DialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger asChild>
                      <Button onClick={() => handleEdit(account, index)}>edit</Button>
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

                  <Button variant={"destructive"}>delete</Button>
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

export default FilterableProductTable;
