import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { TaskAction, TasksState, TaskItem } from "@/lib/tasks/types";

interface TaskFilterProps {
  filter: Partial<TasksState["filter"]>;
  dispatch: React.Dispatch<TaskAction>;
}

export default function TaskFilter({ filter, dispatch }: TaskFilterProps) {
  const handleStatusChange = (status: TasksState["filter"]["status"]) => {
    dispatch({
      type: "SET_FILTER",
      payload: { status },
    });
  };

  const handlePriorityChange = (priority: TaskItem["priority"]) => {
    dispatch({
      type: "SET_FILTER",
      payload: {
        priorities: filter.priorities?.includes(priority)
          ? filter.priorities.filter((p) => p !== priority) // Remove if exists
          : [...(filter.priorities || []), priority], // Add if doesn't exist
      },
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="shrink-0"
        >
          <Filter />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Filter Tasks by</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuLabel className="font-normal">Status</DropdownMenuLabel>
        <DropdownMenuCheckboxItem
          checked={filter.status === "Completed"}
          onSelect={(e) => e.preventDefault()}
          onCheckedChange={() => {
            if (filter.status === "Completed") {
              return;
            }
            handleStatusChange("Completed");
          }}
        >
          Completed
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={filter.status === "Active"}
          onSelect={(e) => e.preventDefault()}
          onCheckedChange={() => {
            if (filter.status === "Active") {
              return;
            }
            handleStatusChange("Active");
          }}
        >
          Active
        </DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />
        <DropdownMenuLabel className="font-normal">Priority</DropdownMenuLabel>
        {(["Low", "Medium", "High"] as const).map((priority) => (
          <DropdownMenuCheckboxItem
            key={priority}
            checked={filter.priorities?.includes(priority)}
            onSelect={(e) => e.preventDefault()}
            onCheckedChange={() => handlePriorityChange(priority)}
          >
            {priority}
          </DropdownMenuCheckboxItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="flex items-center gap-1 hover:bg-red-500/10 text-red-500"
          onSelect={(e) => e.preventDefault()}
          onClick={() => {
            dispatch({
              type: "SET_FILTER",
              payload: { priorities: [], status: null },
            });
          }}
        >
          Clear
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}