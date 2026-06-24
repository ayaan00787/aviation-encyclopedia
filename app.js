// State Variables
let activeCategory = 'all';
let searchQuery = '';

document.addEventListener('DOMContentLoaded', () => {
    initTypewriter();
    renderCards();

    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.toLowerCase().trim();
        renderCards();
    });

    const categoryFilter = document.getElementById('category-filter');
    categoryFilter.addEventListener('change', (e) => {
        activeCategory = e.target.value.toLowerCase();
        renderCards();
    });
});

function initTypewriter() {
    const subtitle = document.getElementById('typewriter-sub');
    if (!subtitle) return;

    const originalText = subtitle.textContent;
    subtitle.textContent = ''; 
    subtitle.classList.add('typing-active'); 

    let index = 0;
    const speed = 40; 

    function typeWriterEngine() {
        if (index < originalText.length) {
            subtitle.textContent += originalText.charAt(index);
            index++;
            setTimeout(typeWriterEngine, speed);
        } else {
            setTimeout(() => {
                subtitle.classList.remove('typing-active');
            }, 1200);
        }
    }

    // Smooth staggered timing following the Heading animation run
    setTimeout(typeWriterEngine, 800); 
}

function renderCards() {
    const container = document.getElementById('aircraft-container');
    container.innerHTML = '';

    const filteredAircraft = aviationDatabase.filter(aircraft => {
        const matchesCategory = (activeCategory === 'all' || aircraft.category.toLowerCase() === activeCategory);
        
        const matchesSearch = (
            aircraft.name.toLowerCase().includes(searchQuery) ||
            aircraft.manufacturer.toLowerCase().includes(searchQuery) ||
            aircraft.note.toLowerCase().includes(searchQuery)
        );

        return matchesCategory && matchesSearch;
    });

    filteredAircraft.forEach(plane => {
        const card = document.createElement('div');
        card.className = 'aircraft-card';
        
        const categoryClass = plane.category.split(" ")[0].toLowerCase();
        
        card.innerHTML = `
            <div class="card-content">
                <div class="card-header">
                    <span class="badge ${categoryClass}">${plane.category}</span>
                    <h3 class="card-title">${plane.name}</h3>
                    <p class="card-manufacturer">${plane.manufacturer}</p>
                </div>
                
                <div class="data-grid">
                    <div class="data-item"><span>Cruise Speed</span>${plane.cruiseSpeed}</div>
                    <div class="data-item"><span>Range</span>${plane.range}</div>
                    <div class="data-item"><span>Wingspan</span>${plane.wingspan}</div>
                    <div class="data-item"><span>Length</span>${plane.length}</div>
                    <div class="data-item"><span>Height</span>${plane.height}</div>
                    <div class="data-item"><span>Max Weight</span>${plane.mtow}</div>
                    <div class="data-item"><span>Capacity</span>${plane.capacity}</div>
                    <div class="data-item"><span>Crew</span>${plane.crew}</div>
                    <div class="data-item"><span>Engine Type</span>${plane.engine}</div>
                    <div class="data-item"><span>First Flight</span>${plane.firstFlight}</div>
                </div>
                
                <p class="card-note">${plane.note}</p>
            </div>
        `;
        
        container.appendChild(card);
    });
}