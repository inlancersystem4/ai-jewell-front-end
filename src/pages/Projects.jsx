import { Button, Input } from "@headlessui/react";
import { LoaderCircle, Database, Search, EllipsisVertical } from "lucide-react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useDebouncedCallback } from "use-debounce";
import { useQuery } from "@tanstack/react-query";
import { post } from "@/utils/axiosWrapper";
import { toast } from "sonner";
import { useState } from "react";

export default function Projects() {
  const [search, setSearch] = useState("");

  async function projectListFn() {
    const formData = new FormData();
    formData.append("search", search);
    formData.append("page", search);

    try {
      const response = await post("c/chat-list", formData);
      if (response.success == 1) {
        return response.data;
      } else {
        toast.error(response.message);
        return null;
      }
    } catch (e) {
      console.error(e);
      toast.error("An unexpected error occurred. Please try again.");
      throw e;
    }
  }

  const handleSearch = useDebouncedCallback((value) => {
    setSearch(value);
    refetch();
  }, 3000);

  const { isLoading, data, refetch } = useQuery({
    queryKey: ["chatlist"],
    //   queryFn: projectListFn,
  });

  return (
    <div className="py-4 custom-container">
      <div className="space-y-4">
        <div className="flex items-center justify-between w-full">
          <div className="relative">
            <div className="absolute top-1/2 -translate-1/2 left-3">
              <Search size={12} />
            </div>
            <Input
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              type="text"
              className="border border-light-gray rounded-lg py-1.5 px-2.5 pl-6 min-w-lg shadow text-xs"
              placeholder="Search here"
            />
          </div>
        </div>
      </div>
      <div className="w-full">
        {isLoading ? (
          <div className="w-full py-12 flex items-center justify-center">
            <LoaderCircle className="animate-spin" size={40} />
          </div>
        ) : data && data.length > 0 ? (
          <div className="space-y-2">
            <ul className="grid grid-cols-2 gap-6">
              {data.map((project) => (
                <ProjectBox key={project.id} project={project} />
              ))}
            </ul>
            <div className="flex items-center justify-end gap-2">
              <Button className="project-pagination-btn">Prev</Button>
              <Button className="project-pagination-btn">Next</Button>
            </div>
          </div>
        ) : (
          <div className="w-full py-12 flex items-center justify-center">
            <div className="text-center space-y-2">
              <Database size={40} className="mx-auto text-medium-gray" />
              <p className="text-sm text-medium-gray">No Project Found</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ProjectBox() {
  return (
    <li className="project-box">
      <h4 className="text-xl text-black">UI UX Info</h4>
      <Menu>
        <MenuButton className="min-w-10 min-h-10 max-w-10 max-h-10 flex items-center justify-center">
          <EllipsisVertical className="size-4" />
        </MenuButton>
        <MenuItems anchor="bottom">
          <MenuItem>
            <Button>Rename</Button>
          </MenuItem>
          <MenuItem>
            <Button>Delete</Button>
          </MenuItem>
        </MenuItems>
      </Menu>
    </li>
  );
}
