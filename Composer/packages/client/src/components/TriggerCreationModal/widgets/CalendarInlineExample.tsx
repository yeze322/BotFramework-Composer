// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as React from 'react';
import { Calendar, DayOfWeek, DateRangeType } from 'office-ui-fabric-react/lib/Calendar';

export interface ICalendarInlineExampleProps {
  isMonthPickerVisible?: boolean;
  dateRangeType?: DateRangeType;
  autoNavigateOnSelection?: boolean;
  showGoToToday?: boolean;
  showNavigateButtons?: boolean;
  highlightCurrentMonth?: boolean;
  highlightSelectedMonth?: boolean;
  isDayPickerVisible?: boolean;
  showMonthPickerAsOverlay?: boolean;
  showWeekNumbers?: boolean;
  minDate?: Date;
  maxDate?: Date;
  restrictedDates?: Date[];
  showSixWeeksByDefault?: boolean;
  workWeekDays?: DayOfWeek[];
  firstDayOfWeek?: DayOfWeek;
}

const dayPickerStrings = {
  months: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  shortDays: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  goToToday: 'Go to today',
  weekNumberFormatString: 'Week number {0}',
  prevMonthAriaLabel: 'Previous month',
  nextMonthAriaLabel: 'Next month',
  prevYearAriaLabel: 'Previous year',
  nextYearAriaLabel: 'Next year',
  prevYearRangeAriaLabel: 'Previous year range',
  nextYearRangeAriaLabel: 'Next year range',
  closeButtonAriaLabel: 'Close',
  monthPickerHeaderAriaLabel: '{0}, select to change the year',
  yearPickerHeaderAriaLabel: '{0}, select to change the month',
};
const divStyle: React.CSSProperties = {
  height: 'auto',
  border: '1px solid #ccc',
};

export const CalendarInlineExample: React.FunctionComponent<ICalendarInlineExampleProps> = (
  props: ICalendarInlineExampleProps
) => {
  const [selectedDateRange, setSelectedDateRange] = React.useState<Date[]>();
  const [selectedDate, setSelectedDate] = React.useState<Date>();

  const onSelectDate = (date: Date, dateRangeArray?: Date[]): void => {
    if (!dateRangeArray) return;
    setSelectedDate(date);
    setSelectedDateRange(dateRangeArray);
  };

  const onDismiss = () => {
    return selectedDate;
  };

  if (selectedDateRange) {
    const rangeStart = selectedDateRange[0];
    const rangeEnd = selectedDateRange[selectedDateRange.length - 1];
    dateRangeString = rangeStart.toLocaleDateString() + '-' + rangeEnd.toLocaleDateString();
  }

  return (
    <div style={divStyle}>
      <h3 style={{ paddingLeft: 20 }}>UI Widget Placeholder - VA Calendar </h3>
      <Calendar
        // eslint-disable-next-line react/jsx-no-bind
        autoNavigateOnSelection={props.autoNavigateOnSelection}
        // eslint-disable-next-line react/jsx-no-bind
        dateRangeType={props.dateRangeType}
        firstDayOfWeek={props.firstDayOfWeek ? props.firstDayOfWeek : DayOfWeek.Sunday}
        highlightCurrentMonth={props.highlightCurrentMonth}
        highlightSelectedMonth={props.highlightSelectedMonth}
        isDayPickerVisible={props.isDayPickerVisible}
        isMonthPickerVisible={props.isMonthPickerVisible}
        maxDate={props.maxDate}
        minDate={props.minDate}
        restrictedDates={props.restrictedDates}
        showGoToToday={props.showGoToToday}
        showMonthPickerAsOverlay={props.showMonthPickerAsOverlay}
        showSixWeeksByDefault={props.showSixWeeksByDefault}
        showWeekNumbers={props.showWeekNumbers}
        strings={dayPickerStrings}
        value={selectedDate!}
        workWeekDays={props.workWeekDays}
        onDismiss={onDismiss}
        onSelectDate={onSelectDate}
      />
    </div>
  );
};
