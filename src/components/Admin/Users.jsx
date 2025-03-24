import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { Container, Loader } from "@mantine/core"; // Import Loader from @mantine/core
import { motion } from "framer-motion";
import {
  Pagination,
  Button,
  TextInput,
  Group,
  Text,
  ActionIcon,
  Switch
} from "@mantine/core";
import { IconSearch, IconTrash, IconEdit } from "@tabler/icons-react";
import toast from "react-hot-toast";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import { Popover } from "@mantine/core";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Navigate, useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { SiTicktick } from "react-icons/si";
import { RxCrossCircled } from "react-icons/rx";



const UserDetails = () => {
  const Navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [globalFilter, setGlobalFilter] = useState("");
  const token = localStorage.getItem("token");

  if (!token) {
    toast.error("Please login first");
  }

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "http://localhost/rent-easy/public/Admin/userDetails.php",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(response.data);
      if (response.data && response.data.success && response.data.users) {
        setUsers(response.data.users);
      } else {
        setError("Unexpected API response structure");
        console.error("Unexpected API response structure:", response.data);
      }
    } catch (error) {
      setError("Error fetching users");
      console.error("Error fetching users:", error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Define columns for the table
  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID",
      },
      {
        accessorKey: "name",
        header: "Name",
      },
      {
        accessorKey: "email",
        header: "Email",
      },
      {
        accessorKey: "phoneNumber",
        header: "Phone",
      },
      {
        accessorKey: "userType",
        header: "Role",
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: (info) => (
          <Switch
            size="md"
            onLabel="ON"
            offLabel="OFF"
            checked={info.getValue() === "unblocked"} // Set the switch state based on the status
            onChange={(event) => {
              const newStatus = event.currentTarget.checked ? "unblocked" : "blocked"; // Toggle status
              const updatedUsers = users.map((user) =>
                user.id === info.row.original.id ? { ...user, status: newStatus } : user
              );
              setUsers(updatedUsers); // Update the local state
            }}
          />
        ),
      },
     
{
  accessorKey: "is_verified",
  header: "Verified",
  cell: (info) => (Number(info.getValue()) === 1 ? <SiTicktick className="text-blue-600 w-5 h-5"/> : <RxCrossCircled className="text-red-500 w-5 h-5"/>),
},
      {
        accessorKey: "created_at",
        header: "Joined",
        cell: (info) => new Date(info.getValue()).toLocaleDateString(),
      },
      {
        id: "actions",
        header: "Actions",
        cell: (info) => (
          <Group spacing="sm">
            <Popover width={200} position="bottom-end" withArrow shadow="lg">
              <Popover.Target>
                <ActionIcon variant="subtle" radius="md" size="lg">
                  <BsThreeDotsVertical size={18} />
                </ActionIcon>
              </Popover.Target>
              <Popover.Dropdown className="p-3 bg-white shadow-lg rounded-lg border border-gray-300 hover:bg-gray-100 transition duration-200 ease-in-out">
                <Text
                  size="xs"
                  className="text-gray-800 text-sm font-semibold hover:text-blue-600 transition duration-200 cursor-pointer flex items-center justify-center"
                  onClick={() => {
                    console.log("User ID:", info.row.original.id); // Debugging line
                    Navigate(
                      `/navbar/userProfileDetails/${info.row.original.id}`
                    );
                  }}
                >
                  <div className="flex items-center gap-4">
                    <FaEye className="text-xl text-black-500" />
                    View Details
                  </div>
                </Text>
              </Popover.Dropdown>
            </Popover>
          </Group>
        ),
      },
    ],
    []
  );

  // Initialize React Table
  const table = useReactTable({
    data: users,
    columns,
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  if (loading) {
    return (
      <motion.div
        className="flex justify-center items-center min-h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Loader size="xl" /> {/* Loader icon from @mantine/core */}
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        className="flex justify-center items-center min-h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-red-500 text-lg">{error}</div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="container mx-auto px-4 py-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold text-center mb-8">User Details</h1>

      {/* Search Bar */}
      <div className="mb-6">
        <TextInput
          placeholder="Search users by name, email, or phone"
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          icon={<IconSearch size={18} />}
          className="w-full md:w-1/2"
        />
      </div>

      {/* User Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <Text size="sm">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </Text>
        <Pagination
          page={table.getState().pagination.pageIndex + 1}
          onChange={(page) => table.setPageIndex(page - 1)}
          total={table.getPageCount()}
          color="blue"
        />
      </div>
    </motion.div>
  );
};

export default UserDetails;