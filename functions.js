// Add your javascript here. Plagiarism will NOT be tolerated!

$("#closeButton").click(() => {
    $("#detailsModal").css("display", "none");
    $(".become-premium-call-to-action").css("display", "none");
    $("#eventTag").text("");
});

const eventsArray = [
    {
        uid: 1,
        eventName: "Meetup - ReactJS",
        eventDateTime: 1589117433000,
        eventLocal: "Hangouts",
        imgUrl: "https://firebasestorage.googleapis.com/v0/b/hackerrank-html-css-js.appspot.com/o/EventsImages%2FReact-JS.jpg?alt=media&token=c6c1a81b-c2f6-49af-acb4-ea7749a6b0fb",
        description: "Meet another developers throught the internet and talk about ReactJS in this quarentine. Enjoy your free time to learn something new!",
        eventTag: "meetup"
    },
    {
        uid: 2,
        eventName: "Hackathon for the world",
        eventDateTime: 1589047200000,
        eventLocal: "Hangouts",
        imgUrl: "https://firebasestorage.googleapis.com/v0/b/hackerrank-html-css-js.appspot.com/o/EventsImages%2Fhackathon-image.jpg?alt=media&token=62e1b221-8448-483e-b093-65929122cf1b",
        description: "We created this hackathon to you help the world in this pandemic. Join with us and make a better world with your development skills.",
        eventTag: "hackathon"
    },
    {
        uid: 3,
        eventName: "How to use Google Trends",
        eventDateTime: 1589104800000,
        eventLocal: "Hangouts/Youtube",
        imgUrl: "https://firebasestorage.googleapis.com/v0/b/hackerrank-html-css-js.appspot.com/o/EventsImages%2Fgoogle-trends.jpg?alt=media&token=bbc15723-0dd5-442c-b31f-237b10e89da5",
        description: "Learn how to improve you knowledge with this powerful tool calld Google Trends. You will learn how to use it for you.",
        eventTag: "webinar"
    },
    {
        uid: 4,
        eventName: "How to gain money",
        eventDateTime: 1591783257000,
        eventLocal: "Whereby",
        imgUrl: "https://firebasestorage.googleapis.com/v0/b/hackerrank-html-css-js.appspot.com/o/EventsImages%2Fmoney.jpg?alt=media&token=4ee37724-55fc-42c3-9991-c163ec6af2d6",
        description: "In this webinar you will learn how to use your knowledge and your skill to gain money honestly. We will help you to find your best way to grow up.",
        eventTag: "paidWebinar"
    },
    {
        uid: 5,
        eventName: "Recruiting Mission",
        eventDateTime: 1589533200000,
        eventLocal: "Youtube/Instagram",
        imgUrl: "https://firebasestorage.googleapis.com/v0/b/hackerrank-html-css-js.appspot.com/o/EventsImages%2Frecruiting-image.jpg?alt=media&token=573bf7ec-f6a9-4cab-b4b8-1f22ae7441b5",
        description: "In this live we will talk about home office and how to companies can hire in this epidemic. We will tech you how to be noted in the sea of peaple looking for remote jobs.",
        eventTag: "recruiting"
    },
    {
        uid: 6,
        eventName: "Hackathon for the world #2",
        eventDateTime: 1589547600000,
        eventLocal: "Hangouts",
        imgUrl: "https://firebasestorage.googleapis.com/v0/b/hackerrank-html-css-js.appspot.com/o/EventsImages%2Fhackathon-image.jpg?alt=media&token=62e1b221-8448-483e-b093-65929122cf1b",
        description: "We created this hackathon to you help the world in this pandemic. Join with us and make a better world with your development skills.",
        eventTag: "hackathon"
    },
    {
        uid: 7,
        eventName: "#StayHome and learn NodeJS",
        eventDateTime: 1589716800000,
        eventLocal: "Hangouts",
        imgUrl: "https://firebasestorage.googleapis.com/v0/b/hackerrank-html-css-js.appspot.com/o/EventsImages%2Fnodejs.jpg?alt=media&token=37d858ce-e5ad-45b7-9db2-8eadae3f435a",
        description: "Enjoy you free time and talk about NodeJS with anothers developers that also love Node.",
        eventTag: "meetup"
    },
    {
        uid: 8,
        eventName: "HackerRank talks: Stay safe",
        eventDateTime: 1589742000000,
        eventLocal: "Hangouts",
        imgUrl: "https://firebasestorage.googleapis.com/v0/b/hackerrank-html-css-js.appspot.com/o/EventsImages%2Fhackerrank.png?alt=media&token=6cf2f9d3-1d82-43e5-ae87-04a6aa1040d5",
        description: "In this webinar Rodrigo Xavier, HackRanck CTO, will talk about how to use the best pratices to improve your development skils.",
        eventTag: "webinar"
    },
    {
        uid: 9,
        eventName: "Leap meeting",
        eventDateTime: 1589884600000,
        eventLocal: "Hangouts",
        imgUrl: "https://firebasestorage.googleapis.com/v0/b/hackerrank-html-css-js.appspot.com/o/Events%2Fleap.jpg?alt=media&token=eb297422-e003-4923-b56e-90a05cb4fb8c",
        description: "Now is time to get the big step. Join with us in this very important event!",
        eventTag: "leap"
    }
];

let nearestEventDateTime = 0;

