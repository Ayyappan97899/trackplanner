// src/components/Calendar.tsx
import type { Task, TaskStatus } from "@/types";
import { Box, Flex, Grid, GridItem, Text, VStack } from "@chakra-ui/react";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isToday,
  format,
  startOfDay,
} from "date-fns";
import { useEffect, useState, type JSX } from "react";
import TaskModal from "./TaskModal";
import {
  addItemToLocalStorage,
  getFromLocalStorage,
  updateItemInLocalStorage,
} from "@/utils/localStorageUtils";
import DayTaskListModal from "./DayTaskListModal";
import { useCalendarStore } from "@/store/calendarStore";
import { useFilterStore } from "@/store/filterStore";

interface CalendarProps {
  currentMonth?: Date;
}

const Calendar: React.FC<CalendarProps> = ({ currentMonth = new Date() }) => {
  const { search } = useCalendarStore();
  const { status, week } = useFilterStore();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [taskData, setTaskData] = useState<Task>({
    id: "",
    title: "",
    status: "todo" as TaskStatus,
    startDate: new Date(),
    endDate: new Date(),
  });

  const [dayTaskModalOpen, setDayTaskModalOpen] = useState(false);

  const [filterTaskModalOpen, setfilterTaskModalOpen] = useState(false);

  const [searchModalOpen, setSearchModalOpen] = useState(false);

  const [selectedDayTasks, setSelectedDayTasks] = useState<Task[]>([]);

  // Map status to color
  const statusColorMap: Record<string, string> = {
    todo: "task.todo",
    inProgress: "task.inProgress",
    review: "task.review",
    completed: "task.completed",
  };

  useEffect(() => {
    if (search) {
      setSearchModalOpen(true);
    } else {
      setSearchModalOpen(false);
    }
  }, [search]);

  // Open modal automatically when filter changes
  useEffect(() => {
    // Only open if any filter is applied
    if (status.length > 0 || week) {
      setfilterTaskModalOpen(true);
    } else {
      setfilterTaskModalOpen(false);
    }
  }, [status, week]);

  // Load tasks from localStorage
  useEffect(() => {
    const stored = getFromLocalStorage<Task>("tasks");
    if (!stored) return;

    // Normalize all dates to start of day
    const parsed = stored.map((t) => ({
      ...t,
      startDate: startOfDay(new Date(t.startDate)),
      endDate: startOfDay(new Date(t.endDate)),
    }));
    setTasks(parsed);
  }, []);

  // Random ID generator
  const generateId = () =>
    Math.random().toString(36).substring(2, 10) + Date.now().toString(36);

  // Save task
  const handleSave = () => {
    if (isEdit) {
      updateItemInLocalStorage<Task>("tasks", taskData);
    } else {
      addItemToLocalStorage<Task>("tasks", {
        ...taskData,
        id: generateId(),
      });
    }

    const updated =
      getFromLocalStorage<Task>("tasks")?.map((t) => ({
        ...t,
        startDate: startOfDay(new Date(t.startDate)),
        endDate: startOfDay(new Date(t.endDate)),
      })) || [];

    setTasks(updated);
    setTaskModalOpen(false);
  };

  // Open modal for new task
  const handleCreate = (day: Date) => {
    setIsEdit(false);
    setTaskData({
      id: "",
      title: "",
      status: "todo",
      startDate: startOfDay(day),
      endDate: startOfDay(day),
    });
    setTaskModalOpen(true);
  };

  // Open modal for editing task
  const handleEdit = (task: Task) => {
    setIsEdit(true);
    setTaskData(task);
    setTaskModalOpen(true);
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setTaskData({
      ...taskData,
      [name]:
        name === "startDate" || name === "endDate"
          ? startOfDay(new Date(value))
          : value,
    });
  };

  // Date calculations
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 0 });
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 0 });

  const rows: JSX.Element[] = [];
  let day = startDate;

  while (day <= endDate) {
    const days: JSX.Element[] = [];

    for (let i = 0; i < 7; i++) {
      const currentDay = startOfDay(day);

      // Filter tasks that include this day (multi-day support)
      const dayTasks = tasks.filter(
        (t) => currentDay >= t.startDate && currentDay <= t.endDate
      );

      days.push(
        <GridItem
          key={currentDay.toString()}
          border="1px solid"
          borderColor="gray.200"
          bg={
            currentDay.getDay() === 0 || currentDay.getDay() === 6
              ? "gray.50"
              : "white"
          }
          minH="100px"
          p={2}
          onClick={(e) => {
            if ((e.target as HTMLElement).dataset.type !== "task") {
              handleCreate(currentDay);
            }
          }}
        >
          {/* Date Circle */}
          <Flex
            bg={isToday(currentDay) ? "blue.500" : "white"}
            w="26px"
            h="26px"
            borderRadius="50%"
            justifyContent="center"
            alignItems="center"
          >
            <Text color={isToday(currentDay) ? "white" : "black"}>
              {format(currentDay, "d")}
            </Text>
          </Flex>

          {/* Tasks */}
          <VStack mt={2} align="start">
            {dayTasks.slice(0, 2).map((task) => (
              <Box
                key={task.id}
                data-type="task"
                bg={statusColorMap[task.status]}
                px={2}
                py={1}
                borderRadius="md"
                color="white"
                fontSize="xs"
                cursor="pointer"
                onClick={() => handleEdit(task)}
              >
                {task.title}
              </Box>
            ))}

            {dayTasks.length > 2 && (
              <Text
                fontSize="xs"
                color="blue.600"
                cursor="pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedDayTasks(dayTasks);
                  setDayTaskModalOpen(true);
                }}
              >
                +{dayTasks.length - 2} more
              </Text>
            )}
          </VStack>
        </GridItem>
      );

      day = addDays(day, 1);
    }

    rows.push(
      <Grid
        templateColumns="repeat(7, 1fr)"
        gap={0}
        key={`week-${rows.length}`}
      >
        {days}
      </Grid>
    );
  }

  return (
    <Box my={6}>
      {/* Weekday Header */}
      <Grid templateColumns="repeat(7, 1fr)" textAlign="center">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <Box key={d} py={2} bg="gray.100" fontWeight="bold">
            {d}
          </Box>
        ))}
      </Grid>

      {/* Calendar Grid */}
      {rows}

      {/* Task Modal */}
      <TaskModal
        open={taskModalOpen}
        setOpen={setTaskModalOpen}
        data={taskData}
        handleChange={handleChange}
        onSave={handleSave}
        isEdit={isEdit}
      />

      <DayTaskListModal
        open={dayTaskModalOpen}
        onOpenChange={setDayTaskModalOpen}
        tasks={selectedDayTasks}
        onEdit={(task) => {
          handleEdit(task);
          setDayTaskModalOpen(false); // close day modal when editing
        }}
      />

      <DayTaskListModal
        open={searchModalOpen}
        onOpenChange={setSearchModalOpen}
        tasks={tasks}
        onEdit={(task) => {
          handleEdit(task);
          setSearchModalOpen(false); // close day modal when editing
        }}
      />

      <DayTaskListModal
        open={filterTaskModalOpen}
        onOpenChange={setfilterTaskModalOpen}
        tasks={tasks}
        onEdit={(task) => {
          handleEdit(task);
          setfilterTaskModalOpen(false); // close day modal when editing
        }}
      />
    </Box>
  );
};

export default Calendar;
