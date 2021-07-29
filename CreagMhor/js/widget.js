
var $checkInDatePicker = $('#check-in-date');
        var $checkOutDatePicker = $('#check-out-date');

        $checkInDatePicker.datepicker({
            format: 'dd-mm-yyyy',
            autoHide: true,
            autoPick: true
        });

        var initialCheckInDate = $checkInDatePicker.datepicker('getDate');
        var initialCheckOutDate = addDays(initialCheckInDate, 2);

        $checkOutDatePicker.datepicker({
            format: 'dd-mm-yyyy',
            autoPick: true,
            date: initialCheckOutDate
        });

        $checkInDatePicker.on('change', function() {
            var checkInDate = $checkInDatePicker.datepicker('getDate');
            var checkOutDate = addDays(checkInDate, 2);
            $checkOutDatePicker.datepicker('setDate', checkOutDate);

            updateDatesToSend(checkInDate, checkOutDate);
            updateStayLength();
        });

        $checkOutDatePicker.on('change', function() {
            updateStayLength();
        });

        updateDatesToSend(initialCheckInDate, initialCheckOutDate);

        function addDays(date, days) {
            var result = new Date(date);
            result.setDate(result.getDate() + days);
            return result;
        }

        function updateStayLength() {
            var date1 = $checkInDatePicker.datepicker('getDate');
            var date2 = $checkOutDatePicker.datepicker('getDate');

            var difference = daysBetween(date1, date2);
            if ( difference < 1 ) difference = 1;
            $("#stay-length").val(difference);
        }

        function updateDatesToSend(checkInDate, checkOutDate) {
            var dd0 = checkInDate.getDate();
            var mm0 = checkInDate.getMonth() + 1;
            var yyyy0 = checkInDate.getFullYear();
            if ( dd0 < 10 ) dd0 = '0' + dd0;
            if ( mm0 < 10 ) mm0 = '0' + mm0;
            $("#check-in-date-to-send").val(yyyy0 + '-' + mm0 + '-' + dd0);

            var dd = checkOutDate.getDate();
            var mm = checkOutDate.getMonth() + 1;
            var yyyy = checkOutDate.getFullYear();
            if ( dd < 10 ) dd = '0' + dd;
            if ( mm < 10 ) mm = '0' + mm;
            $("#check-out-date-to-send").val(yyyy + '-' + mm + '-' + dd);
        }

        function daysBetween( date1, date2 ) {
            var one_day=1000*60*60*24;
            var date1_ms = date1.getTime();
            var date2_ms = date2.getTime();
            var difference_ms = date2_ms - date1_ms;
            return Math.round(difference_ms/one_day);
        }