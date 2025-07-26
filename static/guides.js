const fallbackGuides = [
  {
    id: "map-awareness",
    title: "Map Awareness Basics",
    banner: "../assets/map_banner.jpg",
    content: [
      {
        text: "Knowing where the enemy is likely to appear lets you pre-aim, pre-angle, and position more effectively. Good players learn common lines of attack.",
        image: "../assets/map1.jpg"
      },
      {
        text: "Use the minimap constantly. Set it to a larger size in settings and glance at it every few seconds. Information wins games.",
        image: "../assets/enfilade_defilade.png"
      }
    ]
  },
  {
    id: "crew-skills",
    title: "Crew Skills 101",
    banner: "../assets/crew_banner.png",
    content: [
      {
        text: "Crew skills give your tank long-term advantages, especially in vision, repair, and accuracy. Start with Sixth Sense on the commander.",
        image: null
      },
      {
        text: "Later perks like Brothers in Arms and Repairs can greatly improve survivability. Don’t ignore the radio operator!",
        image: "../assets/crew1.jpg"
      }
    ]
  }
];

async function loadGuides() {
  let guides;
  try {
    const res = await fetch("https://your-ec2-url.com/guides.json");
    if (!res.ok) throw new Error("EC2 fetch failed");
    guides = await res.json();
    console.log("Loaded guides from EC2");
  } catch (err) {
    console.warn("Using fallback local guides:", err);
    guides = fallbackGuides;
  }

  window.loadedGuides = guides;
  displayCarousel(guides);
  displayGuide(guides[0]);
}

function displayCarousel(guides) {
  const carousel = document.getElementById("guide-carousel");
  carousel.innerHTML = guides.map(g =>
    `<button onclick="displayGuideById('${g.id}')">${g.title}</button>`
  ).join("");
}

function displayGuideById(id) {
  const guide = window.loadedGuides.find(g => g.id === id);
  if (guide) displayGuide(guide);
}

function displayGuide(guide) {
  const content = document.getElementById("guide-content");
  let html = `
    <h2>${guide.title}</h2>
    <img src="${guide.banner}" alt="${guide.title} Banner" class="guide-banner">
  `;

  guide.content.forEach(block => {
    html += `<p>${block.text}</p>`;
    if (block.image) {
      html += `<img src="${block.image}" alt="" class="guide-image">`;
    }
  });

  content.innerHTML = html;
}

window.addEventListener("DOMContentLoaded", loadGuides);
