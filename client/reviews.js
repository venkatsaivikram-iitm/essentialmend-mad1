import { $ } from "./utils/common-utils";

let reviews = [];
const reviewsSort = $('#reviews-sort');
const userReviewsDiv = $('#user-reviews');
const professionalReviewsDiv = $('#professional-reviews');
const reviewsDiv = $('#reviews');

const handleReviewSortChange = () => {
    const sortValue = reviewsSort.value;
    let sortedUserReviews = [];
    let sortedProfessionalReviews = [];

    if (Array.isArray(reviews)) {
        sortedUserReviews = [...reviews];
        if (sortValue !== 'default') {
            sortedUserReviews.sort((a, b) => a.rating - b.rating);
            sortedUserReviews = sortedUserReviews.filter(review => review.rating <= Number(sortValue));
        }
    } else {
        sortedUserReviews = [...reviews.userReviews];
        sortedProfessionalReviews = [...reviews.professionalReviews];
        if (sortValue !== 'default') {
            sortedUserReviews.sort((a, b) => a.rating - b.rating);
            sortedUserReviews = sortedUserReviews.filter(review => review.rating <= Number(sortValue));
            sortedProfessionalReviews.sort((a, b) => a.rating - b.rating);
            sortedProfessionalReviews = sortedProfessionalReviews.filter(review => review.rating <= Number(sortValue));
        }
    }

    updateReviewsDisplay(sortedUserReviews, sortedProfessionalReviews);
};

const updateReviewsDisplay = (sortedUserReviews, sortedProfessionalReviews) => {
    if (userReviewsDiv && professionalReviewsDiv) {
        userReviewsDiv.innerHTML = '';
        professionalReviewsDiv.innerHTML = '';

        sortedUserReviews.forEach(review => {
            userReviewsDiv.innerHTML += createReviewHtml(review);
        });

        sortedProfessionalReviews.forEach(review => {
            professionalReviewsDiv.innerHTML += createReviewHtml(review);
        });
    } else if (reviewsDiv) {
        reviewsDiv.innerHTML = '';
        sortedUserReviews.forEach(review => {
            reviewsDiv.innerHTML += createReviewHtml(review);
        });
    }
};

const createReviewHtml = (review) => {
    return `
        <div class="d-flex gap-4 border rounded p-2">
            <div class="fs-1 align-self-center">
                <i class="bi bi-chat-square-text-fill"></i>
            </div>
            <div class="d-flex flex-column">
                <p class="m-0 fw-bold">${review.reviewerName}(${review.reviewerEmail}) --> ${review.revieweeName}(${review.revieweeEmail}) | ${review.type}</p>
                <p class="m-0 small">${new Date(Number(review.createdAt)).toLocaleString()}</p>
                <p class="m-0">${review.review}</p>
                <p class="m-0"><span class="fw-bold">Rating: </span>${review.rating}</p>
            </div>
        </div>
    `;
};

const listenEvents = () => {
    reviewsSort.addEventListener('change', handleReviewSortChange);
};

const initData = () => {
    reviews = window.reviews;
};

initData();
listenEvents();