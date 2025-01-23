
let inputEl = document.getElementById("quoteInput");
        let quoteEl = document.getElementById("quoteDisplay");
        let resetBtnEl = document.getElementById("resetBtn");
        let submitBtnEl = document.getElementById("submitBtn");
        let spanEl = document.getElementById("spanTimer");
        let statusPara = document.getElementById("result");
        let spinnerEl = document.getElementById("spinner");

        let dataContent = null;
        let count = 0;
        let uniqueId;

        function startTimer() {
            count = 0;
            spanEl.textContent = count;
            uniqueId = setInterval(function() {
                count += 1;
                spanEl.textContent = count;
            }, 1000);
        }

        function fetchQuote() {
            let url = "https://apis.ccbp.in/random-quote";
            spinnerEl.classList.remove("d-none");
            fetch(url)
                .then(function(response) {
                    return response.json();
                })
                .then(function(jsonData) {
                    dataContent = jsonData.content;
                    spinnerEl.classList.add("d-none");
                    quoteEl.textContent = dataContent;
                });
        }

        function resetFunction() {
            clearInterval(uniqueId);
            inputEl.value = "";
            statusPara.textContent = "";
            fetchQuote();
            startTimer();
        }

        function submitFunction() {
            clearInterval(uniqueId);
            if (inputEl.value === dataContent) {
                statusPara.textContent = "You typed correctly!";
            } else {
                statusPara.textContent = "You typed incorrectly!";
            }
        }

        resetBtnEl.addEventListener("click", resetFunction);
        submitBtnEl.addEventListener("click", submitFunction);

        // Initialize the test
        fetchQuote();
        startTimer();