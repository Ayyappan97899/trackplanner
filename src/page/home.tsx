import Calendar from "@/components/Calendar";
import Header from "@/components/Header";
import { Box, Container } from "@chakra-ui/react";
import { useCalendarStore } from "@/store/calendarStore";

export default function App() {
  const { currentDate } = useCalendarStore(); // get current month from store

  return (
    <Box>
      <Header />
      <Container maxW="container.xl" mt={4}>
        <Calendar currentMonth={currentDate} />
      </Container>
    </Box>
  );
}
