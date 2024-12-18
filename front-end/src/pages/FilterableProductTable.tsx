  import myJson from "../myJson";
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
  import {  useState } from "react";
  import IAccount from "@/types/IAccount";



  const FilterableProductTable = ({accountList}: {accountList: IAccount[]}) => {
    // const accounts = myJson();
    const [searchQuery, setSearchQuery] = useState("");

    function searchHandler(e: React.ChangeEvent<HTMLInputElement>) {
      setSearchQuery(e.target.value.toLowerCase());
    }

    function productTable() {
      const filteredAccounts = accountList.filter((accounts) => {
        return accounts.username?.toLowerCase().includes(searchQuery)
      });
      return (
        <div className="product-table-container">
          <Table>
            <TableCaption>List of Accounts </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="text-left">Usernames</TableHead>
                <TableHead className="text-right">Passwords</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAccounts.map((account, index) => (
                <TableRow key={index}>
                  <TableCell className="text-left">{account.username}</TableCell>
                  <TableCell className="text-right">{account.password}</TableCell>
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
      <div className="filterable-product-table-container">
        {searchBar()}
        {productTable()}
      </div>
    );
  };

  export default FilterableProductTable;
