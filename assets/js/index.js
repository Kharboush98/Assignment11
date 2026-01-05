var apiKey = "s25CsBbusAPXa5SumoGVZzPARkBBX32YgOeHEc1o";

var navLinks = document.querySelectorAll(".nav-link");
var sections = document.querySelectorAll(".app-section");

var launchesGrid = document.getElementById("launches-grid");
var featuredlaunch = document.getElementById("featured-launch");

var dateInput = document.getElementById("apod-date-input");
var loadBtn = document.getElementById("load-date-btn");
var todayBtn = document.getElementById("today-apod-btn"); 
var datetxt = document.getElementById("DateTxt"); 

var apod_image_container = document.getElementById("apod-image-container"); 
var apod_desc = document.getElementById("APOD-desc");


document.addEventListener("DOMContentLoaded", () => {
    function showSection(sectionId) {
        // Hide all sections
        sections.forEach(section => {
            section.classList.add("hidden");
        });

        // Show the selected section
        var targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.remove("hidden");
        }

        // Update active nav link styles
        navLinks.forEach(link => {
            link.classList.remove(
                "bg-blue-500/10",
                "text-blue-400"
            );
            link.classList.add(
                "text-slate-300",
                "hover:bg-slate-800"
            );
        });

        var activeLink = document.querySelector(
            `.nav-link[data-section="${sectionId}"]`
        );

        if (activeLink) {
            activeLink.classList.add(
                "bg-blue-500/10",
                "text-blue-400"
            );
            activeLink.classList.remove(
                "text-slate-300",
                "hover:bg-slate-800"
            );
        }
    }

    // Show the section when NavLink is clicked
    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            var sectionId = link.dataset.section;
            showSection(sectionId);
        });
    });

    showSection("today-in-space");
});

getLaunches();
async function getLaunches()
{
    var res = await fetch(`https://lldev.thespacedevs.com/2.3.0/launches/upcoming/?limit=10`);
    res = await res.json();

    console.log(res.results);
    displayFirstLaunch(res.results);
    displayLaunches(res.results);
    
}

function formatDateTimeUTC(isoString) {
  const date = new Date(isoString);

  const formattedDate = date.toLocaleDateString("en-US", {
    timeZone: "UTC",
    month: "long",
    day: "2-digit",
    year: "numeric"
  });

  const formattedTime = date.toLocaleTimeString("en-US", {
    timeZone: "UTC",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true
  });

  return {
    date: formattedDate,
    time: `${formattedTime} UTC`
  };
}

