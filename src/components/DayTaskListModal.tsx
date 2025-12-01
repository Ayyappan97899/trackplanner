import type { Task } from "@/types";
import { Box, VStack, Text, HStack, Badge } from "@chakra-ui/react";
import AppModal from "./ui/AppModal";
import { useCalendarStore } from "@/store/calendarStore";
import { useFilterStore } from "@/store/filterStore";
import { startOfMonth, differenceInCalendarDays } from "date-fns";

interface DayTaskListModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tasks: Task[];
  onEdit: (task: Task) => void;
}

// Map status to badge color
const statusBadgeColorMap: Record<string, string> = {
  todo: "task.todo",
  inProgress: "task.inProgress",
  review: "task.review",
  completed: "task.completed",
};

// Format status text to capitalized
const formatStatus = (status: string) =>
  status.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase());

// Helper: Get week of month (1, 2, 3, 4, 5)
const getWeekOfMonth = (date: Date) => {
  const start = startOfMonth(date);
  return Math.floor(differenceInCalendarDays(date, start) / 7) + 1;
};

const DayTaskListModal: React.FC<DayTaskListModalProps> = ({
  open,
  onOpenChange,
  tasks,
  onEdit,
}) => {
  const { search } = useCalendarStore();
  const { status: selectedStatuses, week: selectedWeek } = useFilterStore();

  const filteredTasks = tasks.filter((task) => {
    const startDate = new Date(task.startDate);

    const matchesSearch = search
      ? task.title.toLowerCase().includes(search.toLowerCase())
      : true;

    const matchesStatus =
      selectedStatuses.length > 0
        ? selectedStatuses.includes(task.status)
        : true;

    const matchesWeek = selectedWeek
      ? getWeekOfMonth(startDate).toString() === selectedWeek
      : true;

    return matchesSearch && matchesStatus && matchesWeek;
  });

  const modalTitle = search
    ? `Tasks Matching "${search}"`
    : "Tasks for the Day";

  return (
    <AppModal
      title={modalTitle}
      open={open}
      onOpenChange={onOpenChange}
      isAction={false}
    >
      {filteredTasks.length === 0 ? (
        <Text textAlign="center" py={6} color="gray.500">
          No tasks found.
        </Text>
      ) : (
        <VStack align="stretch" spaceY={3} maxH="400px" overflowY="auto" pr={1}>
          {filteredTasks.map((task) => (
            <Box
              key={task.id}
              borderWidth="1px"
              borderColor="gray.200"
              borderRadius="md"
              p={3}
              bg="white"
              shadow="sm"
              cursor="pointer"
              _hover={{ shadow: "md" }}
              onClick={() => onEdit(task)}
            >
              <HStack justifyContent="space-between" align="start">
                <Box>
                  <Text fontWeight="bold" fontSize="sm">
                    {task.title}
                  </Text>
                  <Text fontSize="xs" color="gray.500">
                    {new Date(task.startDate).toLocaleDateString()} -{" "}
                    {new Date(task.endDate).toLocaleDateString()}
                  </Text>
                </Box>
                <Badge
                  bg={statusBadgeColorMap[task.status] || "gray.300"}
                  color="white"
                  fontSize="0.7rem"
                  px={2}
                  py={1}
                  borderRadius="full"
                >
                  {formatStatus(task.status)}
                </Badge>
              </HStack>
            </Box>
          ))}
        </VStack>
      )}
    </AppModal>
  );
};

export default DayTaskListModal;
