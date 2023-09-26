
const nextPageUrl = $("#loadMoreButton").data("next-page");

$("#loadMoreButton").on("click", (event) => {
    event.preventDefault();
    event.stopPropagation(); 

//using ajax to load more recipes
    if (nextPageUrl) {
        $.ajax({
            method: "GET",
            url: nextPageUrl,
            success: (result) => {
                // Append result to the existing recipes
                // and update the nextPageUrl data attribute if there's a next page.
                const moreRecipes = result.hits;
                if(moreRecipes.length > 0){
                    moreRecipes.forEach((recipe) => {
                        //copying card html/ejs from index.ejs and replacing ejs tags for each additionally retrieved recipe
                        const recipeCard = `
                        <div class="col" onclick="location.href='${recipe.recipe.url}';">
                        <div class="card card-cover h-100 overflow-hidden text-bg-dark rounded-4"
                            style="background-image: url('${recipe.recipe.image}');">
                            <div class="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1 text-bg">
                                <h3 class="mt-5 mb-4 display-6 lh-1 fw-bold">
                                    ${recipe.recipe.label}
                                </h3>
                                <ul class="d-flex list-unstyled mt-auto">
                                    <% if (${recipe.recipe.dietLabels.length} > 0) { %>
                                        <li class="badge text-bg-dark rounded-pill px-2">
                                            <small>
                                                ${recipe.recipe.dietLabels[0]}
                                            </small>
                                        </li>
                                        <%} %>

                                            <li class="badge text-bg-dark rounded-pill mx-2 px-2">
                                                <small>
                                                    ${recipe.recipe.healthLabels[0]}
                                                </small>
                                            </li>
                                            <li class="badge text-bg-dark rounded-pill px-2">
                                                <small>
                                                    ${recipe.recipe.healthLabels[0]}
                                                </small>
                                            </li>

                                </ul>
                            </div>
                        </div>
                    </div>
                        `;

                         // Append the new recipe card to the recipe list div
                         $("#recipe-list").append(recipeCard);
                    });

                        // Update the nextPageUrl data attribute
                        $("#loadMoreButton").data("next-page", result._links.next.href);
                    } else {
                        // If there are no more recipes, hide the "Load More" button
                        $("#loadMoreButton").hide();
                    }
                }
        });
    }
})