function displayFirstLaunch(arr){
    var { date, time } = formatDateTimeUTC(arr[0].window_start);
    var box = "";
    box += 
    `
        <div
            class="relative bg-slate-800/30 border border-slate-700 rounded-3xl overflow-hidden group hover:border-blue-500/50 transition-all"
        >
            <div
            class="absolute inset-0 bg-linear-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity"
            ></div>
            <div class="relative grid grid-cols-1 lg:grid-cols-2 gap-6 p-8">
            <div class="flex flex-col justify-between">
                <div>
                <div class="flex items-center gap-3 mb-4">
                    <span
                    class="px-4 py-1.5 bg-blue-500/20 text-blue-400 rounded-full text-sm font-semibold flex items-center gap-2"
                    >
                    <i class="fas fa-star"></i>
                    Featured Launch
                    </span>
                    <span
                    class="px-4 py-1.5 bg-green-500/20 text-green-400 rounded-full text-sm font-semibold"
                    >
                    ${arr[0].status.abbrev}
                    </span>
                </div>
                <h3 class="text-3xl font-bold mb-3 leading-tight">
                    ${arr[0].name}
                </h3>
                <div
                    class="flex flex-col xl:flex-row xl:items-center gap-4 mb-6 text-slate-400"
                >
                    <div class="flex items-center gap-2">
                    <i class="fas fa-building"></i>
                    <span>${arr[0].launch_service_provider.abbrev}</span>
                    </div>
                    <div class="flex items-center gap-2">
                    <i class="fas fa-rocket"></i>
                    <span>${arr[0].rocket.configuration.name}</span>
                    </div>
                </div>
                <div
                    class="inline-flex items-center gap-3 px-6 py-3 bg-linear-to-r from-blue-500/20 to-purple-500/20 rounded-xl mb-6"
                >
                    <i class="fas fa-clock text-2xl text-blue-400"></i>
                    <div>
                    <p class="text-2xl font-bold text-blue-400">2</p>
                    <p class="text-xs text-slate-400">Days Until Launch</p>
                    </div>
                </div>
                <div class="grid xl:grid-cols-2 gap-4 mb-6">
                    <div class="bg-slate-900/50 rounded-xl p-4">
                    <p
                        class="text-xs text-slate-400 mb-1 flex items-center gap-2"
                    >
                        <i class="fas fa-calendar"></i>
                        Launch Date
                    </p>
                    <p class="font-semibold">${date}</p>
                    </div>
                    <div class="bg-slate-900/50 rounded-xl p-4">
                    <p
                        class="text-xs text-slate-400 mb-1 flex items-center gap-2"
                    >
                        <i class="fas fa-clock"></i>
                        Launch Time
                    </p>
                    <p class="font-semibold">${time}</p>
                    </div>
                    <div class="bg-slate-900/50 rounded-xl p-4">
                    <p
                        class="text-xs text-slate-400 mb-1 flex items-center gap-2"
                    >
                        <i class="fas fa-map-marker-alt"></i>
                        Location
                    </p>
                    <p class="font-semibold text-sm">${arr[0].pad.location.name}</p>
                    </div>
                    <div class="bg-slate-900/50 rounded-xl p-4">
                    <p
                        class="text-xs text-slate-400 mb-1 flex items-center gap-2"
                    >
                        <i class="fas fa-globe"></i>
                        Country
                    </p>
                    <p class="font-semibold">${arr[0].pad.country.alpha_3_code}</p>
                    </div>
                </div>
                <p class="text-slate-300 leading-relaxed mb-6">
                    ${arr[0].mission.description}
                </p>
                </div>
                <div class="flex flex-col md:flex-row gap-3">
                <button
                    class="flex-1 self-start md:self-center px-6 py-3 bg-blue-500 rounded-xl hover:bg-blue-600 transition-colors font-semibold flex items-center justify-center gap-2"
                >
                    <i class="fas fa-info-circle"></i>
                    View Full Details
                </button>
                <div class="icons self-end md:self-center">
                    <button
                    class="px-4 py-3 bg-slate-700 rounded-xl hover:bg-slate-600 transition-colors"
                    >
                    <i class="far fa-heart"></i>
                    </button>
                    <button
                    class="px-4 py-3 bg-slate-700 rounded-xl hover:bg-slate-600 transition-colors"
                    >
                    <i class="fas fa-bell"></i>
                    </button>
                </div>
                </div>
            </div>
            <div class="relative">
                <div
                class="relative h-full min-h-[400px] rounded-2xl overflow-hidden bg-slate-900/50"
                >
                <div
                    class="flex items-center justify-center h-full min-h-[400px] bg-slate-800"
                >
                    <img src="${arr[0].image.thumbnail_url}" class="w-full h-full object-cover object-center">
                </div>
                <div
                    class="absolute inset-0 bg-linear-to-t from-slate-900 via-transparent to-transparent"
                ></div>
                </div>
            </div>
            </div>
        </div>
    `

    featuredlaunch.innerHTML = box;
}

function displayLaunches(arr)
{
    var box = "";
    for(var i = 1; i < arr.length ; i++)
    {
        var { date, time } = formatDateTimeUTC(arr[i].window_start);
        box += 
            `
            <div
                class="bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all group cursor-pointer"
            >
                <div
                    class="relative h-48 overflow-hidden bg-slate-900/50 flex items-center justify-center"
                >
                    <img src="${arr[i].image.thumbnail_url}" alt="${arr[i].image.name}">
                    <div class="absolute top-3 right-3">
                    <span
                        class="px-3 py-1 bg-green-500/90 text-white backdrop-blur-sm rounded-full text-xs font-semibold"
                    >
                        ${arr[i].status.abbrev}
                    </span>
                    </div>
                </div>
                <div class="p-5">
                    <div class="mb-3">
                    <h4
                        class="font-bold text-lg mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors"
                    >
                        ${arr[i].name}
                    </h4>
                    <p class="text-sm text-slate-400 flex items-center gap-2">
                        <i class="fas fa-building text-xs"></i>
                        ${arr[i].launch_service_provider.abbrev}
                    </p>
                    </div>
                    <div class="space-y-2 mb-4">
                    <div class="flex items-center gap-2 text-sm">
                        <i class="fas fa-calendar text-slate-500 w-4"></i>
                        <span class="text-slate-300">${date}</span>
                    </div>
                    <div class="flex items-center gap-2 text-sm">
                        <i class="fas fa-clock text-slate-500 w-4"></i>
                        <span class="text-slate-300">${time}</span>
                    </div>
                    <div class="flex items-center gap-2 text-sm">
                        <i class="fas fa-rocket text-slate-500 w-4"></i>
                        <span class="text-slate-300">${arr[i].rocket.configuration.name}</span>
                    </div>
                    <div class="flex items-center gap-2 text-sm">
                        <i class="fas fa-map-marker-alt text-slate-500 w-4"></i>
                        <span class="text-slate-300 line-clamp-1">${arr[i].pad.country.alpha_3_code}</span>
                    </div>
                    </div>
                    <div
                    class="flex items-center gap-2 pt-4 border-t border-slate-700"
                    >
                    <button
                        class="flex-1 px-4 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors text-sm font-semibold"
                    >
                        Details
                    </button>
                    <button
                        class="px-3 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors"
                    >
                        <i class="far fa-heart"></i>
                    </button>
                    </div>
                </div>
                </div> 
            `
    }

    launchesGrid.innerHTML = box;
}

