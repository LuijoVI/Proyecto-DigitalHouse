import React, { useEffect, useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import selectCityStyle from '../SelectCity/SelectCity.module.css';
import es from 'date-fns/locale/es';
import useWindowSize from '../../../hooks/useWindowSize';
import { dateRangeContext } from '../../../context/DateRangeContext';
import { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';

const Calendar = ({ inline, reserved }) => {
  const { dateRangeCapture } = useContext(dateRangeContext);
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  // setDefaultLocale('es');
  registerLocale('es', es);
  const { width } = useWindowSize();

  useEffect(() => {
    dateRangeCapture(dateRange);
  });

  const dateBooking = reserved?.map((booking) => {
    return {
      start: new Date(booking.check_in_date),
      end: new Date(booking.checkout_date),
    };
  });

 const CalendarInput = React.forwardRef(({ value, onClick, className }, ref) => (
  <div
    className={selectCityStyle.dropDownHeader}
    onClick={onClick}
    ref={ref}
    style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
  >
    <FontAwesomeIcon icon={faCalendarDays} style={{ marginRight: '10px', width: '20px', height: '25px' }} />
    <span style={{ fontSize: '14px', fontWeight: 500, color: '#7f7f7f' }}>{value || "Fecha de reserva"}</span>
  </div>
));

  // console.log(dateBooking);

  return (
    <DatePicker
      selectsRange={true}
      startDate={startDate}
      endDate={endDate}
      minDate={new Date()}
      monthsShown={width < 768 ? 1 : 2}
      dateFormat="dd/MM/yyyy"
      customInput={<CalendarInput />}
      onChange={(update) => {
        setDateRange(update);
      }}
      locale="es"
      inline={inline || false}
      //   isClearable={true}
      // fixedHeight
      // excludeDates={dateBooking}
      excludeDateIntervals={dateBooking}
    />
  );
};

export default Calendar;
