const fallbackReviews = [
  {
    id: "tiger1",
    title: "Tiger I",
    image: "../assets/tiger_1.jpg",
    stats: {
      game: "Armor: 150mm | Gun: 8.8cm KwK 36 | Tier: VII",
      historical: "Entered service: 1942 | Weight: 54 tons | Crew: 5"
    },
    content: "The Tiger I is a staple in German heavy lines. Angle your armor, stay hull-down if possible, and let the high-accuracy gun do the work from mid-range."
  },
  {
    id: "sherman",
    title: "M4 Sherman",
    image: "../assets/M4.jpg",
    stats: {
      game: "Armor: 63mm | Gun: 75mm M3 | Tier: V",
      historical: "Entered service: 1942 | Weight: 30 tons | Crew: 5"
    },
    content: "Use your mobility and gun depression to peek and poke. Don’t try to brawl heavies — you’re a support tank with great adaptability."
  }
];

async function loadReviews() {
  let reviews;
  try {
    const res = await fetch("https://your-ec2-url.com/reviews.json");
    if (!res.ok) throw new Error("EC2 fetch failed");
    reviews = await res.json();
    console.log("Loaded reviews from EC2");
  } catch (err) {
    console.warn("Using fallback local reviews:", err);
    reviews = fallbackReviews;
  }

  window.loadedReviews = reviews;
  displayCarousel(reviews);
  displayReview(reviews[0]);
}

function displayCarousel(reviews) {
  const carousel = document.getElementById("review-carousel");
  carousel.innerHTML = reviews.map(r =>
    `<button onclick="displayReviewById('${r.id}')">${r.title}</button>`
  ).join("");
}

function displayReviewById(id) {
  const review = window.loadedReviews.find(r => r.id === id);
  if (review) displayReview(review);
}

function displayReview(review) {
  const content = document.getElementById("review-content");
  content.innerHTML = `
    <div class="review-header">
      <img src="${review.image}" alt="${review.title}" class="review-img">
      <div class="review-info">
        <h2>${review.title}</h2>
        <p><strong>In-Game:</strong> ${review.stats.game}</p>
        <p><strong>Historical:</strong> ${review.stats.historical}</p>
      </div>
    </div>
    <div class="review-body">
      <p>${review.content}</p>
    </div>
  `;
}

window.addEventListener("DOMContentLoaded", loadReviews);