function loadNextEvents() {
    $("#clearFilter").hide();
    const sortedEventsArray = eventsArray.sort(compare);
    $.each(eventsArray, (index, value) => {
        const now = new Date().getTime();
        if (now < value.eventDateTime) {
            renderEvent(value);
        }
        if (nearestEventDateTime == 0) {
            nearestEventDateTime = value.eventDateTime;
        }
        else if (value.eventDateTime < nearestEventDateTime) {
            nearestEventDateTime = value.eventDateTime;
        }
    });
    startCount(new Date(nearestEventDateTime));
}

function renderEvent(eventData) {
    const date = new Date(eventData.eventDateTime);
    const minutesFormatted = date.getMinutes().length < 2 ? date.getMinutes() + "0" : date.getMinutes();
    const formattedDateTime = `${normalizeNumber(date.getDate())}/${normalizeNumber(date.getMonth() + 1)}/${date.getFullYear()} ${normalizeNumber(date.getHours())}:${normalizeNumber(date.getMinutes())} `

    const isPremium = eventData.eventTag === "paidWebinar";
    const isRecomended = eventData.eventTag === "hackathon" || eventData.eventTag === "leap" || eventData.eventTag === "recruiting";


    const divToAppend =
        `
            <div class="event-data" style="background-image: url(${eventData.imgUrl})" onClick="openEventDetails('${eventData.eventName}', '${eventData.eventDateTime}', '${eventData.eventLocal}', '${eventData.imgUrl}', '${eventData.eventTag}', '${eventData.description}')">
                <span class="${isRecomended && "event-recomended"}">${isRecomended && "Recomended" || ""}</span>
                <div class="event-data-view">
                    <div class="event-information">
                        <div>
                            <span class="${isPremium && "event-premium"}">${isPremium && "Premim users only" || ""}</span>
                        </div>
                        <span class="event-title">${eventData.eventName}</span>
                        <span class="event-date">${formattedDateTime}</span>
                        <span class="event-date">${eventData.eventLocal}</span>
                    </div>
                    <div class="event-share" onClick="shareEvent()">
                        <span class="share-text">Share</span>
                    </div>
                </div>
            </div>
        `
    $(".events-body-container").append(divToAppend);
}

function normalizeNumber(number) {
    let returnNumber = number;
    if (number < 10) {
        returnNumber = "0" + number;
    }
    return returnNumber;
}

function startCount(nearestEventDateTime) {
    const now = new Date();
    const diffDays = parseInt((nearestEventDateTime.getTime() - now.getTime()) / (1000 * 3600 * 24), 10);
    let diffHours = parseInt((nearestEventDateTime.getTime() - now.getTime()) / (1000 * 3600), 10);
    diffHours = diffHours - (diffDays * 24);

    const formattedHour = `${diffDays}d ${diffHours}h`;

    $("#timeText").text(formattedHour);
}

function compare(a, b) {
    const aDateTime = a.eventDateTime;
    const bDateTime = b.eventDateTime;

    if (aDateTime > bDateTime) {
        return 1
    }
    else {
        return -1;
    }
}

function filterEvents(eventType) {
    $(".events-body-container").empty();
    $("#clearFilter").show();
    const sortedEventsArray = eventsArray.sort(compare);
    $.each(eventsArray, (index, value) => {
        if (value.eventTag === eventType || eventType === "all") {
            renderEvent(value);
        }
    });
}


function shareEvent(eventData) {
    const url = "https://vanhack.com/platform/#/events";
    document.execCommand("copy");
    $("#successNotify").text("Link copied to clipboard. Now you can share in any social network!")
    $("#successNotify").fadeIn(500);
    $("#successNotify").fadeOut(4000);
    event.stopPropagation();
}

function clearFilter() {
    $(".events-body-container").empty();
    loadNextEvents();
}

function openEventDetails(eventName, eventDateTime, eventLocal, imageURL, eventTag, eventDescription) {
    const date = normalizeNumber(new Date(+eventDateTime).getDate());
    const month = normalizeNumber(new Date(+eventDateTime).getMonth());
    const year = normalizeNumber(new Date(+eventDateTime).getFullYear());
    const hour = normalizeNumber(new Date(+eventDateTime).getHours());
    const minute = normalizeNumber(new Date(+eventDateTime).getMinutes());

    console.log(eventName, eventDateTime, eventLocal, imageURL, eventTag);
    $("#detailsModal").css("display", "block");
    $("#eventCover").css("background-image", "url(" + imageURL + ")");
    $("#eventModalTitle").text(eventName);
    $("#eventLocal").text(eventLocal);
    $("#eventDateTime").text(`${date}/${month}/${year} ${hour}:${minute}`);
    $("#eventDescription").text(eventDescription);
    $("#eventTag").text(eventTag);
}

function applyToEvent() {
    const userName = $("#userName").val();
    const userMail = $("#userMail").val();
    if (!userName || !userMail)
        return;

    event.preventDefault();
    
    const eventTag = $("#eventTag").text();
    if (eventTag === "paidWebinar") {
        $(".become-premium-call-to-action").css("display", "block");
    } else {
        $("#detailsModal").css("display", "none");
        $("#eventTag").text("");
        $("#successNotify").text("You applied successfully to this event!")
        $("#successNotify").fadeIn(200);
        $("#successNotify").fadeOut(5000);
    }
}
