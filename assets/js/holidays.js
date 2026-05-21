// assets/js/holidays.js

const ThaiHolidays = {
    // Holiday database for 2026 and 2027
    database: {
        "2026": {
            "01-01": "วันขึ้นปีใหม่ (New Year's Day)",
            "03-03": "วันมาฆบูชา (Makha Bucha Day)*",
            "04-06": "วันจักรี (Chakri Memorial Day)",
            "04-13": "วันสงกรานต์ (Songkran Festival)",
            "04-14": "วันสงกรานต์ (Songkran Festival)",
            "04-15": "วันสงกรานต์ (Songkran Festival)",
            "05-01": "วันแรงงานแห่งชาติ (National Labour Day)",
            "05-04": "วันฉัตรมงคล (Coronation Day)",
            "05-31": "วันวิสาขบูชา (Visakha Bucha Day)*",
            "06-03": "วันเฉลิมพระชนมพรรษาสมเด็จพระนางเจ้าฯ พระบรมราชินี",
            "07-28": "วันเฉลิมพระชนมพรรษาพระบาทสมเด็จพระเจ้าอยู่หัว",
            "07-29": "วันอาสาฬหบูชา (Asarnha Bucha Day)*",
            "07-30": "วันเข้าพรรษา (Buddhist Lent Day)*",
            "08-12": "วันแม่แห่งชาติ (Mother's Day)",
            "10-13": "วันคล้ายวันสวรรคต ร.9 (King Bhumibol Memorial Day)",
            "10-23": "วันปิยมหาราช (Chulalongkorn Day)",
            "12-05": "วันพ่อแห่งชาติ (Father's Day)",
            "12-10": "วันรัฐธรรมนูญ (Constitution Day)",
            "12-31": "วันสิ้นปี (New Year's Eve)"
        },
        "2027": {
            "01-01": "วันขึ้นปีใหม่ (New Year's Day)",
            "02-21": "วันมาฆบูชา (Makha Bucha Day)*",
            "04-06": "วันจักรี (Chakri Memorial Day)",
            "04-13": "วันสงกรานต์ (Songkran Festival)",
            "04-14": "วันสงกรานต์ (Songkran Festival)",
            "04-15": "วันสงกรานต์ (Songkran Festival)",
            "05-01": "วันแรงงานแห่งชาติ (National Labour Day)",
            "05-04": "วันฉัตรมงคล (Coronation Day)",
            "05-20": "วันวิสาขบูชา (Visakha Bucha Day)*",
            "06-03": "วันเฉลิมพระชนมพรรษาสมเด็จพระนางเจ้าฯ พระบรมราชินี",
            "07-18": "วันอาสาฬหบูชา (Asarnha Bucha Day)*",
            "07-19": "วันเข้าพรรษา (Buddhist Lent Day)*",
            "07-28": "วันเฉลิมพระชนมพรรษาพระบาทสมเด็จพระเจ้าอยู่หัว",
            "08-12": "วันแม่แห่งชาติ (Mother's Day)",
            "10-13": "วันคล้ายวันสวรรคต ร.9 (King Bhumibol Memorial Day)",
            "10-23": "วันปิยมหาราช (Chulalongkorn Day)",
            "12-05": "วันพ่อแห่งชาติ (Father's Day)",
            "12-10": "วันรัฐธรรมนูญ (Constitution Day)",
            "12-31": "วันสิ้นปี (New Year's Eve)"
        }
    },

    // Check if a specific date (YYYY-MM-DD) is a holiday
    getHoliday: function(dateStr) {
        const date = new Date(dateStr);
        if (isNaN(date.getTime())) return null;
        
        const year = date.getFullYear().toString();
        const monthDay = dateStr.substring(5, 10); // MM-DD
        
        if (this.database[year] && this.database[year][monthDay]) {
            return this.database[year][monthDay];
        }
        
        // Handle substitution holidays if they fall on weekends (simplified check)
        // If Chakri Day (04-06) falls on Saturday or Sunday, Chakri substitution is on Monday
        return null;
    },

    // Get all holidays in a given year
    getYearHolidays: function(year) {
        return this.database[year.toString()] || {};
    },

    // Get list of holidays between startDate (YYYY-MM-DD) and endDate (YYYY-MM-DD)
    getHolidaysInRange: function(startDateStr, endDateStr) {
        const start = new Date(startDateStr);
        const end = new Date(endDateStr);
        const list = [];
        
        if (isNaN(start.getTime()) || isNaN(end.getTime())) return list;
        
        const current = new Date(start);
        while (current <= end) {
            const dateStr = current.toISOString().substring(0, 10);
            const holidayName = this.getHoliday(dateStr);
            if (holidayName) {
                list.push({
                    date: dateStr,
                    name: holidayName
                });
            }
            current.setDate(current.getDate() + 1);
        }
        return list;
    },

    // Smart Leave / Vacation Day Recommender
    // Recommends which day(s) to take leave to get a long weekend!
    suggestVacationDays: function(year) {
        const holidays = this.getYearHolidays(year);
        const suggestions = [];
        
        Object.keys(holidays).forEach(monthDay => {
            const dateStr = `${year}-${monthDay}`;
            const date = new Date(dateStr);
            const dayOfWeek = date.getDay(); // 0 = Sun, 1 = Mon, 2 = Tue, 3 = Wed, 4 = Thu, 5 = Fri, 6 = Sat
            const holidayName = holidays[monthDay];
            
            // Case 1: Holiday is on Tuesday
            // Suggest taking Monday off -> 4-day weekend (Sat, Sun, [Mon], Tue)
            if (dayOfWeek === 2) {
                const monDate = new Date(date);
                monDate.setDate(date.getDate() - 1);
                const monStr = monDate.toISOString().substring(0, 10);
                suggestions.push({
                    holidayDate: dateStr,
                    holidayName: holidayName,
                    holidayDay: "วันอังคาร",
                    suggestedLeaveDate: monStr,
                    suggestedLeaveDay: "วันจันทร์",
                    totalDays: 4,
                    reason: `ลาวันจันทร์ที่ ${this.formatThaiDate(monStr)} จะได้หยุดยาว 4 วัน (เสาร์-อาทิตย์-จันทร์-อังคาร)`
                });
            }
            
            // Case 2: Holiday is on Thursday
            // Suggest taking Friday off -> 4-day weekend (Thu, [Fri], Sat, Sun)
            if (dayOfWeek === 4) {
                const friDate = new Date(date);
                friDate.setDate(date.getDate() + 1);
                const friStr = friDate.toISOString().substring(0, 10);
                suggestions.push({
                    holidayDate: dateStr,
                    holidayName: holidayName,
                    holidayDay: "วันพฤหัสบดี",
                    suggestedLeaveDate: friStr,
                    suggestedLeaveDay: "วันศุกร์",
                    totalDays: 4,
                    reason: `ลาวันศุกร์ที่ ${this.formatThaiDate(friStr)} จะได้หยุดยาว 4 วัน (พฤหัสบดี-ศุกร์-เสาร์-อาทิตย์)`
                });
            }
            
            // Case 3: Holiday is on Wednesday
            // Suggest taking Monday + Tuesday OR Thursday + Friday off -> 5-day weekend!
            if (dayOfWeek === 3) {
                const monDate = new Date(date); monDate.setDate(date.getDate() - 2);
                const tueDate = new Date(date); tueDate.setDate(date.getDate() - 1);
                const monStr = monDate.toISOString().substring(0, 10);
                const tueStr = tueDate.toISOString().substring(0, 10);
                suggestions.push({
                    holidayDate: dateStr,
                    holidayName: holidayName,
                    holidayDay: "วันพุธ",
                    suggestedLeaveDate: `${monStr} และ ${tueStr}`,
                    suggestedLeaveDay: "จันทร์-อังคาร",
                    totalDays: 5,
                    reason: `ลาจันทร์-อังคารที่ ${this.formatThaiDate(monStr)} - ${this.formatThaiDate(tueStr)} ได้หยุดยาว 5 วัน (เสาร์-อาทิตย์-จันทร์-อังคาร-พุธ)`
                });
            }
        });
        
        return suggestions;
    },

    // Format YYYY-MM-DD to "D ด.ม. YYYY" (Thai style)
    formatThaiDate: function(dateStr) {
        const date = new Date(dateStr);
        if (isNaN(date.getTime())) return dateStr;
        
        const months = [
            "ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.",
            "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."
        ];
        
        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear() + 543; // Buddhist Era
        
        return `${day} ${month} ${year}`;
    }
};
