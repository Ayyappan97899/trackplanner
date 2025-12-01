"use client";

import { Button, CloseButton, Drawer, Portal } from "@chakra-ui/react";

interface AppDrawerProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  title: string;
  children: React.ReactNode;
  onSave: (e: any) => any;
  onCancel: (e: any) => any;
}

const AppDrawer = ({
  open,
  setOpen,
  title,
  children,
  onSave,
  onCancel,
}: AppDrawerProps) => {
  return (
    <Drawer.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title>{title}</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>{children}</Drawer.Body>
            <Drawer.Footer>
              <Button variant="outline" onClick={onCancel}>
                Cancel
              </Button>
              <Button onClick={onSave} background={"brand.500"}>
                Save
              </Button>
            </Drawer.Footer>
            <Drawer.CloseTrigger asChild onClick={onCancel}>
              <CloseButton size="sm" />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
};

export default AppDrawer;
