 document.addEventListener('DOMContentLoaded', function() {
            const calculateBtn = document.getElementById('calculateBtn');
            const birthdateInput = document.getElementById('birthdate');
            const resultBox = document.getElementById('resultBox');
            const yearsElement = document.getElementById('years');
            const monthsElement = document.getElementById('months');
            const daysElement = document.getElementById('days');
            const nextBirthdayElement = document.getElementById('nextBirthday');
            const birthdayMessageElement = document.getElementById('birthdayMessage');

            // Set default date to today (for better UX)
            const today = new Date();
            const formattedToday = today.toISOString().split('T')[0];
            birthdateInput.value = formattedToday;
            birthdateInput.max = formattedToday;

            calculateBtn.addEventListener('click', function() {
                const birthdate = new Date(birthdateInput.value);
                if (isNaN(birthdate.getTime())) {
                    alert('Please enter a valid birthdate');
                    return;
                }

                const age = calculateAge(birthdate);
                
                yearsElement.textContent = age.years;
                monthsElement.textContent = age.months;
                daysElement.textContent = age.days;

                // Calculate next birthday
                const nextBirthday = getNextBirthday(birthdate);
                const daysUntilNextBirthday = Math.floor((nextBirthday - today) / (1000 * 60 * 60 * 24));
                
                if (daysUntilNextBirthday === 0) {
                    nextBirthdayElement.textContent = "🎉 Today is your birthday! 🎉";
                    birthdayMessageElement.textContent = "Happy Birthday! Enjoy your special day!";
                } else {
                    nextBirthdayElement.textContent = `Your next birthday is in ${daysUntilNextBirthday} days 🤩`;
                    
                    if (daysUntilNextBirthday === 1) {
                        birthdayMessageElement.textContent = "Get ready to celebrate tomorrow!";
                    } else if (daysUntilNextBirthday < 30) {
                        birthdayMessageElement.textContent = "It's coming up soon!";
                    } else {
                        birthdayMessageElement.textContent = "";
                    }
                }

                // Show result with animation
                resultBox.classList.remove('hidden');
                setTimeout(() => {
                    resultBox.classList.add('show');
                }, 10);
            });

            function calculateAge(birthdate) {
                const today = new Date();
                let years = today.getFullYear() - birthdate.getFullYear();
                let months = today.getMonth() - birthdate.getMonth();
                let days = today.getDate() - birthdate.getDate();

                if (days < 0) {
                    months--;
                    // Get the last day of the previous month
                    const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
                    days += lastMonth.getDate();
                }

                if (months < 0) {
                    years--;
                    months += 12;
                }

                return { years, months, days };
            }

            function getNextBirthday(birthdate) {
                const today = new Date();
                const currentYear = today.getFullYear();
                
                // Create next birthday date
                let nextBirthday = new Date(currentYear, birthdate.getMonth(), birthdate.getDate());
                
                // If birthday already passed this year, set to next year
                if (nextBirthday < today) {
                    nextBirthday.setFullYear(currentYear + 1);
                }
                
                return nextBirthday;
            }
        });