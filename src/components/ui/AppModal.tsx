"use client";

import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";
import React from "react";
import AppButton from "./AppButton";

interface AppModalProps {
  title: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave?: () => void;
  children: React.ReactNode;
  isAction?: boolean;
}

const AppModal = ({
  title,
  open,
  onOpenChange,
  onSave,
  children,
  isAction = true,
}: AppModalProps) => {
  return (
    <Dialog.Root
      lazyMount
      open={open}
      onOpenChange={(e) => onOpenChange(e.open)}
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>{title}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>{children}</Dialog.Body>
            {isAction && (
              <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                  <AppButton variant="outline">Cancel</AppButton>
                </Dialog.ActionTrigger>
                <Button onClick={onSave} background={"brand.500"}>
                  Save
                </Button>
              </Dialog.Footer>
            )}
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default AppModal;
