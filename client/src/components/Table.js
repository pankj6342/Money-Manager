import React from "react";
import { useSelector } from "react-redux";

export const Table = ({ balances }) => {
  const user = useSelector((state) => state.user);
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {/* <th scope="col" className="px-6 py-3">
              Product name
            </th> */}
            <th scope="col" className="px-6 py-3">
              Creditor
            </th>
            <th scope="col" className="px-6 py-3">
              Debitor
            </th>
            <th scope="col" className="px-6 py-3">
              Amount
            </th>
          </tr>
        </thead>
        <tbody>
          {balances.map((balance) => (
            <tr
              className="bg-[#eb4034] border-b dark:bg-gray-800 dark:border-gray-700"
            >
              {/* <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Apple MacBook Pro 17"
            </th> */}
              <td className="px-6 py-4">{balance.from}</td>
              <td className="px-6 py-4">{balance.to}</td>
              <td className="px-6 py-4">{balance.amount.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
