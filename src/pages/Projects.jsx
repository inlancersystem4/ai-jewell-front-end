import { Button, Input } from "@headlessui/react";
import {
  LoaderCircle,
  Database,
  Search,
  EllipsisVertical,
  Pen,
  Trash2,
} from "lucide-react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useDebouncedCallback } from "use-debounce";
import { useQuery } from "@tanstack/react-query";
import { post } from "@/utils/axiosWrapper";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import AlertDialog from "@/components/ui/AlertDialog";

export default function Projects() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteProjectId, setDeleteProjectId] = useState(null);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  async function projectListFn() {
    const formData = new FormData();
    formData.append("search", search);
    formData.append("page_no", currentPage);

    try {
      const response = await post("p/project-list", formData);
      if (response.success === 1) {
        return response.data.project_list;
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
  }, 1000);

  const { isLoading, data, refetch } = useQuery({
    queryKey: ["projectList", search, currentPage],
    queryFn: projectListFn,
    keepPreviousData: true,
  });

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (data && currentPage < data.pagination.total_pages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteProjectId) return;
    const formData = new FormData();
    formData.append("project_id", deleteProjectId);

    try {
      const response = await post("p/project-delete", formData);
      if (response.success) {
        toast.success("Project deleted successfully.");
        setIsAlertOpen(false);
        setCurrentPage(1);
        refetch();
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete project.");
    }
  };

  useEffect(() => {
    refetch();
  }, [search, currentPage, refetch]);

  return (
    <div className="py-4 custom-container">
      <div className="space-y-4">
        <div className="flex items-center justify-between w-full">
          <div className="relative">
            <div className="absolute top-1/2 -translate-1/2 left-3">
              <Search size={12} />
            </div>
            <Input
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
        ) : data && data.projects.length > 0 ? (
          <div className="space-y-2 py-4">
            <ul className="grid grid-cols-2 gap-6">
              {data.projects.map((project) => (
                <ProjectBox
                  key={project.id}
                  project={project}
                  onDelete={() => {
                    setDeleteProjectId(project.project_id);
                    setIsAlertOpen(true);
                  }}
                />
              ))}
            </ul>
            <div className="flex items-center justify-end gap-2">
              <Button
                className="project-pagination-btn"
                onClick={handlePrev}
                disabled={currentPage === 1}
              >
                Prev
              </Button>
              <Button
                className="project-pagination-btn"
                onClick={handleNext}
                disabled={currentPage === data.pagination.total_pages}
              >
                Next
              </Button>
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
      <AlertDialog
        isOpen={isAlertOpen}
        setClose={() => setIsAlertOpen(false)}
        ok={handleDeleteConfirm}
        title="Delete Project"
        description="Are you sure you want to delete this project? This action cannot be undone."
      />
    </div>
  );
}

function ProjectBox({ project, onDelete }) {
  return (
    <li className="project-box">
      <h4 className="text-xl text-black">{project.project_title}</h4>
      <Menu>
        <MenuButton className="min-w-10 min-h-10 max-w-10 max-h-10 flex items-center justify-center">
          <EllipsisVertical className="size-4" />
        </MenuButton>
        <MenuItems
          anchor="bottom"
          className="bg-white shadow  rounded-lg flex flex-col w-44 divide-y divide-snow-white border border-ghost-white"
        >
          <MenuItem className="w-full flex items-center justify-start gap-2 py-1.5 px-2.5 text-sm hover:bg-ghost-white">
            <Button>
              <Pen size={14} />
              Rename
            </Button>
          </MenuItem>
          <MenuItem className="w-full flex items-center justify-start gap-2 py-1.5 px-2.5 text-sm text-crimson-red hover:bg-ghost-white">
            <Button onClick={onDelete}>
              <Trash2 size={14} />
              Delete
            </Button>
          </MenuItem>
        </MenuItems>
      </Menu>
    </li>
  );
}
