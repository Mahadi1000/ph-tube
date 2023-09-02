// Fetch API categories
const handleCategory = async () => {
    const response = await fetch("https://openapi.programming-hero.com/api/videos/categories");
    const data = await response.json();
    const tabContainer = document.getElementById('tab-container');

    data.data.forEach((category) => {
        const div = document.createElement("div");
        const button = document.createElement("button");
        button.textContent = category.category;
        button.className = "btn m-3";
        button.addEventListener('click', () => {
            // Clear previous button styles
            const buttons = document.querySelectorAll('.btn');
            buttons.forEach((btn) => {
                btn.style.backgroundColor = '';
            });

            button.style.backgroundColor = '#FF0000';

            handleLoadTopics(category.category_id);
        });
        div.appendChild(button);
        tabContainer.appendChild(div);
    });
};
// Add categories data 
const handleLoadTopics = async (categoryId) => {
    const response = await fetch(
        `https://openapi.programming-hero.com/api/videos/category/${categoryId}`
    );
    const data = await response.json();

    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = '';

    if (data.data.length === 0) {
        // No data found, display a message
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="flex items-center justify-center flex-col">
            <img src="Icon.png" alt="">
            <p class="text-3xl font-bold text-center">Oops!! Sorry, <br> There is no content here</p>
        </div>
        `;
        cardContainer.appendChild(div);
    } else {
        data.data.forEach((video) => {
            const div = document.createElement("div");
            div.innerHTML = `
                <div class="card w-80 bg-base-100 shadow-xl">
                    <figure><img class="" src=${video.thumbnail} /></figure>
                    <div class="flex">
                    <div class="w-1/6">
                    <img class="rounded-full" src=${video.authors[0].profile_picture} alt="">
                    </div>
                    <div>
                    <h3 class="ml-2 font-bold text-2xl">${video.title}</h3>
                    </div>
                        
                    </div>
                    <div class="flex">
                    <h3 class="ml-16">${video?.authors[0].profile_name || 'Unknown'}</h3>
                        ${video.authors[0].verified ? '<i class="fa-solid fa-certificate mt-1 mx-4"></i>' : ''}
                        </div>
                    <h4 class="ml-16">${video.others.views} views</h4>
                </div>
            `;

            // Add data-views attribute with views count
            div.querySelector('.card').setAttribute('data-views', video.others.views);

            cardContainer.appendChild(div);
        });
    }
}

// Function to handle sorting by views
const handleSortByViews = () => {
    const cardContainer = document.getElementById('card-container');
    const cards = Array.from(cardContainer.getElementsByClassName('card'));

    // Sort the cards based on the "data-views" attribute in descending order
    cards.sort((a, b) => {
        const viewsA = parseInt(a.getAttribute('data-views'));
        const viewsB = parseInt(b.getAttribute('data-views'));
        return viewsB - viewsA;
    });

    // Clear the current card container
    cardContainer.innerHTML = '';

    // Append the sorted cards back to the container
    cards.forEach((card) => {
        cardContainer.appendChild(card);
    });
};


const sortButton = document.getElementById('sort-button');
sortButton.addEventListener('click', handleSortByViews);

handleLoadTopics("1000");
handleCategory();