// --- Today In space

async function getAPOD()
{
    var res = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`);
    res = await res.json();

    console.log(res);
    DisplayAll_APOD_details(res);
}

async function getAPOD_by_Date(Apod_Date)
{
    var res = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${Apod_Date}`);
    res = await res.json();

    console.log(res);
    DisplayAll_APOD_details(res);
}

loadBtn.addEventListener("click", () => {
    if (!dateInput.value) return;
        else
        {
            displayBtnDate(dateInput.value);
            getAPOD_by_Date(dateInput.value);
        }
});

todayBtn.addEventListener("click", () => {
    if (!dateInput.value) return;
        else
        {
            todayDate();
        }
});

function todayDate()
{
    const today = new Date().toISOString().slice(0, 10);
    dateInput.value = today;
    displayBtnDate(dateInput.value);
    getAPOD_by_Date(dateInput.value)
}

function displayBtnDate(date)
{
    datetxt.innerHTML = `${date}`;
}

todayDate();


function DisplayAll_APOD_details(apod)
{
    Display_APOD(apod);
    Display_APOD_Desc(apod);
}

function Display_APOD(apod)
{
    var box = 
    `
        <div id="apod-loading" class="text-center hidden">
            <i
            class="fas fa-spinner fa-spin text-4xl text-blue-400 mb-4"
            ></i>
            <p class="text-slate-400">Loading today's image...</p>
        </div>
        <!-- Using a placeholder image or one from assets if available. Using a reliable external placeholder for now or a relative path if we knew one. Sticking to a colored placeholder div if no image, but let's try a realistic placeholder or just the rocket icon style used elsewhere if we want to be safe. But user wants design. I'll use a relative path assuming assets exist or a generic space placeholder. -->
        <img
            id="apod-image"
            class="w-full h-full object-cover"
            src="${apod.url}"
            onerror="this.src='./assets/images/placeholder.webp'"
            alt="Astronomy Picture of the Day"
        />
        <div
            class="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
        >
            <div class="absolute bottom-6 left-6 right-6">
            <button
                class="w-full py-3 bg-white/10 backdrop-blur-md rounded-lg font-semibold hover:bg-white/20 transition-colors"
            >
                <i class="fas fa-expand mr-2"></i>View Full Resolution
            </button>
            </div>
        </div>
    `

    apod_image_container.innerHTML = box;
}

function Display_APOD_Desc(apod)
{
    var box = 
    `
        <div
            class="bg-slate-800/50 border border-slate-700 rounded-xl md:rounded-2xl p-4 md:p-6"
            >
            <h3
                id="apod-title"
                class="text-lg md:text-2xl font-semibold mb-3 md:mb-4"
            >
                ${apod.title}
            </h3>
            <div
                class="flex items-center space-x-4 mb-4 text-sm text-slate-400"
            >
                <span id="apod-date-detail"
                ><i class="far fa-calendar mr-2"></i>${apod.date}</span
                >
            </div>
            <p
                id="apod-explanation"
                class="text-slate-300 leading-relaxed mb-4"
            >
                ${apod.explanation}
            </p>
            <div
                id="apod-copyright"
                class="text-xs text-slate-400 italic mb-4"
            >
                &copy; NASA/JPL
            </div>
            </div>

            <div
            class="bg-slate-800/50 border border-slate-700 rounded-2xl p-6"
            >
            <h4 class="font-semibold mb-3 flex items-center">
                <i class="fas fa-info-circle text-blue-400 mr-2"></i>
                Image Details
            </h4>
            <div class="space-y-3 text-sm">
                <div class="flex justify-between">
                <span class="text-slate-400">Date</span>
                <span id="apod-date-info" class="font-medium"
                    >${apod.date}</span
                >
                </div>
                <div class="flex justify-between">
                <span class="text-slate-400">Media Type</span>
                <span id="apod-media-type" class="font-medium">${apod.media_type}</span>
                </div>
                <div class="flex justify-between">
                <span class="text-slate-400">Source</span>
                <span class="font-medium">${apod.copyright}/span>
                </div>
            </div>
        </div>
    `

    apod_desc.innerHTML = box;
}