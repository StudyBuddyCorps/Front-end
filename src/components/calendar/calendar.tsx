import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Text, Icon } from "@chakra-ui/react";
import { AddIcon, ChatIcon } from "@chakra-ui/icons";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function MyCalendar(props: {
  selectRange: boolean;
  [x: string]: any;
}) {
  const { selectRange, ...rest } = props;
  const [value, onChange] = useState<Value>(new Date());

  return (
    <div>
      <Calendar
        onChange={onChange}
        value={value}
        selectRange={selectRange}
        view={"month"}
        tileContent={<Text color="brand.500" />}
        prevLabel={<Icon as={AddIcon} w="24px" h="24px" mt="4px" />}
        nextLabel={<Icon as={ChatIcon} w="24px" h="24px" mt="4px" />}
      />
    </div>
  );
}
