import { VStack, Checkbox, Text, Box, Button } from "@chakra-ui/react";
import AppDrawer from "./ui/AppDrawer";
import { useState, type FC } from "react";
import { useFilterStore } from "@/store/filterStore";

interface FilterDrawerProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const statuses = ["todo", "inProgress", "review", "completed"];
const weeks = ["1", "2", "3"];

const FilterDrawer: FC<FilterDrawerProps> = ({ open, setOpen }) => {
  const {
    status: globalStatus,
    week: globalWeek,
    toggleStatus,
    setWeek,
    resetFilters,
  } = useFilterStore();

  // Local state for drawer
  const [localStatus, setLocalStatus] = useState<string[]>([...globalStatus]);
  const [localWeek, setLocalWeek] = useState<string>(globalWeek || "");

  // Toggle status locally
  const handleStatusToggle = (value: string) => {
    setLocalStatus((prev) =>
      prev.includes(value) ? prev.filter((s) => s !== value) : [...prev, value]
    );
  };

  // Set week locally
  const handleWeekSelect = (w: string) => {
    setLocalWeek(w);
  };

  // Save changes to global store
  const handleSave = () => {
    globalStatus.forEach((s) => toggleStatus(s));
    localStatus.forEach((s) => toggleStatus(s));
    setWeek(localWeek);
    setOpen(false);
  };

  // Cancel and revert local state
  const handleCancel = () => {
    setLocalStatus([...globalStatus]);
    setLocalWeek(globalWeek || "");
    setOpen(false);
  };

  return (
    <AppDrawer
      open={open}
      setOpen={setOpen}
      title="Filter Tasks"
      onSave={handleSave}
      onCancel={handleCancel}
    >
      <VStack align="stretch" gap={6} px={1}>
        {/* Status Section */}
        <Box>
          <Text fontWeight="bold" fontSize="lg" mb={2}>
            Status
          </Text>
          <Box
            border="1px solid"
            borderColor="gray.200"
            borderRadius="lg"
            p={3}
            bg="gray.50"
          >
            <VStack align="start">
              {statuses.map((value) => (
                <Checkbox.Root
                  key={value}
                  value={value}
                  checked={localStatus.includes(value)}
                  onCheckedChange={() => handleStatusToggle(value)}
                  colorPalette="blue"
                >
                  <Checkbox.HiddenInput />
                  <Checkbox.Control />
                  <Text fontSize="sm">
                    {value.charAt(0).toUpperCase() + value.slice(1)}
                  </Text>
                </Checkbox.Root>
              ))}
            </VStack>
          </Box>
        </Box>

        {/* Week Section */}
        <Box>
          <Text fontWeight="bold" fontSize="lg" mb={2}>
            Week
          </Text>
          <VStack align="stretch">
            {weeks.map((w) => (
              <Checkbox.Root
                key={w}
                checked={localWeek === w}
                onCheckedChange={() => handleWeekSelect(w)}
                colorPalette="blue"
              >
                <Checkbox.HiddenInput />
                <Checkbox.Control />
                <Text fontSize="sm">Week {w}</Text>
              </Checkbox.Root>
            ))}
          </VStack>
        </Box>

        {/* RESET BUTTON */}
        <Button
          variant="ghost"
          colorScheme="red"
          size="sm"
          alignSelf="flex-start"
          onClick={() => {
            resetFilters();
            setLocalStatus([]);
            setLocalWeek("");
          }}
        >
          Reset Filters
        </Button>
      </VStack>
    </AppDrawer>
  );
};

export default FilterDrawer;
