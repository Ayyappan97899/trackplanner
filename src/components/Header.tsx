import {
  Box,
  Flex,
  Input,
  Text,
  Container,
  HStack,
  Button,
} from "@chakra-ui/react";
import { format } from "date-fns";
import { FaChevronLeft, FaChevronRight, FaFilter } from "react-icons/fa";
import AppIcon from "./ui/AppIcon";
import { useCalendarStore } from "@/store/calendarStore";
import FilterDrawer from "./FilterDrawer";
import { useState } from "react";
import AppButton from "./ui/AppButton";

const Header = () => {
  const { currentDate, nextMonth, prevMonth, resetToday, setSearch } =
    useCalendarStore();

  const [filterOpen, setFilterOpen] = useState(false);
  const [searchValue, setSearchValue] = useState(""); // local input state

  const currentMonth = format(currentDate, "MMMM yyyy");

  // Trigger global state update only on search button click
  const handleSearchClick = () => {
    setSearch(searchValue.trim()); // update global state
  };

  return (
    <Box
      bg="white"
      py={4}
      px={6}
      position="sticky"
      top={0}
      zIndex={20}
      boxShadow="sm"
    >
      <Container maxW="container.xl">
        <Flex align="center" justify="space-between" gap={4} flexWrap="wrap">
          {/* Logo */}
          <Text fontSize="2xl" fontWeight="bold" color="brand.500">
            TaskPlanner
          </Text>

          {/* Month Navigation */}
          <HStack
            align="center"
            bg="grayCustom.100"
            px={4}
            py={2}
            borderRadius="full"
            minW="220px"
            justifyContent="space-between"
          >
            <AppIcon
              icon={FaChevronLeft}
              size="sm"
              color="grayCustom.500"
              cursor="pointer"
              _hover={{ color: "brand.500" }}
              onClick={prevMonth}
            />
            <Text
              fontSize="md"
              fontWeight="medium"
              color="grayCustom.700"
              textAlign="center"
              flex="1"
            >
              {currentMonth}
            </Text>
            <AppIcon
              icon={FaChevronRight}
              size="sm"
              color="grayCustom.500"
              cursor="pointer"
              _hover={{ color: "brand.500" }}
              onClick={nextMonth}
            />
          </HStack>

          {/* Search + Today + Filter */}
          <Flex gap={3} align="center">
            <HStack gap={0}>
              <Input
                placeholder="Search tasks..."
                maxW="240px"
                bg="grayCustom.50"
                color="grayCustom.700"
                borderRadius="full"
                borderRightRadius={"0"}
                px={4}
                py={2}
                border="1px solid"
                borderColor="gray.200"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                _placeholder={{ color: "grayCustom.500" }}
                _focus={{
                  bg: "white",
                  borderColor: "brand.500",
                  boxShadow: "md",
                }}
              />
              <AppButton
                size="sm"
                colorScheme="brand"
                borderRadius="full"
                borderLeftRadius={"0"}
                height={"40px"}
                onClick={handleSearchClick}
                background={"grayCustom.800"}
              >
                Search
              </AppButton>
            </HStack>
            <Button
              size="sm"
              variant="outline"
              onClick={resetToday}
              color="brand.500"
              borderRadius="full"
              _hover={{ bg: "brand.50" }}
            >
              Today
            </Button>
            <AppIcon
              icon={FaFilter}
              size="md"
              color="brand.500"
              cursor="pointer"
              _hover={{ color: "brand.600" }}
              onClick={() => setFilterOpen(true)}
            />
          </Flex>
        </Flex>
      </Container>

      {/* Filter Drawer */}
      <FilterDrawer open={filterOpen} setOpen={setFilterOpen} />
    </Box>
  );
};

export default Header;
