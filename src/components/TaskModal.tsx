import { Field, Input, VStack } from "@chakra-ui/react";
import AppModal from "./ui/AppModal";
import AppSelect from "./ui/AppSelect";
import type { Task } from "@/types";
import { taskOptions } from "@/constant";

interface TaskModalProps {
  open: boolean;
  setOpen: (e: any) => any;
  onSave: () => any;
  handleChange: (e: any) => any;
  data: Task;
  isEdit: boolean;
}

const TaskModal = ({
  open,
  setOpen,
  onSave,
  handleChange,
  data,
  isEdit,
}: TaskModalProps) => {
  return (
    <AppModal
      title={isEdit ? "Edit Task" : "Create Task"}
      open={open}
      onOpenChange={setOpen}
      onSave={onSave}
    >
      <VStack>
        <Field.Root>
          <Field.Label>Task Name</Field.Label>
          <Input name="title" onChange={handleChange} value={data?.title} />
        </Field.Root>
        <AppSelect
          label="Status"
          fieldProps={{
            name: "status",
          }}
          value={data?.status}
          options={taskOptions}
          onChange={handleChange}
        />
      </VStack>
    </AppModal>
  );
};

export default TaskModal;
